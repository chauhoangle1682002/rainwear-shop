import axiosInstance from './axiosInstance';

export const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      'Đăng ký thất bại. Vui lòng thử lại.'
    );
  }
};

export const login = async (emailOrPhone, password) => {
  try {
    console.log('Sending login request:', { emailOrPhone }); // Debug log

    const response = await axiosInstance.post('/users/login', {
      emailOrPhone,
      password
    });

    if (response.data.success) {
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error);
    throw new Error(
      error.response?.data?.message || 
      'Email/Số điện thoại hoặc mật khẩu không đúng'
    );
  }
};

export const checkAuthStatus = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const response = await axiosInstance.get('/users/profile');
    return response.data.success;
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return false;
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post('/users/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Logout error:', error);
  }
};