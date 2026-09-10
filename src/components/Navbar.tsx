"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinks, services } from "@/data/content";
import { useContent } from "@/context/ContentContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ServiceIcon } from "./ServiceIcon";
import { Menu, X, ArrowUpRight, MessageCircle, Lock, ChevronDown, Smartphone } from "lucide-react";
import { triggerPwaInstall } from "./PwaInstallPrompt";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const { siteConfig, locale } = useContent();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    queueMicrotask(() => {
      setIsOpen(false);
      setServicesDropdownOpen(false);
      setMobileServicesOpen(false);
    });
  }, [pathname]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 200);
  };

  const isBn = locale === "bn";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-[#070A12]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50 py-3.5"
            : "bg-[#070A12]/40 backdrop-blur-md py-4 sm:py-5 border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 p-1 shadow-lg shadow-cyan-500/10 group-hover:shadow-cyan-500/25 group-hover:border-cyan-400/40 transition-all duration-300">
              <img
                src={siteConfig.logoUrl || "/images/brand/logo-emblem-transparent.png"}
                alt="ThumbStop Logo"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold tracking-tight text-white group-hover:opacity-95 transition-colors">
                  <span className="text-[#00AEEF]">T</span>humb<span className="text-[#2B6CB0]">S</span>top
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF]"></span>
              </div>
              <span className="text-[10px] text-slate-400 tracking-wider font-light hidden sm:inline-block">
                {isBn ? siteConfig.taglineBn : "Got Stopped? It's ThumbStop"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md px-3">
            {navigationLinks.map((link) => {
              const isServices = link.href === "/services";
              const isActive =
                pathname === link.href || (isServices && pathname.startsWith("/services/"));

              if (isServices) {
                return (
                  <div
                    key={link.href}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      onClick={() => setServicesDropdownOpen((prev) => !prev)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                        isBn ? "font-bangla" : ""
                      } ${
                        isActive || servicesDropdownOpen
                          ? "text-white bg-white/10 shadow-inner font-semibold"
                          : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                      }`}
                      aria-expanded={servicesDropdownOpen}
                    >
                      <span>{isBn ? link.nameBn : link.nameEn}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          servicesDropdownOpen ? "rotate-180 text-cyan-400" : "text-slate-400"
                        }`}
                      />
                    </button>

                    {/* Luxury Dropdown Menu (Single Vertical Column: Icon + Name) */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 pt-2 w-72 sm:w-80 z-50">
                        <div className="rounded-2xl bg-[#080E1C]/98 backdrop-blur-2xl border border-white/15 p-2 shadow-2xl shadow-black/90 ring-1 ring-white/10 flex flex-col gap-1">
                          {services.map((s) => (
                            <Link
                              key={s.id}
                              href={`/services/${s.slug}`}
                              onClick={() => setServicesDropdownOpen(false)}
                              className="group flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/[0.08] transition-all text-left"
                            >
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105"
                                style={{
                                  backgroundColor: `${s.themeColor || "#1FA8CB"}15`,
                                  borderColor: `${s.themeColor || "#1FA8CB"}35`,
                                  color: s.themeColor || "#1FA8CB",
                                }}
                              >
                                <ServiceIcon name={s.iconName} className="w-4 h-4" />
                              </div>
                              <span
                                className={`text-xs sm:text-sm font-medium text-slate-200 group-hover:text-cyan-300 transition-colors truncate ${
                                  isBn ? "font-bangla" : ""
                                }`}
                              >
                                {isBn ? s.titleBn : s.titleEn}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isBn ? "font-bangla" : ""
                  } ${
                    isActive
                      ? "text-white bg-white/10 shadow-inner font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {isBn ? link.nameBn : link.nameEn}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Corner: Language Switcher + WhatsApp CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* ⭐️ Top Corner Language Selector */}
            <LanguageSwitcher />

            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: `linear-gradient(to right, ${siteConfig.themeAccentColor || "#1FA8CB"}, ${siteConfig.themeSecondaryColor || "#2E5FCC"})`,
                boxShadow: `0 4px 14px 0 ${(siteConfig.themeAccentColor || "#1FA8CB")}33`,
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white hover:opacity-95 transition-all duration-300 hover:scale-[1.02]"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className={isBn ? "font-bangla text-xs" : ""}>
                {isBn ? "হোয়াটসঅ্যাপে চ্যাট" : "WhatsApp Chat"}
              </span>
            </a>
          </div>

          {/* Mobile Right Bar: Language Switcher + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/[0.04] border border-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#070A12]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-8 shadow-2xl transition-all max-h-[calc(100vh-65px)] overflow-y-auto">
          <div className="flex flex-col gap-4">
            <div className="pb-3 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs text-cyan-400 font-medium">
                {isBn ? siteConfig.taglineBn : siteConfig.taglineEn}
              </span>
              <LanguageSwitcher />
            </div>

            {navigationLinks.map((link) => {
              const isServices = link.href === "/services";
              const isActive =
                pathname === link.href || (isServices && pathname.startsWith("/services/"));

              if (isServices) {
                return (
                  <div key={link.href} className="border-b border-white/[0.04] py-1">
                    <div className="flex items-center justify-between py-2">
                      <Link
                        href="/services"
                        onClick={() => setIsOpen(false)}
                        className={`text-lg font-medium ${
                          isActive ? "text-cyan-400 font-semibold" : "text-slate-300"
                        }`}
                      >
                        <span className={isBn ? "font-bangla" : ""}>
                          {isBn ? link.nameBn : link.nameEn}
                        </span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((prev) => !prev)}
                        className="p-1.5 rounded-lg bg-white/[0.05] text-slate-300 hover:text-white"
                        aria-label="Toggle Services List"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileServicesOpen ? "rotate-180 text-cyan-400" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {mobileServicesOpen && (
                      <div className="pl-1 pb-2 pt-1 flex flex-col gap-1">
                        {services.map((s) => (
                          <Link
                            key={s.id}
                            href={`/services/${s.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.04]"
                          >
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0"
                              style={{
                                backgroundColor: `${s.themeColor || "#1FA8CB"}20`,
                                color: s.themeColor || "#1FA8CB",
                              }}
                            >
                              <ServiceIcon name={s.iconName} className="w-3.5 h-3.5" />
                            </div>
                            <span
                              className={`text-xs font-medium text-white truncate ${
                                isBn ? "font-bangla" : ""
                              }`}
                            >
                              {isBn ? s.titleBn : s.titleEn}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between text-lg font-medium py-2 border-b border-white/[0.04] ${
                    isActive ? "text-cyan-400 font-semibold" : "text-slate-300"
                  }`}
                >
                  <span className={isBn ? "font-bangla" : ""}>
                    {isBn ? link.nameBn : link.nameEn}
                  </span>
                  <span className="text-xs text-slate-500">
                    {isBn ? link.nameEn : link.nameBn}
                  </span>
                </Link>
              );
            })}

            <div className="pt-4 flex flex-col gap-3">
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: `linear-gradient(to right, ${siteConfig.themeAccentColor || "#1FA8CB"}, ${siteConfig.themeSecondaryColor || "#2E5FCC"})`,
                  boxShadow: `0 4px 14px 0 ${(siteConfig.themeAccentColor || "#1FA8CB")}33`,
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm text-white transition-all hover:opacity-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span className={isBn ? "font-bangla" : ""}>
                  {isBn ? "হোয়াটসঅ্যাপে মেসেজ পাঠান" : "Chat on WhatsApp"}
                </span>
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm text-slate-300 bg-white/[0.05] border border-white/10 hover:text-white"
              >
                <span className={isBn ? "font-bangla" : ""}>
                  {isBn ? "প্রজেক্ট প্রস্তাব পাঠান" : "Request Project Proposal"}
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  triggerPwaInstall();
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all shadow-sm active:scale-95"
              >
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span className={isBn ? "font-bangla" : ""}>
                  {isBn ? "📱 মোবাইল অ্যাপ ডাউনলোড / ইনস্টল" : "📱 Install Mobile App"}
                </span>
              </button>

              <div className="pt-2 text-center">
                <Link
                  href="/admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5 py-1"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Control Center ↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
