import React from 'react';
import { useCommerce } from '../context/CommerceContext';

export const Toast: React.FC = () => {
  const { toast } = useCommerce();

  if (!toast.visible) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-black/90 text-white backdrop-blur-md shadow-lg flex items-center gap-2 font-body text-[12px] font-medium animate-fadeIn">
      <span className="material-symbols-outlined text-[#fd8367] text-[18px]">
        {toast.icon || 'check_circle'}
      </span>
      <span>{toast.message}</span>
    </div>
  );
};
