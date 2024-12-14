const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticateJWT = require('../middleware/authMiddleware');

// Đăng ký
router.post('/register', async (req, res) => {
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
      password
    });

    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công'
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    // Tìm user theo email hoặc phone
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email/Số điện thoại hoặc mật khẩu không đúng'
      });
    }

    // Kiểm tra password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email/Số điện thoại hoặc mật khẩu không đúng'
      });
    }

    // Tạo token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Lấy thông tin user (protected route)
router.get('/profile', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy user'
      });
    }
    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;