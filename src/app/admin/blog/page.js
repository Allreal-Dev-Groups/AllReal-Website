import { fetchClient } from "@/lib/fetchClient";
import { BlogHero, BlogList } from "@/page/Blog";
import Link from "next/link";

import React from "react";

const BlogPage = async () => {
  const res = await fetchClient(`http://localhost:3000/api/blogs`, {
    cache: "no-store",
  });
  const blogs = await res.json();

  return (
    <>
      <BlogHero isAdmin={true}  blog={blogs[0]} />
      <BlogList isAdmin={true} blogs={blogs} />
    </>
  );
};

export default BlogPage;
