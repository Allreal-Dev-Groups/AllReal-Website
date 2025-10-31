"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { gsap, ScrollTrigger } from "@/config/GsapConfig";

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
  
  // Optimization 1: Combine responsive font size into a single useMemo/useEffect block
  const [currentFontSize, setCurrentFontSize] = useState(fontSize);

  // Determine the gradient direction once
  const gradDir = useMemo(() => (isLeft ? "to right" : "to left"), [isLeft]);

  // Optimization 2: Use GSAP's matchMedia for combined responsive logic
  useEffect(() => {
    // Determine the initial font size based on current window width
    const setInitialFontSize = () => {
      setCurrentFontSize(window.innerWidth < 768 ? mobileFontSize : fontSize);
    };
    setInitialFontSize();

    // Attach resize listener for immediate font update
    window.addEventListener("resize", setInitialFontSize);
    
    // --- GSAP Animation Setup ---
    if (!textRef.current) return;
    const el = textRef.current;
    
    // Use gsap.context for robust cleanup
    const ctx = gsap.context(() => {

        const desktopConfig = {
            startX: isLeft ? -slideDistance : slideDistance,
            startBg: isLeft ? "0% 0%" : "100% 0%",
            endBg: isLeft ? "100% 0%" : "0% 0%",
            triggerStart: `center ${triggerOffset}`,
            triggerEnd: "center-=300 top", // Use a specific, consistent end point
        };
        
        // Optimization 3: Use matchMedia to manage responsive GSAP properties
        ScrollTrigger.matchMedia({
          // Desktop (>=768px)
          "(min-width: 768px)": function () {
            gsap.set(el, {
              x: desktopConfig.startX,
              backgroundPosition: desktopConfig.startBg,
              opacity: 0,
              scale: 0.95,
              willChange: "transform, opacity, background-position",
            });

            gsap.to(el, {
              x: 0,
              backgroundPosition: desktopConfig.endBg,
              opacity: 1,
              scale: 1,
              ease: "power1.out",
              scrollTrigger: {
                trigger: el,
                start: desktopConfig.triggerStart,
                end: desktopConfig.triggerEnd,
                scrub: 0.3,
              },
            });
          },

          // Mobile (<768px)
          "(max-width: 767px)": function () {
            // Use smaller values for mobile for a tighter effect
            const mobileSlideDistance = slideDistance * 0.5; 
            const mobileStartX = isLeft ? -mobileSlideDistance : mobileSlideDistance;

            gsap.set(el, {
              x: mobileStartX,
              backgroundPosition: desktopConfig.startBg,
              opacity: 0,
              scale: 0.95,
              willChange: "transform, opacity, background-position",
            });

            gsap.to(el, {
              x: 0,
              backgroundPosition: desktopConfig.endBg,
              opacity: 1,
              scale: 1,
              ease: "power1.out",
              scrollTrigger: {
                trigger: el,
                // Adjust trigger offset for better mobile UX
                start: `center 90%`, 
                end: `center-=100 top`,
                scrub: 0.3,
              },
            });
          },
        });
        
    }, textRef);

    // Cleanup: Remove GSAP context and the resize listener
    return () => {
      ctx.revert();
      window.removeEventListener("resize", setInitialFontSize);
    }
  }, [isLeft, slideDistance, triggerOffset, fontSize, mobileFontSize]);

  return (
    <h1
      ref={textRef}
      className="font-bold select-none uppercase w-fit text-center md:text-left"
      style={{
        fontSize: currentFontSize,
        lineHeight: 0.9,
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