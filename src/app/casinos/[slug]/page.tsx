import { notFound } from "next/navigation";
import { getCasinoBySlug } from "@/lib/data";
import CasinoDetailClientView from "@/components/CasinoDetailClientView";

export const revalidate = 60;

interface ReviewPageProps {
  params: {
    slug: string;
  };
}

export default async function CasinoReviewPage({ params }: ReviewPageProps) {
  const casino = await getCasinoBySlug(params.slug);

  if (!casino) {
    notFound();
  }

  let pros: string[] = [];
  let cons: string[] = [];
  try {
    pros = JSON.parse((casino as any).pros || "[]");
    cons = JSON.parse((casino as any).cons || "[]");
  } catch {
    pros = [];
    cons = [];
  }

  return (
    <CasinoDetailClientView
      casino={casino}
      pros={pros}
      cons={cons}
    />
  );
}
