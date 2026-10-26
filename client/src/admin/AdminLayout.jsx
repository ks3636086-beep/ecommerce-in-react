import React, { useState } from 'react';
import { NavLink, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderTree,
  Package,
  ShoppingCart,
  Store,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

const AdminLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve admin user details from local storage or fallback
  const adminUser = (() => {
    try {
      const stored = localStorage.getItem('admin_user');
      return stored
        ? JSON.parse(stored)
        : { name: 'Admin', email: 'admin@store.com', role: 'Super Admin' };
    } catch {
      return { name: 'Admin', email: 'admin@store.com', role: 'Super Admin' };
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', end: true, icon: LayoutDashboard },
    { name: 'Categories', path: '/admin/categories', end: false, icon: FolderTree },
    { name: 'Products', path: '/admin/products', end: false, icon: Package },
    { name: 'Orders', path: '/admin/orders', end: false, icon: ShoppingCart },
  ];

  // Helper to get active page title
  const getPageTitle = () => {
    const current = navItems.find((item) =>
      item.end
        ? location.pathname === item.path
        : location.pathname.startsWith(item.path)
    );
    return current ? current.name : 'Admin Panel';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between px-4 sm:px-6 h-16">
          {/* Left: Mobile hamburger & Brand */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20 font-bold text-sm">
                A
              </div>
              <div>
                <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                  AURA<span className="text-rose-600">.</span>
                </span>
                <span className="ml-1.5 text-[10px] font-bold tracking-wider uppercase bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full border border-rose-200/60">
                  Admin
                </span>
              </div>
            </Link>

            {/* Breadcrumb separator on desktop */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 ml-4 pl-4 border-l border-slate-200">
              <span>Admin</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span className="font-semibold text-slate-700">{getPageTitle()}</span>
            </div>
          </div>

          {/* Right: Quick actions & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Live Store */}
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-rose-200 hover:bg-rose-50/50 transition shadow-2xs"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Back to Store</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
            </Link>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>
            </div>

            {/* Admin Profile & Logout */}
            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 overflow-hidden ring-2 ring-slate-100">
                {adminUser.avatar ? (
                  <img
                    src={adminUser.avatar}
                    alt={adminUser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>AD</span>
                )}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">
                  {adminUser.name}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  {adminUser.role || 'Super Admin'}
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="p-2 ml-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200/80 p-4 shrink-0 justify-between">
          <div>
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Management
            </div>
            <nav className="space-y-1 mt-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                        isActive
                          ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/30'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </nav>

            <div className="px-3 py-2 mt-6 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Quick Shortcuts
            </div>
            <nav className="space-y-1 mt-1">
              <Link
                to="/"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition"
              >
                <Store className="w-4 h-4 text-slate-400" />
                <span>Back to Store</span>
              </Link>
            </nav>
          </div>

          {/* Sidebar bottom card */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="font-bold text-slate-800 text-[11px]">System Status</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Frontend UI Demo Mode. All actions run with simulated mock data.
            </p>
          </div>
        </aside>

        {/* Mobile Sidebar / Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl p-5 flex flex-col justify-between z-50 animate-in slide-in-from-left duration-200">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center font-bold text-sm">
                      A
                    </div>
                    <span className="font-bold text-slate-900">Aura Admin</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Navigation
                </div>
                <nav className="space-y-1.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.end}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                            isActive
                              ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/30'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                          }`
                        }
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </NavLink>
                    );
                  })}

                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition mt-3"
                  >
                    <Store className="w-4 h-4 text-slate-400" />
                    <span>Back to Store</span>
                  </Link>
                </nav>
              </div>

              {/* Mobile Drawer Logout */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Nested Page Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
