import React, { useState } from 'react';
import { useCommerce } from '../context/CommerceContext';
import { BUNDLE_ITEM } from '../data/products';

export const BagView: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    isBundleAdded,
    addBundleScarf,
    appliedPromo,
    applyPromo,
    removePromo,
    loyaltyPointsActive,
    toggleLoyaltyPoints,
    subtotal,
    discountTotal,
    loyaltyDiscount,
    estimatedTax,
    finalTotal,
    totalItemsCount,
    setScreen
  } = useCommerce();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = applyPromo(promoInput);
    if (success) {
      setPromoInput('');
      setPromoError(false);
    } else {
      setPromoError(true);
    }
  };

  const freeShippingThreshold = 500;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="flex flex-col w-full pb-36 pt-20 px-4 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
      {/* Page Header Info */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-headline font-semibold text-[22px] text-[#1a1c1a]">
            Your Shopping Bag
          </h2>
          <p className="font-body text-[12px] text-[#47464b]">
            {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} curated for your wardrobe
          </p>
        </div>
        <button
          onClick={() => setScreen('discover')}
          className="font-body text-[12px] text-[#a13e28] font-medium hover:underline flex items-center gap-0.5"
        >
          <span>Continue browsing</span>
          <span className="material-symbols-outlined text-[14px]">east</span>
        </button>
      </div>

      {/* Smart Savings Advisor Tier Progress Bar */}
      <section className="mb-4 bg-white rounded-2xl p-4 shadow-xs border border-[#efeeeb]">
        <div className="flex items-start gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#ffdad2] flex items-center justify-center text-[#822714] shrink-0">
            <span className="material-symbols-outlined text-[17px]">trending_up</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-body text-[11px] uppercase tracking-wider text-[#a13e28] font-semibold">
                Tier Advisor
              </span>
              <span className="font-headline font-bold text-[12px] text-[#1a1c1a]">
                {subtotal >= freeShippingThreshold ? 'VIP Tier Unlocked' : `$${freeShippingThreshold - subtotal} to Tier 2`}
              </span>
            </div>
            <p className="font-body text-[12px] text-[#47464b] mt-0.5">
              {subtotal >= freeShippingThreshold
                ? 'Congratulations! You have unlocked 20% off plus complimentary priority white-glove delivery.'
                : 'Add $55 more to unlock 20% bundle discount across all cashmere pieces.'}
            </p>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full bg-[#f4f3f1] h-2 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[#a13e28] rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </section>

      {/* AI Smart Recommendation Scarf Bundle Card */}
      {!isBundleAdded && (
        <section className="mb-4 bg-gradient-to-br from-[#faf9f6] to-[#f4f3f1] rounded-2xl p-3.5 shadow-xs border border-[#e9e8e5]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#a13e28] text-[16px] animate-pulse">auto_awesome</span>
              <span className="font-body text-[11px] font-semibold uppercase tracking-wider text-[#a13e28]">
                AI Savings Advisor Opportunity
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#ffdad2] text-[#822714] font-body text-[10px] font-bold">
              Net Savings: $44.00
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-16 h-20 rounded-xl overflow-hidden bg-white shrink-0 shadow-xs border border-[#efeeeb]">
              <img
                src={BUNDLE_ITEM.image}
                alt={BUNDLE_ITEM.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-headline font-semibold text-[14px] text-[#1a1c1a] truncate">
                {BUNDLE_ITEM.name}
              </h4>
              <p className="font-body text-[11px] text-[#47464b] mt-0.5 line-clamp-1">
                Adding this unlocks Tier 2, saving $64 on your current overcoat &amp; trousers.
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="font-headline font-bold text-[14px] text-black">
                  +${BUNDLE_ITEM.price}
                </span>
                <span className="font-body text-[11px] text-[#a13e28] font-semibold">
                  (Unlocks -$64 Cart Credit)
                </span>
              </div>
            </div>
            <button
              onClick={addBundleScarf}
              className="px-3 py-2 rounded-full bg-black text-white font-body text-[11px] font-semibold hover:opacity-90 active:scale-95 transition-all shrink-0 shadow-xs flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">add</span>
              Add Scarf
            </button>
          </div>
        </section>
      )}

      {/* Cart Items List */}
      <section className="flex flex-col gap-3 mb-6">
        {cart.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center bg-white rounded-2xl p-6 border border-[#efeeeb]">
            <span className="material-symbols-outlined text-[48px] text-[#c8c5cb] mb-2">shopping_bag</span>
            <h3 className="font-headline font-semibold text-[18px] text-[#1a1c1a]">Your bag is empty</h3>
            <p className="font-body text-[13px] text-[#77767b] mt-1 max-w-xs">
              Explore our latest Autumn 24 collection or browse curated AI looks.
            </p>
            <button
              onClick={() => setScreen('discover')}
              className="mt-4 px-6 py-2.5 rounded-full bg-black text-white font-body text-[13px] font-semibold shadow-xs hover:opacity-90 active:scale-95"
            >
              Discover Pieces
            </button>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-3.5 shadow-xs border border-[#efeeeb] flex gap-3.5 relative"
            >
              {/* Product Thumbnail */}
              <div className="w-20 h-26 rounded-xl overflow-hidden bg-[#f4f3f1] shrink-0 border border-[#efeeeb]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-body text-[10px] uppercase tracking-wider text-[#77767b] font-semibold block">
                        {item.brand}
                      </span>
                      <h4 className="font-headline font-semibold text-[15px] text-[#1a1c1a] leading-tight truncate">
                        {item.name}
                      </h4>
                    </div>
                    <button
                      aria-label="Remove item"
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#77767b] hover:text-[#a13e28] transition-colors p-1"
                      title="Remove"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>

                  {/* Size & Color Tags */}
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-[#f4f3f1] text-[#47464b] font-body text-[11px] font-medium">
                      Size: {item.selectedSize}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#f4f3f1] text-[#47464b] font-body text-[11px] font-medium">
                      {item.selectedColor}
                    </span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-md bg-[#ffdad2] text-[#822714] font-body text-[10px] font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Price & Quantity Stepper */}
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#f4f3f1]">
                  <div className="flex items-baseline gap-1">
                    <span className="font-headline font-bold text-[16px] text-black">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    {item.quantity > 1 && (
                      <span className="font-body text-[11px] text-[#77767b]">
                        (${item.price} each)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 bg-[#f4f3f1] rounded-full px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-[14px] font-bold shadow-xs active:scale-90"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="font-body text-[13px] font-semibold text-black min-w-[14px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-[14px] font-bold shadow-xs active:scale-90"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Vouchers & Atelier Loyalty Points */}
      <section className="flex flex-col gap-3 mb-6">
        {/* Promo Voucher Input */}
        <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-[#efeeeb]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-[11px] uppercase tracking-wider text-[#47464b] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">sell</span>
              Promo Voucher
            </span>
            {appliedPromo && (
              <span className="font-body text-[11px] text-[#a13e28] font-bold">
                Code Applied
              </span>
            )}
          </div>

          {appliedPromo ? (
            <div className="flex items-center justify-between bg-[#ffdad2]/40 border border-[#ffdad2] px-3 py-2 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#a13e28] text-[18px]">verified</span>
                <div>
                  <span className="font-mono font-bold text-[13px] text-[#822714]">{appliedPromo}</span>
                  <span className="font-body text-[11px] text-[#a13e28] block">20% Autumn Minimal Discount</span>
                </div>
              </div>
              <button
                onClick={removePromo}
                className="text-[#822714] font-body text-[12px] hover:underline font-semibold"
              >
                Remove
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Try code FALL20 or STYLISTVIP"
                className={`flex-1 h-11 px-3.5 rounded-xl bg-[#f4f3f1] font-body text-[13px] text-[#1a1c1a] uppercase placeholder:normal-case placeholder:text-[#77767b] focus:outline-none focus:ring-1 focus:ring-black ${
                  promoError ? 'ring-1 ring-red-500' : ''
                }`}
              />
              <button
                type="submit"
                className="px-4 h-11 rounded-xl bg-black text-white font-body text-[12px] font-semibold hover:opacity-90 active:scale-95 transition-transform"
              >
                Apply
              </button>
            </form>
          )}
        </div>

        {/* Loyalty Points Toggle */}
        <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-[#efeeeb] flex items-center justify-between">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#ffdad2] flex items-center justify-center text-[#822714] shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">stars</span>
            </div>
            <div>
              <h4 className="font-headline font-semibold text-[14px] text-[#1a1c1a]">
                Redeem 1,200 Atelier Points
              </h4>
              <p className="font-body text-[11px] text-[#77767b]">
                Balance: 2,450 points available (-$12.00 off order)
              </p>
            </div>
          </div>

          <button
            onClick={toggleLoyaltyPoints}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              loyaltyPointsActive ? 'bg-[#a13e28]' : 'bg-[#c8c5cb]'
            }`}
            aria-label="Toggle loyalty points"
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                loyaltyPointsActive ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </section>

      {/* Financial Summary Breakdown */}
      <section className="bg-white rounded-2xl p-4 shadow-xs border border-[#efeeeb] mb-6">
        <h3 className="font-headline font-semibold text-[16px] text-black mb-3">
          Order Summary
        </h3>

        <div className="flex flex-col gap-2 font-body text-[13px]">
          <div className="flex justify-between text-[#47464b]">
            <span>Bag Subtotal ({totalItemsCount} items)</span>
            <span className="font-semibold text-black">${subtotal.toFixed(2)}</span>
          </div>

          {appliedPromo && (
            <div className="flex justify-between text-[#a13e28]">
              <span className="flex items-center gap-1">
                <span>Voucher Savings ({appliedPromo})</span>
              </span>
              <span className="font-semibold">-${discountTotal.toFixed(2)}</span>
            </div>
          )}

          {loyaltyPointsActive && (
            <div className="flex justify-between text-[#a13e28]">
              <span>Atelier Points Redemption</span>
              <span className="font-semibold">-${loyaltyDiscount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-[#47464b]">
            <span className="flex items-center gap-1">
              <span>Carbon-Neutral Courier</span>
              <span className="material-symbols-outlined text-[14px] text-green-700">energy_savings_leaf</span>
            </span>
            <span className="font-semibold text-green-700">FREE</span>
          </div>

          <div className="flex justify-between text-[#47464b]">
            <span>Estimated State / Local Tax (8.25%)</span>
            <span className="font-semibold text-black">${estimatedTax.toFixed(2)}</span>
          </div>

          <div className="pt-3 mt-1 border-t border-[#efeeeb] flex justify-between items-baseline">
            <div className="flex flex-col">
              <span className="font-headline font-bold text-[18px] text-black">Total Due</span>
              <span className="font-body text-[11px] text-[#77767b]">Includes complimentary return insurance</span>
            </div>
            <span className="font-headline font-bold text-[24px] text-black">
              ${finalTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#efeeeb] pb-safe shadow-[0_-8px_24px_-6px_rgba(24,24,27,0.08)]">
        <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto p-4 flex items-center gap-3">
          <div className="flex flex-col min-w-[70px]">
            <span className="font-body text-[10px] uppercase tracking-wider text-[#77767b]">Total</span>
            <span className="font-headline font-bold text-[20px] text-black">${finalTotal.toFixed(2)}</span>
          </div>

          <button
            disabled={cart.length === 0}
            onClick={() => {
              setScreen('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex-1 h-[52px] rounded-full bg-black text-white font-body text-[13px] font-semibold flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Proceed to Checkout</span>
            <span className="material-symbols-outlined text-[18px]">east</span>
          </button>
        </div>
      </div>
    </div>
  );
};
