import BlacklistClientView from "@/components/BlacklistClientView";
import { getBlacklist } from "@/lib/data";

export const revalidate = 60;

export default async function BlacklistPage() {
  const blacklist = await getBlacklist();
  return <BlacklistClientView blacklist={blacklist} />;
}
