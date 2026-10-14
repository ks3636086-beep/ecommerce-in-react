import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, Star, Eye, ShoppingBag, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductCard = ({ product }) => {
  const { toggleWishlist, isInWishlist, addToCart, openQuickView } = useShop();
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : null
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 cursor-pointer">
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onClick={() => openQuickView(product)}
          loading="lazy"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md z-10 ${
            isFavorited
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/90 backdrop-blur-sm text-slate-600 hover:text-rose-600 hover:bg-white'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <motion.div whileTap={{ scale: 0.8 }} animate={{ scale: isFavorited ? [1, 1.25, 1] : 1 }}>
            <Heart className={`w-4.5 h-4.5 ${isFavorited ? 'fill-rose-600 text-rose-600' : ''}`} />
          </motion.div>
        </button>

        {/* Tags / Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.discount && (
            <span className="bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm tracking-wider uppercase">
              {product.discount}
            </span>
          )}
          {product.tags?.includes('bestseller') && (
            <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm tracking-wider uppercase">
              BESTSELLER
            </span>
          )}
          {product.tags?.includes('new_arrival') && !product.tags?.includes('bestseller') && (
            <span className="bg-slate-900 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm tracking-wider uppercase">
              NEW
            </span>
          )}
        </div>

        {/* Rating Pill */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full text-[11px] font-bold text-slate-800 shadow-sm flex items-center gap-1 border border-slate-100">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-500 font-medium">
            {product.ratingCount > 999
              ? `${(product.ratingCount / 1000).toFixed(1)}k`
              : product.ratingCount}
          </span>
        </div>

        {/* Quick View Button Hover Overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openQuickView(product);
          }}
          className="absolute bottom-3 right-3 bg-slate-900/90 hover:bg-slate-900 text-white p-2 rounded-full shadow-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center justify-center"
          title="Quick View"
          aria-label="Quick View product"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-xs font-bold text-slate-500 tracking-wider uppercase truncate">
              {product.brand}
            </h4>
            {product.stockCount <= 6 && (
              <span className="text-[10px] font-semibold text-rose-500">
                Only {product.stockCount} left
              </span>
            )}
          </div>

          <h3
            onClick={() => openQuickView(product)}
            className="text-sm font-semibold text-slate-800 line-clamp-1 hover:text-rose-600 cursor-pointer transition-colors"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Pricing */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-base font-extrabold text-slate-950">₹{product.price}</span>
            <span className="text-xs text-slate-400 line-through">₹{product.originalPrice}</span>
            <span className="text-xs font-bold text-emerald-600">({product.discount})</span>
          </div>
        </div>

        {/* Sizes & Add to Bag Trigger */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          {/* Quick Size Select Chips */}
          {product.sizes && product.sizes.length > 1 && (
            <div className="flex items-center gap-1.5 mb-2.5 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold mr-0.5">Size:</span>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`text-[10px] px-2 py-0.5 rounded font-bold border transition ${
                    selectedSize === size
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 text-slate-600 hover:border-slate-400 bg-slate-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-rose-600 text-white hover:shadow-rose-500/20'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>ADDED TO BAG</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>ADD TO BAG</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
