import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/userAPI';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import "../styles/LoginPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.username) return 'Vui lòng nhập tên người dùng';
    if (!formData.email) return 'Vui lòng nhập email';
    if (!formData.phone) return 'Vui lòng nhập số điện thoại';
    if (!formData.password) return 'Vui lòng nhập mật khẩu';
    if (formData.password.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự';
    if (formData.password !== formData.confirmPassword) 
      return 'Mật khẩu xác nhận không khớp';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const response = await register({
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      if (response.success) {
        navigate('/'); // Điều hướng về trang chủ
        window.location.reload(); // Làm mới trang
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="login-container">
        <div className="login-box">
          <h2>Đăng Ký</h2>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Tên người dùng"
                disabled={loading}
              />
              <span className="icon"><FaUser /></span>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                disabled={loading}
              />
              <span className="icon"><FaEnvelope /></span>
            </div>

            <div className="input-group">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Số điện thoại"
                disabled={loading}
              />
              <span className="icon"><FaPhone /></span>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mật khẩu"
                disabled={loading}
              />
              <span className="icon"><FaLock /></span>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Xác nhận mật khẩu"
                disabled={loading}
              />
              <span className="icon"><FaLock /></span>
            </div>

            <button 
              type="submit" 
              className="login-btn"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Đăng Ký'}
            </button>

            <div className="register-link">
              Đã có tài khoản? 
              <Link to="/login"> Đăng nhập ngay</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;