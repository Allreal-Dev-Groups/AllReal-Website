"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/config/GsapConfig";

export default function TextWordReveal({
  text = "Animate this text word by word",
  className = "",
  duration = 0.5,
  stagger = 0.1,
  startY = 100,
  align = "center",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const el = containerRef.current;
      el.innerHTML = "";
      const words = text.split(" ").map((word) => {
        const span = document.createElement("span");
        span.className = "inline-block mr-2 overflow-hidden";
        span.textContent = word;
        el.appendChild(span);
        return span;
      });

      gsap.from(words, {
        yPercent: startY,
        opacity: 0,
        rotationZ: 5,
        duration: duration,
        ease: "power4.out",
        stagger: stagger,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [text, duration, stagger, startY]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden text-amber-50 w-full ${className}`}
      style={{ textAlign: align }}
    />
  );
}
