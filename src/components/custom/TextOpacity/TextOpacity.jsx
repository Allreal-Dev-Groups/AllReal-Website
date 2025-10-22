"use client";

import { gsap, SplitText } from "@/config/GsapConfig";
import { useEffect, useRef } from "react";

export default function TextOpacity({ text, className = "", duration = 3, stagger = 0.05 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    document.fonts.ready.then(() => {
      gsap.set(containerRef.current, { opacity: 1 });

      const split = SplitText.create(containerRef.current, { type: "words", aria: "hidden" });

      gsap.from(split.words, {
        opacity: 0,
        y: 10,           // smaller vertical motion
        scale: 0.98,     // slight scale for smoothness
        duration: duration,
        ease: "power2.out",
        stagger: stagger,
      });
    });
  }, [text, duration, stagger]);

  return (
    <div ref={containerRef} className={`animate-me ${className}`}>
      {text}
    </div>
  );
}
