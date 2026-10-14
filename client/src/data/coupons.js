export const availableCoupons = [
  {
    code: 'AURA500',
    type: 'flat',
    discountAmount: 500,
    minSpend: 1999,
    description: 'Flat ₹500 OFF on orders above ₹1,999',
    tag: 'BEST VALUE'
  },
  {
    code: 'FESTIVE20',
    type: 'percentage',
    percentage: 20,
    maxDiscount: 800,
    minSpend: 1499,
    description: '20% OFF (up to ₹800) on festive collections over ₹1,499',
    tag: 'FESTIVE SPECIAL'
  },
  {
    code: 'FIRST15',
    type: 'percentage',
    percentage: 15,
    maxDiscount: 450,
    minSpend: 999,
    description: '15% OFF on first purchase above ₹999',
    tag: 'WELCOME GIFT'
  },
  {
    code: 'FREESHIP',
    type: 'shipping',
    description: 'Free Express Delivery across India (No minimum)',
    tag: 'ALL ORDERS'
  }
];

export const validateAndApplyCoupon = (code, subtotal) => {
  const normalized = (code || '').trim().toUpperCase();
  const coupon = availableCoupons.find(c => c.code === normalized);
  
  if (!coupon) {
    return { valid: false, error: 'Invalid coupon code. Try AURA500 or FESTIVE20' };
  }

  if (coupon.minSpend && subtotal < coupon.minSpend) {
    return { 
      valid: false, 
      error: `Add items worth ₹${coupon.minSpend - subtotal} more to apply ${coupon.code}` 
    };
  }

  let discount = 0;
  let freeShipping = false;

  if (coupon.type === 'flat') {
    discount = Math.min(coupon.discountAmount, subtotal);
  } else if (coupon.type === 'percentage') {
    const rawDiscount = Math.round((subtotal * coupon.percentage) / 100);
    discount = coupon.maxDiscount ? Math.min(rawDiscount, coupon.maxDiscount) : rawDiscount;
  } else if (coupon.type === 'shipping') {
    freeShipping = true;
  }

  return {
    valid: true,
    coupon,
    discount,
    freeShipping,
    message: `Coupon ${coupon.code} applied successfully!`
  };
};
