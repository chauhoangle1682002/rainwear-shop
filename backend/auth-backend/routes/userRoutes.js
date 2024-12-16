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

// Register route giữ nguyên...

// Login route với debug logs đầy đủ
router.post('/login', async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    console.log('Login attempt with:', { 
      emailOrPhone, 
      passwordReceived: !!password 
    });

    // Validate input
    if (!emailOrPhone || !password) {
      console.log('Missing credentials');
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin'
      });
    }

    // Find user
    const user = await User.findOne({
      $or: [
        { email: emailOrPhone },
        { phone: emailOrPhone }
      ]
    });

    console.log('User search result:', {
      found: !!user,
      userEmail: user?.email,
      userPhone: user?.phone
    });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({
        success: false,
        message: 'Email/Số điện thoại hoặc mật khẩu không đúng'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      console.log('Password does not match');
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

    console.log('Login successful, tokens generated');

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

// Profile route giữ nguyên...

// Refresh token route
router.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    console.log('Refresh token request received');
    
    if (!refreshToken) {
      console.log('No refresh token provided');
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

    console.log('Token document found:', !!tokenDoc);

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

    console.log('New access token generated');

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