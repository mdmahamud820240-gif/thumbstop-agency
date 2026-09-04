"use client";

import React from "react";
import { ServicePackage, siteConfig } from "@/data/content";
import { useContent } from "@/context/ContentContext";
import { Check, Sparkles, ArrowRight, MessageCircle } from "lucide-react";

interface PricingCardProps {
  pkg: ServicePackage;
  serviceTitle?: string;
}

export function PricingCard({ pkg, serviceTitle }: PricingCardProps) {
  const { locale, siteConfig: currentConfig } = useContent();
  const isBn = locale === "bn";
  const isPremium = pkg.isPopular || pkg.isGuaranteed;

  const inquiryUrl = `${currentConfig.whatsappLink}%20regarding%20the%20${encodeURIComponent(
    pkg.name
  )}${serviceTitle ? `%20(${encodeURIComponent(serviceTitle)})` : ""}`;

  return (
    <div
      className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
        isPremium
          ? "bg-gradient-to-b from-[#0f172a] via-[#0b1020] to-[#070A12] border border-[#1FA8CB]/40 shadow-2xl shadow-[#1FA8CB]/10 scale-[1.02]"
          : "bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08]"
      }`}
    >
      {/* Premium Badge */}
      {pkg.isGuaranteed && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold tracking-wide bg-[#C9A86A]/20 border border-[#C9A86A]/50 text-[#DFCA98] backdrop-blur-md flex items-center gap-1.5 shadow-lg shadow-black/50">
          <Sparkles className="w-3.5 h-3.5 text-[#DFCA98]" />
          <span className={isBn ? "font-bangla" : ""}>
            {isBn ? "প্রতিষ্ঠানিক নিশ্চয়তা" : "Institutional Guarantee"}
          </span>
        </div>
      )}

      {pkg.isPopular && !pkg.isGuaranteed && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold tracking-wide bg-gradient-to-r from-[#1FA8CB] to-[#2E5FCC] text-white shadow-lg shadow-[#1FA8CB]/30">
          <span className={isBn ? "font-bangla" : ""}>
            {isBn ? "সর্বাধিক প্রশংসিত" : "Most Requested"}
          </span>
        </div>
      )}

      <div>
        {/* Package Name */}
        <h3 className={`text-xl font-bold text-white mb-2 ${isBn ? "font-bangla" : "font-serif"}`}>
          {pkg.name}
        </h3>

        {/* Short description */}
        <p className={`text-xs sm:text-sm text-slate-300 font-light mb-6 min-h-[36px] ${isBn ? "font-bangla" : ""}`}>
          {pkg.description}
        </p>

        {/* Price display */}
        <div className="flex items-baseline gap-2 mb-8 pb-6 border-b border-white/[0.08]">
          <span className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
            {pkg.price}
          </span>
          {pkg.period && (
            <span className={`text-xs text-slate-400 font-light ${isBn ? "font-bangla" : ""}`}>
              / {pkg.period}
            </span>
          )}
        </div>

        {/* Features Checklist */}
        <div className="space-y-3 mb-8">
          <span className={`text-[11px] font-semibold uppercase tracking-wider text-slate-400 block ${isBn ? "font-bangla" : ""}`}>
            {isBn ? "প্যাকেজে যা যা পাচ্ছেন:" : "What is included:"}
          </span>
          {pkg.features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
              <div className="w-4 h-4 rounded-full bg-[#1FA8CB]/20 flex items-center justify-center shrink-0 mt-0.5 text-[#1FA8CB]">
                <Check className="w-2.5 h-2.5" />
              </div>
              <span className={`leading-snug ${isBn ? "font-bangla" : ""}`}>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="space-y-3 pt-4 border-t border-white/[0.06]">
        <a
          href={inquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold transition-all duration-300 ${
            isPremium
              ? "bg-gradient-to-r from-[#1FA8CB] to-[#2E5FCC] text-white hover:opacity-95 shadow-lg shadow-[#1FA8CB]/25"
              : "bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10"
          }`}
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span className={isBn ? "font-bangla" : ""}>
            {isBn ? "হোয়াটসঅ্যাপে প্যাকেজটি নিশ্চিত করুন" : "Claim Package on WhatsApp"}
          </span>
          <ArrowRight className="w-3.5 h-3.5 ml-auto" />
        </a>
      </div>
    </div>
  );
}
