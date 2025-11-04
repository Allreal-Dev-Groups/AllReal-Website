import { fetchClient } from "@/lib/fetchClient";
import { BlogHero, BlogList } from "@/page/Blog";


import React from "react";

const BlogPage = async () => {

  const res = await fetchClient(`${process.env.URL}/api/blogs`, {
    cache: "no-store",
  });
  const blogs = await res.json();



  return (
    <>
      <BlogHero blog={blogs[0]} />
      <BlogList blogs={blogs} />
    </>
  );
};

export default BlogPage;
