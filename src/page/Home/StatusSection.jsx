"use client";

import { useEffect, useRef } from "react";

import { StatusData } from "@/lib/siteConfig";
import { gsap ,ScrollTrigger} from "@/lib/GsapConfig";

export default function StatusSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counting animation on scroll
      document.querySelectorAll(".count").forEach((el) => {
        const target = parseInt(el.dataset.target);
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val);
          },
        });
      });

      // Mouse tilt effect
      const cards = gsap.utils.toArray(".grid-item");
      cards.forEach((card) => {
        const handleMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -6; // tilt intensity
          const rotateY = ((x - centerX) / centerX) * 6;
          gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 800,
            ease: "power2.out",
            duration: 0.3,
          });
        };

        const resetTilt = () => {
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            ease: "power2.out",
            duration: 0.6,
          });
        };

        card.addEventListener("mousemove", handleMove);
        card.addEventListener("mouseleave", resetTilt);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full md:min-h-fit my-20 flex  justify-center overflow-x-hidden pointer-events-auto"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 w-full max-w-6xl px-4">
        {StatusData.map((item, i) => (
          <div
            key={i}
            className={`grid-item relative flex items-center justify-center rounded-3xl h-[150px] md:h-[350px] overflow-hidden cursor-pointer transition-transform duration-500 bg-neutral-800`}
          >
            <h3 className="absolute left-6 top-6 md:left-10 md:top-10 md:text-5xl font-semibold text-[#00E0FF]">
              {item.label}
            </h3>
            <span
              className="count absolute bottom-6 right-6 md:bottom-10 md:right-10 md:text-7xl font-bold text-white opacity-80"
              data-target={item.count}
            >
              0
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
