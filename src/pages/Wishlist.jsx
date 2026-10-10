import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import {
  Heart,
  ShoppingBag,
  Trash2,
  Star,
  ArrowRight,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Wishlist = () => {
  const { wishlist, toggleWishlist, moveToCart, openQuickView } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Heart className="w-12 h-12 stroke-[1.5]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 mb-2">
          Your Wishlist is Empty
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-8">
          Save styles you love and come back to them anytime! Browse our new season drops and click
          the heart icon to save your favorites.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-bold tracking-wider shadow-lg shadow-rose-600/30 transition hover:scale-105"
        >
          <span>EXPLORE TRENDING STYLES</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900">
            My Saved Wishlist
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {wishlist.length} {wishlist.length === 1 ? 'Style' : 'Styles'} saved for later
          </p>
        </div>
        <Link to="/" className="text-xs font-bold text-rose-600 hover:underline">
          + Continue Shopping
        </Link>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        <AnimatePresence>
          {wishlist.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-300 shadow-sm hover:shadow-lg transition flex flex-col justify-between group"
            >
              {/* Image & Badges */}
              <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  onClick={() => openQuickView(item)}
                />

                {/* Remove button */}
                <button
                  onClick={() => toggleWishlist(item)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-500 hover:text-rose-600 shadow-md flex items-center justify-center transition"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Discount Tag */}
                {item.discount && (
                  <span className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                    {item.discount}
                  </span>
                )}

                {/* Rating */}
                <div className="absolute bottom-3 left-3 bg-white/95 px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-800 shadow flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{item.rating}</span>
                </div>

                {/* Quick View */}
                <button
                  onClick={() => openQuickView(item)}
                  className="absolute bottom-3 right-3 bg-slate-900/90 text-white p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition hidden sm:flex items-center justify-center"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Info & Move to Cart Button */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                      {item.brand}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" /> In Stock
                    </span>
                  </div>

                  <h3
                    onClick={() => openQuickView(item)}
                    className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 hover:text-rose-600 cursor-pointer transition-colors"
                  >
                    {item.title}
                  </h3>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-sm sm:text-base font-black text-slate-950">
                      ₹{item.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{item.originalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Move to Cart */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => moveToCart(item)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-rose-600 text-white text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>MOVE TO BAG</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Wishlist;
