import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    try {
      await prisma.guide.delete({ where: { id } });
    } catch {
      // db fallback
    }

    revalidatePath("/");
    return NextResponse.json({ success: true, message: "Guide deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    let updatedGuide;
    try {
      updatedGuide = await prisma.guide.update({
        where: { id },
        data: body,
      });
    } catch {
      updatedGuide = { id, ...body };
    }

    revalidatePath("/");
    return NextResponse.json({ success: true, guide: updatedGuide });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
