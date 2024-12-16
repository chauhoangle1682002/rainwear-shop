const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVerificationEmail = async (email, token) => {
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;
  
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Xác thực email',
    html: `
      <h1>Xác thực email của bạn</h1>
      <p>Click vào link sau để xác thực email: <a href="${verifyUrl}">${verifyUrl}</a></p>
    `
  });
};

const sendResetPasswordEmail = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Đặt lại mật khẩu',
    html: `
      <h1>Đặt lại mật khẩu</h1>
      <p>Click vào link sau để đặt lại mật khẩu: <a href="${resetUrl}">${resetUrl}</a></p>
    `
  });
};

module.exports = { sendVerificationEmail, sendResetPasswordEmail };