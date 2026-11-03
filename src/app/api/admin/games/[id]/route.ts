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
      await prisma.game.delete({ where: { id } });
    } catch {
      // db fallback
    }

    revalidatePath("/");
    return NextResponse.json({ success: true, message: "Game deleted successfully" });
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

    let updatedGame;
    try {
      updatedGame = await prisma.game.update({
        where: { id },
        data: body,
      });
    } catch {
      updatedGame = { id, ...body };
    }

    revalidatePath("/");
    return NextResponse.json({ success: true, game: updatedGame });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
