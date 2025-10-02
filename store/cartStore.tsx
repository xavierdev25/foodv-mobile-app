import { create } from "zustand";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "@/lib/api";

type CartItem = {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
  imageUrl: string;
};

type CartState = {
  items: CartItem[];
  token: string | null;

  fetchCart: (token: string) => Promise<void>;
  addOrUpdateItem: (productId: number, quantity: number, token: string) => Promise<void>;
  removeItem: (itemId: number, token: string) => Promise<void>;
  clearCart: () => Promise<void>;
  


};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  token: null,

  fetchCart: async (token) => {
    try {
      const response = await getCart(token);
      set({ items: response.data.items, token });
    } catch (error) {
      console.error("Error cargando carrito:", error);
    }
  },

  addOrUpdateItem: async (productId, quantity, token) => {
    try {
      if (quantity === 0) {
        // eliminar
        const item = get().items.find((i) => i.productId === productId);
        if (item) {
          await removeFromCart(item.id, token);
          set({ items: get().items.filter((i) => i.productId !== productId) });
        }
        return;
      }

      const existingItem = get().items.find((i) => i.productId === productId);

      if (existingItem) {
        // update
        const response = await updateCartItem(existingItem.id, quantity, token);
        set({ items: response.data.items });
      } else {
        // add
        const response = await addToCart(productId, quantity, token);
        set({ items: response.data.items });
      }
    } catch (error) {
      console.error("Error al agregar/actualizar item:", error);
    }
  },

  removeItem: async (itemId, token) => {
    try {
      const response = await removeFromCart(itemId, token);
      set({ items: response.data.items });
    } catch (error) {
      console.error("Error al eliminar item:", error);
    }
  },

clearCart: async () => {
  const token = get().token;
  try {
    if (!token) throw new Error("Token no disponible");
    await clearCart(token);  // 👈 aquí la API
    set({ items: [] });
  } catch (error) {
    console.error("Error al vaciar carrito:", error);
    throw error;
  }
},
  total: () => get().items.reduce((sum, i) => sum + i.productPrice * i.quantity, 0),
}));
