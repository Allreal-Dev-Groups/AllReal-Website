"use client";

import { gsap, ScrollTrigger } from "@/lib/GsapConfig";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import clsx from "clsx";

export default function IntroText({
  children,
  className = "",
  highlightWords = [], // e.g. ["Healthcare", "Reality"]
}) {
  const el = useRef(null);

  useEffect(() => {
    if (!el.current) return;

    const split = new SplitType(el.current, {
      types: "words",
      tagName: "span",
    });

    // Apply gradient style to highlighted words
    split.words.forEach((word) => {
      const text = word.textContent.trim();
      if (highlightWords.includes(text)) {
        word.classList.add(
          "bg-gradient-to-r",
          "from-blue-500",
          "to-purple-700",
          "bg-clip-text",
          "text-transparent"
        );
      }
    });

    // Animate each word on scroll
    ScrollTrigger.batch(split.words, {
      start: "top 85%",
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { yPercent: 100, opacity: 0, rotateZ: 10 },
          {
            yPercent: 0,
            opacity: 1,
            rotateZ: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.08,
          }
        );
      },
    });

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [highlightWords]);

  return (
    <span
      ref={el}
      className={clsx("inline-block overflow-hidden align-top", className)}
    >
      {children}
    </span>
  );
}
