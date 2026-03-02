export interface Product {
  id: string;
  name: string;
  price: number;
  category: "clothing" | "appliances" | "kitchen" | "cosmetics";
  description: string;
  image: string;
  emoji: string; // placeholder until we add real images
  rating: number;
  reviews: number;
  stock: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Category = "all" | "clothing" | "appliances" | "kitchen" | "cosmetics";