import { BlogRecentBox, TextOpacity } from "@/custom";
import React from "react";

const BlogHero = ({ blog }) => {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-0 py-[30%] md:py-[10%]">
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-16">
        <TextOpacity
          text={"The Blog"}
          className="text-5xl md:text-8xl text-teal-50 font-extrabold mb-4 md:mb-0"
        />
      </div>
      <BlogRecentBox
        id={blog._id}
        date={blog.createdAt}
        title={blog.title}
        description={blog.description}
        image={blog.bannerImageUrl}
      />
    </section>
  );
};

export default BlogHero;
