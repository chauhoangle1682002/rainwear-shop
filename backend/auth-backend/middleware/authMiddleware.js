const jwt = require('jsonwebtoken');

// Middleware xác thực JWT
const authenticateJWT = (req, res, next) => {
  // Lấy token từ header Authorization
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Không có token, yêu cầu xác thực!' });
  }

  // Kiểm tra token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token không hợp lệ!' });
    }
    // Nếu token hợp lệ, gán thông tin userId vào request
    req.userId = decoded.userId;
    next(); // Tiến hành tiếp tục với các middleware hoặc route tiếp theo
  });
};

module.exports = authenticateJWT;
