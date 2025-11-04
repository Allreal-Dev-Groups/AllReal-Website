"use client";

import { gsap } from "@/lib/GsapConfig";
import { useEffect, useRef } from "react";

export default function BlogRecentBox({id, date, title, description, image="/images/sampleblogimg.jpg", nav="/", tags = [] }) {
  const boxRef = useRef(null);

  useEffect(() => {
    if (!boxRef.current) return;

    // Animate on mount
    gsap.from(boxRef.current, {
      opacity: 1,
      y: 50,
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.002,
    });
  }, []);

  return (
    <div
      ref={boxRef}
      className="w-full rounded-2xl overflow-hidden grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-5 mb-8 relative "
    >
      {/* Tag Section */}
      {tags.length > 0 && (
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-teal-500 text-white text-xs md:text-sm px-2 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Image Section */}
      <div className="bg-[#dfcce2] w-full h-60 md:h-auto rounded-2xl flex items-center justify-center overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-2xl"
          />
        ) : (
          <span className="text-teal-50 text-xl md:text-2xl">Image</span>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-10  p-4 md:p-3 rounded-2xl w-full">
        <h2 className="text-sm md:text-xl text-[#dfcce2] font-medium">{date}</h2>
        <a href={`/blog/${id}`} className="pointer-events-auto">
        <h1 className="text-2xl md:text-4xl lg:text-8xl text-[#dfcce2] font-bold mt-2 md:mt-4 pointer-events-auto">
          {title}
        </h1>

        </a>
        <p className="text-sm md:text-lg lg:text-2xl text-[#dfcce2] mt-2 md:mt-4">
          {description}
        </p>
      </div>
    </div>
  );
}
