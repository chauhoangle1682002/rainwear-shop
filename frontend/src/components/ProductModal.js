import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/ProductModal.css'; // Đường dẫn CSS modal

const ProductModal = ({ product, onClose }) => {
  const [size, setSize] = useState('S');
  const [color, setColor] = useState('orange');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null; // Không hiển thị nếu không có sản phẩm

  const handleBuyNow = () => {
    if (!size || !color) {
      alert('Vui lòng chọn đầy đủ size và màu sắc trước khi mua!');
      return;
    }
    alert(
      `Bạn đã chọn mua sản phẩm:\nTên: ${product.name}\nSize: ${size}\nMàu sắc: ${color}\nSố lượng: ${quantity}`
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Nút đóng */}
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i> {/* Icon đóng từ Font Awesome */}
        </button>

        {/* Nội dung modal */}
        <div className="modal-body" style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          {/* Hình ảnh sản phẩm */}
          <div className="modal-image">
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
          </div>

          {/* Chi tiết sản phẩm */}
          <div className="modal-details">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#f8b400' }}>
              Giá: {product.price}
            </p>

            {/* Tùy chọn Size */}
            <div>
              <strong>Chọn size:</strong>
              <div className="size-options">
                {['S', 'M', 'L', 'XL'].map((s) => (
                  <button
                    key={s}
                    className={`size-option ${size === s ? 'selected' : ''}`}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Tùy chọn Màu sắc */}
            <div style={{ marginTop: '20px' }}>
              <strong>Chọn màu sắc:</strong>
              <div className="color-options">
                {['orange', 'blue', 'green'].map((c) => (
                  <span
                    key={c}
                    className={`color-option ${c} ${color === c ? 'selected' : ''}`}
                    onClick={() => setColor(c)}
                  ></span>
                ))}
              </div>
            </div>

            {/* Số lượng */}
            <div style={{ marginTop: '15px' }}>
              <label htmlFor="quantity">
                <strong>Số lượng:</strong>
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                style={{
                  marginLeft: '10px',
                  padding: '5px',
                  width: '60px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
            </div>

            {/* Nút Mua ngay */}
            <button className="btn" onClick={handleBuyNow} style={{ marginTop: '20px' }}>
              <i className="fas fa-shopping-cart" style={{ marginRight: '8px' }}></i>
              Mua Ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProductModal;
