"use client";

import { gsap, ScrollTrigger } from "@/config/GsapConfig";
import { useEffect, useRef } from "react";

export default function ContactStrip({
  email = "hello@example.com",
  phone = "+1 (555) 123-4567",
  address = "123 Main St, City, Country",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const topLine = el.querySelector(".contact-line-top");
    const bottomLine = el.querySelector(".contact-line-bottom");
    const items = el.querySelectorAll(".contact-item");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
      },
    });

    // Top line: right → left
    tl.fromTo(
      topLine,
      { scaleX: 0, transformOrigin: "right center" },
      { scaleX: 1, duration: 1, ease: "power3.out" }
    );

    // Bottom line: left → right
    tl.fromTo(
      bottomLine,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 1, ease: "power3.out" },
      "-=0.8"
    );

    // Text fade-in
    tl.fromTo(
      items,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" },
      "-=0.6"
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center text-white"
    >
      {/* Top horizontal line */}
      <div className="contact-line contact-line-top w-full border-t  mb-6"></div>

      {/* Contact content */}
      <div className="flex flex-col md:flex-row items-center justify-between w-3/4 py-8 text-lg md:text-2xl font-semibold text-gray-300">
        <div className="contact-item flex-1 text-center hover:text-[#EC4899] transition-colors duration-300 cursor-pointer">
          <a href={`mailto:${email}`} className="select-none">
            {email}
          </a>
        </div>

        <div className="hidden md:block w-px h-6 bg-neutral-700"></div>

        <div className="contact-item flex-1 text-center hover:text-[#EC4899] transition-colors duration-300 cursor-pointer">
          <a href={`tel:${phone}`} className="select-none">
            {phone}
          </a>
        </div>

        <div className="hidden md:block w-px h-6 bg-neutral-700"></div>

        <div className="contact-item flex-1 text-right hover:text-[#EC4899] transition-colors duration-300 cursor-pointer">
          <span className="select-none">{address}</span>
        </div>
      </div>

      {/* Bottom horizontal line */}
      <div className="contact-line contact-line-bottom w-full border-t  mt-6"></div>
    </div>
  );
}
