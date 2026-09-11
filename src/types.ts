export type AppScreen = 
  | 'discover'
  | 'match'
  | 'product-ai'
  | 'product-atelier'
  | 'bag'
  | 'checkout'
  | 'saved';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  tag?: string;
  rating?: number;
  reviewCount?: number;
  image: string;
  additionalImages?: string[];
  description: string;
  fabricDetails?: string;
  fitDetails?: string;
  traceability?: string;
  shades?: { name: string; hex: string }[];
  sizes: string[];
  category: 'outerwear' | 'pants' | 'footwear' | 'accessories' | 'knitwear';
  aiMatchScore?: number;
  aiVerdict?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  tag?: string;
  badge?: string;
}

export interface LookbookHotspot {
  id: string;
  label: string;
  role: string;
  price: number;
  name: string;
  desc: string;
  x: string;
  y: string;
  align: 'left' | 'right';
  productId?: string;
}

export interface StylistMessage {
  id: string;
  sender: 'user' | 'stylist';
  text: string;
  timestamp: string;
  recommendedPiece?: {
    name: string;
    price: number;
    image: string;
  };
}
