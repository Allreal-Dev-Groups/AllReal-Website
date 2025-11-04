"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/GsapConfig";
import { testimonials } from "@/lib/siteConfig";



export default function Testimonials() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const carouselRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Background parallax
      gsap.to(".bg-glow", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
        },
      });

      // Carousel animation
      const carousel = carouselRef.current;
      const cards = carousel.querySelectorAll(".testimonial-card");

      // Duplicate cards for seamless infinite loop
      const cloneCount = cards.length;
      for (let i = 0; i < cloneCount; i++) {
        const clone = cards[i].cloneNode(true);
        carousel.appendChild(clone);
      }

      const totalCards = carousel.querySelectorAll(".testimonial-card").length;

      const cardWidth = cards[0].offsetWidth + 40; // width + gap
      const totalWidth = totalCards * cardWidth;

      gsap.set(carousel, { width: totalWidth });

      // Create continuous horizontal loop
      const tl = gsap.to(carousel, {
        x: `-${totalWidth / 2}px`,
        duration: 25,
        ease: "none",
        repeat: -1,
      });

      tlRef.current = tl;

      // Pause/resume on hover
      carousel.addEventListener("mouseenter", () => tl.pause());
      carousel.addEventListener("mouseleave", () => tl.play());
    }, sectionRef);

    return () => {
      ctx.revert();
      if (tlRef.current) tlRef.current.kill();
    };
  }, []);

  return (
    <section className="relative overflow-hidden w-full min-h-[500px] md:min-h-[600px]  text-white flex flex-col justify-center items-center">
      <div className="relative overflow-hidden">
        <div
          ref={carouselRef}
          className="flex gap-10 p-3 justify-start items-center will-change-transform"
        >
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="testimonial-card min-w-[200] md:min-w-[560px] min-h-[200px] p-7 rounded-2xl backdrop-blur-2xl border border-gray-800 shadow-lg  transition-all duration-300 group"
            >
              <div className="absolute inset-0  from-amber-500/5 via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl"></div>

              <div className="relative  text-center">
                <p className="text-gray-300 italic mb-6 text-lg leading-relaxed">
                  “{t.text}”
                </p>
                <h3 className="text-xl font-semibold text-[#7400ff]">
                  {t.name}
                </h3>
                <h3 className="text-sx font-medium text-white">
                  {t.role}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
