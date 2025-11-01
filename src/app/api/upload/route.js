import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("image");

  if (!file) {
    return Response.json({ success: 0, message: "No file uploaded" });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public/uploads");
  const filePath = path.join(uploadDir, file.name);
  await writeFile(filePath, buffer);

  const url = `/uploads/${file.name}`;
  return Response.json({
    success: 1,
    file: { url },
  });
}
