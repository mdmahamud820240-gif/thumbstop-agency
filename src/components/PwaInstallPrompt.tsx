"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Download, X, Smartphone, Share2, PlusSquare } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function PwaInstallPrompt() {
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("ThumbStop PWA Service Worker active with scope:", reg.scope);
        })
        .catch((err) => {
          console.warn("Service Worker registration notice:", err);
        });
    }

    // 2. Check if already installed / running in standalone mode
    if (typeof window !== "undefined") {
      const isStandaloneMode =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
        document.referrer.includes("android-app://");

      setIsStandalone(isStandaloneMode);

      // Detect iOS Safari
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
      setIsIOS(isIosDevice);

      // Check if user dismissed recently (within 3 days)
      const dismissedAt = localStorage.getItem("thumbstop_pwa_dismissed_at");
      const isRecentlyDismissed = dismissedAt && Date.now() - Number(dismissedAt) < 3 * 24 * 60 * 60 * 1000;

      // Listen for Android/Chrome beforeinstallprompt
      const handleBeforeInstall = (e: Event) => {
        e.preventDefault();
        setInstallPromptEvent(e as BeforeInstallPromptEvent);
        if (!isStandaloneMode && !isRecentlyDismissed) {
          // Show after a polite 3 second delay for better user experience
          setTimeout(() => setIsVisible(true), 3000);
        }
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstall);

      // Listen for appinstalled event
      window.addEventListener("appinstalled", () => {
        setIsInstalled(true);
        setIsVisible(false);
        setInstallPromptEvent(null);
      });

      // Global listener to open prompt from Navbar / Mobile Menu / Admin
      const handleOpenPwa = () => {
        if (isIosDevice && !isStandaloneMode) {
          setShowIOSGuide(true);
          setIsVisible(true);
        } else if (installPromptEvent) {
          triggerNativeInstall(installPromptEvent);
        } else {
          setIsVisible(true);
        }
      };

      window.addEventListener("open-pwa-install", handleOpenPwa);

      // If iOS and not dismissed and on mobile, show polite banner
      if (isIosDevice && !isStandaloneMode && !isRecentlyDismissed) {
        setTimeout(() => setIsVisible(true), 4000);
      }

      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
        window.removeEventListener("open-pwa-install", handleOpenPwa);
      };
    }
  }, [installPromptEvent]);

  const triggerNativeInstall = async (promptEvt: BeforeInstallPromptEvent) => {
    if (!promptEvt) return;
    try {
      await promptEvt.prompt();
      const { outcome } = await promptEvt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
        setIsVisible(false);
      }
      setInstallPromptEvent(null);
    } catch (err) {
      console.error("Install prompt error:", err);
    }
  };

  const handleInstallClick = () => {
    if (installPromptEvent) {
      triggerNativeInstall(installPromptEvent);
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      // Fallback for browsers without direct prompt
      alert("অ্যাপটি ইনস্টল করতে আপনার ব্রাউজারের থ্রি-ডট (⋮) মেনু থেকে 'Install App' বা 'Add to Home screen' অপশন নির্বাচন করুন।");
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setShowIOSGuide(false);
    try {
      localStorage.setItem("thumbstop_pwa_dismissed_at", String(Date.now()));
    } catch {}
  };

  // Do not render anything if already running as installed app
  if (isStandalone || !isVisible) return null;

  return (
    <>
      {/* Floating Bottom App Install Banner */}
      <aside
        aria-label="App Installation Banner"
        className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300"
      >
        <div className="relative rounded-2xl p-4 bg-[#091122]/95 backdrop-blur-xl border border-cyan-500/30 text-white shadow-2xl shadow-black/80 ring-1 ring-cyan-500/20">
          <button
            onClick={handleDismiss}
            className="absolute top-2.5 right-2.5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close install prompt"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3 pr-6">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#1FA8CB] to-[#2E5FCC] p-0.5 shadow-md shrink-0 overflow-hidden">
              <div className="w-full h-full rounded-[10px] bg-[#070A12] flex items-center justify-center">
                <Image
                  src="/icons/icon-192x192.png"
                  alt="ThumbStop Logo"
                  width={36}
                  height={36}
                  className="rounded-lg object-contain"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                  ThumbStop মোবাইল অ্যাপ
                </h4>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  PWA
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug mt-0.5">
                ফেসবুক বা ইনস্টাগ্রামের মতো স্মুথলি আপনার ফোনে অ্যাপ হিসেবে ব্যবহার করুন।
              </p>
            </div>
          </div>

          {/* iOS Safari step-by-step instructions */}
          {showIOSGuide && isIOS ? (
            <div className="mt-3 pt-3 border-t border-white/10 text-xs space-y-2 bg-white/[0.03] p-2.5 rounded-xl">
              <div className="text-[11px] font-semibold text-cyan-300 flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5" />
                <span>আইফোনে (iOS Safari) সহজে অ্যাপ ইনস্টল করুন:</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-bold">1</span>
                  <span>সাফারি ব্রাউজারের নিচে <strong>শেয়ার (Share)</strong> <Share2 className="w-3.5 h-3.5 inline mx-0.5 text-cyan-400" /> বাটনে চাপ দিন</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-bold">2</span>
                  <span>মেনু স্ক্রোল করে <strong>&quot;Add to Home Screen&quot;</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-0.5 text-cyan-400" /> সিলেক্ট করুন</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-2 mt-3 pt-2.5 border-t border-white/10">
              <button
                type="button"
                onClick={handleDismiss}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                পরে
              </button>
              <button
                type="button"
                onClick={handleInstallClick}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#1FA8CB] to-[#38bdf8] hover:opacity-95 shadow-md shadow-cyan-500/25 flex items-center gap-1.5 transition-transform active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>অ্যাপ ইনস্টল করুন</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

// Global trigger helper for any button in the app
export function triggerPwaInstall() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-pwa-install"));
  }
}
