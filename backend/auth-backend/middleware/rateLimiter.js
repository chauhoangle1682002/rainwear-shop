const rateLimit = require('express-rate-limit');

exports.registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 5, // Tăng số lượng requests cho phép lên 5
  message: {
    success: false,
    message: 'Quá nhiều yêu cầu đăng ký, vui lòng thử lại sau 15 phút'
  },
  standardHeaders: true,
  legacyHeaders: false
});

exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Quá nhiều yêu cầu đăng nhập, vui lòng thử lại sau 15 phút'
  },
  standardHeaders: true,
  legacyHeaders: false
});