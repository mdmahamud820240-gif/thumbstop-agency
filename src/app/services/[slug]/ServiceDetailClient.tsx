"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useContent } from "@/context/ContentContext";
import { ServiceIcon } from "@/components/ServiceIcon";
import { PricingCard } from "@/components/PricingCard";
import { CtaBanner } from "@/components/CtaBanner";
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Layers,
  Play,
  ExternalLink,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Images,
  X,
  Film,
} from "lucide-react";

interface ServiceDetailClientProps {
  slug: string;
}

export default function ServiceDetailClient({ slug }: ServiceDetailClientProps) {
  const { services, siteConfig, locale } = useContent();
  const isBn = locale === "bn";

  // Find service by slug or fallback to id
  const service = services.find((s) => s.slug === slug || s.id === slug);

  // Auto-swipe screenshot slider state
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomImg, setZoomImg] = useState<string | null>(null);

  // Derive screenshot slides
  const slides =
    service?.portfolioSamples && service.portfolioSamples.length > 0
      ? service.portfolioSamples
      : service?.imageUrl
      ? [
          {
            title: service.titleEn,
            imageUrl: service.imageUrl,
            caption: service.shortDescriptionEn,
          },
        ]
      : [];

  // Continuous auto-swiping to the right (loops automatically)
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [slides.length, isPaused]);

  if (!service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-20">
        <h1 className="text-2xl font-bold text-white mb-2">Service Not Found</h1>
        <p className="text-slate-400 text-sm mb-6">The requested service could not be located.</p>
        <Link
          href="/services"
          className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Services</span>
        </Link>
      </div>
    );
  }

  const accentColor = service.themeColor || "#1FA8CB";
  const cleanWhatsApp = siteConfig.whatsappNumber.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=Hello%20ThumbStop%2C%20I%20am%20interested%20in%20your%20service%3A%20${encodeURIComponent(
    service.titleEn
  )}%20(${encodeURIComponent(service.startingPrice)}).%20I%20would%20like%20to%20discuss%20project%20details.`;

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#070A12] text-white">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-white/10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className={isBn ? "font-bangla" : ""}>
              {isBn ? "← সকল সেবায় ফিরে যান" : "← Back to All Services"}
            </span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span>{isBn ? service.titleBn : service.titleEn}</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Service Hero Section */}
        <section className="relative rounded-3xl p-6 sm:p-10 border border-white/10 bg-gradient-to-b from-[#0E1A33] via-[#091122] to-[#060B17] overflow-hidden shadow-2xl">
          {/* Ambient Glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
            style={{ backgroundColor: accentColor }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center border shadow-lg"
                  style={{
                    backgroundColor: `${accentColor}20`,
                    borderColor: `${accentColor}40`,
                    color: accentColor,
                  }}
                >
                  <ServiceIcon name={service.iconName} className="w-5 h-5" />
                </div>

                {service.badge && (
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md shadow-sm"
                    style={{
                      backgroundColor: `${accentColor}25`,
                      borderColor: `${accentColor}50`,
                      color: accentColor,
                    }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {service.badge}
                  </span>
                )}
              </div>

              <div>
                <h1 className={`text-3xl sm:text-5xl font-black text-white tracking-tight ${isBn ? "font-bangla" : "font-serif"}`}>
                  {isBn ? service.titleBn : service.titleEn}
                </h1>
                <p className={`text-base sm:text-lg font-medium mt-1 ${isBn ? "text-slate-400 font-sans" : "font-bangla text-cyan-400"}`}>
                  {isBn ? service.titleEn : service.titleBn}
                </p>
              </div>

              <p className={`text-sm sm:text-base text-slate-300 leading-relaxed font-light ${isBn ? "font-bangla" : ""}`}>
                {isBn ? service.shortDescriptionBn : service.shortDescriptionEn}
              </p>
            </div>

            {/* Price & Primary WhatsApp Action */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4 min-w-[240px] shrink-0">
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block tracking-wider">
                  {isBn ? "মূল্যতালিকা শুরু" : "Starting Investment"}
                </span>
                <span className="text-2xl sm:text-3xl font-bold font-mono text-amber-400">
                  {service.startingPrice}
                </span>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isBn ? "হোয়াটসঅ্যাপে বুকিং করুন" : "Book via WhatsApp"}</span>
              </a>
            </div>
          </div>
        </section>

        {/* ⭐️ Centerpiece: Screenshot & Showcase Gallery ⭐️ */}
        {slides.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center border shadow-sm"
                  style={{
                    backgroundColor: `${accentColor}15`,
                    borderColor: `${accentColor}30`,
                    color: accentColor,
                  }}
                >
                  <Images className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {isBn ? "কাজের প্রিভিউ ও ভিজ্যুয়াল স্যাম্পল" : "Work Preview & Visual Portfolio"}
                  </h2>
                </div>
              </div>
            </div>

            {/* Clean, Luxury Showcase Frame */}
            <div
              className="relative rounded-3xl border border-white/10 bg-[#050914] overflow-hidden shadow-2xl transition-all"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Main Sliding Viewport */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-black overflow-hidden select-none">
                <div
                  className="flex h-full w-full transition-transform duration-700 ease-out"
                  style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                >
                  {slides.map((slide, idx) => (
                    <div
                      key={idx}
                      className="relative w-full h-full shrink-0 flex items-center justify-center bg-black cursor-zoom-in"
                      onClick={() => {
                        setZoomImg(slide.imageUrl);
                        setIsZoomed(true);
                      }}
                    >
                      <img
                        src={slide.imageUrl}
                        alt={slide.title}
                        className="w-full h-full object-cover object-top"
                      />

                      {/* Subtle Bottom Title Overlay (Clean, no technical badges) */}
                      {(slide.title || slide.caption) && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 pt-10 pointer-events-none">
                          <div className="flex items-end justify-between gap-4">
                            <div>
                              <h3 className="text-base sm:text-lg font-semibold text-white drop-shadow-md">
                                {slide.title}
                              </h3>
                              {slide.caption && (
                                <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                                  {slide.caption}
                                </p>
                              )}
                            </div>

                            <span className="p-2 rounded-xl bg-black/60 border border-white/15 text-slate-300 hover:text-white backdrop-blur-md shrink-0">
                              <Maximize2 className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Left / Right Chevron Controls */}
                {slides.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevSlide}
                      className="absolute top-1/2 left-3 sm:left-5 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 border border-white/15 text-white transition-all shadow-xl hover:scale-105 backdrop-blur-sm"
                      title="Previous"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextSlide}
                      className="absolute top-1/2 right-3 sm:right-5 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 border border-white/15 text-white transition-all shadow-xl hover:scale-105 backdrop-blur-sm"
                      title="Next"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Minimal Bottom Controls & Thumbnails */}
              {slides.length > 1 && (
                <div className="p-3.5 bg-[#080d1a] border-t border-white/5 flex items-center justify-between gap-4">
                  {/* Subtle Progress Dots */}
                  <div className="flex items-center gap-1.5">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveSlide(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          activeSlide === i ? "w-6 bg-cyan-400" : "w-1.5 bg-white/20 hover:bg-white/40"
                        }`}
                        title={`Slide ${i + 1}`}
                      />
                    ))}
                  </div>

                  {/* Clean Mini Thumbnails */}
                  <div className="flex items-center gap-2 overflow-x-auto py-0.5">
                    {slides.map((thumb, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveSlide(idx)}
                        className={`relative w-12 h-8 rounded-md overflow-hidden border transition-all shrink-0 ${
                          activeSlide === idx
                            ? "border-cyan-400 ring-1 ring-cyan-400 scale-105"
                            : "border-white/10 opacity-50 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={thumb.imageUrl}
                          alt={thumb.title}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ⭐️ Video Work Section (Strictly for Video Services) ⭐️ */}
        {service.demoVideoUrl && (
          <section className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#0B132B] to-purple-950/20 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0 shadow-lg">
                <Play className="w-6 h-6 text-purple-300 fill-purple-300" />
              </div>
              <div>
                <div className="text-base font-bold text-white flex items-center gap-2">
                  <span className="flex items-center gap-2">
                    <Film className="w-4 h-4 text-purple-400" />
                    <span>{isBn ? "৪K ভিডিও প্রোডাকশন ড্রাইভ লিংক" : "4K Video Production Reel"}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Google Drive
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {isBn
                    ? "আনকম্প্রেসড মাস্টার ভিডিও ফাইল ও প্রজেক্ট শোকেস সরাসরি ড্রাইভ থেকে দেখতে ক্লিক করুন।"
                    : "Inspect uncompressed cinema-grade master delivery files and high-FPS footage directly on Google Drive."}
                </p>
              </div>
            </div>

            <a
              href={service.demoVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/25 flex items-center gap-2 transition-all shrink-0"
            >
              <span>{isBn ? "গুগল ড্রাইভ থেকে দেখুন ↗" : "Watch on Google Drive ↗"}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </section>
        )}

        {/* Detailed Strategy & Scope */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {isBn ? "বিস্তারিত কাজের বিবরণ ও কর্মপদ্ধতি" : "Comprehensive Methodology & Scope"}
            </h2>
          </div>
          <p className={`text-base sm:text-lg text-slate-200 leading-relaxed font-light ${isBn ? "font-bangla" : ""}`}>
            {isBn ? service.detailedDescriptionBn : service.detailedDescriptionEn}
          </p>
        </section>

        {/* Key Features & Deliverables Checklist */}
        {service.features && service.features.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isBn ? "প্যাকেজে অন্তর্ভুক্ত সেবাসমূহ" : "Key Deliverables & Specifications"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {service.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3 text-xs text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Commercial Guarantees */}
        {service.guarantees && service.guarantees.length > 0 && (
          <section className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{isBn ? "আমাদের লিখিত বাণিজ্যিক নিশ্চয়তা" : "Commercial Guarantees"}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.guarantees.map((g, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-amber-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{g}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Available Packages & Pricing Cards */}
        {service.packages && service.packages.length > 0 && (
          <section className="space-y-6 pt-4">
            <div>
              <h2 className={`text-xl sm:text-2xl font-bold text-white ${isBn ? "font-bangla" : ""}`}>
                {isBn ? "উপলব্ধ প্যাকেজ ও স্তর" : "Available Packages & Investment Tiers"}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {isBn ? "আপনার ব্যবসায়িক চাহিদানুযায়ী সঠিক প্যাকেজ বেছে নিন" : "Select the optimal caliber for your commercial expansion"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.packages.map((pkg, pIdx) => (
                <PricingCard
                  key={pIdx}
                  pkg={pkg}
                  serviceTitle={service.titleEn}
                />
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA Banner */}
        <CtaBanner />
      </div>

      {/* Fullscreen Zoom Lightbox Modal */}
      {isZoomed && zoomImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in zoom-in-95 duration-200"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all shadow-2xl z-10"
            title="Close Zoom"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="relative max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={zoomImg}
              alt="Expanded High Resolution Screenshot"
              className="w-full h-full object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
