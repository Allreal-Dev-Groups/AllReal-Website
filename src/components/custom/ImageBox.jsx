"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/GsapConfig";
import { SubIntroText } from "./Effects";

export default function ImageBox({
  image = "/images/sampleblogimg.jpg",
  title = "Transforming Possibilities",
  text = "We build immersive experiences that bridge innovation and human empathy through advanced mixed reality technology.",
  reverse = false, // toggle layout
}) {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 50%",
          scrub: 1,
        },
      });

      // Image animation
      tl.fromTo(
        imgRef.current,
        {
          x: reverse ? 150 : -150,
          opacity: 0,
          rotateZ: reverse ? 10 : -10,
          scale: 1.1,
        },
        {
          x: 0,
          opacity: 1,
          rotateZ: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        0
      );

      // Text animation
      tl.fromTo(
        textRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        0.2
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reverse]);

  return (
    <div
      ref={sectionRef}
      className={`w-full min-h-fit my-10 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 px-6 md:px-20 `}
    >
      {/* Image Side */}
      <div
        ref={imgRef}
        className={`relative w-full md:w-1/2 h-[150px] sm:h-[350px] md:h-[350px] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 ease-out ${
          reverse
            ? "md:order-last md:ml-10" // image on right for desktop
            : "md:order-first md:mr-10" // image on left for desktop
        }`}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full  object-cover object-center rounded-3xl"
          style={{
            filter: "brightness(90%) contrast(110%)",
          }}
        />
      </div>

      {/* Text Side */}
      <div
        ref={textRef}
        className={`w-full md:w-1/2 flex flex-col ${
          reverse
            ? "items-start text-left md:pl-10"
            : "items-end text-right md:pr-10"
        }`}
      >
        <SubIntroText className="text-3xl sm:text-4xl md:text-4xl font-bold text-[#00E0FF] mb-4 md:mb-6 leading-tight">
          {title}
        </SubIntroText>
        <SubIntroText className="text-base sm:text-lg md:text-2xl text-gray-200 md:max-w-[90%] leading-relaxed">
          {text}
        </SubIntroText>
      </div>
    </div>
  );
}
