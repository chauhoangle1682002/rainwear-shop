const User = require('../models/User');
const Token = require('../models/Token');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendVerificationEmail, sendResetPasswordEmail } = require('../utils/emailService');

// Controller đăng ký
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // Kiểm tra user tồn tại
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email, số điện thoại hoặc username đã tồn tại'
      });
    }

    // Tạo user mới
    const user = await User.create({
      username,
      email,
      phone,
      password,
      isVerified: false
    });

    // Tạo token xác thực email
    const verificationToken = crypto.randomBytes(32).toString('hex');
    await Token.create({
      userId: user._id,
      token: verificationToken,
      type: 'verify',
      expires: Date.now() + 24*60*60*1000
    });

    // Gửi email xác thực
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản.'
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller đăng nhập
const login = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Email/Số điện thoại hoặc mật khẩu không đúng'
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: 'Vui lòng xác thực email trước khi đăng nhập'
      });
    }

    // Tạo access token và refresh token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = crypto.randomBytes(32).toString('hex');
    await Token.create({
      userId: user._id,
      token: refreshToken,
      type: 'refresh',
      expires: Date.now() + 7*24*60*60*1000
    });

    res.json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller quên mật khẩu
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Email không tồn tại trong hệ thống'
      });
    }

    // Tạo token reset password
    const resetToken = crypto.randomBytes(32).toString('hex');
    await Token.create({
      userId: user._id,
      token: resetToken,
      type: 'reset',
      expires: Date.now() + 1*60*60*1000
    });

    // Gửi email
    await sendResetPasswordEmail(email, resetToken);

    res.json({
      success: true,
      message: 'Email đặt lại mật khẩu đã được gửi'
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller đặt lại mật khẩu
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const tokenDoc = await Token.findOne({
      token,
      type: 'reset',
      expires: { $gt: Date.now() }
    });

    if (!tokenDoc) {
      return res.status(400).json({
        success: false,
        message: 'Token không hợp lệ hoặc đã hết hạn'
      });
    }

    // Cập nhật mật khẩu
    const user = await User.findById(tokenDoc.userId);
    user.password = password;
    await user.save();

    // Xóa token
    await Token.deleteOne({ _id: tokenDoc._id });

    res.json({
      success: true,
      message: 'Đặt lại mật khẩu thành công'
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword
};