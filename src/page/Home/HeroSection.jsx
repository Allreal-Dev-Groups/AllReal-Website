import { TextLineReveal, WordLetterReveal } from "@/custom";

export default function HeroSection() {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center overflow-x-hidden z-40">
      <div className=" w-[80%] md:w-[70%] h-[50%] mt-[5%] flex flex-col gap-[10%]">
        <WordLetterReveal
          text="Reimagining Healthcare Training Through Immersive Reality"
          className="text-2xl md:text-6xl"
          delay={0}
          highlights={[
            {
              phrase: "Healthcare Training",
              color: "linear-gradient(180deg, #00fff1, #4e14dd)",
            },
            {
              phrase: "Immersive Reality",
              color: "linear-gradient(180deg, #00fff1, #4e14dd)",
            },
          ]}
        />

        <TextLineReveal
          text="At ALLREAL, we design next-generation VR and MR simulators that empower healthcare professionals and institutions with experiential learning. Our mission is to make critical medical training accessible, effective, and impactful through immersive technology."
          className=" text-xs md:text-xl"
          align="center"
        />
      </div>
      <div className="h-[150px]  rounded-2xl overflow-hidden flex justify-center items-center sm:hidden">
        <video
          src="./assets/videos/sample.mp4"
          muted
          playsInline
          loop
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
