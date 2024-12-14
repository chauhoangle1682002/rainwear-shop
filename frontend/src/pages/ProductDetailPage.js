import React from 'react';
import { useParams } from 'react-router-dom';

const productsData = {
  NhãnHiệuHiếuĐức: [
    { id: 1, image: '/assets/images/pro2.jpg', name: 'Áo mưa Rando 1', price: '199.000Đ', description: 'Mô tả sản phẩm Rando 1' },
    { id: 2, image: '/assets/images/pro3.jpg', name: 'Áo mưa Rando 2', price: '299.000Đ', description: 'Mô tả sản phẩm Rando 2' },
    // các sản phẩm khác
  ],
  // các danh mục khác
};

const ProductDetailPage = () => {
  const { id } = useParams();
  let product;

  for (let category in productsData) {
    product = productsData[category].find((item) => item.id === parseInt(id));
    if (product) break;
  }

  return (
    <div className="product-detail">
      {product ? (
        <>
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.price}</p>
          <p>{product.description}</p>
        </>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductDetailPage;
