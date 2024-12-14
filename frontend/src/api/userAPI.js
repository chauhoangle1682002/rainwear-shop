import axiosInstance from './axiosInstance';

// Gọi API đăng nhập
export const login = async (emailOrPhone, password) => {
  return axiosInstance.post('/users/login', { emailOrPhone, password });
};

// Hàm gọi API đăng ký
export const register = async (emailOrPhone, password) => {
    const response = await axiosInstance.post('/users/register', {
      emailOrPhone,
      password,
    });
    return response.data; // Trả về dữ liệu phản hồi
  };

// Gọi API lấy thông tin người dùng hiện tại
export const getCurrentUser = async () => {
  return axiosInstance.get('/users/me'); // API cần xác thực
};
