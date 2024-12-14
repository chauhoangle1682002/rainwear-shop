const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Dữ liệu sản phẩm
const products = {
  NhãnHiệuHiếuĐức: [
    { name: 'Áo mưa Rando 1', image: '/assets/images/pro2.jpg', price: '199.000Đ' },
    { name: 'Áo mưa Rando 2', image: '/assets/images/pro3.jpg', price: '299.000Đ' },
    { name: 'Áo mưa Rando 3', image: '/assets/images/pro3.jpg', price: '399.000Đ' },
    { name: 'Áo mưa Rando 4', image: '/assets/images/pro3.jpg', price: '399.000Đ' },
    { name: 'Áo mưa Rando 5', image: '/assets/images/pro3.jpg', price: '399.000Đ' },
    { name: 'Áo mưa Rando 6', image: '/assets/images/pro3.jpg', price: '399.000Đ' },
  ],
  ÁoMưaThôngMinh: [
    { name: 'Áo mưa Thông Minh 1', image: '/assets/images/pro4.jpg', price: '499.000Đ' },
    { name: 'Áo mưa Thông Minh 2', image: '/assets/images/pro5.jpg', price: '599.000Đ' },
    { name: 'Áo mưa Thông Minh 3', image: '/assets/images/pro6.jpg', price: '699.000Đ' },
    { name: 'Áo mưa Thông Minh 4', image: '/assets/images/pro6.jpg', price: '699.000Đ' },
    { name: 'Áo mưa Thông Minh 5', image: '/assets/images/pro6.jpg', price: '699.000Đ' },
    { name: 'Áo mưa Thông Minh 6', image: '/assets/images/pro6.jpg', price: '699.000Đ' },
  ],
  ÁoMưaTrẻEm: [
    { name: 'Áo mưa Trẻ Em 1', image: '/assets/images/pro7.jpg', price: '99.000Đ' },
    { name: 'Áo mưa Trẻ Em 2', image: '/assets/images/pro8.jpg', price: '149.000Đ' },
    { name: 'Áo mưa Trẻ Em 3', image: '/assets/images/pro9.jpg', price: '199.000Đ' },
    { name: 'Áo mưa Trẻ Em 4', image: '/assets/images/pro7.jpg', price: '99.000Đ' },
    { name: 'Áo mưa Trẻ Em 5', image: '/assets/images/pro7.jpg', price: '99.000Đ' },
    { name: 'Áo mưa Trẻ Em 6', image: '/assets/images/pro7.jpg', price: '99.000Đ' },
  ],
};

// Hàm tạo id duy nhất cho mỗi sản phẩm
const generateProductId = (category, index) => `${category}-${index}`;

app.use(cors());

// API trả về danh sách sản phẩm theo danh mục
app.get('/api/products', (req, res) => {
  const productsWithIds = {};

  // Lặp qua các danh mục và thêm id vào mỗi sản phẩm
  for (const category in products) {
    productsWithIds[category] = products[category].map((product, index) => {
      return {
        ...product,
        id: generateProductId(category, index),  // Thêm id vào mỗi sản phẩm
      };
    });
  }

  // Trả về dữ liệu có thêm trường id
  res.json(productsWithIds);
});

// API trả về sản phẩm theo danh mục (category)
app.get('/api/products/:category', (req, res) => {
  const category = req.params.category;
  const categoryProducts = products[category];

  if (!categoryProducts) {
    return res.status(404).json({
      message: 'Danh mục không tồn tại',
      validCategories: Object.keys(products),
    });
  }

  // Thêm id cho các sản phẩm trong danh mục
  const categoryProductsWithIds = categoryProducts.map((product, index) => {
    return {
      ...product,
      id: generateProductId(category, index),  // Thêm id vào mỗi sản phẩm
    };
  });

  // Trả về danh mục sản phẩm đã có id
  res.json(categoryProductsWithIds);
});

// Cung cấp các tệp tĩnh (như hình ảnh) từ thư mục assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
