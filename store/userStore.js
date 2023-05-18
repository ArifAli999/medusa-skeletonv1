import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const userStore = (set) => ({
    user: null,
    setUser: (user) => set({ user }),
});

const useAuthStore = create(

    persist(userStore, {
        name: 'user-storage',
    })
);


export default useAuthStore;