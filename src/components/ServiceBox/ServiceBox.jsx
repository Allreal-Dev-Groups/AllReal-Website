"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/config/GsapConfig";

export default function ServiceBoxes({ boxes }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const boxEls = containerRef.current.querySelectorAll(".service-box");

    gsap.fromTo(
      boxEls,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        stagger: {
          each: 0.3, // stagger time between boxes
          ease: "power3.out",
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // when the top of container hits 80% of viewport
          end: "bottom 80%",
          scrub: 1, // ties animation to scroll for smoothness
        },
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {boxes.map((box, i) => (
        <div
          key={i}
          className="service-box flex flex-col border-amber-50/10 border-2 justify-between md:bg-transparent rounded-2xl p-6 min-h-[180px] md:min-h-[300px] md:backdrop-blur-2xl shadow-xl text-center"
          style={{ background: box.bgColor }}
          onMouseEnter={(e) => (e.currentTarget.style.background = box.hoverBg)}
          onMouseLeave={(e) => (e.currentTarget.style.background = box.bgColor)}
        >
          <h3 className="text-lg sm:text-xl sm:p-2 md:text-2xl font-bold text-gray-300">
            {i+1}
          </h3>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-pink-600">
            {box.title}
          </h3>
          <p className="mt-auto text-sm sm:text-base text-gray-300 text-justify">
            {box.description}
          </p>
        </div>
      ))}
    </div>
  );
}
