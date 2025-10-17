"use client";

import { ContactStrip } from "@/components/common";
import { TextFillSlide } from "@/components/custom";

export default function AboutSection() {
  return (
    <section className="selectionContainer text-left flex  min-h-screen overflow-hidden  text-white">
      <div className="w-full h-full mt-10 gap-10 flex justify-between flex-col">
        {/* Animated Heading */}
        <div className="w-full text-left flex flex-col">
          <TextFillSlide
            text="get in"
            isLeft={false}
            baseColor="#EC4899"
            fillColor="#333"
            fontSize="10rem"
          />
          <TextFillSlide
            text="touch!"
            isLeft={true}
            baseColor="#EC4899"
            fillColor="#333"
            fontSize="10rem"
          />
        </div>

        {/* Contact Section */}
        <div
          id="Contact"
          className="w-full mt-10 flex flex-col items-center justify-center"
        >
          <ContactStrip
            email="info@machenn.com"
            phone="+91 8903772381"
            address="Coimbatore,TN"
          />
        </div>
        <div
          id="Contact"
          className="w-full mt-10 flex flex-col items-center justify-center"
        >
          <a href="#" className="pointer-events-auto text-pink-700 z-70">
            Machenn Pvt Ltd @2025
          </a>
        </div>
      </div>
    </section>
  );
}
