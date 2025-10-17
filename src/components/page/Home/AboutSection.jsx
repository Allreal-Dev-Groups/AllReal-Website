import { TextFillSlide, TextLineReveal } from "@/components/custom";

export default function AboutSection() {
  return (
    <section className="w-full pb-[5%]  px-5 flex flex-col items-center justify-center  overflow-hidden">
      <div className="w-full h-full gap-5  flex flex-col ">
        <div className="w-full  items-center md:items-start flex flex-col">
          <TextFillSlide
            text="Who"
            isLeft={false}
            baseColor="#EC4899"
            fillColor="#333"
            fontSize="8rem"
          />
          <TextFillSlide
            text="We Are"
            isLeft={true}
            baseColor="#EC4899"
            fillColor="#333"
            fontSize="8rem"
          />
        </div>
        <div className="text-xs text-justify md:text-3xl md:leading-15  flex flex-col  font-medium  wrap-break-word w-full ">
          <TextLineReveal
            className={"w-full text-wrap "}
            align={"justify"}
            text="We are ALLREAL — a team of biomedical engineers, designers, and technologists dedicated to transforming medical training and education through immersive technology.
We believe in the power of virtual, augmented, and mixed reality to make healthcare learning safer, smarter, and more human-centered."
          />  
        </div>
      </div>
    </section>
  );
}
