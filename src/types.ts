export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  altText: string;
  category: 'kit' | 'day' | 'night' | 'accessory';
  badge?: string;
  spraysCount: string;
  flavorOrScent: string;
  features: string[];
  keyIngredients: {
    name: string;
    dosage: string;
    benefit: string;
  }[];
  description: string;
  usageProtocol: string;
  inStock: boolean;
  batchNumber: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isSubscription: boolean;
  subscriptionIntervalWeeks?: number;
}

export interface Testimonial {
  id: string;
  rating: number;
  quote: string;
  author: string;
  title: string;
  initials: string;
  colorClass: string;
}

export type ActiveScreen = 'home' | 'fuel' | 'store' | 'contact';
