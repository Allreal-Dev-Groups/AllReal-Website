import BlogSchema from "@/lib/BlogSchema";
import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request, {params  }) {
  const { id} = await params;
  try {
    await dbConnect();
    const blog = await BlogSchema.findById(id).lean();

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
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
  await dbConnect();
  const data = await req.json();
  const blog = await BlogSchema.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  return Response.json(blog);
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const deleted = await BlogSchema.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}