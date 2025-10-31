"use client";

import { StatusBox } from "@/custom";

const stats = [
  {
    number: 20,
    label: "Awards & Recognition",
    bgColor: "#111",
    hoverBg: "rgba(221,53,0,0.9)",
    side: "left",
  },
  {
    number: 15,
    label: "Creative minds",
    bgColor: "#222",
    hoverBg: "rgba(220,229,229,0.9)",
    side: "right",
  },
  {
    number: 30,
    label: "Projects completed",
    bgColor: "#111",
    hoverBg: "rgba(176,221,202,0.9)",
    side: "left",
  },
  {
    number: 50,
    label: "Years of Experience",
    bgColor: "#222",
    hoverBg: "rgba(244,227,66,0.9)",
    side: "right",
  },
];

export default function StatusSection() {
  return (
    <section className="w-full min-h-screen  flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full h-full">
        {stats.map((item, i) => (
          <StatusBox
            key={i}
            number={item.number}
            label={item.label}
            bgColor={item.bgColor}
            hoverBg={item.hoverBg}
            animationSide={item.side}
            className={`${i % 2 == 0 ? "md:-mt-[15%]" : ""}`}
          />
        ))}
      </div>
    </section>
  );
}
