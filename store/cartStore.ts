import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";

// This defines the shape of our store
// What data it holds and what actions it can do
interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  // persist saves cart to localStorage
  // so cart survives page refresh
  persist(
    (set, get) => ({
      // Initial state — empty cart
      items: [],

      // ADD ITEM
      // If product already in cart, increase quantity
      // If new product, add it to the list
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            // Product already in cart — just update quantity
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? {
                      ...item,
                      quantity: Math.min(
                        item.quantity + quantity,
                        product.stock
                      ),
                    }
                  : item
              ),
            };
          }

          // New product — add to cart
          return {
            items: [...state.items, { product, quantity }],
          };
        });
      },

      // REMOVE ITEM
      // Filter out the item with matching id
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => item.product.id !== productId
          ),
        }));
      },

      // UPDATE QUANTITY
      // Find the item and change its quantity
      // If quantity is 0, remove it completely
      updateQuantity: (productId, quantity) => {
        if (quantity === 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      // CLEAR CART
      // Empty the entire cart
      clearCart: () => set({ items: [] }),

      // GET TOTAL ITEMS
      // Add up all quantities
      // e.g. 2 dresses + 1 blender = 3
      getTotalItems: () => {
        return get().items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      },

      // GET TOTAL PRICE
      // Multiply each item's price by quantity then sum
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "buyo-cart", // localStorage key name
    }
  )
);