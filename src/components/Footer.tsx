"use client";

import React from "react";
import Link from "next/link";
import { useContent } from "@/context/ContentContext";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowUpRight,
  ShieldCheck,
  Lock,
} from "lucide-react";

export function Footer() {
  const { siteConfig, services } = useContent();

  return (
    <footer className="relative bg-[#04060A] border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-32 bg-gradient-to-r from-[#1FA8CB]/10 via-[#2E5FCC]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 p-1 shadow-lg shadow-cyan-500/10 group-hover:shadow-cyan-500/20 group-hover:border-cyan-400/40 transition-all">
                <img
                  src={siteConfig.logoUrl || "/images/brand/logo-emblem-transparent.png"}
                  alt="ThumbStop Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight text-white font-sans">
                  <span className="text-[#00AEEF]">T</span>humb<span className="text-[#2B6CB0]">S</span>top
                </span>
                <p className="text-xs text-[#00AEEF] font-medium tracking-wide">
                  {siteConfig.taglineEn}
                </p>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed font-light max-w-sm">
              Premium digital architecture, high-conversion ad creatives, and enterprise media production born in Dhaka, built to command attention worldwide.
            </p>

            <div className="pt-2 flex flex-col gap-3">
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#1FA8CB] to-[#2E5FCC] hover:opacity-95 shadow-md shadow-[#1FA8CB]/25 transition-all duration-300 w-fit"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Direct</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Social Channels & Facebook Page */}
              {siteConfig.socials && (
                <div className="pt-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    Connect & Follow
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {siteConfig.socials.facebook && (
                      <a
                        href={siteConfig.socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Follow on Facebook"
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#1877F2]/20 border border-white/10 hover:border-[#1877F2]/40 flex items-center justify-center text-slate-300 hover:text-[#1877F2] transition-all"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    )}
                    {siteConfig.socials.instagram && (
                      <a
                        href={siteConfig.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Follow on Instagram"
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-pink-500/20 border border-white/10 hover:border-pink-500/40 flex items-center justify-center text-slate-300 hover:text-pink-400 transition-all"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    )}
                    {siteConfig.socials.linkedin && (
                      <a
                        href={siteConfig.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Follow on LinkedIn"
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#0A66C2]/20 border border-white/10 hover:border-[#0A66C2]/40 flex items-center justify-center text-slate-300 hover:text-[#0A66C2] transition-all"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                    {siteConfig.socials.youtube && (
                      <a
                        href={siteConfig.socials.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Subscribe on YouTube"
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#FF0000]/20 border border-white/10 hover:border-[#FF0000]/40 flex items-center justify-center text-slate-300 hover:text-[#FF0000] transition-all"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </a>
                    )}
                    {siteConfig.socials.twitter && (
                      <a
                        href={siteConfig.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Follow on X / Twitter"
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 flex items-center justify-center text-slate-300 hover:text-white transition-all"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: 8 Services Quick Links */}
          <div className="lg:col-span-5">
            <h3 className="text-xs font-semibold tracking-widest text-slate-300 uppercase mb-5">
              Core Digital Disciplines ({services.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/services#${service.slug}`}
                  className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-cyan-400 transition-colors" />
                  <span className="truncate">{service.titleEn}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Contact Details & Office */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold tracking-widest text-slate-300 uppercase mb-5">
              Dhaka Headquarters
            </h3>
            <ul className="space-y-3.5 text-xs text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#1FA8CB] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{siteConfig.addressEn}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#1FA8CB] shrink-0" />
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="hover:text-cyan-300 transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#1FA8CB] shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-cyan-300 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2 pt-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-[#C9A86A]" />
                <span>Verified Commercial Entity in Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/services" className="hover:text-slate-300 transition-colors">
              Services
            </Link>
            <Link href="/pricing" className="hover:text-slate-300 transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Contact
            </Link>
            <Link
              href="/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors p-1"
              title="Open Admin ERP & Control Center in a New Window"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Panel ↗</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
