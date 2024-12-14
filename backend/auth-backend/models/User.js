const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Định nghĩa schema người dùng
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Email không hợp lệ'], // Validation cho email
  },
  phone: {
    type: String,
    unique: true,
    match: [/^[0-9]{10,15}$/, 'Số điện thoại không hợp lệ'], // Validation cho phone
  },
  password: {
    type: String,
    required: true,
  },
});

// Mã hóa mật khẩu trước khi lưu vào MongoDB
userSchema.pre('save', async function (next) {
  try {
    // Kiểm tra nếu email hoặc phone đã tồn tại
    if (this.isNew) {  // Chỉ kiểm tra khi tạo mới người dùng
      const existingUser = await User.findOne({
        $or: [{ email: this.email }, { phone: this.phone }],
      });

      if (existingUser) {
        const error = new Error('Email hoặc số điện thoại đã tồn tại!');
        return next(error);  // Nếu tồn tại, trả về lỗi
      }
    }

    if (!this.isModified('password')) return next(); // Chỉ mã hóa khi mật khẩu thay đổi
    const salt = await bcrypt.genSalt(10); // Tạo salt với 10 vòng lặp
    this.password = await bcrypt.hash(this.password, salt); // Mã hóa mật khẩu
    next();
  } catch (error) {
    next(error); // Gửi lỗi nếu có lỗi trong quá trình mã hóa hoặc kiểm tra
  }
});

// Phương thức so sánh mật khẩu (dùng trong đăng nhập)
userSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    if (!isMatch) {
      throw new Error('Mật khẩu không đúng');
    }
    return isMatch; // Trả về true nếu mật khẩu đúng
  } catch (error) {
    throw new Error('Lỗi khi so sánh mật khẩu');
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
