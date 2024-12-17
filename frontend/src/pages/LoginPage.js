import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, checkAuthStatus } from '../api/userAPI';
import { useAuth } from '../contexts/AuthContext'; // Thêm dòng này
import { FaUser, FaLock } from 'react-icons/fa';
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth(); // Thêm dòng này

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await checkAuthStatus();
      if (isAuthenticated) {
        navigate('/');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
    setLoading(true);
    setError('');
  
    try {
      if (!validateForm()) {
        setLoading(false);
        return;
      }
  
      const response = await login(formData.emailOrPhone, formData.password);
  
      if (response.success) {
        // Cập nhật user trong AuthContext
        console.log('Login successful, updating user:', response.user);
        authLogin(response.user);
        
        // Thêm delay nhỏ để đảm bảo state được cập nhật
        setTimeout(() => {
          navigate('/');
        }, 100);
      } else {
        console.error('Login failed:', response.message);
        setError(response.message);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h2>LOGIN FORM</h2>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                placeholder="Email hoặc Số điện thoại"
                disabled={loading}
                required
              />
              <span className="icon"><FaUser /></span>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mật khẩu"
                disabled={loading}
                required
              />
              <span className="icon"><FaLock /></span>
            </div>

            <div className="options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <button 
              type="submit" 
              className="login-btn"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'LOGIN'}
            </button>

            <div className="register-link">
              Don't have an account? 
              <Link to="/register"> Register Here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;