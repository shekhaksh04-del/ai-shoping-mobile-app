import React, { useState } from 'react';
import { useCommerce } from '../context/CommerceContext';
import { TRENDING_PRODUCTS, FLASH_DROPS, AI_CURATED_TRENDING } from '../data/products';
import { Product } from '../types';

export const ProductAtelierView: React.FC = () => {
  const {
    selectedProductId,
    addToCart,
    toggleWishlist,
    isWishlisted,
    showToast,
    setScreen
  } = useCommerce();

  // Find selected product or fallback to Oversized Wool Trench
  const allProducts = [...TRENDING_PRODUCTS, ...FLASH_DROPS, ...AI_CURATED_TRENDING];
  const product: Product =
    allProducts.find(p => p.id === selectedProductId) || TRENDING_PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.shades ? product.shades[0].name : 'Oatmeal'
  );
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || 'M');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const images = product.additionalImages || [product.image];
  const wishlisted = isWishlisted(product.id);

  const handleAddBundle = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      selectedSize: selectedSize,
      selectedColor: selectedColor,
      quantity: 1,
      image: product.image
    });
    addToCart({
      productId: 'chunky-knit-sub',
      name: 'Chunky Cashmere Knit',
      brand: 'ATELIER ÉLAN',
      price: 210,
      selectedSize: 'M',
      selectedColor: 'Oatmeal',
      quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1_7DkLzB7q4r0K_L9m-P-K8P9c6U3wQ1R4aY_8d3e2f1g-0h9i8j7k6l5m4n3o2p1q0r9s8t7u6v5w4x3y2z1a0b9c8d7e6f5'
    });
    showToast('Trench + Cashmere Knit bundle added! $60 bundle discount applied', 'auto_awesome');
  };

  const handleMainAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      selectedSize: selectedSize,
      selectedColor: selectedColor,
      quantity: 1,
      badge: 'Atelier Certified • Hand Finished',
      image: images[activeImageIndex] || product.image
    });
  };

  return (
    <div className="flex flex-col w-full pb-36 pt-16 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
      {/* Top Media Gallery */}
      <div className="relative w-full aspect-[4/5] bg-[#f4f3f1] overflow-hidden">
        <img
          src={images[activeImageIndex] || product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Gallery Pagination Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  activeImageIndex === idx ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Action Buttons Top Right */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <button
            aria-label="Wishlist"
            onClick={() => toggleWishlist(product.id, product.name)}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black shadow-md active:scale-90 transition-transform"
          >
            <span className={`material-symbols-outlined text-[20px] ${wishlisted ? 'fill-1 text-[#a13e28]' : ''}`}>
              favorite
            </span>
          </button>
          <button
            aria-label="Share"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: product.name, url: window.location.href });
              } else {
                showToast('Link copied to clipboard', 'share');
              }
            }}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black shadow-md active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
        </div>

        {/* Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white font-body text-[11px] uppercase tracking-wider font-semibold shadow-xs">
            {product.tag || 'Bestseller • Autumn 24'}
          </span>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-4 flex flex-col gap-5">
        {/* Title, Brand & Pricing */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="font-body text-[12px] uppercase tracking-widest text-[#47464b] font-semibold">
              {product.brand}
            </span>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#c76c00] fill-1">star</span>
              <span className="font-body text-[12px] font-semibold text-black">4.9</span>
              <span className="font-body text-[12px] text-[#77767b]">(128 reviews)</span>
            </div>
          </div>

          <h1 className="font-headline font-semibold text-[24px] md:text-[28px] text-[#1a1c1a] leading-tight">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-headline font-bold text-[22px] text-black">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="font-body text-[14px] text-[#77767b] line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="font-body text-[11px] px-2 py-0.5 rounded-full bg-[#ffdad2] text-[#822714] font-semibold">
              Free Express Courier
            </span>
          </div>
        </div>

        {/* Shade / Color Swatches */}
        {product.shades && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="font-body text-[12px] uppercase tracking-wider text-[#47464b] font-semibold">
                Color: <span className="text-black font-bold capitalize">{selectedColor}</span>
              </span>
              <span className="font-body text-[11px] text-[#77767b]">Natural Vegetable Dye</span>
            </div>
            <div className="flex items-center gap-3">
              {product.shades.map((shade) => {
                const isSelected = selectedColor === shade.name;
                return (
                  <button
                    key={shade.name}
                    onClick={() => setSelectedColor(shade.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                      isSelected ? 'border-black bg-black/5 shadow-xs' : 'border-[#efeeeb] bg-white'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/15 shadow-inner"
                      style={{ backgroundColor: shade.hex }}
                    />
                    <span className="font-body text-[12px] text-[#1a1c1a] font-medium">{shade.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Size Selector */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-body text-[12px] uppercase tracking-wider text-[#47464b] font-semibold">
              Select Size
            </span>
            <button
              onClick={() => setIsSizeGuideOpen(!isSizeGuideOpen)}
              className="font-body text-[12px] text-[#a13e28] font-medium flex items-center gap-1 hover:underline"
            >
              <span className="material-symbols-outlined text-[15px]">straighten</span>
              Size Guide &amp; Fit Advisor
            </button>
          </div>

          <div className="flex items-center gap-2">
            {product.sizes.map((sz) => {
              const isSelected = selectedSize === sz;
              return (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`flex-1 py-3 rounded-xl font-body text-[13px] transition-all relative ${
                    isSelected
                      ? 'bg-black text-white font-bold shadow-xs'
                      : 'bg-[#f4f3f1] text-[#1a1c1a] hover:bg-[#e9e8e5]'
                  }`}
                >
                  {sz}
                  {sz === 'M' && (
                    <span className="block text-[9px] uppercase tracking-wider font-normal text-[#ffdad2]">
                      AI Best Fit
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 text-[#a13e28] font-body text-[11px] pt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a13e28] animate-ping"></span>
            <span>Low Stock: Only 3 pieces left in Size {selectedSize}</span>
          </div>

          {isSizeGuideOpen && (
            <div className="bg-[#f4f3f1] p-3 rounded-xl text-[12px] text-[#47464b] flex flex-col gap-1 border border-[#efeeeb] animate-fadeIn">
              <span className="font-semibold text-black">Atelier Fit Recommendation:</span>
              <p>Model is 5'10" (178cm) wearing size M. Bust 32", Waist 25", Hips 35".</p>
              <p>Designed with a generous, masculine raglan cut for effortless layering over heavy knitwear.</p>
            </div>
          )}
        </div>

        {/* Fabric & Tactile Composition */}
        <div className="rounded-2xl bg-[#f4f3f1] p-4 flex flex-col gap-2 border border-[#efeeeb]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a13e28] text-[20px]">textures</span>
            <h3 className="font-headline font-semibold text-[16px] text-black">
              Fabric &amp; Tactile Composition
            </h3>
          </div>
          <p className="font-body text-[13px] text-[#1a1c1a] leading-relaxed">
            100% Double-Faced Merino Wool • 420 GSM Heavyweight weave. Hand-stitched horn buttons with unlined minimalist interior.
          </p>
          <div className="grid grid-cols-2 gap-2 mt-1 pt-2 border-t border-[#e9e8e5] text-[11px] text-[#47464b]">
            <div>• Origin: Biella, Northern Italy</div>
            <div>• Care: Specialized Dry Clean Only</div>
            <div>• Storm-flap closure with throat latch</div>
            <div>• Deep dual welted hand pockets</div>
          </div>
        </div>

        {/* Stylist Recommendation Note */}
        <div className="rounded-2xl bg-white p-4 flex items-start gap-3 shadow-xs border border-[#efeeeb]">
          <div className="w-8 h-8 rounded-full bg-[#ffdad2] flex items-center justify-center text-[#822714] shrink-0">
            <span className="material-symbols-outlined text-[16px]">format_quote</span>
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-body text-[11px] uppercase tracking-wider text-[#a13e28] font-semibold">
              Stylist Note
            </span>
            <p className="font-body text-[12px] text-[#47464b] mt-0.5 leading-relaxed">
              "Cut with a relaxed architectural shoulder. We recommend pairing with low leather loafers or our Pleated Linen Trousers for an effortless Parisian silhouette."
            </p>
          </div>
        </div>

        {/* Frequently Styled Together Capsule Bundle */}
        <div className="rounded-2xl bg-white p-4 shadow-xs border border-[#efeeeb] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h4 className="font-headline font-semibold text-[17px] text-black">
                Frequently Styled Together
              </h4>
              <span className="font-body text-[11px] text-[#77767b]">
                Curated Autumn Pairing
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad2] text-[#822714] font-body text-[11px] font-semibold">
              Save $60 Bundle
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-20 h-24 rounded-xl overflow-hidden bg-[#f4f3f1] shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-headline font-bold text-[#77767b]">+</span>
            <div className="w-20 h-24 rounded-xl overflow-hidden bg-[#f4f3f1] shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1_7DkLzB7q4r0K_L9m-P-K8P9c6U3wQ1R4aY_8d3e2f1g-0h9i8j7k6l5m4n3o2p1q0r9s8t7u6v5w4x3y2z1a0b9c8d7e6f5"
                alt="Chunky Cashmere Knit"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-headline font-semibold text-[14px] text-black block truncate">
                Chunky Cashmere Knit
              </span>
              <span className="font-headline font-bold text-[16px] text-black">
                $530 <span className="font-body text-[12px] font-normal text-[#77767b] line-through">$590</span>
              </span>
              <button
                onClick={handleAddBundle}
                className="mt-1.5 w-full py-1.5 px-2.5 rounded-full bg-black text-white font-body text-[11px] font-semibold flex items-center justify-center gap-1 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[13px]">add</span>
                Add Both
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Purchase Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#efeeeb] pb-safe shadow-[0_-8px_24px_-6px_rgba(24,24,27,0.08)]">
        <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto p-4 flex items-center gap-3">
          <div className="flex flex-col min-w-[70px]">
            <span className="font-body text-[10px] uppercase tracking-wider text-[#77767b]">Total</span>
            <span className="font-headline font-bold text-[20px] text-black">${product.price.toFixed(2)}</span>
          </div>

          <button
            onClick={handleMainAddToCart}
            className="flex-1 h-[52px] rounded-full bg-black text-white font-body text-[13px] font-semibold flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all hover:opacity-95"
          >
            <span className="material-symbols-outlined text-[19px]">shopping_bag</span>
            <span>Add to Bag</span>
          </button>

          <button
            onClick={() => {
              handleMainAddToCart();
              setScreen('checkout');
            }}
            className="h-[52px] px-5 rounded-full bg-[#f4f3f1] text-black font-body text-[13px] font-semibold flex items-center justify-center hover:bg-[#e9e8e5] active:scale-95 transition-transform shrink-0"
            title="Express Buy"
          >
            Express Buy
          </button>
        </div>
      </div>
    </div>
  );
};
