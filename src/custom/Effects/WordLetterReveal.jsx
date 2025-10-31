"use client";

import { useEffect, useRef, useMemo } from "react";
import { gsap, ScrollTrigger } from "@/config/GsapConfig";

export default function WordLetterReveal({
  text = "Animate this text word by word and letter by letter",
  className = "",
  startColor = "#5e1aff",
  endColor = "#ffff",
  startY = "1rem",
  endY = "0rem",
  duration = 0.6,
  stagger = 0.05,
  ease = "power2.out",
  once = true,
  delay = 0.3,
  highlights = [],
}) {
  const textRef = useRef(null);

  const textStructure = useMemo(() => {
    // Split on one or more whitespace characters
    const words = text.split(/\s+/g);
    const elements = [];
    let i = 0;

  
    const getHighlight = (index) => {
      for (const h of highlights) {
        const phraseWords = h.phrase.split(/\s+/g);
        const currentSlice = words.slice(index, index + phraseWords.length).join(" ");
        if (currentSlice === h.phrase) {
          return { color: h.color, length: phraseWords.length };
        }
      }
      return null;
    };

    while (i < words.length) {
      const highlight = getHighlight(i);
      const wordCount = highlight ? highlight.length : 1;
      const finalColor = highlight ? highlight.color : endColor;
      const isGradient = finalColor.startsWith("linear-gradient");

      // Group words in the phrase
      const wordContent = words.slice(i, i + wordCount).join(" ");

      const wordSpan = (
        <span
          key={`word-${i}`}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            marginRight: i + wordCount < words.length ? "0.35em" : "0", 
          }}
        >
          {wordContent.split("").map((char, charIndex) => {
            // --- FIX PART 1: Use data-color to store the target color/gradient ---
            const finalColorStyle = isGradient 
              ? {
                  backgroundImage: finalColor,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent", // Final state for gradient text is transparent
                }
              : {
                  color: finalColor, // Final state for solid color
                };

            return (
              <span 
                key={`char-${i}-${charIndex}`}
              
                data-final-color={finalColor} 
                style={{
                    display: "inline-block",
                    ...finalColorStyle, // Apply final styles to the element
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      );

      elements.push(wordSpan);
      i += wordCount;
    }

    return elements;
  }, [text, endColor, highlights]);


  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    // Select all letter spans
    const letters = el.querySelectorAll("h1 > span > span");
    if (letters.length === 0) return;

    const ctx = gsap.context(() => {

        const colorTargets = [];

        letters.forEach((letter) => {
            const finalColorString = letter.getAttribute("data-final-color");
            const isGradient = finalColorString.startsWith("linear-gradient");

            // Set the initial state for the letters
            gsap.set(letter, { 
                y: startY, 
                opacity: 0.1, 
                // All letters start with the startColor (solid)
                color: startColor 
            });

            colorTargets.push(
                isGradient ? 
                { color: "transparent" } :
                { color: finalColorString } 
            );
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
            color: (i) => colorTargets[i].color,
        });

    }, textRef);

    return () => {
        ctx.revert();
    };
  }, [textStructure, startColor, startY, endY, duration, stagger, ease, once, delay]);


  return (
    <div className="flex items-center justify-center">
      <h1
        ref={textRef}
        className={`font-extrabold tracking-tight text-center leading-tight ${className}`}
        style={{ lineHeight: "1.25" }}
      >
        {textStructure}
      </h1>
    </div>
  );
}