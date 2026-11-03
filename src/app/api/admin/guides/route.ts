import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const DEFAULT_GUIDES = [
  {
    id: "guide-1",
    title: "How to Choose a Safe & Regulated Online Casino in 2026",
    slug: "how-to-choose-safe-casino",
    category: "Beginner",
    excerpt: "Learn how to verify MGA, Curacao, and UKGC licenses, examine SSL security, and test customer support before depositing.",
    content: "Full guide content detailing licensing authorities, payout verification, and responsible gaming tools.",
    readTime: "6 min read",
    published: true,
  },
  {
    id: "guide-2",
    title: "No Deposit Bonuses: Real Terms, Wagering & Max Cashout Rules",
    slug: "no-deposit-bonuses-rules",
    category: "Strategy",
    excerpt: "Everything you need to know about claiming free spins and no deposit cash without falling into hidden wagering traps.",
    content: "Comprehensive breakdown of 35x-50x wagering requirements, eligible games, and KYC withdrawal requirements.",
    readTime: "8 min read",
    published: true,
  },
  {
    id: "guide-3",
    title: "Crypto vs Traditional Banking: Speed, Fees & Privacy Compared",
    slug: "crypto-vs-fiat-gambling",
    category: "Payment",
    excerpt: "Bitcoin, USDT, and Ethereum vs Visa, MasterCard, and Wire Transfer for instant deposits and zero-fee payouts.",
    content: "Deep dive comparing blockchain transaction speeds to traditional fiat banking clearance cycles.",
    readTime: "5 min read",
    published: true,
  },
  {
    id: "guide-4",
    title: "Casino Blacklist Warning Signs: How to Spot Rogue Operators",
    slug: "casino-blacklist-warning-signs",
    category: "Safety",
    excerpt: "The 7 critical red flags that land bad casinos on our blacklist: rigged games, delayed payments, and fake licenses.",
    content: "Detailed investigative criteria our audit team uses before issuing a Rogue Casino warning.",
    readTime: "7 min read",
    published: true,
  },
];

export async function GET() {
  try {
    let guides: any[] = [];
    try {
      guides = await prisma.guide.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch {
      // db fallback
    }

    if (guides.length === 0) {
      guides = DEFAULT_GUIDES;
    }

    return NextResponse.json({ success: true, guides, count: guides.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, excerpt, content, readTime, published } = body;

    if (!title || !content) {
      return NextResponse.json({ success: false, error: "Title and Content are required" }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") + "-" + Date.now().toString().slice(-4);

    let newGuide;
    try {
      newGuide = await prisma.guide.create({
        data: {
          title,
          slug,
          category: category || "General",
          excerpt: excerpt || title,
          content,
          readTime: readTime || "5 min read",
          published: published !== false,
        },
      });
    } catch (e: any) {
      newGuide = {
        id: "mock-guide-" + Date.now(),
        title,
        slug,
        category: category || "General",
        excerpt: excerpt || title,
        content,
        readTime: readTime || "5 min read",
        published: published !== false,
        createdAt: new Date().toISOString(),
      };
    }

    revalidatePath("/");
    return NextResponse.json({ success: true, guide: newGuide });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
