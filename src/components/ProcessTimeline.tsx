"use client";

import React from "react";
import { useContent } from "@/context/ContentContext";
import { ArrowRight, Sparkles } from "lucide-react";

interface Step {
  step: number;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
}

interface ProcessTimelineProps {
  steps: Step[];
  title?: string;
  subtitle?: string;
}

export function ProcessTimeline({
  steps,
  title,
  subtitle,
}: ProcessTimelineProps) {
  const { locale } = useContent();
  const isBn = locale === "bn";

  const defaultTitle = isBn
    ? "আমাদের ৩-ধাপের বিশেষ পদ্ধতি"
    : "Our Structured 3-Step Execution Sequence";

  const defaultSubtitle = isBn
    ? "পরিকল্পনা থেকে পূর্ণাঙ্গ লাইভ বাস্তবায়ন: পরিকল্পনা → ডিজাইন → ডেভেলপমেন্ট।"
    : "How we transform high-level concepts into revenue-generating digital infrastructure.";

  return (
    <div className="relative my-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.08] backdrop-blur-xl">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-cyan-300 bg-[#1FA8CB]/10 border border-[#1FA8CB]/20 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className={isBn ? "font-bangla" : ""}>
            {isBn ? "পরীক্ষিত কার্যপদ্ধতি" : "Proven Sequence"}
          </span>
        </div>
        <h3 className={`text-2xl sm:text-3xl font-bold text-white ${isBn ? "font-bangla" : "font-serif"}`}>
          {title || defaultTitle}
        </h3>
        <p className={`mt-2 text-sm text-slate-400 font-light ${isBn ? "font-bangla" : ""}`}>
          {subtitle || defaultSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((item, idx) => (
          <div
            key={item.step}
            className="relative p-6 rounded-2xl bg-[#070A12]/80 border border-white/[0.06] hover:border-[#1FA8CB]/40 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-4">
                <span className="w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-sm bg-gradient-to-br from-[#1FA8CB] to-[#2E5FCC] text-white shadow-md shadow-[#1FA8CB]/20">
                  {item.step}
                </span>
                {idx < steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-500 hidden md:block group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                )}
              </div>

              {/* Title */}
              <h4 className={`text-lg font-bold text-white mb-1 ${isBn ? "font-bangla" : "font-serif"}`}>
                {isBn ? item.titleBn : item.titleEn}
              </h4>
              <p className={`text-xs font-medium mb-3 ${isBn ? "text-slate-400 font-sans" : "font-bangla text-[#1FA8CB]"}`}>
                {isBn ? item.titleEn : item.titleBn}
              </p>

              {/* Description */}
              <p className={`text-xs text-slate-300 leading-relaxed font-light ${isBn ? "font-bangla" : ""}`}>
                {isBn ? item.descriptionBn : item.descriptionEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
