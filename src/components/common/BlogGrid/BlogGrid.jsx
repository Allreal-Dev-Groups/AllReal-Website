"use client";

import { useState } from "react";
import { BlogGridBox } from "@/components/common";
import { TagDropDown } from "@/components/custom";

const blogPosts = [
  {
    id: 1,
    date: "Feb 02 2025",
    title: "Creativity Block UI",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    image: null,
    tags: ["UI", "Design"],
  },
  {
    id: 2,
    date: "Jan 25 2025",
    title: "Efficient UI Workflow",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    image: null,
    tags: ["UI", "Workflow"],
  },
  {
    id: 3,
    date: "Jan 15 2025",
    title: "Color Theory",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    image: null,
    tags: ["UI", "Color"],
  },
  {
    id: 4,
    date: "Jan 15 2025",
    title: "UI Harmony Principles",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    image: null,
    tags: ["UI", "Color"],
  },
];

export default function BlogGrid() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTagChange = (tag) => {
    setLoading(true);
    setSelectedTag(tag);
    setTimeout(() => setLoading(false), 500);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = blogPosts.filter((post) => {
    const matchesTag =
      selectedTag === "All" || post.tags.includes(selectedTag);
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <section className="w-full min-h-screen flex flex-col items-center px-4 md:px-0 py-12 md:py-16">
      {/* Top controls */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 mb-6 z-50">
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full md:w-1/2 px-4 py-2 pointer-events-auto rounded-xl bg-[#1c1c1c] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
        />

        {/* Tag Filter */}
        <TagDropDown
          onChange={handleTagChange}
          chipData={["All", ...new Set(blogPosts.flatMap((p) => p.tags))]}
        />
      </div>

      <hr className="border border-amber-50 opacity-30 mb-6 w-full" />

      {/* Blog Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-3 flex justify-center text-white">
            <p>Loading...</p>
          </div>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <BlogGridBox key={post.id} {...post} />
          ))
        ) : (
          <div className="col-span-3 flex justify-center text-gray-400">
            <p>No posts found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
