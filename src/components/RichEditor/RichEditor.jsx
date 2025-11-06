"use client";

import React, { useCallback, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";

// --- Tiptap Extensions ---
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import { TextStyle } from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import "./TiptapStyles.css";

// --- Custom Components & Hooks ---
import MenuBar from "./MenuBar";
import { useEdgeStore } from "@/lib/edgestore";
import {  fetchPost } from "@/lib/fetchClient";

/**
 * --- Rich Text Editor with Tags, EdgeStore Upload & MongoDB Payload ---
 */
const RichEditor = () => {
  const { edgestore } = useEdgeStore();

  // --- Initial Default JSON Content ---
  const initialJsonContent = {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 1 },
        content: [{ type: "text", text: "Welcome to Tiptap Editor" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "This editor now saves both JSON and HTML for maximum flexibility.",
          },
        ],
      },
    ],
  };

  // --- State Management ---
  const [jsonContent, setJsonContent] = useState(initialJsonContent);
  const [htmlContent, setHtmlContent] = useState("");
  const [description, setDescription] = useState(
    "A brief, SEO-friendly summary of the blog post."
  );
  const [bannerImage, setBannerImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const titleRef = useRef(null);

  // --- Initialize Tiptap Editor ---
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        blockquote: false,
        codeBlock: false,
        heading: { levels: [1, 2, 3] },
      }),
      Blockquote,
      CodeBlock.configure({ languageClassPrefix: "language-" }),
      Link.configure({ openOnClick: true, autolink: true }),
      Image.configure({ inline: false, allowBase64: true }),
      TextStyle,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
    ],
    content: initialJsonContent,
    onUpdate: ({ editor }) => {
      setJsonContent(editor.getJSON());
      setHtmlContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "ProseMirror rounded-b-xl",
        "data-placeholder": "Start typing...",
      },
    },
    immediatelyRender: false,
  });

  // --- File Upload to EdgeStore ---
  const handleFileUpload = async () => {
    if (!bannerImage) return "";
    try {
      const res = await edgestore.bannerImages.upload({ file: bannerImage });
      setImageUrl(res.url);
      return res.url;
    } catch (err) {
      console.error("Upload failed:", err);
      return "";
    }
  };

  // --- Tag Management ---
  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  // --- Save to Database ---
  const handleSave = useCallback(async () => {
    const title = titleRef.current?.value || "Untitled";
    const uploadedUrl = await handleFileUpload();

    const payload = {
      title,
      description,
      tags,
      bannerImageUrl: uploadedUrl,
      contentHtml: htmlContent,
      contentJson: jsonContent,
      timestamp: new Date().toISOString(),
    };

    console.log("--- DOCUMENT SAVE PAYLOAD (Ready for MongoDB) ---");
    console.log(payload);
    console.log("--------------------------------------------------");

    await fetchPost({payload:payload}).then(()=>{
      alert("Posted...")
    })
  }, [jsonContent, htmlContent, description, bannerImage, tags]);

  // --- JSX UI ---
  return (
    <div className="flex flex-col w-full max-w-5xl bg-white shadow-2xl rounded-xl border border-gray-200 font-sans">
      {/* --- Header Section --- */}
      <div className="p-6 border-b border-gray-200 space-y-4">
        {/* Title Input */}
        <input
          ref={titleRef}
          type="text"
          defaultValue=""
          placeholder="Enter document title"
          className="w-full p-0 text-3xl sm:text-4xl font-extrabold text-gray-900 placeholder-gray-400 bg-transparent outline-none border-none focus:ring-0"
        />

        {/* Banner Upload */}
        <div className="pt-2">
          <label
            htmlFor="banner-upload"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Banner Image
          </label>
          <input
            id="banner-upload"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setBannerImage(file);
            }}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Uploaded Banner"
              className="mt-2 w-full h-40 object-cover rounded-lg shadow-inner"
            />
          ) : (
            bannerImage && (
              <img
                src={URL.createObjectURL(bannerImage)}
                alt="Banner Preview"
                className="mt-2 w-full h-40 object-cover rounded-lg shadow-inner"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/1200x400/e0e0e0/555555?text=Image+Load+Failed";
                }}
              />
            )
          )}
        </div>

        {/* Description */}
        <div className="pt-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description / SEO Summary
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a short summary or meta description for the post."
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* --- Tag List --- */}
        <div className="pt-2">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              id="tags"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              placeholder="Add a tag and press Enter"
              className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-900"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-blue-500 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* --- Editor --- */}
      <MenuBar editor={editor} />
      <div className="p-0">{editor && <EditorContent editor={editor} />}</div>

      {/* --- Footer --- */}
      <div className="p-4 bg-gray-100 border-t border-gray-300 rounded-b-xl flex justify-between items-center">
        <p className="text-xs text-gray-500 italic hidden sm:block">
          Content updates in real-time. (Check console after clicking "Save")
        </p>
        <button
          onClick={handleSave}
          className="px-5 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition duration-150 font-semibold shadow-md"
        >
          Save Document
        </button>
      </div>
    </div>
  );
};

export default RichEditor;
