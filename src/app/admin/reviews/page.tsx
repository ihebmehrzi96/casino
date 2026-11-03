import { prisma } from "@/lib/prisma";
import { MessageSquare, Check, Star } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  let reviews: any[] = [];
  try {
    reviews = await prisma.userReview.findMany({
      include: { casino: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    reviews = [];
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">Player Review Moderation</h1>
        <p className="text-sm text-slate-400 mt-1 font-medium">
          Approve or reject community player reviews before they appear on live casino review pages.
        </p>
      </div>

      <div className="rounded-3xl bg-[#111728]/90 border border-white/10 overflow-hidden shadow-xl backdrop-blur-md">
        {reviews.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-400 space-y-2">
            <MessageSquare className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="font-bold">No community player reviews submitted yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {reviews.map((r) => (
              <div key={r.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:bg-white/5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-black text-white">{r.authorName}</span>
                    <span className="text-xs text-slate-400 font-semibold">on {r.casino?.name}</span>
                    <div className="flex items-center gap-1 text-red-400 text-xs font-black bg-red-950/60 px-2 py-0.5 rounded border border-red-500/20">
                      <Star className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                      {r.rating}/10
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-slate-200">{r.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-2xl font-normal">{r.comment}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {r.isApproved ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 text-xs font-black border border-emerald-500/30">
                      Approved
                    </span>
                  ) : (
                    <form action={`/api/reviews/${r.id}/approve`} method="POST">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 transition shadow-sm"
                      >
                        <Check className="w-4 h-4" />
                        Approve Review
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
