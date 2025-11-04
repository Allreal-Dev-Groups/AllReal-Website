import { fetchClient } from "@/lib/fetchClient";
import "./BlogViewPage.css";

export default async function BlogPage({ params }) {
  const { id } = await params;
  const res = await fetchClient(`http://localhost:3000/api/blogs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error(`Failed to fetch blog: ${res.status}`);
    return (
      <div className="text-center text-red-400 py-20">Error loading blog.</div>
    );
  }

  const blog = await res.json();
  console.log("Fetched blog:", blog);

  return (
    <section className="w-full min-h-screen flex flex-col items-center px-1 md:px-0 py-[30%] md:py-[5%]">
      <main className="blog min-h-screen w-full overflow-x-hidden text-gray-100 z-50">
        <article
          itemScope
          itemType="https://schema.org/Article"
          className="mx-auto min-w-full px-6 py-12 rounded-2xl overflow-hidden backdrop-blur-2xl border border-amber-50/10 shadow-lg"
        >
          {/* Header + Author */}
          <div className="flex justify-between items-center">
            <nav className="px-2">
              <a
                href="/blog"
                aria-label="Back to main site"
                className="inline-block text-sm text-gray-400 hover:text-gray-200 transition-colors"
              >
                ← Back to blog list
              </a>
            </nav>
          </div>

          {/* Title & Meta */}
          <header className="p-6 md:p-10">
            <h1
              itemProp="headline"
              className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-[#dfcce2]"
            >
              {blog.title}
            </h1>
            {blog.description && (
              <p
                itemProp="description"
                className="text-gray-400 text-base md:text-lg leading-relaxed"
              >
                {blog.description}
              </p>
            )}
          </header>

          {/* Banner Image */}
          {blog.bannerImageUrl && (
            <figure>
              <img
                src={blog.bannerImageUrl}
                alt={blog.title}
                className="w-full object-cover rounded-2xl mb-10"
                loading="lazy"
                itemProp="image"
              />
            </figure>
          )}

          {/* Content Body (HTML Injected) */}
          <div
            className="prose prose-invert prose-lg max-w-none p-6 md:p-10 space-y-8 
                     prose-headings:text-[#dfcce2] 
                     prose-strong:text-amber-300 
                     prose-a:text-amber-400 hover:prose-a:text-amber-300 
                     prose-code:bg-neutral-800 
                     prose-code:px-2 prose-code:py-1 prose-code:rounded-md 
                     prose-li:marker:text-amber-400"
            dangerouslySetInnerHTML={{
              __html: blog.contentHtml || "",
            }}
          />
        </article>
      </main>
    </section>
  );
}
