import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const casinos = await prisma.casino.findMany({
      include: { bonuses: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(casinos);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const prosArray = typeof body.pros === "string" ? body.pros.split("\n").filter(Boolean) : body.pros || [];
    const consArray = typeof body.cons === "string" ? body.cons.split("\n").filter(Boolean) : body.cons || [];

    const newCasino = await prisma.casino.create({
      data: {
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        logoUrl:
          body.logoUrl ||
          "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=160&auto=format&fit=crop&q=80",
        rating: parseFloat(body.rating) || 9.0,
        safetyIndex: parseFloat(body.safetyIndex) || 9.5,
        safetyTier: body.safetyTier || "VERY_HIGH",
        status: body.status || "ACTIVE",
        blacklistReason: body.blacklistReason || null,
        establishedYear: parseInt(body.establishedYear) || 2023,
        license: body.license || "Curacao Gaming Control Board",
        minDeposit: body.minDeposit || "$20",
        payoutSpeed: body.payoutSpeed || "0 - 24 hours",
        withdrawalLimit: body.withdrawalLimit || "$50,000 / month",
        supportTypes: body.supportTypes || "24/7 Live Chat & Email",
        websiteUrl: body.websiteUrl || "https://example.com",
        affiliateUrl: body.affiliateUrl || "https://example.com/?ref=affiliate",
        pros: JSON.stringify(prosArray),
        cons: JSON.stringify(consArray),
        summary: body.summary || "Full audit pending.",
        fullReview: body.fullReview || "Detailed review coming soon.",
        featured: Boolean(body.featured),
        isNew: body.isNew !== undefined ? Boolean(body.isNew) : true,
        cryptoFriendly: Boolean(body.cryptoFriendly),
        vpnFriendly: Boolean(body.vpnFriendly),
      },
    });

    // If welcome bonus details were provided:
    if (body.bonusTitle) {
      await prisma.bonus.create({
        data: {
          casinoId: newCasino.id,
          title: body.bonusTitle,
          type: body.bonusType || "WELCOME",
          bonusCode: body.bonusCode || null,
          minDeposit: body.bonusMinDeposit || "$20",
          wagering: body.bonusWagering || "35x",
          claimUrl: body.affiliateUrl || "https://example.com",
        },
      });
    }

    return NextResponse.json({ success: true, casino: newCasino });
  } catch (error: any) {
    console.error("Error creating casino:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
