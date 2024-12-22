import { create } from 'zustand';
import { Product, ProductItem } from '@/types';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'react-hot-toast';

interface CartStore {
  items: ProductItem[];
  quantity: number;
  addItem: (data: ProductItem) => void;
  updateQuantity: (id: string, type: string) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      quantity: 1,
      addItem: (data: ProductItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);
        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === data.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...currentItems, { ...data, quantity: 1 }],
          });
        }
        toast.success('Item added to cart.');
      },

      updateQuantity: (id: string, type: string) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === id);
        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: Math.max(
                      1,
                      type === 'plus' ? item.quantity + 1 : item.quantity - 1
                    ),
                  }
                : item
            ),
          });
        }
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success('Item removed from cart.');
      },
      removeAll: () => set({ items: [], quantity: 0 }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
