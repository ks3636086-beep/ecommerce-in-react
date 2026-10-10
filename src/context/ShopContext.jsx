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

  // Demo user state persisted to localStorage
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      isLoggedIn: true,
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      phone: '+91 98765 43210',
      savedAddresses: [
        {
          id: 'addr-1',
          name: 'Aarav Sharma',
          phone: '+91 98765 43210',
          pincode: '400001',
          locality: 'Fort, Colaba',
          address: 'Flat 402, Highline Residency, Nariman Point',
          city: 'Mumbai',
          state: 'Maharashtra',
          isDefault: true,
          type: 'Home'
        }
      ]
    };
  });

  // Orders history
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
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

  // Auth demo
  const loginUser = (userData) => {
    setUser({
      isLoggedIn: true,
      name: userData.name || 'Shopper',
      email: userData.email,
      phone: userData.phone || '+91 98765 00000',
      savedAddresses: user?.savedAddresses?.length ? user.savedAddresses : []
    });
    showToast(`Welcome back, ${userData.name || 'Shopper'}!`, 'success');
  };

  const logoutUser = () => {
    setUser({ isLoggedIn: false, name: '', email: '', phone: '', savedAddresses: [] });
    showToast('Logged out successfully', 'info');
  };

  const placeOrder = (orderData) => {
    const newOrder = {
      orderId: `AURA-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      items: [...cart],
      shippingAddress: orderData.address,
      paymentMethod: orderData.paymentMethod,
      subtotal: cartSubtotal,
      discount: couponDiscount + cartSavings,
      shippingFee,
      grandTotal: cartGrandTotal
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setAppliedCoupon(null);
    return newOrder;
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
        placeOrder
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
