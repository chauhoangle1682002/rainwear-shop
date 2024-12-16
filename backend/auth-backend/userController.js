const User = require('../models/User');
const Token = require('../models/Token');
const sendEmail = require('../utils/emailService');

// Các controller cho chức năng mới
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.userId);
    
    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({
        success: false,
        message: 'Mật khẩu hiện tại không đúng'
      });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Đổi mật khẩu thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server'
    });
  }
};

// Thêm các controller khác...

module.exports = {
  changePassword,
  updateProfile,
  forgotPassword,
  resetPassword
};