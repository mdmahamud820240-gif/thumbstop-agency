"use client";

import React, { useEffect, useState, useRef } from "react";
import { Clock, Calendar as CalendarIcon, Volume2, VolumeX, ShieldCheck, Sparkles } from "lucide-react";
import { PrayerItem } from "@/lib/prayerTimes";

interface AdhanNotificationModalProps {
  isOpen: boolean;
  prayer: PrayerItem | null;
  dateStr: string;
  dateBn: string;
  soundEnabled: boolean;
  onClose: () => void;
}

export const AdhanNotificationModal: React.FC<AdhanNotificationModalProps> = ({
  isOpen,
  prayer,
  dateStr,
  dateBn,
  soundEnabled,
  onClose,
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(10);
  const [progressPercent, setProgressPercent] = useState<number>(100);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play gentle harmonic Islamic tone chime via Web Audio API synth if audio files are unavailable or blocked
  const playHarmonicTone = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      // Soft serene pentatonic chime frequencies (F, G, Bb, C, D)
      const frequencies = [349.23, 440.0, 523.25, 698.46];
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.25);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.25);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + idx * 0.25 + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.25 + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.25);
        osc.stop(ctx.currentTime + idx * 0.25 + 2.6);
      });
    } catch {
      // Ignore if audio context blocked by browser
    }
  };

  useEffect(() => {
    if (!isOpen || !prayer) {
      setSecondsLeft(10);
      setProgressPercent(100);
      return;
    }

    // Play tone if sound enabled
    if (soundEnabled) {
      playHarmonicTone();
    }

    // Exact 10-second countdown
    const TOTAL_SECONDS = 10;
    const startTime = Date.now();
    const endTime = startTime + TOTAL_SECONDS * 1000;

    const interval = setInterval(() => {
      const remainingMs = Math.max(0, endTime - Date.now());
      const remainingSec = Math.ceil(remainingMs / 1000);
      setSecondsLeft(remainingSec);
      setProgressPercent((remainingMs / (TOTAL_SECONDS * 1000)) * 100);

      if (remainingMs <= 0) {
        clearInterval(interval);
        onClose();
      }
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [isOpen, prayer, soundEnabled, onClose]);

  if (!isOpen || !prayer) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none animate-in fade-in duration-300"
      style={{
        backgroundColor: "#050B18",
      }}
    >
      {/* Ambient Radial Glowing Orbs */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full pointer-events-none opacity-40 blur-[120px] transition-all duration-1000"
        style={{
          background: "radial-gradient(circle, rgba(232, 179, 67, 0.25) 0%, rgba(11, 23, 48, 0.4) 50%, transparent 75%)",
        }}
      />
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-30 blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(31, 168, 203, 0.3) 0%, transparent 70%)",
        }}
      />

      {/* Subtle Islamic Geometric Pattern Backdrop Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#E8B343 1px, transparent 1px), radial-gradient(#E8B343 1px, #050B18 1px)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px",
        }}
      />

      {/* Main Elegant Card Container */}
      <div
        className="relative z-10 w-full max-w-2xl mx-auto rounded-3xl p-7 sm:p-10 border shadow-2xl backdrop-blur-2xl text-center space-y-6 animate-in zoom-in-95 duration-300"
        style={{
          backgroundColor: "rgba(11, 23, 48, 0.85)",
          borderColor: "rgba(232, 179, 67, 0.35)",
          boxShadow: "0 25px 80px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(232, 179, 67, 0.15)",
        }}
      >
        {/* Subtle Top Islamic Silhouette Emblem */}
        <div className="flex justify-center items-center mb-1">
          <div className="relative">
            {/* Soft radiant gold aura */}
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-60 animate-pulse"
              style={{ backgroundColor: "#E8B343" }}
            />
            
            {/* Crescent & Mosque Silhouette Artwork */}
            <div
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center border shadow-lg"
              style={{
                backgroundColor: "#081124",
                borderColor: "rgba(232, 179, 67, 0.5)",
              }}
            >
              <svg
                viewBox="0 0 64 64"
                className="w-12 h-12 sm:w-14 sm:h-14 fill-none"
                style={{ filter: "drop-shadow(0 2px 8px rgba(232, 179, 67, 0.5))" }}
              >
                {/* Crescent Moon */}
                <path
                  d="M32 10C24 10 17 15 14.5 22.5C23.5 22.5 30.5 29.5 30.5 38.5C30.5 42 29.5 45.2 27.5 47.8C35.5 47 42 40.2 42 32C42 19.8 32 10 32 10Z"
                  fill="#E8B343"
                />
                {/* Star Accent */}
                <polygon
                  points="25,18 26.5,22 30.5,22 27.5,24.5 28.5,28.5 25,26 21.5,28.5 22.5,24.5 19.5,22 23.5,22"
                  fill="#FFFFFF"
                />
                {/* Mosque Dome and Minaret Minimal Outline */}
                <path
                  d="M18 54L18 42C18 38 22 35 26 35C30 35 34 38 34 42L34 54"
                  stroke="#E8B343"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M12 54L38 54"
                  stroke="#E8B343"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="26" cy="30" r="1.5" fill="#E8B343" />
              </svg>
            </div>
          </div>
        </div>

        {/* Primary Core Messages */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span
              className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase border flex items-center gap-1.5"
              style={{
                backgroundColor: "rgba(232, 179, 67, 0.15)",
                borderColor: "rgba(232, 179, 67, 0.4)",
                color: "#E8B343",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Asia/Dhaka • Bangladesh</span>
            </span>
          </div>

          {/* বাংলা মূল বার্তা */}
          <h1
            className="text-2xl sm:text-4xl font-extrabold tracking-tight font-bangla leading-tight"
            style={{ color: "#FFFFFF" }}
          >
            এখন আজানের সময়
          </h1>

          {/* গোল্ডেন নীতিবাক্য */}
          <div
            className="inline-block px-4 py-1.5 rounded-xl border text-base sm:text-xl font-bold font-bangla tracking-wide shadow-sm"
            style={{
              backgroundColor: "rgba(232, 179, 67, 0.12)",
              borderColor: "rgba(232, 179, 67, 0.45)",
              color: "#E8B343",
            }}
          >
            “নামাজ আগে, কাজ পরে”
          </div>
        </div>

        {/* English Counterpart Subtitles */}
        <div className="space-y-1">
          <div
            className="text-xs sm:text-sm font-extrabold uppercase tracking-widest font-mono"
            style={{ color: "#AAB4C5" }}
          >
            IT&apos;S TIME FOR ADHAN
          </div>
          <div
            className="text-xs sm:text-sm font-semibold italic"
            style={{ color: "#E8B343" }}
          >
            “Prayer First. Work Later.”
          </div>
        </div>

        {/* Prayer Time Spotlight Badge */}
        <div
          className="p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            backgroundColor: "rgba(5, 11, 24, 0.7)",
            borderColor: "rgba(232, 179, 67, 0.25)",
          }}
        >
          {/* Prayer Name */}
          <div className="text-center sm:text-left">
            <div className="text-[11px] uppercase tracking-wider font-mono" style={{ color: "#AAB4C5" }}>
              Current Prayer / বর্তমান নামাজ
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2.5 mt-0.5">
              <span className="text-xl sm:text-2xl font-black" style={{ color: "#FFFFFF" }}>
                {prayer.nameBn}
              </span>
              <span className="text-sm sm:text-base font-semibold font-mono" style={{ color: "#AAB4C5" }}>
                ({prayer.nameEn})
              </span>
              <span className="text-sm font-arabic font-bold" style={{ color: "#E8B343" }}>
                {prayer.arabicName}
              </span>
            </div>
          </div>

          {/* Adhan Time Display */}
          <div className="text-center sm:text-right">
            <div className="text-[11px] uppercase tracking-wider font-mono flex items-center justify-center sm:justify-end gap-1.5" style={{ color: "#AAB4C5" }}>
              <Clock className="w-3 h-3 text-[#E8B343]" />
              <span>Adhan Time / আজান</span>
            </div>
            <div
              className="text-2xl sm:text-3xl font-black font-mono tracking-tight mt-0.5"
              style={{ color: "#E8B343" }}
            >
              {prayer.time12}
            </div>
          </div>
        </div>

        {/* Date & Sound Indicator Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1" style={{ color: "#AAB4C5" }}>
          <div className="flex items-center gap-1.5 font-mono">
            <CalendarIcon className="w-3.5 h-3.5 text-[#E8B343]" />
            <span>{dateStr} ({dateBn})</span>
          </div>

          <div className="flex items-center gap-2">
            {soundEnabled ? (
              <span className="flex items-center gap-1 font-mono text-[11px] text-emerald-400">
                <Volume2 className="w-3.5 h-3.5" />
                <span>Audio Alert Enabled</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
                <VolumeX className="w-3.5 h-3.5" />
                <span>Muted</span>
              </span>
            )}
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1 text-[11px] text-cyan-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Internal Operations</span>
            </span>
          </div>
        </div>

        {/* 10-Second Auto-Dismiss Rule Progress Bar */}
        <div className="pt-2 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono" style={{ color: "#AAB4C5" }}>
            <span>Auto-dismissing in {secondsLeft}s (স্বয়ংক্রিয়ভাবে বন্ধ হবে)</span>
            <span className="font-bold" style={{ color: "#E8B343" }}>{secondsLeft}s / 10s</span>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}>
            <div
              className="h-full rounded-full transition-all duration-75 ease-linear"
              style={{
                width: `${progressPercent}%`,
                background: "linear-gradient(90deg, #E8B343, #FFD166)",
                boxShadow: "0 0 10px rgba(232, 179, 67, 0.7)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
