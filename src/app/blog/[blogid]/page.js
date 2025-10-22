import BlogViewPage from "@/components/page/blog/BlogViewPage";

export default async function Home({ params }) {
  const { blogid } = await params;
  console.log(blogid);
  return (
    <>
      <section className="w-full md:w-[90%] min-h-screen flex flex-col items-center px-4 md:px-0 py-[30%] md:py-[5%]">
        <BlogViewPage />
      </section>
    </>
  );
}
