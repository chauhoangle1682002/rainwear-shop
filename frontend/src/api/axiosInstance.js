import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api', // Địa chỉ API backend của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để tự động thêm token vào các request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Thêm token vào header Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Xử lý lỗi trước khi request được gửi đi
  }
);

export default axiosInstance;
