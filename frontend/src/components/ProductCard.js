import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ProductCard.css';

const ProductCard = ({ id, image, name, price, onClick }) => {
  return (
    <div className="card">
      <img src={image} alt={name} className="card-img-top" />
      <div className="card-body text-center">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{price}</p>
      </div>

      {/* Nút xem chi tiết */}
      <div className="card-footer text-center">
        <button className="btn btn-info" onClick={onClick}>
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired, // Đảm bảo có hàm onClick khi click vào sản phẩm
};

export default ProductCard;
