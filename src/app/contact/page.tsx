"use client";

import React from "react";
import { useContent } from "@/context/ContentContext";
import { ContactForm } from "@/components/ContactForm";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

export default function ContactPage() {
  const { siteConfig, locale } = useContent();
  const isBn = locale === "bn";

  return (
    <div className="pt-28 pb-20 relative">
      {/* Top Header */}
      <section className="py-16 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-[#1FA8CB]/15 text-cyan-300 border border-[#1FA8CB]/30 mb-6">
          <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span className={isBn ? "font-bangla" : ""}>
            {isBn ? "সরাসরি যোগাযোগ ডেস্ক" : "Direct Access Desk"}
          </span>
        </div>
        <h1 className={`text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight mb-6 ${isBn ? "font-bangla" : "font-serif"}`}>
          {isBn
            ? "চলুন আপনার পরবর্তী সফল প্রজেক্ট শুরু করি"
            : "Let's Discuss Your Next Defining Move."}
        </h1>
        <p className={`text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed ${isBn ? "font-bangla" : ""}`}>
          {isBn
            ? "আমাদের ঢাকা টিমের সাথে সরাসরি হোয়াটসঅ্যাপ, ফোন, ইমেইল অথবা নিচের ফর্ম পূরণ করে যোগাযোগ করুন।"
            : "Reach our Dhaka team directly via WhatsApp, phone, email, or by filling out our project brief below."}
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl space-y-8">
              <div>
                <h3 className={`text-xl font-bold text-white mb-2 ${isBn ? "font-bangla" : "font-serif"}`}>
                  {isBn ? "ঢাকা স্টুডিও ও হেডকোয়ার্টার" : "Dhaka Studio & Headquarters"}
                </h3>
                <p className={`text-xs text-slate-400 font-light ${isBn ? "font-bangla" : ""}`}>
                  {isBn ? siteConfig.taglineBn : siteConfig.taglineEn}
                </p>
              </div>

              <div className="space-y-6 text-sm">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1FA8CB]/15 border border-[#1FA8CB]/30 flex items-center justify-center text-cyan-300 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1 ${isBn ? "font-bangla" : ""}`}>
                      {isBn ? "অফিসের অবস্থান" : "Physical Location"}
                    </span>
                    <p className={`text-white font-medium leading-relaxed ${isBn ? "font-bangla" : ""}`}>
                      {isBn ? siteConfig.addressBn : siteConfig.addressEn}
                    </p>
                    <p className={`text-xs text-slate-400 mt-1 ${isBn ? "font-sans" : "font-bangla"}`}>
                      {isBn ? siteConfig.addressEn : siteConfig.addressBn}
                    </p>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1FA8CB]/15 border border-[#1FA8CB]/30 flex items-center justify-center text-cyan-300 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1 ${isBn ? "font-bangla" : ""}`}>
                      {isBn ? "সরাসরি ফোন করুন" : "Call Us Directly"}
                    </span>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="text-white font-mono font-bold text-base hover:text-cyan-300 transition-colors"
                    >
                      {siteConfig.phone}
                    </a>
                    <span className={`text-xs text-slate-400 block mt-0.5 ${isBn ? "font-bangla" : ""}`}>
                      {isBn ? "সকাল ১০টা – রাত ১০টা (বাংলাদেশ সময়)" : "10:00 AM – 10:00 PM (GMT+6)"}
                    </span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1 ${isBn ? "font-bangla" : ""}`}>
                      {isBn ? "ইনস্ট্যান্ট হোয়াটসঅ্যাপ" : "Instant WhatsApp"}
                    </span>
                    <a
                      href={siteConfig.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold hover:underline text-sm"
                    >
                      <span>{siteConfig.whatsappNumber}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <span className={`text-xs text-slate-400 block mt-0.5 ${isBn ? "font-bangla" : ""}`}>
                      {isBn ? "গড় সাড়া দেওয়ার সময়: ১৫ মিনিটেরও কম" : "Average response time: < 15 minutes"}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2E5FCC]/15 border border-[#2E5FCC]/30 flex items-center justify-center text-blue-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1 ${isBn ? "font-bangla" : ""}`}>
                      {isBn ? "অফিসিয়াল ইমেইল" : "Official Inquiries"}
                    </span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-white font-mono hover:text-cyan-300 transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Security & Confidentiality assurance */}
              <div className="pt-6 border-t border-white/[0.08] flex items-center gap-3 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-[#C9A86A] shrink-0" />
                <span className={isBn ? "font-bangla" : ""}>
                  {isBn
                    ? "সম্পূর্ণ গোপনীয়তা ও নিরাপত্তা নিশ্চিত করা হয়।"
                    : "Strict Non-Disclosure & Security Protocols Guaranteed."}
                </span>
              </div>
            </div>

            {/* Quick WhatsApp Action Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1FA8CB]/15 to-[#2E5FCC]/15 border border-[#1FA8CB]/30 text-center">
              <h4 className={`text-base font-bold text-white mb-2 ${isBn ? "font-bangla" : "font-serif"}`}>
                {isBn ? "জরুরি সাপোর্ট প্রয়োজন?" : "Need Rapid Emergency Support?"}
              </h4>
              <p className={`text-xs text-slate-300 font-light mb-4 ${isBn ? "font-bangla" : ""}`}>
                {isBn
                  ? "হ্যাক রিকভারি, লক ফিক্স বা জরুরি ক্যাম্পেইনের জন্য আমাদের ইমার্জেন্সি লিডের সাথে সরাসরি কথা বলুন।"
                  : "For urgent account lockouts, hack recoveries, or same-day ad launches, reach our emergency lead instantly."}
              </p>
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#1FA8CB] to-[#2E5FCC] shadow-lg shadow-[#1FA8CB]/25 hover:opacity-95 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span className={isBn ? "font-bangla" : ""}>
                  {isBn ? "জরুরি হোয়াটসঅ্যাপ চ্যাট শুরু করুন" : "Open Priority WhatsApp Chat"}
                </span>
              </a>
            </div>
          </div>

          {/* Interactive Form Column */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
