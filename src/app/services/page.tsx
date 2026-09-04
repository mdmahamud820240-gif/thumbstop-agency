"use client";

import React from "react";
import Link from "next/link";
import { useContent } from "@/context/ContentContext";
import { ServiceIcon } from "@/components/ServiceIcon";
import { PricingCard } from "@/components/PricingCard";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { CtaBanner } from "@/components/CtaBanner";
import {
  CheckCircle2,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  Check,
  ExternalLink,
  Play,
  Images,
} from "lucide-react";

export default function ServicesPage() {
  const { services, siteConfig, locale } = useContent();
  const isBn = locale === "bn";

  return (
    <div className="pt-28 pb-20 relative">
      {/* Top Header */}
      <section className="py-16 relative overflow-hidden text-center max-w-5xl mx-auto px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium text-cyan-300 bg-white/[0.04] border border-white/10 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className={isBn ? "font-bangla" : ""}>
            {isBn ? "পূর্ণাঙ্গ সেবাসমূহ" : "Full Architectural Catalog"}
          </span>
        </div>
        <h1 className={`text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight mb-6 ${isBn ? "font-bangla" : "font-serif"}`}>
          {isBn
            ? `${services.length}টি বিশেষায়িত ডিজিটাল সেবা`
            : `${services.length} Precision Disciplines Built To Command Market Leadership.`}
        </h1>
        <p className={`text-base sm:text-lg text-slate-300 font-light max-w-3xl mx-auto leading-relaxed ${isBn ? "font-bangla" : ""}`}>
          {isBn
            ? "প্রতিটি সেবা নিশ্চিত ফলাফল, বাস্তব ব্যবসায়িক সাফল্য ও বিশ্বমানের লাক্সারি এক্সিকিউশনের জন্য বিশেষভাবে প্রস্তুত।"
            : "Every service is engineered for measurable commercial impact, guaranteed deliverables, and world-class luxury execution."}
        </p>

        {/* Quick Jump Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto p-2 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
          {services.map((s) => (
            <a
              key={s.id}
              href={`#${s.slug}`}
              className="px-3.5 py-1.5 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1FA8CB]" />
              <span className={isBn ? "font-bangla" : ""}>
                {isBn ? s.titleBn : s.titleEn}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 pt-8">
        {services.map((service) => {
          return (
            <section
              key={service.id}
              id={service.slug}
              className="scroll-mt-28 relative rounded-3xl p-6 sm:p-10 lg:p-14 bg-[#090E1B]/90 border border-white/[0.08] backdrop-blur-xl transition-all overflow-hidden"
            >
              {/* Subtle ambient accent glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#1FA8CB]/10 to-transparent blur-3xl rounded-full pointer-events-none" />

              {/* ⭐️ CINEMATIC EDITORIAL VISUAL BANNER */}
              {service.imageUrl && (
                <div className="mb-10 relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl group">
                  <img
                    src={service.imageUrl}
                    alt={service.titleEn}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-1000 ease-out opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090E1B] via-black/30 to-black/20 pointer-events-none" />

                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-black/70 border border-white/20 flex items-center justify-center text-cyan-300 backdrop-blur-md shadow-lg">
                      <ServiceIcon name={service.iconName} className="w-5 h-5" />
                    </div>
                    <div>
                      <span className={`text-[10px] uppercase tracking-widest text-[#1FA8CB] font-semibold block ${isBn ? "font-bangla" : ""}`}>
                        {isBn ? "বিশেষায়িত ডিসিপ্লিন" : "Discipline Showcase"}
                      </span>
                      <p className={`text-white text-base sm:text-lg font-bold ${isBn ? "font-bangla" : "font-serif"}`}>
                        {isBn ? service.titleBn : service.titleEn}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Service Header Info */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-white/[0.08]">
                <div className="space-y-4 max-w-3xl">
                  <div className="flex items-center gap-3">
                    {service.badge && (
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#C9A86A]/15 text-[#DFCA98] border border-[#C9A86A]/30 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className={`text-3xl sm:text-4xl font-bold text-white tracking-tight ${isBn ? "font-bangla" : "font-serif"}`}>
                      {isBn ? service.titleBn : service.titleEn}
                    </h2>
                    <p className={`text-base sm:text-lg font-medium mt-1 ${isBn ? "text-slate-400 font-sans" : "font-bangla text-[#1FA8CB]"}`}>
                      {isBn ? service.titleEn : service.titleBn}
                    </p>
                  </div>

                  <p className={`text-sm sm:text-base text-slate-300 font-light leading-relaxed ${isBn ? "font-bangla" : ""}`}>
                    {isBn ? service.detailedDescriptionBn : service.detailedDescriptionEn}
                  </p>

                  {/* ⭐️ Dedicated Service Showcase & Work Screenshots Page Link ⭐️ */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#1FA8CB] to-[#2E5FCC] hover:brightness-110 shadow-lg shadow-[#1FA8CB]/20 transition-all"
                    >
                      <Images className="w-4 h-4" />
                      <span className={isBn ? "font-bangla" : ""}>
                        {isBn ? "কাজের স্ক্রিনশট ও পূর্ণাঙ্গ বিবরণ ↗" : "View Screenshots & Full Showcase ↗"}
                      </span>
                    </Link>

                    {service.demoVideoUrl && (
                      <a
                        href={service.demoVideoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all"
                      >
                        <Play className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                        <span className={isBn ? "font-bangla" : ""}>
                          {isBn ? "ভিডিও ড্রাইভ রিল ↗" : "Watch Video Drive Reel ↗"}
                        </span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Starting Price & Action */}
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 lg:w-72 shrink-0 flex flex-col justify-between gap-4">
                  <div>
                    <span className={`text-[11px] uppercase tracking-wider text-slate-400 block font-light ${isBn ? "font-bangla" : ""}`}>
                      {isBn ? "শুরু হচ্ছে" : "Investment Starting At"}
                    </span>
                    <span className="text-2xl sm:text-3xl font-mono font-bold text-white">
                      {service.startingPrice}
                    </span>
                  </div>

                  <a
                    href={`${siteConfig.whatsappLink}%20regarding%20${encodeURIComponent(
                      service.titleEn
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#1FA8CB] to-[#2E5FCC] hover:opacity-95 shadow-md shadow-[#1FA8CB]/25 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className={isBn ? "font-bangla" : ""}>
                      {isBn ? "হোয়াটসঅ্যাপে বিস্তারিত জানুন" : "Inquire via WhatsApp"}
                    </span>
                  </a>
                </div>
              </div>

              {/* Special Sequence Process (if available) */}
              {service.processSteps && (
                <div className="pt-8">
                  <ProcessTimeline steps={service.processSteps} />
                </div>
              )}

              {/* Guarantees Box */}
              {service.guarantees && service.guarantees.length > 0 && (
                <div className="my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#172033] to-[#0d1424] border border-[#C9A86A]/40 shadow-xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#DFCA98] uppercase tracking-wider mb-4">
                    <ShieldCheck className="w-4 h-4 text-[#DFCA98]" />
                    <span className={isBn ? "font-bangla" : ""}>
                      {isBn ? "চুক্তিভিত্তিক নিশ্চয়তা ও সেবার শর্তাবলী" : "Contractual Guarantees & Support Terms"}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {service.guarantees.map((g, gIdx) => (
                      <div
                        key={gIdx}
                        className="p-4 rounded-xl bg-black/30 border border-white/10 flex items-start gap-3"
                      >
                        <Check className="w-4 h-4 text-[#DFCA98] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-200 font-bangla font-medium">
                          {g}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Subcategories */}
              {service.categories && (
                <div className="my-10">
                  <h3 className={`text-sm font-semibold tracking-wider uppercase text-slate-300 mb-6 ${isBn ? "font-bangla" : ""}`}>
                    {isBn ? "বিশেষায়িত ক্যাটাগরি ও ফরম্যাট" : "Specialized Sub-Categories & Formats"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {service.categories.map((cat, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between"
                      >
                        <div>
                          <h4 className={`text-base font-bold text-white mb-0.5 ${isBn ? "font-bangla" : "font-serif"}`}>
                            {isBn ? cat.nameBn : cat.nameEn}
                          </h4>
                          <p className={`text-xs mb-4 ${isBn ? "text-slate-400 font-sans" : "font-bangla text-cyan-400"}`}>
                            {isBn ? cat.nameEn : cat.nameBn}
                          </p>
                          <ul className="space-y-2 text-xs text-slate-300">
                            {cat.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1FA8CB] shrink-0 mt-1.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Service Feature Highlights */}
              <div className="my-10 pt-6 border-t border-white/[0.06]">
                <h3 className={`text-sm font-semibold tracking-wider uppercase text-slate-300 mb-6 ${isBn ? "font-bangla" : ""}`}>
                  {isBn ? "প্যাকেজে অন্তর্ভুক্ত সুবিধাসমূহ" : "Standard Capabilities Included"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {service.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#1FA8CB] shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packages */}
              {service.packages && service.packages.length > 0 && (
                <div className="mt-12 pt-8 border-t border-white/[0.08]">
                  <h3 className={`text-sm font-semibold tracking-wider uppercase text-slate-300 mb-6 ${isBn ? "font-bangla" : ""}`}>
                    {isBn ? "উপলব্ধ প্যাকেজ ও স্তর" : "Available Packages & Tiers"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {service.packages.map((pkg, pIdx) => (
                      <PricingCard
                        key={pIdx}
                        pkg={pkg}
                        serviceTitle={service.titleEn}
                      />
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <CtaBanner />
    </div>
  );
}
