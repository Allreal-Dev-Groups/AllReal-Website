import { ServiceBox } from "@/components";
import { TextFillSlide } from "@/custom";


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
    <section className="w-full min-h-screen px-5 flex flex-col gap-5 items-center justify-around  overflow-hidden">

        <div className="w-full  items-center  flex flex-col">
          <TextFillSlide
            text="Our"
            isLeft={false}
            baseColor="#00fff1"
            fillColor="#333"
            fontSize="7rem"
          />
          <TextFillSlide
            text="Expertise"
            isLeft={true}
            baseColor="#00fff1"
            fillColor="#333"
            fontSize="7rem"
          />
        </div>
        <ServiceBox boxes={boxesData} />
    </section>
  );
}
