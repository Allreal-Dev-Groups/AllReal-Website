import { AboutSection, ContactSection, ExpertiseSection, HeroSection, StatusSection, TextScrollSection, VideoSection } from "@/page/Home";
import { SmoothScroll } from "@/custom";
import "./globals.css";

export default function Home() {
  return (
    <SmoothScroll>
      <HeroSection />
      <VideoSection />
      <AboutSection />
      <ExpertiseSection />
      <StatusSection />
      <TextScrollSection />
      <ContactSection />
    </SmoothScroll>
  );
}
