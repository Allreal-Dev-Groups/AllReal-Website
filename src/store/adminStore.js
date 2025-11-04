// src/store/useLoader.js
import { create } from "zustand";

export const useAdmin = create((set) => ({
  isAdmin: false,
  setAdmin: (v) => set({ isAdmin: v }),
}));