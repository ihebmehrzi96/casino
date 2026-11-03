import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const casinoId = formData.get("casinoId") as string;
    const authorName = formData.get("authorName") as string;
    const rating = parseFloat(formData.get("rating") as string) || 8.0;
    const title = formData.get("title") as string;
    const comment = formData.get("comment") as string;

    if (!casinoId || !authorName || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const review = await prisma.userReview.create({
      data: {
        casinoId,
        authorName,
        rating,
        title: title || "Player Review",
        comment,
        isApproved: false, // Default to false for moderation
      },
    });

    // Redirect back with a success query parameter
    return NextResponse.redirect(new URL("/?review_submitted=true", request.url));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
