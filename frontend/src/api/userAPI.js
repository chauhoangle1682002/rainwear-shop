import axiosInstance from './axiosInstance';

export const register = async (userData) => {
  try {
    console.log('Sending register request:', userData);
    const response = await axiosInstance.post('/users/register', userData);
    console.log('Register response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Register error:', error);
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw { message: 'Không nhận được phản hồi từ server' };
    } else {
      throw { message: 'Lỗi kết nối server' };
    }
  }
};

export const login = async (emailOrPhone, password) => {
  try {
    console.log('Sending login request:', { emailOrPhone });
    const response = await axiosInstance.post('/users/login', {
      emailOrPhone,
      password
    });
    console.log('Login response:', response.data);
    
    if (response.data.success && response.data.accessToken) {
      // Lưu token vào localStorage
      localStorage.setItem('token', response.data.accessToken);
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    }
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    if (error.response) {
      // Server trả về lỗi với status code
      throw error.response.data;
    } else if (error.request) {
      // Request được gửi nhưng không nhận được response
      throw { message: 'Không nhận được phản hồi từ server' };
    } else {
      // Lỗi khi setting up request
      throw { message: 'Lỗi kết nối server' };
    }
  }
};

export const getProfile = async () => {
  try {
    console.log('Sending get profile request');
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw { message: 'Không tìm thấy token xác thực' };
    }

    const response = await axiosInstance.get('/users/profile');
    console.log('Profile response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get profile error:', error);
    if (error.response) {
      if (error.response.status === 401) {
        // Token hết hạn hoặc không hợp lệ
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw { message: 'Phiên đăng nhập đã hết hạn' };
      }
      throw error.response.data;
    } else if (error.request) {
      throw { message: 'Không nhận được phản hồi từ server' };
    } else {
      throw { message: 'Lỗi kết nối server' };
    }
  }
};

export const logout = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { success: true, message: 'Đăng xuất thành công' };
  } catch (error) {
    console.error('Logout error:', error);
    throw { message: 'Lỗi khi đăng xuất' };
  }
};

// Hàm kiểm tra trạng thái đăng nhập
export const checkAuthStatus = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (token && user) {
    try {
      return {
        isAuthenticated: true,
        user: JSON.parse(user)
      };
    } catch (error) {
      console.error('Parse user error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
  
  return {
    isAuthenticated: false,
    user: null
  };
};

// Hàm refresh token (nếu cần)
export const refreshToken = async () => {
  try {
    const response = await axiosInstance.post('/users/refresh-token');
    console.log('Refresh token response:', response.data);
    
    if (response.data.success && response.data.accessToken) {
      localStorage.setItem('token', response.data.accessToken);
    }
    
    return response.data;
  } catch (error) {
    console.error('Refresh token error:', error);
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw { message: 'Phiên đăng nhập đã hết hạn' };
    }
    throw error.response?.data || { message: 'Lỗi khi làm mới token' };
  }
};