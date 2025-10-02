import { create } from "zustand";

export type DeliveryMethod = "RECOGIDA_TIENDA" | "MINI_DELIVERY";
export type PaymentMethod = "EFECTIVO" | "WALLET";

type CheckoutState = {
  deliveryMethod: "RECOGIDA_TIENDA" | "MINI_DELIVERY" | null;
  location?: { building: string; floor: string; room: string };
  paymentMethod?: "EFECTIVO" | "YAPE" | "PLIN";
  notes?: string;

  setDeliveryMethod: (method: "RECOGIDA_TIENDA" | "MINI_DELIVERY") => void;
  setLocation: (loc: { building: string; floor: string; room: string }) => void;
  setPaymentMethod: (method: "EFECTIVO" | "YAPE" | "PLIN") => void;
  setNotes: (notes: string) => void;
  reset: () => void;
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  deliveryMethod: null,
  location: undefined,
  paymentMethod: undefined,
  notes: undefined,

  setDeliveryMethod: (method) => set({ deliveryMethod: method }),
  setLocation: (loc) => set({ location: loc }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setNotes: (notes) => set({ notes }),
  reset: () =>
    set({
      deliveryMethod: null,
      location: undefined,
      paymentMethod: undefined,
      notes: undefined,
    }),
}));
