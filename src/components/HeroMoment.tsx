"use client";

import React from "react";
import Link from "next/link";
import { useContent } from "@/context/ContentContext";
import { ArrowRight, MessageCircle } from "lucide-react";

export function HeroMoment() {
  const { siteConfig, services, locale } = useContent();

  const isBn = locale === "bn";
  const heroImage = siteConfig.heroImageUrl || "/images/hero-showcase.jpg";
  const primaryColor = siteConfig.themeAccentColor || "#1FA8CB";
  const secondaryColor = siteConfig.themeSecondaryColor || "#2E5FCC";

  return (
    <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-36 overflow-hidden">
      {/* Deliberate luxury atmospheric glow - dynamically reflecting CMS theme */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[1000px] h-[550px] blur-[160px] rounded-full pointer-events-none transition-all duration-700 opacity-60"
        style={{
          background: `radial-gradient(circle, ${primaryColor}40 0%, ${secondaryColor}25 50%, transparent 80%)`,
        }}
      />

      {/* Subtle secondary ambient warmth */}
      <div
        className="absolute top-1/3 right-1/4 w-80 h-80 blur-[140px] rounded-full pointer-events-none opacity-40 transition-all duration-700"
        style={{ backgroundColor: `${secondaryColor}33` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Subtle Brand Pill / Tagline */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/10 backdrop-blur-md mb-8 transition-all shadow-lg shadow-black/40"
          style={{ borderColor: `${primaryColor}40` }}
        >
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: primaryColor }} />
          <span className="tracking-wide" style={{ color: primaryColor }}>{siteConfig.taglineEn}</span>
          <span className="text-white/20">•</span>
          <span className="text-slate-400 font-bangla">{siteConfig.taglineBn}</span>
        </div>

        {/* Deliberate Hero Headline */}
        <h1
          className={`text-4xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-white leading-[1.15] sm:leading-[1.1] max-w-5xl mx-auto mb-8 ${
            isBn ? "font-bangla font-bold" : ""
          }`}
        >
          {isBn ? (
            siteConfig.heroHeadlineBn ? (
              <span className="leading-tight">{siteConfig.heroHeadlineBn}</span>
            ) : (
              <>
                ডিজিটাল মাধ্যমে অনন্য প্রভাব — যেখানে{" "}
                <span className="relative inline-block">
                  <span
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage: `linear-gradient(to right, #A5F3FC, ${siteConfig.themeAccentColor || "#1FA8CB"}, ${siteConfig.themeSecondaryColor || "#2E5FCC"})`,
                    }}
                  >
                    আঙুল থামবেই।
                  </span>
                  <span
                    className="absolute left-0 bottom-1 w-full h-[3px]"
                    style={{
                      background: `linear-gradient(to right, transparent, ${(siteConfig.themeAccentColor || "#1FA8CB")}99, transparent)`,
                    }}
                  />
                </span>
              </>
            )
          ) : (
            siteConfig.heroHeadlineEn ? (
              <span className="leading-tight">{siteConfig.heroHeadlineEn}</span>
            ) : (
              <>
                Crafting Digital Impact That Makes Every{" "}
                <span className="relative inline-block">
                  <span
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage: `linear-gradient(to right, #A5F3FC, ${siteConfig.themeAccentColor || "#1FA8CB"}, ${siteConfig.themeSecondaryColor || "#2E5FCC"})`,
                    }}
                  >
                    Thumb Stop.
                  </span>
                  <span
                    className="absolute left-0 bottom-1 w-full h-[3px]"
                    style={{
                      background: `linear-gradient(to right, transparent, ${(siteConfig.themeAccentColor || "#1FA8CB")}99, transparent)`,
                    }}
                  />
                </span>
              </>
            )
          )}
        </h1>

        {/* Supporting Narrative */}
        <p
          className={`text-base sm:text-xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed mb-10 ${
            isBn ? "font-bangla text-base sm:text-lg" : ""
          }`}
        >
          {isBn
            ? siteConfig.heroSubtitleBn ||
              "বাংলাদেশের প্রিমিয়াম ডিজিটাল এজেন্সি—অনলাইন মাদরাসা সল্যুশন, হাই-আরওএএস মার্কেটিং, আধুনিক ওয়েব আর্কিটেকচার, মেটা ভেরিফিকেশন ও সিনেমেটিক ভিডিও প্রোডাকশনের নির্ভরযোগ্য প্রতিষ্ঠান।"
            : siteConfig.heroSubtitleEn ||
              "Bangladesh's luxury digital agency uniting institutional madrasa solutions, high-ROAS marketing, bespoke web engineering, Meta verification, and cinematic video production."}
        </p>

        {/* Dual Primary Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-16">
          <Link
            href={siteConfig.heroCtaLink || "/services"}
            style={{
              background: `linear-gradient(to right, ${siteConfig.themeAccentColor || "#1FA8CB"}, ${siteConfig.themeSecondaryColor || "#2E5FCC"})`,
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-semibold text-white hover:opacity-95 shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            <span className={isBn ? "font-bangla" : ""}>
              {isBn
                ? siteConfig.heroCtaTextBn || `${services.length}টি বিশেষায়িত সেবা দেখুন`
                : siteConfig.heroCtaTextEn || `Explore ${services.length} Core Services`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-slate-200 bg-white/[0.04] border border-white/10 hover:border-white/20 hover:text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
          >
            <MessageCircle
              className="w-4 h-4"
              style={{ color: siteConfig.themeAccentColor || "#1FA8CB" }}
            />
            <span className={isBn ? "font-bangla" : ""}>
              {isBn ? "হোয়াটসঅ্যাপে সরাসরি পরামর্শ নিন" : "Instant WhatsApp Consultation"}
            </span>
          </a>
        </div>

        {/* ⭐️ APPLE-GRADE CINEMATIC VISUAL SHOWCASE */}
        <div
          className="relative mx-auto max-w-5xl rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-white/15 via-white/[0.04] to-transparent border border-white/15 backdrop-blur-2xl group transition-all duration-500"
          style={{
            boxShadow: `0 25px 80px -15px ${primaryColor}44`,
          }}
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-black">
            <img
              src={heroImage}
              alt="ThumbStop Creative Agency Luxury Workspace"
              className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-black/30 to-black/10 pointer-events-none" />

            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-xl shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className={`text-[11px] font-medium text-white tracking-wide ${isBn ? "font-bangla" : ""}`}>
                {isBn ? "ঢাকা ক্রিয়েটিভ স্টুডিও • ৪K আল্ট্রা এইচডি প্রোডাকশন" : "Dhaka Creative Studio • 4K HDR Production"}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
              <div>
                <span
                  className={`text-[10px] uppercase tracking-widest font-semibold block ${isBn ? "font-bangla" : ""}`}
                  style={{ color: primaryColor }}
                >
                  {isBn ? "বাণিজ্যিক লাক্সারি মানদণ্ড" : "Commercial Luxury Standards"}
                </span>
                <p className={`text-white text-sm sm:text-base font-serif font-bold ${isBn ? "font-bangla" : ""}`}>
                  {isBn ? "শীর্ষ ব্র্যান্ডের জন্য উচ্চ-রূপান্তরকারী নান্দনিকতা" : "High-Converting Aesthetics For Discerning Brands"}
                </p>
              </div>

              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all shadow-md"
              >
                <span className={isBn ? "font-bangla" : ""}>
                  {isBn ? "সব সেবার বিবরণ দেখুন" : "View All Portfolio Specs"}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-16 pt-10 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          {siteConfig.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] backdrop-blur-sm"
            >
              <div className="text-2xl sm:text-3xl font-mono font-bold text-white mb-1">
                {stat.value}
              </div>
              <div
                className={`text-xs font-medium mb-0.5 ${isBn ? "font-bangla" : ""}`}
                style={{ color: primaryColor }}
              >
                {isBn ? stat.labelBn : stat.labelEn}
              </div>
              <div className="text-[11px] text-slate-400 font-light truncate">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
