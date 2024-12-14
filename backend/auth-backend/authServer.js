const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Thêm dotenv để đọc file .env
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Import các route của người dùng

// Load biến môi trường từ file .env
dotenv.config();

// Kiểm tra giá trị MONGO_URI từ file .env
if (!process.env.MONGO_URI) {
  console.error('Không tìm thấy chuỗi kết nối MongoDB trong .env!');
  process.exit(1); // Dừng ứng dụng nếu không có MONGO_URI
} else {
  console.log('Chuỗi kết nối MongoDB:', process.env.MONGO_URI);
}

const app = express();
const PORT = process.env.AUTH_PORT || 5001; // Port mặc định là 5001

// Middleware
app.use(express.json()); // Đọc JSON từ request body
app.use(cors()); // Cho phép CORS

// Kết nối MongoDB và kiểm tra giá trị MONGO_URI
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Kết nối MongoDB thành công!'))
  .catch((error) => {
    console.error('Kết nối MongoDB thất bại:', error.message);
    process.exit(1); // Dừng ứng dụng nếu không kết nối được MongoDB
  });

// Routes
app.use('/api/users', userRoutes);

// Middleware để xử lý lỗi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Đã xảy ra lỗi trong server' });
});

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`Auth Server chạy trên cổng ${PORT}`);
});
