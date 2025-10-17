"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { gsap,ScrollTrigger } from "@/config/GsapConfig";



export default function TextFillSlide({
  text = "Innovate Boldly",
  isLeft = false,
  baseColor = "white",
  fillColor = "#EC4899",
  fontSize = "4rem",
  mobileFontSize = "2.5rem",
  triggerOffset = "80%",
  slideDistance = 200,
}) {
  const textRef = useRef(null);
  const [computedFontSize, setComputedFontSize] = useState(fontSize);

  const gradDir = useMemo(() => (isLeft ? "to right" : "to left"), [isLeft]);

  // Responsive font
  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateFont = () => {
      setComputedFontSize(window.innerWidth < 768 ? mobileFontSize : fontSize);
    };
    updateFont();
    window.addEventListener("resize", updateFont);
    return () => window.removeEventListener("resize", updateFont);
  }, [fontSize, mobileFontSize]);

  useEffect(() => {
    if (!textRef.current) return;
    const ctx = gsap.context(() => {
      const el = textRef.current;

      const startBg = isLeft ? "0% 0%" : "100% 0%";
      const endBg = isLeft ? "100% 0%" : "0% 0%";
      const startX = isLeft ? -slideDistance : slideDistance;

      gsap.set(el, {
        x: startX,
        backgroundPosition: startBg,
        opacity: 0,
        scale: 0.95,
        willChange: "transform, opacity, background-position",
      });

      gsap.to(el, {
        x: 0,
        backgroundPosition: endBg,
        opacity: 1,
        scale: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: `center ${triggerOffset}`,
          end: `center-=300 top`,
          scrub: 0.3,
        },
      });
    }, textRef);

    return () => ctx.revert();
  }, [isLeft, slideDistance, triggerOffset]);

  return (
    <h1
      ref={textRef}
      className="font-bold select-none uppercase w-fit text-center md:text-left"
      style={{
        fontSize: computedFontSize,
        lineHeight: 0.9,
        backgroundImage: `linear-gradient(${gradDir}, ${fillColor} 50%, ${baseColor} 50%)`,
        backgroundSize: "240% 100%",
        backgroundRepeat: "no-repeat",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {text}
    </h1>
  );
}
