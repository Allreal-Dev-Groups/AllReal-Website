import { fetchClient } from "@/lib/fetchClient";
import { BlogHero, BlogList } from "@/page/Blog";
import React, { Suspense } from "react";

export default async function BlogPage() {
  const res = await fetchClient(`/api/blogs`, {
    cache: "no-store",
  });
  const blogs = await res.json();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogHero blog={blogs[0]} />
      <BlogList blogs={blogs} />
    </Suspense>
  );
}
