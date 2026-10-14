import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Home, Sparkles, Package, User } from 'lucide-react';

export const MobileNav = () => {
  const { orders } = useShop();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isStories = location.pathname === '/about';
  const isOrders = location.pathname === '/profile' && location.search.includes('tab=orders');
  const isAccount =
    (location.pathname === '/profile' && !location.search.includes('tab=orders')) ||
    location.pathname === '/account';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden py-1.5 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-4 items-center">
        {/* 1. Home */}
        <Link
          to="/"
          className={`flex flex-col items-center py-1 text-[11px] font-bold transition-colors ${
            isHome ? 'text-rose-600' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </Link>

        {/* 2. Stories */}
        <Link
          to="/about"
          className={`flex flex-col items-center py-1 text-[11px] font-bold transition-colors ${
            isStories ? 'text-rose-600' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-5 h-5 mb-0.5" />
          <span>Stories</span>
        </Link>

        {/* 3. Orders */}
        <Link
          to="/profile?tab=orders"
          className={`flex flex-col items-center py-1 text-[11px] font-bold relative transition-colors ${
            isOrders ? 'text-rose-600' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <div className="relative">
            <Package className="w-5 h-5 mb-0.5" />
            {orders?.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-slate-900 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {orders.length}
              </span>
            )}
          </div>
          <span>Orders</span>
        </Link>

        {/* 4. Account */}
        <Link
          to="/profile"
          className={`flex flex-col items-center py-1 text-[11px] font-bold transition-colors ${
            isAccount ? 'text-rose-600' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>Account</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
