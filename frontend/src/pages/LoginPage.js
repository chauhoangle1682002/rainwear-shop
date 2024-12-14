import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/userAPI';
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login(formData.emailOrPhone, formData.password);
      if (response.success && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        alert('Đăng nhập thành công!');
        navigate('/');
      }
    } catch (error) {
      setError(error.message || 'Đăng nhập thất bại');
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
                required
              />
              <span className="icon">🔒</span>
            </div>

            <div className="options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="/forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className="login-btn">
              LOGIN
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