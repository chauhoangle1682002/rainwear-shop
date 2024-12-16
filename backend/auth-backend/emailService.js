const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // Cấu hình email service
});

const sendResetPasswordEmail = async (email, resetToken) => {
  // Logic gửi email
};

const sendVerificationEmail = async (email, verifyToken) => {
  // Logic gửi email xác thực
};

module.exports = {
  sendResetPasswordEmail,
  sendVerificationEmail
};