import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Check,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const QuickViewModal = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useShop();

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  // Synchronize when product changes
  const activeImage = selectedImage || quickViewProduct?.image;
  const activeSize =
    selectedSize ||
    (quickViewProduct?.sizes && quickViewProduct.sizes.length > 0
      ? quickViewProduct.sizes[0]
      : 'Standard');

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeQuickView();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeQuickView]);

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeResult({
        valid: true,
        message: 'Delivery by Thursday, 2 business days • Free Express Delivery'
      });
    } else {
      setPincodeResult({
        valid: false,
        message: 'Please enter a valid 6-digit Indian pincode'
      });
    }
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, activeSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const galleryImages =
    quickViewProduct.images && quickViewProduct.images.length > 0
      ? quickViewProduct.images
      : [quickViewProduct.image];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        />

        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-4xl"
          >
            {/* Close Button */}
            <button
              onClick={closeQuickView}
              className="absolute right-4 top-4 z-20 rounded-full bg-white/90 p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition shadow-sm"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Gallery Section */}
              <div className="p-6 bg-slate-50 flex flex-col justify-between">
                <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-white shadow-inner mb-4 relative">
                  <img
                    src={activeImage}
                    alt={quickViewProduct.title}
                    className="w-full h-full object-cover object-center"
                  />
                  {quickViewProduct.discount && (
                    <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                      {quickViewProduct.discount}
                    </span>
                  )}
                </div>

                {/* Thumbnails */}
                {galleryImages.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                          activeImage === img ? 'border-rose-600 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info Section */}
              <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-black uppercase tracking-widest text-rose-600">
                      {quickViewProduct.brand}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      ID: #{quickViewProduct.id.toString().padStart(4, '0')}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {quickViewProduct.title}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center gap-3 mt-2.5">
                    <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-900">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{quickViewProduct.rating}</span>
                    </div>
                    <span className="text-xs text-slate-500">
                      ({quickViewProduct.ratingCount.toLocaleString()} Verified Customer Reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-4 pb-4 border-b border-slate-100">
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-black text-slate-950">
                        ₹{quickViewProduct.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-slate-400 line-through">
                        ₹{quickViewProduct.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-sm font-extrabold text-emerald-600">
                        {quickViewProduct.discount}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 font-medium">
                      Inclusive of all taxes • Instant delivery available
                    </p>
                  </div>

                  {/* Sizes */}
                  {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                          Select Size
                        </span>
                        <span className="text-[11px] font-semibold text-rose-600 cursor-pointer hover:underline">
                          Size Guide
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {quickViewProduct.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`min-w-10 px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                              activeSize === size
                                ? 'border-rose-600 bg-rose-600 text-white shadow-md'
                                : 'border-slate-200 text-slate-700 hover:border-slate-400 bg-white'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity */}
                  <div className="mt-4 flex items-center gap-4">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-1 text-slate-600 hover:text-black font-bold text-sm"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-slate-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                        className="px-3 py-1 text-slate-600 hover:text-black font-bold text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-4">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {quickViewProduct.description}
                    </p>
                  </div>

                  {/* Specs & Details */}
                  {quickViewProduct.details && (
                    <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-400 block">Fabric:</span>
                        <span className="font-semibold text-slate-800">
                          {quickViewProduct.details.fabric}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Fit:</span>
                        <span className="font-semibold text-slate-800">
                          {quickViewProduct.details.fit}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Care:</span>
                        <span className="font-semibold text-slate-800">
                          {quickViewProduct.details.care}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Origin:</span>
                        <span className="font-semibold text-slate-800">
                          {quickViewProduct.details.origin}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Pincode Check Demo */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" /> Check Delivery Options
                    </span>
                    <form onSubmit={handleCheckPincode} className="flex gap-2">
                      <input
                        type="text"
                        maxLength="6"
                        placeholder="Enter 6-digit Pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                        className="w-44 text-xs px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-rose-500"
                      />
                      <button
                        type="submit"
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition"
                      >
                        Check
                      </button>
                    </form>
                    {pincodeResult && (
                      <p
                        className={`text-[11px] mt-1.5 font-medium ${
                          pincodeResult.valid ? 'text-emerald-700' : 'text-rose-600'
                        }`}
                      >
                        {pincodeResult.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 px-6 rounded-2xl text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" /> ADDED TO BAG
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> ADD TO BAG
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct)}
                    className={`p-3 rounded-2xl border transition shadow-sm ${
                      isFavorited
                        ? 'border-rose-300 bg-rose-50 text-rose-600'
                        : 'border-slate-200 hover:border-slate-400 text-slate-600 hover:text-rose-600'
                    }`}
                    title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-600 text-rose-600' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
