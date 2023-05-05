import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const cartStore = (set) => ({
    cartId: null,
    setCartId: (cartId) => set({ cartId }),
});




const useCartStore = create(
    persist(cartStore, {
        name: 'cart-storage',
    })
);

export default useCartStore;
