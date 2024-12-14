import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"; // Icon thông báo thành công
import "../styles/ContactPage.css";

const ContactPage = () => {
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Handle form submission (e.g., send to server)
    // After successful submission, show the notification
    setShowNotification(true);

    // Hide the notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="contact-page-container">
      <div className="contact-page-inner">
        {/* Header Section */}
        <div className="contact-header">
          <h1>HIẾU ĐỨC Rainwear Shop</h1>
          <p>Liên hệ với chúng tôi để biết thêm thông tin và đặt hàng ngay hôm nay!</p>
        </div>

        {/* Notification Box */}
        {showNotification && (
          <div className="notification-box show">
            <FontAwesomeIcon icon={faCheckCircle} className="notification-icon" />
            <div className="notification-content">
              <p><strong>Thông báo:</strong> Gửi thông tin thành công!</p>
            </div>
            <button className="close-btn" onClick={() => setShowNotification(false)}>
              &times;
            </button>
          </div>
        )}

        {/* Content Section */}
        <div className="contact-content">
          {/* Working Hours Section */}
          <div className="working-hours">
            <h2>Giờ Mở Cửa</h2>
            <ul>
              <li><strong>Thứ Hai - Thứ Sáu:</strong> 9:00 AM - 6:00 PM</li>
              <li><strong>Thứ Bảy:</strong> 9:00 AM - 2:00 PM</li>
              <li><strong>Chủ Nhật:</strong> Đóng cửa</li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h2>Liên hệ với chúng tôi</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Tên</label>
              <input type="text" id="name" name="name" placeholder="Tên của bạn" required />

              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Email của bạn" required />

              <label htmlFor="subject">Chủ đề</label>
              <input type="text" id="subject" name="subject" placeholder="Chủ đề" required />

              <label htmlFor="message">Tin nhắn</label>
              <textarea id="message" name="message" rows="4" placeholder="Tin nhắn của bạn" required></textarea>

              <button type="submit">Gửi</button>
            </form>
          </div>

          {/* Right Section - Thông tin liên hệ và Feedback */}
          <div className="right-section">
            {/* Contact Info */}
            <div className="contact-info">
              <h2>Thông Tin Liên Hệ</h2>
              <ul>
                <li>
                  <strong>Địa chỉ:</strong>
                  <p>
                    123 Nguyễn Văn A<br />
                    Phường B, Quận C<br />
                    Thành phố Hồ Chí Minh, Việt Nam
                  </p>
                </li>
                <li>
                  <strong>Email:</strong>
                  <p>contact@hieuducrainwear.com</p>
                </li>
                <li>
                  <strong>Điện thoại:</strong>
                  <p>(+84) 123 456 789</p>
                </li>
                <li>
                  <strong>Mạng xã hội:</strong>
                  <div className="social-icons">
                    {/* Social media icons */}
                  </div>
                </li>
              </ul>
            </div>

            {/* Feedback Section */}
            <div className="testimonials">
              <h3>Ý kiến khách hàng</h3>
              <p>“Sản phẩm rất tốt và dịch vụ tuyệt vời!” - Khách hàng A</p>
              <p>“Áo mưa chất lượng, giá cả hợp lý.” - Khách hàng B</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
