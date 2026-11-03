import BonusesClientView from "@/components/BonusesClientView";
import { getCasinos } from "@/lib/data";

export const revalidate = 60;

export default async function BonusesPage() {
  const casinos = await getCasinos();

  // Flatten all bonuses
  const allBonuses = casinos.flatMap((casino) =>
    (casino.bonuses || []).map((bonus: any) => ({
      ...bonus,
      casinoName: casino.name,
      casinoSlug: casino.slug,
      casinoLogo: casino.logoUrl,
      safetyIndex: casino.safetyIndex,
      safetyTier: casino.safetyTier,
    }))
  );

  return <BonusesClientView bonuses={allBonuses} />;
}
