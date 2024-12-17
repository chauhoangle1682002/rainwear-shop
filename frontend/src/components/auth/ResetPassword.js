import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/ResetPassword.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Lấy token từ URL
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);

  // Kiểm tra token hợp lệ khi component mount
  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Gọi API verify token ở đây
        // const response = await verifyResetToken(token);
        setIsValidToken(true);
      } catch (err) {
        setIsValidToken(false);
        setError('Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn');
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra mật khẩu khớp nhau
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    // Kiểm tra độ dài mật khẩu
    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      // Gọi API reset password ở đây
      // const response = await resetPassword(token, formData.password);
      
      setMessage('Đặt lại mật khẩu thành công!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidToken) {
    return (
      <div className="reset-password-container">
        <div className="error-message">
          {error}
          <div className="links">
            <a href="/forgot-password">Yêu cầu link mới</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-container">
      <h2>Đặt Lại Mật Khẩu</h2>
      
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            placeholder="Mật khẩu mới"
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            placeholder="Xác nhận mật khẩu mới"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading || !formData.password || !formData.confirmPassword}
          className={isLoading ? 'loading' : ''}
        >
          {isLoading ? 'Đang xử lý...' : 'Đặt Lại Mật Khẩu'}
        </button>

        <div className="links">
          <a href="/login">Quay lại đăng nhập</a>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;