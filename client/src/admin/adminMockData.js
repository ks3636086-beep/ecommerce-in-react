// Admin Panel Mock Data Store with LocalStorage persistence

export const INITIAL_CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Men',
    slug: 'men',
    description: 'Tailored blazers, luxury casuals, shirts, and everyday essentials for men.',
    productCount: 18,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
    createdAt: '2026-01-10'
  },
  {
    id: 'cat-2',
    name: 'Women',
    slug: 'women',
    description: 'Designer couture, flowing silks, elegant dresses, and contemporary wear.',
    productCount: 26,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80',
    createdAt: '2026-01-10'
  },
  {
    id: 'cat-3',
    name: 'Kids',
    slug: 'kids',
    description: 'Soft organic cotton apparel, playwear, and festive edits for children.',
    productCount: 12,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=400&q=80',
    createdAt: '2026-01-15'
  },
  {
    id: 'cat-4',
    name: 'Beauty & Fragrance',
    slug: 'beauty',
    description: 'Premium skincare serums, artisanal perfumes, and luxury bath care.',
    productCount: 14,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
    createdAt: '2026-02-01'
  },
  {
    id: 'cat-5',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Handcrafted leather wallets, luxury chronographs, belts, and eyewear.',
    productCount: 20,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
    createdAt: '2026-02-10'
  },
  {
    id: 'cat-6',
    name: 'Footwear',
    slug: 'footwear',
    description: 'Italian leather loafers, handcrafted oxfords, and urban performance sneakers.',
    productCount: 9,
    status: 'Inactive',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80',
    createdAt: '2026-03-05'
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Tailored Single-Breasted Linen Blazer',
    brand: 'AURA STUDIO',
    category: 'Men',
    price: 3499,
    originalPrice: 6999,
    stock: 24,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    sku: 'AUR-MN-BLZ-01'
  },
  {
    id: 'prod-2',
    name: 'Oversized Silk Crepe Evening Gown',
    brand: 'MAISON ÉLÉGANCE',
    category: 'Women',
    price: 4999,
    originalPrice: 8999,
    stock: 15,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
    sku: 'AUR-WN-DRS-02'
  },
  {
    id: 'prod-3',
    name: 'Pure Supima Cotton Minimalist Shirt',
    brand: 'THREAD & WEAVE',
    category: 'Men',
    price: 1899,
    originalPrice: 2999,
    stock: 45,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80',
    sku: 'AUR-MN-SHT-03'
  },
  {
    id: 'prod-4',
    name: 'Sculpted Minimalist Trench Coat',
    brand: 'ATELIER NOIR',
    category: 'Women',
    price: 6499,
    originalPrice: 11999,
    stock: 8,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    sku: 'AUR-WN-TRN-04'
  },
  {
    id: 'prod-5',
    name: 'Botanical Velvet Rose Eau De Parfum 100ml',
    brand: 'AURA BOTANICA',
    category: 'Beauty & Fragrance',
    price: 2799,
    originalPrice: 3999,
    stock: 32,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    sku: 'AUR-BTY-PRF-05'
  },
  {
    id: 'prod-6',
    name: 'Heritage Full-Grain Leather Weekender Bag',
    brand: 'SADDLE & CRAFT',
    category: 'Accessories',
    price: 5299,
    originalPrice: 8499,
    stock: 5,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
    sku: 'AUR-ACC-BAG-06'
  },
  {
    id: 'prod-7',
    name: 'Classic Chronograph Watch with Sapphire Glass',
    brand: 'CHRONO LUXE',
    category: 'Accessories',
    price: 7999,
    originalPrice: 12999,
    stock: 0,
    status: 'Draft',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    sku: 'AUR-ACC-WTC-07'
  },
  {
    id: 'prod-8',
    name: 'Organic Cotton Pastel Dungaree & Tee Set',
    brand: 'PETIT PETAL',
    category: 'Kids',
    price: 1499,
    originalPrice: 2299,
    stock: 18,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80',
    sku: 'AUR-KD-SET-08'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-9841',
    customer: {
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      phone: '+91 98765 43210'
    },
    date: '2026-10-26 14:30',
    total: 8498,
    status: 'Processing',
    paymentMethod: 'UPI (GPay)',
    itemsCount: 2,
    shippingCity: 'Mumbai, Maharashtra',
    items: [
      { name: 'Tailored Single-Breasted Linen Blazer', quantity: 1, price: 3499 },
      { name: 'Oversized Silk Crepe Evening Gown', quantity: 1, price: 4999 }
    ]
  },
  {
    id: 'ORD-9840',
    customer: {
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '+91 98220 11984'
    },
    date: '2026-10-26 11:15',
    total: 2799,
    status: 'Delivered',
    paymentMethod: 'Credit Card',
    itemsCount: 1,
    shippingCity: 'Bengaluru, Karnataka',
    items: [
      { name: 'Botanical Velvet Rose Eau De Parfum 100ml', quantity: 1, price: 2799 }
    ]
  },
  {
    id: 'ORD-9839',
    customer: {
      name: 'Rohan Mehta',
      email: 'rohan.mehta@example.com',
      phone: '+91 97654 32190'
    },
    date: '2026-10-25 18:45',
    total: 13298,
    status: 'Shipped',
    paymentMethod: 'Net Banking',
    itemsCount: 2,
    shippingCity: 'New Delhi, Delhi',
    items: [
      { name: 'Heritage Full-Grain Leather Weekender Bag', quantity: 1, price: 5299 },
      { name: 'Classic Chronograph Watch with Sapphire Glass', quantity: 1, price: 7999 }
    ]
  },
  {
    id: 'ORD-9838',
    customer: {
      name: 'Ananya Iyer',
      email: 'ananya.iyer@example.com',
      phone: '+91 99100 88231'
    },
    date: '2026-10-25 09:20',
    total: 1899,
    status: 'Delivered',
    paymentMethod: 'UPI (PhonePe)',
    itemsCount: 1,
    shippingCity: 'Chennai, Tamil Nadu',
    items: [
      { name: 'Pure Supima Cotton Minimalist Shirt', quantity: 1, price: 1899 }
    ]
  },
  {
    id: 'ORD-9837',
    customer: {
      name: 'Vikramaditya Roy',
      email: 'vikram.roy@example.com',
      phone: '+91 98300 77123'
    },
    date: '2026-10-24 16:50',
    total: 6499,
    status: 'Cancelled',
    paymentMethod: 'Cash on Delivery',
    itemsCount: 1,
    shippingCity: 'Kolkata, West Bengal',
    items: [
      { name: 'Sculpted Minimalist Trench Coat', quantity: 1, price: 6499 }
    ]
  },
  {
    id: 'ORD-9836',
    customer: {
      name: 'Sneha Kulkarni',
      email: 'sneha.k@example.com',
      phone: '+91 98450 66321'
    },
    date: '2026-10-23 13:10',
    total: 4498,
    status: 'Delivered',
    paymentMethod: 'Credit Card',
    itemsCount: 2,
    shippingCity: 'Pune, Maharashtra',
    items: [
      { name: 'Organic Cotton Pastel Dungaree & Tee Set', quantity: 1, price: 1499 },
      { name: 'Pure Supima Cotton Minimalist Shirt', quantity: 1, price: 1899 }
    ]
  }
];

// LocalStorage Storage Helpers
export const getStoredCategories = () => {
  try {
    const data = localStorage.getItem('aura_admin_categories');
    return data ? JSON.parse(data) : INITIAL_CATEGORIES;
  } catch {
    return INITIAL_CATEGORIES;
  }
};

export const saveStoredCategories = (categories) => {
  try {
    localStorage.setItem('aura_admin_categories', JSON.stringify(categories));
  } catch (e) {
    console.error('Error saving categories:', e);
  }
};

export const getStoredProducts = () => {
  try {
    const data = localStorage.getItem('aura_admin_products');
    return data ? JSON.parse(data) : INITIAL_PRODUCTS;
  } catch {
    return INITIAL_PRODUCTS;
  }
};

export const saveStoredProducts = (products) => {
  try {
    localStorage.setItem('aura_admin_products', JSON.stringify(products));
  } catch (e) {
    console.error('Error saving products:', e);
  }
};

export const getStoredOrders = () => {
  try {
    const data = localStorage.getItem('aura_admin_orders');
    return data ? JSON.parse(data) : INITIAL_ORDERS;
  } catch {
    return INITIAL_ORDERS;
  }
};

export const saveStoredOrders = (orders) => {
  try {
    localStorage.setItem('aura_admin_orders', JSON.stringify(orders));
  } catch (e) {
    console.error('Error saving orders:', e);
  }
};
