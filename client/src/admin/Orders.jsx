import React, { useState, useEffect } from 'react';
import {
  ShoppingCart,
  Search,
  Eye,
  X,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  AlertCircle,
  CreditCard,
  MapPin,
  User,
  Phone,
  Mail,
  ChevronDown
} from 'lucide-react';
import {
  getStoredOrders,
  saveStoredOrders
} from './adminMockData';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  // Selected Order for Modal View / Status Change
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    setOrders(getStoredOrders());
  }, []);

  // Filter orders by tab and search
  const filteredOrders = orders.filter((order) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      order.id.toLowerCase().includes(q) ||
      order.customer.name.toLowerCase().includes(q) ||
      order.customer.email.toLowerCase().includes(q) ||
      (order.shippingCity && order.shippingCity.toLowerCase().includes(q));

    const matchesTab =
      activeTab === 'All' || order.status.toLowerCase() === activeTab.toLowerCase();

    return matchesSearch && matchesTab;
  });

  // Handle Order Status Change (persisted)
  const handleUpdateStatus = (orderId, newStatus) => {
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(updated);
    saveStoredOrders(updated);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
    }
  };

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

  // Status Icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Processing':
        return <Clock className="w-3.5 h-3.5 text-amber-600" />;
      case 'Shipped':
        return <Truck className="w-3.5 h-3.5 text-blue-600" />;
      case 'Cancelled':
        return <XCircle className="w-3.5 h-3.5 text-rose-600" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  const tabs = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-rose-500" />
            <span>Orders Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track transactions, customer shipments, and fulfillment lifecycle
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-500 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs self-start sm:self-auto">
          Total Orders: <strong className="text-slate-900">{orders.length}</strong>
        </div>
      </div>

      {/* Tabs & Search Card */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-100">
          {tabs.map((tab) => {
            const count =
              tab === 'All'
                ? orders.length
                : orders.filter((o) => o.status.toLowerCase() === tab.toLowerCase()).length;
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${isActive
                    ? 'bg-rose-500 text-white shadow-xs shadow-rose-500/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
              >
                <span>{tab}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID, customer name..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs text-slate-400 self-end sm:self-center">
            Showing <strong className="text-slate-800">{filteredOrders.length}</strong> matching orders
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
                    <p className="font-semibold text-slate-600">No orders found</p>
                    <p className="text-[11px] mt-0.5">Try changing the status tab or search keyword.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/60 transition">
                    {/* Order ID */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded-md text-[11px]">
                        #{order.id}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{order.customer.name}</div>
                      <div className="text-[11px] text-slate-400">{order.customer.email}</div>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {order.date}
                    </td>

                    {/* Total */}
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      ₹{order.total.toLocaleString('en-IN')}
                      <span className="block text-[10px] text-slate-400 font-normal">
                        {order.itemsCount} {order.itemsCount === 1 ? 'item' : 'items'}
                      </span>
                    </td>

                    {/* Payment Method */}
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] font-medium text-slate-600">
                        {order.paymentMethod}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-rose-600 hover:bg-rose-50 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-rose-200 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedOrder(null)}
          />

          <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 max-w-xl w-full p-6 z-10 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    Order #{selectedOrder.id}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(
                      selectedOrder.status
                    )}`}
                  >
                    {getStatusIcon(selectedOrder.status)}
                    <span>{selectedOrder.status}</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Placed on {selectedOrder.date}</p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              {/* Quick Status Updater */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800">
                    Update Order Status
                  </label>
                  <p className="text-[11px] text-slate-400">
                    Simulate customer status change in real time
                  </p>
                </div>
                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    handleUpdateStatus(selectedOrder.id, e.target.value)
                  }
                  className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-rose-500 cursor-pointer shadow-xs"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Customer & Shipping Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-slate-200/80 bg-white">
                  <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-rose-500" />
                    <span>Customer Details</span>
                  </h4>
                  <p className="font-semibold text-slate-700">{selectedOrder.customer.name}</p>
                  <p className="text-slate-500 flex items-center gap-1.5 mt-1">
                    <Mail className="w-3 h-3 text-slate-400" />
                    <span>{selectedOrder.customer.email}</span>
                  </p>
                  <p className="text-slate-500 flex items-center gap-1.5 mt-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{selectedOrder.customer.phone}</span>
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-slate-200/80 bg-white">
                  <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>Shipping & Payment</span>
                  </h4>
                  <p className="text-slate-700 font-medium">{selectedOrder.shippingCity}</p>
                  <p className="text-slate-500 flex items-center gap-1.5 mt-1">
                    <CreditCard className="w-3 h-3 text-slate-400" />
                    <span>Payment: {selectedOrder.paymentMethod}</span>
                  </p>
                </div>
              </div>

              {/* Ordered Items List */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Ordered Items</h4>
                <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
                  {selectedOrder.items && selectedOrder.items.length > 0 ? (
                    selectedOrder.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 flex items-center justify-between text-xs hover:bg-slate-50/50"
                      >
                        <div>
                          <p className="font-bold text-slate-800">{item.name}</p>
                          <p className="text-[11px] text-slate-400">
                            Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <div className="font-bold text-slate-800">
                          ₹{(item.quantity * item.price).toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-xs text-slate-500">
                      Standard luxury apparel package (1 item)
                    </div>
                  )}
                </div>
              </div>

              {/* Total Calculation */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>₹{selectedOrder.total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping Fee</span>
                  <span className="text-emerald-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between font-extrabold text-sm text-slate-900 pt-2 border-t border-slate-200">
                  <span>Grand Total</span>
                  <span>₹{selectedOrder.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
