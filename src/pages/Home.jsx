import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { heroSlides, trendingCategories, testimonials } from '../data/products';
import ProductCard from '../components/ProductCard';
import {
  Sparkles,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Percent,
  Check,
  TrendingUp,
  Star,
  ArrowRight,
  Flame,
  Award,
  Zap,
  Filter,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Home = () => {
  const navigate = useNavigate();
  const {
    products,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    selectedSubCategory,
    setSelectedSubCategory,
    applyCoupon
  } = useShop();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [copiedCode, setCopiedCode] = useState('');

  // Hero carousel auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    applyCoupon(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 3000);
  };

  // Extract distinct subcategories for filter pills
  const availableSubCategories = [
    'all',
    ...new Set(
      products
        .filter((p) => activeCategory === 'all' || p.category === activeCategory)
        .map((p) => p.subCategory)
    )
  ];

  // Filter & sort logic
  const filteredProducts = products.filter((p) => {
    // Category match
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    // Sub-category match
    if (selectedSubCategory !== 'all' && p.subCategory !== selectedSubCategory) return false;
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q);
      if (!match) return false;
    }
    // Price range
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    // Rating
    if (minRating > 0 && p.rating < minRating) return false;
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'discount') {
      const discA = parseInt(a.discount) || 0;
      const discB = parseInt(b.discount) || 0;
      return discB - discA;
    }
    // Default popular / bestsellers
    return b.ratingCount - a.ratingCount;
  });

  // Featured sections
  const trendingItems = products.filter((p) => p.tags?.includes('trending')).slice(0, 4);
  const bestSellerItems = products.filter((p) => p.tags?.includes('bestseller')).slice(0, 4);

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    setSelectedSubCategory('all');
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 pb-12">
      {/* 1. Hero Promotional Banner Carousel */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="relative h-[480px] sm:h-[540px] md:h-[620px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                className="w-full h-full object-cover object-center filter brightness-[0.85]"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].bgGradient}`}
              />

              {/* Slide Content */}
              <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="max-w-xl text-white"
                >
                  <div className="inline-flex items-center gap-2 bg-rose-600/90 backdrop-blur-md text-white text-xs font-black tracking-widest px-3 py-1 rounded-full uppercase mb-4 shadow-lg shadow-rose-600/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    {heroSlides[currentSlide].badge}
                  </div>

                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight leading-tight mb-4 text-white drop-shadow-md">
                    {heroSlides[currentSlide].title}
                  </h1>

                  <p className="text-sm sm:text-base text-slate-200 mb-6 font-normal leading-relaxed drop-shadow">
                    {heroSlides[currentSlide].subtitle}
                  </p>

                  <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 mb-6 text-xs sm:text-sm font-extrabold text-amber-300 tracking-wider">
                    ⚡ {heroSlides[currentSlide].discountText}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        navigate(`/products?category=${heroSlides[currentSlide].category}`)
                      }
                      className="px-6 py-3.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs sm:text-sm font-bold tracking-wider shadow-xl shadow-rose-600/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                    >
                      <span>{heroSlides[currentSlide].ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate('/products')}
                      className="px-6 py-3.5 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 rounded-xl text-xs sm:text-sm font-bold tracking-wider transition hover:scale-105 active:scale-95"
                    >
                      Explore All
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Arrows */}
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm border border-white/20 flex items-center justify-center transition z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm border border-white/20 flex items-center justify-center transition z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx ? 'w-8 bg-rose-500' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Interactive Category Carousel / Tiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-rose-600 text-xs font-black uppercase tracking-widest mb-1">
              <Flame className="w-4 h-4" />
              <span>Handpicked Collections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
              Trending Wardrobe Categories
            </h2>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {trendingCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                const subParam =
                  cat.subCategoryFilter && cat.subCategoryFilter !== 'all'
                    ? `&sub=${encodeURIComponent(cat.subCategoryFilter)}`
                    : '';
                navigate(`/products?category=${encodeURIComponent(cat.categoryFilter)}${subParam}`);
              }}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-900 relative aspect-[4/5] shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-white">
                <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block mb-1">
                  {cat.discount}
                </span>
                <h3 className="text-xs sm:text-sm font-bold leading-tight group-hover:text-rose-400 transition-colors">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Promotional Coupon Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              code: 'AURA500',
              title: 'Flat ₹500 OFF',
              desc: 'On orders above ₹1,999',
              bg: 'from-rose-600 to-rose-700',
              tag: 'MOST POPULAR'
            },
            {
              code: 'FESTIVE20',
              title: '20% OFF Festive Edit',
              desc: 'Up to ₹800 off on select styles',
              bg: 'from-slate-900 to-indigo-950',
              tag: 'FESTIVE DROP'
            },
            {
              code: 'FIRST15',
              title: '15% Welcome Discount',
              desc: 'Valid on your maiden fashion bag',
              bg: 'from-amber-600 to-orange-700',
              tag: 'NEW USERS'
            }
          ].map((c) => (
            <div
              key={c.code}
              className={`rounded-2xl bg-gradient-to-br ${c.bg} text-white p-5 shadow-lg relative overflow-hidden flex flex-col justify-between`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full">
                    {c.tag}
                  </span>
                  <h3 className="text-xl font-black mt-2">{c.title}</h3>
                  <p className="text-xs text-white/80">{c.desc}</p>
                </div>
                <Percent className="w-8 h-8 text-white/30" />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/20">
                <div className="font-mono text-sm font-bold tracking-wider">{c.code}</div>
                <button
                  onClick={() => handleCopyCoupon(c.code)}
                  className="bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-xl shadow transition flex items-center gap-1 active:scale-95"
                >
                  {copiedCode === c.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> APPLIED!
                    </>
                  ) : (
                    <>APPLY COUPON</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Trending & Best Sellers Highlight Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-rose-600 text-xs font-black uppercase tracking-widest mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>What shoppers are loving right now</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
              Trending Top Picks
            </h2>
          </div>
          <button
            onClick={() => handleCategorySelect('all')}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1"
          >
            <span>See Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {trendingItems.map((p) => (
            <ProductCard key={`trending-${p.id}`} product={p} />
          ))}
        </div>
      </section>

      {/* 5. Main Shopping Catalog with Interactive Filters & Sorting */}
      <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-600 text-xs font-black uppercase tracking-widest mb-1">
              <Zap className="w-4 h-4" />
              <span>Curated Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
              {activeCategory === 'all'
                ? 'All Fashion Styles'
                : `${activeCategory} Collection`}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Showing {sortedProducts.length} premium fashion items
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'Men', label: 'Men' },
              { id: 'Women', label: 'Women' },
              { id: 'Kids', label: 'Kids' },
              { id: 'Beauty', label: 'Beauty' },
              { id: 'Accessories', label: 'Accessories' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id);
                  setSelectedSubCategory('all');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar & Sorting Row */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-3">
          {/* Sub-category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 flex-1 min-w-[240px]">
            {availableSubCategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubCategory(sub)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                  selectedSubCategory === sub
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'
                }`}
              >
                {sub === 'all' ? 'All Types' : sub}
              </button>
            ))}
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Filter Drawer Toggle */}
            <button
              onClick={() => setShowFilterDrawer(true)}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-400 text-xs font-bold text-slate-800 flex items-center gap-2 transition shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-rose-600" />
              <span>Filters</span>
              {(minRating > 0 || priceRange[1] < 10000 || priceRange[0] > 0) && (
                <span className="w-2 h-2 rounded-full bg-rose-600" />
              )}
            </button>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-rose-500 shadow-sm pr-8 cursor-pointer"
              >
                <option value="popular">Sort: Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="discount">Highest Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchQuery ||
          minRating > 0 ||
          priceRange[0] > 0 ||
          priceRange[1] < 10000 ||
          selectedSubCategory !== 'all') && (
          <div className="flex flex-wrap items-center gap-2 pb-4">
            <span className="text-xs text-slate-400 font-semibold">Active:</span>

            {searchQuery && (
              <span className="inline-flex items-center gap-1 text-xs bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-full">
                Search: "{searchQuery}"
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
              </span>
            )}

            {selectedSubCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                Type: {selectedSubCategory}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setSelectedSubCategory('all')}
                />
              </span>
            )}

            {minRating > 0 && (
              <span className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full">
                Rating: {minRating}★+
                <X className="w-3 h-3 cursor-pointer" onClick={() => setMinRating(0)} />
              </span>
            )}

            {(priceRange[0] > 0 || priceRange[1] < 10000) && (
              <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                Price: ₹{priceRange[0]} - ₹{priceRange[1]}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setPriceRange([0, 10000])}
                />
              </span>
            )}

            <button
              onClick={() => {
                setSearchQuery('');
                setMinRating(0);
                setPriceRange([0, 10000]);
                setSelectedSubCategory('all');
              }}
              className="text-xs text-rose-600 hover:underline font-semibold ml-2"
            >
              Reset all
            </button>
          </div>
        )}

        {/* Product Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-4">
            {sortedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No matching styles found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
              Try adjusting your price range, clearing your search keywords, or selecting another
              category tab.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedSubCategory('all');
                setSearchQuery('');
                setMinRating(0);
                setPriceRange([0, 10000]);
              }}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold tracking-wider transition"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {/* 6. Promotional Editorial Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white p-8 sm:p-12 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80"
            alt="Editorial"
            className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale"
          />
          <div className="relative z-10 max-w-xl">
            <span className="text-xs font-black uppercase tracking-widest text-rose-400 bg-rose-950/60 border border-rose-800 px-3 py-1 rounded-full inline-block mb-3">
              THE AURA PROMISE
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black leading-tight mb-4">
              Elevate Your Everyday Aesthetic With Curated Precision
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Each garment in our collection undergoes rigorous artisanal quality checks, from thread
              density to dye fastness. Experience runway elegance designed for everyday wear.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-bold">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl backdrop-blur-sm">
                <Check className="w-4 h-4 text-emerald-400" /> Pure Fabrics
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl backdrop-blur-sm">
                <Check className="w-4 h-4 text-emerald-400" /> Zero Plastic Packaging
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl backdrop-blur-sm">
                <Check className="w-4 h-4 text-emerald-400" /> Easy 14-Day Exchanges
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Best Sellers Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-rose-600 text-xs font-black uppercase tracking-widest mb-1">
              <Award className="w-4 h-4" />
              <span>All-Time Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
              AURA Best Sellers
            </h2>
          </div>
          <button
            onClick={() => handleCategorySelect('all')}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {bestSellerItems.map((p) => (
            <ProductCard key={`bestseller-${p.id}`} product={p} />
          ))}
        </div>
      </section>

      {/* 8. Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-rose-600 block mb-1">
            VERIFIED REVIEWS
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
            Loved By Over 5 Million Trendsetters
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            Read real stories from fashion enthusiasts shopping on AURA across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-rose-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                  <p className="text-[10px] text-slate-500">
                    {t.role} • {t.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Slide-in Filter Drawer */}
      {showFilterDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm"
            onClick={() => setShowFilterDrawer(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-rose-600" />
                  <h3 className="font-bold text-slate-900 text-base">Filter Catalog</h3>
                </div>
                <button
                  onClick={() => setShowFilterDrawer(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                  Max Price: ₹{priceRange[1].toLocaleString()}
                </label>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-rose-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>₹500</span>
                  <span>₹10,000</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                  Minimum Rating
                </label>
                <div className="space-y-2">
                  {[
                    { label: 'Any Rating', val: 0 },
                    { label: '4.5 ★ & above (Top Rated)', val: 4.5 },
                    { label: '4.0 ★ & above', val: 4.0 }
                  ].map((r) => (
                    <label
                      key={r.val}
                      className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="rating-filter"
                        checked={minRating === r.val}
                        onChange={() => setMinRating(r.val)}
                        className="accent-rose-600"
                      />
                      <span>{r.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                  Select Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['all', 'Men', 'Women', 'Kids', 'Beauty', 'Accessories'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setSelectedSubCategory('all');
                      }}
                      className={`text-xs py-2 px-3 rounded-xl font-medium border text-left transition ${
                        activeCategory === cat
                          ? 'border-rose-600 bg-rose-50 text-rose-700 font-bold'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {cat === 'all' ? 'All' : cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => {
                  setPriceRange([0, 10000]);
                  setMinRating(0);
                  setActiveCategory('all');
                  setSelectedSubCategory('all');
                }}
                className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
              >
                Reset All
              </button>
              <button
                onClick={() => setShowFilterDrawer(false)}
                className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/30 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
