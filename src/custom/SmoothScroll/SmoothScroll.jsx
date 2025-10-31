"use client";

import { useEffect, forwardRef, useRef, useImperativeHandle } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger } from "@/config/GsapConfig";
import useLoader from "@/hook/useLoader"; 

const SCROLL_SETTINGS = {
  smooth: true,
  lerp: 0.15,
  direction: "vertical",
  smoothTouch: true,
  touchMultiplier: 1.2,
  gestureDirection: "vertical",
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
};

// Optimization 2: Use React.forwardRef and useImperativeHandle to expose the Lenis instance
const SmoothScroll = forwardRef(({ children, onLenisInit, className = "" }, ref) => {
  const wrapperRef = useRef(null);
  const lenisRef = useRef(null);
  const { isLoaded } = useLoader();

  // Expose the Lenis instance via the ref passed to the component
  useImperativeHandle(ref, () => ({
    get lenis() {
      return lenisRef.current;
    },
    // Optional: Expose methods to control scrolling externally
    scrollTo: (target, options) => lenisRef.current?.scrollTo(target, options),
    // Re-enable/disable scrolling
    start: () => lenisRef.current?.start(),
    stop: () => lenisRef.current?.stop(),
  }));

  useEffect(() => {
    // Optimization 3: Check isLoaded early.
    if (!isLoaded) return;
    
    
    // Destroy existing instance if any
    lenisRef.current?.destroy();
    
    // Initialize Lenis on the root element (document.documentElement/window)
    const lenis = new Lenis(SCROLL_SETTINGS);
    lenisRef.current = lenis;

    if (onLenisInit) onLenisInit(lenis);

    // Use requestAnimationFrame loop to update Lenis (Lenis's default loop)
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    // Optimization 5: Standard GSAP/Lenis Sync using ScrollTrigger.update on Lenis scroll event
    lenis.on("scroll", ScrollTrigger.update);

    // Set up a proxy for ScrollTrigger to listen to Lenis's scroll position
    ScrollTrigger.scrollerProxy(document.body, { // Target the standard scroller (document.body/window)
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value, { immediate: true }) : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // Optimization 6: Add pinType for smooth resizing compatibility
      pinType: document.querySelector(".scrollContainer")?.style.transform ? "transform" : "fixed"
    });


    const onRefresh = () => {
      // Refresh Lenis size whenever ScrollTrigger refreshes (e.g., window resize, content load)
      lenis.resize(); 
    };
    ScrollTrigger.addEventListener("refresh", onRefresh);

    // Initial Refresh: Important to run after Lenis is set up
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      // Removed gsap.ticker.remove(update) as it's not needed with Lenis's internal RAF
      lenis.destroy();
      lenisRef.current = null;
      // Optimization 7: Remove the scroller proxy
      ScrollTrigger.scrollerProxy(document.body, null);
    };
  }, [isLoaded, onLenisInit]);

  return (
    // Optimization 8: Apply styles to the outer wrapper
    <main
      ref={wrapperRef}
      className={`scrollContainer px-5 md:px-[6%] min-w-screen min-h-screen z-50 ${className}`}
    >
      {children}
    </main>
  );
});

SmoothScroll.displayName = "SmoothScroll";
export default SmoothScroll;