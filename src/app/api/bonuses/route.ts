import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const bonuses = await prisma.bonus.findMany({
      include: { casino: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(bonuses);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newBonus = await prisma.bonus.create({
      data: {
        casinoId: body.casinoId,
        title: body.title,
        type: body.type || "WELCOME",
        bonusCode: body.bonusCode || null,
        minDeposit: body.minDeposit || "$20",
        wagering: body.wagering || "35x",
        maxCashout: body.maxCashout || "No Limit",
        claimUrl: body.claimUrl,
        terms: body.terms || null,
        exclusive: Boolean(body.exclusive),
      },
    });

    return NextResponse.json({ success: true, bonus: newBonus });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
