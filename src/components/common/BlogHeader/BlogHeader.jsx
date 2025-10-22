import { TagDropDown, TextOpacity } from "@/components/custom";
import React from "react";

const BlogHeader = () => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-16">
      <TextOpacity text={"The Blog"}  className="text-5xl md:text-8xl text-teal-50 font-extrabold mb-4 md:mb-0"/>
    </div>
  );
};

export default BlogHeader;
