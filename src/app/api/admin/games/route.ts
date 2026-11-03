import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const DEFAULT_GAMES = [
  {
    id: "game-1",
    title: "Gates of Olympus",
    slug: "gates-of-olympus",
    category: "Slots",
    provider: "Pragmatic Play",
    rtp: "96.50%",
    volatility: "High",
    thumbnailUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80",
    demoUrl: "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=vs20olympgate",
    featured: true,
  },
  {
    id: "game-2",
    title: "Sweet Bonanza",
    slug: "sweet-bonanza",
    category: "Slots",
    provider: "Pragmatic Play",
    rtp: "96.48%",
    volatility: "High",
    thumbnailUrl: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=600&q=80",
    demoUrl: "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=vs20sweetbonz",
    featured: true,
  },
  {
    id: "game-3",
    title: "Wanted Dead or a Wild",
    slug: "wanted-dead-or-a-wild",
    category: "Slots",
    provider: "Hacksaw Gaming",
    rtp: "96.38%",
    volatility: "Very High",
    thumbnailUrl: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=600&q=80",
    featured: true,
  },
  {
    id: "game-4",
    title: "Lightning Roulette",
    slug: "lightning-roulette",
    category: "Roulette",
    provider: "Evolution Live",
    rtp: "97.30%",
    volatility: "Medium",
    thumbnailUrl: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=600&q=80",
    featured: true,
  },
  {
    id: "game-5",
    title: "Plinko XY",
    slug: "plinko-xy",
    category: "Plinko Games",
    provider: "BGaming",
    rtp: "99.00%",
    volatility: "Adjustable",
    thumbnailUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80",
    featured: true,
  },
  {
    id: "game-6",
    title: "Aviator Crash",
    slug: "aviator-crash",
    category: "Crash Games",
    provider: "Spribe",
    rtp: "97.00%",
    volatility: "Medium-High",
    thumbnailUrl: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=600&q=80",
    featured: true,
  },
  {
    id: "game-7",
    title: "Chicken Road Cross",
    slug: "chicken-road-cross",
    category: "Chicken Gambling",
    provider: "UpGaming",
    rtp: "98.00%",
    volatility: "Custom",
    thumbnailUrl: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=600&q=80",
    featured: true,
  },
];

export async function GET() {
  try {
    let games: any[] = [];
    try {
      games = await prisma.game.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch {
      // db fallback
    }

    if (games.length === 0) {
      games = DEFAULT_GAMES;
    }

    return NextResponse.json({ success: true, games, count: games.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, provider, rtp, volatility, thumbnailUrl, demoUrl, featured } = body;

    if (!title || !category) {
      return NextResponse.json({ success: false, error: "Title and Category are required" }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") + "-" + Date.now().toString().slice(-4);

    let newGame;
    try {
      newGame = await prisma.game.create({
        data: {
          title,
          slug,
          category: category || "Slots",
          provider: provider || "Top Provider",
          rtp: rtp || "96.50%",
          volatility: volatility || "Medium",
          thumbnailUrl: thumbnailUrl || "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80",
          demoUrl: demoUrl || null,
          featured: Boolean(featured),
        },
      });
    } catch (e: any) {
      newGame = {
        id: "mock-" + Date.now(),
        title,
        slug,
        category,
        provider: provider || "Top Provider",
        rtp: rtp || "96.50%",
        volatility: volatility || "Medium",
        thumbnailUrl: thumbnailUrl || "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80",
        demoUrl: demoUrl || null,
        featured: Boolean(featured),
        createdAt: new Date().toISOString(),
      };
    }

    revalidatePath("/");
    return NextResponse.json({ success: true, game: newGame });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
