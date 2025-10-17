"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/config/GsapConfig";

const VideoSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;
    const el = videoRef.current;

    // Use matchMedia for responsive GSAP setup
    ScrollTrigger.matchMedia({
      // ✅ Desktop and tablet (>=768px)
      "(min-width: 768px)": function () {
        gsap.fromTo(
          el,
          {
            y: -150,
            width: "10%",
            borderRadius: "100rem",
          },
          {
            y: -100,
            width: "90%",
            borderRadius: "3rem",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "top center",
              scrub: true,
            },
          }
        );
      },

      // ✅ Mobile (<768px)
      "(max-width: 767px)": function () {
        gsap.fromTo(
          el,
          {
            y: -200,
            width: "30%", // smaller section start
            borderRadius: "100rem",
          },
          {
            y: 10,
            width: "60%", // cover more area on mobile
            borderRadius: "1rem",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "top center",
              scrub: true,
            },
          }
        );
      },
    });

    // Cleanup on unmount
    return () => ScrollTrigger.killAll();
  }, []);

  return (
    <section className="  min-h-screen hidden md:flex justify-center">
      <div
        ref={videoRef}
        className="absolute  transform z-50 shadow-2xl overflow-hidden max-w-[75%] hidden md:block"
        style={{ aspectRatio: "16/9" }}
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
