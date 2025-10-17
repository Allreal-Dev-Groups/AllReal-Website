"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/config/GsapConfig";

export default function CustomCursor({
  innerSize = 10, // exact pointer dot
  outerSize = 30, // trailing circle size
  color = "#d19aed",
  borderWidth = 2,
  smoothness = 0.12, // lower = smoother trail
  hoverScale = 1, // both scale on hover
}) {
  const innerRef = useRef(null);
  const outerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const inner = innerRef.current;
    const outer = outerRef.current;
    if (!inner || !outer) return;

    // Inner (instant follow)
    Object.assign(inner.style, {
      width: `${innerSize}px`,
      height: `${innerSize}px`,
      backgroundColor: color,
      borderRadius: "50%",
      position: "fixed",
      top: "0",
      left: "0",
      pointerEvents: "none",
      zIndex: "9999",
      transform: "translate(-50%, -50%)",
      mixBlendMode: "difference",
      willChange: "transform",
    });

    // Outer (smooth trailing circle)
    Object.assign(outer.style, {
      width: `${outerSize}px`,
      height: `${outerSize}px`,
      border: `${borderWidth}px solid ${color}`,
      borderRadius: "50%",
      position: "fixed",
      top: "0",
      left: "0",
      pointerEvents: "none",
      zIndex: "9998",
      transform: "translate(-50%, -50%)",
      backgroundColor: "transparent",
      mixBlendMode: "difference",
      willChange: "transform",
    });

    // Track mouse
    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Inner follows instantly
      gsap.set(inner, { x: mouse.current.x, y: mouse.current.y });
    };
    window.addEventListener("mousemove", move);

    // Lerp for outer circle
    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const render = () => {
      outerPos.current.x = lerp(outerPos.current.x, mouse.current.x, smoothness);
      outerPos.current.y = lerp(outerPos.current.y, mouse.current.y, smoothness);

      gsap.set(outer, { x: outerPos.current.x, y: outerPos.current.y });

      raf.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", move);
    };
  }, [innerSize, outerSize, color, smoothness, borderWidth]);

  // Hover scaling for elements with .cursor-hover
  useEffect(() => {
    const inner = innerRef.current;
    const outer = outerRef.current;
    const targets = document.querySelectorAll(".cursor-hover");

    targets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(inner, { scale: hoverScale, duration: 0.3, ease: "expo.out" });
        gsap.to(outer, { scale: hoverScale * 1.4, duration: 0.4, ease: "expo.out" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(inner, { scale: 1, duration: 0.3, ease: "expo.out" });
        gsap.to(outer, { scale: 1, duration: 0.4, ease: "expo.out" });
      });
    });

    return () => {
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", () => {});
        el.removeEventListener("mouseleave", () => {});
      });
    };
  }, [hoverScale]);

  return (
    <>
<div className="hidden sm:block" ref={outerRef}></div>
<div className="hidden sm:block" ref={innerRef}></div>
    </>
  );
}
