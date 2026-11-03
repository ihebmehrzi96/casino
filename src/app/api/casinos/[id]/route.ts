import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FALLBACK_CASINOS } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const casino = await prisma.casino.findUnique({
      where: { id: params.id },
      include: { bonuses: true },
    });

    if (casino) return NextResponse.json(casino);

    // Fallback search
    const fallback = FALLBACK_CASINOS.find((c) => c.id === params.id || c.slug === params.id);
    if (fallback) return NextResponse.json(fallback);

    return NextResponse.json({ error: "Casino not found" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const prosArray = typeof body.pros === "string" ? body.pros.split("\n").filter(Boolean) : body.pros || [];
    const consArray = typeof body.cons === "string" ? body.cons.split("\n").filter(Boolean) : body.cons || [];

    const updatedCasino = await prisma.casino.update({
      where: { id: params.id },
      data: {
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        logoUrl: body.logoUrl,
        rating: parseFloat(body.rating) || 9.0,
        safetyIndex: parseFloat(body.safetyIndex) || 9.5,
        safetyTier: body.safetyTier || "VERY_HIGH",
        status: body.status || "ACTIVE",
        blacklistReason: body.blacklistReason || null,
        establishedYear: parseInt(body.establishedYear) || 2023,
        license: body.license,
        minDeposit: body.minDeposit,
        payoutSpeed: body.payoutSpeed,
        withdrawalLimit: body.withdrawalLimit,
        supportTypes: body.supportTypes,
        websiteUrl: body.websiteUrl,
        affiliateUrl: body.affiliateUrl,
        pros: JSON.stringify(prosArray),
        cons: JSON.stringify(consArray),
        summary: body.summary,
        fullReview: body.fullReview,
        featured: Boolean(body.featured),
        isNew: body.isNew !== undefined ? Boolean(body.isNew) : true,
        cryptoFriendly: Boolean(body.cryptoFriendly),
        vpnFriendly: Boolean(body.vpnFriendly),
      },
    });

    // Update or create main bonus if provided
    if (body.bonusTitle) {
      const existingBonus = await prisma.bonus.findFirst({
        where: { casinoId: params.id },
      });

      if (existingBonus) {
        await prisma.bonus.update({
          where: { id: existingBonus.id },
          data: {
            title: body.bonusTitle,
            type: body.bonusType || "WELCOME",
            bonusCode: body.bonusCode || null,
            minDeposit: body.bonusMinDeposit || body.minDeposit || "$20",
            wagering: body.bonusWagering || "35x",
            claimUrl: body.affiliateUrl,
          },
        });
      } else {
        await prisma.bonus.create({
          data: {
            casinoId: params.id,
            title: body.bonusTitle,
            type: body.bonusType || "WELCOME",
            bonusCode: body.bonusCode || null,
            minDeposit: body.bonusMinDeposit || body.minDeposit || "$20",
            wagering: body.bonusWagering || "35x",
            claimUrl: body.affiliateUrl,
          },
        });
      }
    }

    return NextResponse.json({ success: true, casino: updatedCasino });
  } catch (error: any) {
    console.error("Update error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.casino.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
