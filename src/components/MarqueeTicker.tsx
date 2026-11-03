"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AuthorityItem {
  name: string;
  icon: React.ReactNode;
}

const AUTHORITIES: AuthorityItem[] = [
  {
    name: "MGA",
    icon: (
      <svg className="w-6 h-6 text-rose-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4zm0 2.18l7 3.12v4.7c0 4.54-3.08 8.8-7 9.9-3.92-1.1-7-5.36-7-9.9V7.3l7-3.12zm-1 4.82v3h-3v2h3v3h2v-3h3v-2h-3V9h-2z" />
      </svg>
    ),
  },
  {
    name: "UKGC",
    icon: (
      <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3 6 6 1-4.5 4.5 1 6.5-5.5-3.5L6.5 20l1-6.5L3 9l6-1z" />
      </svg>
    ),
  },
  {
    name: "eCOGRA",
    icon: (
      <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    name: "iTech Labs",
    icon: (
      <svg className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
  },
  {
    name: "Curacao GCB",
    icon: (
      <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.2h7.6l-6.1 4.5 2.3 7.1-6.2-4.4-6.2 4.4 2.3-7.1-6.1-4.5h7.6z" />
      </svg>
    ),
  },
  {
    name: "GLI-19",
    icon: (
      <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
        <line x1="12" y1="22" x2="12" y2="12" />
        <polyline points="2 8.5 12 12 22 8.5" />
      </svg>
    ),
  },
];

export default function MarqueeTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    if (!track1Ref.current || !track2Ref.current) return;

    // Continuous GSAP linear marquee matching the template
    const t1 = gsap.to(track1Ref.current, {
      xPercent: -100,
      repeat: -1,
      duration: 24,
      ease: "none",
    });

    const t2 = gsap.to(track2Ref.current, {
      xPercent: -100,
      repeat: -1,
      duration: 24,
      ease: "none",
    });

    tweenRef.current = [t1, t2];

    return () => {
      t1.kill();
      t2.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    tweenRef.current.forEach((t) => t.pause());
  };

  const handleMouseLeave = () => {
    tweenRef.current.forEach((t) => t.play());
  };

  const renderContent = () => (
    <div className="flex items-center gap-12 sm:gap-16 px-6 shrink-0">
      {AUTHORITIES.map((auth, index) => (
        <div key={`${auth.name}-${index}`} className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/25 transition-all duration-200">
            {auth.icon}
          </div>
          <span className="font-semibold text-lg sm:text-xl text-zinc-300 group-hover:text-white transition-colors tracking-tight">
            {auth.name}
          </span>
          <span className="text-zinc-700 text-xs ml-4 sm:ml-6 font-mono">✦</span>
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={tickerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full bg-[#08090C] border-y border-white/[0.08] py-4 overflow-hidden relative cursor-default select-none shadow-inner"
    >
      <div className="flex w-max">
        <div ref={track1Ref} className="flex shrink-0">
          {renderContent()}
        </div>
        <div ref={track2Ref} className="flex shrink-0">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
