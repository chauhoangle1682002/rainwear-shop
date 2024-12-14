import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal'; // Import modal chi tiết sản phẩm
import { useCart } from '../contexts/CartContext'; // Import CartContext để quản lý giỏ hàng
import { useProduct } from '../services/productService'; // Import ProductService để lấy sản phẩm từ API
import '../styles/ProductsPage.css'; // Import file CSS cho trang sản phẩm

const ProductsPage = () => {
  const { addToCart } = useCart(); // Lấy hàm addToCart từ CartContext
  const { products, categories, loading, error } = useProduct(); // Sử dụng ProductService để lấy dữ liệu

  const category = new URLSearchParams(window.location.search).get('category');

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => setSelectedProduct(product);
  const handleCloseModal = () => setSelectedProduct(null);

  const handleAddToCart = (product) => {
    if (!product || !product.id) {
      alert("Sản phẩm không hợp lệ!");
      console.error("Sản phẩm không hợp lệ:", product);
      return;
    }
    addToCart(product);
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  const renderProducts = (productList) =>
    productList.map((product, index) => (
      <div className="col-md-4 mb-4" key={index}>
        <ProductCard
          image={product.image}
          name={product.name}
          price={product.price}
          onClick={() => handleProductClick(product)} 
        />
        <button className="btn btn-primary mt-3" onClick={() => handleAddToCart(product)}>
          Thêm vào giỏ
        </button>
      </div>
    ));

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Đã có lỗi xảy ra: {error}</div>;

  return (
    <div className="products-page">
      <h2 className="text-center mb-5">
        {category ? category.toUpperCase() : 'Tất Cả Sản Phẩm'}
      </h2>
      <div className="container">
        {category ? (
          <div className="row">{renderProducts(products[category] || [])}</div>
        ) : (
          Object.keys(products).map((key) => (
            <div key={key}>
              <h3 className="text-center mb-5">{key.toUpperCase()}</h3>
              <div className="row">{renderProducts(products[key])}</div>
            </div>
          ))
        )}
      </div>
      {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}
    </div>
  );
};

export default ProductsPage;
