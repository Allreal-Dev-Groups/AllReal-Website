"use client";

import { ContactPanel } from "@/components";
import _BrandData from "@/config/BrandConfig";
import { TextFillSlide } from "@/custom";

export default function ContactSection() {
  return (
    <section className="selectionContainer text-left flex  min-h-screen overflow-hidden  text-white">
      <div className="w-full h-full mt-10 gap-10 flex justify-between flex-col">
        {/* Animated Heading */}
        <div className="w-full text-left flex flex-col">
          <TextFillSlide
            text="get in"
            isLeft={false}
            baseColor="#00fff1"
            fillColor="#333"
            fontSize="10rem"
          />
          <TextFillSlide
            text="touch!"
            isLeft={true}
            baseColor="#00fff1"
            fillColor="#333"
            fontSize="10rem"
          />
        </div>

        {/* Contact Section */}
        <div
          id="Contact"
          className="w-full mt-10 flex flex-col items-center justify-center"
        >
          <ContactPanel
            email={_BrandData.email}
            phone={_BrandData.phone}
            address={_BrandData.loacation}
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
        <div className="relative w-full h-fit flex justify-center items-start overflow-hidden z-50 pointer-events-none">
          <img
            src="./assets/images/footer-logo.png"
            className="pointer-events-none opacity-20 "
          />
        </div>
      </div>
    </section>
  );
}
