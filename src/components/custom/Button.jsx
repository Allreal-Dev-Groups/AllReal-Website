"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/GsapConfig";

export default function Button({
  name,
  className = "",
  onClick,
  ...props
}) {
  const btnRef = useRef(null);

  useEffect(() => {
    if (!btnRef.current) return;
    const el = btnRef.current;

    gsap.fromTo(
      el,
      { opacity: 0, y: 200, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "none",
        duration: 1,
      }
    );

    // Hover animation
    const handleEnter = () => {
      gsap.to(el, {
        scale: 1.08,
        borderColor: "#00fff1",
        boxShadow: "0 0 25px rgba(0, 255, 241, 0.4)",
        duration: 0.3,
        ease: "none",
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        scale: 1,
        borderColor: "#ffffff",
        boxShadow: "0 0 0px rgba(0, 255, 241, 0)",
        duration: 0.3,
        ease: "none",
      });
    };

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  if (!name) return null;

  return (
    <button
      ref={btnRef}
      className={`relative w-[150px] h-[60px] border border-white rounded-full bg-transparent text-white text-lg font-semibold tracking-wide overflow-hidden  ${className}`}
      onClick={onClick}
      {...props}
    >
      <span className="relative z-10">{name}</span>
      <span className="absolute inset-0 bg-linear-to-r from-[#00fff155] to-transparent opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-full" />
    </button>
  );
}
