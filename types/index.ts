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

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: CartItem[];
  total: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  paymentReference: string;
  deliveryInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
  };
  createdAt: Date;
}

export type Category = "all" | "clothing" | "appliances" | "kitchen" | "cosmetics";