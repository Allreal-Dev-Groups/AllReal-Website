"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/GsapConfig";
import { useRouter } from "next/navigation";


export default function BlogBox({
  _id,
  title,
  contentHtml,
  description,
  bannerImageUrl,
  tags = [],
  createdAt,
  updatedAt,
  isAdmin=false
}) {

 
  const boxRef = useRef(null);
  const router = useRouter();

  console.log(isAdmin)
  // ✅ Check admin cookie


  // ✅ GSAP appear animation
  useEffect(() => {
    if (!boxRef.current) return;
    gsap.fromTo(
      boxRef.current,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
        clearProps: "all",
      }
    );
  }, []);

  // ✅ Navigation handler
  const handleNavigate = () => {
    router.push(`/blog/${_id}`);
  };

  // ✅ Delete blog handler
  const handleDelete = async (e) => {
    e.stopPropagation(); // prevent routing on click
    const confirmDelete = window.confirm(`Delete blog "${title}"?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/blogs/${_id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete blog");

      // Smooth removal animation
      gsap.to(boxRef.current, {
        opacity: 0,
        y: -20,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => boxRef.current.remove(),
      });
    } catch (err) {
      console.error(err);
      alert("Error deleting blog. Check console for details.");
    }
  };

  return (
    <article
      ref={boxRef}
      onClick={handleNavigate}
      className="group relative w-full flex flex-col bg-[#151515]/60 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-lg hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-1 transform-gpu min-h-[420px] cursor-pointer"
    >
      {/* ✅ Delete Button (Admin Only) */}
      {isAdmin && (
        <button
          onClick={handleDelete}
          className="absolute top-3 left-3 z-20 bg-red-600/80 text-white px-3 py-1 text-xs md:text-sm rounded-md hover:bg-red-700/90 transition-colors"
        >
          Delete
        </button>
      )}

      {/* Banner Image */}
      <div className="relative w-full h-64 md:h-[300px] overflow-hidden bg-[#2b2b2b] flex items-center justify-center">
        {bannerImageUrl ? (
          <img
            src={bannerImageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <span className="text-amber-100/40 text-lg md:text-xl font-medium tracking-wide">
            No Image
          </span>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 px-6 pt-4">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs md:text-sm px-3 py-1 rounded-full font-medium bg-pink-700/80 text-white tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col justify-between p-6 pb-8">
        <h2 className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">
          {createdAt}
        </h2>
        <h1 className="text-lg md:text-2xl lg:text-3xl text-[#dfcce2] font-bold mt-3 line-clamp-2">
          {title}
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-gray-300 mt-3 line-clamp-3 leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
}
