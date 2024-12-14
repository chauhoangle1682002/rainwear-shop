import React from "react";
import "../styles/Footer.css"; // Đường dẫn tới file CSS tùy chỉnh

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white">
      <div className="container py-5">
        {/* Các phần chính của footer */}
        <div className="row text-center footer-content">
          {/* Cột: Giới thiệu về chúng tôi */}
          <div className="col-lg-2 col-md-3 col-sm-6 col-12 mb-4">
            <i className="fas fa-info-circle mb-3" style={{ fontSize: "2rem" }}></i>
            <h5>Giới Thiệu Về Chúng Tôi</h5>
            <p>
              Tìm hiểu thêm về công ty của chúng tôi và các dịch vụ tuyệt vời phía sau những công cụ này.
            </p>
          </div>

          {/* Cột: Đọc Blog */}
          <div className="col-lg-2 col-md-3 col-sm-6 col-12 mb-4">
            <i className="fas fa-blog mb-3" style={{ fontSize: "2rem" }}></i>
            <h5>Đọc Blog</h5>
            <p>Cập nhật tin tức mới nhất từ ngành và cộng đồng của chúng tôi.</p>
          </div>

          {/* Cột: Nhận Giúp Đỡ */}
          <div className="col-lg-2 col-md-3 col-sm-6 col-12 mb-4">
            <i className="fas fa-headset mb-3" style={{ fontSize: "2rem" }}></i>
            <h5>Nhận Giúp Đỡ</h5>
            <p>
              Gặp vấn đề với một trong những công cụ của chúng tôi? Hãy kiểm tra các lựa chọn hỗ trợ của chúng tôi.
            </p>
          </div>

          {/* Cột: Theo Dõi Chúng Tôi */}
          <div className="col-lg-2 col-md-3 col-sm-6 col-12 mb-4">
            <i className="fas fa-share-alt mb-3" style={{ fontSize: "2rem" }}></i>
            <h5>Theo Dõi Chúng Tôi</h5>
            <p>
              Nhận các cập nhật mới nhất từ chúng tôi trên các mạng xã hội hoặc tham gia cuộc trò chuyện trực tuyến.
            </p>
          </div>

          {/* Cột: Địa chỉ */}
          <div className="col-lg-2 col-md-3 col-sm-6 col-12 mb-4">
            <i className="fas fa-map-marker-alt mb-3" style={{ fontSize: "2rem" }}></i>
            <h5>Địa Chỉ</h5>
            <p>100 Đường Hùng Vương, TP Thái Bình, Tỉnh Thái Bình</p>
          </div>
        </div>

        {/* Đăng ký nhận bản tin */}
        <div className="newsletter bg-secondary text-white p-4 rounded text-center mt-5">
          <h5 className="mb-3">
            Bạn Muốn Nhận Tin Tức Mới Nhất? Tham Gia Danh Sách Gửi Thư Của Chúng Tôi!
          </h5>
          <form className="d-flex justify-content-center">
            <input
              type="email"
              className="form-control me-2"
              placeholder="Email của bạn..."
            />
            <button className="btn btn-warning" type="submit">
              Gửi
            </button>
          </form>
        </div>

        {/* Phần bản quyền */}
        <div className="text-center mt-4 copyright">
          <p className="mb-0">© 2024 NguyenHieu. Bảo Lưu Tất Cả Quyền.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
