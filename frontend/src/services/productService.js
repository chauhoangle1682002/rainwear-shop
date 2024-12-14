import { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [categories, setCategories] = useState({});
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Không thể tải danh sách sản phẩm.');
        }
        const data = await response.json();

        setCategories(data);
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Không thể tải danh sách sản phẩm.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ categories, products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};
