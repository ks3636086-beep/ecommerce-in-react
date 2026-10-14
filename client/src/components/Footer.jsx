import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import {
  ShieldCheck,
  RotateCcw,
  Truck,
  Headphones,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const Footer = () => {
  const { showToast, setActiveCategory } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setIsSubscribed(true);
    showToast('Subscribed! Check your inbox for exclusive VIP drops', 'success');
    setEmail('');
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Genuine</h4>
              <p className="text-xs text-slate-400">Direct from curated brands</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">14-Day Free Returns</h4>
              <p className="text-xs text-slate-400">Hassle-free doorstep pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Express Delivery</h4>
              <p className="text-xs text-slate-400">Free shipping on orders ₹1,199+</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">24/7 VIP Concierge</h4>
              <p className="text-xs text-slate-400">Dedicated shopping assistance</p>
            </div>
          </div>
        </div>

        {/* Links & Newsletter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-slate-800">
          {/* Brand Bio */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-400 flex items-center justify-center text-white shadow-md">
                <span className="font-serif font-black text-xl italic tracking-tighter">A</span>
              </div>
              <span className="font-black text-xl tracking-[0.25em] text-white uppercase">
                A U R A
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed mb-6 max-w-sm">
              India's premier high-fashion and modern streetwear atelier. Curating top designer
              labels, handwoven ethnics, tailored blazers, and luxury essentials for the modern
              wardrobe.
            </p>

            {/* Newsletter */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                Join the AURA Insider Club
              </h5>
              <p className="text-xs text-slate-400 mb-3">
                Get first dibs on luxury runway drops & flat 15% off your next purchase.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 flex-1"
                />
                <button
                  type="submit"
                  className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
              {isSubscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>You're in! Welcome to our exclusive inner circle.</span>
                </div>
              )}
            </div>
          </div>

          {/* Online Shopping */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Online Shopping
            </h5>
            <ul className="space-y-2.5 text-xs">
              {['Men', 'Women', 'Kids', 'Beauty', 'Accessories'].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/"
                    onClick={() => handleCategoryClick(cat)}
                    className="text-slate-400 hover:text-rose-400 transition"
                  >
                    {cat} Collection
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/wishlist" className="text-slate-400 hover:text-rose-400 transition">
                  My Wishlist
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-slate-400 hover:text-rose-400 transition">
                  Shopping Bag
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Policies */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Customer Policies
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-rose-400 transition">
                  Contact Customer Care
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-rose-400 transition">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-rose-400 transition">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-rose-400 transition">
                  Shipping & Delivery FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-rose-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-rose-400 transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Connect & App */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Connect With Us
            </h5>
            <div className="flex gap-2.5 mb-6">
              <a
                href="#social"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#social"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a
                href="#social"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#social"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="text-[11px] font-bold text-white mb-1">AURA App Coming Soon</p>
              <p className="text-[10px] text-slate-400">
                Experience next-gen AR try-ons and 1-tap checkout on iOS & Android.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 AURA ATELIER Pvt. Ltd. All rights reserved.</p>
          <p className="text-[11px] text-slate-600">
            Inspired by modern fashion e-commerce UX. Conceptual frontend prototype.
          </p>
          <div className="flex gap-4 text-slate-400">
            <Link to="/about" className="hover:text-white transition">About</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white transition">Support</Link>
            <span>•</span>
            <Link to="/checkout" className="hover:text-white transition">Account</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
