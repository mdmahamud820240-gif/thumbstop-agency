"use client";

import React from "react";
import Link from "next/link";
import { useContent } from "@/context/ContentContext";
import { HeroMoment } from "@/components/HeroMoment";
import { ServiceCard } from "@/components/ServiceCard";
import { TrustSection } from "@/components/TrustSection";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBanner } from "@/components/CtaBanner";
import { ArrowRight, Sparkles, ShieldAlert } from "lucide-react";

export default function HomePage() {
  const { services, siteConfig, locale } = useContent();
  const isBn = locale === "bn";
  const primaryColor = siteConfig.themeAccentColor || "#1FA8CB";
  const secondaryColor = siteConfig.themeSecondaryColor || "#2E5FCC";

  // Find web dev service process steps (if present)
  const webDevService = services.find((s) => s.id === "web-development");

  return (
    <div className="relative">
      {/* 1. Deliberate Hero Moment */}
      <HeroMoment />

      {/* 2. 8 Services Overview Grid (Dynamic Order from Admin) */}
      <section className="py-24 relative overflow-hidden">
        {/* Subtle background glow dynamically matching CMS */}
        <div
          className="absolute top-1/2 left-0 w-96 h-96 blur-[160px] pointer-events-none transition-all duration-700 opacity-30"
          style={{ backgroundColor: `${primaryColor}22` }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 blur-[160px] pointer-events-none transition-all duration-700 opacity-25"
          style={{ backgroundColor: `${secondaryColor}22` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge={isBn ? "সার্বিক ডিজিটাল সক্ষমতা" : "Comprehensive Capabilities"}
            title={
              isBn
                ? `${services.length}টি বিশেষায়িত সেবা, রূপান্তরের অসীম সম্ভাবনা`
                : `${services.length} Core Disciplines, Infinite Conversion Potential`
            }
            subtitle={
              isBn
                ? "অনলাইন মাদরাসার নিশ্চিত শিক্ষার্থী ভর্তি থেকে শুরু করে হাই-আরওএএস অ্যাড ক্যাম্পেইন ও আধুনিক ওয়েবসাইট পর্যন্ত আমাদের পূর্ণাঙ্গ ডিজিটাল সেবা।"
                : "From guaranteed student enrollment for online madrasas to high-ROAS ad campaigns and bespoke digital showrooms, explore our full spectrum of digital craft."
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <ServiceCard
                key={service.id}
                service={service}
                featured={idx === 0 || idx === 2}
              />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/services"
              style={{
                borderColor: `${primaryColor}40`,
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-all duration-300 shadow-lg"
            >
              <span className={isBn ? "font-bangla" : ""}>
                {isBn
                  ? `${services.length}টি সেবার বিস্তারিত বিবরণ দেখুন`
                  : `View In-Depth Breakdown For All ${services.length} Services`}
              </span>
              <ArrowRight className="w-3.5 h-3.5" style={{ color: primaryColor }} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Sequential 3-Step Process (Web Design & Development) */}
      {webDevService?.processSteps && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProcessTimeline steps={webDevService.processSteps} />
        </section>
      )}

      {/* 4. Trust & Why Choose Us */}
      <TrustSection />

      {/* 5. Featured Highlight: Online Madrasa Solution Guarantee */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-white/[0.01] to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-[#0d1628] via-[#080d19] to-[#0c1424] border border-[#C9A86A]/30 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#C9A86A]/10 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-[#C9A86A]/20 border border-[#C9A86A]/40 text-[#DFCA98]">
                  <Sparkles className="w-3.5 h-3.5 text-[#DFCA98]" />
                  <span className={isBn ? "font-bangla" : ""}>
                    {isBn ? "ফ্ল্যাগশিপ টার্নকি প্যাকেজ" : "Flagship Turnkey Package"}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight font-bangla">
                  অনলাইন মাদরাসা সল্যুশন — নিশ্চিত শিক্ষার্থী ভর্তির লিখিত প্রতিশ্রুতি
                </h3>

                <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed font-bangla">
                  পেজ ক্রিয়েশন, লোগো ডিজাইন, প্রমোশনাল ভিডিও ও বিজ্ঞাপন পরিচালনা থেকে শুরু করে শিক্ষক-শিক্ষার্থী-অভিভাবক ম্যানেজমেন্ট সফটওয়্যার—সবকিছু এক ছাতার নিচে। সাথে থাকছে ৫ জন নিশ্চিত শিক্ষার্থী ভর্তির লিখিত গ্যারান্টি।
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <span className="text-xs font-bold text-[#DFCA98] block mb-1 font-bangla">
                      ৫ জন শিক্ষার্থী
                    </span>
                    <span className="text-[11px] text-slate-400 font-bangla">
                      ভর্তির শতভাগ নিশ্চয়তা
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <span className="text-xs font-bold text-[#DFCA98] block mb-1 font-bangla">
                      ৩ মাস ডেডিকেটেড
                    </span>
                    <span className="text-[11px] text-slate-400 font-bangla">
                      সার্বক্ষণিক ওয়ান-অন-ওয়ান সাপোর্ট
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <span className="text-xs font-bold text-[#DFCA98] block mb-1 font-bangla">
                      ৬ মাস সাধারণ
                    </span>
                    <span className="text-[11px] text-slate-400 font-bangla">
                      সফটওয়্যার রক্ষণাবেক্ষণ সেবা
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-4">
                <Link
                  href="/services#online-madrasa-solution"
                  className="w-full text-center py-4 px-6 rounded-xl font-semibold text-xs text-black bg-gradient-to-r from-[#DFCA98] via-[#C9A86A] to-[#A38248] hover:opacity-95 shadow-xl shadow-[#C9A86A]/20 transition-all hover:scale-[1.02] font-bangla"
                >
                  প্যাকেজের বিস্তারিত বিবরণ দেখুন
                </Link>
                <a
                  href={`${siteConfig.whatsappLink}%20regarding%20the%20Online%20Madrasa%20Solution`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-4 px-6 rounded-xl font-semibold text-xs text-white bg-white/[0.05] border border-white/10 hover:border-white/20 transition-all hover:scale-[1.02] font-bangla"
                >
                  হোয়াটসঅ্যাপে সরাসরি কথা বলুন
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Emergency Recovery Assurance */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="p-8 rounded-2xl bg-[#090e1c] border flex flex-col md:flex-row items-center justify-between gap-6 transition-colors"
          style={{ borderColor: `${primaryColor}35` }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className={`text-lg font-bold text-white ${isBn ? "font-bangla" : "font-serif"}`}>
                {isBn ? "জরুরি অ্যাকাউন্ট লক, ডিজেবল বা হ্যাক হয়েছে?" : "Urgent Account Locked, Disabled, or Hacked?"}
              </h4>
              <p className={`text-xs text-slate-400 font-light mt-0.5 ${isBn ? "font-bangla" : ""}`}>
                {isBn
                  ? "আমাদের সোশ্যাল মিডিয়া ক্রাইসিস ইউনিট ফেসবুক, ইনস্টাগ্রাম, টুইটার ও লিঙ্কডইন অ্যাকাউন্ট দ্রুত রিকভারি করে।"
                  : "Our social media crisis unit handles Facebook, Instagram, Twitter & LinkedIn recovery with rapid escalation."}
              </p>
            </div>
          </div>
          <Link
            href="/services#social-media-solution"
            className="shrink-0 px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 transition-colors"
          >
            <span className={isBn ? "font-bangla" : ""}>
              {isBn ? "জরুরি রিকভারি ডেস্ক" : "Emergency Recovery Desk"}
            </span>
          </Link>
        </div>
      </section>

      {/* 7. Call To Action Banner */}
      <CtaBanner />
    </div>
  );
}
