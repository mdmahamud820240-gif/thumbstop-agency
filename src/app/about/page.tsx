"use client";

import React from "react";
import { useContent } from "@/context/ContentContext";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBanner } from "@/components/CtaBanner";
import { Sparkles, Compass, Target, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  const { siteConfig, locale } = useContent();
  const isBn = locale === "bn";
  const { aboutStory } = siteConfig;

  return (
    <div className="pt-28 pb-20 relative">
      {/* Hero Section */}
      <section className="py-16 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-[#1FA8CB]/15 text-cyan-300 border border-[#1FA8CB]/30 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className={isBn ? "font-bangla" : ""}>
            {isBn ? "আমাদের গল্প ও দর্শন" : "The Story Behind The Name"}
          </span>
        </div>
        <h1 className={`text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight mb-6 ${isBn ? "font-bangla" : "font-serif"}`}>
          {isBn ? aboutStory.headingBn : aboutStory.headingEn}
        </h1>
        <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-6 ${isBn ? "font-sans text-slate-400" : "font-bangla text-[#1FA8CB]"}`}>
          {isBn ? aboutStory.headingEn : aboutStory.headingBn}
        </p>
        <p className={`text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto leading-relaxed ${isBn ? "font-bangla" : ""}`}>
          {isBn ? aboutStory.subheadingBn : aboutStory.subheadingEn}
        </p>
      </section>

      {/* Narrative */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-3xl p-8 sm:p-14 bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#1FA8CB]/10 to-transparent blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10 text-slate-300 font-light leading-relaxed">
            {(isBn ? aboutStory.paragraphsBn : aboutStory.paragraphsEn).map((para, idx) => (
              <p key={idx} className={`text-base sm:text-lg ${isBn ? "font-bangla" : ""}`}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          badge={isBn ? "মূল চালিকাশক্তি" : "Guiding Principles"}
          title={isBn ? "থাম্বস্টপের তিনটি মূল ভিত্তি" : "The Three Pillars of ThumbStop"}
          subtitle={
            isBn
              ? "প্রতিটি প্রজেক্টে আমরা যেভাবে সৃজনশীলতা ও নিখুঁত মানের সমন্বয় নিশ্চিত করি।"
              : "How we maintain unyielding creative rigor across every campaign."
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutStory.values.map((val, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-[#1FA8CB]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1FA8CB]/20 to-[#2E5FCC]/10 border border-white/10 flex items-center justify-center text-cyan-300 mb-6">
                  {idx === 0 && <Compass className="w-6 h-6" />}
                  {idx === 1 && <Target className="w-6 h-6" />}
                  {idx === 2 && <ShieldCheck className="w-6 h-6" />}
                </div>

                <h3 className={`text-xl font-bold text-white mb-1 ${isBn ? "font-bangla" : "font-serif"}`}>
                  {isBn ? val.titleBn : val.titleEn}
                </h3>
                <p className={`text-xs font-medium mb-3 ${isBn ? "text-slate-400 font-sans" : "font-bangla text-[#1FA8CB]"}`}>
                  {isBn ? val.titleEn : val.titleBn}
                </p>
                <p className={`text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-4 ${isBn ? "font-bangla" : ""}`}>
                  {isBn ? val.descriptionBn : val.descriptionEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Agency Metrics in Detail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#090E1B] border border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {siteConfig.stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-3xl sm:text-5xl font-mono font-bold text-white block">
                {stat.value}
              </span>
              <span className={`text-xs sm:text-sm font-semibold text-cyan-300 block ${isBn ? "font-bangla" : ""}`}>
                {isBn ? stat.labelBn : stat.labelEn}
              </span>
              <span className="text-xs text-slate-400 block font-light">
                {stat.subtext}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CtaBanner />
    </div>
  );
}
