import { ImageBox, SectionTitle } from "@/components";

const boxesData = [
  {
    title:
      "Gamified App Development for Social Impact, Education, and Training",
    description:
      "We specialize in gamified healthcare apps designed to train, engage, and assess users effectively. Our VR/MR applications for CPR, NRP, dementia care, and first aid transform critical learning into interactive simulations that improve skill retention and real-world readiness.",
    bgColor: "",
    hoverBg: "#222",
  },
  {
    title: "Experience Lab — Research, Prototyping & Technical Partnership",
    description: `Our Experience Lab collaborates with hospitals and universities to research, design, and prototype immersive medical simulations.
We act as a technical partner for institutions seeking innovation in AR/VR healthcare tools, clinical training modules, and simulation-based education systems.`,
    bgColor: "",
    hoverBg: "#333",
  },
  {
    title: "Medical Simulations for Consumer Branding",
    description:
      "We help healthcare organizations visualize their impact through VR storytelling. By creating lifelike medical simulations and mixed reality demonstrations, we enable brands to communicate their innovations more effectively — whether for exhibitions, awareness campaigns, or training showcases.",
    bgColor: "",
    hoverBg: "#444",
  },
];

export default function ExpertiseSection() {
  return (
    <section className="w-full px-5 md:min-h-screen mb-10 flex flex-col gap-16 overflow-hidden">
      <div className="w-full flex flex-col items-center">
        <SectionTitle Line_1="our" Line_2="Expertise" />
      </div>
      <div className="w-full flex flex-col gap-5">
        <ImageBox
          image="/images/sampleblogimg.jpg"
          title="Innovating Medical Education"
          text="We redefine how medical professionals learn and collaborate through immersive virtual experiences."
        />
        <ImageBox
          image="/images/sampleblogimg.jpg"
          title="Innovating Medical Education"
          text="We redefine how medical professionals learn and collaborate through immersive virtual experiences."
          reverse={true}
        />
        <ImageBox
          image="/images/sampleblogimg.jpg"
          title="Innovating Medical Education"
          text="We redefine how medical professionals learn and collaborate through immersive virtual experiences."
        />
      </div>
    </section>
  );
}
