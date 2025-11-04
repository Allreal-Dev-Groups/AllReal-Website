"use client";

import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "@/lib/GsapConfig"; // make sure ScrollTrigger is registered inside GsapConfig

export default function SubIntroText({ children, className = "" }) {
  const el = useRef(null);

  useEffect(() => {
    if (!el.current) return;

    // Split text into lines
    const split = new SplitType(el.current, {
      types: "lines, words, chars",
      tagName: "span",
    });

    // Animate lines
    gsap.from(split.words, {
      opacity: 0,
      yPercent: 50,
      duration: 1,
      ease: "power1.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: el.current,
        start: "top bottom",
        end: "bottom 70%",
        scrub: true,
      },
    });

    // Cleanup SplitType and GSAP
    return () => {
      split.revert();
      gsap.killTweensOf(split.lines);
    };
  }, []);

  return (
    <div
      ref={el}
      className={`overflow-hidden leading-tight ${className}`}
      animate="" // optional marker for clarity
    >
      {children}
    </div>
  );
}
