"use client";

import React from "react";
import { useContent } from "@/context/ContentContext";
import { SectionHeading } from "@/components/SectionHeading";
import { PricingCard } from "@/components/PricingCard";
import { CtaBanner } from "@/components/CtaBanner";
import { Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function PricingPage() {
  const { services, siteConfig, locale } = useContent();
  const isBn = locale === "bn";

  const servicesWithPackages = services.filter(
    (s) => s.packages && s.packages.length > 0
  );

  return (
    <div className="pt-28 pb-20 relative">
      {/* Page Header */}
      <section className="py-16 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-[#C9A86A]/15 text-[#DFCA98] border border-[#C9A86A]/30 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span className={isBn ? "font-bangla" : ""}>
            {isBn ? "স্বচ্ছ বাণিজ্যিক নীতিমালা" : "Transparent Commercial Terms"}
          </span>
        </div>
        <h1 className={`text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight mb-6 ${isBn ? "font-bangla" : "font-serif"}`}>
          {isBn
            ? "স্বচ্ছ বিনিয়োগ ও মূল্যতালিকা"
            : "Uncompromised Luxury. Transparent Investment."}
        </h1>
        <p className={`text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed ${isBn ? "font-bangla" : ""}`}>
          {isBn
            ? "কোনো গোপন চার্জ নেই, সম্পূর্ণ স্বচ্ছ চুক্তি। সরাসরি বাংলাদেশি টাকায় (BDT) সাশ্রয়ী ও প্রিমিয়াম প্যাকেজ।"
            : "No hidden fees, no opaque contracts. Clear scope deliverables priced in Bangladeshi Taka (BDT) with rapid execution."}
        </p>
      </section>

      {/* Pricing Grids Grouped by Service */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {servicesWithPackages.map((service) => (
          <section key={service.id} className="relative">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
                  <span>{isBn ? "ডিসিপ্লিন" : "Discipline"}</span>
                  <span>•</span>
                  <span className={isBn ? "font-sans text-slate-400" : "font-bangla"}>
                    {isBn ? service.titleEn : service.titleBn}
                  </span>
                </div>
                <h2 className={`text-2xl sm:text-3xl font-bold text-white ${isBn ? "font-bangla" : "font-serif"}`}>
                  {isBn ? service.titleBn : service.titleEn} {isBn ? "প্যাকেজসমূহ" : "Packages"}
                </h2>
              </div>
              <span className={`text-xs text-slate-400 font-mono ${isBn ? "font-bangla" : ""}`}>
                {isBn ? `শুরু হচ্ছে ${service.startingPrice} থেকে` : `Starting from ${service.startingPrice}`}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.packages?.map((pkg, idx) => (
                <PricingCard
                  key={idx}
                  pkg={pkg}
                  serviceTitle={service.titleEn}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Payment Security & Methods */}
      <section className="mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className={`text-lg font-bold text-white ${isBn ? "font-bangla" : "font-serif"}`}>
                {isBn ? "সহজ পেমেন্ট সুবিধা (BDT)" : "Payment Flexibility in BDT"}
              </h3>
              <p className={`text-xs text-slate-300 font-light leading-relaxed ${isBn ? "font-bangla" : ""}`}>
                {isBn
                  ? "বিকাশ মার্চেন্ট, নগদ, রকেট, বাংলাদেশের যেকোনো ব্যাংকের অনলাইন ট্রান্সফার এবং ইন্টারন্যাশনাল ভিসা ও মাস্টারকার্ড গ্রহণ করা হয়।"
                  : "We accept bKash Merchant, Nagad, Rocket, direct Bank Transfer across all Bangladeshi commercial banks, and International Swift / Visa / MasterCard."}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#C9A86A]/10 border border-[#C9A86A]/20 flex items-center justify-center text-[#DFCA98] mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className={`text-lg font-bold text-white ${isBn ? "font-bangla" : "font-serif"}`}>
                {isBn ? "বাণিজ্যিক ইনভয়েস ও চুক্তি" : "Commercial Invoicing & NDA"}
              </h3>
              <p className={`text-xs text-slate-300 font-light leading-relaxed ${isBn ? "font-bangla" : ""}`}>
                {isBn
                  ? "প্রাতিষ্ঠানিক ও কর্পোরেট গ্রাহকদের জন্য অফিসিয়াল ভ্যাট চালান ও নন-ডিসক্লোজার চুক্তি (NDA) প্রদান করা হয়।"
                  : "Formal commercial VAT invoices and signed Non-Disclosure Agreements provided for all corporate clients and institutional entities."}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className={`text-lg font-bold text-white ${isBn ? "font-bangla" : "font-serif"}`}>
                {isBn ? "ধাপভিত্তিক মাইলস্টোন নিশ্চয়তা" : "Guaranteed Milestones"}
              </h3>
              <p className={`text-xs text-slate-300 font-light leading-relaxed ${isBn ? "font-bangla" : ""}`}>
                {isBn
                  ? "স্বচ্ছ মাইলস্টোন ভিত্তিক পেমেন্ট। কাজের অগ্রগতি যাচাই ও সন্তুষ্টির পরেই পরবর্তী মাইলস্টোনের কাজ সম্পন্ন করা হয়।"
                  : "Transparent milestone payments. You review and approve design wireframes and beta builds before final milestone signoff."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="mt-28 max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge={isBn ? "সাধারণ জিজ্ঞাসা ও উত্তর" : "Frequently Answered Questions"}
          title={isBn ? "সব প্রশ্নের স্পষ্ট উত্তর" : "Clear Answers For Ambitious Brands"}
          subtitle={
            isBn
              ? "থাম্বস্টপের সাথে কাজের প্রক্রিয়া সম্পর্কে বিস্তারিত জেনে নিন।"
              : "Everything you need to know about working with ThumbStop."
          }
        />

        <div className="space-y-4">
          {siteConfig.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-all"
            >
              <h4 className={`text-base sm:text-lg font-bold text-white mb-2 ${isBn ? "font-bangla" : "font-serif"}`}>
                {isBn ? faq.questionBn : faq.questionEn}
              </h4>
              <p className={`text-xs sm:text-sm text-slate-300 font-light leading-relaxed ${isBn ? "font-bangla" : ""}`}>
                {isBn ? faq.answerBn : faq.answerEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CtaBanner
        title={isBn ? "আপনার কি কাস্টম প্যাকেজ প্রয়োজন?" : "Need A Custom Enterprise Scope?"}
        subtitle={
          isBn
            ? "আপনার নির্দিষ্ট লক্ষ্য ও প্রয়োজন অনুযায়ী প্যাকেজ সাজাতে আমাদের প্রজেক্ট কনসালট্যান্টের সাথে হোয়াটসঅ্যাপে সরাসরি যোগাযোগ করুন।"
            : "Contact our lead strategist on WhatsApp to structure an exclusive multi-discipline contract tailored to your exact growth metrics."
        }
      />
    </div>
  );
}
