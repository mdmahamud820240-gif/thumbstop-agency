import React from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  goldBadge?: boolean;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  goldBadge = false,
}: SectionHeadingProps) {
  const alignmentClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl mb-14 sm:mb-18 ${alignmentClass}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium tracking-wide mb-4 transition-all duration-300 border border-white/10 bg-white/[0.03] backdrop-blur-md">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              goldBadge ? "bg-amber-400" : "bg-cyan-400"
            } animate-pulse`}
          />
          <span className={goldBadge ? "text-[#DFCA98]" : "text-cyan-300"}>
            {badge}
          </span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
