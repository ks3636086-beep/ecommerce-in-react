export const categories = [
  { id: 'all', name: 'All Categories', icon: 'Sparkles' },
  { id: 'Men', name: 'Men', icon: 'Shirt' },
  { id: 'Women', name: 'Women', icon: 'Heart' },
  { id: 'Kids', name: 'Kids', icon: 'Smile' },
  { id: 'Beauty', name: 'Beauty', icon: 'Sparkle' },
  { id: 'Accessories', name: 'Accessories', icon: 'Watch' }
];

export const heroSlides = [
  {
    id: 1,
    badge: 'LUXURY COUTURE 2026',
    title: 'Modern Minimalist Collection',
    subtitle: 'Step into understated elegance with structured silhouettes, breathable linens and tailored fits.',
    discountText: 'FLAT 50% - 70% OFF',
    category: 'Women',
    bgGradient: 'from-rose-950/80 via-slate-900/60 to-black/80',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Shop Women'
  },
  {
    id: 2,
    badge: 'NEW SEASON DROP',
    title: 'Urban Streetwear & Essentials',
    subtitle: 'Relaxed fits, heavyweight cottons, and timeless neutrals engineered for everyday luxury.',
    discountText: 'STARTING AT ₹899',
    category: 'Men',
    bgGradient: 'from-indigo-950/80 via-slate-900/60 to-black/80',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Explore Men'
  },
  {
    id: 3,
    badge: 'EXCLUSIVE FESTIVE ATELIER',
    title: 'Festive & Occasion Edit',
    subtitle: 'Handcrafted embroideries, rich raw silks, and royal colorways to elevate your celebrations.',
    discountText: 'EXTRA 20% WITH CODE: FESTIVE20',
    category: 'Women',
    bgGradient: 'from-amber-950/80 via-slate-900/60 to-black/80',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Discover Glam'
  }
];

export const products = [
  {
    id: 1,
    brand: 'AURA STUDIO',
    title: 'Tailored Single-Breasted Linen Blazer',
    category: 'Men',
    subCategory: 'Blazers',
    price: 3499,
    originalPrice: 6999,
    discount: '50% OFF',
    rating: 4.6,
    ratingCount: 1240,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['38', '40', '42', '44'],
    inStock: true,
    stockCount: 8,
    tags: ['trending', 'bestseller'],
    description: 'A contemporary structured blazer cut from premium Italian-inspired linen blend. Featuring notched lapels, two-button front, and breathable half-lining for year-round luxury.',
    details: {
      fabric: '70% Linen, 30% Cotton',
      fit: 'Slim Fit',
      care: 'Dry Clean Only',
      origin: 'Crafted in India'
    }
  },
  {
    id: 2,
    brand: 'MANGO ATELIER',
    title: 'Floral Silk Blend Flared Maxi Dress',
    category: 'Women',
    subCategory: 'Dresses',
    price: 2499,
    originalPrice: 4999,
    discount: '50% OFF',
    rating: 4.8,
    ratingCount: 2180,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 14,
    tags: ['trending', 'bestseller', 'new_arrival'],
    description: 'Ethereal fluid drape with delicate botanic botanical blooms. Features ruffled sweetheart neckline, smocked back for comfort, and a sweeping tiered hem.',
    details: {
      fabric: '100% Viscose Silk Blend',
      fit: 'Relaxed Fit',
      care: 'Gentle Machine Wash',
      origin: 'Imported'
    }
  },
  {
    id: 3,
    brand: 'ROADSTER VINTAGE',
    title: 'Drop-Shoulder Washed Denim Jacket',
    category: 'Men',
    subCategory: 'Jackets',
    price: 1899,
    originalPrice: 3799,
    discount: '50% OFF',
    rating: 4.4,
    ratingCount: 890,
    image: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 6,
    tags: ['bestseller'],
    description: 'Heavyweight vintage stone-washed authentic trucker denim jacket with antique brass buttons and twin chest flap pockets.',
    details: {
      fabric: '100% Rigid BCI Cotton',
      fit: 'Regular Boxy Fit',
      care: 'Machine Wash Cold',
      origin: 'Crafted in India'
    }
  },
  {
    id: 4,
    brand: 'ANOUK ETHNIC',
    title: 'Embroidered Chanderi Kurta & Palazzo Set',
    category: 'Women',
    subCategory: 'Ethnic Wear',
    price: 2199,
    originalPrice: 5499,
    discount: '60% OFF',
    rating: 4.7,
    ratingCount: 3410,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 19,
    tags: ['trending', 'bestseller'],
    description: 'Regal Chanderi silk kurta with intricate zari embroidery on yoke and hem, paired with flared palazzos and a lightweight organza dupatta.',
    details: {
      fabric: 'Chanderi Silk with Cotton Lining',
      fit: 'Straight Regular Fit',
      care: 'Dry Clean Recommended',
      origin: 'Handcrafted in Jaipur'
    }
  },
  {
    id: 5,
    brand: 'URBAN MONK',
    title: 'Heavyweight French Terry Oversized Hoodie',
    category: 'Men',
    subCategory: 'Sweatshirts',
    price: 1599,
    originalPrice: 3199,
    discount: '50% OFF',
    rating: 4.5,
    ratingCount: 1560,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 11,
    tags: ['new_arrival'],
    description: 'Custom 420 GSM pure cotton loopback knit fleece. Double-layered hood, ribbed cuffs and dropped shoulders for an authentic modern silhouette.',
    details: {
      fabric: '100% Combed Cotton',
      fit: 'Oversized Fit',
      care: 'Machine Wash Normal',
      origin: 'Crafted in India'
    }
  },
  {
    id: 6,
    brand: 'ZARA STUDIO',
    title: 'Satin Bias-Cut Midi Slip Skirt',
    category: 'Women',
    subCategory: 'Skirts',
    price: 1699,
    originalPrice: 3399,
    discount: '50% OFF',
    rating: 4.6,
    ratingCount: 940,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    stockCount: 5,
    tags: ['trending'],
    description: 'Cut on the bias for an effortless fluid drape that glides along the body contours. Elastic waistband and subtle liquid sheen finish.',
    details: {
      fabric: 'High-grade Polyester Satin',
      fit: 'Regular Bias Fit',
      care: 'Hand Wash or Delicates',
      origin: 'Imported'
    }
  },
  {
    id: 7,
    brand: 'LEVI’S 511',
    title: 'Slim Fit Mid-Rise Clean Stretch Jeans',
    category: 'Men',
    subCategory: 'Jeans',
    price: 2499,
    originalPrice: 4599,
    discount: '45% OFF',
    rating: 4.7,
    ratingCount: 4120,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['30', '32', '34', '36'],
    inStock: true,
    stockCount: 15,
    tags: ['bestseller'],
    description: 'Iconic five-pocket denim with modern slim leg from hip to ankle. Engineered with Levi’s Flex stretch technology for maximum comfort and shape retention.',
    details: {
      fabric: '98% Cotton, 2% Elastane',
      fit: 'Slim Fit',
      care: 'Wash and Dry Inside Out',
      origin: 'Crafted in India'
    }
  },
  {
    id: 8,
    brand: 'FOSSIL HERITAGE',
    title: 'Chronograph Minimalist Leather Watch',
    category: 'Accessories',
    subCategory: 'Watches',
    price: 5999,
    originalPrice: 11999,
    discount: '50% OFF',
    rating: 4.8,
    ratingCount: 1720,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['One Size'],
    inStock: true,
    stockCount: 4,
    tags: ['trending', 'bestseller'],
    description: 'Stainless steel case featuring midnight navy dial, stop-watch chronograph functionality, and vegetable-tanned genuine leather strap.',
    details: {
      fabric: 'Stainless Steel & Italian Leather',
      fit: '44mm Case Diameter',
      care: 'Water Resistant 50M',
      origin: 'Imported'
    }
  },
  {
    id: 9,
    brand: 'GLOW RECIPE',
    title: 'Watermelon Niacinamide Dew Drops Serum',
    category: 'Beauty',
    subCategory: 'Skincare',
    price: 1850,
    originalPrice: 2650,
    discount: '30% OFF',
    rating: 4.9,
    ratingCount: 2950,
    image: 'https://images.unsplash.com/photo-1608248597359-26d15a5198e3?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1608248597359-26d15a5198e3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['40ml'],
    inStock: true,
    stockCount: 20,
    tags: ['bestseller', 'new_arrival'],
    description: 'Breakthrough highlighting skincare serum that delivers an effortless translucent glow without mica, glitter, or gray cast. Infused with niacinamide and hyaluronic acid.',
    details: {
      fabric: 'Cruelty-Free, Paraben-Free Formulation',
      fit: '40ml Glass Dropper Bottle',
      care: 'Store in Cool Dry Place',
      origin: 'Korea'
    }
  },
  {
    id: 10,
    brand: 'LITTLE GEMS',
    title: 'Boys Smart Checked Linen Shirt & Chino Set',
    category: 'Kids',
    subCategory: 'Sets',
    price: 1299,
    originalPrice: 2599,
    discount: '50% OFF',
    rating: 4.5,
    ratingCount: 630,
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['2-3Y', '3-4Y', '4-5Y', '6-7Y', '8-9Y'],
    inStock: true,
    stockCount: 9,
    tags: ['new_arrival'],
    description: 'Adorably smart breathable pure cotton checked shirt with roll-up sleeve tabs, accompanied by stretch twill chinos with adjustable inner waistband.',
    details: {
      fabric: '100% Breathable Combed Cotton',
      fit: 'Comfort Regular Fit',
      care: 'Machine Wash Friendly',
      origin: 'Crafted in India'
    }
  },
  {
    id: 11,
    brand: 'STELLA LUXE',
    title: 'Quilted Crossbody Bag With Gold Chain Strap',
    category: 'Accessories',
    subCategory: 'Handbags',
    price: 2799,
    originalPrice: 5599,
    discount: '50% OFF',
    rating: 4.7,
    ratingCount: 1480,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['One Size'],
    inStock: true,
    stockCount: 7,
    tags: ['trending', 'bestseller'],
    description: 'Timeless diamond-quilted vegan leather bag with interlocking gold-tone twist lock and versatile convertible chain-leather strap.',
    details: {
      fabric: 'Premium Textured Vegan Leather',
      fit: '22cm x 15cm x 7cm',
      care: 'Wipe with Clean Dry Cloth',
      origin: 'Imported'
    }
  },
  {
    id: 12,
    brand: 'KIDS VOGUE',
    title: 'Girls Tulle Ruffle Party Princess Dress',
    category: 'Kids',
    subCategory: 'Dresses',
    price: 1499,
    originalPrice: 2999,
    discount: '50% OFF',
    rating: 4.8,
    ratingCount: 820,
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    inStock: true,
    stockCount: 12,
    tags: ['trending'],
    description: 'Pastel tiered tulle skirt with soft cotton inner lining, satin bow sash and floral embroidered bodice for magical party moments.',
    details: {
      fabric: 'Soft Multi-layer Tulle & Cotton Lining',
      fit: 'Fit and Flare',
      care: 'Hand Wash Gently',
      origin: 'Crafted in India'
    }
  },
  {
    id: 13,
    brand: 'CHANEL COEUR',
    title: 'Velvet Matte Liquid Lip Trio Collection',
    category: 'Beauty',
    subCategory: 'Makeup',
    price: 1999,
    originalPrice: 3499,
    discount: '43% OFF',
    rating: 4.9,
    ratingCount: 3820,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Pack of 3'],
    inStock: true,
    stockCount: 16,
    tags: ['bestseller'],
    description: 'Long-lasting 16H smudge-proof matte lipsticks with vitamin E infusion. Set contains iconic Ruby Bold, Dusty Nude, and Berry Bloom shades.',
    details: {
      fabric: 'Transfer-Proof Hydrating Formula',
      fit: '3 x 5ml Tubes',
      care: 'Store in Cool Place',
      origin: 'France'
    }
  },
  {
    id: 14,
    brand: 'RAY-BAN STYLE',
    title: 'Polarized Aviator Classic Gold Sunglasses',
    category: 'Accessories',
    subCategory: 'Eyewear',
    price: 3999,
    originalPrice: 7999,
    discount: '50% OFF',
    rating: 4.8,
    ratingCount: 2240,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Standard 58mm'],
    inStock: true,
    stockCount: 6,
    tags: ['trending', 'bestseller'],
    description: 'Legendary teardrop frame crafted from lightweight durable metal alloy with crystal green UV400 polarized protective lenses.',
    details: {
      fabric: 'Metal Alloy & Crystal Glass',
      fit: '58mm Lens Width',
      care: 'Clean with Microfiber Cloth',
      origin: 'Italy'
    }
  },
  {
    id: 15,
    brand: 'PUMA VELOCITY',
    title: 'Nitro Tech Ultralight Running Sneakers',
    category: 'Men',
    subCategory: 'Footwear',
    price: 3699,
    originalPrice: 7999,
    discount: '54% OFF',
    rating: 4.6,
    ratingCount: 1940,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    inStock: true,
    stockCount: 10,
    tags: ['trending'],
    description: 'Engineered mesh upper with responsive nitrogen-infused foam midsole offering optimal rebound and grip on all urban terrains.',
    details: {
      fabric: 'Breathable Engineered Knit & Rubber Sole',
      fit: 'True to Size',
      care: 'Wipe Clean with Damp Sponge',
      origin: 'Vietnam'
    }
  },
  {
    id: 16,
    brand: 'H&M EDIT',
    title: 'Ribbed Knit High-Neck Relaxed Sweater',
    category: 'Women',
    subCategory: 'Sweaters',
    price: 1799,
    originalPrice: 2999,
    discount: '40% OFF',
    rating: 4.5,
    ratingCount: 1120,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    stockCount: 8,
    tags: ['new_arrival'],
    description: 'Cozy boxy knit in soft wool-blend yarn featuring slouchy turtleneck, dropped shoulders, and wide ribbed cuffs and hem.',
    details: {
      fabric: '60% Recycled Acrylic, 30% Polyamide, 10% Wool',
      fit: 'Relaxed Fit',
      care: 'Hand Wash Cold',
      origin: 'Crafted in Portugal'
    }
  },
  {
    id: 17,
    brand: 'RITU WEAVES',
    title: 'Banarasi Brocade Anarkali Kurta & Dupatta',
    category: 'Women',
    subCategory: 'Ethnic Wear',
    price: 3899,
    originalPrice: 8499,
    discount: '54% OFF',
    rating: 4.8,
    ratingCount: 1680,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 7,
    tags: ['trending', 'bestseller'],
    description: 'Opulent crimson Banarasi silk kalidar kurta accented with gold zari bootis and scalloped borders, complete with a sheer organza dupatta.',
    details: {
      fabric: 'Pure Banarasi Woven Silk',
      fit: 'Flared Kalidar',
      care: 'Dry Clean Only',
      origin: 'Varanasi, India'
    }
  },
  {
    id: 18,
    brand: 'HIGHLANDER LUXE',
    title: 'Camp Collar Striped Pure Linen Summer Shirt',
    category: 'Men',
    subCategory: 'Shirts',
    price: 1399,
    originalPrice: 2799,
    discount: '50% OFF',
    rating: 4.5,
    ratingCount: 1420,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 15,
    tags: ['trending', 'new_arrival'],
    description: 'Breezy European flax linen shirt featuring retro Cuban resort collar, mother-of-pearl buttons, and relaxed drape.',
    details: {
      fabric: '100% French Linen',
      fit: 'Relaxed Resort Fit',
      care: 'Machine Wash Gentle',
      origin: 'India'
    }
  },
  {
    id: 19,
    brand: 'WOODLAND ATELIER',
    title: 'Suede Chelsea Boots With Crepe Rubber Sole',
    category: 'Men',
    subCategory: 'Footwear',
    price: 4299,
    originalPrice: 8999,
    discount: '52% OFF',
    rating: 4.7,
    ratingCount: 980,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    inStock: true,
    stockCount: 5,
    tags: ['bestseller'],
    description: 'Artisanal calf suede boots with elasticized side gussets, pull tabs, and shock-absorbing crepe textured sole.',
    details: {
      fabric: '100% Genuine Calf Suede',
      fit: 'Standard Fit',
      care: 'Use Suede Brush',
      origin: 'Portugal'
    }
  },
  {
    id: 20,
    brand: 'VERO MODA EDIT',
    title: 'Pleated Chiffon Tiered Cocktail Dress',
    category: 'Women',
    subCategory: 'Dresses',
    price: 2799,
    originalPrice: 5999,
    discount: '53% OFF',
    rating: 4.8,
    ratingCount: 1340,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    stockCount: 11,
    tags: ['trending', 'new_arrival'],
    description: 'Cascading pleated micro-chiffon silhouette with halter neck tie and open back for sunset cocktail soirees.',
    details: {
      fabric: '100% Georgette Chiffon',
      fit: 'Fit & Flare',
      care: 'Dry Clean Preferred',
      origin: 'Imported'
    }
  },
  {
    id: 21,
    brand: 'MICHAEL LUXE',
    title: 'Saffiano Leather Work Tote & Laptop Bag',
    category: 'Accessories',
    subCategory: 'Handbags',
    price: 3499,
    originalPrice: 6999,
    discount: '50% OFF',
    rating: 4.9,
    ratingCount: 1850,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['One Size'],
    inStock: true,
    stockCount: 8,
    tags: ['bestseller'],
    description: 'Spacious structured tote with scratch-resistant Saffiano finish, padded 14-inch laptop compartment, and gold metallic hardware.',
    details: {
      fabric: 'Saffiano Textured Vegan Leather',
      fit: '38cm x 28cm x 12cm',
      care: 'Wipe with Dry Cloth',
      origin: 'Imported'
    }
  },
  {
    id: 22,
    brand: 'L’OREAL PARIS',
    title: 'Hydra-Plump Hyaluronic Acid Night Moisturizer',
    category: 'Beauty',
    subCategory: 'Skincare',
    price: 999,
    originalPrice: 1699,
    discount: '41% OFF',
    rating: 4.7,
    ratingCount: 2410,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1608248597359-26d15a5198e3?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597359-26d15a5198e3?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['50g'],
    inStock: true,
    stockCount: 22,
    tags: ['trending'],
    description: 'Micro-epidermic hyaluronic acid gel formula that binds moisture deep into the skin matrix for plump, hydrated radiance by morning.',
    details: {
      fabric: 'Non-comedogenic, Dermatologically Tested',
      fit: '50g Glass Jar',
      care: 'Store below 25°C',
      origin: 'France'
    }
  }
];

export const trendingCategories = [
  {
    id: 'men-wear',
    name: "Men's Urban Wear",
    discount: 'UP TO 60% OFF',
    categoryFilter: 'Men',
    subCategoryFilter: 'all',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'women-ethnic',
    name: "Women's Ethnic Glam",
    discount: '40% - 70% OFF',
    categoryFilter: 'Women',
    subCategoryFilter: 'Ethnic Wear',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'western-dresses',
    name: 'Chic Dresses & Skirts',
    discount: 'STARTING ₹1,299',
    categoryFilter: 'Women',
    subCategoryFilter: 'Dresses',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'designer-footwear',
    name: 'Sneakers & Footwear',
    discount: 'FLAT 50% OFF',
    categoryFilter: 'Men',
    subCategoryFilter: 'Footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'beauty-glow',
    name: 'Luxury Beauty & Glow',
    discount: 'UP TO 40% OFF',
    categoryFilter: 'Beauty',
    subCategoryFilter: 'all',
    image: 'https://images.unsplash.com/photo-1608248597359-26d15a5198e3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bags-accessories',
    name: 'Bags & Watches',
    discount: 'MIN 45% OFF',
    categoryFilter: 'Accessories',
    subCategoryFilter: 'all',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80'
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Aanya Sharma',
    city: 'Mumbai',
    role: 'Fashion Content Creator',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'AURA feels like shopping directly from a Milan boutique! The packaging was exquisite, delivery took less than 48 hours, and the fabric quality on the Chanderi set is remarkable.'
  },
  {
    id: 2,
    name: 'Rohan Mehra',
    city: 'Bangalore',
    role: 'Tech Lead & Sneakerhead',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'The UI is shockingly fluid—just like Myntra but with a modern luxury touch. The size recommendations are spot on and the Nitro sneakers are 100% authentic.'
  },
  {
    id: 3,
    name: 'Pooja Iyer',
    city: 'Delhi NCR',
    role: 'Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'I love how clean the checkout is. Seamless coupon application, instant wishlist syncing, and great customer support. AURA is now my default shopping app.'
  }
];
