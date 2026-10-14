import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import {
  User,
  ShoppingBag,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  QrCode,
  DollarSign,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CheckoutLogin = () => {
  const {
    cart,
    user,
    orders,
    cartSubtotal,
    shippingFee,
    platformFee,
    cartGrandTotal,
    appliedCoupon,
    loginUser,
    logoutUser,
    placeOrder,
    showToast
  } = useShop();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Active top tab: 'checkout' vs 'account'
  const tabQuery = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(
    tabQuery === 'orders' || tabQuery === 'account' ? 'account' : 'checkout'
  );

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'orders' || tab === 'account') {
      setActiveTab('account');
      if (tab === 'orders') {
        setTimeout(() => {
          const el = document.getElementById('recent-orders-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    } else if (tab === 'checkout') {
      setActiveTab('checkout');
    }
  }, [searchParams]);

  // Auth sub-tab: 'login' vs 'register'
  const [authMode, setAuthMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);

  // Auth Form State
  const [authFormData, setAuthFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [authErrors, setAuthErrors] = useState({});

  // Checkout Form State (pre-filled from user saved addresses if available)
  const defaultAddr = user?.savedAddresses?.[0] || {};
  const [addressFormData, setAddressFormData] = useState({
    name: defaultAddr.name || user?.name || '',
    phone: defaultAddr.phone || user?.phone || '',
    pincode: defaultAddr.pincode || '400001',
    address: defaultAddr.address || 'Flat 402, Highline Residency',
    locality: defaultAddr.locality || 'Nariman Point',
    city: defaultAddr.city || 'Mumbai',
    state: defaultAddr.state || 'Maharashtra',
    addressType: defaultAddr.type || 'Home'
  });
  const [addressErrors, setAddressErrors] = useState({});

  // Payment Selection State
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [cardData, setCardData] = useState({
    cardNumber: '4532 •••• •••• 8821',
    cardName: user?.name || 'Aarav Sharma',
    expiry: '08/29',
    cvv: '842'
  });

  // Order Placement Modal / Success State
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Handle Login / Register Submit
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (authMode === 'register' && !authFormData.name.trim()) {
      errs.name = 'Full name is required';
    }
    if (!authFormData.email.trim() || !authFormData.email.includes('@')) {
      errs.email = 'Valid email is required';
    }
    if (!authFormData.password || authFormData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(errs).length > 0) {
      setAuthErrors(errs);
      showToast('Please correct form errors', 'error');
      return;
    }

    setAuthErrors({});
    loginUser({
      name: authFormData.name || authFormData.email.split('@')[0],
      email: authFormData.email,
      phone: authFormData.phone || '+91 98765 43210'
    });

    // Reset password field
    setAuthFormData({ ...authFormData, password: '' });
  };

  // Validate Address Form
  const validateAddress = () => {
    const errs = {};
    if (!addressFormData.name.trim()) errs.name = 'Full name is required';
    if (!addressFormData.phone.trim() || addressFormData.phone.length < 10) {
      errs.phone = 'Valid 10-digit mobile number required';
    }
    if (!addressFormData.pincode.trim() || addressFormData.pincode.length !== 6) {
      errs.pincode = 'Valid 6-digit postal code required';
    }
    if (!addressFormData.address.trim()) errs.address = 'House/Flat & Street required';
    if (!addressFormData.city.trim()) errs.city = 'City is required';
    if (!addressFormData.state.trim()) errs.state = 'State is required';
    return errs;
  };

  // Handle Place Order
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Your bag is empty! Add items to checkout', 'error');
      return;
    }

    const validationErrors = validateAddress();
    if (Object.keys(validationErrors).length > 0) {
      setAddressErrors(validationErrors);
      showToast('Please complete required delivery address fields', 'error');
      return;
    }

    setAddressErrors({});
    setIsPlacingOrder(true);

    setTimeout(() => {
      const order = placeOrder({
        address: addressFormData,
        paymentMethod
      });
      setIsPlacingOrder(false);
      setConfirmedOrder(order);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Tabs Switcher */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-100 p-1.5 rounded-2xl flex max-w-md w-full shadow-inner">
          <button
            onClick={() => setActiveTab('checkout')}
            className={`flex-1 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition flex items-center justify-center gap-2 ${
              activeTab === 'checkout'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-rose-600" />
            <span>Checkout</span>
            {cart.length > 0 && (
              <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full text-[10px]">
                {cart.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('account')}
            className={`flex-1 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition flex items-center justify-center gap-2 ${
              activeTab === 'account'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4 text-rose-600" />
            <span>{user?.isLoggedIn ? 'Account & Orders' : 'Login / Register'}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CHECKOUT INTERFACE */}
      {activeTab === 'checkout' && (
        <div>
          {cart.length === 0 && !confirmedOrder ? (
            <div className="max-w-2xl mx-auto text-center py-12 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-slate-900 mb-2">No items to checkout</h2>
              <p className="text-xs text-slate-500 mb-6">
                Your shopping bag is currently empty. Browse our curated fashion catalog to get
                started.
              </p>
              <Link
                to="/"
                className="px-6 py-3 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition"
              >
                BROWSE STYLES
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Delivery Address & Payment */}
              <div className="lg:col-span-7 space-y-6">
                {/* Account Status Banner */}
                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-between">
                  {user?.isLoggedIn ? (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold text-sm">
                        ✓
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          Logged in as {user.name}
                        </p>
                        <p className="text-[11px] text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold text-sm">
                        !
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Checking out as Guest</p>
                        <p className="text-[11px] text-slate-500">
                          Sign in for saved addresses & 1-tap checkout.
                        </p>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => setActiveTab('account')}
                    className="text-xs font-bold text-rose-600 hover:underline"
                  >
                    {user?.isLoggedIn ? 'Manage Account' : 'Sign In Now'}
                  </button>
                </div>

                {/* 1. Delivery Address Section */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                    <MapPin className="w-5 h-5 text-rose-600" />
                    <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
                      1. Delivery Address
                    </h2>
                  </div>

                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Aarav Sharma"
                          value={addressFormData.name}
                          onChange={(e) =>
                            setAddressFormData({ ...addressFormData, name: e.target.value })
                          }
                          className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${
                            addressErrors.name ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                          } outline-none focus:border-rose-500`}
                        />
                        {addressErrors.name && (
                          <p className="text-[10px] text-rose-600 font-bold mt-1">
                            {addressErrors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          placeholder="10-digit mobile number"
                          value={addressFormData.phone}
                          onChange={(e) =>
                            setAddressFormData({ ...addressFormData, phone: e.target.value })
                          }
                          className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${
                            addressErrors.phone ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                          } outline-none focus:border-rose-500`}
                        />
                        {addressErrors.phone && (
                          <p className="text-[10px] text-rose-600 font-bold mt-1">
                            {addressErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                          Postal Code / Pincode *
                        </label>
                        <input
                          type="text"
                          maxLength="6"
                          placeholder="6-digit pincode"
                          value={addressFormData.pincode}
                          onChange={(e) =>
                            setAddressFormData({
                              ...addressFormData,
                              pincode: e.target.value.replace(/\D/g, '')
                            })
                          }
                          className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${
                            addressErrors.pincode
                              ? 'border-rose-500 bg-rose-50/50'
                              : 'border-slate-200'
                          } outline-none focus:border-rose-500`}
                        />
                        {addressErrors.pincode && (
                          <p className="text-[10px] text-rose-600 font-bold mt-1">
                            {addressErrors.pincode}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                          Locality / Landmark
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Near Phoenix Mall"
                          value={addressFormData.locality}
                          onChange={(e) =>
                            setAddressFormData({ ...addressFormData, locality: e.target.value })
                          }
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-rose-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Flat / House No. / Building / Street *
                      </label>
                      <input
                        type="text"
                        placeholder="House / Apartment / Street address"
                        value={addressFormData.address}
                        onChange={(e) =>
                          setAddressFormData({ ...addressFormData, address: e.target.value })
                        }
                        className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${
                          addressErrors.address
                            ? 'border-rose-500 bg-rose-50/50'
                            : 'border-slate-200'
                        } outline-none focus:border-rose-500`}
                      />
                      {addressErrors.address && (
                        <p className="text-[10px] text-rose-600 font-bold mt-1">
                          {addressErrors.address}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                          City / District *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Mumbai"
                          value={addressFormData.city}
                          onChange={(e) =>
                            setAddressFormData({ ...addressFormData, city: e.target.value })
                          }
                          className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${
                            addressErrors.city ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                          } outline-none focus:border-rose-500`}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Maharashtra"
                          value={addressFormData.state}
                          onChange={(e) =>
                            setAddressFormData({ ...addressFormData, state: e.target.value })
                          }
                          className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${
                            addressErrors.state ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                          } outline-none focus:border-rose-500`}
                        />
                      </div>
                    </div>

                    {/* Address Type */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                        Address Label
                      </label>
                      <div className="flex gap-3">
                        {['Home (All-Day)', 'Work (10 AM - 6 PM)'].map((label) => (
                          <button
                            type="button"
                            key={label}
                            onClick={() =>
                              setAddressFormData({ ...addressFormData, addressType: label })
                            }
                            className={`text-xs px-4 py-2 rounded-xl font-bold border transition ${
                              addressFormData.addressType === label
                                ? 'border-slate-900 bg-slate-900 text-white'
                                : 'border-slate-200 text-slate-700 bg-slate-50'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </form>
                </div>

                {/* 2. Payment Method Section */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                    <CreditCard className="w-5 h-5 text-rose-600" />
                    <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
                      2. Payment Method
                    </h2>
                  </div>

                  {/* Payment Options Radio List */}
                  <div className="space-y-3 mb-6">
                    {[
                      {
                        id: 'upi',
                        name: 'UPI / Instant QR',
                        desc: 'Google Pay, PhonePe, Paytm, BHIM',
                        icon: QrCode
                      },
                      {
                        id: 'card',
                        name: 'Credit or Debit Card',
                        desc: 'Visa, MasterCard, RuPay, Amex',
                        icon: CreditCard
                      },
                      {
                        id: 'cod',
                        name: 'Cash on Delivery (COD)',
                        desc: 'Pay safely with Cash or UPI upon doorstep arrival',
                        icon: DollarSign
                      }
                    ].map((m) => {
                      const Icon = m.icon;
                      return (
                        <div
                          key={m.id}
                          onClick={() => setPaymentMethod(m.id)}
                          className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                            paymentMethod === m.id
                              ? 'border-rose-600 bg-rose-50/40 ring-1 ring-rose-500/20'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="payment"
                              checked={paymentMethod === m.id}
                              onChange={() => setPaymentMethod(m.id)}
                              className="accent-rose-600"
                            />
                            <div>
                              <div className="text-xs font-bold text-slate-900">{m.name}</div>
                              <div className="text-[11px] text-slate-500">{m.desc}</div>
                            </div>
                          </div>
                          <Icon className="w-5 h-5 text-slate-400" />
                        </div>
                      );
                    })}
                  </div>

                  {/* Payment Details Sub-Form */}
                  {paymentMethod === 'upi' && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                      <label className="font-bold text-slate-800 block mb-1.5">
                        Enter UPI VPA / ID:
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okaxis"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-mono font-medium outline-none"
                      />
                      <p className="text-[10px] text-slate-500 mt-1.5">
                        A payment collect request will be pushed to your UPI app.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
                      <div>
                        <label className="font-bold text-slate-800 block mb-1">Card Number:</label>
                        <input
                          type="text"
                          value={cardData.cardNumber}
                          onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-slate-800 block mb-1">
                            Expiry (MM/YY):
                          </label>
                          <input
                            type="text"
                            value={cardData.expiry}
                            onChange={(e) =>
                              setCardData({ ...cardData, expiry: e.target.value })
                            }
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-800 block mb-1">CVV:</label>
                          <input
                            type="password"
                            maxLength="4"
                            value={cardData.cvv}
                            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
                      <p className="font-bold mb-1">Cash on Delivery Verified</p>
                      <p className="text-[11px] text-amber-800">
                        Please keep ₹{cartGrandTotal.toLocaleString()} ready in exact cash or scan
                        the delivery executive's dynamic UPI QR at delivery.
                      </p>
                    </div>
                  )}

                  {/* Demo Warning Notice */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-100 text-[11px] text-slate-600 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      <strong>Static Frontend Demonstration:</strong> No real payment is deducted or
                      live order booked to servers.
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Place Order Button */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm sticky top-24">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                      Order Summary ({cart.length} {cart.length === 1 ? 'Item' : 'Items'})
                    </h3>
                    <Link to="/cart" className="text-xs font-bold text-rose-600 hover:underline">
                      Edit Bag
                    </Link>
                  </div>

                  {/* Items Preview */}
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-4 no-scrollbar">
                    {cart.map((item) => (
                      <div
                        key={item.cartItemId}
                        className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-none"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-14 object-cover rounded-xl shrink-0"
                        />
                        <div className="flex-1 min-w-0 text-xs">
                          <p className="font-bold text-slate-900 truncate">{item.brand}</p>
                          <p className="text-slate-500 truncate">{item.title}</p>
                          <p className="text-[11px] text-slate-400 font-medium">
                            Size: {item.selectedSize} • Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right text-xs">
                          <span className="font-bold text-slate-900">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2.5 py-3 border-t border-slate-100 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span>₹{cartSubtotal.toLocaleString()}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-emerald-600 font-bold">
                        <span>Coupon ({appliedCoupon.code})</span>
                        <span>-₹{appliedCoupon.discount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-600">
                      <span>Delivery Charge</span>
                      <span>
                        {shippingFee === 0 ? (
                          <span className="text-emerald-600 font-bold uppercase">FREE</span>
                        ) : (
                          `₹${shippingFee}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-slate-600">
                      <span>Platform Handling</span>
                      <span>₹{platformFee}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline mb-6">
                    <span className="text-sm font-black text-slate-900">Grand Total</span>
                    <span className="text-xl font-black text-rose-600">
                      ₹{cartGrandTotal.toLocaleString()}
                    </span>
                  </div>

                  {/* Place Order CTA */}
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder}
                    className="w-full py-4 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-400 text-white rounded-2xl text-xs sm:text-sm font-bold tracking-wider shadow-xl shadow-rose-600/30 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2"
                  >
                    {isPlacingOrder ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>PROCESSING SECURE ORDER...</span>
                      </div>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>PLACE DEMO ORDER (₹{cartGrandTotal.toLocaleString()})</span>
                      </>
                    )}
                  </button>

                  <div className="mt-4 text-center">
                    <p className="text-[10px] text-slate-400">
                      By clicking "Place Demo Order", you accept AURA’s Terms of Use & Privacy
                      Policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ACCOUNT & LOGIN / REGISTER INTERFACE */}
      {activeTab === 'account' && (
        <div className="max-w-2xl mx-auto">
          {user?.isLoggedIn ? (
            /* Logged in Profile & Past Orders View */
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white font-serif font-black text-2xl flex items-center justify-center shadow-md">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">{user.name}</h2>
                      <p className="text-xs text-slate-500">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                        Verified AURA VIP Customer
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to="/profile"
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 flex items-center gap-1.5 text-xs font-bold transition"
                    >
                      <User className="w-4 h-4 text-rose-600" />
                      <span>Full Profile & Addresses</span>
                    </Link>
                    <button
                      onClick={logoutUser}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-rose-300 text-slate-600 hover:text-rose-600 flex items-center gap-1.5 text-xs font-bold transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>

                {/* Saved Address Info */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3">
                    Default Shipping Address
                  </h3>
                  {user.savedAddresses?.length > 0 ? (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900">
                          {user.savedAddresses[0].name}
                        </span>
                        <span className="text-[10px] font-bold bg-slate-200 px-2 py-0.5 rounded">
                          {user.savedAddresses[0].type}
                        </span>
                      </div>
                      <p className="text-slate-600">{user.savedAddresses[0].address}</p>
                      <p className="text-slate-600">
                        {user.savedAddresses[0].locality}, {user.savedAddresses[0].city},{' '}
                        {user.savedAddresses[0].state} - {user.savedAddresses[0].pincode}
                      </p>
                      <p className="text-slate-500 mt-1">Phone: {user.savedAddresses[0].phone}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">No saved address yet.</p>
                  )}
                </div>
              </div>

              {/* Order History */}
              <div id="recent-orders-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm scroll-mt-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
                    Recent Orders ({orders.length})
                  </h3>
                  {orders.length > 0 && (
                    <span className="text-xs text-slate-400 font-medium">All demo orders saved</span>
                  )}
                </div>

                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div
                        key={ord.orderId}
                        className="p-4 rounded-2xl border border-slate-100 bg-slate-50 text-xs"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="font-mono font-bold text-slate-900 block">
                              Order #{ord.orderId}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              Placed on {new Date(ord.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            CONFIRMED & PACKED
                          </span>
                        </div>

                        <div className="flex gap-2 overflow-x-auto py-2">
                          {ord.items.map((it, idx) => (
                            <img
                              key={idx}
                              src={it.image}
                              alt={it.title}
                              className="w-10 h-12 object-cover rounded-lg shrink-0 border border-slate-200"
                            />
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-slate-700">
                          <span>
                            {ord.items.length} {ord.items.length === 1 ? 'item' : 'items'} •{' '}
                            {ord.paymentMethod?.toUpperCase()}
                          </span>
                          <span className="font-black text-slate-900">
                            Total: ₹{ord.grandTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-xs text-slate-500">
                    You haven’t placed any orders yet. Place a test order from the checkout tab!
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Auth Form (Login vs Register Switch) */
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl">
              {/* Toggle switch between Sign In and Register */}
              <div className="flex border-b border-slate-100 mb-8">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setAuthErrors({});
                  }}
                  className={`flex-1 pb-3 text-xs sm:text-sm font-bold tracking-wider uppercase transition border-b-2 ${
                    authMode === 'login'
                      ? 'border-rose-600 text-rose-600'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setAuthErrors({});
                  }}
                  className={`flex-1 pb-3 text-xs sm:text-sm font-bold tracking-wider uppercase transition border-b-2 ${
                    authMode === 'register'
                      ? 'border-rose-600 text-rose-600'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  Create Account
                </button>
              </div>

              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-serif font-black text-slate-900">
                  {authMode === 'login' ? 'Welcome Back to AURA' : 'Join the AURA Atelier'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {authMode === 'login'
                    ? 'Enter your credentials to access your saved wardrobe and wishlist.'
                    : 'Sign up to unlock exclusive members-only runway drops and discounts.'}
                </p>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === 'register' && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Diya Kapoor"
                      value={authFormData.name}
                      onChange={(e) =>
                        setAuthFormData({ ...authFormData, name: e.target.value })
                      }
                      className={`w-full text-xs px-4 py-3 rounded-xl border ${
                        authErrors.name ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                      } outline-none focus:border-rose-500`}
                    />
                    {authErrors.name && (
                      <p className="text-[10px] text-rose-600 font-bold mt-1">
                        {authErrors.name}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={authFormData.email}
                    onChange={(e) =>
                      setAuthFormData({ ...authFormData, email: e.target.value })
                    }
                    className={`w-full text-xs px-4 py-3 rounded-xl border ${
                      authErrors.email ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                    } outline-none focus:border-rose-500`}
                  />
                  {authErrors.email && (
                    <p className="text-[10px] text-rose-600 font-bold mt-1">
                      {authErrors.email}
                    </p>
                  )}
                </div>

                {authMode === 'register' && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 00000"
                      value={authFormData.phone}
                      onChange={(e) =>
                        setAuthFormData({ ...authFormData, phone: e.target.value })
                      }
                      className="w-full text-xs px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-rose-500"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={authFormData.password}
                      onChange={(e) =>
                        setAuthFormData({ ...authFormData, password: e.target.value })
                      }
                      className={`w-full text-xs px-4 py-3 rounded-xl border ${
                        authErrors.password ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                      } outline-none focus:border-rose-500 pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {authErrors.password && (
                    <p className="text-[10px] text-rose-600 font-bold mt-1">
                      {authErrors.password}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-slate-900 hover:bg-rose-600 text-white rounded-xl text-xs font-bold tracking-wider transition shadow-md"
                  >
                    {authMode === 'login' ? 'SIGN IN TO AURA' : 'CREATE ACCOUNT'}
                  </button>
                </div>
              </form>

              {/* Demo Credentials Helper */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                <p className="font-bold text-slate-800 mb-1">💡 Quick Demo Login:</p>
                <p className="text-[11px] text-slate-500 mb-2">
                  Click to prefill credentials for testing:
                </p>
                <button
                  type="button"
                  onClick={() => {
                    loginUser({
                      name: 'Aarav Sharma',
                      email: 'aarav.sharma@example.com',
                      phone: '+91 98765 43210'
                    });
                  }}
                  className="w-full py-2 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition"
                >
                  One-Click Demo Login as Aarav Sharma
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ORDER CONFIRMATION MODAL */}
      <AnimatePresence>
        {confirmedOrder && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-left shadow-2xl overflow-hidden my-8"
              >
                {/* Celebratory Banner */}
                <div className="text-center pb-6 border-b border-slate-100">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
                    ORDER CONFIRMED
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-slate-900 mt-1">
                    Thank You for Your Order!
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Order ID:{' '}
                    <span className="font-mono font-bold text-slate-900">
                      {confirmedOrder.orderId}
                    </span>
                  </p>
                </div>

                {/* Details */}
                <div className="py-4 space-y-3 text-xs border-b border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>Estimated Delivery:</span>
                    <span className="font-bold text-slate-900">Within 2 Business Days (Express)</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Payment Method:</span>
                    <span className="font-bold text-slate-900 uppercase">
                      {confirmedOrder.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Total Amount:</span>
                    <span className="font-black text-rose-600">
                      ₹{confirmedOrder.grandTotal.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5">Shipping To:</span>
                    <p className="font-bold text-slate-800">
                      {confirmedOrder.shippingAddress.name} ({confirmedOrder.shippingAddress.phone})
                    </p>
                    <p className="text-slate-600">
                      {confirmedOrder.shippingAddress.address},{' '}
                      {confirmedOrder.shippingAddress.locality},{' '}
                      {confirmedOrder.shippingAddress.city} -{' '}
                      {confirmedOrder.shippingAddress.pincode}
                    </p>
                  </div>
                </div>

                {/* Ordered Items Preview */}
                <div className="py-3">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Items in this order ({confirmedOrder.items.length}):
                  </p>
                  <div className="space-y-2 max-h-36 overflow-y-auto no-scrollbar">
                    {confirmedOrder.items.map((it, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs">
                        <img
                          src={it.image}
                          alt={it.title}
                          className="w-8 h-10 object-cover rounded-lg shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-900 truncate">{it.title}</p>
                          <p className="text-[10px] text-slate-500">
                            Size: {it.selectedSize} • Qty: {it.quantity}
                          </p>
                        </div>
                        <span className="font-bold text-slate-900 shrink-0">
                          ₹{(it.price * it.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notice */}
                <div className="mt-4 p-3 rounded-2xl bg-amber-50 text-[11px] text-amber-900 border border-amber-200">
                  ⚡ <strong>Frontend Demo Note:</strong> This is a client-side prototype. No real money
                  was debited and no order was transmitted to a live server.
                </div>

                {/* CTA */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => {
                      setConfirmedOrder(null);
                      setActiveTab('account');
                    }}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition"
                  >
                    View in Account Orders
                  </button>
                  <button
                    onClick={() => {
                      setConfirmedOrder(null);
                      navigate('/');
                    }}
                    className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-rose-600/30"
                  >
                    Continue Shopping
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckoutLogin;
