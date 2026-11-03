import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const updated = await prisma.bonus.update({
      where: { id: params.id },
      data: {
        title: body.title,
        type: body.type,
        bonusCode: body.bonusCode || null,
        minDeposit: body.minDeposit,
        wagering: body.wagering,
        maxCashout: body.maxCashout,
        claimUrl: body.claimUrl,
        terms: body.terms,
        exclusive: Boolean(body.exclusive),
      },
    });

    return NextResponse.json({ success: true, bonus: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.bonus.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
