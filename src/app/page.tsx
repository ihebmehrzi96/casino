import HomeClientView from "@/components/HomeClientView";
import { getCasinos, getBlacklist, getSiteStats } from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const [casinos, blacklist, stats] = await Promise.all([
    getCasinos(),
    getBlacklist(),
    getSiteStats(),
  ]);

  return <HomeClientView casinos={casinos} blacklist={blacklist} stats={stats} />;
}
