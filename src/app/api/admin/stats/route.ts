import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSiteStats } from "@/lib/data";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const stats = await getSiteStats();

    let settingsList: any[] = [];
    try {
      settingsList = await prisma.siteSetting.findMany();
    } catch {
      // fallback
    }

    const settingsMap = Object.fromEntries(settingsList.map((s) => [s.key, s.value]));

    return NextResponse.json({
      success: true,
      stats,
      settings: settingsMap,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { settings } = body;

    if (!settings || typeof settings !== "object") {
      return NextResponse.json({ success: false, error: "Invalid settings format" }, { status: 400 });
    }

    // Upsert each setting
    for (const [key, value] of Object.entries(settings)) {
      try {
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        });
      } catch (e) {
        // ignore if db offline
      }
    }

    revalidatePath("/");
    const updatedStats = await getSiteStats();

    return NextResponse.json({
      success: true,
      message: "Site stats settings updated successfully",
      stats: updatedStats,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
