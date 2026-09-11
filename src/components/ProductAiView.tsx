import React, { useState } from 'react';
import { useCommerce } from '../context/CommerceContext';
import { AI_COUTURE_PRODUCT } from '../data/products';

export const ProductAiView: React.FC = () => {
  const { addToCart, toggleWishlist, isWishlisted, showToast, setScreen } = useCommerce();

  const [isTryOnActive, setIsTryOnActive] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isTraceabilityOpen, setIsTraceabilityOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const product = AI_COUTURE_PRODUCT;
  const wishlisted = isWishlisted(product.id);

  const handleAddToBag = () => {
    setIsAdding(true);
    addToCart({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      selectedSize: selectedSize,
      selectedColor: 'Charcoal Taupe',
      quantity: 1,
      tag: 'Limited Edition',
      badge: 'Smart Fit Guaranteed (Size ' + selectedSize + ')',
      image: product.image
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-36 pt-16 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
      {/* Interactive Visual Gallery with Virtual Try-On Engine */}
      <div className="relative w-full overflow-hidden bg-[#f4f3f1]">
        <div
          className="flex transition-transform duration-500 ease-out w-full"
          style={{ transform: isTryOnActive ? 'translateX(-100%)' : 'translateX(0%)' }}
        >
          {/* Slide 1: Editorial View */}
          <div className="w-full flex-shrink-0 relative aspect-[3/4] bg-[#efeeeb]">
            <img
              src={product.image}
              alt="Editorial View of Cashmere Cocoon Overcoat"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
          </div>

          {/* Slide 2: Virtual Try-On Simulation */}
          <div className="w-full flex-shrink-0 relative aspect-[3/4] bg-[#e9e8e5]">
            <img
              src={product.additionalImages ? product.additionalImages[1] : product.image}
              alt="Virtual Try-On Simulation"
              className="w-full h-full object-cover"
            />
            {/* Live AI Simulation Status Tag */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#a13e28] animate-pulse"></span>
              <span className="font-body text-[11px] text-[#1a1c1a] uppercase tracking-wider font-semibold">
                3D Drape Rendered
              </span>
            </div>

            {/* Tension Point Holographic Badges */}
            <div className="absolute top-[38%] left-[28%] flex items-center gap-1 bg-black/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full shadow-md text-[11px] font-body">
              <span>Shoulder: Natural 0.5" Ease</span>
            </div>
            <div className="absolute top-[52%] right-[22%] flex items-center gap-1 bg-black/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full shadow-md text-[11px] font-body">
              <span>Chest: Optimal drape</span>
            </div>
          </div>
        </div>

        {/* Gallery Navigation Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          {/* Try-On Toggle Pill */}
          <button
            onClick={() => setIsTryOnActive(!isTryOnActive)}
            className="pointer-events-auto flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 text-[#1a1c1a] shadow-md backdrop-blur-md active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-[#a13e28]">
              {isTryOnActive ? 'photo_camera' : 'view_in_ar'}
            </span>
            <span className="font-body text-[13px] font-medium tracking-tight">
              {isTryOnActive ? 'Editorial View' : 'Virtual Try-On'}
            </span>
          </button>

          {/* Carousel Indicators & Wishlist */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2.5 py-1.5 rounded-full shadow-sm">
              <div className={`w-1.5 h-1.5 rounded-full transition-all ${!isTryOnActive ? 'bg-black w-3' : 'bg-[#c8c5cb]'}`}></div>
              <div className={`w-1.5 h-1.5 rounded-full transition-all ${isTryOnActive ? 'bg-black w-3' : 'bg-[#c8c5cb]'}`}></div>
            </div>

            <button
              aria-label="Save to Wishlist"
              onClick={() => toggleWishlist(product.id, product.name)}
              className="w-10 h-10 rounded-full bg-white text-[#1a1c1a] flex items-center justify-center shadow-md active:scale-90 transition-transform"
            >
              <span className={`material-symbols-outlined text-[20px] ${wishlisted ? 'fill-1 text-[#a13e28]' : ''}`}>
                favorite
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="px-4 flex flex-col gap-5 pt-4">
        {/* Title, Badge & Base Meta */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#e9e8e5] text-[#47464b] font-body text-[11px] font-semibold uppercase tracking-wider">
              Limited Edition 04/50
            </span>
            <span className="flex items-center gap-1 text-[#a13e28] font-body text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[14px]">psychology</span>
              99.4% Match
            </span>
          </div>
          <h1 className="font-headline font-semibold text-[24px] md:text-[28px] text-[#1a1c1a] tracking-tight leading-snug">
            {product.name}
          </h1>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="font-headline font-bold text-[22px] text-black">
              ${product.price.toLocaleString()}
            </span>
            <span className="font-body text-[12px] text-[#77767b]">
              Includes custom climate treatment
            </span>
          </div>
        </div>

        {/* AI Fit & Size Advisor Module */}
        <div className="rounded-2xl bg-[#f4f3f1] p-4 shadow-xs flex flex-col gap-3 relative overflow-hidden border border-[#efeeeb]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#ffdad2] text-[#3d0600] flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">straighten</span>
              </div>
              <div className="flex flex-col">
                <span className="font-body font-semibold text-[13px] text-[#1a1c1a]">AI Fit Intelligence</span>
                <span className="font-body text-[11px] text-[#77767b]">Synced with 3D Profile • Scan Verified</span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-[#ffdad2]/60 px-2.5 py-1 rounded-full text-[#a13e28] font-body text-[12px] font-semibold">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              97% Fit
            </div>
          </div>

          {/* Recommendation Card */}
          <div className="rounded-xl bg-white p-3.5 flex flex-col gap-2 shadow-xs border border-[#efeeeb]">
            <div className="flex items-center justify-between">
              <span className="font-headline font-semibold text-[16px] text-black">
                Recommended Size: M
              </span>
              <span className="font-body text-[11px] text-[#77767b]">True to intent</span>
            </div>
            <p className="font-body text-[13px] text-[#47464b] leading-relaxed">
              Based on your recent cashmere knitwear purchases and personal drape preference, <strong className="text-[#1a1c1a] font-semibold">Medium</strong> delivers the signature relaxed cocoon silhouette with zero shoulder bunching.
            </p>

            {/* Drape Visual Slider Indicators */}
            <div className="pt-2 flex flex-col gap-1.5">
              <div className="flex justify-between text-[11px] font-body text-[#77767b]">
                <span>Tailored Slim</span>
                <span className="text-[#a13e28] font-semibold">Your Preference (Relaxed)</span>
                <span>Oversized</span>
              </div>
              <div className="w-full h-1.5 bg-[#e9e8e5] rounded-full relative">
                <div className="w-[62%] h-full bg-[#a13e28]/30 rounded-full"></div>
                <div className="absolute left-[62%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#a13e28] shadow-sm"></div>
              </div>
            </div>
          </div>

          {/* Compare with Size S & L simulation toggle */}
          <button
            onClick={() => setIsCompareOpen(!isCompareOpen)}
            className="flex items-center justify-between text-[#47464b] hover:text-black font-body text-[12px] font-medium pt-1"
          >
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">accessibility_new</span>
              Compare with Size S &amp; L simulation
            </span>
            <span className="material-symbols-outlined text-[18px]">
              {isCompareOpen ? 'expand_less' : 'chevron_right'}
            </span>
          </button>

          {isCompareOpen && (
            <div className="bg-white rounded-xl p-3 text-[12px] text-[#47464b] flex flex-col gap-1.5 border border-[#efeeeb] animate-fadeIn">
              <div className="flex justify-between py-1 border-b border-[#f4f3f1]">
                <span className="font-medium text-black">Size S:</span>
                <span>Shorter sleeve (-1.2"), snug chest drape (91% Match)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#f4f3f1] bg-[#ffdad2]/30 px-1 rounded">
                <span className="font-bold text-[#a13e28]">Size M (Selected):</span>
                <span className="font-medium text-[#a13e28]">Ideal Cocoon Ease (97% Match)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-medium text-black">Size L:</span>
                <span>Maxi length (+2.0"), dropped shoulder (+1.5") (88% Match)</span>
              </div>
            </div>
          )}
        </div>

        {/* Complete The Look: AI Wardrobe Synergy */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3 className="font-headline font-semibold text-[18px] text-[#1a1c1a]">
                AI Wardrobe Synergy
              </h3>
              <span className="font-body text-[12px] text-[#77767b]">
                Harmonized with your existing closet
              </span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ffdcc3] text-[#2f1500] font-body text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[13px]">palette</span>
              Curated Palette
            </div>
          </div>

          {/* Synergy Pairings Carousel */}
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
            {/* Item 1: In Your Closet */}
            <div className="flex-shrink-0 w-44 rounded-2xl bg-white p-2.5 shadow-xs border border-[#efeeeb] flex flex-col gap-2">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#f4f3f1]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKJJpz1pqjV_1qASqGBQWloz90K0G1P5ABtQQopUCihvNu6couSMbp0w99xPiZjNVliRtvPc4YNb_Mj8cJGtWfA7wSheedcWVR6IpP_3PQ2blozCrekZb7_sZedAxlQ49j3luVGXCZ1lHhhLxGwtO27oqVqNRHzPCnm049pGXSMAaPBnEqIk8JHk2vlxUhgi2ahoSDbVBLNOpsYMXGoyNJyMd8xUvxA_Fb3UUbB323-D9Ve7XOWNZ9"
                  alt="Pleated Creased Trouser"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-sm text-white font-body text-[10px] font-medium">
                  In Your Closet
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-body font-medium text-[13px] text-black truncate">
                  Pleated Creased Trouser
                </span>
                <span className="font-body text-[11px] text-[#77767b]">
                  Acquired Oct 2024
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#a13e28] font-body text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[13px]">auto_fix_high</span>
                100% Color Cohesion
              </div>
            </div>

            {/* Item 2: Recommended to Complete Outfit */}
            <div className="flex-shrink-0 w-44 rounded-2xl bg-white p-2.5 shadow-xs border border-[#efeeeb] flex flex-col gap-2">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#f4f3f1]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuARfjK0RoR4pTDgajNZG_7WdU0Btwwa7WLoCpt7F7ySQd2uPBMt0IJWlX6t0LRQzEmQiNL7kyY-4VdK4_qeMnlmfo4NdQBMyAGct-DQze7wdr-ML22b81HaZr6culWHZJ6gHz4dCxC0MBRiabtPWTUTLBO3D_g_2QzB67ns56lZHuC3X75r4kRim67DQ3H7d3wgJ7uV1Zrui6WAYyk9cR7mpreUh18d91vaw3qFAW8rXtZAa1dWx8SR"
                  alt="Monolith Chelsea Boot"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-[#a13e28] text-white font-body text-[10px] font-semibold">
                  New Addition
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-body font-medium text-[13px] text-black truncate">
                  Monolith Chelsea Boot
                </span>
                <span className="font-body font-bold text-[13px] text-black">
                  $590
                </span>
              </div>
              <button
                onClick={() => {
                  addToCart({
                    productId: 'monolith-boot',
                    name: 'Monolith Chelsea Boot',
                    brand: 'ATELIER STEP',
                    price: 590,
                    selectedSize: '38 EU',
                    selectedColor: 'Dark Mahogany',
                    quantity: 1,
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARfjK0RoR4pTDgajNZG_7WdU0Btwwa7WLoCpt7F7ySQd2uPBMt0IJWlX6t0LRQzEmQiNL7kyY-4VdK4_qeMnlmfo4NdQBMyAGct-DQze7wdr-ML22b81HaZr6culWHZJ6gHz4dCxC0MBRiabtPWTUTLBO3D_g_2QzB67ns56lZHuC3X75r4kRim67DQ3H7d3wgJ7uV1Zrui6WAYyk9cR7mpreUh18d91vaw3qFAW8rXtZAa1dWx8SR'
                  });
                }}
                className="w-full py-1.5 rounded-full bg-[#f4f3f1] text-[#1a1c1a] font-body text-[11px] font-semibold hover:bg-[#e9e8e5] transition-colors flex items-center justify-center gap-1 active:scale-95"
              >
                <span className="material-symbols-outlined text-[14px]">add</span>
                Pair with Coat
              </button>
            </div>

            {/* Item 3: Silk-Blend Knit Top */}
            <div className="flex-shrink-0 w-44 rounded-2xl bg-white p-2.5 shadow-xs border border-[#efeeeb] flex flex-col gap-2">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#f4f3f1]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCucs0Jd4HS4DwPxIdtfHPsWthQkXKKfKg8o_Zw4pHt_PMTfP7mqf71vHwxFC3HR6TfQgaHbOZfxpbVBa4Genid7uDjNIaaZU4EsXvEpr7hmM4Ok_Umpu_TVszah6vyfkp_W4kj9Io_Tz0P1MgClcsDRjhsR8a3-gOs1OVN5hzo-9luS3hWBOtUm7WVwugdT8zn_vJOtTckC4gkidlhuY3AUwrIfZ4fFkEUmYR21aZLAR3jCfx3g1z_"
                  alt="Silk-Blend Knit Top"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-sm text-white font-body text-[10px] font-medium">
                  In Your Closet
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-body font-medium text-[13px] text-black truncate">
                  Silk-Blend Knit Top
                </span>
                <span className="font-body text-[11px] text-[#77767b]">
                  Acquired Jan 2025
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#a13e28] font-body text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[13px]">auto_fix_high</span>
                Layering Compatible
              </div>
            </div>
          </div>
        </div>

        {/* AI Review Synthesizer Module */}
        <div className="rounded-2xl bg-white p-4 shadow-xs flex flex-col gap-3 border border-[#efeeeb]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#a13e28] text-[20px]">insights</span>
              <h3 className="font-headline font-semibold text-[17px] text-[#1a1c1a]">
                AI Review Insights
              </h3>
            </div>
            <span className="font-body text-[11px] text-[#77767b]">
              Distilled from 450+ verified owners
            </span>
          </div>

          {/* Sentiment Grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#f4f3f1] rounded-xl p-2.5 flex flex-col items-center text-center gap-0.5">
              <span className="font-headline font-bold text-[18px] text-black">4.9</span>
              <span className="font-body text-[10px] uppercase tracking-wider text-[#77767b]">Fabric Feel</span>
              <span className="font-body text-[11px] text-[#a13e28] font-semibold">Buttery Soft</span>
            </div>
            <div className="bg-[#f4f3f1] rounded-xl p-2.5 flex flex-col items-center text-center gap-0.5">
              <span className="font-headline font-bold text-[18px] text-black">5.0</span>
              <span className="font-body text-[10px] uppercase tracking-wider text-[#77767b]">Durability</span>
              <span className="font-body text-[11px] text-[#a13e28] font-semibold">Heirloom Grade</span>
            </div>
            <div className="bg-[#f4f3f1] rounded-xl p-2.5 flex flex-col items-center text-center gap-0.5">
              <span className="font-headline font-bold text-[18px] text-black">M+</span>
              <span className="font-body text-[10px] uppercase tracking-wider text-[#77767b]">Sleeve Length</span>
              <span className="font-body text-[11px] text-[#a13e28] font-semibold">Slightly Long</span>
            </div>
          </div>

          {/* Synthesized Key Takeaways */}
          <div className="flex flex-col gap-2.5 pt-1">
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#ffdad2] text-[#822714] flex-shrink-0 flex items-center justify-center mt-0.5">
                <span className="material-symbols-outlined text-[13px]">check</span>
              </div>
              <p className="font-body text-[13px] text-[#1a1c1a] leading-relaxed">
                <strong className="font-semibold text-black">Tactile Experience:</strong> 94% note the double-faced Italian cashmere feels whisper-light yet thermal down to -5°C.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#ffdad2] text-[#822714] flex-shrink-0 flex items-center justify-center mt-0.5">
                <span className="material-symbols-outlined text-[13px]">check</span>
              </div>
              <p className="font-body text-[13px] text-[#1a1c1a] leading-relaxed">
                <strong className="font-semibold text-black">Sleeve Drape:</strong> Verified buyers confirm sleeves run slightly past wrist bone; tailor cuff folds natively for an effortless Parisian roll.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#ffdad2] text-[#822714] flex-shrink-0 flex items-center justify-center mt-0.5">
                <span className="material-symbols-outlined text-[13px]">check</span>
              </div>
              <p className="font-body text-[13px] text-[#1a1c1a] leading-relaxed">
                <strong className="font-semibold text-black">Crease Recovery:</strong> Resilient weave resets overnight on standard coat hangers without steaming.
              </p>
            </div>
          </div>
        </div>

        {/* Craftsmanship & Traceability Accordion */}
        <div className="rounded-2xl bg-[#f4f3f1] p-4 flex flex-col gap-2 border border-[#efeeeb]">
          <button
            onClick={() => setIsTraceabilityOpen(!isTraceabilityOpen)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#1a1c1a]">eco</span>
              <span className="font-headline font-semibold text-[16px] text-black">
                Traceability &amp; Sourcing
              </span>
            </div>
            <span className="material-symbols-outlined text-[20px] text-[#77767b]">
              {isTraceabilityOpen ? 'expand_less' : 'expand_more'}
            </span>
          </button>
          <p className="font-body text-[12px] text-[#47464b] leading-relaxed">
            Spun from certified ethical Mongolian highland flocks, unblended and finished with unbleached natural thistle teasels in Biella, Italy.
          </p>
          {isTraceabilityOpen && (
            <div className="pt-2 border-t border-[#e9e8e5] text-[12px] text-[#47464b] flex flex-col gap-1">
              <p>• 100% GOTS certified chemical-free processing</p>
              <p>• Regenerative pasture grazed in accordance with fair heritage guidelines</p>
              <p>• Zero plastic trims: buttons crafted from natural Corozo nut</p>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Action Bar with Smart Guarantee Engine */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#efeeeb] pb-safe shadow-[0_-8px_24px_-6px_rgba(24,24,27,0.08)]">
        <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto p-4 flex flex-col gap-2.5">
          {/* Size Quick Switcher Pill Row */}
          <div className="flex items-center justify-between">
            <span className="font-body text-[12px] text-[#77767b] font-medium">Select Fit Size:</span>
            <div className="flex items-center gap-1.5">
              {['XS', 'S', 'M', 'L', 'XL'].map((sz) => {
                const isSelected = selectedSize === sz;
                const isXL = sz === 'XL';

                return (
                  <button
                    key={sz}
                    disabled={isXL}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-9 h-9 rounded-full font-body text-[12px] transition-all flex items-center justify-center relative ${
                      isSelected
                        ? 'bg-black text-white font-bold shadow-xs'
                        : isXL
                        ? 'bg-[#f4f3f1] text-[#c8c5cb] cursor-not-allowed'
                        : 'bg-[#f4f3f1] text-[#1a1c1a] hover:bg-[#e9e8e5] active:scale-95'
                    }`}
                  >
                    {sz}
                    {sz === 'M' && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#fd8367] border-2 border-white"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main CTA Trigger Row */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col min-w-[76px]">
              <span className="font-body text-[10px] uppercase tracking-wider text-[#77767b]">Total</span>
              <span className="font-headline font-bold text-[20px] text-black">${product.price.toLocaleString()}</span>
            </div>

            <button
              onClick={handleAddToBag}
              className={`flex-1 h-[52px] rounded-full font-body text-[13px] font-semibold flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all ${
                isAdding ? 'bg-[#a13e28] text-white' : 'bg-black text-white hover:opacity-95'
              }`}
            >
              <span className="material-symbols-outlined text-[19px]">
                {isAdding ? 'check' : 'shopping_bag'}
              </span>
              <span>{isAdding ? 'Bagged with Guarantee' : 'Add to Bag • Smart Fit Guarantee'}</span>
            </button>
          </div>

          {/* Reassurance Micro-Label */}
          <div className="flex items-center justify-center gap-1.5 text-[#47464b] font-body text-[11px]">
            <span className="material-symbols-outlined text-[14px] text-[#a13e28]">verified_user</span>
            <span>Free home exchange if Drape {selectedSize} doesn't meet 100% comfort</span>
          </div>
        </div>
      </div>
    </div>
  );
};
