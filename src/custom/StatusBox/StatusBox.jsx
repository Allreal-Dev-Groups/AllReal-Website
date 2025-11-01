"use client";

import { gsap, ScrollTrigger } from "@/config/GsapConfig";
import { useRef, useEffect } from "react";

export default function StatusBox({
  number = 0,
  label = "Label",
  bgColor = "linear-gradient(to bottom right, #111, #222)",
  hoverBg = "rgba(221,53,0,0.9)",
  numberColor = "#ffffff",
  hoverNumberColor = "#ffffff",
  animationSide = "left", // "left" or "right"
  className="",
}) {
  const boxRef = useRef(null);
  const numberRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!boxRef.current || !numberRef.current || !labelRef.current) return;

    const fromX = animationSide === "left" ? "-120%" : "120%";
    const fromRot = animationSide === "left" ? "-25deg" : "25deg";

    // Entrance animation
    gsap.fromTo(
      boxRef.current,
      { x: fromX, rotation: fromRot, opacity: 0, y: 50 },
      {
        x: 0,
        rotation: 0,
        opacity: 1,
        y: 0,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Number animation on scroll
    gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top center",
          end:"bottom center",
     
          onEnter: () => {
            gsap.to(
              { val: 0 },
              {
                val: number,
                duration: 1.2,
                ease: "power1.out",
                onUpdate: function () {
                  numberRef.current.innerText =
                    Math.floor(this.targets()[0].val) +
                    (number > 0 && number < 100 ? "+" : "");
                },
              }
            );
          },
        },
      }
    );

    // Hover effects
    const boxEl = boxRef.current;
    const numEl = numberRef.current;
    const lblEl = labelRef.current;

    const handleMouseEnter = () => {
      gsap.to(boxEl, { background: hoverBg, duration: 0.5 });
      gsap.to(numEl, { color: hoverNumberColor, duration: 0.5 });
      gsap.to(lblEl, { color: hoverNumberColor, duration: 0.5 });
    };

    const handleMouseLeave = () => {
      gsap.to(boxEl, { background: bgColor, duration: 0.5 });
      gsap.to(numEl, { color: numberColor, duration: 0.5 });
      gsap.to(lblEl, { color: "#d1d5db", duration: 0.5 });
    };

    boxEl.addEventListener("mouseenter", handleMouseEnter);
    boxEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      boxEl.removeEventListener("mouseenter", handleMouseEnter);
      boxEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [animationSide, number, bgColor, hoverBg, numberColor, hoverNumberColor]);

  return (
    <div
      ref={boxRef}
      className={`relative border border-white/10 rounded-3xl backdrop-blur-2xl shadow-2xl h-full min-h-[150px] md:min-h-[250px] flex flex-col justify-between sm:items-center pointer-events-auto ${className}`}
      style={{ background: bgColor }}
    >
      <div
        ref={numberRef}
        className="absolute top-6 left-6 text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white"
        style={{ color: numberColor }}
      ></div>
      <div
        ref={labelRef}
        className="absolute bottom-6 right-6 text-base md:text-3xl lg:text-3xl font-medium uppercase text-right select-none text-gray-300"
      >
        {label}
      </div>
    </div>
  );
}
