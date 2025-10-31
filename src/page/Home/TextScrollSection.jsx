"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/config/GsapConfig";
import { InfiniteWordScroller } from "@/custom";

export default function TextScrollSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;
    const el = videoRef.current;

    ScrollTrigger.matchMedia({
      "(min-width: 768px)": () => {
        gsap.fromTo(
          el,
          { y: -100, width: "10%", borderRadius: "100rem" },
          {
            y: -100,
            width: "90%",
            borderRadius: "3rem",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "top center",
              scrub: true,
            },
          }
        );
      },
      "(max-width: 767px)": () => {
        gsap.fromTo(
          el,
          { y: -10, width: "30%", borderRadius: "100rem" },
          {
            y: 10,
            width: "60%",
            borderRadius: "1rem",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "top center",
              scrub: true,
            },
          }
        );
      },
    });

    return () => ScrollTrigger.killAll();
  }, []);

  return (
    <section className="h-[200px] md:min-h-screen flex justify-center items-center">
      <div ref={videoRef} className="absolute min-w-screen">
        <InfiniteWordScroller
          words={["HELLO", "WORLD", "EXAMPLE", "TEXT", "EXAMPLE", "EXAMPLE"]}
          direction="right"
          className="text-amber-50"
        />
        <InfiniteWordScroller
          words={["HELLO", "WORLD", "EXAMPLE", "TEXT", "EXAMPLE", "EXAMPLE"]}
          direction="left"
          className="text-[#fc0352]"
        />
      </div>
    </section>
  );
}
