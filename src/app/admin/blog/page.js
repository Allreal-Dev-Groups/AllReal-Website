import RichEditor from "@/components/RichEditor/RichEditor";
import React from "react";

const page = () => {
  return (
    <section className="w-full min-h-screen flex flex-col items-center px-1 md:px-0 py-[5%]">
      <RichEditor />
    </section>
  );
};

export default page;
