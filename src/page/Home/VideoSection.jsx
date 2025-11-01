"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/config/GsapConfig";

const VideoSection = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null); 

  useEffect(() => {
    const el = videoRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const ctx = gsap.context(() => {
      const createScrollAnimation = (config) => {
        gsap.fromTo(
          el,
          {
            y: config.startY,
            width: config.startWidth,
            borderRadius: config.startRadius,
          },
          {
            y: config.endY,
            width: config.endWidth,
            borderRadius: config.endRadius,
            ease: "none", 
            scrollTrigger: {
              trigger: container,
              start: "top bottom", 
              end: "top center", 
              scrub: true,
            },
          }
        );
      };

    
      ScrollTrigger.matchMedia({
        // Desktop and tablet (>=768px)
        "(min-width: 768px)": function () {
          createScrollAnimation({
            startY: -350,
            startWidth: "12%",
            startRadius: "100rem",
            endY: -100,
            endWidth: "90%",
            endRadius: "3rem",
          });
          return () => {};
        },

      });
    }, containerRef); 

    return () => {
      ctx.revert();
    };
  }, []); 

  return (

    <section
      ref={containerRef} // Attach the container ref
      className="min-h-screen hidden md:flex justify-center items-start pt-40 md:pt-60 relative "
    >
      <div
        ref={videoRef}
        className="absolute transform z-50 shadow-2xl overflow-hidden max-w-[75%]"
        style={{
          aspectRatio: "16/9",
          willChange: "transform, width, border-radius",
        }} // Hint for browser
      >
        <video
          src="./assets/videos/sample.mp4"
          muted
          playsInline
          loop
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default VideoSection;
