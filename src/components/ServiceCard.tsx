"use client";

import React from "react";
import Link from "next/link";
import { ServiceItem } from "@/data/content";
import { useContent } from "@/context/ContentContext";
import { ServiceIcon } from "./ServiceIcon";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

interface ServiceCardProps {
  service: ServiceItem;
  featured?: boolean;
}

export function ServiceCard({ service, featured = false }: ServiceCardProps) {
  const { locale, siteConfig } = useContent();
  const isBn = locale === "bn";
  const isGuaranteed = !!service.guarantees && service.guarantees.length > 0;
  const primaryColor = siteConfig?.themeAccentColor || service.themeColor || "#1FA8CB";

  return (
    <Link
      href={`/services/${service.slug}`}
      style={
        featured
          ? {
              borderColor: `${primaryColor}55`,
              boxShadow: `0 20px 50px -10px ${primaryColor}25`,
            }
          : undefined
      }
      className={`group relative rounded-3xl overflow-hidden transition-all duration-500 flex flex-col justify-between cursor-pointer block ${
        featured
          ? "bg-gradient-to-b from-[#0f172a] via-[#090e1c] to-[#070A12] border hover:-translate-y-1.5"
          : "bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20 shadow-xl hover:-translate-y-1.5"
      }`}
    >
      {/* Editorial High-Resolution Image Banner */}
      {service.imageUrl && (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
          <img
            src={service.imageUrl}
            alt={service.titleEn}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-black/30 pointer-events-none" />

          {/* Top Badge Overlay */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-black/60 border border-white/20 backdrop-blur-md shadow-lg transition-colors"
              style={{ color: primaryColor }}
            >
              <ServiceIcon name={service.iconName} className="w-4 h-4" />
            </div>

            {service.badge && (
              <span
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border tracking-wide flex items-center gap-1 backdrop-blur-md shadow-lg ${
                  isGuaranteed
                    ? "bg-[#C9A86A]/20 text-[#DFCA98] border-[#C9A86A]/50"
                    : "bg-black/60 border-white/20"
                }`}
                style={!isGuaranteed ? { color: primaryColor, borderColor: `${primaryColor}40` } : undefined}
              >
                {isGuaranteed && <Sparkles className="w-3 h-3 text-[#DFCA98]" />}
                {service.badge}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          {/* Titles */}
          <div className="mb-2.5">
            <h3
              className={`text-lg font-bold text-white group-hover:text-white transition-colors ${
                isBn ? "font-bangla" : "font-serif"
              }`}
            >
              {isBn ? service.titleBn : service.titleEn}
            </h3>
            <p
              className={`text-xs mt-0.5 font-medium ${isBn ? "text-slate-400 font-sans" : "font-bangla"}`}
              style={!isBn ? { color: primaryColor } : undefined}
            >
              {isBn ? service.titleEn : service.titleBn}
            </p>
          </div>

          {/* Short description */}
          <p className={`text-xs text-slate-300 leading-relaxed line-clamp-2 mb-4 font-light ${isBn ? "font-bangla" : ""}`}>
            {isBn ? service.shortDescriptionBn : service.shortDescriptionEn}
          </p>

          {/* Key bullets / highlights */}
          <div className="space-y-1.5 mb-5 pt-3 border-t border-white/[0.05]">
            {service.features.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: primaryColor }} />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer bar: Starting Price + CTA */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-4 mt-auto">
          <div>
            <span className={`text-[10px] uppercase tracking-wider text-slate-400 block font-light ${isBn ? "font-bangla" : ""}`}>
              {isBn ? "শুরু হচ্ছে" : "Starting From"}
            </span>
            <span className="text-xs sm:text-sm font-bold text-white font-mono">
              {service.startingPrice}
            </span>
          </div>

          <div
            className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors py-1.5 px-3 rounded-xl bg-white/[0.04] border border-white/10 group-hover:bg-white/[0.08]"
            style={{ color: primaryColor, borderColor: `${primaryColor}40` }}
          >
            <span className={isBn ? "font-bangla" : ""}>
              {isBn ? "বিস্তারিত ও ডেমো" : "Details & Demo"}
            </span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
