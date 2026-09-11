import React from 'react';
import { useCommerce } from '../context/CommerceContext';

export const Header: React.FC = () => {
  const { screen, setScreen } = useCommerce();

  const isSubPage = screen === 'product-atelier' || screen === 'product-ai' || screen === 'checkout';

  const getPageTitle = () => {
    switch (screen) {
      case 'product-atelier':
        return 'Product Details';
      case 'product-ai':
        return 'Product View';
      case 'bag':
        return 'Shopping Bag';
      case 'checkout':
        return 'Checkout Flow';
      case 'match':
        return 'Visual Match Search';
      case 'saved':
        return 'Saved Items';
      default:
        return 'Discover';
    }
  };

  const handleBack = () => {
    if (screen === 'checkout') {
      setScreen('bag');
    } else if (screen === 'product-atelier' || screen === 'product-ai') {
      setScreen('discover');
    } else {
      setScreen('discover');
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#faf9f6]/90 backdrop-blur-xl border-b border-[#efeeeb] pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-16 px-4 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-2">
          {isSubPage ? (
            <button
              aria-label="Go back"
              onClick={handleBack}
              className="min-h-[40px] min-w-[40px] flex items-center justify-center text-[#1a1c1a] hover:text-black transition-colors rounded-full hover:bg-[#f4f3f1] active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
            </button>
          ) : null}

          {/* ATELIER Padlock Brand Logo Icon */}
          <button
            onClick={() => setScreen('discover')}
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-[#18181b] flex items-center justify-center relative shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-white text-[18px]">lock</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#fd8367] absolute"></span>
            </div>

            <div className="flex flex-col">
              <span className="font-headline font-semibold text-[15px] tracking-wider uppercase text-[#1a1c1a] leading-none">
                ATELIER
              </span>
              <span className="font-body text-[11px] uppercase tracking-widest text-[#47464b] font-medium">
                {getPageTitle()}
              </span>
            </div>
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* AI Live Pill */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ffdad2]/60 text-[#a13e28] shadow-xs">
            <span className="material-symbols-outlined text-[13px] animate-pulse">auto_awesome</span>
            <span className="font-body text-[10px] uppercase tracking-wider font-semibold">AI Live</span>
          </div>

          {/* Quick Switch to Product AI or Details */}
          {screen === 'discover' && (
            <button
              onClick={() => setScreen('product-ai')}
              title="View AI Couture Overcoat"
              className="text-xs px-2.5 py-1 rounded-full bg-[#efeeeb] text-[#1a1c1a] font-medium hover:bg-[#e3e2e0] transition-colors hidden sm:flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">view_in_ar</span>
              Couture View
            </button>
          )}

          {/* Profile Avatar */}
          <div className="relative flex items-center justify-center">
            <img
              alt="Client Profile"
              src="https://lh3.googleusercontent.com/aida/AEtjO1WXCwTTTldmHlzU34ep23_nqfSGkDnPnAOS5V7XNDOeqVjj-cdxnur52Zvyuvo-gLlmqoPzAoa9h1_TZOC1f6yHbEn6HHP67uBrvcGQBicc7MBRHVt9HagejUlxyNAO_5txJX4ht1pqaMmI46tnZqsK-MpmVdC0Dj62CT7MDBme-xM0caAT7XccwYS-rAMFOX2dNoXq0scCsUKW8_poUSFHI_eqycCGNsKbxPgyjHsxZwEDYVce6zJ65A"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#e3e2e0] shadow-xs"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#fd8367] ring-2 ring-[#faf9f6]"></span>
          </div>
        </div>
      </div>
    </header>
  );
};
