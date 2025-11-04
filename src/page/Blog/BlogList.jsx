"use client";

import { useState, useMemo } from "react";
import { BlogBox } from "@/components";

export default function BlogList({ blogs, isAdmin=false }) {
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(blogs);
  const allTags = useMemo(
    () => ["All", ...new Set(blogs.flatMap((post) => post.tags))],
    []
  );

  const handleTagChange = (tag) => {
    setLoading(true);
    setSelectedTag(tag);
    // Smooth simulated loading
    setTimeout(() => setLoading(false), 400);
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return blogs.filter((post) => {
      const matchesTag =
        selectedTag === "All" || post.tags.includes(selectedTag);
      const matchesSearch =
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query);
      return matchesTag && matchesSearch;
    });
  }, [searchQuery, selectedTag]);

  return (
    <section className="w-full min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Controls */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full md:w-1/2 px-4 py-2 rounded-xl bg-[#1c1c1c] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-200 placeholder-gray-500"
        />

        {/* Tag Dropdown */}
        {/* <TagDropDown onChange={handleTagChange} chipData={allTags} /> */}
      </div>

      {/* Divider */}
      <hr className="border border-amber-50 opacity-30 mb-8 w-full" />

      {/* Blog Grid */}
      <div
        className={`w-full grid gap-8 transition-opacity duration-300 ${
          loading ? "opacity-50" : "opacity-100"
        } grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}
      >
        {loading ? (
          <div className="col-span-full flex justify-center text-white">
            <p>Loading...</p>
          </div>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <BlogBox key={post._id} isAdmin={isAdmin} {...post} />
          ))
        ) : (
          <div className="col-span-full flex justify-center text-gray-400">
            <p>No posts found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
