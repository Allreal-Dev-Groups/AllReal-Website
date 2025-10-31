import { SmoothScroll } from "@/custom";
import BlogHero from "@/page/Blog/BlogHero";
import BlogList from "@/page/Blog/BlogList";
import React from "react";

const BlogPage = async () => {
  const res = await fetch(`http://localhost:3002/api/blogs`, {
    cache: "no-store",
  });
  const blogs = await res.json();
  return (
    <>
      <BlogHero blog={blogs[0]}/>
      <BlogList blogs={blogs} />
    </>
  );
};

export default BlogPage;
