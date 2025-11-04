import BlogSchema from "@/lib/BlogSchema";
import { dbConnect } from "@/lib/dbConnect";




export async function GET() {
  await dbConnect();
  const blogs = await BlogSchema.find().sort({ createdAt: -1 });
  console.log("sss",blogs)
  return Response.json(blogs);
}

export async function POST(req) {
  await dbConnect();
  const data = await req.json();
  const blog = await BlogSchema.create(data);
  return Response.json(blog);
}
