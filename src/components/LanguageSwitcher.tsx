"use client";

import React from "react";
import { useContent } from "@/context/ContentContext";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useContent();

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md ${className}`}
      role="group"
      aria-label="Language Selector"
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
          locale === "en"
            ? "bg-gradient-to-r from-[#1FA8CB] to-[#2E5FCC] text-white shadow-md shadow-[#1FA8CB]/25"
            : "text-slate-400 hover:text-white"
        }`}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => setLocale("bn")}
        className={`px-3 py-1 rounded-full text-xs font-semibold font-bangla transition-all duration-200 ${
          locale === "bn"
            ? "bg-gradient-to-r from-[#1FA8CB] to-[#2E5FCC] text-white shadow-md shadow-[#1FA8CB]/25"
            : "text-slate-400 hover:text-white"
        }`}
      >
        বাংলা
      </button>
    </div>
  );
}
