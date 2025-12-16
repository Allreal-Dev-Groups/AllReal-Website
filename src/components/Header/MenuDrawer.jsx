"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { navOption, siteConfig } from "@/lib/siteConfig";
import { gsap } from "@/lib/GsapConfig";

export default function MenuDrawer({ isOpen, onToggle }) {
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const socialRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Drawer animation
  useEffect(() => {
    if (!overlayRef.current) return;
    gsap.to(overlayRef.current, {
      y: isOpen ? 0 : "100%",
      borderRadius: isOpen ? "0%" : "50%",
      duration: isOpen ? 0.6 : 0.5,
      ease: isOpen ? "power3.out" : "power3.in",
    });
  }, [isOpen]);

  // Sync refs
  useEffect(() => {
    linksRef.current = linksRef.current.slice(0, navOption.length);
    socialRef.current = socialRef.current.slice(0, 3);
  }, []);

  const handleHover = (index) => {
    if (isMobile) return;
    const linkEl = linksRef.current[index];
    if (!linkEl) return;

    const fillEl = linkEl.querySelector(".fill");
    if (!fillEl) return;

    gsap.to(fillEl, { width: "100%", duration: 0.4, ease: "power3.out" });
    gsap.to(linkEl, { x: 8, duration: 0.4, ease: "power3.out" });
  };

  const handleHoverOut = (index) => {
    if (isMobile) return;
    const linkEl = linksRef.current[index];
    if (!linkEl) return;

    const fillEl = linkEl.querySelector(".fill");
    if (!fillEl) return;

    gsap.to(fillEl, { width: 0, duration: 0.4, ease: "power3.in" });
    gsap.to(linkEl, { x: 0, duration: 0.4, ease: "power3.in" });
  };

  const handleSocialHover = (index) => {
    if (isMobile) return;
    const el = socialRef.current[index];
    if (!el) return;

    gsap.to(el, { y: -4, opacity: 1, duration: 0.3, ease: "power3.out" });
  };

  const handleSocialOut = (index) => {
    if (isMobile) return;
    const el = socialRef.current[index];
    if (!el) return;

    gsap.to(el, { y: 0, opacity: 0.8, duration: 0.3, ease: "power3.in" });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 w-screen h-screen z-100 backdrop-blur-3xl flex flex-col items-center justify-center overflow-x-hidden"
      style={{ transform: "translateY(100%)" }}
    >
      {/* Close Button */}
      <button
        onClick={() => onToggle(false)}
        className="absolute top-[3%] right-[5%] text-4xl font-bold text-white hover:opacity-70 transition"
      >
        ×
      </button>

      {/* Navigation */}
      <div className="relative flex flex-col min-w-[30%] gap-2 md:gap-4 text-center md:text-left z-20">
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
            <span className="fill absolute left-0 top-0 h-full w-0 rounded-br-2xl rounded-tl-2xl bg-[#8637ff] z-0" />
          </Link>
        ))}
      </div>

      {/* Bottom Social Links */}
      <div className="absolute bottom-[6%] flex gap-6 text-sm md:text-base text-gray-400 z-20">
        <a
          href={siteConfig.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          ref={(el) => (socialRef.current[0] = el)}
          onMouseEnter={() => handleSocialHover(0)}
          onMouseLeave={() => handleSocialOut(0)}
          className="uppercase tracking-wide font-bold hover:text-white transition-opacity opacity-60"
        >
          Instagram
        </a>

        <a
          href={siteConfig.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          ref={(el) => (socialRef.current[1] = el)}
          onMouseEnter={() => handleSocialHover(1)}
          onMouseLeave={() => handleSocialOut(1)}
          className="uppercase tracking-wide font-bold hover:text-white transition-opacity opacity-60"
        >
          LinkedIn
        </a>

        <a
          href={siteConfig.socials.youtube}
          target="_blank"
          rel="noopener noreferrer"
          ref={(el) => (socialRef.current[2] = el)}
          onMouseEnter={() => handleSocialHover(2)}
          onMouseLeave={() => handleSocialOut(2)}
          className="uppercase tracking-wide font-bold hover:text-white transition-opacity opacity-60"
        >
          YouTube
        </a>
      </div>
    </div>
  );
}
