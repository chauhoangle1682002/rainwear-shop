import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // SweetAlert2
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Checkout.css"; // File CSS tùy chỉnh

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  // Tính tổng giá trị giỏ hàng
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + parseFloat(item.price.replace('Đ', '').replace('.', '').trim()) * item.quantity,
    0
  );

  // Hàm xử lý khi thanh toán
  const handleCheckout = () => {
    if (!name || !address || !phone) {
      setError('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    // Nếu mọi thông tin đã đầy đủ, thực hiện thanh toán
    setError('');
    clearCart();

    // SweetAlert2 thông báo thanh toán thành công
    Swal.fire({
      icon: 'success',
      title: '<strong>Thanh toán thành công!</strong>',
      html: '<p>Cảm ơn bạn đã mua hàng!</p>',
      confirmButtonText: '<i class="fas fa-home"></i> Quay về trang chủ',
      iconColor: '#28a745',
      background: '#f8f9fa',
      confirmButtonColor: '#007bff',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg rounded-pill px-4 py-2',
      },
      buttonsStyling: false,
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="checkout-page container py-5">
      <div className="checkout-header text-center mb-4">
        <h1 className="text-gradient">Thanh Toán</h1>
        <p className="lead text-muted">Hoàn tất đơn hàng và tận hưởng sản phẩm tuyệt vời</p>
      </div>
      <div className="row">
        {/* Cột bên trái: Thông tin giỏ hàng */}
        <div className="col-md-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4">
                <i className="bi bi-cart3 me-2"></i>Thông tin giỏ hàng
              </h5>
              {cartItems.length > 0 ? (
                <ul className="list-group">
                  {cartItems.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{item.name}</strong> x {item.quantity}
                      </div>
                      <span>{item.price}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">Giỏ hàng của bạn đang trống.</p>
              )}
            </div>
          </div>
        </div>

        {/* Cột bên phải: Thông tin người nhận và tổng tiền */}
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4">
                <i className="bi bi-person-circle me-2"></i>Thông tin người nhận
              </h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Họ và tên</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Địa chỉ giao hàng</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Số điện thoại</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
              </form>
            </div>
          </div>
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title mb-4">Tổng tiền</h5>
              <p className="total-price text-danger fw-bold fs-3">
                {totalPrice.toLocaleString()} Đ
              </p>
              <button className="btn btn-success btn-lg w-100 mb-2" onClick={handleCheckout}>
                Xác nhận thanh toán
              </button>
              <button className="btn btn-outline-primary btn-lg w-100" onClick={() => navigate('/')}>
                <i className="bi bi-arrow-left me-2"></i>Quay về trang chủ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
