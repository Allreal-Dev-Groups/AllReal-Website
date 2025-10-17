import { ServiceBox, TextFillSlide, TextLineReveal } from "@/components/custom";

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
    <section className="w-full min-h-screen px-5 flex flex-col items-center justify-center  overflow-hidden">
      <div className="w-full h-full gap-10  flex flex-col ">
        <div className="w-full  items-center  flex flex-col">
          <TextFillSlide
            text="Our"
            isLeft={false}
            baseColor="#EC4899"
            fillColor="#333"
            fontSize="8rem"
          />
          <TextFillSlide
            text="Expertise"
            isLeft={true}
            baseColor="#EC4899"
            fillColor="#333"
            fontSize="8rem"
          />
        </div>
        <ServiceBox boxes={boxesData} />
      </div>
    </section>
  );
}
