// src/store/useLoader.js
import { create } from "zustand";

export const useLoader = create((set) => ({
  progress: 0,
  isLoaded: false,
  startLoading: () => set({ isLoaded: true }),
  stopLoading: () => set({ isLoaded: false }),
  setProgress: (v) => set({ progress: v }),
  setLoaded: (v) => set({ isLoaded: v }),
  reset: () => set({ progress: 0, isLoaded: false }),
}));

export { stopLoading, startLoading };
