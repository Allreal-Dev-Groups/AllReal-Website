"use client";

import { ContactPanel, SectionTitle } from "@/components";
import { siteConfig } from "@/lib/siteConfig";

export default function ContactSection() {
  return (
    <section
      id="contact_us"
      className="w-full px-5 mb-10 flex flex-col gap-16 overflow-hidden"
    >
      <div className="w-full flex flex-col">
        <SectionTitle Line_1="Get In" Line_2="Touch!" fontSize="9rem" />
      </div>

      <div>
        {/* Contact Panel */}
        <div className="w-full mt-10 flex flex-col items-center justify-center">
          <ContactPanel
            email={siteConfig.email}
            phone={siteConfig.phone}
            address={siteConfig.loacation}
          />
        </div>

        {/* Bottom Social Links */}
        <div className="w-full z-100 mt-12 flex justify-center gap-8 text-sm md:text-base text-gray-400">
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase tracking-wide z-50 font-bold hover:text-[#8637ff] transition"
          >
            Instagram
          </a>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase tracking-wide z-50 font-bold hover:text-[#8637ff] transition"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase tracking-wide z-50 font-bold hover:text-[#8637ff] transition"
          >
            YouTube
          </a>
        </div>

        {/* Copyright */}
        <div className="w-full mt-10 flex flex-col items-center justify-center">
          <a href="#" className="pointer-events-auto text-[#8637ff] z-50">
            Machenn Innovations Pvt Ltd © 2025
          </a>
        </div>

        {/* Footer Logo */}
        <div className="relative w-full h-fit flex justify-center items-start overflow-hidden z-40 pointer-events-none">
          <img
            src="/images/footer-logo.png"
            className="pointer-events-none opacity-20"
            alt="Footer Logo"
          />
        </div>
      </div>
    </section>
  );
}
