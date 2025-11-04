"use client";

import { useEffect, useRef, useMemo } from "react";
import { gsap, ScrollTrigger } from "@/lib/GsapConfig";

export default function TitleText({
  text = "Innovate Boldly",
  isLeft = false,
  baseColor = "white",
  fillColor = "#00fff1",
  fontSize = "4rem",
  mobileFontSize = "2.5rem",
  slideDistance = 200,
}) {
  const textRef = useRef(null);

  // Precompute gradient direction once
  const gradDir = useMemo(() => (isLeft ? "to right" : "to left"), [isLeft]);

  useEffect(() => {
    if (!textRef.current) return;
    const el = textRef.current;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // Desktop (>=768px)
        "(min-width: 768px)": () => {
          const startX = isLeft ? -slideDistance : slideDistance;
          const startBg = isLeft ? "0% 0%" : "100% 0%";
          const endBg = isLeft ? "100% 0%" : "0% 0%";

          gsap.set(el, {
            x: startX,
            backgroundPosition: startBg,
            opacity: 0,
            scale: 0.96,
            willChange: "transform, opacity, background-position",
            fontSize,
          });

          gsap.to(el, {
            x: 0,
            backgroundPosition: endBg,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: `center bottom`,
              end: "center center-=300",
              scrub: 0.4,
            },
          });
        },

        // Mobile (<768px)
        "(max-width: 767px)": () => {
          const mobileDist = slideDistance * 0.5;
          const startX = isLeft ? -mobileDist : mobileDist;
          const startBg = isLeft ? "0% 0%" : "100% 0%";
          const endBg = isLeft ? "100% 0%" : "0% 0%";

          gsap.set(el, {
            x: startX,
            backgroundPosition: startBg,
            opacity: 0,
            scale: 0.95,
            fontSize: mobileFontSize,
          });

          gsap.to(el, {
            x: 0,
            backgroundPosition: endBg,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "center 90%",
              end: "center-=100 top",
              scrub: 0.4,
            },
          });
        },
      });
    }, textRef);

    return () => ctx.revert();
  }, [isLeft, slideDistance, fontSize, mobileFontSize]);

  return (
    <h1
      ref={textRef}
      className="font-bold select-none uppercase w-fit text-center md:text-left tracking-tight"
      style={{
        lineHeight: 0.85,
        backgroundImage: `linear-gradient(${gradDir}, ${fillColor} 50%, ${baseColor} 50%)`,
        backgroundSize: "200% 100%",
        backgroundRepeat: "no-repeat",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {text}
    </h1>
  );
}
