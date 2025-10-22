"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/config/GsapConfig";

export default function BlogGridBox({ date, title, description, image, tags = [] }) {
  const boxRef = useRef(null);

  useEffect(() => {
    if (!boxRef.current) return;
    gsap.fromTo(
      boxRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <div
      ref={boxRef}
      className="w-full rounded-2xl overflow-hidden flex flex-col bg-tr min-h-[600px] shadow-lg transform-gpu backdrop-blur-2xl"
    >
      {/* Image */}
      <div className="bg-[#dfcce2] w-full min-h-[300px] rounded-2xl rounded-b-none flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover rounded-2xl" />
        ) : (
          <span className="text-[#dfcce2] text-xl md:text-2xl">Image</span>
        )}
      </div>

      {/* Tags (always rendered for SSR consistency) */}
      <div className="flex flex-wrap gap-2 pl-6 pt-4">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-white text-xs md:text-sm px-2 py-1 rounded-full font-medium bg-amber-700"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between h-full p-6">
        <h2 className="text-sm md:text-xl text-[#dfcce2] font-medium">{date}</h2>
        <h1 className="text-xl md:text-2xl lg:text-4xl text-[#dfcce2] font-bold mt-2 md:mt-4">{title}</h1>
        <p className="text-sm md:text-lg lg:text-xl text-[#dfcce2] mt-2 md:mt-4">{description}</p>
      </div>
    </div>
  );
}
