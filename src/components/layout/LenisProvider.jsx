"use client";

import { useEffect, forwardRef, useRef, useImperativeHandle } from "react";
import Lenis from "@studio-freight/lenis";
import { useLoader } from "@/store/loaderStore";
import { ScrollTrigger } from "@/lib/GsapConfig";
import { SCROLL_SETTINGS } from "@/lib/siteConfig";

const LenisProvider = forwardRef(
  ({ children, onLenisInit, className = "" }, ref) => {
    const wrapperRef = useRef(null);
    const lenisRef = useRef(null);
    const { isLoaded } = useLoader();

    useImperativeHandle(ref, () => ({
      get lenis() {
        return lenisRef.current;
      },

      scrollTo: (target, options) =>
        lenisRef.current?.scrollTo(target, options),
      start: () => lenisRef.current?.start(),
      stop: () => lenisRef.current?.stop(),
    }));

    useEffect(() => {
      if (!isLoaded) return;
      lenisRef.current?.destroy();
      const lenis = new Lenis(SCROLL_SETTINGS);
      lenisRef.current = lenis;

      if (onLenisInit) onLenisInit(lenis);

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      lenis.on("scroll", ScrollTrigger.update);
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          return arguments.length
            ? lenis.scrollTo(value, { immediate: true })
            : lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: document.querySelector(".scrollContainer")?.style.transform
          ? "transform"
          : "fixed",
      });

      const onRefresh = () => {
        lenis.resize();
      };
      ScrollTrigger.addEventListener("refresh", onRefresh);
      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.removeEventListener("refresh", onRefresh);
        lenis.destroy();
        lenisRef.current = null;
        ScrollTrigger.scrollerProxy(document.body, null);
      };
    }, [isLoaded, onLenisInit]);

    return (
      <main
        ref={wrapperRef}
        className={` px-5 md:px-[6%] min-w-screen min-h-screen ${className}`}
      >
        {children}
      </main>
    );
  }
);

LenisProvider.displayName = "LenisProvider";
export default LenisProvider;
