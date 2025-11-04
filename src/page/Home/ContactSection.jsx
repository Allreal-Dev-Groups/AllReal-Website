"use client";

import { ContactPanel, SectionTitle } from "@/components";
import { siteConfig } from "@/lib/siteConfig";



export default function ContactSection() {
  return (
    <section className="w-full px-5  mb-10 flex flex-col gap-16 overflow-hidden">
      <div className="w-full flex flex-col ">
        <SectionTitle Line_1="Get In" Line_2="Touch!" fontSize="9rem" />
      </div>
      <div>
        {/* Contact Section */}
        <div
          id="Contact"
          className="w-full mt-10 flex flex-col items-center justify-center"
        >
          <ContactPanel
            email={siteConfig.email}
            phone={siteConfig.phone}
            address={siteConfig.loacation}
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
            src="/images/footer-logo.png"
            className="pointer-events-none opacity-20 "
          />
        </div>
      </div>
    </section>
  );
}
