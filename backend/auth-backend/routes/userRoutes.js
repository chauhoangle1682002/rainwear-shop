const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('../middleware/authMiddleware'); // Import middleware xác thực JWT

const router = express.Router();

// Đăng ký người dùng (POST /api/users/register)
router.post('/register', async (req, res) => {
  const { username, email, phone, password } = req.body;

  try {
    // Kiểm tra xem người dùng đã tồn tại chưa (kiểm tra email hoặc số điện thoại)
    const existingUser = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email hoặc Số điện thoại đã tồn tại!' });
    }

    // Tạo người dùng mới
    const user = new User({
      username,
      email,
      phone,
      password,
    });

    // Mã hóa mật khẩu trước khi lưu vào MongoDB
    user.password = await bcrypt.hash(user.password, 10);

    // Lưu người dùng mới vào MongoDB
    await user.save();
    res.status(201).json({ message: 'Đăng ký thành công!' });

  } catch (error) {
    console.error('Chi tiết lỗi backend:', error); // Log chi tiết lỗi
    res.status(500).json({ message: 'Đăng ký thất bại!' });
  }
});

// Đăng nhập người dùng (POST /api/users/login)
router.post('/login', async (req, res) => {
  const { emailOrPhone, password } = req.body;

  try {
    // Tìm người dùng dựa trên email hoặc số điện thoại
    let user = /\S+@\S+\.\S+/.test(emailOrPhone)
      ? await User.findOne({ email: emailOrPhone })
      : await User.findOne({ phone: emailOrPhone });

    if (!user) {
      return res.status(400).json({ message: 'Email hoặc Số điện thoại không đúng!' });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu không đúng!' });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Chi tiết lỗi backend:', error); // Log chi tiết lỗi
    res.status(500).json({ message: 'Đăng nhập thất bại!' });
  }
});

// Route yêu cầu xác thực (Protected route)
router.get('/profile', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); // Tìm người dùng và loại bỏ mật khẩu
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng' });
  }
});

module.exports = router;
 