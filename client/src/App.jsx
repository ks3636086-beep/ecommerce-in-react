import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
import QuickViewModal from './components/QuickViewModal';
import Toast from './components/Toast';

// 6 Strict Main Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import CheckoutLogin from './pages/CheckoutLogin';
import Products from './pages/Products';
import Login from './pages/login';
import Profile from './pages/Profile';

// Scroll to top helper on page navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ShopProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased">
          {/* Header */}
          <Navbar />

          {/* Main Route Pages */}
          <main className="flex-1">
            <Routes>
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
              {/* Fallback to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Modals & Notifications */}
          <QuickViewModal />
          <Toast />

          {/* Mobile Bottom Navigation */}
          <MobileNav />

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </ShopProvider>
  );
}

export default App;
