import { IntroText } from "@/components";
import React from "react";
import BlogRecentBox from "./BlogRecentBox";
import Link from "next/link";


const BlogHero = ({ blog, isAdmin=false }) => {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-0 py-[30%] md:py-[10%]">
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center ">
        <IntroText
          highlightWords={["Blog"]}
          className="text-4xl md:text-8xl max-w-[90%] font-bold  leading-tight uppercase"
        >
          The Blog
        </IntroText>
        {isAdmin && <Link className="rounded-full pointer-events-auto z-50 min-h-[50px] flex justify-center items-center min-w-[200px] text-amber-50 border" href={`/admin/blog/create`}>
          Create Blog
        </Link>}
      </div>
      <BlogRecentBox
        id={blog?._id}
        date={blog?.createdAt}
        title={blog?.title}
        description={blog?.description}
        image={blog?.bannerImageUrl}
      />
    </section>
  );
};

export default BlogHero;
