import React from 'react';
import { useCommerce } from '../context/CommerceContext';
import { AppScreen } from '../types';

export const Navigation: React.FC = () => {
  const { screen, setScreen, totalItemsCount } = useCommerce();

  // If in checkout flow, we can still show navigation or a simplified footer bar
  const navItems: { id: AppScreen; label: string; icon: string; badge?: string }[] = [
    { id: 'discover', label: 'Discover', icon: 'explore' },
    { id: 'match', label: 'Match', icon: 'center_focus_strong' },
    { id: 'product-ai', label: 'Couture', icon: 'view_in_ar' },
    { id: 'bag', label: 'Bag', icon: 'shopping_bag', badge: totalItemsCount > 0 ? String(totalItemsCount) : undefined },
    { id: 'saved', label: 'Saved', icon: 'favorite' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#faf9f6]/95 backdrop-blur-xl border-t border-[#efeeeb] shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-around h-16 max-w-md md:max-w-xl mx-auto px-2">
        {navItems.map((item) => {
          const isActive = screen === item.id || (item.id === 'discover' && screen === 'product-atelier');

          return (
            <button
              key={item.id}
              onClick={() => {
                setScreen(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative flex flex-col items-center justify-center w-16 h-12 gap-0.5 transition-all active:scale-95 ${
                isActive ? 'text-black font-semibold' : 'text-[#77767b] hover:text-[#1a1c1a]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span className={`material-symbols-outlined text-[22px] ${isActive ? 'fill-1 text-black' : ''}`}>
                  {item.icon}
                </span>
                {item.badge && (
                  <span className="absolute -top-1 -right-2 bg-[#a13e28] text-white font-body text-[10px] leading-tight px-1.5 py-0.2 rounded-full min-w-[17px] text-center font-semibold shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="font-body text-[11px] tracking-wide">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
