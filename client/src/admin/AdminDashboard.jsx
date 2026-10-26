import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  FolderTree,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Clock,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import {
  getStoredCategories,
  getStoredProducts,
  getStoredOrders
} from './adminMockData';

const AdminDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setCategories(getStoredCategories());
    setProducts(getStoredProducts());
    setOrders(getStoredOrders());
  }, []);

  // Compute summary stats dynamically from mock data
  const totalProducts = products.length;
  const totalCategories = categories.length;
  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, order) => sum + (order.total || 0), 0);

  // Status badge styling helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Processing':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Shipped':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-rose-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-rose-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-[11px] font-semibold backdrop-blur-md mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Overview & Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Store Performance Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Monitor orders, track inventory levels, and manage your product catalog seamlessly.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5">
            <Link
              to="/admin/products"
              className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md shadow-rose-500/25"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </Link>
            <Link
              to="/admin/orders"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition backdrop-blur-sm"
            >
              <span>View All Orders</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Products Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Products
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {totalProducts}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-600 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Active in catalog</span>
            </div>
          </div>
        </div>

        {/* Categories Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Categories
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <FolderTree className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {totalCategories}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-purple-600 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Department collections</span>
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Orders
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {totalOrders}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-amber-600 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Orders placed</span>
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Revenue
            </span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-600 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Gross sales value</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Recent Orders & Quick Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table (2 Cols on lg) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Recent Customer Orders</h2>
              <p className="text-xs text-slate-400">Latest transactions received across store</p>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
            >
              <span>View all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      #{order.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800">{order.customer.name}</p>
                      <p className="text-[11px] text-slate-400">{order.shippingCity}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      ₹{order.total.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to="/admin/orders"
                        className="inline-flex items-center gap-1 text-slate-600 hover:text-rose-600 font-semibold text-xs p-1 rounded-lg hover:bg-slate-100 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Categories Distribution & Quick Navigation (1 Col on lg) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Catalog Collections</h2>
                <p className="text-xs text-slate-400">Department distribution</p>
              </div>
              <Link
                to="/admin/categories"
                className="text-xs font-semibold text-rose-600 hover:text-rose-700"
              >
                Manage
              </Link>
            </div>

            <div className="space-y-3">
              {categories.slice(0, 5).map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 hover:bg-slate-100/70 transition border border-slate-100"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{cat.name}</h4>
                      <p className="text-[10px] text-slate-400">{cat.productCount} products</p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      cat.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {cat.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              to="/admin/categories"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
            >
              <FolderTree className="w-4 h-4" />
              <span>View All Categories</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
