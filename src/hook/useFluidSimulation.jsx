"use client";

import { useEffect, useRef, useState } from "react";
import WebGLFluidEnhanced from "webgl-fluid-enhanced";
import FluidConfig from "@/config/FluidConfig";

export default function useFluidSimulation({
  random = false,
  interval = 3000,
} = {}) {
  const containerRef = useRef(null);
  const simulation = useRef(null);
  const randomInterval = useRef(null);

  // Client-only state
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cores, setCores] = useState(4);

  useEffect(() => {
    setIsClient(true);
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    setCores(navigator.hardwareConcurrency || 4);
  }, []);

  const getOptimizedConfig = () => {
    const config = { ...FluidConfig };

    if (isClient && (isMobile || cores <= 4)) {
      config.simResolution = 16;
      config.dyeResolution = 256;
      config.velocityDissipation = 0.2;
      config.densityDissipation = 0.8;
      config.curl = 0.5;
      config.startSplats = 1;
      config.splatAmount = 1;
      config.hover = true;
      config.trigger = "none";
    }

    return config;
  };

  useEffect(() => {
    if (!containerRef.current || !isClient) return;

    simulation.current = new WebGLFluidEnhanced(containerRef.current);
    simulation.current.setConfig(getOptimizedConfig());
    simulation.current.start();

    if (random) {
      randomInterval.current = setInterval(() => {
        triggerRandom();
      }, interval);
    }

    return () => {
      simulation.current?.stop();
      simulation.current = null;
      if (randomInterval.current) clearInterval(randomInterval.current);
    };
  }, [isClient, random, interval, isMobile, cores]);

  const triggerPoint = ({ x, y, idx = 5, idy = -3000 }) => {
    if (!simulation.current) return;
    const posX = x * window.innerWidth;
    const posY = y * window.innerHeight;
    simulation.current.splatAtLocation(posX, posY, idx, idy);
  };

  const triggerRandom = () => {
    if (!simulation.current) return;
    const x = Math.random();
    const y = Math.random();
    const idx = 3 + Math.random() * 5;
    const idy = -3000 + Math.random() * 3000;
    triggerPoint({ x, y, idx, idy });
  };

  return { containerRef, triggerPoint, triggerRandom };
}
