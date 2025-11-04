// src/components/loaders/PageLoader.jsx
"use client";
import React, { useEffect } from "react";
import { preloadAssets } from "@/utils/preloadAssets";

import { gsap } from "gsap";
import { assets } from "@/lib/siteConfig";
import { useLoader } from "@/store/loaderStore";

export default function Loader() {
  const { progress, setProgress, isLoaded, setLoaded } = useLoader();

  useEffect(() => {
    preloadAssets(assets, setProgress, 2000).then(() => {
      setLoaded(true);
      gsap.to(".loader-wrapper", {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
      });
    });
  }, []);

  return (
    <div className="loader-wrapper fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-9999">
      <p className="text-lg font-semibold tracking-wider">Loading...</p>
      <div className="w-64 h-1 bg-gray-700 mt-4 relative">
        <div
          className="absolute left-0 top-0 h-full bg-white"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="mt-2 text-sm opacity-80">{progress}%</span>
    </div>
  );
}
