"use client";

import React from "react";
import Link from "next/link";
import { useContent } from "@/context/ContentContext";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

interface CtaBannerProps {
  title?: string;
  subtitle?: string;
}

export function CtaBanner({ title, subtitle }: CtaBannerProps) {
  const { siteConfig, locale } = useContent();
  const isBn = locale === "bn";

  const primaryColor = siteConfig.themeAccentColor || "#1FA8CB";
  const secondaryColor = siteConfig.themeSecondaryColor || "#2E5FCC";

  const defaultTitle = isBn
    ? "আপনার ব্র্যান্ডের স্ক্রল থামিয়ে দিতে প্রস্তুত?"
    : "Ready To Make Your Audience Stop Scrolling?";

  const defaultSubtitle = isBn
    ? "উচ্চ-রূপান্তরকারী বিজ্ঞাপন, আধুনিক ওয়েব প্ল্যাটফর্ম কিংবা জরুরি অ্যাকাউন্ট রিকভারি—সব সেবায় আমাদের ঢাকা টিম সার্বক্ষণিক প্রস্তুত।"
    : "Whether you need high-conversion ad creatives, a custom web ecosystem, or emergency account recovery, our Dhaka team is on standby.";

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className="relative rounded-3xl p-10 sm:p-16 overflow-hidden bg-gradient-to-br from-[#0c1322] via-[#070A12] to-[#0a101f] border shadow-2xl transition-all duration-500"
          style={{
            borderColor: `${primaryColor}40`,
            boxShadow: `0 20px 60px -15px ${primaryColor}25`,
          }}
        >
          {/* Ambient light ring matching CMS colors */}
          <div
            className="absolute -top-32 -right-32 w-80 h-80 blur-3xl rounded-full pointer-events-none opacity-40 transition-all duration-700"
            style={{
              background: `radial-gradient(circle, ${primaryColor}, ${secondaryColor})`,
            }}
          />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#C9A86A]/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium bg-white/[0.04] border border-white/10 mb-6"
              style={{ borderColor: `${primaryColor}40`, color: primaryColor }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: primaryColor }} />
              <span className={isBn ? "font-bangla" : ""}>
                {isBn ? "চলুন একসাথে অসাধারণ কিছু তৈরি করি" : "Let's Build Something Unstoppable"}
              </span>
            </div>

            <h2 className={`text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-6 ${isBn ? "font-bangla" : "font-serif"}`}>
              {title || defaultTitle}
            </h2>

            <p className={`text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-10 ${isBn ? "font-bangla" : ""}`}>
              {subtitle || defaultSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
                  boxShadow: `0 8px 24px -4px ${primaryColor}44`,
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white hover:opacity-95 shadow-xl transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" />
                <span className={isBn ? "font-bangla" : ""}>
                  {isBn ? "হোয়াটসঅ্যাপে সরাসরি কথা বলুন" : "Chat Directly on WhatsApp"}
                </span>
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-slate-200 bg-white/[0.05] border border-white/10 hover:border-white/20 hover:text-white transition-all hover:scale-[1.02]"
              >
                <span className={isBn ? "font-bangla" : ""}>
                  {isBn ? "কাস্টম প্রজেক্ট প্রস্তাব দিন" : "Request Custom Scope"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
