import { Button, SectionTitle, SubIntroText } from "@/components";

export default function AboutSection() {
  return (
    <section className="w-full px-5 md:min-h-screen mb-10 flex flex-col gap-16 ">
      <div className="w-full flex flex-col items-center md:items-start">
        <SectionTitle Line_1="Who" Line_2="we Our" />
      </div>
      <div className="w-full flex justify-start">
        <div className="md:max-w-[50%] md:text-2xl">
          <SubIntroText className="text-white">
            We are ALLREAL — a team of biomedical engineers, designers, and
            technologists dedicated to transforming medical training and
            education through immersive technology. We believe in the power of
            virtual, augmented, and mixed reality to make healthcare learning
            safer, smarter, and more human-centered.
          </SubIntroText>
        </div>
      </div>

      <div className="w-full flex justify-end">
        <div className="md:max-w-[50%] md:text-2xl">
          <SubIntroText className="text-white text-right md:text-justify ">
            We are ALLREAL — a team of biomedical engineers, designers, and
            technologists dedicated to transforming medical training and
            education through immersive technology. We believe in the power of
            virtual, augmented, and mixed reality to make healthcare learning
            safer, smarter, and more human-centered.
          </SubIntroText>
          <Button name={"About Us"}  className="mt-10" />
        </div>
      </div>
    </section>
  );
}
