import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppScreen, CartItem, Product } from '../types';
import { INITIAL_CART_ITEMS, BUNDLE_ITEM, TRENDING_PRODUCTS } from '../data/products';

interface CommerceContextType {
  screen: AppScreen;
  setScreen: (screen: AppScreen) => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  isBundleAdded: boolean;
  addBundleScarf: () => void;
  appliedPromo: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  loyaltyPointsActive: boolean;
  toggleLoyaltyPoints: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string, productName?: string) => void;
  isWishlisted: (productId: string) => boolean;
  toast: { message: string; icon: string; visible: boolean };
  showToast: (message: string, icon?: string) => void;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  openProduct: (id: string, type?: 'ai' | 'atelier') => void;
  subtotal: number;
  discountTotal: number;
  loyaltyDiscount: number;
  estimatedTax: number;
  finalTotal: number;
  totalItemsCount: number;
}

const CommerceContext = createContext<CommerceContextType | undefined>(undefined);

export const CommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<AppScreen>('discover');
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [isBundleAdded, setIsBundleAdded] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>('FALL20');
  const [loyaltyPointsActive, setLoyaltyPointsActive] = useState<boolean>(true);
  const [wishlist, setWishlist] = useState<string[]>(['arch-blazer', 'wool-trench']);
  const [selectedProductId, setSelectedProductId] = useState<string>('wool-trench');

  const [toast, setToast] = useState<{ message: string; icon: string; visible: boolean }>({
    message: '',
    icon: 'check_circle',
    visible: false
  });

  const showToast = (message: string, icon: string = 'check_circle') => {
    setToast({ message, icon, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 2400);
  };

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    setCart(prev => {
      const existing = prev.find(
        i => i.productId === item.productId && i.selectedSize === item.selectedSize && i.selectedColor === item.selectedColor
      );
      if (existing) {
        return prev.map(i => i.id === existing.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, { ...item, id: 'cart-' + Date.now() }];
    });
    showToast(`Added ${item.name} to Bag`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (id: string) => {
    const item = cart.find(i => i.id === id);
    setCart(prev => prev.filter(i => i.id !== id));
    if (item) {
      showToast(`Removed ${item.name} from Bag`, 'delete');
    }
  };

  const addBundleScarf = () => {
    if (isBundleAdded) return;
    addToCart({
      productId: BUNDLE_ITEM.id,
      name: BUNDLE_ITEM.name,
      brand: BUNDLE_ITEM.brand,
      price: BUNDLE_ITEM.price,
      selectedSize: 'One Size',
      selectedColor: 'Oatmeal',
      quantity: 1,
      tag: 'Bundle Offer',
      badge: 'Tier 20% Applied',
      image: BUNDLE_ITEM.image
    });
    setIsBundleAdded(true);
    showToast('Bundle Scarf added! Extra tier unlocked', 'auto_awesome');
  };

  const applyPromo = (code: string) => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'FALL20' || cleaned === 'STYLISTVIP' || cleaned === 'ATELIER') {
      setAppliedPromo(cleaned);
      showToast(`Promo ${cleaned} applied!`, 'sell');
      return true;
    }
    showToast('Invalid voucher code', 'error');
    return false;
  };

  const removePromo = () => {
    setAppliedPromo(null);
    showToast('Voucher removed', 'close');
  };

  const toggleLoyaltyPoints = () => {
    setLoyaltyPointsActive(prev => {
      const next = !prev;
      showToast(next ? 'Redeemed 1,200 points (-$12.00)' : 'Loyalty points removed', 'stars');
      return next;
    });
  };

  const toggleWishlist = (productId: string, productName?: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(productName ? `Removed ${productName} from Wishlist` : 'Removed from Wishlist', 'heart_broken');
        return prev.filter(id => id !== productId);
      } else {
        showToast(productName ? `Saved ${productName} to Wishlist` : 'Saved to Wishlist', 'favorite');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const openProduct = (id: string, type: 'ai' | 'atelier' = 'atelier') => {
    setSelectedProductId(id);
    setScreen(type === 'ai' || id === 'sculpted-cocoon-coat' ? 'product-ai' : 'product-atelier');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Financial Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  let discountTotal = 0;
  if (appliedPromo === 'FALL20') {
    discountTotal = Math.round(subtotal * 0.20 * 100) / 100;
  } else if (appliedPromo === 'STYLISTVIP') {
    discountTotal = 30.00;
  } else if (appliedPromo) {
    discountTotal = 25.00;
  }

  const loyaltyDiscount = loyaltyPointsActive ? 12.00 : 0.00;
  const estimatedTax = Math.round((subtotal - discountTotal - loyaltyDiscount) * 0.0825 * 100) / 100;
  const finalTotal = Math.max(0, Math.round((subtotal - discountTotal - loyaltyDiscount + estimatedTax) * 100) / 100);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CommerceContext.Provider
      value={{
        screen,
        setScreen,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        isBundleAdded,
        addBundleScarf,
        appliedPromo,
        applyPromo,
        removePromo,
        loyaltyPointsActive,
        toggleLoyaltyPoints,
        wishlist,
        toggleWishlist,
        isWishlisted,
        toast,
        showToast,
        selectedProductId,
        setSelectedProductId,
        openProduct,
        subtotal,
        discountTotal,
        loyaltyDiscount,
        estimatedTax,
        finalTotal,
        totalItemsCount
      }}
    >
      {children}
    </CommerceContext.Provider>
  );
};

export const useCommerce = () => {
  const context = useContext(CommerceContext);
  if (!context) throw new Error('useCommerce must be used within CommerceProvider');
  return context;
};
