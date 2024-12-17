import axiosInstance from './axiosInstance';

// Đăng ký
export const register = async (userData) => {
  try {
    console.log('Sending register request:', userData);

    const response = await axiosInstance.post('/users/register', userData);

    if (response.data.success) {
      // Lưu token và thông tin user
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Set token cho các request tiếp theo
      axiosInstance.setAuthToken(response.data.accessToken);

      return {
        success: true,
        user: response.data.user
      };
    }

    return response.data;
  } catch (error) {
    console.error('Register error:', error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.'
    };
  }
};

// Đăng nhập
export const login = async (emailOrPhone, password) => {
  try {
    console.log('Sending login request:', { emailOrPhone });

    const response = await axiosInstance.post('/users/login', {
      emailOrPhone,
      password
    });

    if (response.data.success) {
      // Lưu token và thông tin user
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Set token cho các request tiếp theo
      axiosInstance.setAuthToken(response.data.accessToken);

      return {
        success: true,
        user: response.data.user
      };
    }

    return {
      success: false,
      message: response.data.message
    };
  } catch (error) {
    console.error('Login error:', error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || 'Email/Số điện thoại hoặc mật khẩu không đúng'
    };
  }
};

// Kiểm tra trạng thái đăng nhập
export const checkAuthStatus = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return false;

    // Set token cho request
    axiosInstance.setAuthToken(token);

    const response = await axiosInstance.get('/users/profile');
    return response.data.success;
  } catch (error) {
    console.error('Auth check error:', error);
    clearAuthData();
    return false;
  }
};

// Helper function để xóa data auth
const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  axiosInstance.setAuthToken(null);
};

// Đăng xuất
export const logout = async () => {
  try {
    await axiosInstance.post('/users/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    clearAuthData();
  }
};

// Các function khác giữ nguyên
export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/users/profile');
    return response.data.user;
  } catch (error) {
    console.error('Get profile error:', error);
    throw new Error(error.response?.data?.message || 'Không thể lấy thông tin người dùng');
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await axiosInstance.put('/users/profile', userData);
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    console.error('Update profile error:', error);
    throw new Error(error.response?.data?.message || 'Cập nhật thông tin thất bại');
  }
};

export const changePassword = async (passwordData) => {
  try {
    const response = await axiosInstance.post('/users/change-password', passwordData);
    return response.data;
  } catch (error) {
    console.error('Change password error:', error);
    throw new Error(error.response?.data?.message || 'Đổi mật khẩu thất bại');
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post('/users/forgot-password', { email });
    return response.data;
  } catch (error) {
    console.error('Forgot password error:', error);
    throw new Error(error.response?.data?.message || 'Gửi yêu cầu khôi phục mật khẩu thất bại');
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axiosInstance.post(`/users/reset-password/${token}`, {
      password: newPassword
    });
    return response.data;
  } catch (error) {
    console.error('Reset password error:', error);
    throw new Error(error.response?.data?.message || 'Đặt lại mật khẩu thất bại');
  }
};

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token');

    const response = await axiosInstance.post('/users/refresh-token', {
      refreshToken
    });

    if (response.data.success) {
      localStorage.setItem('token', response.data.accessToken);
      axiosInstance.setAuthToken(response.data.accessToken);
    }

    return response.data;
  } catch (error) {
    console.error('Refresh token error:', error);
    clearAuthData();
    throw new Error('Phiên đăng nhập hết hạn');
  }
};