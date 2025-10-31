import { NextResponse } from "next/server";

export async function POST(req) {
  const { password, target } = await req.json();

  if (password === process.env.PAGE_PASSWORD) {
    const res = NextResponse.json({ success: true });

    // Page-specific cookie name
    const cookieName = `page_unlocked_${target}`;
    const threeHours = 3 * 60 * 60;
    res.cookies.set(cookieName, "true", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: threeHours, // expires after 3 hours
    });

    return res;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
