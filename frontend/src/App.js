import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Import react-router-dom
import Navbar from './components/Navbar'; // Thanh điều hướng
import Footer from './components/Footer'; // Footer của ứng dụng
import HomePage from './pages/HomePage'; // Trang Home
import ProductsPage from './pages/ProductsPage'; // Trang Sản phẩm
import Cart from './components/Cart'; // Trang Giỏ hàng
import ContactPage from './pages/ContactPage'; // Trang Liên hệ
import ProductDetailPage from './pages/ProductDetailPage'; // Trang Chi tiết sản phẩm
import Checkout from './components/Checkout'; // Trang Thanh toán
import ErrorPage from './pages/ErrorPage'; // Trang 404
import { CartProvider } from './contexts/CartContext'; // Import CartProvider
import { ProductProvider } from './services/productService';// Import ProductProvider
import AboutUs from './pages/AboutUs'; // Trang About Us
import LoginPage from './pages/LoginPage'; // Trang Đăng nhập
import RegisterPage from './pages/RegisterPage'; // Trang Đăng ký

// Thêm file CSS
import './styles/App.css';

const App = () => {
  return (
    <CartProvider>
      <ProductProvider>
        <Router>
          <Navbar /> {/* Thanh điều hướng */}
          <MainContent /> {/* Nội dung chính */}
        </Router>
      </ProductProvider>
    </CartProvider>
  );
};

const MainContent = () => {
  const location = useLocation();

  // Kiểm tra nếu đang ở trang Đăng nhập hoặc Đăng ký
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      <div className="container mx-auto my-4">
        <Routes>
          {/* Routes chính */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      {/* Footer sẽ bị ẩn trên các trang Login và Register */} 
      {!isAuthPage && <Footer />}
    </>
  );
};

export default App;
