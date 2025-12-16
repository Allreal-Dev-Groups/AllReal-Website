import { Button, IntroText } from "@/components";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center text-white z-50 ">
      <div className="w-full h-full z-50">
        <IntroText
          highlightWords={["Healthcare", "Immersive", "Reality"]}
          className="text-4xl md:text-7xl max-w-[90%] font-bold mb-6 leading-tight uppercase"
        >
          Reimagining Healthcare Through Immersive Reality
        </IntroText>
        <IntroText
          className="text-xs md:text-lg text-gray-300 max-w-4xl mt-6"
          highlightWords={["ALLREAL,"]}
        >
          At <strong>ALLREAL,</strong> At ALLREAL, we build next-generation VR
          and MR medical simulators that empower healthcare professionals with
          experiential, hands-on learning. Our mission is simple: to make
          critical medical training accessible, effective, and deeply impactful
          through immersive technology.
        </IntroText>
      </div>

      <div className="absolute z-50 pointer-events-auto min-w-[80%] bottom-0 h-[100px] flex justify-between">
        <Button name={"Explore work"} />
        <Button name={"Get in touch"} />
      </div>
    </section>
  );
}
