import React, { useState } from 'react';
import { useCommerce } from '../context/CommerceContext';
import {
  HERO_BANNER_DATA,
  KYOTO_LOOKBOOK_DATA,
  FLASH_DROPS,
  TRENDING_PRODUCTS,
  AI_CURATED_TRENDING
} from '../data/products';
import { Product } from '../types';

export const DiscoverView: React.FC = () => {
  const {
    openProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    showToast,
    setScreen
  } = useCommerce();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeVibe, setActiveVibe] = useState<string>('Minimalist Luxe');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColorSwatches, setSelectedColorSwatches] = useState<{ [productId: string]: string }>({});

  const categories = ['All', 'New In', 'Outerwear', 'Tailored Pants', 'Footwear', 'Accessories', 'Knitwear'];
  const aesthetics = ['Minimalist Luxe', 'Tokyo Streetwear', 'Nordic Cashmere', 'Sustainable Silk', 'Architectural Tailoring'];

  const handleHotspotClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveHotspot(prev => (prev === id ? null : id));
  };

  const handleAddFullCapsule = () => {
    addToCart({
      productId: 'kyoto-capsule',
      name: 'Kyoto Evening Capsule (3 Pieces)',
      brand: 'ATELIER ÉLAN',
      price: 1040,
      selectedSize: 'M',
      selectedColor: 'Sandstone / Charcoal',
      quantity: 1,
      badge: 'Curated 3-Piece Set • Saved $95',
      image: KYOTO_LOOKBOOK_DATA.image
    });
    showToast('Kyoto Capsule (3 Pieces) added to Bag!', 'auto_awesome');
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const color = selectedColorSwatches[product.id] || (product.shades ? product.shades[0].name : 'Default');
    addToCart({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      selectedSize: product.sizes[0] || 'M',
      selectedColor: color,
      quantity: 1,
      image: product.image
    });
  };

  const allTrendingItems = [...TRENDING_PRODUCTS, ...AI_CURATED_TRENDING];
  const filteredProducts = allTrendingItems.filter(p => {
    const matchesCategory = activeCategory === 'All' || 
      (activeCategory === 'New In' && (p.tag === 'NEW' || p.tag === 'Bestseller')) ||
      (activeCategory === 'Outerwear' && p.category === 'outerwear') ||
      (activeCategory === 'Tailored Pants' && p.category === 'pants') ||
      (activeCategory === 'Footwear' && p.category === 'footwear') ||
      (activeCategory === 'Accessories' && p.category === 'accessories') ||
      (activeCategory === 'Knitwear' && p.category === 'knitwear');

    const matchesSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full pb-28 pt-20 px-4 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto" onClick={() => setActiveHotspot(null)}>
      {/* Search & Prompt Bar */}
      <div className="pt-1 pb-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 flex items-center bg-[#f4f3f1] rounded-full px-4 h-12 shadow-xs border border-[#efeeeb] focus-within:border-[#18181b] transition-all">
            <span className="material-symbols-outlined text-[#77767b] text-[20px] mr-2">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask AI Stylist or search pieces..."
              className="w-full bg-transparent font-body text-[14px] text-[#1a1c1a] placeholder:text-[#77767b]/70 focus:outline-none"
            />
            <button
              onClick={() => setScreen('match')}
              aria-label="Multimodal camera search"
              className="flex items-center justify-center text-[#47464b] hover:text-black transition-colors pl-2"
              title="Open AI Visual Match"
            >
              <span className="material-symbols-outlined text-[20px]">photo_camera</span>
            </button>
          </div>

          <button
            onClick={() => setScreen('match')}
            aria-label="Filter"
            className="w-12 h-12 rounded-full bg-[#f4f3f1] text-[#1a1c1a] flex items-center justify-center shadow-xs border border-[#efeeeb] hover:bg-[#efeeeb] transition-all active:scale-95 shrink-0"
            title="AI Visual & Stylist Match"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>
      </div>

      {/* Curated Aesthetics Pills */}
      <section className="mb-4 overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-[11px] uppercase tracking-wider text-[#47464b] font-semibold">
            Curated Aesthetics
          </span>
          <button 
            onClick={() => setScreen('match')}
            className="font-body text-[12px] text-[#a13e28] flex items-center gap-0.5 hover:underline"
          >
            Refine taste <span className="material-symbols-outlined text-[14px]">tune</span>
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {aesthetics.map((vibe) => {
            const isSelected = activeVibe === vibe;
            return (
              <button
                key={vibe}
                onClick={() => setActiveVibe(vibe)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full font-body text-[12px] transition-all active:scale-95 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-black text-white shadow-xs font-medium'
                    : 'bg-[#f4f3f1] text-[#1a1c1a] hover:bg-[#efeeeb]'
                }`}
              >
                {isSelected && <span className="material-symbols-outlined text-[14px]">check</span>}
                {vibe}
              </button>
            );
          })}
        </div>
      </section>

      {/* Category Navigation Pills */}
      <div className="w-full overflow-x-auto no-scrollbar pb-3">
        <div className="flex items-center gap-2 whitespace-nowrap">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-body text-[12px] tracking-wide transition-all ${
                  isSelected
                    ? 'bg-[#18181b] text-white shadow-xs font-semibold'
                    : 'bg-[#f4f3f1] text-[#47464b] hover:text-black hover:bg-[#efeeeb]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Banner Card */}
      <div className="pt-1 pb-6">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-md bg-[#e9e8e5] border border-[#efeeeb]">
          <div
            className="w-full h-80 bg-cover bg-center flex flex-col justify-between p-5 relative"
            style={{ backgroundImage: `url('${HERO_BANNER_DATA.image}')` }}
          >
            {/* Top Promo Badge */}
            <div className="flex justify-between items-start z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#faf9f6]/95 backdrop-blur-md text-[#a13e28] font-body text-[11px] font-semibold tracking-wide shadow-xs">
                {HERO_BANNER_DATA.discount}
              </span>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#faf9f6]/85 backdrop-blur-md text-black shadow-xs">
                <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
              </span>
            </div>

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>

            {/* Banner Copy & CTA */}
            <div className="relative z-10 flex flex-col items-start gap-1">
              <span className="font-body text-[11px] uppercase tracking-widest text-[#ffdad2] font-semibold">
                {HERO_BANNER_DATA.season}
              </span>
              <h2 className="font-headline font-semibold text-[22px] md:text-[26px] text-white leading-tight">
                {HERO_BANNER_DATA.headline}
              </h2>
              <button
                onClick={() => openProduct('wool-trench', 'atelier')}
                className="mt-2 px-5 py-2.5 bg-white text-black rounded-full font-body text-[13px] font-semibold shadow-sm hover:bg-[#f4f3f1] active:scale-95 transition-all flex items-center gap-1.5"
              >
                Shop Collection
                <span className="material-symbols-outlined text-[16px]">east</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Daily AI Curation: Interactive Hotspot Lookbook */}
      <section className="mb-6 bg-white rounded-2xl p-4 md:p-5 shadow-xs border border-[#efeeeb]">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad2] text-[#822714] font-body text-[11px] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">bolt</span>
                {KYOTO_LOOKBOOK_DATA.matchScore}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#e9e8e5] text-[#47464b] font-body text-[11px] flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">cloud</span>
                {KYOTO_LOOKBOOK_DATA.weather}
              </span>
            </div>
            <h3 className="font-headline font-semibold text-[20px] text-[#1a1c1a] tracking-tight">
              {KYOTO_LOOKBOOK_DATA.title}
            </h3>
            <p className="font-body text-[13px] text-[#47464b] mt-0.5">
              {KYOTO_LOOKBOOK_DATA.subtitle}
            </p>
          </div>

          <button
            onClick={() => toggleWishlist('kyoto-capsule', 'Kyoto Evening Capsule')}
            aria-label="Save moodboard"
            className="w-9 h-9 rounded-full bg-[#f4f3f1] text-[#1a1c1a] flex items-center justify-center hover:bg-[#efeeeb] active:scale-95 shrink-0"
          >
            <span className={`material-symbols-outlined text-[18px] ${isWishlisted('kyoto-capsule') ? 'fill-1 text-[#a13e28]' : ''}`}>
              {isWishlisted('kyoto-capsule') ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>
        </div>

        {/* Interactive Hotspot Canvas */}
        <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#f4f3f1] shadow-inner">
          <img
            src={KYOTO_LOOKBOOK_DATA.image}
            alt="Kyoto Evening Edit lookbook"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

          {/* Hotspots */}
          {KYOTO_LOOKBOOK_DATA.hotspots.map((hotspot) => {
            const isOpen = activeHotspot === hotspot.id;

            return (
              <div
                key={hotspot.id}
                className="absolute z-20"
                style={{ top: hotspot.y, left: hotspot.x }}
              >
                <button
                  aria-label={`View ${hotspot.name} details`}
                  onClick={(e) => handleHotspotClick(hotspot.id, e)}
                  className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/90 text-black shadow-md active:scale-90 transition-transform"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#a13e28] animate-ping absolute"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#a13e28] relative"></span>
                </button>

                {/* Popover Card */}
                {isOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute z-30 w-52 p-3 rounded-xl bg-white/95 backdrop-blur-md shadow-xl border border-[#efeeeb] transition-all duration-200 ${
                      hotspot.align === 'left' ? 'left-10 -top-8' : 'right-10 -top-8'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-body text-[11px] text-[#a13e28] font-semibold uppercase">
                        {hotspot.label}
                      </span>
                      <span className="font-body font-bold text-[14px] text-black">
                        ${hotspot.price}
                      </span>
                    </div>
                    <p className="font-body text-[13px] text-[#1a1c1a] font-medium truncate mt-0.5">
                      {hotspot.name}
                    </p>
                    <p className="font-body text-[11px] text-[#47464b] mt-0.5">
                      {hotspot.desc}
                    </p>
                    <div className="mt-2.5 flex items-center gap-1.5">
                      <button
                        onClick={() => openProduct(hotspot.productId || 'wool-trench', 'atelier')}
                        className="flex-1 py-1.5 px-2 bg-[#f4f3f1] hover:bg-[#e9e8e5] text-black rounded-full font-body text-[11px] font-medium text-center"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => {
                          addToCart({
                            productId: hotspot.id,
                            name: hotspot.name,
                            brand: 'ATELIER',
                            price: hotspot.price,
                            selectedSize: 'M',
                            selectedColor: 'Standard',
                            quantity: 1,
                            image: KYOTO_LOOKBOOK_DATA.image
                          });
                          setActiveHotspot(null);
                        }}
                        className="flex-1 py-1.5 px-2 bg-black text-white rounded-full font-body text-[11px] font-medium text-center"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Hint overlay */}
          <div className="absolute bottom-3 left-3 bg-white/85 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm pointer-events-none">
            <span className="material-symbols-outlined text-[14px] text-[#a13e28]">touch_app</span>
            <span className="font-body text-[11px] text-[#1a1c1a] font-medium">Tap dots to view pieces</span>
          </div>
        </div>

        {/* Set Action Tray */}
        <div className="mt-3 pt-2 flex items-center justify-between gap-3">
          <div>
            <span className="font-body text-[12px] text-[#47464b]">Full Capsule (3 Pieces)</span>
            <div className="flex items-baseline gap-2">
              <span className="font-headline font-bold text-[20px] text-black">
                ${KYOTO_LOOKBOOK_DATA.bundlePrice}
              </span>
              <span className="font-body text-[12px] text-[#a13e28] font-semibold">
                Save ${KYOTO_LOOKBOOK_DATA.savings} as set
              </span>
            </div>
          </div>
          <button
            onClick={handleAddFullCapsule}
            className="h-11 px-5 rounded-full bg-black text-white font-body text-[13px] font-semibold flex items-center gap-2 shadow-sm active:scale-95 transition-transform hover:opacity-90"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            Add Set to Bag
          </button>
        </div>
      </section>

      {/* Curated Flash Drops Horizontal Carousel */}
      <section className="pt-2 pb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#a13e28] animate-pulse"></span>
            <h3 className="font-headline font-semibold text-[18px] text-[#1a1c1a]">
              Curated Flash Drops
            </h3>
          </div>
          <button 
            onClick={() => setActiveCategory('New In')} 
            className="font-body text-[13px] text-[#a13e28] font-medium hover:underline"
          >
            View All
          </button>
        </div>

        <div className="w-full overflow-x-auto no-scrollbar -mx-4 px-4">
          <div className="flex gap-3 pb-2">
            {FLASH_DROPS.map((drop) => {
              const wishlisted = isWishlisted(drop.id);
              return (
                <div
                  key={drop.id}
                  onClick={() => openProduct(drop.id, 'atelier')}
                  className="min-w-[260px] max-w-[260px] bg-white rounded-2xl p-3 shadow-xs border border-[#efeeeb] flex flex-col justify-between cursor-pointer hover:border-[#c8c5cb] transition-colors"
                >
                  <div>
                    <div className="relative w-full h-64 rounded-xl overflow-hidden bg-[#f4f3f1] mb-2.5">
                      <img
                        src={drop.image}
                        alt={drop.name}
                        className="w-full h-full object-cover"
                      />
                      {drop.tag && (
                        <span className="absolute top-2 left-2 bg-[#a13e28] text-white font-body text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                          {drop.tag}
                        </span>
                      )}
                      <button
                        aria-label="Wishlist"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(drop.id, drop.name);
                        }}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-black shadow-xs hover:scale-105 active:scale-95 transition-transform"
                      >
                        <span className={`material-symbols-outlined text-[18px] ${wishlisted ? 'fill-1 text-[#a13e28]' : ''}`}>
                          {wishlisted ? 'favorite' : 'favorite'}
                        </span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mb-1">
                      <span className="font-body text-[10px] uppercase tracking-wider text-[#47464b] font-semibold">
                        {drop.brand}
                      </span>
                      {drop.rating && (
                        <div className="flex items-center gap-0.5 text-[#1a1c1a]">
                          <span className="material-symbols-outlined text-[13px] text-[#c76c00] fill-1">star</span>
                          <span className="font-body text-[11px] font-medium">{drop.rating}</span>
                        </div>
                      )}
                    </div>
                    <h4 className="font-headline font-semibold text-[15px] text-[#1a1c1a] truncate">
                      {drop.name}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between pt-2 mt-1 border-t border-[#f4f3f1]">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-headline font-bold text-[18px] text-black">
                        ${drop.price}
                      </span>
                      {drop.originalPrice && (
                        <span className="font-body text-[12px] text-[#77767b] line-through">
                          ${drop.originalPrice}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => handleQuickAdd(drop, e)}
                      aria-label="Quick Add"
                      className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 transition-transform"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Outfit Check AI Banner */}
      <section className="mb-6">
        <div className="relative w-full rounded-2xl bg-[#f4f3f1] p-4 md:p-5 overflow-hidden flex items-center justify-between border border-[#efeeeb] shadow-xs">
          <div className="relative z-10 max-w-[65%]">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdad2] text-[#822714] font-body text-[10px] font-semibold mb-1.5">
              <span className="material-symbols-outlined text-[12px]">camera</span> Outfit Check AI
            </div>
            <h3 className="font-headline font-semibold text-[17px] text-[#1a1c1a] leading-snug">
              Have an outfit in mind?
            </h3>
            <p className="font-body text-[12px] text-[#47464b] mt-1">
              Snap your mirror selfie or moodboard screenshot to find instant silhouette matches.
            </p>
            <button
              onClick={() => setScreen('match')}
              className="mt-3 h-9 px-4 rounded-full bg-white text-black font-body text-[12px] font-semibold flex items-center gap-1.5 shadow-xs hover:bg-[#efeeeb] active:scale-95 transition-transform border border-[#efeeeb]"
            >
              <span className="material-symbols-outlined text-[16px] text-[#a13e28]">add_a_photo</span>
              Scan & Match
            </button>
          </div>

          <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-[#e9e8e5] shadow-sm shrink-0 border border-[#efeeeb]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFODWiLgb8q396NpzsR2KBSzRzJvh3ANQ_hMf9Ta9GQVbeoiy2GsMwqxj6V95RerlNGxCM_lRu_yfVOKQgKACSJZIlwBm6RoFv9ZFRyrWgDd3ibQKM47cmx-_LTeWHNeIOS8kQnmOJGVcjGYjZv4xb31TBWhq8xWcUAw7VW34CBkdGERGYIvtpBW85Y_Euxm4D1v_jrf8RLOkKOjGKfoJFryxen2t2iEs_inoIOoustrqR178a2jMc"
              alt="Outfit Polaroid sample"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-black shadow-xs">
                <span className="material-symbols-outlined text-[18px]">center_focus_weak</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending This Week: 2-Column Responsive Grid */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-headline font-semibold text-[20px] text-[#1a1c1a]">
              Trending This Week
            </h3>
            <p className="font-body text-[12px] text-[#47464b]">
              Signature pieces hand-picked for modern ease
            </p>
          </div>
          <span className="font-body text-[11px] text-[#77767b] uppercase tracking-wider font-semibold">
            {filteredProducts.length} Items
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {filteredProducts.map((product) => {
            const wishlisted = isWishlisted(product.id);
            const activeColor = selectedColorSwatches[product.id] || (product.shades ? product.shades[0].name : '');

            return (
              <div
                key={product.id}
                onClick={() => openProduct(product.id, product.id === 'sculpted-cocoon-coat' ? 'ai' : 'atelier')}
                className="group bg-white rounded-2xl p-3 shadow-xs border border-[#efeeeb] flex flex-col justify-between cursor-pointer hover:border-[#c8c5cb] transition-all"
              >
                <div>
                  <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-[#f4f3f1] mb-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {product.tag && (
                      <span className="absolute top-2 left-2 bg-[#18181b]/80 backdrop-blur-xs text-white font-body text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                        {product.tag}
                      </span>
                    )}

                    <button
                      aria-label="Save to Wishlist"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id, product.name);
                      }}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-black shadow-xs hover:scale-110 active:scale-90 transition-all"
                    >
                      <span className={`material-symbols-outlined text-[16px] ${wishlisted ? 'fill-1 text-[#a13e28]' : ''}`}>
                        favorite
                      </span>
                    </button>
                  </div>

                  {/* Color Swatches if available */}
                  {product.shades && (
                    <div className="flex items-center gap-1.5 py-1">
                      {product.shades.map((shade) => (
                        <button
                          key={shade.name}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedColorSwatches(prev => ({ ...prev, [product.id]: shade.name }));
                          }}
                          className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                            activeColor === shade.name ? 'scale-125 ring-1 ring-black border-white' : 'border-black/10'
                          }`}
                          style={{ backgroundColor: shade.hex }}
                          title={shade.name}
                        />
                      ))}
                    </div>
                  )}

                  {product.aiVerdict && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#f4f3f1] text-[#47464b] font-body text-[10px] font-medium leading-tight mb-1">
                      <span className="material-symbols-outlined text-[11px] text-[#a13e28]">auto_awesome</span>
                      {product.aiVerdict}
                    </div>
                  )}

                  <h4 className="font-headline font-semibold text-[14px] leading-tight text-[#1a1c1a] mt-0.5 line-clamp-1">
                    {product.name}
                  </h4>
                  {product.reviewCount && (
                    <p className="font-body text-[11px] text-[#77767b] mt-0.5">
                      {product.reviewCount} reviews
                    </p>
                  )}
                </div>

                <div className="pt-2 mt-1 flex items-center justify-between border-t border-[#f4f3f1]">
                  <span className="font-headline font-bold text-[17px] text-[#1a1c1a]">
                    ${product.price}
                  </span>
                  <button
                    aria-label="Quick Add"
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="w-8 h-8 rounded-full bg-[#f4f3f1] text-[#1a1c1a] hover:bg-black hover:text-white transition-colors flex items-center justify-center active:scale-95 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Editorial Brand Monograph Featurette */}
      <section className="mb-4">
        <div className="rounded-2xl bg-[#f4f3f1] p-5 flex flex-col items-center text-center shadow-xs border border-[#efeeeb]">
          <span className="material-symbols-outlined text-[28px] text-[#a13e28] mb-1.5">verified</span>
          <h4 className="font-headline font-semibold text-[17px] text-[#1a1c1a]">
            Physical Craft &amp; Mindful Utility
          </h4>
          <p className="font-body text-[12px] text-[#47464b] mt-1 max-w-[280px] leading-relaxed">
            Every garment is consciously produced in small batches by European master weavers with zero-plastic finishing.
          </p>
          <div className="mt-3 flex items-center gap-3 text-[#47464b] font-body text-[11px] uppercase tracking-wider font-semibold">
            <span>Carbon-Neutral Shipping</span>
            <span>•</span>
            <span>30-Day Returns</span>
          </div>
        </div>
      </section>
    </div>
  );
};
