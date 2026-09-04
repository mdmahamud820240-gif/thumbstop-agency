"use client";

import React from "react";
import { useContent } from "@/context/ContentContext";
import { SectionHeading } from "./SectionHeading";
import { Sparkles, ShieldCheck, Award } from "lucide-react";

export function TrustSection() {
  const { siteConfig, locale } = useContent();
  const isBn = locale === "bn";
  const icons = [Sparkles, Award, ShieldCheck];
  const primaryColor = siteConfig.themeAccentColor || "#1FA8CB";
  const secondaryColor = siteConfig.themeSecondaryColor || "#2E5FCC";

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-[#05070D] to-transparent">
      {/* Background ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] blur-[120px] pointer-events-none opacity-25 transition-all duration-700"
        style={{ backgroundColor: `${primaryColor}25` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge={isBn ? "আপোষহীন মানদণ্ড" : "Uncompromising Standards"}
          title={isBn ? siteConfig.whyChooseUs.titleBn : siteConfig.whyChooseUs.titleEn}
          subtitle={isBn ? siteConfig.whyChooseUs.descriptionBn : siteConfig.whyChooseUs.descriptionEn}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteConfig.whyChooseUs.points.map((pt, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="relative rounded-2xl p-8 bg-white/[0.02] border border-white/[0.07] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                style={{
                  borderColor: undefined,
                }}
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}25, ${secondaryColor}15)`,
                      color: primaryColor,
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className={`text-xl font-bold text-white mb-1 ${isBn ? "font-bangla" : "font-serif"}`}>
                    {isBn ? pt.titleBn : pt.titleEn}
                  </h3>
                  <p
                    className={`text-xs font-medium mb-3 ${isBn ? "text-slate-400 font-sans" : "font-bangla"}`}
                    style={!isBn ? { color: primaryColor } : undefined}
                  >
                    {isBn ? pt.titleEn : pt.titleBn}
                  </p>
                  <p className={`text-sm text-slate-300 font-light leading-relaxed mb-4 ${isBn ? "font-bangla" : ""}`}>
                    {isBn ? pt.descriptionBn : pt.descriptionEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
