"use client";

import { ScrollTrigger, gsap } from "@/lib/GsapConfig";
import { useRef, useEffect } from "react";

const VideoSection = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const ctx = gsap.context(() => {
      // Desktop animation only
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          gsap.fromTo(
            el,
            {
              y: -400,
              width: "12%",
              borderRadius: "100rem",
            },
            {
              y: -100,
              width: "90%",
              borderRadius: "3rem",
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            }
          );
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="hidden md:hidden lg:flex min-h-screen justify-center items-start pt-40 md:pt-60 relative"
    >
      <div
        ref={videoRef}
        className="absolute z-50 shadow-2xl overflow-hidden max-w-[70%] transform"
        style={{
          aspectRatio: "16/9",
          willChange: "transform, width, border-radius",
        }}
      >
        <video
          src="./videos/Machenn_Portfolio_Video.mp4"
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
