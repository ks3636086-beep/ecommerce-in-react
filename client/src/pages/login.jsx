import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff
} from 'lucide-react';

export default function Login() {
  const { user, loginUser, showToast } = useShop();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  // If already logged in, show quick switch / proceed option
  

const handleFormSubmit = async (e) => {
  e.preventDefault();

  const endpoint = isLogin ? 'login' : 'register';

  const body = isLogin
    ? {
        email: formData.email,
        password: formData.password
      }
    : {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };

  try {
    const response = await fetch(
      `http://localhost:5000/api/auth/${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      showToast(data.message || 'Request failed', 'error');
      return;
    }

    if (!isLogin) {
      showToast('Registration successful! Now sign in.', 'success');
      setIsLogin(true);
      return;
    }

    localStorage.setItem('token', data.token);

    loginUser({
      name: formData.email.split('@')[0],
      email: formData.email,
      phone: ''
    });

    showToast('Login successful!', 'success');
    navigate('/profile');
  } catch (error) {
    showToast('Backend server se connect nahi ho pa raha', 'error');
  }
};



  const handleDemoLogin = () => {
    loginUser({
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      phone: '+91 98765 43210'
    });
    navigate('/profile');
  };

  return (
    <div className="min-h-[85vh] bg-slate-50/70 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-7 sm:p-9 relative overflow-hidden">
        {/* Subtle decorative top glow */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-400 to-rose-600" />

        {/* Brand header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white font-serif font-black text-xl italic shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
              A
            </div>
            <div className="flex flex-col text-left">
              <span className="font-black text-lg tracking-[0.25em] text-slate-900 leading-none">
                AURA
              </span>
              <span className="text-[9px] tracking-[0.3em] font-bold text-rose-600 uppercase">
                ATELIER
              </span>
            </div>
          </Link>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            {isLogin ? 'Welcome Back' : 'Create Your Account'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isLogin
              ? 'Access your orders, saved addresses and exclusive VIP perks'
              : 'Join AURA Atelier to unlock early drops & reward coins'}
          </p>
        </div>

        {/* One-click quick demo login button */}
        <div className="mb-6 p-3.5 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50/60 border border-rose-100/80">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-rose-600 shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900">Instant Demo Login</p>
                <p className="text-[11px] text-slate-500">Sign in as Aarav Sharma (VIP Member)</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="px-3 py-1.5 bg-slate-900 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              1-Click Sign In
            </button>
          </div>
        </div>

        {/* Auth form */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Aarav Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required={!isLogin}
                  className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Mobile Number (Optional)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
                className="w-full text-xs pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input type="checkbox" defaultChecked className="rounded accent-rose-600" />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() =>
                  showToast('Password reset link sent to registered email (Demo)', 'info')
                }
                className="text-rose-600 font-bold hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white rounded-xl text-xs font-bold tracking-wider uppercase transition shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2"
          >
            <span>{isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle sign in / sign up */}
        <div className="text-center mt-6 pt-5 border-t border-slate-100">
          <p className="text-xs text-slate-600">
            {isLogin ? "Don't have an account yet?" : 'Already have an AURA account?'}{' '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-rose-600 font-bold hover:underline ml-1"
            >
              {isLogin ? 'Sign Up for Free' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Trust badge */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit Encrypted Secure Checkout Access</span>
        </div>
      </div>
    </div>
  );
}
