import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../api/userAPI';
import '../../styles/ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Component logic...
};

export default ResetPassword;