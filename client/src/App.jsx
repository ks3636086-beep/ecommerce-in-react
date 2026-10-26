import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
import QuickViewModal from './components/QuickViewModal';
import Toast from './components/Toast';

// Customer Store Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import CheckoutLogin from './pages/CheckoutLogin';
import Products from './pages/Products';
import Login from './pages/login';
import Profile from './pages/Profile';

// Admin Panel Components
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminCategories from './admin/Categories';
import AdminProducts from './admin/Products';
import AdminOrders from './admin/Orders';

// Scroll to top helper on page navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// Protected Route for Demo Admin Panel
function AdminProtectedRoute({ children }) {
  const isAuth = localStorage.getItem('admin_authenticated') === 'true';
  if (!isAuth) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

function AppContent() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <div
      className={`min-h-screen ${
        isAdminRoute
          ? 'bg-slate-50 text-slate-900 font-sans'
          : 'flex flex-col bg-white text-slate-900 font-sans antialiased'
      }`}
    >
      {/* Show Customer Storefront Header only on non-admin routes */}
      {!isAdminRoute && <Navbar />}

      {/* Main Content Area */}
      <main className={isAdminRoute ? '' : 'flex-1'}>
        <Routes>
          {/* Customer Store Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/category/:category" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<CheckoutLogin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account" element={<Navigate to="/profile" replace />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Modals & Notifications - Only on Storefront */}
      {!isAdminRoute && (
        <>
          <QuickViewModal />
          <Toast />
          <MobileNav />
          <Footer />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <ShopProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </ShopProvider>
  );
}

export default App;
