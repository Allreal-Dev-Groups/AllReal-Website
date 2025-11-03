import { AboutSection, ContactSection, ExpertiseSection, HeroSection, StatusSection, Testimonials, TextScrollSection, VideoSection } from "@/page/Home";
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
      {/* <TextScrollSection /> */}
      <Testimonials/>
      <ContactSection />
    </SmoothScroll>
  );
}
