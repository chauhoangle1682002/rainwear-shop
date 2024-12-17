import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

// Components hiện có
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

// Pages hiện có
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ErrorPage from './pages/ErrorPage';
import AboutUs from './pages/AboutUs';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Components mới với đường dẫn đúng
import ChangePassword from './components/auth/ChangePassword';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import UpdateProfile from './components/profile/UpdateProfile';
import UserProfile from './components/profile/UserProfile';
import ProtectedRoute from './components/common/ProtectedRoute';

// Providers
import { CartProvider } from './contexts/CartContext';
import { ProductProvider } from './services/productService';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Styles
import './styles/App.css';

// Loading component
const LoadingSpinner = () => (
  <div className="loading-spinner">Loading...</div>
);

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <Router>
              <ScrollToTop />
              <Navbar />
              <MainContent />
            </Router>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

const MainContent = () => {
  const location = useLocation();
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  const noFooterPages = [
    '/login', 
    '/register', 
    '/forgot-password',
    '/reset-password'
  ];
  
  const isAuthPage = noFooterPages.includes(location.pathname) || 
                    location.pathname.startsWith('/reset-password/');

  return (
    <>
      <div className="container mx-auto my-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route path="/cart" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/checkout" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/profile" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/update-profile" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/change-password" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            </Suspense>
          } />

          {/* Error Route */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      {!isAuthPage && <Footer />}
    </>
  );
};

export default App;