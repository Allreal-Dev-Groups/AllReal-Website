import BlogSchema from "@/lib/BlogSchema";
import { DB_Connection } from "@/lib/DB_Connection";




import { NextResponse } from "next/server";


export async function GET(request, { params }) {
    console.log("text",params)
  try {
    await DB_Connection();
    const blog = await BlogSchema.findById(params.id).lean();

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    // Optional: If you're storing Markdown, you might convert it to HTML here
    return NextResponse.json(blog, { status: 200 });

  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}


export async function PUT(req, { params }) {
  await DB_Connection();
  const data = await req.json();
  const blog = await BlogSchema.findByIdAndUpdate(params.id, data, { new: true });
  return Response.json(blog);
}

export async function DELETE(_, { params }) {
  await DB_Connection();
  await BlogSchema.findByIdAndDelete(params.id);
  return Response.json({ success: true });
}
