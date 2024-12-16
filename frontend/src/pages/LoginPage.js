import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, checkAuthStatus } from '../api/userAPI';
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Kiểm tra nếu user đã đăng nhập
  useEffect(() => {
    const { isAuthenticated } = checkAuthStatus();
    if (isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user types
    setError('');
  };

  const validateForm = () => {
    if (!formData.emailOrPhone.trim()) {
      setError('Vui lòng nhập email hoặc số điện thoại');
      return false;
    }
    if (!formData.password) {
      setError('Vui lòng nhập mật khẩu');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', {
        emailOrPhone: formData.emailOrPhone,
        password: '***'
      });

      const response = await login(formData.emailOrPhone, formData.password);
      console.log('Login response:', response);

      if (response.success && response.accessToken) {
        // Token đã được lưu trong login function
        console.log('Login successful');
        alert('Đăng nhập thành công!');
        navigate('/');
      } else {
        console.log('Login failed:', response);
        setError(response.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Đăng nhập thất bại. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h2>LOGIN FORM</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            
            <div className="input-group">
              <input
                type="text"
                name="emailOrPhone"
                placeholder="Email or Phone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <span className="icon">👤</span>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <span className="icon">🔒</span>
            </div>

            <div className="options">
              <label>
                <input 
                  type="checkbox" 
                  disabled={loading}
                /> Remember me
              </label>
              <a href="/forgot-password">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              className="login-btn"
              disabled={loading}
            >
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </form>

          <div className="register-link">
            <p>
              Don't have an account? →{' '}
              <a href="/register">Register Here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;