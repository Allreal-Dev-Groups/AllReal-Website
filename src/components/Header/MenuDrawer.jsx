"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/config/GsapConfig";
import navOption from "@/config/navConfig";
import _BrandData from "@/config/BrandConfig";

export default function MenuDrawer({ isOpen, onToggle }) {
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Slide-up animation
  useEffect(() => {
    if (!overlayRef.current) return;
    gsap.to(overlayRef.current, {
      y: isOpen ? 0 : "100%",
      borderRadius: isOpen ? "0%" : "100%",
      duration: isOpen ? 0.6 : 0.5,
      ease: isOpen ? "power3.out" : "power3.in",
    });
  }, [isOpen]);

  // Initialize refs array
  useEffect(() => {
    linksRef.current = linksRef.current.slice(0, navOption.length);
  }, [navOption]);

  const handleHover = (index) => {
    if (isMobile) return;
    const linkEl = linksRef.current[index];
    const fillEl = linkEl.querySelector(".fill");
    gsap.to(fillEl, { width: "100%", duration: 0.4, ease: "power3.out" });
    gsap.to(linkEl, { x: 8, duration: 0.4, ease: "power3.out" });
  };

  const handleHoverOut = (index) => {
    if (isMobile) return;
    const linkEl = linksRef.current[index];
    const fillEl = linkEl.querySelector(".fill");
    gsap.to(fillEl, { width: 0, duration: 0.4, ease: "power3.in" });
    gsap.to(linkEl, { x: 0, duration: 0.4, ease: "power3.in" });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 w-screen h-screen  z-100 border-[#5e1aff] backdrop-blur-3xl flex flex-col items-center justify-center overflow-hidden"
      style={{ transform: "translateY(100%)" }}
    >
      {/* Close Button */}
      <button
        onClick={() => onToggle(false)}
        className="absolute top-[3%] right-[5%] text-4xl font-bold text-white hover:opacity-70 transition"
      >
        ×
      </button>

      {/* Navigation Items */}
      <div className="relative flex flex-col gap-1 md:gap-4 text-center md:text-left z-20">
        {navOption.map((item, i) => (
          <Link
            key={i}
            href={item.url}
            onClick={() => onToggle(false)}
            ref={(el) => (linksRef.current[i] = el)}
            onMouseEnter={() => handleHover(i)}
            onMouseLeave={() => handleHoverOut(i)}
            className="relative text-3xl md:text-5xl font-bold text-gray-300 overflow-hidden px-4 py-2 inline-block"
          >
            <span className="relative z-10">{item.name}</span>
            <span className="fill absolute left-0 top-0 h-full w-0 bg-[#5e1aff] z-0"></span>
          </Link>
        ))}
      </div>

      {/* Social & Contact Info */}
      <div className="absolute bottom-12 flex flex-col items-center gap-4 text-gray-300 z-20">
        {/* Social Links */}
        <div className="flex gap-6">
          {Object.entries(_BrandData.socialLinks).map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#5e1aff] transition-colors duration-300"
            >
              {name}
            </a>
          ))}
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center text-gray-400 text-sm ">
          <a
            href={`mailto:${_BrandData.email}`}
            className="hover:text-[#5e1aff] transition-colors duration-300"
          >
            {_BrandData.email}
          </a>
          <a
            href={`tel:${_BrandData.phone}`}
            className="hover:text-[#5e1aff] transition-colors duration-300"
          >
            {_BrandData.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
