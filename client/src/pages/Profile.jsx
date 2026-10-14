import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import {
  User,
  Package,
  MapPin,
  LogOut,
  Sparkles,
  ChevronRight,
  Edit3,
  Plus,
  Trash2,
  Check,
  CheckCircle2,
  Clock,
  Truck,
  ShieldCheck,
  Phone,
  Mail,
  Calendar,
  Lock,
  ArrowRight,
  Search,
  Eye,
  FileText,
  RotateCcw,
  X,
  AlertTriangle,
  Gift,
  Building,
  Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Profile() {
  const {
    user,
    orders,
    wishlistCount,
    cartCount,
    logoutUser,
    loginUser,
    updateUserProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    cancelOrder,
    reorderItems,
    showToast
  } = useShop();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Active tab management: 'details' | 'addresses' | 'orders'
  const tabFromQuery = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(
    tabFromQuery === 'orders' || tabFromQuery === 'addresses' ? tabFromQuery : 'details'
  );

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['details', 'addresses', 'orders'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
  };

  // Modals state
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null); // null if adding new
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [addressToDelete, setAddressToDelete] = useState(null);

  // Profile Edit Form State
  const [profileFormData, setProfileFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: user?.gender || 'Male',
    dateOfBirth: user?.dateOfBirth || '1996-08-14'
  });

  useEffect(() => {
    if (user?.isLoggedIn) {
      setProfileFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || 'Male',
        dateOfBirth: user.dateOfBirth || '1996-08-14'
      });
    }
  }, [user]);

  // Address Form State
  const [addressFormData, setAddressFormData] = useState({
    name: '',
    phone: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    type: 'Home',
    isDefault: false
  });
  const [addressFormErrors, setAddressFormErrors] = useState({});

  // Orders Filter State
  const [orderFilter, setOrderFilter] = useState('all');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');

  // Password Change Mock State
  const [passwordData, setPasswordData] = useState({ current: '', next: '', confirm: '' });
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Notifications Toggles
  const [prefWhatsapp, setPrefWhatsapp] = useState(true);
  const [prefNewsletter, setPrefNewsletter] = useState(true);

  // Open Edit Address Modal
  const openEditAddressModal = (addr) => {
    setEditingAddress(addr);
    setAddressFormData({
      name: addr.name || '',
      phone: addr.phone || '',
      pincode: addr.pincode || '',
      locality: addr.locality || '',
      address: addr.address || '',
      city: addr.city || '',
      state: addr.state || '',
      type: addr.type || 'Home',
      isDefault: Boolean(addr.isDefault)
    });
    setAddressFormErrors({});
    setIsAddressModalOpen(true);
  };

  // Open Add Address Modal
  const openAddAddressModal = () => {
    setEditingAddress(null);
    setAddressFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      pincode: '',
      locality: '',
      address: '',
      city: '',
      state: '',
      type: 'Home',
      isDefault: !user?.savedAddresses || user.savedAddresses.length === 0
    });
    setAddressFormErrors({});
    setIsAddressModalOpen(true);
  };

  // Validate Address Form
  const validateAddressForm = () => {
    const errors = {};
    if (!addressFormData.name.trim()) errors.name = 'Full name is required';
    if (!addressFormData.phone.trim() || addressFormData.phone.length < 10) {
      errors.phone = 'Valid 10-digit mobile number required';
    }
    if (!addressFormData.pincode.trim() || addressFormData.pincode.length !== 6) {
      errors.pincode = 'Valid 6-digit pincode required';
    }
    if (!addressFormData.address.trim()) errors.address = 'Flat / House no. and street required';
    if (!addressFormData.city.trim()) errors.city = 'City is required';
    if (!addressFormData.state.trim()) errors.state = 'State is required';
    return errors;
  };

  // Submit Address
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const errors = validateAddressForm();
    if (Object.keys(errors).length > 0) {
      setAddressFormErrors(errors);
      return;
    }

    if (editingAddress) {
      updateAddress(editingAddress.id, addressFormData);
    } else {
      addAddress(addressFormData);
    }

    setIsAddressModalOpen(false);
  };

  // Submit Profile Edit
  const handleProfileUpdateSubmit = (e) => {
    e.preventDefault();
    if (!profileFormData.name.trim()) {
      showToast('Name cannot be empty', 'error');
      return;
    }
    updateUserProfile(profileFormData);
    setIsEditProfileModalOpen(false);
  };

  // Handle Mock Password Submit
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwordData.current || !passwordData.next) {
      showToast('Please fill all password fields', 'error');
      return;
    }
    if (passwordData.next.length < 6) {
      showToast('New password must be at least 6 characters', 'error');
      return;
    }
    if (passwordData.next !== passwordData.confirm) {
      showToast('New passwords do not match', 'error');
      return;
    }
    setPasswordSuccess(true);
    setPasswordData({ current: '', next: '', confirm: '' });
    showToast('Account password updated successfully!', 'success');
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  // Filter Orders
  const filteredOrders = orders.filter((order) => {
    // Status filter
    if (orderFilter === 'delivered' && order.status !== 'Delivered') return false;
    if (orderFilter === 'in_transit' && order.status !== 'In Transit' && order.status !== 'Processing') return false;
    if (orderFilter === 'cancelled' && order.status !== 'Cancelled') return false;

    // Search query
    if (orderSearchQuery.trim()) {
      const q = orderSearchQuery.toLowerCase();
      const matchesId = order.orderId.toLowerCase().includes(q);
      const matchesItems = order.items.some(
        (it) => it.title.toLowerCase().includes(q) || it.brand.toLowerCase().includes(q)
      );
      return matchesId || matchesItems;
    }

    return true;
  });

  // If user is not logged in, render high-end signed-out screen
  if (!user?.isLoggedIn) {
    return (
      <div className="min-h-[80vh] bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100 text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
            <User className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black text-slate-900 mb-2">My Account</h2>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            Sign in to access your personal details, saved shipping addresses, order tracking, and
            VIP rewards.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => {
                loginUser({
                  name: 'Aarav Sharma',
                  email: 'aarav.sharma@example.com',
                  phone: '+91 98765 43210'
                });
              }}
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white rounded-xl text-xs font-bold tracking-wider uppercase transition shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Sign In as Aarav Sharma (Demo)</span>
            </button>

            <Link
              to="/login"
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition block"
            >
              Login with Email / Register
            </Link>

            <Link
              to="/"
              className="inline-block text-xs font-bold text-slate-500 hover:text-rose-600 transition pt-2"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <Link to="/" className="hover:text-slate-800 transition">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-900 font-semibold">My Account</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Account Overview
            </h1>
          </div>

          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* User Hero Banner Card */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.15),transparent_70%)] pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            {/* Left: User Avatar & Info */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-400 flex items-center justify-center text-white font-serif font-black text-2xl sm:text-3xl shadow-lg shadow-rose-600/30">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <button
                  onClick={() => setIsEditProfileModalOpen(true)}
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white text-slate-800 hover:text-rose-600 shadow-md flex items-center justify-center transition"
                  title="Edit Profile"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">{user.name}</h2>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30">
                    <Sparkles className="w-2.5 h-2.5 text-rose-400" />
                    {user.tier || 'VIP Elite'}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{user.email}</p>
                <p className="text-xs text-slate-400 mt-0.5">{user.phone}</p>
              </div>
            </div>

            {/* Right: Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-8">
              <div
                onClick={() => handleTabChange('orders')}
                className="bg-white/5 hover:bg-white/10 p-3 rounded-2xl cursor-pointer transition border border-white/5"
              >
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Total Orders
                </div>
                <div className="text-lg font-black text-white mt-0.5">{orders.length}</div>
              </div>

              <div
                onClick={() => handleTabChange('addresses')}
                className="bg-white/5 hover:bg-white/10 p-3 rounded-2xl cursor-pointer transition border border-white/5"
              >
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Saved Addresses
                </div>
                <div className="text-lg font-black text-white mt-0.5">
                  {user.savedAddresses?.length || 0}
                </div>
              </div>

              <Link
                to="/wishlist"
                className="bg-white/5 hover:bg-white/10 p-3 rounded-2xl transition border border-white/5"
              >
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Wishlist Items
                </div>
                <div className="text-lg font-black text-rose-300 mt-0.5">{wishlistCount}</div>
              </Link>

              <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  AURA Coins
                </div>
                <div className="text-lg font-black text-amber-300 mt-0.5">
                  {user.auraPoints || 2450}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Sidebar Navigation & Active Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-sm sticky top-24">
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 px-3 py-2">
                Account Settings
              </div>

              <div className="space-y-1">
                {[
                  {
                    id: 'details',
                    label: 'User Details & Profile',
                    desc: 'Name, phone, email & security',
                    icon: User,
                    count: null
                  },
                  {
                    id: 'orders',
                    label: 'My Orders & Tracking',
                    desc: 'Track packages, invoices & returns',
                    icon: Package,
                    count: orders.length
                  },
                  {
                    id: 'addresses',
                    label: 'Saved Addresses',
                    desc: 'Default shipping locations',
                    icon: MapPin,
                    count: user.savedAddresses?.length
                  }
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabChange(item.id)}
                      className={`w-full text-left p-3.5 rounded-2xl flex items-center justify-between transition group ${
                        isActive
                          ? 'bg-rose-50 text-rose-700 font-bold border border-rose-100 shadow-sm'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${
                            isActive
                              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                              : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p
                            className={`text-xs ${
                              isActive ? 'font-bold text-rose-900' : 'font-semibold text-slate-800'
                            }`}
                          >
                            {item.label}
                          </p>
                          <p className="text-[10px] text-slate-400">{item.desc}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {item.count !== null && item.count !== undefined && (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              isActive ? 'bg-rose-200 text-rose-800' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {item.count}
                          </span>
                        )}
                        <ChevronRight
                          className={`w-4 h-4 transition ${
                            isActive
                              ? 'text-rose-600 translate-x-0.5'
                              : 'text-slate-300 group-hover:text-slate-500'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quick links & Logout button */}
              <div className="pt-4 mt-4 border-t border-slate-100 space-y-1">
                <Link
                  to="/wishlist"
                  className="w-full text-left p-3 rounded-xl flex items-center justify-between text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <Gift className="w-4 h-4 text-slate-400" />
                    <span>My Wishlist ({wishlistCount})</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </Link>

                <button
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="w-full text-left p-3 rounded-xl flex items-center justify-between text-xs font-bold text-rose-600 hover:bg-rose-50 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <LogOut className="w-4 h-4 text-rose-600" />
                    <span>Log Out of Account</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-rose-300" />
                </button>
              </div>
            </div>

            {/* AURA VIP Club Perk Box */}
            <div className="bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-amber-500/5 border border-amber-200/60 rounded-3xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  VIP Club Benefits
                </h3>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Enjoy complimentary express delivery, early access to atelier drops, and dedicated
                styling concierge.
              </p>
              <div className="flex items-center justify-between text-[11px] font-bold text-amber-900 bg-amber-100/70 py-1.5 px-3 rounded-xl">
                <span>Current Tier: Gold Elite</span>
                <span>2,450 Coins Active</span>
              </div>
            </div>
          </div>

          {/* Right Main Panel */}
          <div className="lg:col-span-8">
            {/* ========================================================= */}
            {/* TAB 1: USER DETAILS */}
            {/* ========================================================= */}
            {activeTab === 'details' && (
              <div className="space-y-6">
                {/* Personal Information Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                    <div>
                      <h3 className="text-base font-black text-slate-900">Personal Information</h3>
                      <p className="text-xs text-slate-500">
                        Manage your personal details and contact credentials
                      </p>
                    </div>
                    <button
                      onClick={() => setIsEditProfileModalOpen(true)}
                      className="px-4 py-2 bg-slate-900 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Profile</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Full Name
                      </span>
                      <p className="text-sm font-bold text-slate-900">{user.name}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Email Address
                      </span>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full shrink-0">
                          Verified
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Mobile Phone Number
                      </span>
                      <p className="text-sm font-bold text-slate-900">{user.phone}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Gender
                      </span>
                      <p className="text-sm font-bold text-slate-900">{user.gender || 'Male'}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Date of Birth
                      </span>
                      <p className="text-sm font-bold text-slate-900">
                        {user.dateOfBirth || '14 August 1996'}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Member Status
                      </span>
                      <p className="text-sm font-bold text-slate-900">
                        {user.memberSince || 'Since October 2024'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Password & Security Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                  <div className="pb-4 border-b border-slate-100 mb-6">
                    <h3 className="text-base font-black text-slate-900">Security & Credentials</h3>
                    <p className="text-xs text-slate-500">
                      Update your login password and manage account security
                    </p>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-lg">
                    {passwordSuccess && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Your password has been changed successfully.</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={passwordData.current}
                        onChange={(e) =>
                          setPasswordData({ ...passwordData, current: e.target.value })
                        }
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          placeholder="At least 6 characters"
                          value={passwordData.next}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, next: e.target.value })
                          }
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          placeholder="Re-enter password"
                          value={passwordData.confirm}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, confirm: e.target.value })
                          }
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-slate-900 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition shadow-sm"
                    >
                      Update Password
                    </button>
                  </form>
                </div>

                {/* Communication Preferences */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                  <div className="pb-4 border-b border-slate-100 mb-5">
                    <h3 className="text-base font-black text-slate-900">
                      Notification Preferences
                    </h3>
                    <p className="text-xs text-slate-500">
                      Choose how you receive order delivery alerts and drop newsletters
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3.5 bg-slate-50/70 rounded-2xl border border-slate-100">
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          Instant Order Updates via WhatsApp & SMS
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Receive real-time courier tracking and OTPs on delivery day
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={prefWhatsapp}
                        onChange={(e) => setPrefWhatsapp(e.target.checked)}
                        className="w-4 h-4 accent-rose-600 cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-slate-50/70 rounded-2xl border border-slate-100">
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          Runway Drops & VIP Early Access Emails
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Curated lookbooks and member-only discount codes
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={prefNewsletter}
                        onChange={(e) => setPrefNewsletter(e.target.checked)}
                        className="w-4 h-4 accent-rose-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 2: SAVED ADDRESSES */}
            {/* ========================================================= */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
                    <div>
                      <h3 className="text-base font-black text-slate-900">
                        Saved Shipping Addresses
                      </h3>
                      <p className="text-xs text-slate-500">
                        Add, edit or set default delivery addresses for 1-click checkout
                      </p>
                    </div>

                    <button
                      onClick={openAddAddressModal}
                      className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-rose-600/20 self-start sm:self-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Address</span>
                    </button>
                  </div>

                  {user.savedAddresses && user.savedAddresses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.savedAddresses.map((addr) => (
                        <div
                          key={addr.id}
                          className={`p-5 rounded-2xl border transition relative flex flex-col justify-between ${
                            addr.isDefault
                              ? 'border-rose-400/80 bg-rose-50/20 shadow-sm ring-1 ring-rose-500/20'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div>
                            {/* Card Badges */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 flex items-center gap-1">
                                  {addr.type === 'Work' ? (
                                    <Building className="w-3 h-3 text-slate-500" />
                                  ) : (
                                    <Home className="w-3 h-3 text-slate-500" />
                                  )}
                                  {addr.type || 'Home'}
                                </span>

                                {addr.isDefault && (
                                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 flex items-center gap-1">
                                    <Check className="w-3 h-3" /> Default
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Recipient info */}
                            <p className="text-sm font-black text-slate-900 mb-1">{addr.name}</p>
                            <p className="text-xs text-slate-600 leading-relaxed mb-1">
                              {addr.address}
                            </p>
                            <p className="text-xs text-slate-600 leading-relaxed mb-3">
                              {addr.locality && `${addr.locality}, `}
                              {addr.city}, {addr.state} -{' '}
                              <span className="font-mono font-bold text-slate-800">
                                {addr.pincode}
                              </span>
                            </p>

                            <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              <span>{addr.phone}</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openEditAddressModal(addr)}
                                className="text-xs font-bold text-slate-700 hover:text-rose-600 px-2.5 py-1 rounded-lg hover:bg-slate-50 transition"
                              >
                                Edit
                              </button>
                              <span className="text-slate-200">|</span>
                              <button
                                onClick={() => setAddressToDelete(addr)}
                                className="text-xs font-bold text-rose-600 hover:text-rose-700 px-2.5 py-1 rounded-lg hover:bg-rose-50 transition"
                              >
                                Delete
                              </button>
                            </div>

                            {!addr.isDefault && (
                              <button
                                onClick={() => setDefaultAddress(addr.id)}
                                className="text-[11px] font-bold text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 px-2.5 py-1 rounded-lg transition"
                              >
                                Make Default
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 px-4 border border-dashed border-slate-200 rounded-3xl">
                      <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <h4 className="text-sm font-bold text-slate-900 mb-1">
                        No Saved Addresses Found
                      </h4>
                      <p className="text-xs text-slate-500 mb-5">
                        Add your primary delivery address for faster checkout.
                      </p>
                      <button
                        onClick={openAddAddressModal}
                        className="px-5 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition"
                      >
                        + Add First Address
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 3: MY ORDERS */}
            {/* ========================================================= */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                  {/* Top Header & Search Bar */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
                    <div>
                      <h3 className="text-base font-black text-slate-900">
                        My Orders ({orders.length})
                      </h3>
                      <p className="text-xs text-slate-500">
                        Track current shipments and view previous purchases
                      </p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                      {/* Search order input */}
                      <div className="relative flex-1 md:w-64">
                        <input
                          type="text"
                          placeholder="Search by Order ID or item..."
                          value={orderSearchQuery}
                          onChange={(e) => setOrderSearchQuery(e.target.value)}
                          className="w-full text-xs pl-8 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-rose-500"
                        />
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        {orderSearchQuery && (
                          <button
                            onClick={() => setOrderSearchQuery('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Filter Sub-Tabs */}
                  <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
                    {[
                      { id: 'all', label: 'All Orders' },
                      { id: 'in_transit', label: 'In Transit / Processing' },
                      { id: 'delivered', label: 'Delivered' },
                      { id: 'cancelled', label: 'Cancelled' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setOrderFilter(tab.id)}
                        className={`text-xs px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                          orderFilter === tab.id
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Orders List */}
                  {filteredOrders.length > 0 ? (
                    <div className="space-y-5">
                      {filteredOrders.map((order) => {
                        const isDelivered = order.status === 'Delivered';
                        const isCancelled = order.status === 'Cancelled';
                        const isInTransit =
                          order.status === 'In Transit' || order.status === 'Processing';

                        return (
                          <div
                            key={order.orderId}
                            className="p-5 sm:p-6 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 transition shadow-sm space-y-4"
                          >
                            {/* Order Card Top Bar */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold text-sm text-slate-900">
                                    #{order.orderId}
                                  </span>
                                  <span
                                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                      isDelivered
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : isCancelled
                                        ? 'bg-rose-100 text-rose-800'
                                        : 'bg-amber-100 text-amber-800'
                                    }`}
                                  >
                                    {order.status}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-400 mt-0.5">
                                  Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                  })}
                                </p>
                              </div>

                              <div className="text-left sm:text-right">
                                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                                  Total Paid
                                </span>
                                <span className="text-sm font-black text-slate-900">
                                  ₹{order.grandTotal.toLocaleString()}
                                </span>
                              </div>
                            </div>

                            {/* Tracking Status Timeline Banner */}
                            {!isCancelled && (
                              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                                <div className="flex items-center gap-2">
                                  <Truck
                                    className={`w-4 h-4 ${
                                      isDelivered ? 'text-emerald-600' : 'text-amber-600'
                                    }`}
                                  />
                                  <span className="font-semibold text-slate-800">
                                    {order.deliveryEstimate}
                                  </span>
                                </div>
                                {order.trackingNumber && (
                                  <span className="font-mono text-[11px] text-slate-500">
                                    Track: {order.trackingNumber} ({order.carrier || 'BlueDart'})
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Items Preview */}
                            <div className="space-y-3">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-14 h-16 object-cover rounded-xl shrink-0 border border-slate-100"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                      {item.brand}
                                    </p>
                                    <p className="text-xs font-bold text-slate-900 truncate">
                                      {item.title}
                                    </p>
                                    <p className="text-[11px] text-slate-500 mt-0.5">
                                      Size: {item.selectedSize} • Qty: {item.quantity}
                                    </p>
                                  </div>
                                  <div className="text-right text-xs font-bold text-slate-900">
                                    ₹{(item.price * item.quantity).toLocaleString()}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Order Actions */}
                            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setSelectedOrderDetails(order)}
                                  className="text-xs font-bold text-slate-800 hover:text-rose-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 transition flex items-center gap-1.5"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>View Invoice & Details</span>
                                </button>

                                <button
                                  onClick={() => reorderItems(order.items)}
                                  className="text-xs font-bold text-slate-800 hover:text-rose-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 transition flex items-center gap-1.5"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                  <span>Buy Again</span>
                                </button>
                              </div>

                              {isInTransit && (
                                <button
                                  onClick={() => setOrderToCancel(order)}
                                  className="text-xs font-bold text-rose-600 hover:text-rose-700 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition"
                                >
                                  Cancel Order
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 px-4 border border-dashed border-slate-200 rounded-3xl">
                      <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <h4 className="text-sm font-bold text-slate-900 mb-1">No Orders Found</h4>
                      <p className="text-xs text-slate-500 mb-5">
                        {orderSearchQuery
                          ? `No orders matching "${orderSearchQuery}"`
                          : "You haven't placed any orders in this category yet."}
                      </p>
                      <Link
                        to="/products"
                        className="px-5 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition inline-block"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: EDIT PROFILE MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isEditProfileModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditProfileModalOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <h3 className="text-base font-black text-slate-900">Edit Profile Details</h3>
                <button
                  onClick={() => setIsEditProfileModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleProfileUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={profileFormData.name}
                    onChange={(e) =>
                      setProfileFormData({ ...profileFormData, name: e.target.value })
                    }
                    required
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={profileFormData.email}
                    onChange={(e) =>
                      setProfileFormData({ ...profileFormData, email: e.target.value })
                    }
                    required
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    value={profileFormData.phone}
                    onChange={(e) =>
                      setProfileFormData({ ...profileFormData, phone: e.target.value })
                    }
                    required
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Gender
                    </label>
                    <select
                      value={profileFormData.gender}
                      onChange={(e) =>
                        setProfileFormData({ ...profileFormData, gender: e.target.value })
                      }
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-rose-500 bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-Binary">Non-Binary</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={profileFormData.dateOfBirth}
                      onChange={(e) =>
                        setProfileFormData({ ...profileFormData, dateOfBirth: e.target.value })
                      }
                      className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 outline-none focus:border-rose-500 bg-white"
                    >
                    </input>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditProfileModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL 2: ADD / EDIT ADDRESS MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isAddressModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddressModalOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <h3 className="text-base font-black text-slate-900">
                  {editingAddress ? 'Edit Address' : 'Add New Shipping Address'}
                </h3>
                <button
                  onClick={() => setIsAddressModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Recipient Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aarav Sharma"
                      value={addressFormData.name}
                      onChange={(e) =>
                        setAddressFormData({ ...addressFormData, name: e.target.value })
                      }
                      className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${
                        addressFormErrors.name ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                      } outline-none focus:border-rose-500`}
                    />
                    {addressFormErrors.name && (
                      <p className="text-[10px] text-rose-600 font-bold mt-1">
                        {addressFormErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Mobile Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile"
                      value={addressFormData.phone}
                      onChange={(e) =>
                        setAddressFormData({ ...addressFormData, phone: e.target.value })
                      }
                      className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${
                        addressFormErrors.phone
                          ? 'border-rose-500 bg-rose-50/50'
                          : 'border-slate-200'
                      } outline-none focus:border-rose-500`}
                    />
                    {addressFormErrors.phone && (
                      <p className="text-[10px] text-rose-600 font-bold mt-1">
                        {addressFormErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Pincode / Postal Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="6-digit pincode"
                      value={addressFormData.pincode}
                      onChange={(e) =>
                        setAddressFormData({
                          ...addressFormData,
                          pincode: e.target.value.replace(/\D/g, '')
                        })
                      }
                      className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${
                        addressFormErrors.pincode
                          ? 'border-rose-500 bg-rose-50/50'
                          : 'border-slate-200'
                      } outline-none focus:border-rose-500`}
                    />
                    {addressFormErrors.pincode && (
                      <p className="text-[10px] text-rose-600 font-bold mt-1">
                        {addressFormErrors.pincode}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Locality / Colony
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Fort, Colaba"
                      value={addressFormData.locality}
                      onChange={(e) =>
                        setAddressFormData({ ...addressFormData, locality: e.target.value })
                      }
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Flat / House No. / Building / Street *
                  </label>
                  <input
                    type="text"
                    placeholder="Flat 402, Highline Residency, Marine Drive"
                    value={addressFormData.address}
                    onChange={(e) =>
                      setAddressFormData({ ...addressFormData, address: e.target.value })
                    }
                    className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${
                      addressFormErrors.address
                        ? 'border-rose-500 bg-rose-50/50'
                        : 'border-slate-200'
                    } outline-none focus:border-rose-500`}
                  />
                  {addressFormErrors.address && (
                    <p className="text-[10px] text-rose-600 font-bold mt-1">
                      {addressFormErrors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
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
                        addressFormErrors.city ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                      } outline-none focus:border-rose-500`}
                    />
                    {addressFormErrors.city && (
                      <p className="text-[10px] text-rose-600 font-bold mt-1">
                        {addressFormErrors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
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
                        addressFormErrors.state
                          ? 'border-rose-500 bg-rose-50/50'
                          : 'border-slate-200'
                      } outline-none focus:border-rose-500`}
                    />
                    {addressFormErrors.state && (
                      <p className="text-[10px] text-rose-600 font-bold mt-1">
                        {addressFormErrors.state}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Address Label
                  </label>
                  <div className="flex gap-3">
                    {['Home', 'Work', 'Other'].map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setAddressFormData({ ...addressFormData, type })}
                        className={`text-xs px-4 py-2 rounded-xl font-bold border transition ${
                          addressFormData.type === type
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : 'border-slate-200 text-slate-700 bg-slate-50'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={addressFormData.isDefault}
                      onChange={(e) =>
                        setAddressFormData({ ...addressFormData, isDefault: e.target.checked })
                      }
                      className="rounded accent-rose-600 w-4 h-4"
                    />
                    <span>Set this as my default shipping address</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddressModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition"
                  >
                    {editingAddress ? 'Update Address' : 'Save Address'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL 3: ORDER INVOICE & DETAILS MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedOrderDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrderDetails(null)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Order #{selectedOrderDetails.orderId}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Placed on{' '}
                    {new Date(selectedOrderDetails.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrderDetails(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Courier tracking steps */}
              {selectedOrderDetails.trackingSteps && (
                <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3">
                    Shipment Progress
                  </h4>
                  <div className="space-y-3">
                    {selectedOrderDetails.trackingSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                            step.completed
                              ? 'bg-emerald-600 text-white'
                              : step.current
                              ? 'bg-amber-500 text-white animate-pulse'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {step.completed ? '✓' : idx + 1}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-bold ${
                              step.completed
                                ? 'text-slate-900'
                                : step.current
                                ? 'text-amber-800'
                                : 'text-slate-400'
                            }`}
                          >
                            {step.title}
                          </p>
                          <p className="text-[10px] text-slate-400">{step.time || step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Ordered Items ({selectedOrderDetails.items.length})
                </h4>
                {selectedOrderDetails.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-14 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-bold text-slate-900 truncate">{item.brand}</p>
                      <p className="text-slate-500 truncate">{item.title}</p>
                      <p className="text-[11px] text-slate-400">
                        Size: {item.selectedSize} • Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right text-xs font-bold text-slate-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 py-3 border-t border-slate-100 text-xs text-slate-600 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{selectedOrderDetails.subtotal?.toLocaleString()}</span>
                </div>
                {selectedOrderDetails.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount Applied</span>
                    <span>-₹{selectedOrderDetails.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>
                    {selectedOrderDetails.shippingFee === 0
                      ? 'FREE'
                      : `₹${selectedOrderDetails.shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span>₹{selectedOrderDetails.platformFee || 19}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100 font-black text-slate-900 text-sm">
                  <span>Grand Total</span>
                  <span className="text-rose-600">
                    ₹{selectedOrderDetails.grandTotal?.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Shipping Address & Payment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs mb-6">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Shipping Address
                  </span>
                  <p className="font-bold text-slate-900">
                    {selectedOrderDetails.shippingAddress?.name}
                  </p>
                  <p className="text-slate-600">{selectedOrderDetails.shippingAddress?.address}</p>
                  <p className="text-slate-600">
                    {selectedOrderDetails.shippingAddress?.city},{' '}
                    {selectedOrderDetails.shippingAddress?.state} -{' '}
                    {selectedOrderDetails.shippingAddress?.pincode}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Payment Method
                  </span>
                  <p className="font-bold text-slate-900">
                    {selectedOrderDetails.paymentMethod || 'UPI Payment'}
                  </p>
                  <span className="inline-block mt-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Payment Verified
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => showToast('Invoice downloaded successfully (PDF)', 'success')}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Invoice (PDF)</span>
                </button>
                <button
                  onClick={() => setSelectedOrderDetails(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL 4: CANCEL ORDER CONFIRMATION */}
      {/* ========================================================= */}
      <AnimatePresence>
        {orderToCancel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOrderToCancel(null)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-2xl z-10"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-1">Cancel Order?</h3>
              <p className="text-xs text-slate-500 mb-6">
                Are you sure you want to cancel order #{orderToCancel.orderId}? The order will be
                cancelled immediately.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setOrderToCancel(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  No, Keep It
                </button>
                <button
                  onClick={() => {
                    cancelOrder(orderToCancel.orderId);
                    setOrderToCancel(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition"
                >
                  Yes, Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL 5: DELETE ADDRESS CONFIRMATION */}
      {/* ========================================================= */}
      <AnimatePresence>
        {addressToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAddressToDelete(null)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-2xl z-10"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-1">Delete Address?</h3>
              <p className="text-xs text-slate-500 mb-6">
                Are you sure you want to remove the address for "{addressToDelete.name}"?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setAddressToDelete(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteAddress(addressToDelete.id);
                    setAddressToDelete(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL 6: LOGOUT CONFIRMATION MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isLogoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLogoutModalOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-2xl z-10"
            >
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <LogOut className="w-7 h-7" />
              </div>

              <h3 className="text-lg font-black text-slate-900 mb-1">Sign Out of Account</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Are you sure you want to log out? You can sign back in anytime to access your
                wishlist, orders, and saved addresses.
              </p>

              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    logoutUser();
                    setIsLogoutModalOpen(false);
                  }}
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition shadow-md shadow-rose-600/20"
                >
                  Yes, Sign Out
                </button>
                <button
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold tracking-wider uppercase transition"
                >
                  Stay Signed In
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
