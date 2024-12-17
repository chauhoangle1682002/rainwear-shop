import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      // Gọi API forgot password ở đây
      // const response = await forgotPassword(email);
      
      setMessage('Link đặt lại mật khẩu đã được gửi đến email của bạn.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Quên Mật Khẩu</h2>
      <p className="instruction">
        Nhập email của bạn để nhận link đặt lại mật khẩu
      </p>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email của bạn"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading || !email}
          className={isLoading ? 'loading' : ''}
        >
          {isLoading ? 'Đang gửi...' : 'Gửi Link Đặt Lại Mật Khẩu'}
        </button>

        <div className="links">
          <a href="/login">Quay lại đăng nhập</a>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;