// src/app/layout.jsx
"use client";
import React, { useEffect } from "react";

import Lenis from "@studio-freight/lenis";
import Loader from "../loaders/Loader";
import { useLoader } from "@/store/loaderStore";
import { useThemeStore } from "@/store/themeStore";

export default function RootLayout({ children }) {
  const { isLoaded } = useLoader();
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);


  React.useEffect(() => {
    const lenis = new Lenis({ smooth: true });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      {!isLoaded && <Loader />}
      {isLoaded && children}
    </>
  );
}
