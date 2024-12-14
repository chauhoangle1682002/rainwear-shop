import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/userAPI';
import "../styles/RegisterPage.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const { username, email, phone, password, confirmPassword } = formData;
    
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return false;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email không hợp lệ');
      return false;
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phone)) {
      setError('Số điện thoại không hợp lệ');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      alert('Đăng ký thành công!');
      navigate('/login');
    } catch (error) {
      setError(error.message || 'Đăng ký thất bại');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-box">
          <h2>REGISTER FORM</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            
            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <span className="icon">👤</span>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="icon">📧</span>
            </div>

            <div className="input-group">
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <span className="icon">📱</span>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="icon">🔒</span>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span className="icon">🔒</span>
            </div>

            <button type="submit" className="register-btn">
              REGISTER
            </button>
          </form>

          <div className="login-link">
            <p>
              Already have an account? →{' '}
              <a href="/login">Login Here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;