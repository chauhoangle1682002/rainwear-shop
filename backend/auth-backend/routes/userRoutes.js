const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const Token = require('../models/Token');
const authenticateJWT = require('../middleware/authMiddleware');

// Validation functions
const validateEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

const validatePhone = (phone) => {
  return /^[0-9]{10,11}$/.test(phone);
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    console.log('Register request received:', { username, email, phone });

    // Validate input
    if (!username || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin'
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email không hợp lệ'
      });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Số điện thoại không hợp lệ'
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }, { username }]
    });

    if (existingUser) {
      let message = 'Tài khoản đã tồn tại';
      if (existingUser.email === email) message = 'Email đã được sử dụng';
      if (existingUser.phone === phone) message = 'Số điện thoại đã được sử dụng';
      if (existingUser.username === username) message = 'Username đã được sử dụng';

      return res.status(400).json({
        success: false,
        message
      });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      phone,
      password
    });

    console.log('User created successfully:', user._id);

    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công'
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau'
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    console.log('Login attempt:', { emailOrPhone });

    // Validate input
    if (!emailOrPhone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin'
      });
    }

    // Find user
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({
        success: false,
        message: 'Email/Số điện thoại hoặc mật khẩu không đúng'
      });
    }

    console.log('User found:', { username: user.username, email: user.email });

    // Check password
    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email/Số điện thoại hoặc mật khẩu không đúng'
      });
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = crypto.randomBytes(32).toString('hex');
    
    // Save refresh token
    await Token.create({
      userId: user._id,
      token: refreshToken,
      type: 'refresh',
      expires: Date.now() + 7*24*60*60*1000 // 7 days
    });

    // Remove old refresh tokens
    await Token.deleteMany({
      userId: user._id,
      type: 'refresh',
      expires: { $lt: Date.now() }
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
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau'
    });
  }
});

// Get Profile
router.get('/profile', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy thông tin người dùng'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau'
    });
  }
});

// Refresh Token
router.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    const tokenDoc = await Token.findOne({
      token: refreshToken,
      type: 'refresh',
      expires: { $gt: Date.now() }
    });

    if (!tokenDoc) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token'
      });
    }

    const accessToken = jwt.sign(
      { userId: tokenDoc.userId },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.json({
      success: true,
      accessToken
    });

  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau'
    });
  }
});

module.exports = router;