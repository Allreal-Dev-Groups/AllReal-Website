"use client";

import { BlogGrid, BlogHeader, BlogRecentBox } from "@/components/common";

export default function Home() {
  return (
    <section className="w-full md:w-[90%] min-h-screen flex flex-col items-center px-4 md:px-0 py-[30%] md:py-[10%]">
      {/* Header */}
      <BlogHeader />

      {/* Recent Blog Box */}
      <BlogRecentBox
        date="Feb 02 2025"
        title="Tentang Creativity Block pada UI Designer"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
        image={null} // or pass a URL
      />
      <BlogGrid/>
    </section>
  );
}
