import CasinosDirectoryClientView from "@/components/CasinosDirectoryClientView";
import { getCasinos } from "@/lib/data";

export const revalidate = 60;

export default async function CasinosListPage() {
  const casinos = await getCasinos();
  return <CasinosDirectoryClientView casinos={casinos} />;
}
