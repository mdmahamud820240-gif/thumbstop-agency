"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useContent } from "@/context/ContentContext";

import { PwaInstallPrompt } from "@/components/PwaInstallPrompt";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { siteConfig, accentColor } = useContent();

  useEffect(() => {
    if (typeof document !== "undefined") {
      const primary = siteConfig.themeAccentColor || accentColor || "#1FA8CB";
      const secondary = siteConfig.themeSecondaryColor || "#2E5FCC";
      document.documentElement.style.setProperty("--brand-primary", primary);
      document.documentElement.style.setProperty("--brand-secondary", secondary);
      document.documentElement.style.setProperty("--brand-glow", `${primary}40`);
    }
  }, [siteConfig.themeAccentColor, siteConfig.themeSecondaryColor, accentColor]);

  // Completely isolate /admin and /track from public website Navbar and Footer
  const isStandalone = pathname?.startsWith("/admin") || pathname?.startsWith("/track");

  if (isStandalone) {
    return (
      <>
        <main className="min-h-screen w-full">{children}</main>
        <PwaInstallPrompt />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <PwaInstallPrompt />
    </>
  );
}
