"use client";

import Head from "next/head";

export default function BlogViewPage() {
  return (
    <>


      <main className="min-h-screen mt-10 text-gray-100  z-50">
        <article
          itemScope
          itemType="https://schema.org/Article"
          className="mx-auto max-w-9xl px-6 py-12 rounded-2xl overflow-hidden backdrop-blur-2xl border border-amber-50/10 shadow-lg"
        >
          {/* Header and Author */}
          <div className="flex justify-between items-center">
            <nav className="px-2">
              <a
                href="/blog"
                aria-label="Back to main site"
                className="inline-block text-sm text-gray-400 hover:text-gray-200 transition-colors pointer-events-auto"
              >
                ← Back to main site
              </a>
            </nav>
            <footer className="flex items-center gap-4">
              <img
                src="../assets/images/logo.webp"
                alt="Machenn Innovations Pvt Ltd Logo"
                className="w-12 h-12 object-cover"
                loading="lazy"
                itemProp="author"
              />
              <div>
                <p className="text-sm font-medium" itemProp="author">
                  AllReal (Machenn Innovations Pvt Ltd)
                </p>
                <p className="text-xs text-gray-500" itemProp="jobTitle">
                  @Content Development Team
                </p>
              </div>
            </footer>
          </div>

          {/* Title and Intro */}
          <header className="p-6 md:p-10">
            <h1
              itemProp="headline"
              className="text-3xl md:text-6xl font-bold mb-4 leading-tight"
            >
              Immersive Tech (AR/VR) Courses That Can Get You Hired Fast
            </h1>
            <p
              itemProp="description"
              className="text-gray-400 text-base md:text-lg leading-relaxed"
            >
              So you’re intrigued by the world of{" "}
              <strong>Augmented Reality (AR)</strong> and{" "}
              <strong>Virtual Reality (VR)</strong>. Maybe you've seen friends
              creating filters, or you’ve played around with VR games. But what
              if you could actually turn that curiosity into a real, high-paying
              job?
              <br />
              <br />
              Here’s the good news: You can. Even better?{" "}
              <strong>You don’t need a computer science degree</strong> — just
              practical, real-world skills and a portfolio that speaks for
              itself.
            </p>
          </header>

          {/* Featured Image */}
          <figure>
            <img
              src="/assets/images/sampleblogimg.jpg"
              alt="AR/VR Immersive Tech Cover Image"
              className="w-full object-cover rounded-2xl "
              loading="lazy"
              itemProp="image"
            />
          </figure>

          {/* Blog Content */}
          <div className="p-6 md:p-10 space-y-8 text-gray-300 leading-relaxed">
            <h2
              itemProp="alternativeHeadline"
              className="text-2xl md:text-3xl font-semibold mb-4"
            >
              Top Reasons to Learn AR/VR Development
            </h2>

            {/* Unordered List */}
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Explosive job growth across industries (education, gaming, healthcare, and marketing).</li>
              <li>Creative freedom to design immersive experiences that engage users deeply.</li>
              <li>Rising demand for developers who can blend art, design, and technology.</li>
            </ul>

            {/* Ordered List */}
            <h3 className="text-xl font-semibold mt-8 mb-2">
              Step-by-Step Path to Getting Started
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-400">
              <li>Start with an introduction to Unity or Unreal Engine.</li>
              <li>Learn the fundamentals of 3D environments and interaction design.</li>
              <li>Practice by building simple AR filters or VR mini-games.</li>
              <li>Create a portfolio showcasing projects on GitHub or personal websites.</li>
            </ol>

            {/* Blockquote */}
            <blockquote className="border-l-4 border-teal-500 pl-4 italic text-gray-300 my-6">
              “The best way to predict the future is to build it — and immersive
              technologies are the frontier where creativity meets innovation.”
            </blockquote>

            {/* Code Example */}
            <h3 className="text-xl font-semibold mt-10 mb-3">
              Example: Setting Up an AR Experience in Unity
            </h3>
            <pre className="bg-neutral-800 rounded-xl p-4 text-sm overflow-x-auto text-gray-200">
              <code>
{`using UnityEngine;
using UnityEngine.XR.ARFoundation;

public class ARPlacement : MonoBehaviour
{
    public GameObject prefab;

    void Update()
    {
        if (Input.touchCount > 0)
        {
            var touch = Input.GetTouch(0);
            if (touch.phase == TouchPhase.Began)
            {
                Vector3 position = Camera.main.ScreenToWorldPoint(touch.position);
                Instantiate(prefab, position, Quaternion.identity);
            }
        }
    }
}`}
              </code>
            </pre>

            <p className="text-gray-400">
              This basic script instantiates an object in the real world
              wherever the user taps on their screen — the first step in
              creating interactive AR experiences.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
