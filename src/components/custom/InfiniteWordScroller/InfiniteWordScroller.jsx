"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/config/GsapConfig";

export default function InfiniteWordScroller({
  words = ["CREATIVE", "AWARDS", "PROJECTS", "EXPERIENCE", "Test", "Test1"],
  speed = 50,
  className = "",
  direction = "left", // "left" or "right"
}) {
  const rowRef = useRef(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    // Duplicate words for seamless loop
    const allWords = [...words, ...words];
    row.innerHTML = ""; // clear any existing
    allWords.forEach((word) => {
      const span = document.createElement("span");
      span.className = "inline-block";
      span.textContent = word;
      row.appendChild(span);
    });

    const totalWidth = row.scrollWidth / 2;
    const xTarget = direction === "left" ? -totalWidth : totalWidth;
    const modifierFn =
      direction === "left"
        ? (x) => `${parseFloat(x) % -totalWidth}px`
        : (x) => `${(parseFloat(x) % totalWidth) - totalWidth}px`;

    // GSAP infinite scroll
    gsap.to(row, {
      x: xTarget,
      duration: totalWidth / speed,
      ease: "linear",
      repeat: -1,
      modifiers: { x: modifierFn },
    });
  }, [words, direction, speed]);

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={rowRef}
        className={`flex whitespace-nowrap gap-12 text-6xl md:text-9xl font-bold uppercase cursor-default ${className}`}
      />
    </div>
  );
}
