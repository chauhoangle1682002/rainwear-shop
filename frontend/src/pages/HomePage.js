import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard'; // Import ProductCard component
import ProductModal from '../components/ProductModal'; // Import ProductModal component
import { useCart } from '../contexts/CartContext'; // Import CartContext
import { useProduct } from '../services/productService'; // Import useProduct từ ProductService
import '../styles/HomePage.css';

const HomePage = () => {
  const { addToCart } = useCart(); // Lấy hàm addToCart từ CartContext
  const [selectedProduct, setSelectedProduct] = useState(null); // Trạng thái để mở modal
  const [visibleSections, setVisibleSections] = useState([]); // Lưu các section đã visible
  const [faqOpen, setFaqOpen] = useState(null); // Trạng thái để mở/đóng câu hỏi FAQ

  // Sử dụng useProduct hook để lấy danh sách sản phẩm và trạng thái loading, error
  const { categories, products, loading, error } = useProduct();

  // Mảng các hình ảnh banner
  const bannerImages = [
    '/assets/images/banner.jpg',
    '/assets/images/banner2.jpg',
  ];

  // Trạng thái để đổi banner mỗi 5 giây
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(interval); // Dọn dẹp interval khi component bị unmount
  }, []);

  // Sử dụng IntersectionObserver để theo dõi khi các section xuất hiện trên màn hình
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setVisibleSections((prevSections) => [...prevSections, sectionId]);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('.product-list');
    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  // Hàm mở modal với sản phẩm đã chọn
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  // Hàm thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  // Hàm để mở/đóng câu hỏi FAQ
  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  if (loading) return <div>Loading...</div>; // Hiển thị khi đang tải
  if (error) return <div>Error: {error}</div>; // Hiển thị khi có lỗi

  return (
    <div className="homepage">
      {/* Banner Section */}
      <section className="banner" style={{ backgroundImage: `url(${bannerImages[currentImageIndex]})` }}>
        <div className="banner-content">
          <h2>Áo mưa thời trang</h2>
          <p>Thoải mái và tiện dụng</p>
          <div className="buttons">
            <button className="btn btn-warning me-2">Mua Ngay</button>
            <Link to="/products" className="btn btn-outline-warning">Xem Thêm</Link>
          </div>
        </div>
      </section>

      {/* Thông tin miễn phí vận chuyển và các ưu đãi khác */}
      <section className="shipping-info text-center my-5">
        <div className="container">
          <h2>Ưu Đãi Đặc Biệt</h2>
          <div className="row">
            <div className="col-md-3">
              <i className="fas fa-truck fa-3x"></i>
              <h4>Miễn Phí Vận Chuyển</h4>
              <p>Cho đơn hàng trên 500k</p>
            </div>
            <div className="col-md-3">
              <i className="fas fa-shield-alt fa-3x"></i>
              <h4>Bảo Hành 1 Năm</h4>
              <p>Đổi trả miễn phí</p>
            </div>
            <div className="col-md-3">
              <i className="fas fa-headset fa-3x"></i>
              <h4>Hỗ Trợ 24/7</h4>
              <p>Luôn sẵn sàng phục vụ</p>
            </div>
            <div className="col-md-3">
              <i className="fas fa-gift fa-3x"></i>
              <h4>Quà Tặng Hấp Dẫn</h4>
              <p>Nhiều ưu đãi đặc biệt</p>
            </div>
          </div>
        </div>
      </section>

      {/* Áo Mưa Rando */}
      <section className={`product-list ${visibleSections.includes('rando') ? 'visible' : ''}`} id="rando">
        <div className="container-fluid">
          <h2 className="text-center mb-5">Áo Mưa Rando</h2>
          <div className="row">
            {products['NhãnHiệuHiếuĐức'] && products['NhãnHiệuHiếuĐức'].slice(0, 3).map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <ProductCard
                  id={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  onClick={() => handleProductClick(product)}
                />
                <button className="btn btn-primary mt-3" onClick={() => handleAddToCart(product)}>
                  Thêm vào giỏ
                </button>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/products" className="btn btn-warning">Xem Thêm Sản Phẩm</Link>
          </div>
        </div>
      </section>

      {/* Áo Mưa Thông Minh */}
      <section className={`product-list ${visibleSections.includes('thongminh') ? 'visible' : ''}`} id="thongminh">
        <div className="container-fluid">
          <h2 className="text-center mb-5">Áo Mưa Thông Minh</h2>
          <div className="row">
            {products['ÁoMưaThôngMinh'] && products['ÁoMưaThôngMinh'].slice(0, 3).map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <ProductCard
                  id={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  onClick={() => handleProductClick(product)}
                />
                <button className="btn btn-primary mt-3" onClick={() => handleAddToCart(product)}>
                  Thêm vào giỏ
                </button>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/products" className="btn btn-warning">Xem Thêm Sản Phẩm</Link>
          </div>
        </div>
      </section>

      {/* Áo Mưa Trẻ Em */}
      <section className={`product-list ${visibleSections.includes('treem') ? 'visible' : ''}`} id="treem">
        <div className="container-fluid">
          <h2 className="text-center mb-5">Áo Mưa Trẻ Em</h2>
          <div className="row">
            {products['ÁoMưaTrẻEm'] && products['ÁoMưaTrẻEm'].slice(0, 3).map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <ProductCard
                  id={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  onClick={() => handleProductClick(product)}
                />
                <button className="btn btn-primary mt-3" onClick={() => handleAddToCart(product)}>
                  Thêm vào giỏ
                </button>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/products" className="btn btn-warning">Xem Thêm Sản Phẩm</Link>
          </div>
        </div>
      </section>

      {/* Phần Câu Hỏi Thường Gặp (FAQ) */}
      <section className="faq-section my-5">
  <div className="container">
    <h2 className="text-center mb-4">Câu Hỏi Thường Gặp (FAQ)</h2>
    <div className="faq-item">
      <h5 onClick={() => toggleFaq(0)} className="faq-question">1. Chính sách đổi trả của bạn là gì?</h5>
      <p className={`faq-answer ${faqOpen === 0 ? 'show' : ''}`}>Chúng tôi chấp nhận đổi trả trong vòng 30 ngày kể từ ngày nhận hàng.</p>
    </div>
    <div className="faq-item">
      <h5 onClick={() => toggleFaq(1)} className="faq-question">2. Tôi có thể theo dõi đơn hàng của mình không?</h5>
      <p className={`faq-answer ${faqOpen === 1 ? 'show' : ''}`}>Có, bạn sẽ nhận được mã theo dõi qua email sau khi đơn hàng được gửi đi.</p>
    </div>
    <div className="faq-item">
      <h5 onClick={() => toggleFaq(2)} className="faq-question">3. Bạn có cung cấp miễn phí vận chuyển không?</h5>
      <p className={`faq-answer ${faqOpen === 2 ? 'show' : ''}`}>Có, chúng tôi cung cấp miễn phí vận chuyển cho đơn hàng trên 500k.</p>
    </div>
    <div className="faq-item">
      <h5 onClick={() => toggleFaq(3)} className="faq-question">4. Làm thế nào để liên hệ với dịch vụ khách hàng?</h5>
      <p className={`faq-answer ${faqOpen === 3 ? 'show' : ''}`}>Bạn có thể liên hệ với chúng tôi qua email hoặc số điện thoại được cung cấp trên trang liên hệ.</p>
    </div>
  </div>
</section>

      {/* Modal hiển thị chi tiết sản phẩm */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default HomePage;