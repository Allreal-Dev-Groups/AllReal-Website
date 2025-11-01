"use client";
import { useEffect, useRef } from "react";

import useLoader from "@/hook/useLoader";
import { gsap } from "@/config/GsapConfig";



export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);

  const { progress, isLoaded } = useLoader();

  // Animate number
  useEffect(() => {
    gsap.to(progressRef.current, {
      innerText: progress,
      snap: { innerText: 1 },
      duration: 0.3,
      ease: "power1.out",
    });
  }, [progress]);

  // Animate exit
  useEffect(() => {
    if (isLoaded) {
      gsap.to(loaderRef.current, {
        yPercent: +100,
        borderRadius: "100%",
        duration: 1.2,
        ease: "power4.inOut",
        onComplete,
      });
    }
  }, [isLoaded, onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-9999 bg-[#0c091c] text-[#5e1aff]   flex flex-col items-center justify-center min-h-screen min-w-screen"
    >
      <h1 className="text-xl uppercase mb-4">Loading...</h1>
      <div className="text-5xl font-bold" ref={progressRef}>
        0
      </div>
      <span className="text-lg mt-1">%</span>
    </div>
  );
}
