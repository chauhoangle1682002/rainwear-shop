import axios from 'axios';

const BASE_URL = 'http://localhost:5001/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 seconds timeout
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add timestamp to prevent caching
    config.params = {
      ...config.params,
      _t: Date.now()
    };

    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response received:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.error('API Error:', {
      url: originalRequest.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });

    // Handle 401 Unauthorized error
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          console.log('Attempting to refresh token');
          
          const response = await axios.post(`${BASE_URL}/users/refresh-token`, {
            refreshToken
          });

          if (response.data.accessToken) {
            console.log('Token refreshed successfully');
            
            localStorage.setItem('token', response.data.accessToken);
            axiosInstance.defaults.headers.common['Authorization'] = 
              `Bearer ${response.data.accessToken}`;
            
            // Retry original request with new token
            originalRequest.headers['Authorization'] = 
              `Bearer ${response.data.accessToken}`;
            return axiosInstance(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        
        // Clear auth data on refresh token failure
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');

        // Redirect to login page
        window.location.href = '/login';
      }
    }

    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        message: 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.'
      });
    }

    // Handle specific status codes
    switch (error.response.status) {
      case 400:
        return Promise.reject({
          message: error.response.data.message || 'Yêu cầu không hợp lệ'
        });
      case 401:
        return Promise.reject({
          message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
        });
      case 403:
        return Promise.reject({
          message: 'Bạn không có quyền truy cập tài nguyên này'
        });
      case 404:
        return Promise.reject({
          message: 'Không tìm thấy tài nguyên yêu cầu'
        });
      case 500:
        return Promise.reject({
          message: 'Lỗi server. Vui lòng thử lại sau.'
        });
      default:
        return Promise.reject({
          message: error.response.data.message || 'Có lỗi xảy ra'
        });
    }
  }
);

// Add a method to check if token exists
axiosInstance.hasAuthToken = () => {
  return !!localStorage.getItem('token');
};

// Add a method to clear auth data
axiosInstance.clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

export default axiosInstance;