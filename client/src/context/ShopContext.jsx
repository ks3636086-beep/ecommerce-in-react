import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';
import { validateAndApplyCoupon } from '../data/coupons';

const ShopContext = createContext();

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

export const ShopProvider = ({ children }) => {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Pre-seed with 2 realistic items for immediate delight if empty
    return [
      {
        ...products[0],
        selectedSize: '40',
        quantity: 1,
        cartItemId: `${products[0].id}-40`
      },
      {
        ...products[1],
        selectedSize: 'M',
        quantity: 1,
        cartItemId: `${products[1].id}-M`
      }
    ];
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [products[3], products[7]];
  });

  // Default user prototype for rich initial state & demo login
  const defaultUserProfile = {
    isLoggedIn: true,
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    gender: 'Male',
    dateOfBirth: '1996-08-14',
    memberSince: 'October 2024',
    tier: 'AURA VIP Elite',
    auraPoints: 2450,
    savedAddresses: [
      {
        id: 'addr-1',
        name: 'Aarav Sharma',
        phone: '+91 98765 43210',
        pincode: '400001',
        locality: 'Fort, Colaba',
        address: 'Flat 402, Highline Residency, Marine Drive',
        city: 'Mumbai',
        state: 'Maharashtra',
        isDefault: true,
        type: 'Home'
      },
      {
        id: 'addr-2',
        name: 'Aarav Sharma (Office)',
        phone: '+91 98765 43210',
        pincode: '400051',
        locality: 'Bandra Kurla Complex (BKC)',
        address: 'Floor 14, Tower B, One International Centre, Senapati Bapat Marg',
        city: 'Mumbai',
        state: 'Maharashtra',
        isDefault: false,
        type: 'Work'
      }
    ]
  };

  // Default orders prototype
  const defaultInitialOrders = [
    {
      orderId: 'AURA-849201',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
      status: 'In Transit',
      deliveryEstimate: 'Expected Tomorrow, by 8:00 PM',
      trackingNumber: 'AURA-EXP-992140',
      carrier: 'BlueDart Express',
      items: [
        {
          id: products[0].id,
          title: products[0].title,
          brand: products[0].brand,
          price: products[0].price,
          originalPrice: products[0].originalPrice,
          image: products[0].image,
          selectedSize: '40',
          quantity: 1
        }
      ],
      shippingAddress: {
        name: 'Aarav Sharma',
        phone: '+91 98765 43210',
        address: 'Flat 402, Highline Residency, Marine Drive',
        locality: 'Fort, Colaba',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        type: 'Home'
      },
      paymentMethod: 'UPI (Google Pay)',
      subtotal: 3499,
      discount: 500,
      shippingFee: 0,
      platformFee: 19,
      grandTotal: 3018,
      trackingSteps: [
        { title: 'Order Placed & Confirmed', time: 'Yesterday, 11:20 AM', completed: true },
        { title: 'Quality Check & Packed at Hub', time: 'Yesterday, 04:45 PM', completed: true },
        { title: 'In Transit - Out for Delivery', time: 'Today, 09:15 AM', completed: false, current: true },
        { title: 'Delivered', time: 'Expected Tomorrow', completed: false }
      ]
    },
    {
      orderId: 'AURA-716492',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
      status: 'Delivered',
      deliveryEstimate: 'Delivered on 30 Sep 2026',
      trackingNumber: 'AURA-DEL-401923',
      carrier: 'Delhivery Surface',
      items: [
        {
          id: products[1]?.id || 2,
          title: products[1]?.title || 'Silk Blend Evening Gown',
          brand: products[1]?.brand || 'AURA COUTURE',
          price: products[1]?.price || 4299,
          originalPrice: products[1]?.originalPrice || 8599,
          image: products[1]?.image || products[0].image,
          selectedSize: 'M',
          quantity: 1
        },
        {
          id: products[2]?.id || 3,
          title: products[2]?.title || 'Structured Wool Trench Coat',
          brand: products[2]?.brand || 'AURA ATELIER',
          price: products[2]?.price || 5999,
          originalPrice: products[2]?.originalPrice || 11999,
          image: products[2]?.image || products[0].image,
          selectedSize: 'L',
          quantity: 1
        }
      ],
      shippingAddress: {
        name: 'Aarav Sharma',
        phone: '+91 98765 43210',
        address: 'Flat 402, Highline Residency, Marine Drive',
        locality: 'Fort, Colaba',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        type: 'Home'
      },
      paymentMethod: 'Credit Card (•••• 8821)',
      subtotal: 10298,
      discount: 1200,
      shippingFee: 0,
      platformFee: 19,
      grandTotal: 9117,
      trackingSteps: [
        { title: 'Order Placed & Confirmed', time: '28 Sep 2026, 02:10 PM', completed: true },
        { title: 'Packed at Mumbai Atelier', time: '28 Sep 2026, 06:30 PM', completed: true },
        { title: 'Out for Delivery', time: '30 Sep 2026, 08:45 AM', completed: true },
        { title: 'Delivered to Recipient', time: '30 Sep 2026, 01:15 PM', completed: true }
      ]
    }
  ];

  // Demo user state persisted to localStorage
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure defaultAddresses exist
        if (!parsed.savedAddresses || parsed.savedAddresses.length === 0) {
          parsed.savedAddresses = defaultUserProfile.savedAddresses;
        }
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return defaultUserProfile;
  });

  // Orders history
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return defaultInitialOrders;
  });

  // UI & Filter states
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [minRating, setMinRating] = useState(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');

  // Quick view modal
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Floating notifications
  const [toasts, setToasts] = useState([]);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('aura_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('aura_orders', JSON.stringify(orders));
  }, [orders]);

  // Toast helper
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product, size = null, quantity = 1) => {
    const chosenSize = size || (product.sizes && product.sizes[0]) || 'Standard';
    const cartItemId = `${product.id}-${chosenSize}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        showToast(`Updated "${product.title}" quantity (${existing.quantity + quantity})`, 'info');
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        showToast(`Added "${product.title}" (${chosenSize}) to your bag`, 'success');
        return [...prev, { ...product, selectedSize: chosenSize, quantity, cartItemId }];
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => {
      const item = prev.find((i) => i.cartItemId === cartItemId);
      if (item) {
        showToast(`Removed "${item.title}" from your bag`, 'info');
      }
      return prev.filter((i) => i.cartItemId !== cartItemId);
    });
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    if (newQty > 10) {
      showToast('Maximum 10 units allowed per item', 'error');
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const moveToWishlist = (cartItemId) => {
    const item = cart.find((i) => i.cartItemId === cartItemId);
    if (!item) return;

    // Add to wishlist if not present
    setWishlist((prev) => {
      if (!prev.some((p) => p.id === item.id)) {
        return [...prev, item];
      }
      return prev;
    });

    // Remove from cart
    removeFromCart(cartItemId);
    showToast(`Moved "${item.title}" to your Wishlist`, 'success');
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed from Wishlist`, 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved to Wishlist!`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((p) => p.id === productId);
  };

  const moveToCart = (product, size = null) => {
    addToCart(product, size, 1);
    // Optionally remove from wishlist
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
  };

  // Quick view
  const openQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Coupon handling
  const applyCoupon = (code) => {
    const res = validateAndApplyCoupon(code, cartSubtotal);
    if (!res.valid) {
      showToast(res.error, 'error');
      return { success: false, message: res.error };
    }
    setAppliedCoupon({
      code: res.coupon.code,
      discount: res.discount,
      freeShipping: res.freeShipping,
      description: res.coupon.description
    });
    showToast(res.message, 'success');
    return { success: true, message: res.message };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartOriginalTotal = cart.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0);
  const cartSavings = cartOriginalTotal - cartSubtotal;
  
  // Free delivery threshold ₹1199
  const freeShippingThreshold = 1199;
  const isFreeDelivery = cartSubtotal >= freeShippingThreshold || appliedCoupon?.freeShipping;
  const shippingFee = cart.length === 0 ? 0 : isFreeDelivery ? 0 : 99;
  const platformFee = cart.length === 0 ? 0 : 19;
  const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
  
  const cartGrandTotal = Math.max(0, cartSubtotal - couponDiscount + shippingFee + platformFee);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Auth demo & profile updates
  const loginUser = (userData) => {
    // If logging in as demo user Aarav or general shopper
    const isDemo = !userData?.email || userData.email === 'aarav.sharma@example.com';
    setUser((prev) => ({
      ...defaultUserProfile,
      isLoggedIn: true,
      name: userData?.name || (isDemo ? 'Aarav Sharma' : 'Valued Shopper'),
      email: userData?.email || (isDemo ? 'aarav.sharma@example.com' : 'shopper@example.com'),
      phone: userData?.phone || (isDemo ? '+91 98765 43210' : '+91 98765 00000'),
      savedAddresses: prev?.savedAddresses?.length ? prev.savedAddresses : defaultUserProfile.savedAddresses
    }));
    showToast(`Welcome back, ${userData?.name || 'Aarav Sharma'}!`, 'success');
  };

  const logoutUser = () => {
    setUser({
      isLoggedIn: false,
      name: '',
      email: '',
      phone: '',
      gender: '',
      dateOfBirth: '',
      memberSince: '',
      tier: 'Standard Guest',
      auraPoints: 0,
      savedAddresses: []
    });
    showToast('You have been logged out safely', 'info');
  };

  const updateUserProfile = (updatedData) => {
    setUser((prev) => {
      const next = { ...prev, ...updatedData };
      return next;
    });
    showToast('Profile information updated successfully!', 'success');
  };

  // Saved Addresses CRUD
  const addAddress = (newAddress) => {
    const id = `addr-${Date.now()}`;
    const isFirst = !user?.savedAddresses || user.savedAddresses.length === 0;
    const makeDefault = isFirst || Boolean(newAddress.isDefault);

    const formatted = {
      ...newAddress,
      id,
      isDefault: makeDefault
    };

    setUser((prev) => {
      let existing = prev.savedAddresses || [];
      if (makeDefault) {
        existing = existing.map((a) => ({ ...a, isDefault: false }));
      }
      return {
        ...prev,
        savedAddresses: [formatted, ...existing]
      };
    });
    showToast('New delivery address added!', 'success');
    return formatted;
  };

  const updateAddress = (addressId, updatedData) => {
    setUser((prev) => {
      let existing = prev.savedAddresses || [];
      if (updatedData.isDefault) {
        existing = existing.map((a) => ({ ...a, isDefault: false }));
      }
      return {
        ...prev,
        savedAddresses: existing.map((a) => (a.id === addressId ? { ...a, ...updatedData } : a))
      };
    });
    showToast('Address updated successfully!', 'success');
  };

  const deleteAddress = (addressId) => {
    setUser((prev) => {
      const remaining = (prev.savedAddresses || []).filter((a) => a.id !== addressId);
      // If deleted address was default and other addresses exist, set first remaining as default
      if (remaining.length > 0 && !remaining.some((a) => a.isDefault)) {
        remaining[0].isDefault = true;
      }
      return {
        ...prev,
        savedAddresses: remaining
      };
    });
    showToast('Address removed', 'info');
  };

  const setDefaultAddress = (addressId) => {
    setUser((prev) => ({
      ...prev,
      savedAddresses: (prev.savedAddresses || []).map((a) => ({
        ...a,
        isDefault: a.id === addressId
      }))
    }));
    showToast('Default delivery address updated', 'success');
  };

  // Orders operations
  const placeOrder = (orderData) => {
    const orderId = `AURA-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      status: 'In Transit',
      deliveryEstimate: 'Expected in 2-3 business days',
      trackingNumber: `AURA-EXP-${Math.floor(100000 + Math.random() * 900000)}`,
      carrier: 'BlueDart Express',
      items: [...cart],
      shippingAddress: orderData.address,
      paymentMethod:
        orderData.paymentMethod === 'upi'
          ? 'UPI / Instant QR'
          : orderData.paymentMethod === 'card'
          ? 'Credit / Debit Card'
          : 'Cash on Delivery',
      subtotal: cartSubtotal,
      discount: couponDiscount + cartSavings,
      shippingFee,
      platformFee,
      grandTotal: cartGrandTotal,
      trackingSteps: [
        { title: 'Order Placed & Confirmed', time: 'Just now', completed: true },
        { title: 'Packed at Atelier Hub', time: 'Processing', completed: false, current: true },
        { title: 'Out for Delivery', time: 'Pending', completed: false },
        { title: 'Delivered', time: 'Estimated in 2-3 days', completed: false }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setAppliedCoupon(null);
    return newOrder;
  };

  const cancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.orderId === orderId
          ? {
              ...o,
              status: 'Cancelled',
              deliveryEstimate: 'Order Cancelled upon user request'
            }
          : o
      )
    );
    showToast(`Order #${orderId} was cancelled successfully`, 'info');
  };

  const reorderItems = (orderItems) => {
    if (!orderItems || orderItems.length === 0) return;
    orderItems.forEach((item) => {
      addToCart(item, item.selectedSize || 'M', item.quantity || 1);
    });
    showToast(`Added items from order back to your bag!`, 'success');
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        user,
        orders,
        toasts,
        appliedCoupon,
        activeCategory,
        searchQuery,
        sortBy,
        priceRange,
        minRating,
        selectedSubCategory,
        quickViewProduct,
        cartSubtotal,
        cartOriginalTotal,
        cartSavings,
        shippingFee,
        platformFee,
        cartGrandTotal,
        cartCount,
        wishlistCount,
        freeShippingThreshold,
        isFreeDelivery,
        setActiveCategory,
        setSearchQuery,
        setSortBy,
        setPriceRange,
        setMinRating,
        setSelectedSubCategory,
        addToCart,
        removeFromCart,
        updateQuantity,
        moveToWishlist,
        toggleWishlist,
        isInWishlist,
        moveToCart,
        openQuickView,
        closeQuickView,
        applyCoupon,
        removeCoupon,
        showToast,
        dismissToast,
        loginUser,
        logoutUser,
        updateUserProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        placeOrder,
        cancelOrder,
        reorderItems
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
