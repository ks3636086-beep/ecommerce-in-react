import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { availableCoupons } from '../data/coupons';
import {
  ShoppingBag,
  Trash2,
  Heart,
  Tag,
  ArrowRight,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    moveToWishlist,
    cartSubtotal,
    cartOriginalTotal,
    cartSavings,
    shippingFee,
    platformFee,
    cartGrandTotal,
    freeShippingThreshold,
    isFreeDelivery,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useShop();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (codeToApply) => {
    const code = codeToApply || couponCodeInput;
    if (!code) return;
    const res = applyCoupon(code);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponCodeInput('');
    }
  };

  // Remaining for free shipping
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 mb-2">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-8">
          There are so many runway arrivals waiting for you. Explore our trending linen blazers,
          ethnic sets, and designer sneakers!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-bold tracking-wider shadow-lg shadow-rose-600/30 transition hover:scale-105"
          >
            DISCOVER TRENDING FASHION
          </Link>
          <Link
            to="/wishlist"
            className="px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-bold tracking-wider transition"
          >
            VIEW YOUR WISHLIST
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title & Free Shipping Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900">
            Shopping Bag ({cart.length} {cart.length === 1 ? 'Item' : 'Items'})
          </h1>
          <Link to="/" className="text-xs font-bold text-rose-600 hover:underline hidden sm:block">
            + Add More Items
          </Link>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 border border-rose-100">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-rose-600" />
              <span>
                {isFreeDelivery
                  ? '🎉 Congratulations! You have unlocked FREE Express Delivery!'
                  : `Add items worth ₹${amountNeededForFreeShipping} more to unlock FREE Express Delivery!`}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">
              {freeShippingProgress}% Completed
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Side: Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.cartItemId}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-sm hover:shadow-md transition flex gap-4 sm:gap-6"
              >
                {/* Thumbnail */}
                <div className="w-24 sm:w-28 aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-rose-600">
                          {item.brand}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-1">
                          {item.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition"
                        title="Remove from bag"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Size and Stock */}
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700 font-bold">
                        Size: {item.selectedSize}
                      </span>
                      {item.stockCount <= 5 && (
                        <span className="text-[10px] font-semibold text-rose-600">
                          Only {item.stockCount} left
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-base font-black text-slate-950">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{(item.originalPrice * item.quantity).toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-emerald-600">
                        ({item.discount})
                      </span>
                    </div>
                  </div>

                  {/* Quantity and Actions Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="px-2.5 py-1 text-slate-600 hover:text-black font-bold text-xs"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 py-1 text-xs font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="px-2.5 py-1 text-slate-600 hover:text-black font-bold text-xs"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Move to Wishlist */}
                    <button
                      onClick={() => moveToWishlist(item.cartItemId)}
                      className="text-xs font-bold text-slate-600 hover:text-rose-600 flex items-center gap-1.5 transition"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>Move to Wishlist</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="pt-4 flex justify-between items-center">
            <Link
              to="/"
              className="text-xs font-bold text-slate-700 hover:text-rose-600 flex items-center gap-1 transition"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right Side: Coupons & Price Summary */}
        <div className="lg:col-span-5 space-y-6">
          {/* Coupon Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-rose-600" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Apply Coupons & Offers
              </h3>
            </div>

            {appliedCoupon ? (
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    %
                  </div>
                  <div>
                    <span className="text-xs font-black text-emerald-900 font-mono">
                      {appliedCoupon.code}
                    </span>
                    <p className="text-[11px] text-emerald-700">
                      Savings of ₹{appliedCoupon.discount} applied!
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleApplyCoupon();
                  }}
                  className="flex gap-2 mb-2"
                >
                  <input
                    type="text"
                    placeholder="Enter coupon code (e.g. AURA500)"
                    value={couponCodeInput}
                    onChange={(e) => {
                      setCouponCodeInput(e.target.value.toUpperCase());
                      setCouponError('');
                    }}
                    className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none uppercase font-mono font-bold focus:border-rose-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-slate-900 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition shadow-sm"
                  >
                    APPLY
                  </button>
                </form>

                {couponError && (
                  <p className="text-[11px] text-rose-600 font-bold mb-3">{couponError}</p>
                )}

                {/* Available Quick Coupons */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <p className="text-[11px] text-slate-400 font-semibold mb-2">Available Coupons:</p>
                  <div className="space-y-2">
                    {availableCoupons.slice(0, 2).map((c) => (
                      <div
                        key={c.code}
                        onClick={() => handleApplyCoupon(c.code)}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 transition cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-slate-900">
                              {c.code}
                            </span>
                            <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                              {c.tag}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500">{c.description}</p>
                        </div>
                        <span className="text-xs font-bold text-rose-600">APPLY</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100">
              Price Details ({cart.length} {cart.length === 1 ? 'Item' : 'Items'})
            </h3>

            <div className="space-y-3 py-4 border-b border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Total MRP</span>
                <span>₹{cartOriginalTotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Discount on MRP</span>
                <span>-₹{cartSavings.toLocaleString()}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount ({appliedCoupon.code})</span>
                  <span>-₹{appliedCoupon.discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-600 font-bold uppercase">FREE</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span className="flex items-center gap-1">
                  Platform Convenience Fee
                  <span className="text-[10px] text-slate-400">ⓘ</span>
                </span>
                <span>₹{platformFee}</span>
              </div>
            </div>

            {/* Total */}
            <div className="py-4 border-b border-slate-100 flex justify-between items-baseline">
              <span className="text-sm font-black text-slate-900">Total Amount</span>
              <span className="text-xl font-black text-slate-950">
                ₹{cartGrandTotal.toLocaleString()}
              </span>
            </div>

            {/* Savings banner */}
            {(cartSavings > 0 || appliedCoupon) && (
              <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-[11px] font-bold text-center">
                ✨ You are saving ₹{(cartSavings + (appliedCoupon?.discount || 0)).toLocaleString()}{' '}
                on this fashion order!
              </div>
            )}

            {/* Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full mt-6 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs sm:text-sm font-bold tracking-wider shadow-lg shadow-rose-600/30 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Security Guarantee */}
            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Safe & Secure Checkout with SSL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
