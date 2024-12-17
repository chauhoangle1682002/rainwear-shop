import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ChangePassword.css'; // Sửa lại đường dẫn này

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Mật khẩu mới không khớp');
      return;
    }
    try {
      // API call here
      navigate('/profile');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="change-password-container">
      <h2>Đổi Mật Khẩu</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Mật khẩu hiện tại"
          value={formData.currentPassword}
          onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
        />
        <input
          type="password"
          placeholder="Mật khẩu mới"
          value={formData.newPassword}
          onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
        />
        <input
          type="password"
          placeholder="Xác nhận mật khẩu mới"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
        />
        <button type="submit">Đổi Mật Khẩu</button>
      </form>
    </div>
  );
};

export default ChangePassword;