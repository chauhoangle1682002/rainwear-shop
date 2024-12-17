import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';
import { Dropdown } from 'bootstrap';

const Navbar = () => {
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const cartItemsCount = getCartCount();

  // Debug user state
  useEffect(() => {
    console.log('Current user in Navbar:', user);
  }, [user]);

  // Thêm useEffect để khởi tạo Bootstrap dropdown
  useEffect(() => {
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    const dropdownList = [...dropdownElementList].map(dropdownToggleEl => {
      return new Dropdown(dropdownToggleEl);
    });

    // Cleanup
    return () => {
      dropdownList.forEach(dropdown => {
        dropdown.dispose();
      });
    };
  }, []);

  const getNavClass = (isActive) => (isActive ? 'nav-link active' : 'nav-link');

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login'; // Thêm chuyển hướng sau logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid">
        <NavLink className="navbar-brand fs-3 fw-bold" to="/">
          Hiếu Đức Rainwear Shop
        </NavLink>

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

            {user ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle user-menu"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user user-icon"></i>
                  <span className="user-name ms-2">{user.name || 'User'}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <NavLink className="dropdown-item" to="/profile">
                      <i className="fas fa-user-circle me-2"></i>
                      <span>Profile</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/change-password">
                      <i className="fas fa-key me-2"></i>
                      <span>Change Password</span>
                    </NavLink>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt me-2"></i>
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink className={({ isActive }) => getNavClass(isActive)} to="/login">
                  <i className="fas fa-sign-in-alt me-2"></i> Login/Register
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;