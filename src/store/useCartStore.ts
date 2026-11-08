import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, PrintType, FinishType } from '../types';
import { DISCOUNT_TIERS } from '../data/products';

interface DiscountResult {
  percent: number;
  amount: number;
  tierLabel: string;
}

interface NextTierResult {
  neededQuantity: number;
  nextTierPercent: number;
  nextTierLabel: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (
    product: Product,
    quantity?: number,
    selectedPrintType?: PrintType,
    selectedFinish?: FinishType
  ) => void;
  removeItem: (productId: string, selectedPrintType?: PrintType, selectedFinish?: FinishType) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    selectedPrintType?: PrintType,
    selectedFinish?: FinishType
  ) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalUnits: () => number;
  getSubtotal: () => number;
  getDiscount: () => DiscountResult;
  getTotal: () => number;
  getNextTier: () => NextTierResult | null;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),

      addItem: (product, quantity = 1, selectedPrintType, selectedFinish) => {
        const printType = selectedPrintType || product.printType;
        const finish = selectedFinish || product.finish;

        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedPrintType === printType &&
              item.selectedFinish === finish
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + quantity,
            };
            return { items: updated, isOpen: true };
          }

          return {
            items: [
              ...state.items,
              {
                product,
                quantity,
                selectedPrintType: printType,
                selectedFinish: finish,
              },
            ],
            isOpen: true,
          };
        });
      },

      removeItem: (productId, selectedPrintType, selectedFinish) => {
        set((state) => ({
          items: state.items.filter((item) => {
            const matchesId = item.product.id === productId;
            const matchesPrint = !selectedPrintType || item.selectedPrintType === selectedPrintType;
            const matchesFinish = !selectedFinish || item.selectedFinish === selectedFinish;
            return !(matchesId && matchesPrint && matchesFinish);
          }),
        }));
      },

      updateQuantity: (productId, quantity, selectedPrintType, selectedFinish) => {
        if (quantity <= 0) {
          get().removeItem(productId, selectedPrintType, selectedFinish);
          return;
        }

        set((state) => ({
          items: state.items.map((item) => {
            const matchesId = item.product.id === productId;
            const matchesPrint = !selectedPrintType || item.selectedPrintType === selectedPrintType;
            const matchesFinish = !selectedFinish || item.selectedFinish === selectedFinish;
            if (matchesId && matchesPrint && matchesFinish) {
              return { ...item, quantity };
            }
            return item;
          }),
        }));
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getTotalUnits: () => {
        // High volume units for discount tiers
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },

      getDiscount: () => {
        const totalUnits = get().getTotalUnits();
        const subtotal = get().getSubtotal();

        let appliedTier = DISCOUNT_TIERS[0];
        for (const tier of DISCOUNT_TIERS) {
          if (totalUnits >= tier.minQuantity) {
            appliedTier = tier;
          }
        }

        const discountAmount = (subtotal * appliedTier.discountPercent) / 100;
        return {
          percent: appliedTier.discountPercent,
          amount: discountAmount,
          tierLabel: appliedTier.label,
        };
      },

      getNextTier: () => {
        const totalUnits = get().getTotalUnits();
        for (let i = 0; i < DISCOUNT_TIERS.length; i++) {
          if (totalUnits < DISCOUNT_TIERS[i].minQuantity) {
            return {
              neededQuantity: DISCOUNT_TIERS[i].minQuantity - totalUnits,
              nextTierPercent: DISCOUNT_TIERS[i].discountPercent,
              nextTierLabel: DISCOUNT_TIERS[i].label,
            };
          }
        }
        return null;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        return Math.max(0, subtotal - discount.amount);
      },
    }),
    {
      name: 'cine-euro-cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
