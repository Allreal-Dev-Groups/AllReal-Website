"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/config/GsapConfig";
import Link from "next/link";

export default function MenuDrawer({ isOpen, onToggle }) {
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  const navItems = [
    { name: "Home", url: "/" },
    { name: "Product Hub", url: "/projects" },
    { name: "Services", url: "/services" },
    { name: "Impact stories", url: "/stories" },
    { name: "Knowledge hub/Insights", url: "/blog" },
    { name: "Join Us", url: "/contact" },
  ];

  const socialLinks = [
    { name: "Twitter", url: "https://twitter.com/username" },
    { name: "LinkedIn", url: "https://linkedin.com/in/username" },
    { name: "Instagram", url: "https://instagram.com/username" },
  ];

  const contactInfo = {
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
  };

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
    linksRef.current = linksRef.current.slice(0, navItems.length);
  }, [navItems]);

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
      className="fixed inset-0 w-screen h-screen  z-[100] border-[#5e1aff] backdrop-blur-3xl flex flex-col items-center justify-center overflow-hidden"
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
      <div className="relative flex flex-col gap-1 md:gap-6 text-center md:text-left z-[20]">
        {navItems.map((item, i) => (
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
            {/* Fill overlay */}
            <span className="fill absolute left-0 top-0 h-full w-0 bg-[#5e1aff] z-0"></span>
          </Link>
        ))}
      </div>

      {/* Social & Contact Info */}
      <div className="absolute bottom-12 flex flex-col items-center gap-4 text-gray-300 z-[20]">
        {/* Social Links */}
        <div className="flex gap-6">
          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#5e1aff] transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center text-gray-400 text-sm mt-2">
          <a
            href={`mailto:${contactInfo.email}`}
            className="hover:text-[#5e1aff] transition-colors duration-300"
          >
            {contactInfo.email}
          </a>
          <a
            href={`tel:${contactInfo.phone}`}
            className="hover:text-[#5e1aff] transition-colors duration-300"
          >
            {contactInfo.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
