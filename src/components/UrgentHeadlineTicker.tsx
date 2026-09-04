"use client";

import React from "react";
import Link from "next/link";
import { useContent } from "@/context/ContentContext";
import { ArrowRight } from "lucide-react";

export function UrgentHeadlineTicker({ inAdmin = false }: { inAdmin?: boolean }) {
  const { siteConfig } = useContent();
  const headline = siteConfig?.urgentHeadline;

  // If disabled or no text, don't show on public site
  if (!headline || !headline.enabled || !headline.text?.trim()) {
    return null;
  }

  const text = headline.text.trim();

  return (
    <aside
      aria-label="Urgent Headline Ticker"
      className={`w-full overflow-hidden select-none z-[60] relative ${
        inAdmin
          ? "border-t border-white/10 bg-[#060D1A]/95"
          : "bg-[#050812]/95 border-b border-white/10 backdrop-blur-md"
      }`}
    >
      {/* ⭐️ Top Slim Animated RGB Gradient Line (চিকন RGB বর্ডার) ⭐️ */}
      <div className="h-[2px] w-full rgb-gradient-animated" />

      <div className="h-7 sm:h-8 flex items-center px-2.5 sm:px-4 text-[11px] sm:text-xs">
        {/* Left Live Badge */}
        <div className="flex items-center gap-1.5 shrink-0 z-10 pr-3 bg-gradient-to-r from-[#050812] via-[#050812] to-transparent">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-sm shadow-red-500" />
          </span>
          <span className="font-mono font-bold tracking-wider uppercase text-[10px] text-white flex items-center gap-1">
            <span className="rgb-text-animated font-extrabold">LIVE</span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-amber-300/90 font-sans hidden sm:inline">জরুরি হেডলাইন:</span>
          </span>
        </div>

        {/* Continuous Smooth Infinite Marquee Scrolling (একপাশ থেকে গিয়ে আরেকপাশ থেকে অবিরাম ঢুকবে) */}
        <div className="flex-1 overflow-hidden relative mask-linear-fade">
          <div className="animate-ticker-marquee flex items-center gap-12 font-medium text-slate-200">
            {/* Repeated 4 times to ensure seamless infinite looping with zero gaps */}
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="flex items-center gap-4 shrink-0">
                <span className="hover:text-cyan-300 transition-colors cursor-default">
                  {text}
                </span>
                <span className="text-cyan-400/60 font-bold">•</span>
                {headline.linkText && headline.linkUrl && (
                  <Link
                    href={headline.linkUrl}
                    className="inline-flex items-center gap-0.5 text-cyan-400 hover:text-cyan-300 text-[10px] font-mono uppercase font-bold hover:underline"
                  >
                    <span>{headline.linkText}</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </Link>
                )}
                <span className="text-cyan-400/60 font-bold">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Subtle RGB Accent Glow */}
        <div className="hidden sm:flex items-center gap-1 shrink-0 pl-2 text-[10px] font-mono text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 animate-pulse" />
          <span className="text-[9px] tracking-widest uppercase opacity-70">ThumbStop 24/7</span>
        </div>
      </div>

      {/* Bottom Ultra-Subtle RGB Glow Accent */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
    </aside>
  );
}
