import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'; // Import hook useCart để lấy giỏ hàng
import '../styles/Navbar.css'; // Import file CSS

const Navbar = () => {
  const { getCartCount } = useCart(); // Lấy hàm getCartCount từ CartContext
  const cartItemsCount = getCartCount(); // Lấy số lượng sản phẩm trong giỏ hàng

  // Hàm tái sử dụng để xác định className cho NavLink
  const getNavClass = (isActive) => (isActive ? 'nav-link active' : 'nav-link');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid">
        {/* Logo */}
        <NavLink className="navbar-brand fs-3 fw-bold" to="/">
          Hiếu ĐỨc Rainwear Shop
        </NavLink>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className={({ isActive }) => getNavClass(isActive)} to="/">
                <i className="fas fa-home me-2"></i> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => getNavClass(isActive)} to="/products">
                <i className="fas fa-box-open me-2"></i> Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => getNavClass(isActive)} to="/cart">
                <i className="fas fa-shopping-cart me-2"></i> Cart
                {/* Hiển thị số lượng sản phẩm trong giỏ hàng */}
                {cartItemsCount > 0 && (
                  <span className="badge bg-warning text-dark ms-2">
                    {cartItemsCount}
                  </span>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => getNavClass(isActive)} to="/contact">
                <i className="fas fa-envelope me-2"></i> Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => getNavClass(isActive)} to="/about-us">
                <i className="fas fa-info-circle me-2"></i> About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => getNavClass(isActive)} to="/login">
                <i className="fas fa-sign-in-alt me-2"></i> Login/Register
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
