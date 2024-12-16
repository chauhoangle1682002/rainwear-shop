import axios from 'axios';

const BASE_URL = 'http://localhost:5001/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Thêm token vào header nếu có
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request để debug
    console.log('Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    });

    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response để debug
    console.log('Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Log error để debug
    console.error('Response Error:', {
      url: originalRequest?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });

    // Xử lý token hết hạn
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Lấy refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Gọi API refresh token
        const response = await axiosInstance.post('/users/refresh-token', {
          refreshToken
        });

        // Lưu token mới
        if (response.data.accessToken) {
          localStorage.setItem('token', response.data.accessToken);
          
          // Cập nhật token trong header
          originalRequest.headers.Authorization = 
            `Bearer ${response.data.accessToken}`;

          // Thử lại request ban đầu
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Xóa token nếu refresh thất bại
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');

        // Chuyển về trang login nếu cần
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }

    // Xử lý các lỗi khác
    const errorMessage = 
      error.response?.data?.message || 
      'Có lỗi xảy ra, vui lòng thử lại sau';

    // Có thể thêm xử lý toast/notification ở đây

    return Promise.reject({
      ...error,
      message: errorMessage
    });
  }
);

// Thêm method để set token
axiosInstance.setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = 
      `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;