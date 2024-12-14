import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, addToCart, decreaseQuantity } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + parseFloat(item.price.replace('Đ', '').replace('.', '').trim()) * item.quantity,
    0
  );

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    addToCart({ ...cartItems.find((item) => item.id === id), quantity: newQuantity });
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  return (
    <div className="cart-page">
      <h2 className="text-center mb-5">Giỏ Hàng</h2>

      <div className="container">
        {cartItems.length > 0 ? (
          <div className="row">
            {cartItems.map((item) => (
              <div className="col-md-4 mb-4" key={item.id}>
                <div className="card">
                  <img src={item.image} alt={item.name} className="card-img-top" />
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Giá: {item.price}</p>
                    <div className="d-flex justify-content-center align-items-center">
                      <button
                        className="btn btn-secondary me-2"
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-secondary ms-2"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-danger mt-3"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">Giỏ hàng của bạn đang trống.</p>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="container text-center mt-4">
          <h4>Tổng tiền: {totalPrice.toLocaleString()} Đ</h4>
          {/* Nút đến trang thanh toán */}
          <button
            className="btn btn-success btn-lg mt-3 px-5 py-3 checkout-btn" // Thêm class checkout-btn
            onClick={() => navigate('/checkout')}
          >
            Đến trang thanh toán
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
