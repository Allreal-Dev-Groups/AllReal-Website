import { create } from "zustand";
import gsap from "gsap";

export const useThemeStore = create((set) => ({
  theme: "default",

  setTheme: (newTheme) => {
    const root = document.documentElement;
    gsap.to(root, {
      duration: 0.6,
      opacity: 0,
      onComplete: () => {
        root.setAttribute("data-theme", newTheme);
        gsap.to(root, { opacity: 1, duration: 0.6 });
        set({ theme: newTheme });
      },
    });
  },
}));
