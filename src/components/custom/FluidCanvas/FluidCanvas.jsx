"use client";

import useAssetLoader from "@/hook/useAssetLoader";
import useFluidSimulation from "@/hook/useFluidSimulation";
import { useEffect } from "react";

export default function FluidCanvas() {
  const { isLoaded } = useAssetLoader();
  const { triggerPoint, containerRef } = useFluidSimulation({ random: false });

  useEffect(() => {
    if (!isLoaded) return;
    triggerPoint({ x: 0.2, y: 1, idx: -100, idy: 1100 });
    triggerPoint({ x: 0.5, y: 1, idx: 0, idy: 1100 });
    triggerPoint({ x: 0.8, y: 1, idx: 100, idy: 1100 });
  }, [isLoaded]);

  return (
    <div className="fixed min-h-screen min-w-screen overflow-x-hidden z-0 hidden md:block">
      <div
        ref={containerRef}
        className="min-h-screen min-w-screen z-0 overflow-hidden mix-blend-lighten"
        style={{ pointerEvents: "auto"}}
      />
    </div>
  );
}
