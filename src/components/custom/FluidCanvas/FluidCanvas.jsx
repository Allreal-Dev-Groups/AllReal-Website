"use client";

import { useAdmin } from "@/store/adminStore";
import { useEffect, useRef } from "react";
import WebGLFluidEnhanced from "webgl-fluid-enhanced";

export default function FluidCanvas() {
  const { isAdmin } = useAdmin();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Normalize default export
    const Fluid = WebGLFluidEnhanced.default || WebGLFluidEnhanced;

    // Try creating simulation safely
    let simulation;
    try {
      simulation = new Fluid(canvasRef.current, {
        PRESSURE: 0.2,
        SUNRAYS: false,
        START_SPLATS: 10,
        DENSITY_DISSIPATION: 3,
        CURL: 100,
        COLOR_PALETTE: ["#4dba87", "#0000ff", "#1d1d1d", "#eaeaea", "#111111"],
      });
    } catch (e) {
      console.error("Fluid init failed:", e);
    }

    // Cleanup GPU memory on unmount
    return () => simulation?.destroy?.();
  }, []);
  if (isAdmin) return null;
  return (
    <div
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen pointer-events-auto"
      style={{
        display: "block",
        background: "#000", // ensure black backdrop
      }}
    />
  );
}
