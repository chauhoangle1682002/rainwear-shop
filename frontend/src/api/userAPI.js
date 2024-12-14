import axiosInstance from './axiosInstance';

export const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi kết nối server' };
  }
};

export const login = async (emailOrPhone, password) => {
  try {
    const response = await axiosInstance.post('/users/login', {
      emailOrPhone,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi kết nối server' };
  }
};

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get('/users/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi kết nối server' };
  }
};