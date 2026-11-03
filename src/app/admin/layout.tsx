"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  Gift,
  ShieldAlert,
  MessageSquare,
  BarChart3,
  Gamepad2,
  BookOpen,
  ArrowLeft,
  LogOut,
  User,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const navLinks = [
    { href: "/admin", label: "Dashboard Overview", icon: LayoutDashboard },
    { href: "/admin/stats", label: "Real Stats & Settings", icon: BarChart3 },
    { href: "/admin/casinos", label: "Manage Casinos", icon: Building2 },
    { href: "/admin/casinos/new", label: "Add New Casino", icon: PlusCircle },
    { href: "/admin/bonuses", label: "Manage Bonuses", icon: Gift },
    { href: "/admin/games", label: "Games Catalog", icon: Gamepad2 },
    { href: "/admin/guides", label: "Gambling Guides", icon: BookOpen },
    { href: "/admin/blacklist", label: "Blacklist / Rogues", icon: ShieldAlert },
    { href: "/admin/reviews", label: "User Review Queue", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#080C15] text-slate-100">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-72 bg-[#0A0F1D] border-r border-white/10 shrink-0 p-6 space-y-6 flex flex-col justify-between shadow-xl">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black text-lg shadow-lg">
              C
            </div>
            <div>
              <div className="flex items-center gap-1 leading-none">
                <span className="text-lg font-black text-white">CASINOVA</span>
                <span className="text-xs font-bold text-zinc-500">®</span>
              </div>
              <div className="text-xs text-zinc-400 font-bold mt-1">
                Admin Control Room
              </div>
            </div>
          </div>

          <nav className="space-y-1.5 text-sm font-bold">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition ${
                    isActive
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/30 font-black"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0 text-red-400" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition px-2 py-2 font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Public Website
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-sm text-red-400 hover:text-white hover:bg-red-600/20 transition px-3 py-2.5 rounded-xl font-bold border border-red-500/20"
          >
            <LogOut className="w-4 h-4 text-red-500" />
            Lock & Logout
          </button>
        </div>
      </aside>

      {/* Admin Content Area with Top Header */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Sticky Admin Top Bar */}
        <header className="sticky top-0 z-40 h-20 border-b border-white/10 bg-[#080C15]/85 backdrop-blur-xl px-8 md:px-12 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2.5 text-sm text-slate-400 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <span>Logged in as </span>
            <strong className="text-white flex items-center gap-1 font-black">
              <User className="w-4 h-4 text-red-500" />
              admin
            </strong>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-slate-200 font-bold transition border border-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              View Public Site
            </Link>

            {/* Red Logout Button */}
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm font-black flex items-center gap-2 transition shadow-lg shadow-red-600/40 border border-red-400/30"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </header>

        {/* Inner Content */}
        <div className="p-8 md:p-12 flex-1 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
