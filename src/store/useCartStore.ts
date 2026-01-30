import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    size: string;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string, size: string) => void;
    updateQuantity: (id: string, size: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => set((state) => {
                const existingItem = state.items.find(i => i.id === item.id && i.size === item.size);
                if (existingItem) {
                    return {
                        items: state.items.map(i =>
                            i.id === item.id && i.size === item.size
                                ? { ...i, quantity: i.quantity + item.quantity }
                                : i
                        )
                    };
                }
                return { items: [...state.items, item] };
            }),
            removeItem: (id, size) => set((state) => ({
                items: state.items.filter(i => !(i.id === id && i.size === size))
            })),
            updateQuantity: (id, size, quantity) => set((state) => ({
                items: state.items.map(i =>
                    i.id === id && i.size === size ? { ...i, quantity } : i
                )
            })),
            clearCart: () => set({ items: [] }),
            totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }),
        { name: 'tooni-wear-cart' }
    )
);
