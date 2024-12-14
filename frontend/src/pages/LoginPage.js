import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/userAPI'; // Import hàm login từ userAPI
import "../styles/LoginPage.css"; // Import CSS

const LoginPage = () => {
  const [input, setInput] = useState(''); // Trường email hoặc số điện thoại
  const [password, setPassword] = useState(''); // Trường mật khẩu
  const [errorMessage, setErrorMessage] = useState(''); // Thông báo lỗi
  const navigate = useNavigate(); // Điều hướng trang

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form

    // Kiểm tra input hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!emailRegex.test(input) && !phoneRegex.test(input)) {
      alert('Vui lòng nhập đúng email hoặc số điện thoại!');
      return;
    }

    try {
      const response = await login(input, password); // Gọi API đăng nhập

      // Nếu có token, lưu vào localStorage và chuyển hướng
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Lưu token vào localStorage
        alert('Đăng nhập thành công!');
        navigate('/'); // Chuyển hướng về trang chủ
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      setErrorMessage('Đăng nhập thất bại. Vui lòng kiểm tra thông tin!');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h2>LOGIN FORM</h2>
          <form onSubmit={handleSubmit}>
            {/* Trường nhập email hoặc số điện thoại */}
            <div className="input-group">
              <input
                type="text"
                placeholder="EMAIL or PHONE"
                value={input}
                onChange={(e) => setInput(e.target.value)} // Cập nhật giá trị input
                required
              />
              <span className="icon">@</span>
            </div>
            {/* Trường nhập mật khẩu */}
            <div className="input-group">
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Cập nhật mật khẩu
                required
              />
              <span className="icon">🔒</span>
            </div>
            {/* Hiển thị lỗi nếu có */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {/* Các tùy chọn */}
            <div className="options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="/forgot-password">Forgot password?</a>
            </div>
            {/* Nút đăng nhập */}
            <button type="submit" className="login-btn">LOGIN</button>
          </form>
          {/* Liên kết đến trang đăng ký */}
          <div className="register-link">
            <p>
              Don't have an account? → <a href="/register">Click Here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
