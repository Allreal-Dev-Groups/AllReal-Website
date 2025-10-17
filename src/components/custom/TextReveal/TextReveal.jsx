"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/config/GsapConfig";

export default function WordLetterReveal({
  text = "Animate this text word by word and letter by letter",
  className = "",
  startColor = "#5e1aff",
  endColor = "linear-gradient(to bottom left, #4d13db, #ffdeff)",
  startY = "1rem",
  endY = "0rem",
  duration = 0.6,
  stagger = 0.05,
  ease = "power2.out",
  once = true,
  delay = 0.3,
}) {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    // Rebuild text safely
    el.innerHTML = "";

    const words = text.split(" ").map((word) => {
      const wordWrapper = document.createElement("span");
      Object.assign(wordWrapper.style, {
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "bottom",
        marginRight: "0.35em",
      });

      for (const char of word) {
        const letter = document.createElement("span");
        letter.textContent = char;
        Object.assign(letter.style, {
          display: "inline-block",
          willChange: "transform, opacity",
          backgroundImage: endColor.startsWith("linear-gradient")
            ? endColor
            : "none",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: endColor.startsWith("linear-gradient")
            ? "transparent"
            : endColor,
        });
        wordWrapper.appendChild(letter);
      }

      el.appendChild(wordWrapper);
      return wordWrapper;
    });

    const letters = el.querySelectorAll("span span");

    gsap.set(letters, {
      y: startY,
      opacity: 0.1,
      color: startColor,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: once ? "play none none none" : "play none none reverse",
        once,
      },
    });

    tl.to(letters, {
      y: endY,
      opacity: 1,
      duration,
      stagger,
      ease,
      delay,
      color: endColor.startsWith("linear-gradient") ? "transparent" : endColor,
      onUpdate: () => {
        if (endColor.startsWith("linear-gradient")) {
          letters.forEach((l) => {
            l.style.backgroundImage = endColor;
          });
        }
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [
    text,
    startColor,
    endColor,
    startY,
    endY,
    duration,
    stagger,
    ease,
    once,
    delay,
  ]);

  return (
    <div className="flex items-center justify-center">
      <h1
        ref={textRef}
        className={`font-extrabold tracking-widest text-center  leading-tight ${className}`}
        style={{
          whiteSpace: "pre-wrap",
          lineHeight: "1.25",
        }}
      />
    </div>
  );
}
