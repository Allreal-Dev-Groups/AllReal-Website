"use client";

import { useEffect, forwardRef, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger } from "@/config/GsapConfig";
import useAssetLoader from "@/hook/useAssetLoader";

const SCROLL_SETTINGS = {
  smooth: true,
  lerp: 0.15,
  direction: "vertical",
  smoothTouch: true,
  touchMultiplier: 1.2,
  gestureDirection: "vertical",
};

const SmoothScroll = forwardRef(({ children, onLenisInit }, ref) => {
  const internalRef = ref || useRef(null);
  const lenisRef = useRef(null);
  const { isLoaded } = useAssetLoader();

  useEffect(() => {
    if (typeof window === "undefined" || !internalRef.current || !isLoaded)
      return;

    // Destroy existing instance if any
    lenisRef.current?.destroy();
    lenisRef.current = null;

    const lenis = new Lenis(SCROLL_SETTINGS);
    lenisRef.current = lenis;

    if (onLenisInit) onLenisInit(lenis);

    // GSAP + Lenis Sync
    const update = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(update);

    lenis.on("scroll", ScrollTrigger.update);

    // Scroller Proxy (IMPORTANT)
    ScrollTrigger.scrollerProxy(internalRef.current, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value) : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isLoaded, onLenisInit]);

  return (
    <main
      ref={internalRef}
      className={`scrollContainer px-5 md:px-[6%] min-w-screen min-h-screen z-50 overflow-y-auto`}
    >
      {children}
    </main>
  );
});

SmoothScroll.displayName = "SmoothScroll";
export default SmoothScroll;
