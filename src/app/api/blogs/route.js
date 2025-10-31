import BlogSchema from "@/lib/BlogSchema";
import { DB_Connection } from "@/lib/DB_Connection";



export async function GET() {
  await DB_Connection();
  const blogs = await BlogSchema.find().sort({ createdAt: -1 });
  return Response.json(blogs);
}

export async function POST(req) {
  await DB_Connection();
  const data = await req.json();
  const blog = await BlogSchema.create(data);
  return Response.json(blog);
}
