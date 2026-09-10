"use client";

import React, { useState, useEffect } from "react";
import { ServiceItem } from "@/data/content";
import { useContent } from "@/context/ContentContext";
import { ServiceIcon } from "./ServiceIcon";
import {
  X,
  ExternalLink,
  Play,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  Layers,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Images,
  Film,
} from "lucide-react";

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  const { siteConfig, locale } = useContent();
  const isBn = locale === "bn";

  // Carousel & Lightbox state
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomImg, setZoomImg] = useState<string | null>(null);

  // Derive screenshot slides (at least 1 slide guaranteed)
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
    if (!service || slides.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [slides.length, isPaused, service]);

  if (!service) return null;

  const cleanWhatsApp = siteConfig.whatsappNumber.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=Hello%20ThumbStop%2C%20I%20am%20interested%20in%20your%20service%3A%20${encodeURIComponent(
    service.titleEn
  )}%20(${encodeURIComponent(service.startingPrice)}).%20I%20would%20like%20to%20discuss%20project%20details.`;

  const accentColor = service.themeColor || "#1FA8CB";

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-3xl rounded-3xl bg-[#091122] border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.7)] text-white overflow-hidden my-auto max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Banner with Ambient Glow & Badges */}
          <div className="relative p-6 sm:p-7 border-b border-white/10 bg-gradient-to-b from-[#0e1b36] to-[#091122] flex-shrink-0">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 text-white transition-all shadow-lg z-10"
              title="Close Dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pr-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white border shadow"
                    style={{
                      backgroundColor: `${accentColor}25`,
                      borderColor: `${accentColor}50`,
                      color: accentColor,
                    }}
                  >
                    <ServiceIcon name={service.iconName} className="w-4 h-4" />
                  </div>

                  {service.badge && (
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md shadow-sm"
                      style={{
                        backgroundColor: `${accentColor}20`,
                        color: accentColor,
                        borderColor: `${accentColor}40`,
                      }}
                    >
                      <Sparkles className="w-3 h-3" />
                      {service.badge}
                    </span>
                  )}
                </div>

                <h2 className={`text-2xl sm:text-3xl font-black text-white ${isBn ? "font-bangla" : "font-serif"}`}>
                  {isBn ? service.titleBn : service.titleEn}
                </h2>
                <div className="text-xs text-slate-400 mt-0.5">
                  {isBn ? service.titleEn : service.titleBn}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">
                  {isBn ? "মূল্য শুরু" : "Starting Investment"}
                </span>
                <span className="text-xl font-bold font-mono text-amber-400">
                  {service.startingPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Modal Body Content (Scrollable) */}
          <div className="p-6 sm:p-7 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            {/* ⭐️ 1. AUTO-SWIPING SCREENSHOT & WORK DEMO CAROUSEL ⭐️ */}
            {slides.length > 0 && (
              <div
                className="space-y-3"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Images className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                      {isBn ? "কাজের প্রিভিউ ও ভিজ্যুয়াল স্যাম্পল" : "Work Preview & Visual Portfolio"}
                    </h3>
                  </div>
                </div>

                {/* Clean, Luxury Showcase Frame */}
                <div className="relative rounded-2xl border border-white/15 bg-[#060B17] overflow-hidden shadow-2xl">
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

                          {/* Subtle Bottom Banner with Title & Description */}
                          {(slide.title || slide.caption) && (
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 pt-8 pointer-events-none">
                              <div className="flex items-end justify-between gap-3">
                                <div>
                                  <h4 className="text-sm sm:text-base font-bold text-white drop-shadow-md">
                                    {slide.title}
                                  </h4>
                                  {slide.caption && (
                                    <p className="text-xs text-slate-300 line-clamp-1 mt-0.5 drop-shadow">
                                      {slide.caption}
                                    </p>
                                  )}
                                </div>

                                <span className="p-1.5 rounded-lg bg-black/60 border border-white/20 text-slate-300 hover:text-white backdrop-blur-md shrink-0 mb-1">
                                  <Maximize2 className="w-3.5 h-3.5 text-cyan-300" />
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
                          className="absolute top-1/2 left-3 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-all shadow-xl hover:scale-110"
                          title="Previous Screenshot"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextSlide}
                          className="absolute top-1/2 right-3 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-all shadow-xl hover:scale-110"
                          title="Next Screenshot"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Row & Dot Indicators */}
                  {slides.length > 1 && (
                    <div className="p-2.5 bg-black/50 border-t border-white/10 flex items-center justify-between gap-2 overflow-x-auto">
                      <div className="flex items-center gap-1.5">
                        {slides.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setActiveSlide(i)}
                            className={`h-1.5 rounded-full transition-all ${
                              activeSlide === i ? "w-6" : "w-1.5 bg-white/20 hover:bg-white/40"
                            }`}
                            style={{
                              backgroundColor: activeSlide === i ? accentColor : undefined,
                            }}
                            title={`Jump to screenshot ${i + 1}`}
                          />
                        ))}
                      </div>

                      {/* Mini thumbnails preview */}
                      <div className="flex items-center gap-1.5">
                        {slides.map((thumb, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveSlide(idx)}
                            className={`relative w-10 h-7 rounded-md overflow-hidden border transition-all shrink-0 ${
                              activeSlide === idx
                                ? "border-white ring-2 ring-cyan-400 scale-105"
                                : "border-white/20 opacity-60 hover:opacity-100"
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
              </div>
            )}

            {/* ⭐️ 2. VIDEO WORK DRIVE REEL LINK (Strictly for Video Services) ⭐️ */}
            {service.demoVideoUrl && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#0B132B] to-purple-950/20 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0">
                    <Play className="w-5 h-5 text-purple-300 fill-purple-300" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span className="flex items-center gap-1.5">
                        <Film className="w-3.5 h-3.5 text-purple-400" />
                        <span>{isBn ? "ভিডিও কাজের ড্রাইভ লিংক ও ৪K রিল" : "4K Video Showcase / Drive Link"}</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        Google Drive
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                      {isBn
                        ? "হাই-কোয়ালিটি আনকম্প্রেসড ভিডিও ফাইল ও মাস্টার শোকেস দেখতে ড্রাইভ লিংক ওপেন করুন।"
                        : "Inspect full cinema-grade 4K master files and client delivery footage directly on Google Drive."}
                    </p>
                  </div>
                </div>

                <a
                  href={service.demoVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/20 flex items-center gap-1.5 transition-all shrink-0"
                >
                  <span>{isBn ? "ড্রাইভ থেকে ভিডিও দেখুন ↗" : "Watch on Google Drive ↗"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Detailed Writeup */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isBn ? "বিস্তারিত বিবরণ ও কৌশল" : "Detailed Strategy & Scope"}
              </h4>
              <p className={`text-sm text-slate-200 leading-relaxed font-light ${isBn ? "font-bangla" : ""}`}>
                {isBn ? service.detailedDescriptionBn : service.detailedDescriptionEn}
              </p>
            </div>

            {/* Features / Deliverables Checklist */}
            {service.features && service.features.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isBn ? "সেবাটিতে যা যা অন্তর্ভুক্ত থাকবে" : "Key Deliverables & Specifications"}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-black/20 border border-white/5 flex items-start gap-2 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Guarantees Box */}
            {service.guarantees && service.guarantees.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>{isBn ? "আমাদের লিখিত নিশ্চয়তা" : "Commercial Guarantees"}</span>
                </h4>
                <ul className="text-xs text-amber-200/90 space-y-1">
                  {service.guarantees.map((g, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Modal Footer CTA */}
          <div className="p-6 bg-black/50 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
            <div className="text-xs text-slate-400">
              {isBn ? "কাস্টম রিকোয়ারমেন্ট অনুযায়ী বাজেট নির্ধারণ সম্ভব।" : "Flexible customization available for enterprise demands."}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 transition-all"
              >
                {isBn ? "বন্ধ করুন" : "Close"}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isBn ? "হোয়াটসঅ্যাপে বুকিং নিন" : "Book Service via WhatsApp"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Zoomed Full-Screen Screenshot View */}
      {isZoomed && zoomImg && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8 animate-in fade-in zoom-in-95 duration-200"
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
            className="relative max-w-5xl max-h-[88vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={zoomImg}
              alt="Expanded Screenshot Preview"
              className="w-full h-full object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}
    </>
  );
}

