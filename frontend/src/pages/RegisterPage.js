import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios để gọi API
import "../styles/RegisterPage.css"; // Import CSS

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra tính hợp lệ của email hoặc số điện thoại
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!emailRegex.test(email) && !phoneRegex.test(phone)) {
      alert('Vui lòng nhập đúng email hoặc số điện thoại!');
      return;
    }

    // Kiểm tra mật khẩu xác nhận có khớp không
    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/users/register', {
        username: username,
        email: email,
        phone: phone,
        password: password,
      });

      if (response.data.success) {
        alert('Đăng ký thành công!');
        navigate('/login');
      } else {
        setErrorMessage(response.data.message || 'Có lỗi xảy ra, vui lòng thử lại');
      }
    } catch (error) {
      console.error('Đăng ký thất bại:', error); // Log chi tiết lỗi
      console.log('Chi tiết lỗi:', error.response?.data || 'Không có phản hồi từ server'); // Log chi tiết phản hồi lỗi
      setErrorMessage('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-box">
          <h2>REGISTER FORM</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <span className="icon">@</span>
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="icon">@</span>
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="PHONE"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <span className="icon">📞</span>
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="icon">🔒</span>
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="CONFIRM PASSWORD"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span className="icon">🔒</span>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="register-btn">REGISTER</button>
          </form>
          <div className="login-link">
            <p>
              Already have an account? → <a href="/login">Login Here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
