import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import {
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  Filter,
  X,
  Search,
  Grid3X3,
  LayoutGrid
} from 'lucide-react';

export const Products = () => {
  const { products, activeCategory, setActiveCategory } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  // URL parameters or Context
  const urlCategory = params.category || searchParams.get('category');
  const urlSubCategory = searchParams.get('sub');
  const urlSearch = searchParams.get('search');

  const [selectedCategory, setSelectedCategory] = useState(urlCategory || activeCategory || 'all');
  const [selectedSub, setSelectedSub] = useState(urlSubCategory || 'all');
  const [sortBy, setSortBy] = useState('popular');
  const [priceMax, setPriceMax] = useState(10000);
  const [minRating, setMinRating] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filterQuery, setFilterQuery] = useState(urlSearch || '');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [gridCols, setGridCols] = useState(4); // 3 or 4 columns on large desktop

  // Synchronize category and search from URL
  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
      setActiveCategory(urlCategory);
    } else {
      setSelectedCategory('all');
    }
    if (urlSubCategory) {
      setSelectedSub(urlSubCategory);
    } else {
      setSelectedSub('all');
    }
    if (urlSearch !== null && urlSearch !== undefined) {
      setFilterQuery(urlSearch);
    }
  }, [urlCategory, urlSubCategory, urlSearch, setActiveCategory]);

  // Distinct Brands
  const availableBrands = [...new Set(products.map((p) => p.brand))];

  // Distinct Subcategories for current category
  const availableSubCategories = [
    'all',
    ...new Set(
      products
        .filter((p) => selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase())
        .map((p) => p.subCategory)
    )
  ];

  const handleCategorySwitch = (cat) => {
    setSelectedCategory(cat);
    setSelectedSub('all');
    setActiveCategory(cat);
    setSearchParams(cat === 'all' ? {} : { category: cat });
  };

  const handleSubSwitch = (sub) => {
    setSelectedSub(sub);
    const newParams = {};
    if (selectedCategory !== 'all') newParams.category = selectedCategory;
    if (sub !== 'all') newParams.sub = sub;
    setSearchParams(newParams);
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedSub('all');
    setActiveCategory('all');
    setPriceMax(10000);
    setMinRating(0);
    setSelectedBrands([]);
    setFilterQuery('');
    setSearchParams({});
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    // Category match
    if (
      selectedCategory !== 'all' &&
      p.category.toLowerCase() !== selectedCategory.toLowerCase()
    ) {
      return false;
    }
    // Sub-category match
    if (selectedSub !== 'all' && p.subCategory.toLowerCase() !== selectedSub.toLowerCase()) {
      return false;
    }
    // Brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
      return false;
    }
    // Price
    if (p.price > priceMax) return false;
    // Rating
    if (minRating > 0 && p.rating < minRating) return false;
    // Search keyword
    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase();
      const match =
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'discount') {
      const dA = parseInt(a.discount) || 0;
      const dB = parseInt(b.discount) || 0;
      return dB - dA;
    }
    return b.ratingCount - a.ratingCount;
  });

  // Category Banner Themes
  const getBannerDetails = () => {
    const cat = selectedCategory.toLowerCase();
    if (cat === 'men') {
      return {
        title: "Men's Luxury & Urban Streetwear",
        subtitle: "Tailored Italian-cut blazers, heavyweight loopback cottons, and iconic denim.",
        badge: "MEN'S ATELIER • UP TO 60% OFF",
        bgImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80"
      };
    }
    if (cat === 'women') {
      return {
        title: "Women's Runway Haute Couture",
        subtitle: "Handcrafted Chanderi silks, fluid tiered maxis, and contemporary evening slips.",
        badge: "WOMEN'S EDIT • STARTING ₹1,299",
        bgImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80"
      };
    }
    if (cat === 'kids') {
      return {
        title: "Kids Fashion & Little Gems",
        subtitle: "Breathable combed cottons, party tulle dresses, and smart casual sets.",
        badge: "KIDS SPECIAL • FLAT 50% OFF",
        bgImage: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1600&q=80"
      };
    }
    if (cat === 'beauty') {
      return {
        title: "Luxury Beauty, Scents & Glow",
        subtitle: "Niacinamide dewy serums, longwear velvet lip collections, and night balms.",
        badge: "BEAUTY BOUTIQUE • UP TO 40% OFF",
        bgImage: "https://images.unsplash.com/photo-1608248597359-26d15a5198e3?auto=format&fit=crop&w=1600&q=80"
      };
    }
    if (cat === 'accessories') {
      return {
        title: "Designer Accessories & Timepieces",
        subtitle: "Chronograph watches, diamond quilted crossbodies, and polarized aviators.",
        badge: "ACCESSORIES • MIN 45% OFF",
        bgImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1600&q=80"
      };
    }
    return {
      title: "All Fashion Wardrobe Collections",
      subtitle: "Discover high-fashion runway apparel, footwear, beauty, and curated accessories.",
      badge: "SEASON EDIT 2026 • FLAT 50% - 70% OFF",
      bgImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80"
    };
  };

  const banner = getBannerDetails();

  return (
    <div className="pb-16 space-y-8">
      {/* 1. Category Hero Banner */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="relative h-60 sm:h-72 lg:h-80 w-full overflow-hidden">
          <img
            src={banner.bgImage}
            alt={banner.title}
            className="w-full h-full object-cover object-center filter brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />

          {/* Banner Text */}
          <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-slate-300 font-medium mb-3">
              <Link to="/" className="hover:text-rose-400 transition">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-400">Categories</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-white font-bold capitalize">
                {selectedCategory === 'all' ? 'All Styles' : selectedCategory}
              </span>
              {selectedSub !== 'all' && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-rose-400 font-bold capitalize">{selectedSub}</span>
                </>
              )}
            </nav>

            <span className="inline-flex items-center gap-1.5 w-fit bg-rose-600/90 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-sm">
              <Sparkles className="w-3 h-3" />
              {banner.badge}
            </span>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white drop-shadow-sm">
              {banner.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-xl line-clamp-2">
              {banner.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Catalog Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Category Navigation Pills */}
        <div className="flex items-center justify-between gap-3 overflow-x-auto no-scrollbar pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            {['all', 'Men', 'Women', 'Kids', 'Beauty', 'Accessories'].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySwitch(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition whitespace-nowrap ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat === 'all' ? 'All Fashion' : cat}
              </button>
            ))}
          </div>

          {/* Search inside category */}
          <div className="relative min-w-[200px] hidden md:block">
            <input
              type="text"
              placeholder={`Search in ${selectedCategory}...`}
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full text-xs bg-slate-100 pl-8 pr-3 py-2 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-rose-500/20"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Subcategories Pill Row */}
        {availableSubCategories.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Types:</span>
            {availableSubCategories.map((sub) => (
              <button
                key={sub}
                onClick={() => handleSubSwitch(sub)}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
                  selectedSub.toLowerCase() === sub.toLowerCase()
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'
                }`}
              >
                {sub === 'all' ? 'All Types' : sub}
              </button>
            ))}
          </div>
        )}

        {/* Sort & Filter Controls Bar */}
        <div className="flex items-center justify-between bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200/80 gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-800">
              {sortedProducts.length} {sortedProducts.length === 1 ? 'Product' : 'Products'} Found
            </span>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilter(true)}
              className="lg:hidden flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 shadow-sm"
            >
              <Filter className="w-3.5 h-3.5 text-rose-600" />
              <span>Filter ({selectedBrands.length + (minRating > 0 ? 1 : 0) + (priceMax < 10000 ? 1 : 0)})</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop Column Layout Switcher */}
            <div className="hidden xl:flex items-center gap-1 bg-white border border-slate-200 p-0.5 rounded-xl">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded-lg transition ${
                  gridCols === 3 ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-800'
                }`}
                title="3 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded-lg transition ${
                  gridCols === 4 ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-800'
                }`}
                title="4 Columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-rose-500 cursor-pointer shadow-sm"
              >
                <option value="popular">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="discount">Highest Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Grid + Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm sticky top-24 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-rose-600" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  Refine By
                </h3>
              </div>
              <button
                onClick={resetAllFilters}
                className="text-xs text-rose-600 hover:underline font-semibold"
              >
                Clear All
              </button>
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Price Limit
                </label>
                <span className="text-xs font-black text-rose-600 font-mono">
                  Up to ₹{priceMax.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={priceMax}
                onChange={(e) => setPriceMax(parseInt(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₹500</span>
                <span>₹10,000+</span>
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="pt-4 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2.5">
                Rating
              </label>
              <div className="space-y-1.5">
                {[
                  { label: 'All Ratings', val: 0 },
                  { label: '4.5 ★ & above', val: 4.5 },
                  { label: '4.0 ★ & above', val: 4.0 }
                ].map((r) => (
                  <label
                    key={r.val}
                    className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900"
                  >
                    <input
                      type="radio"
                      name="desktop-rating"
                      checked={minRating === r.val}
                      onChange={() => setMinRating(r.val)}
                      className="accent-rose-600"
                    />
                    <span>{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="pt-4 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2.5">
                Featured Brands ({availableBrands.length})
              </label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar">
                {availableBrands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="accent-rose-600 rounded"
                    />
                    <span className="truncate">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-9">
            {sortedProducts.length > 0 ? (
              <div
                className={`grid grid-cols-2 ${
                  gridCols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-3 xl:grid-cols-4'
                } gap-4 sm:gap-6`}
              >
                {sortedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  No styles found in this category
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                  Try clearing the price or brand filter, or choose another fashion category.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold tracking-wider transition"
                >
                  View All Fashion Styles
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* 4. Mobile Filter Drawer */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setShowMobileFilter(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-rose-600" />
                  <h3 className="font-bold text-sm text-slate-900">Filter Styles</h3>
                </div>
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                  Max Price: ₹{priceMax.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="500"
                  value={priceMax}
                  onChange={(e) => setPriceMax(parseInt(e.target.value))}
                  className="w-full accent-rose-600"
                />
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                  Rating
                </label>
                <div className="space-y-2">
                  {[
                    { label: 'All Ratings', val: 0 },
                    { label: '4.5 ★ & above', val: 4.5 },
                    { label: '4.0 ★ & above', val: 4.0 }
                  ].map((r) => (
                    <label
                      key={r.val}
                      className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="mobile-rating"
                        checked={minRating === r.val}
                        onChange={() => setMinRating(r.val)}
                        className="accent-rose-600"
                      />
                      <span>{r.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Selection */}
              <div>
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                  Brands
                </label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto no-scrollbar">
                  {availableBrands.map((b) => (
                    <label key={b} className="flex items-center gap-2 text-xs text-slate-700">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(b)}
                        onChange={() => toggleBrand(b)}
                        className="accent-rose-600"
                      />
                      <span>{b}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={resetAllFilters}
                className="w-1/2 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
              >
                Reset
              </button>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="w-1/2 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/30"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
