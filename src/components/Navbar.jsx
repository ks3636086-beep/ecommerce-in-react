import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Percent,
  Check,
  LogOut,
  Package,
  BookOpen,
  PhoneCall
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const {
    cartCount,
    wishlistCount,
    user,
    logoutUser,
    searchQuery,
    setSearchQuery,
    setActiveCategory,
    products,
    openQuickView,
    applyCoupon
  } = useShop();

  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  const searchContainerRef = useRef(null);
  const userDropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Filtered search preview
  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setIsMobileMenuOpen(false);
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearchFocused(false);
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/products');
    }
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('AURA500');
    applyCoupon('AURA500');
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Top Promotional Bar */}
      {isBannerVisible && (
        <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white text-xs py-2 px-4 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex-1 flex items-center justify-center gap-2 text-center text-rose-100 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-rose-400 shrink-0 hidden sm:inline" />
              <span>
                FESTIVE DROP: Flat <strong>₹500 OFF</strong> on orders above ₹1,999 | Code:
              </span>
              <button
                onClick={handleCopyCoupon}
                className="bg-rose-500/30 hover:bg-rose-500/50 text-white px-2 py-0.5 rounded font-mono font-bold border border-rose-400/40 inline-flex items-center gap-1 transition"
                title="Click to copy and apply"
              >
                {copiedCoupon ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-300" /> APPLIED
                  </>
                ) : (
                  <>
                    <Percent className="w-3 h-3" /> AURA500
                  </>
                )}
              </button>
              <span className="hidden md:inline">| Free Express Shipping on ₹1,199+</span>
            </div>
            <button
              onClick={() => setIsBannerVisible(false)}
              className="text-slate-400 hover:text-white p-0.5 transition"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-slate-700 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle navigation drawer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
              <span className="font-serif font-black text-xl italic tracking-tighter">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-[0.25em] text-slate-900 uppercase">
                A U R A
              </span>
              <span className="text-[9px] tracking-[0.3em] font-semibold text-rose-600 -mt-1 uppercase">
                A T E L I E R
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {[
              { label: 'Men', cat: 'Men' },
              { label: 'Women', cat: 'Women' },
              { label: 'Kids', cat: 'Kids' },
              { label: 'Beauty', cat: 'Beauty' },
              { label: 'Accessories', cat: 'Accessories' }
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => handleCategoryClick(item.cat)}
                className="px-3 py-2 text-sm font-bold tracking-wide text-slate-700 hover:text-rose-600 uppercase transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-rose-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
              </button>
            ))}

            <span className="h-4 w-px bg-slate-200 mx-2" />

            <Link
              to="/about"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === '/about'
                  ? 'text-rose-600 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === '/contact'
                  ? 'text-rose-600 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Search Bar with Instant Autocomplete */}
          <div ref={searchContainerRef} className="flex-1 max-w-md relative hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search for brands, dresses, jackets, linen blazers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-full border border-transparent focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 transition-all outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Search Dropdown Results */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-150">
                {searchResults.length > 0 ? (
                  <div>
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Matching Products
                    </div>
                    {searchResults.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          openQuickView(item);
                          setIsSearchFocused(false);
                        }}
                        className="w-full text-left p-2 hover:bg-slate-50 rounded-xl flex items-center gap-3 transition"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-10 h-10 object-cover rounded-lg shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {item.brand}
                          </p>
                          <p className="text-xs text-slate-500 truncate">{item.title}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-rose-600">₹{item.price}</p>
                          <p className="text-[10px] text-slate-400 line-through">
                            ₹{item.originalPrice}
                          </p>
                        </div>
                      </button>
                    ))}
                    <button
                      onClick={handleSearchSubmit}
                      className="w-full mt-2 text-center py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    >
                      View all results for "{searchQuery}" →
                    </button>
                  </div>
                ) : searchQuery.trim() ? (
                  <div className="p-4 text-center text-sm text-slate-500">
                    No items matching "{searchQuery}". Try "Linen", "Dress", "Blazer" or "Denim".
                  </div>
                ) : (
                  <div className="p-3">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Popular Searches
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['Linen Blazer', 'Silk Dress', 'Denim Jacket', 'Sneakers', 'Kurta Set'].map(
                        (term) => (
                          <button
                            key={term}
                            onClick={() => {
                              setSearchQuery(term);
                              handleSearchSubmit({ preventDefault: () => {} });
                            }}
                            className="text-xs px-3 py-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 rounded-full font-medium transition"
                          >
                            {term}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* User Account Dropdown */}
            <div ref={userDropdownRef} className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-1.5 p-2 rounded-xl text-slate-700 hover:text-rose-600 hover:bg-slate-50 transition"
                aria-label="User Account"
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                  <User className="w-4 h-4" />
                </div>
                <div className="hidden xl:flex flex-col text-left">
                  <span className="text-[11px] text-slate-400 font-semibold uppercase leading-none">
                    {user?.isLoggedIn ? 'Account' : 'Welcome'}
                  </span>
                  <span className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[90px]">
                    {user?.isLoggedIn ? user.name.split(' ')[0] : 'Sign In'}
                  </span>
                </div>
              </button>

              {/* User Popover */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  {user?.isLoggedIn ? (
                    <div>
                      <div className="pb-3 border-b border-slate-100 mb-2">
                        <p className="text-xs font-bold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          AURA VIP Member
                        </span>
                      </div>
                      <Link
                        to="/checkout"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="w-full flex items-center justify-between p-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition"
                      >
                        <span>Profile & Orders</span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </Link>
                      <Link
                        to="/wishlist"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="w-full flex items-center justify-between p-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition"
                      >
                        <span>My Wishlist ({wishlistCount})</span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </Link>
                      <button
                        onClick={() => {
                          logoutUser();
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full mt-2 pt-2 border-t border-slate-100 flex items-center gap-2 p-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <div className="text-center p-2">
                      <p className="text-sm font-bold text-slate-900 mb-1">Welcome to AURA</p>
                      <p className="text-xs text-slate-500 mb-3">
                        To access wishlist, orders and fast checkout
                      </p>
                      <Link
                        to="/checkout"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="block w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-500/20 transition"
                      >
                        LOGIN / SIGN UP
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-xl text-slate-700 hover:text-rose-600 hover:bg-slate-50 transition"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart / Bag Icon */}
            <Link
              to="/cart"
              className="relative p-2 rounded-xl text-slate-700 hover:text-rose-600 hover:bg-slate-50 transition"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4.5 h-4.5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search fashion, brands, blazers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 text-sm text-slate-800 placeholder-slate-400 pl-9 pr-4 py-2 rounded-xl border-none outline-none focus:ring-2 focus:ring-rose-500/20"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>
        </div>
      </div>

      {/* Mobile Drawer mounted directly to document.body via Portal to prevent any parent clipping */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isMobileMenuOpen && (
              <div className="fixed inset-0 z-[100] lg:hidden">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Full-Height Drawer */}
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
                  className="fixed inset-y-0 left-0 w-[84%] max-w-xs h-full bg-white shadow-2xl z-[101] flex flex-col justify-between overflow-y-auto"
                >
                  <div className="p-5">
                    {/* Header with Logo & Close Button */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <Link
                        to="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2"
                      >
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white font-serif font-black italic shadow-sm">
                          A
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-base tracking-widest text-slate-900 leading-none">
                            AURA
                          </span>
                          <span className="text-[8px] tracking-widest font-bold text-rose-600 uppercase">
                            ATELIER
                          </span>
                        </div>
                      </Link>
                      <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
                        aria-label="Close menu"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* User Greeting Card */}
                    <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                      {user?.isLoggedIn ? (
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              Signed In
                            </span>
                            <p className="text-xs font-bold text-slate-900 truncate max-w-[170px]">
                              {user.name}
                            </p>
                          </div>
                          <span className="text-[9px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                            VIP
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-slate-900">Welcome to AURA</p>
                            <p className="text-[10px] text-slate-500">Sign in for member perks</p>
                          </div>
                          <Link
                            to="/checkout?tab=account"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-[10px] font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg hover:bg-rose-100 transition"
                          >
                            LOGIN
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Shop Categories */}
                    <div className="py-4">
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 px-1">
                        Shop Categories
                      </p>
                      <div className="space-y-1">
                        {[
                          { label: 'Men Fashion', cat: 'Men', badge: 'NEW' },
                          { label: 'Women Fashion', cat: 'Women', badge: 'TRENDING' },
                          { label: 'Kids Wear', cat: 'Kids' },
                          { label: 'Beauty & Wellness', cat: 'Beauty', badge: 'HOT' },
                          { label: 'Luxury Accessories', cat: 'Accessories' }
                        ].map((item) => (
                          <button
                            key={item.label}
                            onClick={() => handleCategoryClick(item.cat)}
                            className="w-full flex items-center justify-between py-2 px-2.5 rounded-xl text-left text-xs font-bold text-slate-800 hover:bg-rose-50 hover:text-rose-600 transition group"
                          >
                            <div className="flex items-center gap-2">
                              <span>{item.label}</span>
                              {item.badge && (
                                <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600 transition" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Pages Navigation */}
                    <div className="pt-3 border-t border-slate-100 space-y-1">
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1 px-1">
                        Explore & Support
                      </p>
                      <Link
                        to="/about"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between py-2 px-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <BookOpen className="w-4 h-4 text-slate-400" />
                          <span>Brand Stories & Runway</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                      </Link>

                      <Link
                        to="/checkout?tab=orders"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between py-2 px-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <Package className="w-4 h-4 text-slate-400" />
                          <span>My Orders & Tracking</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                      </Link>

                      <Link
                        to="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between py-2 px-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <PhoneCall className="w-4 h-4 text-slate-400" />
                          <span>Customer Concierge & FAQs</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                      </Link>
                    </div>
                  </div>

                  {/* Drawer Footer CTA */}
                  <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                    <Link
                      to="/checkout?tab=account"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-rose-600 text-white rounded-xl text-xs font-bold tracking-wider transition shadow-md"
                    >
                      <User className="w-4 h-4" />
                      <span>{user?.isLoggedIn ? 'VIEW MY ACCOUNT' : 'LOGIN / REGISTER'}</span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </header>
  );
};

export default Navbar;
