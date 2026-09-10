"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useContent } from "@/context/ContentContext";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CheckSquare,
  UserCheck,
  Building,
  Receipt,
  CreditCard,
  Wallet,
  BarChart3,
  ShieldCheck,
  GitBranch,
  Sliders,
  SlidersHorizontal,
  Settings,
  Sparkles,
  Clock,
  Search,
  Moon,
  Sun,
  Plus,
  X,
  ExternalLink,
  MessageCircle,
  Check,
  TrendingUp,
  ArrowUpRight,
  ChevronRight,
  Download,
  RotateCcw,
  Lock,
  Menu,
  Phone,
  Layers,
  Activity,
  Workflow,
  Zap,
  AlertCircle,
  Eye,
  EyeOff,
  Key,
  Trash2,
  Copy,
  Share2,
  Upload,
  Globe,
  Film,
  CheckCircle2,
  Palette,
  Edit3,
  Images,
  UploadCloud,
  ImageIcon,
  Printer,
  FileText,
  Code2,
  Camera,
  Target,
  Coins,
  Clapperboard,
  Calendar,
  Bell,
  Send,
  CheckCheck,
  MessageSquare,
  TrendingDown,
  AlertTriangle,
  User,
  Volume2,
  VolumeX,
  ChevronDown,
} from "lucide-react";
import {
  ServiceItem,
  PortfolioSample,
  MADRASA_DEFAULT_STAGES,
  TaskStage,
  ClientRecord,
  EmployeeRecord,
} from "@/data/content";
import { ServiceDetailModal } from "@/components/ServiceDetailModal";
import { UrgentHeadlineTicker } from "@/components/UrgentHeadlineTicker";
import {
  calculateBangladeshPrayerTimes,
  checkCurrentAdhanTime,
  PrayerSchedule,
  PrayerItem,
} from "@/lib/prayerTimes";
import { AdhanNotificationModal } from "@/components/admin/AdhanNotificationModal";
export interface ManagementTheme {
  id: string;
  name: string;
  nameBn: string;
  desc: string;
  isDark: boolean;
  accent: string;
  accentSecondary: string;
  badgeBg: string;
  badgeText: string;
  previewGradient: string;
  bg: string;
  cardBg: string;
  cardBorder: string;
  textMain: string;
  textMuted: string;
  headerBg: string;
  sidebarBg: string;
  tableHeaderBg: string;
  rowHover: string;
  inputBg: string;
  statBg: string;
  accentBtn: string;
  secondaryBtn: string;
}

export const MANAGEMENT_THEMES: ManagementTheme[] = [
  {
    id: "cyber_obsidian",
    name: "Cyber Obsidian (Default)",
    nameBn: "সাইবার অবসিডিয়ান (ডিফল্ট প্রশান্তিময়)",
    desc: "Ultra-luxury deep obsidian dark space with serene cyan/azure micro-accents. Highest visual clarity.",
    isDark: true,
    accent: "#1FA8CB",
    accentSecondary: "#2E5FCC",
    badgeBg: "bg-cyan-500/20",
    badgeText: "text-cyan-300",
    previewGradient: "from-[#040711] via-[#081022] to-[#1FA8CB]",
    bg: "bg-[#040711]",
    cardBg: "bg-[#081022]/85 backdrop-blur-2xl",
    cardBorder: "border-white/[0.07] hover:border-cyan-500/30 transition-all duration-300",
    textMain: "text-[#F1F5F9]",
    textMuted: "text-[#7D8FA6]",
    headerBg: "bg-[#050916]/85 backdrop-blur-2xl border-white/[0.06]",
    sidebarBg: "bg-[#03060E]/95 backdrop-blur-3xl border-white/[0.06]",
    tableHeaderBg: "bg-[#060D1E]/90",
    rowHover: "hover:bg-white/[0.03]",
    inputBg: "bg-[#060D1C]/90 border-white/[0.08] text-white focus:border-cyan-500/50",
    statBg: "bg-[#070E20]/75 border-white/[0.07]",
    accentBtn: "bg-gradient-to-r from-[#1FA8CB] via-[#2463D4] to-[#2E5FCC] hover:brightness-110 text-white shadow-lg shadow-cyan-500/20",
    secondaryBtn: "bg-white/[0.04] border-white/[0.08] text-slate-200 hover:bg-white/[0.08]",
  },
  {
    id: "midnight_sapphire",
    name: "Midnight Sapphire",
    nameBn: "মিডনাইট স্যাফায়ার (গভীর নীল)",
    desc: "Executive corporate deep navy with glowing royal blue accents. Clean, calm, highly focused.",
    isDark: true,
    accent: "#3B82F6",
    accentSecondary: "#1D4ED8",
    badgeBg: "bg-blue-500/20",
    badgeText: "text-blue-300",
    previewGradient: "from-[#030B1E] via-[#0B1A3A] to-[#3B82F6]",
    bg: "bg-[#030B1E]",
    cardBg: "bg-[#0A1630]/85 backdrop-blur-2xl",
    cardBorder: "border-blue-500/20 hover:border-blue-400/40 transition-all duration-300",
    textMain: "text-[#F0F6FF]",
    textMuted: "text-[#8BA0C2]",
    headerBg: "bg-[#05112B]/85 backdrop-blur-2xl border-blue-500/15",
    sidebarBg: "bg-[#020816]/95 backdrop-blur-3xl border-blue-500/15",
    tableHeaderBg: "bg-[#091736]/90",
    rowHover: "hover:bg-blue-500/[0.05]",
    inputBg: "bg-[#08142E]/90 border-blue-500/20 text-white focus:border-blue-400/60",
    statBg: "bg-[#0A1836]/75 border-blue-500/20",
    accentBtn: "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:brightness-110 text-white shadow-lg shadow-blue-500/25",
    secondaryBtn: "bg-blue-950/40 border-blue-500/20 text-blue-100 hover:bg-blue-900/40",
  },
  {
    id: "emerald_matrix",
    name: "Emerald Matrix",
    nameBn: "পান্না ম্যাট্রিক্স (ইসলামিক ও এমারেল্ড গ্রিন)",
    desc: "Opulent dark emerald and jade Islamic executive theme with refreshing high-contrast green accents.",
    isDark: true,
    accent: "#10B981",
    accentSecondary: "#059669",
    badgeBg: "bg-emerald-500/20",
    badgeText: "text-emerald-300",
    previewGradient: "from-[#021510] via-[#062920] to-[#10B981]",
    bg: "bg-[#021510]",
    cardBg: "bg-[#06241C]/85 backdrop-blur-2xl",
    cardBorder: "border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300",
    textMain: "text-[#ECFDF5]",
    textMuted: "text-[#86A89A]",
    headerBg: "bg-[#031C15]/85 backdrop-blur-2xl border-emerald-500/15",
    sidebarBg: "bg-[#01100C]/95 backdrop-blur-3xl border-emerald-500/15",
    tableHeaderBg: "bg-[#072B21]/90",
    rowHover: "hover:bg-emerald-500/[0.05]",
    inputBg: "bg-[#052119]/90 border-emerald-500/20 text-white focus:border-emerald-400/60",
    statBg: "bg-[#07281F]/75 border-emerald-500/20",
    accentBtn: "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:brightness-110 text-white shadow-lg shadow-emerald-500/25",
    secondaryBtn: "bg-emerald-950/40 border-emerald-500/20 text-emerald-100 hover:bg-emerald-900/40",
  },
  {
    id: "imperial_gold",
    name: "Imperial Gold",
    nameBn: "ইম্পেরিয়াল গোল্ড (রাজকীয় সোনা)",
    desc: "Luxurious royal warm gold and champagne glow over velvet charcoal darkness. Executive wealth aesthetic.",
    isDark: true,
    accent: "#F59E0B",
    accentSecondary: "#D97706",
    badgeBg: "bg-amber-500/20",
    badgeText: "text-amber-300",
    previewGradient: "from-[#140F04] via-[#241A08] to-[#F59E0B]",
    bg: "bg-[#140F04]",
    cardBg: "bg-[#20180B]/85 backdrop-blur-2xl",
    cardBorder: "border-amber-500/20 hover:border-amber-400/40 transition-all duration-300",
    textMain: "text-[#FFFBEB]",
    textMuted: "text-[#BBA88A]",
    headerBg: "bg-[#1A1308]/85 backdrop-blur-2xl border-amber-500/15",
    sidebarBg: "bg-[#0F0B03]/95 backdrop-blur-3xl border-amber-500/15",
    tableHeaderBg: "bg-[#281E0C]/90",
    rowHover: "hover:bg-amber-500/[0.05]",
    inputBg: "bg-[#1F170A]/90 border-amber-500/20 text-white focus:border-amber-400/60",
    statBg: "bg-[#231A0B]/75 border-amber-500/20",
    accentBtn: "bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-600 hover:brightness-110 text-slate-950 font-bold shadow-lg shadow-amber-500/25",
    secondaryBtn: "bg-amber-950/40 border-amber-500/20 text-amber-100 hover:bg-amber-900/40",
  },
  {
    id: "royal_amethyst",
    name: "Royal Amethyst",
    nameBn: "রয়্যাল অ্যামেথিস্ট (বেগুনী ভাইব)",
    desc: "Mystic deep violet and neon purple aesthetic. Perfect for creative studios, high inspiration & energy.",
    isDark: true,
    accent: "#A855F7",
    accentSecondary: "#7C3AED",
    badgeBg: "bg-purple-500/20",
    badgeText: "text-purple-300",
    previewGradient: "from-[#100720] via-[#1E0B38] to-[#A855F7]",
    bg: "bg-[#100720]",
    cardBg: "bg-[#1B0C32]/85 backdrop-blur-2xl",
    cardBorder: "border-purple-500/20 hover:border-purple-400/40 transition-all duration-300",
    textMain: "text-[#FAF5FF]",
    textMuted: "text-[#AC94C6]",
    headerBg: "bg-[#15092A]/85 backdrop-blur-2xl border-purple-500/15",
    sidebarBg: "bg-[#0C0418]/95 backdrop-blur-3xl border-purple-500/15",
    tableHeaderBg: "bg-[#220E3E]/90",
    rowHover: "hover:bg-purple-500/[0.05]",
    inputBg: "bg-[#190B2F]/90 border-purple-500/20 text-white focus:border-purple-400/60",
    statBg: "bg-[#1E0D37]/75 border-purple-500/20",
    accentBtn: "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:brightness-110 text-white shadow-lg shadow-purple-500/25",
    secondaryBtn: "bg-purple-950/40 border-purple-500/20 text-purple-100 hover:bg-purple-900/40",
  },
  {
    id: "crimson_dark",
    name: "Crimson Velvet",
    nameBn: "ক্রিমসন ভেলভেট (লাল ও ব্ল্যাক লাক্সারি)",
    desc: "High-octane dramatic deep ruby red and dark mahogany theme. Bold leadership & urgent deadlines.",
    isDark: true,
    accent: "#EF4444",
    accentSecondary: "#DC2626",
    badgeBg: "bg-rose-500/20",
    badgeText: "text-rose-300",
    previewGradient: "from-[#160608] via-[#2A0A10] to-[#EF4444]",
    bg: "bg-[#160608]",
    cardBg: "bg-[#230B11]/85 backdrop-blur-2xl",
    cardBorder: "border-rose-500/20 hover:border-rose-400/40 transition-all duration-300",
    textMain: "text-[#FFF1F2]",
    textMuted: "text-[#B98F95]",
    headerBg: "bg-[#1C070C]/85 backdrop-blur-2xl border-rose-500/15",
    sidebarBg: "bg-[#0E0305]/95 backdrop-blur-3xl border-rose-500/15",
    tableHeaderBg: "bg-[#2D0D14]/90",
    rowHover: "hover:bg-rose-500/[0.05]",
    inputBg: "bg-[#200A10]/90 border-rose-500/20 text-white focus:border-rose-400/60",
    statBg: "bg-[#260C13]/75 border-rose-500/20",
    accentBtn: "bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:brightness-110 text-white shadow-lg shadow-rose-500/25",
    secondaryBtn: "bg-rose-950/40 border-rose-500/20 text-rose-100 hover:bg-rose-900/40",
  },
  {
    id: "titanium_slate",
    name: "Titanium Slate",
    nameBn: "টাইটানিয়াম স্লেট (মডার্ন মিনিমালিস্ট ধূসর)",
    desc: "Industrial sleek monochromatic carbon steel with sharp cool-grey accents. Zero visual noise.",
    isDark: true,
    accent: "#94A3B8",
    accentSecondary: "#64748B",
    badgeBg: "bg-slate-500/20",
    badgeText: "text-slate-300",
    previewGradient: "from-[#0F172A] via-[#1E293B] to-[#94A3B8]",
    bg: "bg-[#0A0E17]",
    cardBg: "bg-[#111827]/85 backdrop-blur-2xl",
    cardBorder: "border-slate-700/50 hover:border-slate-500/50 transition-all duration-300",
    textMain: "text-[#F8FAFC]",
    textMuted: "text-[#94A3B8]",
    headerBg: "bg-[#0D131F]/85 backdrop-blur-2xl border-slate-800",
    sidebarBg: "bg-[#070A10]/95 backdrop-blur-3xl border-slate-800",
    tableHeaderBg: "bg-[#151E2E]/90",
    rowHover: "hover:bg-slate-700/20",
    inputBg: "bg-[#0E1522]/90 border-slate-700 text-white focus:border-slate-400",
    statBg: "bg-[#121B2B]/75 border-slate-800",
    accentBtn: "bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 hover:brightness-110 text-white shadow-lg shadow-slate-700/30",
    secondaryBtn: "bg-slate-800/50 border-slate-700 text-slate-200 hover:bg-slate-700/50",
  },
  {
    id: "nordic_aurora",
    name: "Nordic Aurora",
    nameBn: "নর্ডিক অরোরা (আর্কটিক টিল)",
    desc: "Crisp Arctic fjord darkness illuminated by shimmering northern teal and mint highlights.",
    isDark: true,
    accent: "#14B8A6",
    accentSecondary: "#0D9488",
    badgeBg: "bg-teal-500/20",
    badgeText: "text-teal-300",
    previewGradient: "from-[#021A1A] via-[#052E2E] to-[#14B8A6]",
    bg: "bg-[#021717]",
    cardBg: "bg-[#052424]/85 backdrop-blur-2xl",
    cardBorder: "border-teal-500/20 hover:border-teal-400/40 transition-all duration-300",
    textMain: "text-[#F0FDFA]",
    textMuted: "text-[#80B0AD]",
    headerBg: "bg-[#031C1C]/85 backdrop-blur-2xl border-teal-500/15",
    sidebarBg: "bg-[#011111]/95 backdrop-blur-3xl border-teal-500/15",
    tableHeaderBg: "bg-[#062B2B]/90",
    rowHover: "hover:bg-teal-500/[0.05]",
    inputBg: "bg-[#042020]/90 border-teal-500/20 text-white focus:border-teal-400/60",
    statBg: "bg-[#062626]/75 border-teal-500/20",
    accentBtn: "bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 hover:brightness-110 text-white shadow-lg shadow-teal-500/25",
    secondaryBtn: "bg-teal-950/40 border-teal-500/20 text-teal-100 hover:bg-teal-900/40",
  },
  {
    id: "pure_oled_black",
    name: "Pure OLED Black",
    nameBn: "পিওর ওলেড ব্ল্যাক (ব্যাটারি সেভার ও পরম শান্ত)",
    desc: "True pitch-black #000000 background for infinite contrast on high-end OLED displays. Ultra sharp.",
    isDark: true,
    accent: "#38BDF8",
    accentSecondary: "#0284C7",
    badgeBg: "bg-sky-500/20",
    badgeText: "text-sky-300",
    previewGradient: "from-[#000000] via-[#0A0A0A] to-[#38BDF8]",
    bg: "bg-[#000000]",
    cardBg: "bg-[#09090B]/95 backdrop-blur-2xl",
    cardBorder: "border-white/[0.12] hover:border-sky-500/50 transition-all duration-300",
    textMain: "text-[#FFFFFF]",
    textMuted: "text-[#A1A1AA]",
    headerBg: "bg-[#000000]/95 backdrop-blur-2xl border-white/[0.10]",
    sidebarBg: "bg-[#000000] border-white/[0.10]",
    tableHeaderBg: "bg-[#0E0E10]",
    rowHover: "hover:bg-white/[0.04]",
    inputBg: "bg-[#09090B] border-white/[0.14] text-white focus:border-sky-400",
    statBg: "bg-[#09090B] border-white/[0.12]",
    accentBtn: "bg-gradient-to-r from-sky-500 via-blue-600 to-sky-600 hover:brightness-110 text-white shadow-lg shadow-sky-500/30",
    secondaryBtn: "bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800",
  },
  {
    id: "luxury_pearl_light",
    name: "Luxury Pearl Light",
    nameBn: "লাক্সারি পার্ল লাইট (দিনের প্রিমিয়াম লাইট থিম)",
    desc: "Refined bright executive ivory and porcelain canvas with sharp royal blue and slate typography.",
    isDark: false,
    accent: "#1E5BC4",
    accentSecondary: "#194EAA",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
    previewGradient: "from-[#F5F7FB] via-[#E2E8F0] to-[#1E5BC4]",
    bg: "bg-[#F5F7FB]",
    cardBg: "bg-white",
    cardBorder: "border-[#E5EAF2] hover:border-blue-400/60 transition-all duration-300",
    textMain: "text-[#102038]",
    textMuted: "text-[#6B7C96]",
    headerBg: "bg-white/95 border-[#E2E8F0]",
    sidebarBg: "bg-[#07182D] border-[#07182D]",
    tableHeaderBg: "bg-[#F8FAFD]",
    rowHover: "hover:bg-[#F0F4FA]",
    inputBg: "bg-white border-[#D6DFEB] text-slate-900 focus:border-blue-500",
    statBg: "bg-white border-[#E5EAF2]",
    accentBtn: "bg-[#1E5BC4] hover:bg-[#194EAA] text-white shadow-md shadow-blue-600/20",
    secondaryBtn: "bg-white border-[#D6DFEB] text-slate-700 hover:bg-[#F2F6FC]",
  },
];

export interface ManagementProfile {
  id: string;
  name: string;
  role: "super_admin" | "editor" | "uploader" | "designer" | "developer";
  title: string;
  avatarBg: string;
}

export const MANAGEMENT_PROFILES: ManagementProfile[] = [
  { id: "super_admin", name: "Abu Tawfiq", role: "super_admin", title: "Super Admin & Founder", avatarBg: "from-amber-500 to-red-600" },
  { id: "editor_sayed", name: "Sayed Ahmed", role: "editor", title: "Senior Video Editor (Editor 1)", avatarBg: "from-purple-500 to-indigo-600" },
  { id: "editor_hasan", name: "Hasan Mahmud", role: "editor", title: "Video & Motion Editor (Editor 2)", avatarBg: "from-blue-500 to-cyan-600" },
  { id: "uploader_rafiq", name: "Rafiqul Alam", role: "uploader", title: "Content Publisher & Uploader", avatarBg: "from-emerald-500 to-teal-600" },
  { id: "designer_nabila", name: "Nabila Rahman", role: "designer", title: "Art Director & Designer", avatarBg: "from-pink-500 to-rose-600" },
  { id: "dev_tariqul", name: "Tariqul Islam", role: "developer", title: "Lead Developer", avatarBg: "from-cyan-500 to-blue-600" },
];

export interface StaffModuleOption {
  id: string;
  label: string;
  group: "general" | "operations" | "management" | "finance";
  isConfidential?: boolean;
}

export const AVAILABLE_STAFF_MODULES: StaffModuleOption[] = [
  { id: "Dashboard", label: "Dashboard (কাজের ড্যাশবোর্ড)", group: "general" },
  { id: "Tasks", label: "Tasks & Pipeline (টাস্ক ও ডেলিভারি)", group: "operations" },
  { id: "Clients", label: "Clients & Trackers (ক্লায়েন্ট ও লাইভ ট্র্যাকার)", group: "operations" },
  { id: "Services", label: "Services (সার্ভিস ও রেট কার্ড)", group: "operations" },
  { id: "Employees", label: "Team & Staff (টিম মেম্বার তালিকা)", group: "management" },
  { id: "Departments", label: "Departments (ডিপার্টমেন্ট ভিউ)", group: "management" },
  { id: "Finance", label: "Finance Dept (টাকার সামগ্রিক হিসাব)", group: "finance", isConfidential: true },
  { id: "Payments", label: "Client Payments (ক্লায়েন্ট পেমেন্ট)", group: "finance", isConfidential: true },
  { id: "Expenses", label: "Agency Expenses (এজেন্সি খরচ)", group: "finance", isConfidential: true },
  { id: "Salary", label: "Salary Payroll (বেতন শিট)", group: "finance", isConfidential: true },
  { id: "Reports", label: "Financial P&L Report (লাভ-ক্ষতি রিপোর্ট)", group: "finance", isConfidential: true },
  { id: "Workflow", label: "Workflow Config (কাজের ধাপ কনফিগারেশন)", group: "operations" },
];

export const ROLE_PERMISSION_PRESETS = [
  {
    id: "finance_admin",
    label: "💰 Finance Admin / Officer (সম্পূর্ণ ফাইন্যান্স ও অ্যাকাউন্টিং)",
    modules: ["Dashboard", "Finance", "Payments", "Expenses", "Salary", "Reports"],
    note: "আর্থিক হিসাব, পেমেন্ট, খরচ, বেতন ও প্রফিট রিপোর্ট অ্যাক্সেস থাকবে।",
  },
  {
    id: "finance_only",
    label: "💼 Finance Only (শুধুমাত্র ফাইন্যান্স ডিপার্টমেন্ট)",
    modules: ["Finance", "Payments", "Expenses", "Salary", "Reports"],
    note: "টাস্ক বা ক্লায়েন্ট দেখতে পারবে না, শুধুমাত্র ফাইন্যান্স থাকবে।",
  },
  {
    id: "developer",
    label: "💻 Web Developer / Engineer (ফাইন্যান্স ব্যতীত টেক টিম)",
    modules: ["Dashboard", "Tasks", "Clients", "Services", "Workflow"],
    note: "টাস্ক, ক্লায়েন্ট, সার্ভিস ও কাজের ধাপ দেখতে পারবে (ফাইন্যান্স সম্পূর্ণ গোপন)।",
  },
  {
    id: "video_editor",
    label: "🎬 Senior Video Editor / Colorist (টাস্ক ও ক্লায়েন্ট)",
    modules: ["Dashboard", "Tasks", "Clients"],
    note: "শুধুমাত্র অ্যাসাইন করা টাস্ক ও ক্লায়েন্ট বিবরণী দেখতে পারবে।",
  },
  {
    id: "art_director",
    label: "🎨 Art Director / Graphic Designer (ক্রিয়েটিভ ও সার্ভিস)",
    modules: ["Dashboard", "Tasks", "Clients", "Services"],
    note: "ডিজাইন টাস্ক, ক্লায়েন্ট ও সার্ভিস প্যাকেজ দেখতে পারবে।",
  },
  {
    id: "operations_lead",
    label: "📋 Operations Lead (টিম ও ক্লায়েন্ট ম্যানেজমেন্ট)",
    modules: ["Dashboard", "Tasks", "Clients", "Services", "Employees", "Departments", "Workflow"],
    note: "টিম ও ক্লায়েন্ট অপারেশন পরিচালনা করতে পারবে (ফাইন্যান্স বাদে)।",
  },
  {
    id: "basic_viewer",
    label: "👁 Viewer / Basic Staff (শুধুমাত্র ড্যাশবোর্ড)",
    modules: ["Dashboard"],
    note: "অন্য কোনো সেকশন দেখার পারমিশন থাকবে না।",
  },
  {
    id: "custom",
    label: "🛠 Custom Selection (নিজে পছন্দমতো নির্বাচন করুন)",
    modules: [],
    note: "নিচের ড্রপডাউন ও চেকবক্সগুলো থেকে যেকোনো মডিউল বেছে নিন।",
  },
];


export interface TeamNotification {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  recipientId: string; // "all" | specific profile id
  recipientName: string;
  subject: string; // বিষয়
  message: string; // বিস্তারিত নোট
  timestamp: string;
  isRead: boolean;
  priority: "urgent" | "normal";
}

export const NOTIFICATION_SUBJECTS = [
  "ভিডিও এডিটিং ও রিলস",
  "থাম্বনেইল ও গ্রাফিক্স ডিজাইন",
  "ফুটেজ ট্রান্সফার ও কালার গ্রেডিং",
  "ইউটিউব / ফেসবুক আপলোড ও শিডিউল",
  "ওয়েবসাইট ও পোর্টাল ডেভেলপমেন্ট",
  "জরুরি ডেলিভারি ও ডেডলাইন",
  "সাধারণ আলোচনা ও প্রশ্ন",
];

const DEFAULT_NOTIFICATIONS: TeamNotification[] = [
  {
    id: "notif-1",
    senderId: "super_admin",
    senderName: "Abu Tawfiq",
    senderRole: "Super Admin",
    recipientId: "all",
    recipientName: "Everyone (সকল মেম্বার)",
    subject: "জরুরি ডেলিভারি ও ডেডলাইন",
    message: "জরুরি নির্দেশ: আজ সন্ধ্যা ৬:০০ টার ভেতরে এই পেজের সকল কাজ এবং শিডিউল কমপ্লিট চাই।",
    timestamp: "আজ দুপুর ১২:৩০",
    isRead: false,
    priority: "urgent",
  },
  {
    id: "notif-2",
    senderId: "editor_sayed",
    senderName: "Sayed Ahmed",
    senderRole: "Senior Video Editor",
    recipientId: "editor_hasan",
    recipientName: "Hasan Mahmud (Video Editor 2)",
    subject: "ফুটেজ ট্রান্সফার ও কালার গ্রেডিং",
    message: "হাসান ভাই, আল-মদিনা মাদ্রাসার ৪কে প্রোমো ফুটেজের কালার গ্রেডিং সম্পন্ন। আপনি ফাইনাল ট্রানজিশন ও ব্যাকগ্রাউন্ড নাসিদ যোগ করে দিন।",
    timestamp: "আজ সকাল ১১:১৫",
    isRead: false,
    priority: "normal",
  },
  {
    id: "notif-3",
    senderId: "editor_hasan",
    senderName: "Hasan Mahmud",
    senderRole: "Video Editor",
    recipientId: "uploader_rafiq",
    recipientName: "Rafiqul Alam (Uploader)",
    subject: "ইউটিউব / ফেসবুক আপলোড ও শিডিউল",
    message: "আল-হুদা একাডেমির রিলস ও ইউটিউব শর্টস এক্সপোর্ট রেডি। ড্রাইভ থেকে ডাউনলোড করে পাবলিশ করুন।",
    timestamp: "আজ সকাল ১০:৪৫",
    isRead: false,
    priority: "normal",
  },
  {
    id: "notif-4",
    senderId: "designer_nabila",
    senderName: "Nabila Rahman",
    senderRole: "Art Director",
    recipientId: "editor_sayed",
    recipientName: "Sayed Ahmed (Video Editor 1)",
    subject: "থাম্বনেইল ও গ্রাফিক্স ডিজাইন",
    message: "নতুন ইসলামিক কালচারাল সামিটের ৩টি থাম্বনেইল ভ্যারিয়েন্ট ও লোয়ার থার্ড পিএনজি এসেট ফোল্ডারে রেডি আছে।",
    timestamp: "গতকাল বিকাল ৫:২০",
    isRead: true,
    priority: "normal",
  },
  {
    id: "notif-5",
    senderId: "dev_tariqul",
    senderName: "Tariqul Islam",
    senderRole: "Lead Developer",
    recipientId: "super_admin",
    recipientName: "Abu Tawfiq (Super Admin)",
    subject: "ওয়েবসাইট ও পোর্টাল ডেভেলপমেন্ট",
    message: "অনলাইন মাদ্রাসা পোর্টাল ২.০ পেমেন্ট গেটওয়ে (bKash & Nagad) লাইভ টেস্টিং সফলভাবে সম্পন্ন হয়েছে।",
    timestamp: "গতকাল দুপুর ২:১০",
    isRead: true,
    priority: "normal",
  },
];

const NOTIF_QUICK_PRESETS = [
  "আজ সন্ধ্যা ৬:০০ টার ভেতরে এই পেজের সকল কাজ কমপ্লিট চাই।",
  "ভিডিও এডিটিং শেষ, ড্রাইভের লিংক চেক করে পাবলিশ দিন।",
  "নতুন সোশ্যাল মিডিয়া ব্যানার ও থাম্বনেইল ড্রাইভে আপলোড করা হয়েছে।",
  "জরুরি ক্লায়েন্ট মিটিং শিডিউল আপডেট করা হয়েছে, চেক করুন।",
  "অনলাইন মাদ্রাসা পোর্টালের নতুন আপডেট টেস্টিংয়ের জন্য প্রস্তুত।"
];

export default function AdminControlPanel() {
  const {
    siteConfig,
    services,
    clients,
    tasks,
    employees,
    payments,
    expenses,
    salaries,
    activityLogs,
    addActivityLog,
    updateSiteConfig,
    updateService,
    addClient,
    updateClient,
    deleteClient,
    addTask,
    updateTask,
    deleteTask,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    addPayment,
    addExpense,
    markSalaryPaid,
    resetToDefaults,
    exportData,
    importData,
    accentColor,
    setAccentColor,
  } = useContent();

  // Authentication State (Dual Support: Super Admin Master Passcode & Staff Credentials)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loggedInStaff, setLoggedInStaff] = useState<EmployeeRecord | null>(null);
  const [authError, setAuthError] = useState("");

  // Master Workspace Mode:
  // "operations" = Daily Agency ERP (Clients, Tasks, Finance, Employees)
  // "cms" = Dedicated Website CMS & Public Site Editor (Super Admin Exclusive)
  const [workspaceMode, setWorkspaceMode] = useState<"operations" | "cms">("operations");

  // Navigation page within the active workspace
  const [activePage, setActivePage] = useState<string>("dashboard");
  const [cmsPage, setCmsPage] = useState<
    "hero" | "branding" | "colors" | "socials" | "services" | "contact" | "ticker" | "stats" | "data"
  >("hero");

  // Mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 🎨 Management Theme & Colors Customizer State (Dynamic Suite System)
  const [managementThemeId, setManagementThemeId] = useState<string>("cyber_obsidian");
  const [managementCustomAccent, setManagementCustomAccent] = useState<string>("");
  const [managementCardStyle, setManagementCardStyle] = useState<"glass" | "solid" | "bordered">("glass");
  const [managementGlowIntensity, setManagementGlowIntensity] = useState<"subtle" | "vibrant" | "off">("subtle");

  // Load management theme preferences from localStorage
  useEffect(() => {
    try {
      const savedThemeConfig = localStorage.getItem("thumbstop_mgmt_theme_config");
      if (savedThemeConfig) {
        const parsed = JSON.parse(savedThemeConfig);
        if (parsed.themeId) setManagementThemeId(parsed.themeId);
        if (parsed.customAccent !== undefined) setManagementCustomAccent(parsed.customAccent);
        if (parsed.cardStyle) setManagementCardStyle(parsed.cardStyle);
        if (parsed.glowIntensity) setManagementGlowIntensity(parsed.glowIntensity);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const saveManagementThemeConfig = (newThemeId?: string, newAccent?: string, newStyle?: "glass" | "solid" | "bordered", newGlow?: "subtle" | "vibrant" | "off") => {
    const tId = newThemeId !== undefined ? newThemeId : managementThemeId;
    const acc = newAccent !== undefined ? newAccent : managementCustomAccent;
    const style = newStyle !== undefined ? newStyle : managementCardStyle;
    const glow = newGlow !== undefined ? newGlow : managementGlowIntensity;

    if (newThemeId !== undefined) setManagementThemeId(newThemeId);
    if (newAccent !== undefined) setManagementCustomAccent(newAccent);
    if (newStyle !== undefined) setManagementCardStyle(newStyle);
    if (newGlow !== undefined) setManagementGlowIntensity(newGlow);

    try {
      localStorage.setItem(
        "thumbstop_mgmt_theme_config",
        JSON.stringify({
          themeId: tId,
          customAccent: acc,
          cardStyle: style,
          glowIntensity: glow,
        })
      );
    } catch {
      // Ignore
    }
  };

  // Theme
  const [isDark, setIsDark] = useState(true);

  // 🎨 Active Management Theme Resolution (Must be called before any early returns)
  const activeMgmtTheme = useMemo(() => {
    if (!isDark) {
      return MANAGEMENT_THEMES.find((t) => !t.isDark) || MANAGEMENT_THEMES[9];
    }
    const found = MANAGEMENT_THEMES.find((t) => t.id === managementThemeId);
    return found && found.isDark ? found : MANAGEMENT_THEMES[0];
  }, [isDark, managementThemeId]);

  // Derived theme styling dynamically applying the active management theme preset
  const theme = useMemo(() => {
    let cardBgStyle = activeMgmtTheme.cardBg;
    let cardBorderStyle = activeMgmtTheme.cardBorder;

    if (managementCardStyle === "solid") {
      cardBgStyle = isDark ? "bg-[#091120]" : "bg-white";
    } else if (managementCardStyle === "bordered") {
      cardBorderStyle = isDark ? "border-white/20 shadow-md" : "border-slate-300 shadow-md";
    }

    return {
      bg: activeMgmtTheme.bg,
      cardBg: cardBgStyle,
      cardBorder: cardBorderStyle,
      textMain: activeMgmtTheme.textMain,
      textMuted: activeMgmtTheme.textMuted,
      headerBg: activeMgmtTheme.headerBg,
      sidebarBg: activeMgmtTheme.sidebarBg,
      tableHeaderBg: activeMgmtTheme.tableHeaderBg,
      rowHover: activeMgmtTheme.rowHover,
      inputBg: activeMgmtTheme.inputBg,
      statBg: activeMgmtTheme.statBg,
      accentBtn: activeMgmtTheme.accentBtn,
      secondaryBtn: activeMgmtTheme.secondaryBtn,
      accentHex: managementCustomAccent || activeMgmtTheme.accent,
      accentSecondaryHex: activeMgmtTheme.accentSecondary,
    };
  }, [activeMgmtTheme, managementCardStyle, isDark, managementCustomAccent]);

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  // Active Profile & Role State for Stage Approvals & Team Notifications
  const [activeProfileId, setActiveProfileId] = useState<string>("super_admin");
  const activeProfile = useMemo(() => {
    return MANAGEMENT_PROFILES.find((p) => p.id === activeProfileId) || MANAGEMENT_PROFILES[0];
  }, [activeProfileId]);

  const actingRole = activeProfile.role;
  const actingName = `${activeProfile.name} (${activeProfile.title})`;
  const isSuperAdmin = !loggedInStaff && activeProfile.role === "super_admin";

  // 🛡️ Granular Module Access Control Checker
  const canAccessModule = (moduleName: string) => {
    if (isSuperAdmin) return true;
    if (!loggedInStaff) return false;
    const mods = (loggedInStaff.accessModules || []).map((m) => m.toLowerCase());
    return mods.includes(moduleName.toLowerCase());
  };

  // Check if staff has access to any finance module
  const hasAnyFinanceAccess = useMemo(() => {
    if (isSuperAdmin) return true;
    if (!loggedInStaff) return false;
    return (
      canAccessModule("Finance") ||
      canAccessModule("Payments") ||
      canAccessModule("Expenses") ||
      canAccessModule("Salary") ||
      canAccessModule("Reports")
    );
  }, [isSuperAdmin, loggedInStaff]);

  // 💰 Finance Department Sub-Tab State
  const [financeSubTab, setFinanceSubTab] = useState<"payments" | "expenses" | "salary" | "reports">("payments");

  // Keep financeSubTab synced when activePage is changed directly
  useEffect(() => {
    if (activePage === "payments") setFinanceSubTab("payments");
    else if (activePage === "expenses") setFinanceSubTab("expenses");
    else if (activePage === "salary") setFinanceSubTab("salary");
    else if (activePage === "reports") setFinanceSubTab("reports");
  }, [activePage]);

  // 🛡️ Automatic Page-Level Security Guard for Staff Access
  useEffect(() => {
    if (loggedInStaff && !isSuperAdmin) {
      const pageToModuleMap: Record<string, string> = {
        dashboard: "Dashboard",
        tasks: "Tasks",
        clients: "Clients",
        services: "Services",
        employees: "Employees",
        departments: "Departments",
        finance: "Finance",
        payments: "Payments",
        expenses: "Expenses",
        salary: "Salary",
        reports: "Reports",
        workflow: "Workflow",
      };

      // 1. Strict Isolation: Super-Admin Exclusive Pages
      if (["permissions", "logs"].includes(activePage) || workspaceMode === "cms") {
        setWorkspaceMode("operations");
        const allowed = (loggedInStaff.accessModules || []).map((m) => m.toLowerCase());
        const targetPage = allowed.includes("dashboard")
          ? "dashboard"
          : allowed.includes("finance") || allowed.includes("payments")
          ? "finance"
          : allowed.includes("tasks")
          ? "tasks"
          : allowed[0] || "dashboard";
        setActivePage(targetPage);
        showToast("নিরাপত্তা সতর্কতা: এই সেকশনে প্রবেশের অনুমতি শুধুমাত্র প্রধান অ্যাডমিনের রয়েছে।");
        return;
      }

      // 2. Check if staff is on a restricted module
      const requiredModule = pageToModuleMap[activePage];
      if (requiredModule && !canAccessModule(requiredModule)) {
        const allowed = (loggedInStaff.accessModules || []).map((m) => m.toLowerCase());
        const fallback = allowed.includes("dashboard")
          ? "dashboard"
          : allowed.includes("finance") || allowed.includes("payments")
          ? "finance"
          : allowed.includes("tasks")
          ? "tasks"
          : allowed.includes("clients")
          ? "clients"
          : allowed[0] || "dashboard";
        setActivePage(fallback);
        showToast(`আপনার অ্যাকাউন্টে '${requiredModule}' মডিউল দেখার অনুমতি নেই।`);
      }
    }
  }, [activePage, loggedInStaff, workspaceMode, isSuperAdmin]);

  const handleProfileChange = (profileId: string) => {
    // If logged in as non-admin staff, prevent unauthorized access to Super Admin profile
    if (loggedInStaff && profileId === "super_admin") {
      showToast("অ্যাক্সেস সংরক্ষিত: সুপার অ্যাডমিন প্রোফাইল শুধুমাত্র প্রধান অ্যাডমিনের জন্য।");
      return;
    }
    setActiveProfileId(profileId);
    const target = MANAGEMENT_PROFILES.find((p) => p.id === profileId);
    if (target && target.role !== "super_admin") {
      if (["finance", "payments", "expenses", "salary", "reports", "employees"].includes(activePage)) {
        setActivePage("dashboard");
      }
    }
  };

  // 🔔 Management Team Inter-Profile Notifications System State
  const [notifications, setNotifications] = useState<TeamNotification[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("thumbstop_team_notifications");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return DEFAULT_NOTIFICATIONS;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("thumbstop_team_notifications", JSON.stringify(notifications));
      } catch {}
    }
  }, [notifications]);

  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [notifActiveTab, setNotifActiveTab] = useState<"inbox" | "compose">("inbox");
  const [notifRecipientId, setNotifRecipientId] = useState<string>("all");
  const [notifSubject, setNotifSubject] = useState<string>("ভিডিও এডিটিং ও রিলস");
  const [notifMessage, setNotifMessage] = useState<string>("");
  const [notifPriority, setNotifPriority] = useState<"urgent" | "normal">("urgent");
  const [notifToast, setNotifToast] = useState<string | null>(null);

  // Sync recipient if switching away from Super Admin
  useEffect(() => {
    if (activeProfileId !== "super_admin" && notifRecipientId === "all") {
      const firstOther = MANAGEMENT_PROFILES.find((p) => p.id !== activeProfileId);
      if (firstOther) setNotifRecipientId(firstOther.id);
    }
  }, [activeProfileId, notifRecipientId]);

  // Filtered notifications for active profile
  const profileNotifications = useMemo(() => {
    return notifications.filter((n) => {
      if (activeProfileId === "super_admin") return true;
      return n.recipientId === "all" || n.recipientId === activeProfileId || n.senderId === activeProfileId;
    });
  }, [notifications, activeProfileId]);

  const unreadCount = useMemo(() => {
    return notifications.filter(
      (n) =>
        !n.isRead &&
        (n.recipientId === "all" || n.recipientId === activeProfileId) &&
        n.senderId !== activeProfileId
    ).length;
  }, [notifications, activeProfileId]);

  const handleSendNotification = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!notifMessage.trim()) return;

    // Strict Rule: Non-super admins can only send to a single specific person manually
    let targetRecipientId = notifRecipientId;
    if (activeProfileId !== "super_admin" && targetRecipientId === "all") {
      const fallback = MANAGEMENT_PROFILES.find((p) => p.id !== activeProfileId);
      targetRecipientId = fallback?.id || "super_admin";
    }

    const recipient =
      targetRecipientId === "all"
        ? { id: "all", name: "Everyone (সকল মেম্বার)" }
        : MANAGEMENT_PROFILES.find((p) => p.id === targetRecipientId) || { id: "all", name: "Everyone" };

    const newNotif: TeamNotification = {
      id: `notif-${Date.now()}`,
      senderId: activeProfile.id,
      senderName: activeProfile.name,
      senderRole: activeProfile.title,
      recipientId: recipient.id,
      recipientName: recipient.name,
      subject: notifSubject || "সাধারণ বার্তা",
      message: notifMessage.trim(),
      timestamp: "এখন মাত্র",
      isRead: false,
      priority: notifPriority,
    };

    setNotifications((prev) => [newNotif, ...prev]);
    setNotifMessage("");
    setNotifToast(`নোটিফিকেশন পাঠানো হয়েছে (${recipient.name} • ${notifSubject})`);
    setTimeout(() => setNotifToast(null), 3500);
    setNotifActiveTab("inbox");
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.recipientId === "all" || n.recipientId === activeProfileId ? { ...n, isRead: true } : n
      )
    );
  };

  const handleDeleteNotif = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Quick Add Modal State
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "client" | "task" | "payment" | "expense" | "employee" | null
  >(null);

  // Quick Add Form inputs
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formServiceId, setFormServiceId] = useState(services[0]?.id || "madrasa-solution");
  const [formAmount, setFormAmount] = useState("");
  const [formMethod, setFormMethod] = useState<"bKash" | "Nagad" | "Rocket" | "Bank Wire">("bKash");
  const [formCategory, setFormCategory] = useState<
    "Salary" | "Software & Cloud" | "Product Purchase" | "Marketing" | "Studio & Gear" | "Other"
  >("Software & Cloud");
  const [formDesc, setFormDesc] = useState("");
  const [formDept, setFormDept] = useState("Web & Tech");
  const [formRole, setFormRole] = useState("Full-Stack Developer");
  const [formEmail, setFormEmail] = useState("");
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");

  // Staff Module Access & Permission Selection State (Onboard Form & Edit Modal)
  const [formAccessModules, setFormAccessModules] = useState<string[]>(["Dashboard", "Tasks", "Clients"]);
  const [formPermissionPreset, setFormPermissionPreset] = useState<string>("custom");
  const [editCredAccessModules, setEditCredAccessModules] = useState<string[]>([]);
  const [editCredPermissionPreset, setEditCredPermissionPreset] = useState<string>("custom");

  // 🛡️ Security Audit & Real-Time Access Logs State (Super Admin Exclusive)
  const [logsFilter, setLogsFilter] = useState<"all" | "auth" | "security" | "finance" | "tasks">("all");
  const [logsSearchQuery, setLogsSearchQuery] = useState("");

  // Staff Credentials & Info Edit Modal State (সুপার অ্যাডমিন কর্তৃক আপডেট)
  const [editingEmployeeCreds, setEditingEmployeeCreds] = useState<EmployeeRecord | null>(null);
  const [editCredUsername, setEditCredUsername] = useState("");
  const [editCredPassword, setEditCredPassword] = useState("");
  const [editCredSalary, setEditCredSalary] = useState<number>(40000);
  const [editCredJoinDate, setEditCredJoinDate] = useState<string>("");
  const [showEditCredPassword, setShowEditCredPassword] = useState(false);
  const [formEmployeeJoinDate, setFormEmployeeJoinDate] = useState("");
  const [viewingSalaryHistoryEmp, setViewingSalaryHistoryEmp] = useState<EmployeeRecord | null>(null);

  // Finance Multi-Filter System State (মাস, খাত, গেটওয়ে ও খরচের ফিল্টার)
  const [financeMonthFilter, setFinanceMonthFilter] = useState<string>("all");
  const [financeSectorFilter, setFinanceSectorFilter] = useState<string>("all");
  const [financeGatewayFilter, setFinanceGatewayFilter] = useState<string>("all");
  const [financeExpenseCategoryFilter, setFinanceExpenseCategoryFilter] = useState<string>("all");

  // Client Progress & Deliverables Checklist Modal State
  const [selectedClientForProgress, setSelectedClientForProgress] = useState<ClientRecord | null>(null);

  // Client Filtering & Sorting State
  const [clientCategoryFilter, setClientCategoryFilter] = useState("all");
  const [clientSortBy, setClientSortBy] = useState<
    "active_first" | "az" | "date_desc" | "progress_asc" | "progress_desc"
  >("active_first");

  // Task & Schedule Filtering State (Clean English Categories: Client Meeting, Studio Session, Urgent Deadline, Agency Work)
  const [taskCategoryFilter, setTaskCategoryFilter] = useState<
    "all" | "client_meeting" | "studio_session" | "urgent_deadline" | "agency_task" | "upcoming"
  >("all");

  // Schedule modal specific inputs
  const [formTaskType, setFormTaskType] = useState<
    "client_meeting" | "studio_session" | "urgent_deadline" | "agency_task"
  >("client_meeting");
  const [formClientName, setFormClientName] = useState("");
  const [formScheduledTime, setFormScheduledTime] = useState("");

  // Client Boosting & Social inputs
  const [formIsBoosting, setFormIsBoosting] = useState(false);
  const [formFacebookPageName, setFormFacebookPageName] = useState("");
  const [formFacebookPageUrl, setFormFacebookPageUrl] = useState("");

  // Finance Timeframe State: "7d" | "28d" | "30d" | "all"
  const [financeTimeframe, setFinanceTimeframe] = useState<"7d" | "28d" | "30d" | "all">("all");

  // Executive Finance Statement Printable Modal State
  const [showFinanceStatementModal, setShowFinanceStatementModal] = useState(false);

  // Live Client Search State for "＋ রেকর্ড পেমেন্ট" Modal
  const [paymentSearchQuery, setPaymentSearchQuery] = useState("");
  const [selectedPaymentClient, setSelectedPaymentClient] = useState<ClientRecord | null>(null);

  // Expense Date State for "＋ খরচ যোগ করুন" Modal
  const [formExpenseDate, setFormExpenseDate] = useState("");

  // Dynamic Live Date string (e.g. 04 Sep 2026)
  const [liveDateFormatted, setLiveDateFormatted] = useState("04 Sep 2026");
  const statementId = useMemo(
    () => `STMT-${(payments.length + expenses.length + 1001).toString().slice(-4)}`,
    [payments.length, expenses.length]
  );

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const formatted = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      setLiveDateFormatted(formatted);
    };
    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  // ⭐️ Live RGB Urgent Headline Control State ⭐️
  const [headlineText, setHeadlineText] = useState(
    siteConfig.urgentHeadline?.text ||
      "জরুরি নোটিশ: সকল ক্লায়েন্ট মিটিং ও শুটিং শিডিউল যথাসময়ে সম্পন্ন করার নির্দেশ দেওয়া হচ্ছে • নতুন অনলাইন মাদ্রাসা পোর্টাল ২.০ আপডেট লাইভ • ২৪/৭ সাপোর্ট চালু আছে"
  );
  const [headlineEnabled, setHeadlineEnabled] = useState(
    siteConfig.urgentHeadline?.enabled ?? true
  );

  const handleSaveHeadline = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateSiteConfig({
      urgentHeadline: {
        enabled: headlineEnabled,
        text: headlineText,
        linkText: "বিস্তারিত দেখুন",
        linkUrl: "/services",
      },
    });
    showToast("✓ জরুরি হেডলাইন সফলভাবে আপডেট হয়েছে এবং ওয়েবসাইটে লাইভ চলছে!");
  };

  // CMS Settings Form state with A-to-Z Website Customization
  const [settingsForm, setSettingsForm] = useState({
    // ⭐️ 1. Social Channels & Gateways (Facebook & WhatsApp Highlighted)
    facebook: siteConfig.socials?.facebook || "https://facebook.com/thumbstopagency",
    whatsappNumber: siteConfig.whatsappNumber || "+8801886900800",
    whatsappDefaultMsg: "Hello ThumbStop, I want to discuss a project",
    whatsappLink: siteConfig.whatsappLink || "https://wa.me/8801886900800?text=Hello%20ThumbStop%2C%20I%20want%20to%20discuss%20a%20project",
    instagram: siteConfig.socials?.instagram || "https://instagram.com/thumbstopagency",
    linkedin: siteConfig.socials?.linkedin || "https://linkedin.com/company/thumbstopagency",
    youtube: siteConfig.socials?.youtube || "https://youtube.com/@thumbstopagency",
    twitter: siteConfig.socials?.twitter || "https://twitter.com/thumbstopagency",

    // ⭐️ 2. Agency Branding & Identity
    name: siteConfig.name,
    taglineEn: siteConfig.taglineEn,
    taglineBn: siteConfig.taglineBn,
    established: siteConfig.established || "2023",
    location: siteConfig.location || "Dhaka, Bangladesh",
    logoUrl: siteConfig.logoUrl || "/images/brand/logo-emblem-transparent.png",
    logoFullUrl: siteConfig.logoFullUrl || "/images/brand/thumbstop-logo.png",
    heroImageUrl: siteConfig.heroImageUrl || "/images/hero-showcase.jpg",

    // ⭐️ 3. Website Theme Colors & Visual Glow Customizer
    themeAccentColor: siteConfig.themeAccentColor || accentColor || "#1FA8CB",
    themeSecondaryColor: siteConfig.themeSecondaryColor || "#2E5FCC",

    // ⭐️ 4. Hero Banner Content & Headlines
    heroHeadlineEn: siteConfig.heroHeadlineEn || "Stop The Scroll. Build Unrivaled Dominance.",
    heroHeadlineBn: siteConfig.heroHeadlineBn || "স্ক্রোল থামান। ব্র্যান্ডের আধিপত্য নিশ্চিত করুন।",
    heroSubtitleEn: siteConfig.heroSubtitleEn || "A premier creative engineering studio delivering high-converting short-form hooks, full-funnel paid traffic architectures, custom Next.js web applications, and mission-critical digital asset restoration.",
    heroSubtitleBn: siteConfig.heroSubtitleBn || "আমরা তৈরি করি প্রিমিয়াম শর্ট-ফর্ম হুকস, পূর্ণাঙ্গ ফানেল ট্রাফিক আর্কিটেকচার, কাস্টম ওয়েব অ্যাপ এবং জটিল ফেসবুক অ্যাসেট রিকভারি।",
    heroCtaTextEn: siteConfig.heroCtaTextEn || "Explore Core Services",
    heroCtaTextBn: siteConfig.heroCtaTextBn || "বিশেষায়িত সেবা দেখুন",
    heroCtaLink: siteConfig.heroCtaLink || "/services",

    // ⭐️ 5. Contact & Headquarters
    phone: siteConfig.phone,
    email: siteConfig.email,
    addressEn: siteConfig.addressEn,
    addressBn: siteConfig.addressBn || "স্যুট ৭বি, গুলশান এভিনিউ, গুলশান ১, ঢাকা-১২১২, বাংলাদেশ",

    // ⭐️ 6. Urgent RGB Notice Ticker
    urgentTickerEnabled: siteConfig.urgentHeadline?.enabled ?? true,
    urgentTickerText: siteConfig.urgentHeadline?.text || "",
    urgentTickerLinkText: siteConfig.urgentHeadline?.linkText || "বিস্তারিত দেখুন",
    urgentTickerLinkUrl: siteConfig.urgentHeadline?.linkUrl || "/admin",

    // ⭐️ 7. Agency Trust Numbers & Metrics
    stat1Value: siteConfig.stats?.[0]?.value || "99.4%",
    stat1LabelEn: siteConfig.stats?.[0]?.labelEn || "Client Satisfaction",
    stat1LabelBn: siteConfig.stats?.[0]?.labelBn || "গ্রাহক সন্তুষ্টি",
    stat1Subtext: siteConfig.stats?.[0]?.subtext || "Across 450+ delivered campaigns",

    stat2Value: siteConfig.stats?.[1]?.value || "8+",
    stat2LabelEn: siteConfig.stats?.[1]?.labelEn || "Core Digital Disciplines",
    stat2LabelBn: siteConfig.stats?.[1]?.labelBn || "বিশেষায়িত ডিজিটাল সেবা",
    stat2Subtext: siteConfig.stats?.[1]?.subtext || "End-to-end creative & tech ecosystem",

    stat3Value: siteConfig.stats?.[2]?.value || "12-24h",
    stat3LabelEn: siteConfig.stats?.[2]?.labelEn || "Turnaround Priority",
    stat3LabelBn: siteConfig.stats?.[2]?.labelBn || "দ্রুততম ডেলিভারি ও রিকোভারি",
    stat3Subtext: siteConfig.stats?.[2]?.subtext || "Rapid execution for time-critical assets",

    stat4Value: siteConfig.stats?.[3]?.value || "3x",
    stat4LabelEn: siteConfig.stats?.[3]?.labelEn || "Higher Hook Retention",
    stat4LabelBn: siteConfig.stats?.[3]?.labelBn || "অধিক হুক রেটেনশন",
    stat4Subtext: siteConfig.stats?.[3]?.subtext || "High-impact thumb-stopping creatives",
  });

  // Direct image file upload handler using FileReader (outputs self-contained Base64 Data URL)
  const handleImageFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("দয়া করে একটি সঠিক ইমেজ ফাইল (.png, .jpg, .svg, .webp) নির্বাচন করুন!");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast("ইমেজ ফাইলের আকার ১০ মেগাবাইট (10MB) এর নিচে হওয়া প্রয়োজন!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onSuccess(result);
        showToast("✓ ছবি সফলভাবে আপলোড ও যুক্ত হয়েছে!");
      }
    };
    reader.onerror = () => {
      showToast("ইমেজ রিড করতে সমস্যা হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন।");
    };
    reader.readAsDataURL(file);
  };

  // 6 Curated Luxury Color Theme Presets
  const COLOR_THEME_PRESETS = [
    {
      name: "Signature Cyan & Deep Azure",
      primary: "#1FA8CB",
      secondary: "#2E5FCC",
      description: "Default ultra-luxury cyber obsidian look with electric cyan accents",
    },
    {
      name: "Emerald Matrix & Mint",
      primary: "#10B981",
      secondary: "#059669",
      description: "High-growth fintech & modern organic aesthetic with vivid green glow",
    },
    {
      name: "Imperial Gold & Warm Amber",
      primary: "#F59E0B",
      secondary: "#D97706",
      description: "Prestige, royal executive agency branding with luminous warm gold",
    },
    {
      name: "Cyber Violet & Neon Indigo",
      primary: "#8B5CF6",
      secondary: "#6366F1",
      description: "Futuristic Web3, high-impact creative studio neon vibe",
    },
    {
      name: "Crimson Ruby & Rose Flame",
      primary: "#EF4444",
      secondary: "#E11D48",
      description: "Bold dynamic marketing agency energy with high click-through hook",
    },
    {
      name: "Cobalt Blue & Electric Sky",
      primary: "#3B82F6",
      secondary: "#1D4ED8",
      description: "Enterprise SaaS, reliable corporate tech & institutional authority",
    },
  ];

  // CMS Service & Theme Editor State
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [previewingService, setPreviewingService] = useState<ServiceItem | null>(null);
  const [serviceForm, setServiceForm] = useState<{
    titleEn: string;
    titleBn: string;
    badge: string;
    themeColor: string;
    startingPrice: string;
    demoVideoUrl: string;
    imageUrl: string;
    shortDescriptionEn: string;
    shortDescriptionBn: string;
    detailedDescriptionEn: string;
    detailedDescriptionBn: string;
    featuresText: string;
    portfolioSamples: PortfolioSample[];
  }>({
    titleEn: "",
    titleBn: "",
    badge: "",
    themeColor: "#1FA8CB",
    startingPrice: "",
    demoVideoUrl: "",
    imageUrl: "",
    shortDescriptionEn: "",
    shortDescriptionBn: "",
    detailedDescriptionEn: "",
    detailedDescriptionBn: "",
    featuresText: "",
    portfolioSamples: [],
  });

  const handleOpenServiceEditor = (svc: ServiceItem) => {
    setEditingService(svc);
    setServiceForm({
      titleEn: svc.titleEn || "",
      titleBn: svc.titleBn || "",
      badge: svc.badge || "",
      themeColor: svc.themeColor || "#1FA8CB",
      startingPrice: svc.startingPrice || "",
      demoVideoUrl: svc.demoVideoUrl || "",
      imageUrl: svc.imageUrl || "",
      shortDescriptionEn: svc.shortDescriptionEn || "",
      shortDescriptionBn: svc.shortDescriptionBn || "",
      detailedDescriptionEn: svc.detailedDescriptionEn || "",
      detailedDescriptionBn: svc.detailedDescriptionBn || "",
      featuresText: (svc.features || []).join("\n"),
      portfolioSamples: svc.portfolioSamples ? [...svc.portfolioSamples] : [],
    });
  };

  // Direct screenshot file upload (HTML file reader)
  const handleScreenshotFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        const dataUrl = loadEvt.target?.result as string;
        if (dataUrl) {
          const cleanTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
          setServiceForm((prev) => ({
            ...prev,
            portfolioSamples: [
              ...prev.portfolioSamples,
              {
                title: cleanTitle,
                imageUrl: dataUrl,
                caption: "Directly uploaded project screenshot",
              },
            ],
          }));
          showToast(`Uploaded screenshot: ${file.name}`);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  // Add custom URL / mockup screenshot
  const handleAddSampleScreenshot = (url: string, title: string) => {
    setServiceForm((prev) => ({
      ...prev,
      portfolioSamples: [
        ...prev.portfolioSamples,
        {
          title,
          imageUrl: url,
          caption: "High-resolution project page showcase",
        },
      ],
    }));
    showToast("Added screenshot to gallery");
  };

  const handleDeleteScreenshot = (index: number) => {
    setServiceForm((prev) => ({
      ...prev,
      portfolioSamples: prev.portfolioSamples.filter((_, i) => i !== index),
    }));
    showToast("Screenshot removed");
  };

  const handleUpdateScreenshot = (index: number, fields: Partial<PortfolioSample>) => {
    setServiceForm((prev) => ({
      ...prev,
      portfolioSamples: prev.portfolioSamples.map((s, i) =>
        i === index ? { ...s, ...fields } : s
      ),
    }));
  };

  const handleSaveServiceEditor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    const featuresList = serviceForm.featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    updateService(editingService.id, {
      titleEn: serviceForm.titleEn,
      titleBn: serviceForm.titleBn,
      badge: serviceForm.badge,
      themeColor: serviceForm.themeColor,
      startingPrice: serviceForm.startingPrice,
      demoVideoUrl: serviceForm.demoVideoUrl,
      imageUrl: serviceForm.imageUrl,
      shortDescriptionEn: serviceForm.shortDescriptionEn,
      shortDescriptionBn: serviceForm.shortDescriptionBn,
      detailedDescriptionEn: serviceForm.detailedDescriptionEn,
      detailedDescriptionBn: serviceForm.detailedDescriptionBn,
      features: featuresList.length > 0 ? featuresList : editingService.features,
      portfolioSamples: serviceForm.portfolioSamples,
    });

    showToast(`Updated "${serviceForm.titleEn}" screenshots, theme & scope!`);
    setEditingService(null);
  };

  // ── Secure Login Handler ──────────────────────────────────────────────────
  // Authentication resolves entirely against the employee records in
  // ContentContext. emp-01 is the Super Admin (full unrestricted access).
  // All other employees get access only to their assigned accessModules.
  // No hardcoded shortcuts, no blank-username bypass, no demo mode.
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = loginUsername.trim().toLowerCase();
    const cleanPass = loginPassword.trim();

    if (!cleanUser && !cleanPass) {
      setAuthError("ইউজারনেম ও পাসওয়ার্ড প্রদান করুন।");
      return;
    }

    // 🌟 Master Super Admin Passcode Support ("9900" or direct login)
    if (
      cleanPass === "9900" ||
      cleanPass === "thumbstop2026" ||
      cleanUser === "9900" ||
      (cleanUser === "admin" && (cleanPass === "9900" || cleanPass === "admin"))
    ) {
      setIsAuthenticated(true);
      setAuthError("");
      setLoggedInStaff(null);
      setActiveProfileId("super_admin");
      addActivityLog({
        user: "Abu Tawfiq (Super Admin)",
        action: "🔑 সুপার অ্যাডমিন মাস্টার পাসকোড দিয়ে সফল লগইন করেছেন",
        module: "System",
        type: "lead",
      });
      showToast("স্বাগতম! Super Admin ফুল অ্যাক্সেস কন্ট্রোল প্যানেল আনলক হয়েছে।");
      return;
    }

    // Single authoritative lookup — matching staff database
    const matchedEmployee = employees.find((emp) => {
      const u = (emp.username || emp.email?.split("@")[0] || "").toLowerCase();
      const em = (emp.email || "").toLowerCase();
      const matchesUser = cleanUser === u || cleanUser === em;
      const matchesPass = cleanPass === (emp.password || "");
      return matchesUser && matchesPass;
    });

    if (!matchedEmployee) {
      setAuthError("ভুল ইউজারনেম বা পাসওয়ার্ড। সঠিক তথ্য দিয়ে পুনরায় চেষ্টা করুন।");
      return;
    }

    const isSuperAdminEmployee = matchedEmployee.id === "emp-01";
    setIsAuthenticated(true);
    setAuthError("");

    // 🛡️ Record Real-Time Login Activity Log
    addActivityLog({
      user: isSuperAdminEmployee ? "Abu Tawfiq (Super Admin)" : `${matchedEmployee.name} (@${cleanUser})`,
      action: isSuperAdminEmployee
        ? "🔑 সুপার অ্যাডমিন সফল লগইন — ফুল কন্ট্রোল সেন্টারে প্রবেশ করেছেন"
        : `🔑 স্টাফ সফল লগইন — [${matchedEmployee.role}] প্যানেলে প্রবেশ করেছেন`,
      module: "System",
      type: "lead",
    });

    if (isSuperAdminEmployee) {
      // Super Admin: unrestricted access to all modules & workspaces
      setLoggedInStaff(null);
      setActiveProfileId("super_admin");
      showToast("স্বাগতম আবু তৌফিক! Super Admin ফুল অ্যাক্সেস কন্ট্রোল প্যানেল আনলক হয়েছে।");
      return;
    }

    // Staff member: access restricted to their assigned accessModules
    setLoggedInStaff(matchedEmployee);

    // Auto-map employee department/role to nearest management profile
    const empRoleLower = (matchedEmployee.role + " " + matchedEmployee.department).toLowerCase();
    let matchedProfileId = "editor_sayed";
    if (
      empRoleLower.includes("dev") ||
      empRoleLower.includes("web") ||
      empRoleLower.includes("tech") ||
      empRoleLower.includes("engineer")
    ) {
      matchedProfileId = "dev_tariqul";
    } else if (
      empRoleLower.includes("art") ||
      empRoleLower.includes("design") ||
      empRoleLower.includes("creative") ||
      empRoleLower.includes("shoot")
    ) {
      matchedProfileId = "designer_nabila";
    } else if (
      empRoleLower.includes("upload") ||
      empRoleLower.includes("content") ||
      empRoleLower.includes("social") ||
      empRoleLower.includes("marketing")
    ) {
      matchedProfileId = "uploader_rafiq";
    } else if (empRoleLower.includes("motion") || empRoleLower.includes("animat")) {
      matchedProfileId = "editor_hasan";
    }
    setActiveProfileId(matchedProfileId);

    // Smart Dynamic Landing Page based on Staff Module Permissions
    const allowed = (matchedEmployee.accessModules || []).map((m) => m.toLowerCase());
    if (allowed.includes("dashboard")) {
      setActivePage("dashboard");
    } else if (allowed.includes("finance") || allowed.includes("payments")) {
      setActivePage("finance");
      setFinanceSubTab("payments");
    } else if (allowed.includes("tasks")) {
      setActivePage("tasks");
    } else if (allowed.includes("clients")) {
      setActivePage("clients");
    } else {
      setActivePage(allowed[0] || "dashboard");
    }
    showToast(`স্বাগতম ${matchedEmployee.name}! (${matchedEmployee.role}) ড্যাশবোর্ডে লগইন সফল।`);
  };

  // Permissions state
  const [selectedRole, setSelectedRole] = useState("Graphic Designer");
  const [rolePermissions, setRolePermissions] = useState<Record<string, Record<string, boolean>>>({
    "Graphic Designer": {
      "View Dashboard": true,
      "View Clients": true,
      "Complete Design Tasks": true,
      "Complete Video Editing": false,
      "Upload Deliverables": false,
      "Manage Finance": false,
    },
    "Video Editor": {
      "View Dashboard": true,
      "View Clients": true,
      "Complete Design Tasks": false,
      "Complete Video Editing": true,
      "Upload Deliverables": false,
      "Manage Finance": false,
    },
    "Uploader / Publisher": {
      "View Dashboard": true,
      "View Clients": true,
      "Complete Design Tasks": false,
      "Complete Video Editing": false,
      "Upload Deliverables": true,
      "Manage Finance": false,
    },
    "Finance Staff": {
      "View Dashboard": true,
      "View Clients": true,
      "Complete Design Tasks": false,
      "Complete Video Editing": false,
      "Upload Deliverables": false,
      "Manage Finance": true,
    },
    "Super Admin": {
      "View Dashboard": true,
      "View Clients": true,
      "Complete Design Tasks": true,
      "Complete Video Editing": true,
      "Upload Deliverables": true,
      "Manage Finance": true,
    },
  });

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Copy Tracker Link
  const copyTrackerLink = (id: string, name: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    const url = `${origin}/track/${id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showToast(`24/7 Live Tracker link copied for ${name}!`);
    } else {
      showToast(`Tracker URL: ${url}`);
    }
  };

  // Send Tracker via WhatsApp
  const sendTrackerViaWhatsApp = (client: any) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    const url = `${origin}/track/${client.id}`;
    const cleanPhone = client.whatsapp.replace(/[^0-9]/g, "");
    const msg = encodeURIComponent(
      `Hello ${client.name}! Here is your 24/7 Live Project Tracking Link from ThumbStop Agency:\n\n${url}\n\nYou can track our progress, milestones, and deliverable handovers anytime in real-time.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, "_blank");
  };

  // 🕌 Bangladesh Prayer Times & 10-Second Luxury Adhan Notification Engine
  const [adhanNotificationEnabled, setAdhanNotificationEnabled] = useState<boolean>(true);
  const [adhanSoundEnabled, setAdhanSoundEnabled] = useState<boolean>(true);
  const [prayerSchedule, setPrayerSchedule] = useState<PrayerSchedule | null>(null);
  const [activeAdhanAlert, setActiveAdhanAlert] = useState<PrayerItem | null>(null);
  const [isPrayerDropdownOpen, setIsPrayerDropdownOpen] = useState<boolean>(false);

  // Hydrate Adhan notification & sound preferences from localStorage
  useEffect(() => {
    try {
      const savedNotif = localStorage.getItem("thumbstop_adhan_notification_enabled");
      if (savedNotif !== null) {
        setAdhanNotificationEnabled(savedNotif === "true");
      }
      const savedSound = localStorage.getItem("thumbstop_adhan_sound_enabled");
      if (savedSound !== null) {
        setAdhanSoundEnabled(savedSound === "true");
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleToggleAdhanNotification = (enabled: boolean) => {
    setAdhanNotificationEnabled(enabled);
    try {
      localStorage.setItem("thumbstop_adhan_notification_enabled", String(enabled));
    } catch {}
    showToast(enabled ? "🕌 আজান নোটিফিকেশন চালু করা হয়েছে" : "আজান নোটিফিকেশন বন্ধ করা হয়েছে");
  };

  const handleToggleAdhanSound = (enabled: boolean) => {
    setAdhanSoundEnabled(enabled);
    try {
      localStorage.setItem("thumbstop_adhan_sound_enabled", String(enabled));
    } catch {}
    showToast(enabled ? "🔊 আজান সাউন্ড এলার্ট চালু করা হয়েছে" : "আজান সাউন্ড এলার্ট মিউট করা হয়েছে");
  };

  // Test Adhan Alert trigger (allows admin to preview the exact 10s modal anytime)
  const handleTestAdhanModal = () => {
    const currentOrNext: PrayerItem = prayerSchedule?.nextPrayer || {
      id: "dhuhr",
      nameEn: "Dhuhr",
      nameBn: "যোহর",
      arabicName: "الظهر",
      time24: "13:05",
      time12: "01:05 PM",
      timestamp: Date.now(),
      isPassed: false,
      isNext: true,
    };
    setActiveAdhanAlert(currentOrNext);
    showToast(`১০ সেকেন্ড আজান নোটিফিকেশন প্রিভিউ চালু হচ্ছে (${currentOrNext.nameBn})`);
  };

  // Automated Bangladesh Prayer Time Tracker & 10-Second Adhan Trigger
  // Strictly runs ONLY when authenticated inside the Management System
  useEffect(() => {
    if (!isAuthenticated) return;

    const updatePrayerAndEvaluateAdhan = () => {
      const schedule = calculateBangladeshPrayerTimes();
      setPrayerSchedule(schedule);

      if (adhanNotificationEnabled) {
        const matchingPrayer = checkCurrentAdhanTime(schedule);
        if (matchingPrayer) {
          const alertKey = `${matchingPrayer.id}_${schedule.dateStr}`;
          const lastAlerted = localStorage.getItem("thumbstop_last_notified_adhan");
          if (lastAlerted !== alertKey) {
            try {
              localStorage.setItem("thumbstop_last_notified_adhan", alertKey);
            } catch {}
            setActiveAdhanAlert(matchingPrayer);
          }
        }
      }
    };

    updatePrayerAndEvaluateAdhan();
    const interval = setInterval(updatePrayerAndEvaluateAdhan, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [isAuthenticated, adhanNotificationEnabled]);

  // 💼 Employee Lifetime Salary & Tenure Helpers
  const getEmployeeLifetimeSalary = (emp: EmployeeRecord) => {
    return salaries
      .filter(
        (s) =>
          (s.employeeId === emp.id || s.employeeName.trim().toLowerCase() === emp.name.trim().toLowerCase()) &&
          s.status === "Paid"
      )
      .reduce((sum, s) => sum + s.amount, 0);
  };

  const getEmployeeTenure = (joinDateStr?: string) => {
    if (!joinDateStr) return "N/A";
    const parsed = new Date(joinDateStr);
    if (isNaN(parsed.getTime())) return joinDateStr;
    const now = new Date("2026-09-10T12:00:00");
    const diffMonths = Math.max(0, (now.getFullYear() - parsed.getFullYear()) * 12 + (now.getMonth() - parsed.getMonth()));
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;
    if (years > 0 && months > 0) return `${years} বছর ${months} মাস`;
    if (years > 0) return `${years} বছর`;
    if (months > 0) return `${months} মাস`;
    return "নতুন যুক্ত (< ১ মাস)";
  };

  // 📊 Available Months, Sectors, Gateways for Dynamic Multi-Filters
  const availableFinanceMonths = useMemo(() => {
    const set = new Set<string>();
    payments.forEach((p) => {
      const parts = p.date.split(" ");
      if (parts.length >= 3) set.add(`${parts[1]} ${parts[2]}`);
    });
    expenses.forEach((e) => {
      const parts = e.date.split(" ");
      if (parts.length >= 3) set.add(`${parts[1]} ${parts[2]}`);
    });
    salaries.forEach((s) => {
      if (s.month) set.add(s.month);
    });
    return Array.from(set).sort((a, b) => {
      const da = new Date(`01 ${a}`);
      const db = new Date(`01 ${b}`);
      return db.getTime() - da.getTime();
    });
  }, [payments, expenses, salaries]);

  const availableFinanceSectors = useMemo(() => {
    const set = new Set<string>();
    payments.forEach((p) => {
      if (p.serviceName) set.add(p.serviceName);
    });
    services.forEach((s) => {
      if (s.titleEn) set.add(s.titleEn);
    });
    return Array.from(set).sort();
  }, [payments, services]);

  // Derived financial metrics with dynamic multi-filter system
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      // 1. Month Filter
      if (financeMonthFilter !== "all") {
        const parts = p.date.split(" ");
        const pMonth = parts.length >= 3 ? `${parts[1]} ${parts[2]}` : "";
        if (pMonth !== financeMonthFilter) return false;
      }
      // 2. Sector / Category Filter
      if (financeSectorFilter !== "all") {
        if (p.serviceName !== financeSectorFilter) return false;
      }
      // 3. Payment Gateway Filter
      if (financeGatewayFilter !== "all") {
        if (p.method !== financeGatewayFilter) return false;
      }
      // 4. Quick Timeframe Filter (when month filter is all)
      if (financeMonthFilter === "all" && financeTimeframe !== "all") {
        const days = financeTimeframe === "7d" ? 7 : financeTimeframe === "28d" ? 28 : 30;
        const refDate = new Date("2026-09-10T23:59:59");
        const cutoffTime = refDate.getTime() - days * 24 * 60 * 60 * 1000;
        const pDate = new Date(p.date);
        if (!isNaN(pDate.getTime()) && pDate.getTime() < cutoffTime) return false;
      }
      return true;
    });
  }, [payments, financeMonthFilter, financeSectorFilter, financeGatewayFilter, financeTimeframe]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      // 1. Month Filter
      if (financeMonthFilter !== "all") {
        const parts = e.date.split(" ");
        const eMonth = parts.length >= 3 ? `${parts[1]} ${parts[2]}` : "";
        if (eMonth !== financeMonthFilter) return false;
      }
      // 2. Expense Category Filter
      if (financeExpenseCategoryFilter !== "all") {
        if (e.category !== financeExpenseCategoryFilter) return false;
      }
      // 3. Payment Gateway Filter
      if (financeGatewayFilter !== "all") {
        if (e.paymentMethod !== financeGatewayFilter) return false;
      }
      // 4. Quick Timeframe Filter (when month filter is all)
      if (financeMonthFilter === "all" && financeTimeframe !== "all") {
        const days = financeTimeframe === "7d" ? 7 : financeTimeframe === "28d" ? 28 : 30;
        const refDate = new Date("2026-09-10T23:59:59");
        const cutoffTime = refDate.getTime() - days * 24 * 60 * 60 * 1000;
        const eDate = new Date(e.date);
        if (!isNaN(eDate.getTime()) && eDate.getTime() < cutoffTime) return false;
      }
      return true;
    });
  }, [expenses, financeMonthFilter, financeExpenseCategoryFilter, financeGatewayFilter, financeTimeframe]);

  const totalRevenue = useMemo(() => filteredPayments.reduce((acc, p) => acc + p.amount, 0), [filteredPayments]);
  const totalExpenses = useMemo(() => filteredExpenses.reduce((acc, e) => acc + e.amount, 0), [filteredExpenses]);
  const netProfit = totalRevenue - totalExpenses;
  const isDeficit = netProfit < 0;

  // 🎯 Sector Breakdown Calculation (কোন খাত থেকে কত টাকা আয় হয়েছে)
  const sectorBreakdown = useMemo(() => {
    const map: Record<string, { count: number; total: number }> = {};
    filteredPayments.forEach((p) => {
      const sec = p.serviceName || "Other Solutions";
      if (!map[sec]) map[sec] = { count: 0, total: 0 };
      map[sec].count += 1;
      map[sec].total += p.amount;
    });
    return Object.entries(map)
      .map(([sector, data]) => ({
        sector,
        count: data.count,
        total: data.total,
        percentage: totalRevenue > 0 ? Math.round((data.total / totalRevenue) * 100) : 0,
      }))
      .sort((a, b) => b.total - a.total);
  }, [filteredPayments, totalRevenue]);

  // 🗓️ Monthly Income vs Expense Ledger Analytics
  const monthlyAnalytics = useMemo(() => {
    const monthsMap: Record<string, { income: number; expense: number; txCount: number }> = {};
    payments.forEach((p) => {
      const parts = p.date.split(" ");
      const m = parts.length >= 3 ? `${parts[1]} ${parts[2]}` : "Sep 2026";
      if (!monthsMap[m]) monthsMap[m] = { income: 0, expense: 0, txCount: 0 };
      monthsMap[m].income += p.amount;
      monthsMap[m].txCount += 1;
    });
    expenses.forEach((e) => {
      const parts = e.date.split(" ");
      const m = parts.length >= 3 ? `${parts[1]} ${parts[2]}` : "Sep 2026";
      if (!monthsMap[m]) monthsMap[m] = { income: 0, expense: 0, txCount: 0 };
      monthsMap[m].expense += e.amount;
      monthsMap[m].txCount += 1;
    });

    return Object.entries(monthsMap)
      .map(([month, data]) => {
        const net = data.income - data.expense;
        const margin = data.income > 0 ? Math.round((net / data.income) * 100) : 0;
        return {
          month,
          income: data.income,
          expense: data.expense,
          net,
          margin,
          isDeficit: net < 0,
          txCount: data.txCount,
        };
      })
      .sort((a, b) => {
        const da = new Date(`01 ${a.month}`);
        const db = new Date(`01 ${b.month}`);
        return db.getTime() - da.getTime();
      });
  }, [payments, expenses]);

  const activeClientsCount = useMemo(() => clients.filter((c) => c.status === "active").length, [clients]);
  const pendingClientsCount = useMemo(() => clients.filter((c) => c.status === "pending").length, [clients]);
  const completedClientsCount = useMemo(() => clients.filter((c) => c.status === "completed").length, [clients]);

  // Handle Quick Add Submit
  const handleQuickAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chosenService = services.find((s) => s.id === formServiceId);
    const serviceTitle = chosenService ? chosenService.titleEn : "Custom Solution";

    if (modalType === "client") {
      const numAmount = parseInt(formAmount) || 30000;
      addClient({
        name: formName || "New Client",
        company: formDesc || "Private Client",
        serviceId: formServiceId,
        serviceName: serviceTitle,
        phone: formPhone || "+880 1700-000000",
        whatsapp: formPhone || "+880 1700-000000",
        paymentMethod: formMethod,
        totalAmount: numAmount,
        paidAmount: Math.round(numAmount * 0.5),
        dueAmount: Math.round(numAmount * 0.5),
        progress: 15,
        status: "active",
        notes: formDesc,
        isBoosting: formIsBoosting,
        facebookPageName: formFacebookPageName,
        facebookPageUrl: formFacebookPageUrl,
      });
      showToast(`Client ${formName} added! Tracking link ready.`);
    } else if (modalType === "task") {
      const defaultTitle =
        formTaskType === "client_meeting"
          ? "Client Meeting"
          : formTaskType === "studio_session"
          ? "Studio Session"
          : formTaskType === "urgent_deadline"
          ? "Urgent Deadline"
          : "Agency Work";

      addTask({
        title: formName || defaultTitle,
        clientName: formClientName || formDesc || "Agency Client",
        serviceId: formServiceId,
        serviceName: serviceTitle,
        assignedTo: formRole || actingName || "Lead Specialist",
        department: formDept,
        taskType: formTaskType,
        scheduledTime: formScheduledTime || "Today",
        location: "ThumbStop Creative Studio",
        notes: formDesc || "",
        currentStage:
          formTaskType === "client_meeting"
            ? "Client Meeting"
            : formTaskType === "studio_session"
            ? "Studio Production"
            : "Execution",
        progress: 0,
        status: "in_progress",
        deadline: formScheduledTime || "TBD",
        stages: [],
      });
      showToast(`শিডিউল / টাস্ক "${formName || defaultTitle}" সফলভাবে যুক্ত হয়েছে!`);
    } else if (modalType === "payment") {
      const numAmount = parseInt(formAmount) || 20000;
      const clientName = selectedPaymentClient?.name || formName || "Valued Client";
      const chosenService = selectedPaymentClient?.serviceName || serviceTitle;
      addPayment({
        clientName: clientName,
        serviceName: chosenService,
        method: formMethod,
        amount: numAmount,
        transactionId: `TX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        status: "Paid",
      });

      if (selectedPaymentClient) {
        const newPaid = (selectedPaymentClient.paidAmount || 0) + numAmount;
        const newDue = Math.max(0, (selectedPaymentClient.totalAmount || 0) - newPaid);
        updateClient(selectedPaymentClient.id, {
          paidAmount: newPaid,
          dueAmount: newDue,
        });
        showToast(`পেমেন্ট ৳${numAmount.toLocaleString()} রেকর্ড হয়েছে! ক্লায়েন্টের বর্তমান বকেয়া: ৳${newDue.toLocaleString()}`);
      } else {
        showToast(`পেমেন্ট ৳${numAmount.toLocaleString()} সফলভাবে রেকর্ড হয়েছে!`);
      }
    } else if (modalType === "expense") {
      const numAmount = parseInt(formAmount) || 5000;
      const expDate = formExpenseDate.trim() || liveDateFormatted;
      addExpense({
        category: formCategory,
        description: formDesc || formName || "Agency Operation Cost",
        amount: numAmount,
        paymentMethod: formMethod === "Bank Wire" ? "Bank Wire" : "bKash Merchant",
        date: expDate,
      });
      showToast(`খরচ ৳${numAmount.toLocaleString()} (${expDate}) সফলভাবে রেকর্ড হয়েছে!`);
    } else if (modalType === "employee") {
      const generatedUser =
        formUsername.trim().toLowerCase() ||
        (formEmail ? formEmail.split("@")[0] : (formName || "staff").toLowerCase().replace(/[^a-z0-9]/g, "_").slice(0, 10));
      const generatedPass = formPassword.trim() || Math.random().toString(36).slice(-8);

      addEmployee({
        name: formName || "New Team Member",
        email: formEmail || `${generatedUser}@thumbstop.agency`,
        department: formDept,
        role: formRole,
        salary: parseInt(formAmount) || 40000,
        joinDate: formEmployeeJoinDate.trim() || liveDateFormatted,
        status: "active",
        accessModules: formAccessModules && formAccessModules.length > 0 ? formAccessModules : ["Dashboard"],
        notes: formDesc,
        username: generatedUser,
        password: generatedPass,
      });
      showToast(`স্টাফ সদস্য ${formName || ""} অনবোর্ড সম্পন্ন! ইউজারনেম: @${generatedUser}`);
    }

    setModalType(null);
    setPaymentSearchQuery("");
    setSelectedPaymentClient(null);
    setFormExpenseDate("");
    setFormName("");
    setFormPhone("");
    setFormAmount("");
    setFormDesc("");
    setFormClientName("");
    setFormScheduledTime("");
    setFormIsBoosting(false);
    setFormFacebookPageName("");
    setFormFacebookPageUrl("");
    setFormUsername("");
    setFormPassword("");
    setFormEmployeeJoinDate("");
  };

  // Handler for toggling a stage within the client progress modal
  const handleClientStageToggle = (stageIdx: number) => {
    if (!selectedClientForProgress) return;

    // Get existing stages or initialize from MADRASA_DEFAULT_STAGES if madrasa solution
    const currentStages: TaskStage[] =
      selectedClientForProgress.stages && selectedClientForProgress.stages.length > 0
        ? [...selectedClientForProgress.stages]
        : selectedClientForProgress.serviceId === "madrasa-solution"
        ? JSON.parse(JSON.stringify(MADRASA_DEFAULT_STAGES))
        : [
            { name: "Project Kickoff & Requirements", percentage: 25, isDone: selectedClientForProgress.progress >= 25, assignedRole: "all" },
            { name: "Production & Asset Creation", percentage: 25, isDone: selectedClientForProgress.progress >= 50, assignedRole: "all" },
            { name: "Client Feedback & Revisions", percentage: 25, isDone: selectedClientForProgress.progress >= 75, assignedRole: "all" },
            { name: "Final Handover & Delivery", percentage: 25, isDone: selectedClientForProgress.progress >= 100, assignedRole: "all" },
          ];

    const targetStage = currentStages[stageIdx];
    if (!targetStage) return;

    const willBeDone = !targetStage.isDone;
    currentStages[stageIdx] = {
      ...targetStage,
      isDone: willBeDone,
      completedBy: willBeDone ? `${actingName} (${actingRole})` : undefined,
      completedAt: willBeDone
        ? new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
        : undefined,
    };

    const doneCount = currentStages.filter((s) => s.isDone).length;
    const newProgress = Math.round((doneCount / currentStages.length) * 100);
    const newStatus = newProgress === 100 ? "completed" : "active";

    const updatedClient: ClientRecord = {
      ...selectedClientForProgress,
      stages: currentStages,
      progress: newProgress,
      status: newStatus as any,
    };

    setSelectedClientForProgress(updatedClient);
    updateClient(selectedClientForProgress.id, {
      stages: currentStages,
      progress: newProgress,
      status: newStatus as any,
    });

    // Also sync matching task if any
    const matchingTask = tasks.find(
      (t) => t.clientId === selectedClientForProgress.id || t.clientName === selectedClientForProgress.name
    );
    if (matchingTask) {
      updateTask(matchingTask.id, {
        stages: currentStages,
        progress: newProgress,
        status: newProgress === 100 ? "completed" : "in_progress",
      });
    }

    showToast(
      `✓ "${targetStage.name}" ${willBeDone ? "সম্পন্ন হিসেবে চিহ্নিত" : "পুনরায় খোলা হয়েছে"} (অগ্রগতি: ${newProgress}%)`
    );
  };

  // Handler for setting direct percentage
  const handleSetDirectProgress = (pct: number) => {
    if (!selectedClientForProgress) return;
    const clamped = Math.max(0, Math.min(100, pct));
    const newStatus = clamped === 100 ? "completed" : "active";

    const updatedClient: ClientRecord = {
      ...selectedClientForProgress,
      progress: clamped,
      status: newStatus as any,
    };

    setSelectedClientForProgress(updatedClient);
    updateClient(selectedClientForProgress.id, {
      progress: clamped,
      status: newStatus as any,
    });

    // Also sync matching task if any
    const matchingTask = tasks.find(
      (t) => t.clientId === selectedClientForProgress.id || t.clientName === selectedClientForProgress.name
    );
    if (matchingTask) {
      updateTask(matchingTask.id, {
        progress: clamped,
        status: clamped === 100 ? "completed" : "in_progress",
      });
    }

    showToast(`✓ ক্লায়েন্ট প্রোগ্রেস সেট করা হয়েছে: ${clamped}%`);
  };

  // Save CMS Settings (Full Super Admin Website Sync)
  const handleSaveSettings = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanWhatsApp = settingsForm.whatsappNumber.replace(/[^0-9]/g, "");
    const generatedWaLink =
      settingsForm.whatsappLink ||
      `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
        settingsForm.whatsappDefaultMsg || "Hello ThumbStop, I want to discuss a project"
      )}`;

    updateSiteConfig({
      name: settingsForm.name,
      taglineEn: settingsForm.taglineEn,
      taglineBn: settingsForm.taglineBn,
      established: settingsForm.established,
      location: settingsForm.location,
      logoUrl: settingsForm.logoUrl,
      logoFullUrl: settingsForm.logoFullUrl,
      heroImageUrl: settingsForm.heroImageUrl,
      themeAccentColor: settingsForm.themeAccentColor,
      themeSecondaryColor: settingsForm.themeSecondaryColor,
      heroHeadlineEn: settingsForm.heroHeadlineEn,
      heroHeadlineBn: settingsForm.heroHeadlineBn,
      heroSubtitleEn: settingsForm.heroSubtitleEn,
      heroSubtitleBn: settingsForm.heroSubtitleBn,
      heroCtaTextEn: settingsForm.heroCtaTextEn,
      heroCtaTextBn: settingsForm.heroCtaTextBn,
      heroCtaLink: settingsForm.heroCtaLink,
      phone: settingsForm.phone,
      email: settingsForm.email,
      addressEn: settingsForm.addressEn,
      addressBn: settingsForm.addressBn,
      whatsappNumber: settingsForm.whatsappNumber,
      whatsappLink: generatedWaLink,
      socials: {
        facebook: settingsForm.facebook,
        instagram: settingsForm.instagram,
        linkedin: settingsForm.linkedin,
        youtube: settingsForm.youtube,
        twitter: settingsForm.twitter,
      },
      urgentHeadline: {
        enabled: settingsForm.urgentTickerEnabled,
        text: settingsForm.urgentTickerText,
        linkText: settingsForm.urgentTickerLinkText,
        linkUrl: settingsForm.urgentTickerLinkUrl,
      },
      stats: [
        {
          value: settingsForm.stat1Value,
          labelEn: settingsForm.stat1LabelEn,
          labelBn: settingsForm.stat1LabelBn,
          subtext: settingsForm.stat1Subtext,
        },
        {
          value: settingsForm.stat2Value,
          labelEn: settingsForm.stat2LabelEn,
          labelBn: settingsForm.stat2LabelBn,
          subtext: settingsForm.stat2Subtext,
        },
        {
          value: settingsForm.stat3Value,
          labelEn: settingsForm.stat3LabelEn,
          labelBn: settingsForm.stat3LabelBn,
          subtext: settingsForm.stat3Subtext,
        },
        {
          value: settingsForm.stat4Value,
          labelEn: settingsForm.stat4LabelEn,
          labelBn: settingsForm.stat4LabelBn,
          subtext: settingsForm.stat4Subtext,
        },
      ],
    });
    if (setAccentColor && settingsForm.themeAccentColor) {
      setAccentColor(settingsForm.themeAccentColor);
    }
    showToast("✓ ওয়েবসাইট সিএমএস সেটিংস ও থিম কালার সফলভাবে সেভ ও লাইভ আপডেট হয়েছে!");
  };

  // Toggle permission switch
  const togglePermission = (role: string, perm: string) => {
    setRolePermissions((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [perm]: !prev[role]?.[perm],
      },
    }));
  };

  // Filter and sort clients
  const filteredClients = useMemo(() => {
    return clients
      .filter((c) => {
        const query = searchQuery.toLowerCase().trim();
        const matchSearch =
          !query ||
          c.name.toLowerCase().includes(query) ||
          c.serviceName.toLowerCase().includes(query) ||
          c.phone.includes(query) ||
          (c.clientCode && c.clientCode.toLowerCase().includes(query));

        if (!matchSearch) return false;

        if (clientCategoryFilter !== "all" && c.serviceId !== clientCategoryFilter) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (clientSortBy === "active_first") {
          // Ongoing / in_progress first, completed at the bottom
          const aActive = a.status !== "completed";
          const bActive = b.status !== "completed";
          if (aActive && !bActive) return -1;
          if (!aActive && bActive) return 1;
          return a.progress - b.progress;
        }
        if (clientSortBy === "az") {
          return a.name.localeCompare(b.name);
        }
        if (clientSortBy === "date_desc") {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        if (clientSortBy === "progress_asc") {
          return a.progress - b.progress;
        }
        if (clientSortBy === "progress_desc") {
          return b.progress - a.progress;
        }
        return 0;
      });
  }, [clients, searchQuery, clientCategoryFilter, clientSortBy]);

  // Filter and sort tasks & schedules
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((t) => {
        const query = searchQuery.toLowerCase().trim();
        const matchSearch =
          !query ||
          t.title.toLowerCase().includes(query) ||
          t.clientName.toLowerCase().includes(query) ||
          (t.serviceName && t.serviceName.toLowerCase().includes(query)) ||
          (t.location && t.location.toLowerCase().includes(query)) ||
          (t.notes && t.notes.toLowerCase().includes(query));

        if (!matchSearch) return false;

        if (taskCategoryFilter === "all") return true;
        if (taskCategoryFilter === "upcoming") {
          return t.status !== "completed";
        }
        if (taskCategoryFilter === "client_meeting") {
          return t.taskType === "client_meeting" || t.taskType === "client_visit";
        }
        if (taskCategoryFilter === "studio_session") {
          return t.taskType === "studio_session" || t.taskType === "video_shoot";
        }
        if (taskCategoryFilter === "urgent_deadline") {
          return t.taskType === "urgent_deadline";
        }
        if (taskCategoryFilter === "agency_task") {
          return t.taskType === "agency_task" || t.taskType === "internal_todo" || !t.taskType;
        }
        return t.taskType === taskCategoryFilter;
      })
      .sort((a, b) => {
        const aActive = a.status !== "completed";
        const bActive = b.status !== "completed";
        if (aActive && !bActive) return -1;
        if (!aActive && bActive) return 1;
        return 0;
      });
  }, [tasks, searchQuery, taskCategoryFilter]);

  // Activity logs filter
  const filteredActivityLogs = useMemo(() => {
    return activityLogs.filter((log) => {
      if (logsFilter === "auth") {
        const act = log.action.toLowerCase();
        const isAuth =
          act.includes("লগইন") ||
          act.includes("লগআউট") ||
          act.includes("login") ||
          act.includes("logout") ||
          act.includes("পাসওয়ার্ড") ||
          act.includes("ক্রেডেনশিয়াল") ||
          log.module === "System";
        if (!isAuth) return false;
      } else if (logsFilter === "security") {
        const act = log.action.toLowerCase();
        const isSec =
          log.module === "Employees" ||
          act.includes("পারমিশন") ||
          act.includes("অনবোর্ড") ||
          act.includes("রোল") ||
          act.includes("অ্যাক্সেস");
        if (!isSec) return false;
      } else if (logsFilter === "finance") {
        if (log.module !== "Finance") return false;
      } else if (logsFilter === "tasks") {
        if (log.module !== "Tasks" && log.module !== "Clients") return false;
      }

      if (logsSearchQuery.trim()) {
        const q = logsSearchQuery.toLowerCase();
        return (
          log.user.toLowerCase().includes(q) ||
          log.action.toLowerCase().includes(q) ||
          log.module.toLowerCase().includes(q) ||
          log.time.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activityLogs, logsFilter, logsSearchQuery]);

  // Lock screen (Staff & Super Admin Authentication Portal)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050914] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#1FA8CB]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#2E5FCC]/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-md w-full relative z-10 p-6 sm:p-8 rounded-3xl bg-[#091122]/95 border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-2xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1FA8CB] to-[#2E5FCC] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#1FA8CB]/20 border border-cyan-400/30">
            <span className="text-xl font-black text-white tracking-wider">TS</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
            Welcome to ThumbStop
          </h1>
          <p className="text-xs text-slate-400 mb-6">
            ম্যানেজমেন্ট কন্ট্রোল সেন্টারে প্রবেশ করতে আপনার তথ্য দিন
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left" style={{ isolation: "isolate" }}>
            {/* Username */}
            <div>
              <label className="text-[11px] font-semibold text-slate-200 block mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>ইউজারনেম বা ইমেইল (Username / Email)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="ইউজারনেম বা ইমেইল লিখুন"
                  className="w-full pl-4 pr-10 py-3.5 rounded-xl bg-[#0B1528] border border-slate-700/90 text-white placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-cyan-400 focus:bg-[#0E1A33] focus:ring-2 focus:ring-cyan-500/25 shadow-inner transition-all"
                  style={{
                    colorScheme: "dark",
                    WebkitTextFillColor: "#ffffff",
                    WebkitFontSmoothing: "antialiased",
                  }}
                  autoFocus
                />
                <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-semibold text-slate-200 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>পাসওয়ার্ড (Password)</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors font-semibold flex items-center gap-1 cursor-pointer"
                >
                  {showLoginPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showLoginPassword ? "পাসওয়ার্ড লুকান (Hide)" : "পাসওয়ার্ড দেখুন (Show)"}</span>
                </button>
              </div>

              <div className="relative">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="পাসওয়ার্ড লিখুন"
                  className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-[#0B1528] border border-slate-700/90 text-white placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-cyan-400 focus:bg-[#0E1A33] focus:ring-2 focus:ring-cyan-500/25 shadow-inner transition-all font-mono"
                  style={{
                    colorScheme: "dark",
                    WebkitTextFillColor: "#ffffff",
                    WebkitFontSmoothing: "antialiased",
                    letterSpacing: showLoginPassword ? "0.05em" : "0.2em",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title={showLoginPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4 text-cyan-400" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-xl text-center font-medium">
                {authError}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1FA8CB] via-[#2463d4] to-[#2E5FCC] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#1FA8CB]/20 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>লগইন করুন (Login to Management)</span>
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
            <span>ThumbStop Agency ERP</span>
            <Link href="/" className="hover:text-cyan-400 transition-colors">
              Return to Website ↗
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${theme.bg} ${theme.textMain} flex flex-col font-sans transition-colors duration-300 relative overflow-hidden`}
      style={{ colorScheme: isDark ? "dark" : "light" }}
    >
      {/* 🌌 Ultra-Luxury Peaceful & Calming Ambient Glow Lighting (প্রশান্তিময় লাক্সারি ব্যাকগ্রাউন্ড) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[650px] h-[650px] bg-cyan-500/[0.035] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/3 -right-48 w-[600px] h-[600px] bg-blue-600/[0.03] rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute -bottom-48 left-1/3 w-[700px] h-[700px] bg-emerald-500/[0.025] rounded-full blur-[170px] pointer-events-none" />
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-[#10223D] text-white text-xs font-medium border border-cyan-500/40 shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-1 relative min-h-screen">
        {/* ========================================================================
            SIDEBAR (Cleanly divided into Operations vs Website CMS)
           ======================================================================== */}
        <aside
          className={`fixed top-0 bottom-0 left-0 z-40 w-[252px] ${
            isDark ? "bg-[#060D1A]" : "bg-[#08182D]"
          } text-white border-r border-white/5 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Brand Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 p-1 flex items-center justify-center shadow-md">
                <img
                  src="/images/brand/logo-emblem-transparent.png"
                  alt="ThumbStop Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="font-bold text-sm tracking-tight text-white leading-none">
                  <span className="text-[#00AEEF]">T</span>humb<span className="text-[#2B6CB0]">S</span>top
                </div>
                <div className="text-[10px] text-cyan-300/80 uppercase tracking-wider font-mono mt-0.5">Control Panel</div>
              </div>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Master Workspace Switcher (Operations ERP vs Website CMS) */}
          <div className="p-3 border-b border-white/10">
            <div className={`grid ${isSuperAdmin ? "grid-cols-2" : "grid-cols-1"} p-1 rounded-xl bg-black/40 border border-white/5 text-[11px] font-semibold`}>
              <button
                onClick={() => {
                  setWorkspaceMode("operations");
                  setMobileMenuOpen(false);
                }}
                className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  workspaceMode === "operations"
                    ? "bg-[#1E5BC4] text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Operations</span>
              </button>
              {isSuperAdmin && (
                <button
                  onClick={() => {
                    setWorkspaceMode("cms");
                    setMobileMenuOpen(false);
                  }}
                  className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    workspaceMode === "cms"
                      ? "bg-purple-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Website CMS</span>
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links Area */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 custom-scrollbar">
            {/* 1. OPERATIONS WORKSPACE */}
            {workspaceMode === "operations" && (
              <>
                {canAccessModule("Dashboard") && (
                  <div>
                    <button
                      onClick={() => {
                        setActivePage("dashboard");
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        activePage === "dashboard"
                          ? "bg-[#1E5BC4] text-white shadow-lg shadow-[#1E5BC4]/30"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <LayoutDashboard className="w-4 h-4 opacity-90" />
                      <span>Dashboard</span>
                    </button>
                  </div>
                )}

                {/* Operations Section */}
                {(canAccessModule("Tasks") || canAccessModule("Clients") || canAccessModule("Employees") || canAccessModule("Departments")) && (
                  <div className="space-y-1">
                    <div className="px-3 text-[10px] uppercase font-bold tracking-wider text-slate-400/80 mb-1">
                      Client & Tasks Management
                    </div>
                    {[
                      { id: "tasks", label: "Tasks & Live Pipeline", icon: CheckSquare, badge: tasks.filter((t) => t.status === "in_progress").length, module: "Tasks" },
                      { id: "clients", label: "Clients & Live Trackers", icon: Users, badge: clients.filter((c) => c.isLead).length, module: "Clients" },
                      { id: "employees", label: "Team & Staff", icon: UserCheck, module: "Employees" },
                      { id: "departments", label: "Departments", icon: Building, module: "Departments" },
                    ]
                      .filter((item) => canAccessModule(item.module))
                      .map((item) => {
                        const Icon = item.icon;
                        const isActive = activePage === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setActivePage(item.id);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                              isActive
                                ? "bg-[#1E5BC4] text-white shadow-lg shadow-[#1E5BC4]/30"
                                : "text-slate-300 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="w-4 h-4 opacity-80" />
                              <span>{item.label}</span>
                            </div>
                            {item.badge ? (
                              <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-cyan-400 text-slate-950">
                                {item.badge}
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                  </div>
                )}

                {/* ⭐️ Finance Department (সুপার অ্যাডমিন ও অনুমোদিত ফাইন্যান্স স্টাফদের জন্য) ⭐️ */}
                {hasAnyFinanceAccess && (
                  <div className="space-y-1">
                    <div className="px-3 text-[10px] uppercase font-bold tracking-wider text-emerald-400 flex items-center justify-between mb-1">
                      <span>Finance & Accounts</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5 text-emerald-300" />
                        <span>Confidential</span>
                      </span>
                    </div>
                    {[
                      { id: "finance", label: "Finance Dept (টাকার হিসাব)", icon: Receipt, badge: `৳${(netProfit / 1000).toFixed(0)}k`, module: "Finance" },
                      { id: "payments", label: "Client Payments (৳)", icon: Coins, module: "Payments" },
                      { id: "expenses", label: "Agency Expenses (৳)", icon: CreditCard, module: "Expenses" },
                      { id: "salary", label: "Salary Payroll", icon: Wallet, module: "Salary" },
                      { id: "reports", label: "Financial P&L Report", icon: BarChart3, module: "Reports" },
                    ]
                      .filter((item) => canAccessModule(item.module) || canAccessModule("Finance"))
                      .map((item) => {
                        const Icon = item.icon;
                        const isActive =
                          activePage === item.id ||
                          (item.id === "finance" && ["payments", "expenses", "salary", "reports"].includes(activePage));
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setActivePage(item.id);
                              if (item.id === "finance") setFinanceSubTab("payments");
                              else if (item.id === "payments") setFinanceSubTab("payments");
                              else if (item.id === "expenses") setFinanceSubTab("expenses");
                              else if (item.id === "salary") setFinanceSubTab("salary");
                              else if (item.id === "reports") setFinanceSubTab("reports");
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                              isActive
                                ? "bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-600/30 font-semibold"
                                : "text-slate-300 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="w-4 h-4 opacity-80" />
                              <span>{item.label}</span>
                            </div>
                            {item.badge && (
                              <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded-full bg-emerald-400 text-slate-950">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                  </div>
                )}

                {/* Security, Permissions & Workflow */}
                {(isSuperAdmin || canAccessModule("Workflow")) && (
                  <div className="space-y-1">
                    <div className="px-3 text-[10px] uppercase font-bold tracking-wider text-slate-400/80 mb-1">
                      {isSuperAdmin ? "Security & Logs" : "Workflow Config"}
                    </div>
                    {[
                      ...(isSuperAdmin ? [{ id: "permissions", label: "Roles & Permissions", icon: ShieldCheck, isSA: true }] : []),
                      { id: "workflow", label: "Workflow Stage Config", icon: GitBranch, isSA: false },
                      { id: "settings", label: "Management Theme & Settings", icon: Settings, isSA: false, badge: "10 Themes" },
                      ...(isSuperAdmin ? [{ id: "logs", label: "Real-Time Activity Logs", icon: Clock, isSA: true }] : []),
                    ]
                      .filter((item) => item.id === "settings" ? true : item.isSA ? isSuperAdmin : canAccessModule("Workflow"))
                      .map((item) => {
                        const Icon = item.icon;
                        const isActive = activePage === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setActivePage(item.id);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                              isActive
                                ? "bg-[#1E5BC4] text-white shadow-lg shadow-[#1E5BC4]/30"
                                : "text-slate-300 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <Icon className="w-4 h-4 opacity-80" />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                  </div>
                )}
              </>
            )}

            {/* 2. WEBSITE CMS WORKSPACE (SUPER ADMIN ISOLATED) */}
            {workspaceMode === "cms" && (
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-950/60 to-indigo-950/40 border border-purple-500/30 text-xs text-purple-200 shadow-md">
                  <div className="font-bold flex items-center justify-between gap-1.5 mb-1 text-purple-300">
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-purple-400" />
                      <span>Website CMS Portal</span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-purple-500/30 text-purple-200 border border-purple-400/30">
                      SUPER ADMIN
                    </span>
                  </div>
                  <p className="text-[10px] text-purple-300/80 leading-relaxed">
                    পুঙ্খানুপুঙ্খ ওয়েবসাইট নিয়ন্ত্রণ: ফেসবুক, হোয়াটসঅ্যাপ, ব্র্যান্ডিং, প্রাইসিং ও ব্যানার।
                  </p>
                </div>

                <div className="space-y-1 pt-1">
                  {[
                    { id: "hero", label: "Home Picture & Hero Banner", icon: ImageIcon, badge: "Home Asset" },
                    { id: "branding", label: "Logo & Brand Identity", icon: Sliders, badge: "Upload" },
                    { id: "colors", label: "Website Theme Colors", icon: Palette, badge: "Live Glow" },
                    { id: "socials", label: "Facebook & WhatsApp", icon: Share2, badge: "Priority" },
                    { id: "services", label: "8 Services & Pricing", icon: Briefcase },
                    { id: "contact", label: "Office & Contact Info", icon: Phone },
                    { id: "ticker", label: "Urgent Notice Ticker", icon: Bell },
                    { id: "stats", label: "Agency Trust Numbers", icon: BarChart3 },
                    { id: "data", label: "Backup & JSON Restore", icon: Download },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isActive = cmsPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setCmsPage(item.id as any);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 font-semibold"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className="w-4 h-4 opacity-80 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ⭐️ ULTRA-PREMIUM USER PROFILE FOOTER & NOTIFICATION DOCK (স্বাভাবিক প্রিমিয়াম অ্যাপস স্টাইল) ⭐️ */}
          <div className="p-3 border-t border-white/10 bg-[#060D1A]/95 flex items-center justify-between gap-2">
            {/* Active User Info */}
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${activeProfile.avatarBg} flex items-center justify-center font-bold text-xs text-white shadow shrink-0 ring-1 ring-white/15`}>
                {activeProfile.name.charAt(0)}
              </div>
              <div className="overflow-hidden min-w-0">
                <div className="text-xs font-semibold text-white truncate">{activeProfile.name}</div>
                <div className="text-[10px] text-cyan-400 font-mono truncate">{activeProfile.title}</div>
              </div>
            </div>

            {/* Right Action Icons: Notification Bell & External Link */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Sleek Notification Bell Button with subtle unread pulse */}
              <button
                onClick={() => {
                  setIsNotifModalOpen(true);
                  setNotifActiveTab("inbox");
                }}
                className={`relative p-2 rounded-xl border transition-all ${
                  unreadCount > 0
                    ? "bg-red-500/15 border-red-500/30 text-red-400 hover:bg-red-500/25 shadow-sm shadow-red-500/10"
                    : "bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
                title={unreadCount > 0 ? `${unreadCount} unread notifications` : "Notifications"}
              >
                <Bell className="w-4 h-4 text-cyan-400" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                  </span>
                )}
              </button>

              <Link
                href="/"
                target="_blank"
                title="View Public Site"
                className="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>

              {/* Logout Button */}
              <button
                type="button"
                onClick={() => {
                  const operatorName = isSuperAdmin
                    ? "Abu Tawfiq (Super Admin)"
                    : loggedInStaff
                    ? `${loggedInStaff.name} (@${loggedInStaff.username || "staff"})`
                    : "Operator";
                  addActivityLog({
                    user: operatorName,
                    action: "🚪 সিস্টেম থেকে লগআউট সম্পন্ন করেছেন (Session Terminated)",
                    module: "System",
                    type: "lead",
                  });
                  setIsAuthenticated(false);
                  setLoggedInStaff(null);
                  setLoginPassword("");
                  showToast("সফলভাবে লগআউট সম্পন্ন হয়েছে।");
                }}
                title="লগআউট করুন (Logout)"
                className="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <Lock className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* ========================================================================
            MAIN CONTENT AREA
           ======================================================================== */}
        <main className="flex-1 lg:ml-[252px] flex flex-col min-w-0 pb-20 lg:pb-10">
          {/* ⭐️ FIXED TOP STICKY BAR: Search Option & Live RGB Option Seamlessly Attached (সার্চ ও লাইভ অপশন একসাথে ফিক্সড) ⭐️ */}
          <div className={`sticky top-0 z-30 w-full backdrop-blur-md transition-colors ${theme.headerBg} border-b`}>
            {/* Top Bar with Search & Controls */}
            <header className="h-16 px-4 sm:px-6 flex items-center justify-between">
              {/* Left: Mobile hamburger & Search */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div className="relative w-48 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search clients, tasks, records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-9 pr-3 py-1.5 rounded-lg text-xs outline-none transition-all ${theme.inputBg}`}
                  />
                </div>
              </div>

              {/* Right: Operator Role Selector, Theme, Quick Add */}
              <div className="flex items-center gap-2.5">
                {/* Active Management Profile Switcher (Super Admin Only) */}
                {isSuperAdmin && (
                  <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl ${isDark ? "bg-[#091322] border border-white/10" : "bg-slate-100 border border-slate-200"} text-xs shadow-inner`}>
                    <span className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"} uppercase font-mono mr-1`}>Profile:</span>
                    <select
                      value={activeProfileId}
                      onChange={(e) => handleProfileChange(e.target.value)}
                      className={`bg-transparent ${isDark ? "text-slate-100" : "text-slate-900"} font-semibold text-xs outline-none cursor-pointer`}
                    >
                      {MANAGEMENT_PROFILES.map((p) => (
                        <option key={p.id} value={p.id} className={isDark ? "bg-[#0A1222] text-white" : "bg-white text-slate-900"}>
                          {p.name} ({p.role === "super_admin" ? "Super Admin" : p.title})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* 🕌 Bangladesh Prayer / Adhan Live Tracker Pill & Dropdown */}
                {prayerSchedule && (
                  <div className="relative">
                    <button
                      onClick={() => setIsPrayerDropdownOpen(!isPrayerDropdownOpen)}
                      className={`px-2.5 py-1 sm:py-1.5 rounded-xl border transition-all flex items-center gap-2 group shadow-sm ${
                        isDark
                          ? "bg-gradient-to-r from-[#071328] to-[#0A1A38] border-amber-500/30 hover:border-amber-400/60 text-slate-200 shadow-black/40"
                          : "bg-gradient-to-r from-amber-50/90 to-amber-100/60 border-amber-300 hover:border-amber-400 text-slate-800 shadow-amber-900/5"
                      }`}
                      title="Bangladesh Prayer Time (Asia/Dhaka) - Click to view today's schedule"
                    >
                      {/* Mosque / Crescent Icon with Gold Glow */}
                      <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-[#E8B343]/25 to-[#E8B343]/10 border border-[#E8B343]/40 text-[#E8B343] shrink-0">
                        <span className="text-sm select-none">🕌</span>
                        <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8B343] opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8B343]" />
                        </span>
                      </div>

                      {/* Prayer Info: Next Prayer, Prayer Name, Adhan Time, Time Remaining */}
                      <div className="text-left leading-tight hidden md:block">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-black tracking-widest uppercase text-[#E8B343]">
                            NEXT PRAYER
                          </span>
                          <span className="text-[9px] font-mono text-slate-400">
                            • {prayerSchedule.nextPrayer.nameEn}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-bold font-mono ${isDark ? "text-white" : "text-slate-900"}`}>
                            {prayerSchedule.nextPrayer.time12}
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded border border-emerald-500/25">
                            {prayerSchedule.timeRemainingFormatted}
                          </span>
                        </div>
                      </div>

                      {/* Compact for small mobile screens */}
                      <div className="text-left leading-tight md:hidden">
                        <div className="text-[9px] font-bold text-[#E8B343]">
                          {prayerSchedule.nextPrayer.nameEn}
                        </div>
                        <div className={`text-[10px] font-mono font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                          {prayerSchedule.nextPrayer.time12}
                        </div>
                      </div>

                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-transform ${
                          isPrayerDropdownOpen ? "rotate-180 text-amber-400" : ""
                        }`}
                      />
                    </button>

                    {/* Prayer Times Dropdown Popover */}
                    {isPrayerDropdownOpen && (
                      <div
                        className={`absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl p-3.5 shadow-2xl border z-50 animate-in fade-in zoom-in-95 duration-150 ${
                          isDark
                            ? "bg-[#0A1326]/95 border-amber-500/25 backdrop-blur-xl text-slate-200 shadow-black/80"
                            : "bg-white/95 border-amber-200 backdrop-blur-xl text-slate-800 shadow-slate-300"
                        }`}
                      >
                        {/* Header with Crescent & Bangladesh Time */}
                        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10">
                          <div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#E8B343]">
                              <span>🕌</span>
                              <span>বাংলাদেশ নামাজের সময়সূচী</span>
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {prayerSchedule.dateStr} • {prayerSchedule.dateBn}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/25">
                              Asia/Dhaka
                            </span>
                          </div>
                        </div>

                        {/* List of 5 Daily Prayers */}
                        <div className="space-y-1.5 mb-3">
                          {prayerSchedule.prayers.map((p) => {
                            const isNext = p.id === prayerSchedule.nextPrayer.id;
                            return (
                              <div
                                key={p.id}
                                className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-all ${
                                  isNext
                                    ? "bg-[#E8B343]/15 border border-[#E8B343]/40 text-white font-semibold shadow-sm"
                                    : p.isPassed
                                    ? isDark
                                      ? "bg-white/[0.02] text-slate-500"
                                      : "bg-slate-50 text-slate-400"
                                    : isDark
                                    ? "bg-white/[0.04] text-slate-300"
                                    : "bg-slate-100/70 text-slate-700"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      isNext
                                        ? "bg-[#E8B343] animate-pulse ring-2 ring-[#E8B343]/50"
                                        : p.isPassed
                                        ? "bg-slate-600"
                                        : "bg-emerald-400"
                                    }`}
                                  />
                                  <span>
                                    {p.nameBn}{" "}
                                    <span className="text-[10px] font-mono opacity-70">
                                      ({p.nameEn})
                                    </span>
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold">{p.time12}</span>
                                  {isNext && (
                                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#E8B343] text-black font-black">
                                      Next
                                    </span>
                                  )}
                                  {p.isPassed && !isNext && (
                                    <span className="text-[10px] text-slate-500">
                                      ✓
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Quick Notification & Sound Toggles */}
                        <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleAdhanNotification(!adhanNotificationEnabled)}
                              className={`px-2 py-1 rounded-lg font-medium border flex items-center gap-1 transition-all ${
                                adhanNotificationEnabled
                                  ? "bg-amber-500/15 border-amber-500/30 text-amber-300"
                                  : "bg-white/5 border-white/10 text-slate-400"
                              }`}
                              title="Toggle Full-screen Adhan Popup"
                            >
                              <Bell className="w-3 h-3" />
                              <span>Popup: {adhanNotificationEnabled ? "ON" : "OFF"}</span>
                            </button>

                            <button
                              onClick={() => handleToggleAdhanSound(!adhanSoundEnabled)}
                              className={`px-2 py-1 rounded-lg font-medium border flex items-center gap-1 transition-all ${
                                adhanSoundEnabled
                                  ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-300"
                                  : "bg-white/5 border-white/10 text-slate-400"
                              }`}
                              title="Toggle Adhan Tone Sound"
                            >
                              {adhanSoundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                              <span>Sound: {adhanSoundEnabled ? "ON" : "OFF"}</span>
                            </button>
                          </div>

                          <button
                            onClick={() => {
                              setIsPrayerDropdownOpen(false);
                              handleTestAdhanModal();
                            }}
                            className="text-[10px] font-bold text-[#E8B343] hover:underline"
                            title="Preview 10-second Adhan Popup"
                          >
                            প্রিভিউ ↗
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 🔔 Minimalist Premium Header Notification Bell Button */}
                <button
                  onClick={() => {
                    setIsNotifModalOpen(true);
                    setNotifActiveTab("inbox");
                  }}
                  className={`relative p-2 rounded-xl border transition-all ${
                    unreadCount > 0
                      ? "bg-red-500/15 border-red-500/30 text-red-400 hover:bg-red-500/25 shadow-sm shadow-red-500/10"
                      : isDark
                      ? "bg-[#091322] border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                      : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                  }`}
                  title={unreadCount > 0 ? `${unreadCount} unread notifications` : "Notifications"}
                >
                  <Bell className="w-4 h-4 text-cyan-400" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </span>
                  )}
                </button>

                {/* Management Theme Customizer Shortcut */}
                <button
                  onClick={() => {
                    setWorkspaceMode("operations");
                    setActivePage("settings");
                  }}
                  className={`p-2 rounded-lg text-xs flex items-center gap-1.5 border transition-all ${
                    activePage === "settings" && workspaceMode === "operations"
                      ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-md shadow-cyan-500/20"
                      : isDark
                      ? "bg-[#091322] border-white/10 text-cyan-400 hover:text-cyan-300 hover:bg-white/5"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm"
                  }`}
                  title="Management Theme & Colors Settings (ম্যানেজমেন্ট থিম কনফিগারেশন)"
                >
                  <Palette className="w-4 h-4 text-cyan-400" />
                  <span className="hidden xl:inline text-[11px] font-semibold">Themes</span>
                </button>

                {/* Theme toggle */}
                <button
                  onClick={() => {
                    const nextDark = !isDark;
                    setIsDark(nextDark);
                    showToast(nextDark ? "🌙 ডার্ক মোড অন করা হয়েছে" : "☀️ ফ্রেশ লাইট মোড অন করা হয়েছে");
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 border transition-all ${
                    isDark
                      ? "bg-[#091322] border-white/10 text-amber-300 hover:bg-[#0D1B30]"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm"
                  }`}
                  title="Toggle Light / Dark"
                >
                  {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
                  <span className="font-semibold text-[11px]">{isDark ? "Dark" : "Light"}</span>
                </button>

                {/* Quick Add */}
                <div className="relative">
                  <button
                    onClick={() => setIsQuickAddOpen(!isQuickAddOpen)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md ${theme.accentBtn}`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add ▾</span>
                  </button>

                  {isQuickAddOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-48 rounded-xl p-1.5 shadow-2xl border z-50 ${
                        isDark ? "bg-[#0D182B] border-[#1C2E4C] text-slate-200" : "bg-white border-slate-200 text-slate-800"
                      }`}
                    >
                      {[
                        { id: "client", label: "＋ Add Client / Lead", show: canAccessModule("Clients") },
                        { id: "task", label: "＋ Create Task / Project", show: canAccessModule("Tasks") },
                        { id: "payment", label: "＋ Record Payment", show: canAccessModule("Payments") || canAccessModule("Finance") },
                        { id: "expense", label: "＋ Add Expense", show: canAccessModule("Expenses") || canAccessModule("Finance") },
                        { id: "employee", label: "＋ Add Employee", show: isSuperAdmin || canAccessModule("Employees") },
                      ].filter((item) => item.show).map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setModalType(item.id as any);
                            setIsQuickAddOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                            isDark ? "hover:bg-[#162742]" : "hover:bg-slate-100"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* ⭐️ Top Slim Animated RGB Urgent Headline Ticker (এক্সাক্টভাবে লাগানো ও ফিক্সড) ⭐️ */}
            <UrgentHeadlineTicker inAdmin={true} />
          </div>

          {/* ⭐️ Live RGB Urgent Headline Controller Widget for Super Admin ⭐️ */}
          <div className="px-4 sm:px-6 pt-3">
            <div className={`p-3 sm:p-4 rounded-2xl ${
              isDark
                ? "bg-[#081226]/90 border border-cyan-500/30 shadow-xl"
                : "bg-white border border-slate-200 shadow-md"
            } flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs relative overflow-hidden transition-colors`}>
              {/* Ultra-slim animated RGB top line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] rgb-gradient-animated" />

              <div className="flex items-center gap-2.5 shrink-0">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 shadow-sm shadow-red-500" />
                </span>
                <div>
                  <div className={`font-bold ${isDark ? "text-white" : "text-slate-900"} flex items-center gap-2`}>
                    <span className="rgb-text-animated font-black text-sm">RGB জরুরি হেডলাইন কন্ট্রোল</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        headlineEnabled
                          ? "bg-red-500/20 text-red-400 border-red-500/40 font-bold"
                          : isDark
                          ? "bg-slate-800 text-slate-400 border-white/10"
                          : "bg-slate-100 text-slate-500 border-slate-200"
                      }`}
                    >
                      {headlineEnabled ? "ম্যানেজমেন্ট লাইভ (LIVE)" : "বন্ধ (OFF)"}
                    </span>
                  </div>
                  <p className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"} mt-0.5`}>
                    ম্যানেজমেন্ট সিস্টেমের অভ্যন্তরীণ জরুরি নোটিশ (শুধু ম্যানেজমেন্ট টিমের ভিতরে স্ক্রল হবে, ওয়েবসাইটে শো করবে না)
                  </p>
                </div>
              </div>

              {/* Control Form */}
              <form onSubmit={handleSaveHeadline} className="flex-1 max-w-3xl flex items-center gap-2">
                <input
                  type="text"
                  value={headlineText}
                  onChange={(e) => setHeadlineText(e.target.value)}
                  placeholder="জরুরি নোটিশ বা হেডলাইন লিখুন যা উপরে স্ক্রল হবে..."
                  className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium border ${theme.inputBg} outline-none transition-all`}
                />

                {/* ON / OFF Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    const next = !headlineEnabled;
                    setHeadlineEnabled(next);
                    updateSiteConfig({
                      urgentHeadline: {
                        enabled: next,
                        text: headlineText,
                        linkText: "বিস্তারিত দেখুন",
                        linkUrl: "/services",
                      },
                    });
                    showToast(next ? "✓ জরুরি হেডলাইন চালু হয়েছে!" : "জরুরি হেডলাইন বন্ধ করা হয়েছে।");
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                    headlineEnabled
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30"
                      : isDark
                      ? "bg-slate-800 text-slate-400 border-white/10 hover:bg-slate-700"
                      : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                  }`}
                  title="হেডলাইন অন/অফ করুন"
                >
                  {headlineEnabled ? "ON" : "OFF"}
                </button>

                {/* Save Button */}
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#1FA8CB] to-[#2E5FCC] text-white shadow-md shadow-cyan-500/20 hover:brightness-110 shrink-0 transition-all"
                >
                  আপডেট করুন
                </button>
              </form>
            </div>
          </div>

          {/* ========================================================================
              WORKSPACE ROUTING
             ======================================================================== */}
          <div className="p-4 sm:p-6 max-w-7xl w-full mx-auto space-y-6">
            {/* ====================================================================
                A. OPERATIONS WORKSPACE
               ==================================================================== */}
            {workspaceMode === "operations" && (
              <>
                {/* 1. DASHBOARD */}
                {activePage === "dashboard" && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}>Executive Dashboard</h1>
                        <p className={`text-xs ${theme.textMuted}`}>
                          Agency Operations & Live Client Throughput
                        </p>
                      </div>
                      <div className={`px-3.5 py-2 rounded-xl border text-xs font-mono flex items-center gap-2.5 ${theme.statBg} shadow-sm`}>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-sm shadow-cyan-500" />
                        </span>
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        <span className={`${isDark ? "text-slate-300" : "text-slate-600"} font-medium`}>লাইভ আপডেট:</span>
                        <span className={`${isDark ? "text-white" : "text-slate-900"} font-bold`}>{liveDateFormatted}</span>
                      </div>
                    </div>

                    {/* 5 Operational KPI Cards (Executive Luxury Look — No AI Stars) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                      {[
                        { label: "Total Clients", val: clients.length, sub: "Registered accounts", color: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-500/10", icon: Users, accentLine: "from-blue-500 to-cyan-500" },
                        { label: "Active Pipeline", val: activeClientsCount, sub: "Ongoing execution", color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10", icon: Activity, accentLine: "from-emerald-400 to-teal-500" },
                        { label: "Pending Revisions", val: pendingClientsCount, sub: "Waiting feedback", color: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10", icon: Clock, accentLine: "from-amber-400 to-orange-500" },
                        { label: "Completed Deliverables", val: completedClientsCount, sub: "Delivered 100%", color: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-500/10", icon: CheckCircle2, accentLine: "from-purple-400 to-pink-500" },
                        { label: "Production Workflows", val: tasks.length, sub: "Active stage pipelines", color: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-500/10", icon: Workflow, accentLine: "from-cyan-400 to-blue-600" },
                      ].map((card, i) => (
                        <div
                          key={i}
                          className={`p-4 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-lg relative overflow-hidden group hover:border-white/20 transition-all duration-300`}
                        >
                          {/* Top Luxury Accent Gradient Line */}
                          <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${card.accentLine}`} />
                          
                          <div className="flex items-center justify-between mb-2.5">
                            <span className={`text-[11px] font-semibold tracking-wide ${theme.textMuted}`}>{card.label}</span>
                            <div className={`p-1.5 rounded-xl border ${card.border} ${card.bg} ${card.color} shadow-sm group-hover:scale-110 transition-transform`}>
                              <card.icon className="w-3.5 h-3.5 stroke-[2.2]" />
                            </div>
                          </div>
                          <div className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? "text-slate-100" : "text-slate-900"} font-mono`}>{card.val}</div>
                          <div className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"} mt-1 flex items-center gap-1 font-medium`}>
                            <span className="w-1 h-1 rounded-full bg-slate-500" />
                            <span>{card.sub}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Donut Chart & Throughput */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                      {/* Donut Chart */}
                      <div className={`lg:col-span-4 p-5 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm flex flex-col justify-between`}>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-slate-200" : "text-slate-800"}`}>Project Status Distribution</h3>
                          <span className="text-[10px] font-mono text-cyan-400">Live</span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
                          <div
                            className="relative w-36 h-36 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-black/20"
                            style={{
                              background: `conic-gradient(#10B981 0% 55%, #F59E0B 55% 80%, #8B5CF6 80% 100%)`,
                            }}
                          >
                            <div className={`w-24 h-24 rounded-full ${isDark ? "bg-[#0C1526]" : "bg-white"} flex flex-col items-center justify-center text-center shadow-inner`}>
                              <span className={`text-xl font-black ${isDark ? "text-slate-100" : "text-slate-900"}`}>{clients.length}</span>
                              <span className={`text-[9px] uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}>Projects</span>
                            </div>
                          </div>

                          <div className="space-y-2 text-xs w-full">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                <span className={isDark ? "text-slate-300" : "text-slate-700"}>Active</span>
                              </div>
                              <span className={`font-bold font-mono ${isDark ? "text-slate-100" : "text-slate-900"}`}>{activeClientsCount}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                <span className={isDark ? "text-slate-300" : "text-slate-700"}>Pending</span>
                              </div>
                              <span className={`font-bold font-mono ${isDark ? "text-slate-100" : "text-slate-900"}`}>{pendingClientsCount}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                                <span className={isDark ? "text-slate-300" : "text-slate-700"}>Completed</span>
                              </div>
                              <span className={`font-bold font-mono ${isDark ? "text-slate-100" : "text-slate-900"}`}>{completedClientsCount}</span>
                            </div>
                          </div>
                        </div>

                        <div className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"} pt-3 border-t ${isDark ? "border-white/5" : "border-slate-100"} mt-2`}>
                          24/7 Client Live Trackers active across all accounts.
                        </div>
                      </div>

                      {/* Bar Histogram */}
                      <div className={`lg:col-span-4 p-5 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm flex flex-col justify-between`}>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-slate-200" : "text-slate-800"}`}>Weekly Milestone Throughput</h3>
                          <span className="text-[10px] text-slate-400 font-mono">10 Sprints</span>
                        </div>

                        <div className={`h-40 flex items-end gap-2 pt-4 px-2 border-b ${isDark ? "border-white/10" : "border-slate-200"}`}>
                          {[45, 62, 58, 75, 82, 68, 91, 74, 88, 96].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
                              <div
                                className="w-full rounded-t-md bg-gradient-to-t from-[#1E5BC4] to-cyan-400 group-hover:brightness-125 transition-all"
                                style={{ height: `${height}%` }}
                              />
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2">
                          <span>01 Sep</span>
                          <span>Sprint Mid</span>
                          <span>04 Sep</span>
                        </div>
                      </div>

                      {/* Real-time Activity Feed */}
                      <div className={`lg:col-span-4 p-5 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm`}>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-slate-200" : "text-slate-800"}`}>Live Activity Stream</h3>
                          <button onClick={() => setActivePage("logs")} className="text-[10px] text-cyan-400 hover:underline">
                            View all
                          </button>
                        </div>

                        <div className="space-y-3 overflow-hidden">
                          {activityLogs
                            .filter((log) => log.type !== "payment" && log.type !== "expense")
                            .slice(0, 5)
                            .map((log) => (
                            <div key={log.id} className={`flex items-start gap-2.5 pb-2.5 border-b ${isDark ? "border-white/5" : "border-slate-100"} last:border-0 last:pb-0`}>
                              <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                                {log.type === "payment" ? "৳" : log.type === "lead" ? "NEW" : "OK"}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className={`text-[11px] font-medium leading-tight line-clamp-1 ${isDark ? "text-slate-200" : "text-slate-800"}`}>{log.action}</div>
                                <div className="text-[9px] text-slate-500 mt-0.5 flex items-center gap-2">
                                  <span>{log.user}</span>
                                  <span>•</span>
                                  <span>{log.time}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. AGENCY SCHEDULES, CLIENT APPOINTMENTS & SHOOT PRODUCTION TASKS */}
                {activePage === "tasks" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    {/* Top Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h1 className={`text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                          <span>Agency Schedules & Tasks</span>
                          <span className="text-sm font-normal text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                            শিডিউল ও কাজের তালিকা
                          </span>
                        </h1>
                        <p className={`text-xs ${theme.textMuted} mt-0.5`}>
                          ক্লায়েন্ট অফিস ভিজিট/মিটিং, স্টুডিও শুট শিডিউল এবং অভ্যন্তরীণ এজেন্সির কাজের তালিকা (লাইভ প্রজেক্টের ডেলিভারেবল Clients সেকশনে পরিচালিত হয়)
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setModalType("task");
                            setFormTaskType("client_meeting");
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg ${theme.accentBtn}`}
                        >
                          <Plus className="w-4 h-4" />
                          <span>নতুন শিডিউল / কাজ যোগ করুন</span>
                        </button>
                      </div>
                    </div>

                    {/* Filter Tabs for Schedules & Tasks - Clean English Labels Without Emojis */}
                    <div className={`flex flex-wrap items-center gap-2 p-1.5 rounded-2xl ${isDark ? "bg-white/[0.03] border border-white/10" : "bg-slate-100/80 border border-slate-200"}`}>
                      {[
                        { id: "all", label: "All Schedules", count: tasks.length },
                        {
                          id: "client_meeting",
                          label: "Client Meeting",
                          count: tasks.filter((t) => t.taskType === "client_meeting" || t.taskType === "client_visit").length,
                        },
                        {
                          id: "studio_session",
                          label: "Studio Session",
                          count: tasks.filter((t) => t.taskType === "studio_session" || t.taskType === "video_shoot").length,
                        },
                        {
                          id: "urgent_deadline",
                          label: "Urgent Deadline",
                          count: tasks.filter((t) => t.taskType === "urgent_deadline").length,
                        },
                        {
                          id: "agency_task",
                          label: "Agency Work",
                          count: tasks.filter((t) => t.taskType === "agency_task" || t.taskType === "internal_todo" || !t.taskType).length,
                        },
                        {
                          id: "upcoming",
                          label: "Upcoming Tasks",
                          count: tasks.filter((t) => t.status !== "completed").length,
                        },
                      ].map((tab) => {
                        const isActive = taskCategoryFilter === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setTaskCategoryFilter(tab.id as any)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                              isActive
                                ? "bg-gradient-to-r from-[#1FA8CB] to-[#2E5FCC] text-white shadow-md shadow-cyan-500/20 font-bold"
                                : isDark
                                ? "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5"
                                : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm"
                            }`}
                          >
                            <span>{tab.label}</span>
                            <span
                              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                isActive ? "bg-white/20 text-white" : isDark ? "bg-white/10 text-slate-400" : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {tab.count}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Schedule Cards Grid */}
                    {filteredTasks.length === 0 ? (
                      <div className={`p-12 text-center rounded-2xl border ${theme.cardBg} ${theme.cardBorder}`}>
                        <Clock className="w-10 h-10 text-slate-500 mx-auto mb-2 opacity-50" />
                        <h3 className={`text-sm font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>কোন শিডিউল বা কাজ পাওয়া যায়নি</h3>
                        <p className="text-xs text-slate-400 mt-1">
                          উপরে &quot;নতুন শিডিউল / কাজ যোগ করুন&quot; বাটনে ক্লিক করে নতুন এন্ট্রি যুক্ত করুন।
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredTasks.map((task) => {
                          const isMeeting = task.taskType === "client_meeting" || task.taskType === "client_visit";
                          const isSession = task.taskType === "studio_session" || task.taskType === "video_shoot";
                          const isUrgent = task.taskType === "urgent_deadline";
                          const isDone = task.status === "completed";

                          return (
                            <div
                              key={task.id}
                              className={`p-5 rounded-2xl border transition-all ${theme.cardBg} ${
                                isDone ? "border-emerald-500/20 opacity-75" : theme.cardBorder
                              } shadow-sm space-y-3.5 hover:border-cyan-500/30 group`}
                            >
                              {/* Card Top Pill Row */}
                              <div className="flex items-start justify-between gap-2 flex-wrap">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  {/* Clean Task Type Badge without Emojis */}
                                  <span
                                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 border ${
                                      isMeeting
                                        ? "bg-purple-500/15 text-purple-300 border-purple-500/30"
                                        : isSession
                                        ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
                                        : isUrgent
                                        ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                                        : "bg-blue-500/15 text-blue-300 border-blue-500/30"
                                    }`}
                                  >
                                    {isMeeting && "Client Meeting"}
                                    {isSession && "Studio Session"}
                                    {isUrgent && "Urgent Deadline"}
                                    {!isMeeting && !isSession && !isUrgent && "Agency Work"}
                                  </span>

                                  {/* Time / Date Badge */}
                                  {(task.scheduledTime || task.deadline) && (
                                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 flex items-center gap-1">
                                      <Clock className="w-3 h-3 text-cyan-400" />
                                      <span>{task.scheduledTime || task.deadline}</span>
                                    </span>
                                  )}
                                </div>

                                {/* Status Tag */}
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                    isDone
                                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                      : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                  }`}
                                >
                                  {isDone ? "সম্পন্ন (Done)" : "চলমান (Pending)"}
                                </span>
                              </div>

                              {/* Title */}
                              <div>
                                <h3 className={`text-sm sm:text-base font-bold ${isDark ? "text-slate-100" : "text-slate-900"} ${isDone ? "line-through text-slate-400" : ""}`}>
                                  {task.title}
                                </h3>
                                {task.clientName && (
                                  <div className="text-xs text-cyan-400 font-medium mt-1 flex items-center gap-1.5">
                                    <span className={`${isDark ? "text-slate-400" : "text-slate-500"} font-normal`}>ক্লায়েন্ট / প্রতিষ্ঠান:</span>
                                    <strong className={`${isDark ? "text-cyan-300" : "text-blue-700"} font-semibold`}>{task.clientName}</strong>
                                    {task.serviceName && (
                                      <span className={`text-[10px] ${isDark ? "text-slate-400 bg-white/5" : "text-slate-600 bg-slate-100"} font-mono px-1.5 py-0.2 rounded`}>
                                        ({task.serviceName})
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Team Assignment (Studio location removed as agency owns the studio) */}
                              <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                                {task.assignedTo && (
                                  <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-semibold bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                                    <UserCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                                    <span className={isDark ? "text-slate-400" : "text-slate-600"}>দায়িত্বপ্রাপ্ত:</span>
                                    <span className={`${isDark ? "text-slate-100" : "text-slate-900"} font-bold`}>{task.assignedTo}</span>
                                    {task.department && <span className="text-slate-400 font-mono text-[10px]">({task.department})</span>}
                                  </div>
                                )}
                              </div>

                              {/* Discussion Agenda / Notes Box */}
                              {task.notes && (
                                <div className={`p-3 rounded-xl ${isDark ? "bg-black/30 border border-white/5 text-slate-300" : "bg-slate-50 border border-slate-200 text-slate-700"} text-xs space-y-1`}>
                                  <div className="text-[10px] font-bold text-amber-300/90 uppercase tracking-wider flex items-center gap-1">
                                    <span className="flex items-center gap-1.5"><MessageSquare className="w-3 h-3 text-cyan-400" /><span>এজেন্ডা ও প্রস্তুতি নোট:</span></span>
                                  </div>
                                  <p className={`${isDark ? "text-slate-300" : "text-slate-700"} leading-relaxed font-sans text-xs`}>
                                    {task.notes}
                                  </p>
                                </div>
                              )}

                              {/* Card Action Row */}
                              <div className="flex items-center justify-between pt-2 border-t border-white/5 gap-2">
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newStatus = isDone ? "in_progress" : "completed";
                                      const newProgress = isDone ? 20 : 100;
                                      updateTask(task.id, { status: newStatus, progress: newProgress });
                                      showToast(
                                        isDone
                                          ? `কাজটি পুনরায় চলমান করা হয়েছে`
                                          : `কাজটি সফলভাবে সম্পন্ন চিহ্নিত করা হয়েছে`
                                      );
                                    }}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                                      isDone
                                        ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10"
                                        : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 shadow-sm"
                                    }`}
                                  >
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>{isDone ? "পুনরায় চালু করুন" : "সম্পন্ন চিহ্নিত করুন"}</span>
                                  </button>
                                </div>

                                <div className="flex items-center gap-1.5">
                                  {task.clientId && (
                                    <Link
                                      href={`/track/${task.clientId}`}
                                      target="_blank"
                                      className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-[11px] font-mono flex items-center gap-1 border border-cyan-500/25"
                                      title="View Public 24/7 Client Live Tracker"
                                    >
                                      <span>লাইভ ট্র্যাকার</span>
                                      <ExternalLink className="w-3 h-3" />
                                    </Link>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (confirm(`আপনি কি "${task.title}" শিডিউলটি মুছে ফেলতে চান?`)) {
                                        deleteTask(task.id);
                                        showToast(`শিডিউলটি মুছে ফেলা হয়েছে`);
                                      }
                                    }}
                                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                                    title="শিডিউল ডিলিট করুন"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* 3. CLIENTS & LEADS ROSTER WITH 1-CLICK TRACKER SHARING */}
                {activePage === "clients" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
                          <span>Clients & Live Project Trackers</span>
                          <span className="text-sm font-normal text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                            লাইভ প্রজেক্ট ও ট্র্যাকার
                          </span>
                        </h1>
                        <p className={`text-xs ${theme.textMuted}`}>
                          সকল এজেন্সির লাইভ ক্লায়েন্ট প্রজেক্ট, ক্যাটাগরিভিত্তিক ফিল্টার এবং ২৪/৭ লাইভ ট্র্যাকিং শেয়ারিং
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href="/admin/invoice"
                          target="_blank"
                          className="px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 shadow-sm transition-all"
                        >
                          <Printer className="w-3.5 h-3.5 text-amber-400" />
                          <span>ইনভয়েস জেনারেটর</span>
                        </Link>
                        <button
                          onClick={() => setModalType("client")}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg ${theme.accentBtn}`}
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add New Client</span>
                        </button>
                      </div>
                    </div>

                    {/* ⭐️ CATEGORY FILTER TABS & SMART SORTING CONTROLS ⭐️ */}
                    <div className={`flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-2 rounded-2xl ${isDark ? "bg-white/[0.03] border border-white/10" : "bg-slate-100/80 border border-slate-200"}`}>
                      {/* Service Category Pills */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                        {[
                          { id: "all", label: "সকল সার্ভিস (All)", icon: Globe },
                          { id: "madrasa-solution", label: "অনলাইন মাদ্রাসা", icon: Building },
                          { id: "video-editing", label: "ভিডিও এডিটিং", icon: Film },
                          { id: "web-development", label: "ওয়েব ডেভেলপমেন্ট", icon: Code2 },
                          { id: "digital-marketing", label: "ডিজিটাল মার্কেটিং", icon: Target },
                          { id: "model-video", label: "মডেল শুট ও ভিডিও", icon: Camera },
                          { id: "other-services", label: "অন্যান্য সার্ভিস", icon: Layers },
                        ].map((tab) => {
                          const IconComp = tab.icon;
                          const count =
                            tab.id === "all"
                              ? clients.length
                              : clients.filter((c) => c.serviceId === tab.id).length;
                          const isActive = clientCategoryFilter === tab.id;
                          return (
                            <button
                              key={tab.id}
                              onClick={() => setClientCategoryFilter(tab.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                                isActive
                                  ? "bg-gradient-to-r from-[#1FA8CB] to-[#2E5FCC] text-white shadow-md shadow-cyan-500/20 font-bold"
                                  : isDark
                                  ? "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5"
                                  : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm"
                              }`}
                            >
                              <IconComp className="w-3.5 h-3.5 shrink-0" />
                              <span>{tab.label}</span>
                              <span
                                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                  isActive ? "bg-white/20 text-white" : isDark ? "bg-white/10 text-slate-400" : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {count}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Smart Sorting Dropdown */}
                      <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                        <span className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"} font-medium`}>সর্টিং:</span>
                        <select
                          value={clientSortBy}
                          onChange={(e) => setClientSortBy(e.target.value as any)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border ${isDark ? "border-white/10 bg-[#0D182B] text-slate-200" : "border-slate-300 bg-white text-slate-800 shadow-sm"} focus:outline-none focus:border-cyan-400 cursor-pointer`}
                        >
                          <option value="active_first" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                            চলমান কাজ আগে (In Progress First — Completed at Bottom)
                          </option>
                          <option value="az" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                            নাম অনুসারে (A → Z)
                          </option>
                          <option value="date_desc" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                            নতুন ক্লায়েন্ট আগে (Newest First)
                          </option>
                          <option value="progress_asc" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                            অগ্রগতি কম থেকে বেশি (Lowest % First)
                          </option>
                          <option value="progress_desc" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                            অগ্রগতি বেশি থেকে কম (Highest % First)
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Dedicated Context Banner for Madrasa Filter */}
                    {clientCategoryFilter === "madrasa-solution" && (
                      <div className={`p-3.5 rounded-2xl ${isDark ? "bg-emerald-950/30 border-emerald-500/30" : "bg-emerald-50 border-emerald-300"} border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs`}>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className={`${isDark ? "text-emerald-300" : "text-emerald-800"} font-semibold`}>
                            অনলাইন মাদ্রাসা সল্যুশন লাইভ ট্র্যাকার
                          </span>
                          <span className={isDark ? "text-slate-300" : "text-slate-600"}>
                            (মোট: {clients.filter((c) => c.serviceId === "madrasa-solution").length} টি • চলমান:{" "}
                            {
                              clients.filter(
                                (c) => c.serviceId === "madrasa-solution" && c.status !== "completed"
                              ).length
                            }{" "}
                            টি • সম্পন্ন:{" "}
                            {
                              clients.filter(
                                (c) => c.serviceId === "madrasa-solution" && c.status === "completed"
                              ).length
                            }{" "}
                            টি)
                          </span>
                        </div>
                        <span className={`text-[11px] ${isDark ? "text-emerald-400/90" : "text-emerald-700"} font-mono flex items-center gap-1`}>
                          <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
                          <span>প্রোগ্রেসবারে ক্লিক করে ৮টি ডেলিভারেবল চেকলিস্ট টিক করুন</span>
                        </span>
                      </div>
                    )}

                    {/* Dedicated Context Banner for Video Editing Filter */}
                    {clientCategoryFilter === "video-editing" && (
                      <div className={`p-3.5 rounded-2xl ${isDark ? "bg-blue-950/30 border-blue-500/30" : "bg-blue-50 border-blue-300"} border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs`}>
                        <div className="flex items-center gap-2">
                          <Film className="w-4 h-4 text-blue-500 shrink-0" />
                          <span className={`${isDark ? "text-blue-300" : "text-blue-800"} font-semibold`}>
                            ভিডিও এডিটিং ও অ্যানিমেশন প্রজেক্ট পাইপলাইন
                          </span>
                          <span className={isDark ? "text-slate-300" : "text-slate-600"}>
                            (মোট প্রজেক্ট: {clients.filter((c) => c.serviceId === "video-editing").length} টি • চলমান:{" "}
                            {
                              clients.filter(
                                (c) => c.serviceId === "video-editing" && c.status !== "completed"
                              ).length
                            }{" "}
                            টি)
                          </span>
                        </div>
                        <span className={`text-[11px] ${isDark ? "text-blue-400/90" : "text-blue-700"} font-mono flex items-center gap-1`}>
                          <Film className="w-3.5 h-3.5 text-blue-500" />
                          <span>সুপার এডমিন ও ভিডিও টিম এক ক্লিকেই সব আপডেট দেখতে পারছেন</span>
                        </span>
                      </div>
                    )}

                    <div className={`rounded-2xl border overflow-hidden ${theme.cardBg} ${theme.cardBorder} shadow-sm`}>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className={`border-b ${isDark ? "border-white/5 text-slate-400" : "border-slate-200 text-slate-600"} ${theme.tableHeaderBg} text-[11px] font-semibold uppercase tracking-wider`}>
                              <th className="p-3.5">Client & Contact</th>
                              <th className="p-3.5">Service Purchased</th>
                              {isSuperAdmin && <th className="p-3.5">Financials (৳)</th>}
                              <th className="p-3.5">Live Progress</th>
                              <th className="p-3.5">Status</th>
                              <th className="p-3.5 text-right">24/7 Client Tracker & Actions</th>
                            </tr>
                          </thead>
                          <tbody className={`divide-y ${isDark ? "divide-white/5" : "divide-slate-200/80"}`}>
                            {filteredClients.map((client) => {
                              return (
                                <tr key={client.id} className={`transition-colors ${theme.rowHover}`}>
                                  <td className="p-3.5">
                                    <div className={`font-bold flex items-center gap-1.5 flex-wrap ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                      <span>{client.name}</span>
                                      {client.clientCode && (
                                        <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono border border-blue-500/30 font-bold" title="Unique Client ID">
                                          {client.clientCode}
                                        </span>
                                      )}
                                      {client.isBoosting && (
                                        <span className="px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-300 text-[10px] font-mono border border-blue-500/30 font-bold flex items-center gap-1">
                                          <Share2 className="w-2.5 h-2.5 text-blue-400" />
                                          বুস্টিং / Meta Ads
                                        </span>
                                      )}
                                      {client.isLead && (
                                        <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-400 text-[9px] font-mono border border-cyan-500/30">
                                          WEB LEAD
                                        </span>
                                      )}
                                    </div>
                                    <div className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"} font-mono mt-0.5 flex items-center gap-2 flex-wrap`}>
                                      <span>{client.phone} • {client.company || "Private"}</span>
                                      {client.facebookPageUrl ? (
                                        <a
                                          href={client.facebookPageUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-300 hover:underline font-medium"
                                          title="ফেসবুক পেইজ লিংক খুলুন"
                                        >
                                          <ExternalLink className="w-2.5 h-2.5" />
                                          <span>{client.facebookPageName || "পেইজ লিংক"}</span>
                                        </a>
                                      ) : client.facebookPageName ? (
                                        <span className={isDark ? "text-slate-400" : "text-slate-500"}>পেইজ: {client.facebookPageName}</span>
                                      ) : null}
                                    </div>
                                  </td>

                                  <td className="p-3.5">
                                    <span className="inline-block px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 font-medium text-[11px]">
                                      {client.serviceName}
                                    </span>
                                  </td>

                                  {isSuperAdmin && (
                                    <td className="p-3.5 font-mono">
                                      <div className={`font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>৳ {client.totalAmount.toLocaleString()}</div>
                                      <div className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                                        Paid: <span className="text-emerald-500 font-semibold">৳{client.paidAmount.toLocaleString()}</span> via {client.paymentMethod}
                                      </div>
                                    </td>
                                  )}

                                  <td className="p-3.5">
                                    <button
                                      type="button"
                                      onClick={() => setSelectedClientForProgress(client)}
                                      className={`w-36 text-left group/prog p-2 -m-2 rounded-xl ${isDark ? "hover:bg-white/5 hover:border-white/10" : "hover:bg-slate-100 hover:border-slate-200"} border border-transparent transition-all cursor-pointer block`}
                                      title="ক্লিক করে প্রোগ্রেস পার্সেন্টেজ ও চেকলিস্ট কন্ট্রোল করুন"
                                    >
                                      <div className="flex justify-between items-center text-[10px] font-mono mb-1">
                                        <div className={`flex items-center gap-1 font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                          <span>{client.progress}%</span>
                                          {client.serviceId === "madrasa-solution" ? (
                                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-sans font-bold">
                                              চেকলিস্ট
                                            </span>
                                          ) : (
                                            <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-400 font-sans opacity-80 group-hover/prog:opacity-100">
                                              আপডেট
                                            </span>
                                          )}
                                        </div>
                                        <span className="text-[9px] text-slate-500 group-hover/prog:text-cyan-400 transition-colors">
                                          {client.progress === 100 ? "Done" : "Edit"}
                                        </span>
                                      </div>
                                      <div className={`h-2 ${isDark ? "bg-slate-800" : "bg-slate-200"} rounded-full overflow-hidden`}>
                                        <div
                                          className={`h-full rounded-full transition-all duration-300 ${
                                            client.progress === 100
                                              ? "bg-emerald-400"
                                              : client.serviceId === "madrasa-solution"
                                              ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400"
                                              : "bg-gradient-to-r from-blue-500 to-cyan-400"
                                          }`}
                                          style={{ width: `${client.progress}%` }}
                                        />
                                      </div>
                                    </button>
                                  </td>

                                  <td className="p-3.5">
                                    <span
                                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                        client.status === "active"
                                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                          : client.status === "completed"
                                          ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                                          : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                                      }`}
                                    >
                                      {client.status.toUpperCase()}
                                    </span>
                                  </td>

                                  <td className="p-3.5 text-right">
                                    <div className="flex items-center justify-end gap-1.5 flex-wrap">
                                      {/* Send Tracker to WhatsApp */}
                                      <button
                                        onClick={() => sendTrackerViaWhatsApp(client)}
                                        className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 font-medium text-[10px] border border-emerald-500/30 flex items-center gap-1 shadow"
                                        title="Send Live Tracker Link to Client WhatsApp"
                                      >
                                        <MessageCircle className="w-3 h-3" />
                                        <span>Send Tracker</span>
                                      </button>

                                      {/* Copy Tracker Link */}
                                      <button
                                        onClick={() => copyTrackerLink(client.id, client.name)}
                                        className={`p-1.5 rounded-lg ${isDark ? "bg-slate-800 hover:bg-slate-700 text-cyan-300" : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"}`}
                                        title="Copy 24/7 Live Tracker Link"
                                      >
                                        <Copy className="w-3.5 h-3.5" />
                                      </button>

                                      {/* Open Tracker */}
                                      <Link
                                        href={`/track/${client.id}`}
                                        target="_blank"
                                        className={`p-1.5 rounded-lg ${isDark ? "bg-slate-800 hover:bg-slate-700 text-slate-300" : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"}`}
                                        title="Open Live Client View"
                                      >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                      </Link>

                                      {/* Generate Invoice PDF */}
                                      <Link
                                        href={`/admin/invoice?clientId=${client.id}`}
                                        target="_blank"
                                        className="px-2 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 flex items-center gap-1 text-[10px] font-semibold transition-all shadow"
                                        title="ইনভয়েস বের করুন (Invoice Generator & Print)"
                                      >
                                        <Printer className="w-3 h-3 text-blue-400" />
                                        <span>ইনভয়েস</span>
                                      </Link>

                                      <button
                                        onClick={() => {
                                          if (confirm(`Delete client record for ${client.name}?`)) {
                                            deleteClient(client.id);
                                            showToast(`Client ${client.name} removed.`);
                                          }
                                        }}
                                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. TEAM & STAFF */}
                {activePage === "employees" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Agency Team & Roster</h1>
                        <p className={`text-xs ${theme.textMuted}`}>
                          Manage staff accounts, departments, compensation, and access permissions
                        </p>
                      </div>
                      <button
                        onClick={() => setModalType("employee")}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg ${theme.accentBtn}`}
                      >
                        <Plus className="w-4 h-4" />
                        <span>Onboard Employee</span>
                      </button>
                    </div>

                    <div className={`rounded-2xl border overflow-hidden ${theme.cardBg} ${theme.cardBorder} shadow-sm`}>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className={`border-b border-white/5 ${theme.tableHeaderBg} text-[11px] font-semibold text-slate-400 uppercase tracking-wider`}>
                              <th className="p-3.5">Employee</th>
                              <th className="p-3.5">Department</th>
                              <th className="p-3.5">Role</th>
                              <th className="p-3.5">যোগদানের তারিখ ও স্থায়িত্ব</th>
                              <th className="p-3.5">মাসিক বেতন (Salary)</th>
                              <th className="p-3.5">আজীবনের মোট স্যালারি</th>
                              <th className="p-3.5">লগইন ক্রেডেনশিয়াল (Login)</th>
                              <th className="p-3.5">অনুমোদিত মডিউল</th>
                              <th className="p-3.5">Status</th>
                              <th className="p-3.5 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className={`divide-y ${isDark ? "divide-white/5" : "divide-slate-200"}`}>
                            {employees.map((emp) => {
                              const empUser = emp.username || emp.email.split("@")[0] || "staff";
                              const empPass = emp.password || "thumbstop2026";
                              const lifetimeSalary = getEmployeeLifetimeSalary(emp);
                              const empTenure = getEmployeeTenure(emp.joinDate);

                              return (
                                <tr key={emp.id} className={`transition-colors ${theme.rowHover}`}>
                                  <td className="p-3.5">
                                    <div className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{emp.name}</div>
                                    <div className="text-[10px] text-slate-400 font-mono">{emp.email}</div>
                                    {emp.notes && (
                                      <div className="text-[10px] text-amber-400/90 mt-0.5 flex items-center gap-1 font-sans">
                                        <span className="flex items-center gap-1"><FileText className="w-3 h-3 text-amber-400" /><span>নোট: {emp.notes}</span></span>
                                      </div>
                                    )}
                                  </td>
                                  <td className="p-3.5">
                                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-medium">
                                      {emp.department}
                                    </span>
                                  </td>
                                  <td className={`p-3.5 ${isDark ? "text-slate-200" : "text-slate-700"}`}>{emp.role}</td>
                                  
                                  {/* 📅 Join Date & Tenure Column */}
                                  <td className="p-3.5">
                                    <div className={`font-semibold text-xs flex items-center gap-1.5 ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                                      <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                                      <span>{emp.joinDate || "01 Jan 2024"}</span>
                                    </div>
                                    <div className="text-[10px] text-cyan-400/90 font-mono mt-0.5">
                                      স্থায়িত্ব: {empTenure}
                                    </div>
                                  </td>

                                  {/* Monthly Salary Column */}
                                  <td className="p-3.5 font-mono font-bold text-emerald-400">
                                    ৳ {emp.salary.toLocaleString()}
                                  </td>

                                  {/* 💰 Lifetime Total Salary Paid Column */}
                                  <td className="p-3.5">
                                    <div className="font-mono font-bold text-cyan-300 text-xs">
                                      ৳ {lifetimeSalary.toLocaleString()}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => setViewingSalaryHistoryEmp(emp)}
                                      className="inline-flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-200 underline mt-0.5 hover:underline transition-colors"
                                      title={`${emp.name}-এর বেতন হিস্ট্রি দেখুন`}
                                    >
                                      <Receipt className="w-3 h-3" />
                                      <span>হিস্ট্রি দেখুন</span>
                                    </button>
                                  </td>

                                  {/* Login Credentials Column */}
                                  <td className="p-3.5">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-mono text-cyan-400 font-bold text-[11px]">@{empUser}</span>
                                      <button
                                        onClick={() => {
                                          navigator.clipboard.writeText(`ইউজারনেম: ${empUser}\nপাসওয়ার্ড: ${empPass}`);
                                          showToast(`${emp.name}-এর লগইন তথ্য কপি করা হয়েছে!`);
                                        }}
                                        className={`p-1 rounded ${isDark ? "bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300" : "bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700"} transition-colors`}
                                        title="লগইন তথ্য কপি করুন"
                                      >
                                        <Copy className="w-3 h-3" />
                                      </button>
                                    </div>
                                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                                      <span>পাসওয়ার্ড:</span>
                                      <span className={`font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>{empPass}</span>
                                    </div>
                                  </td>

                                  {/* 🛡️ Access & Permissions Column */}
                                  <td className="p-3.5">
                                    {emp.id === "emp-01" ? (
                                      <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-bold border border-amber-500/30 text-[10px] inline-flex items-center gap-1">
                                        👑 Full Access (Super Admin)
                                      </span>
                                    ) : (
                                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                                        {(emp.accessModules && emp.accessModules.length > 0 ? emp.accessModules : ["Dashboard"]).map((mod) => {
                                          const isFin = ["Finance", "Payments", "Expenses", "Salary", "Reports"].includes(mod);
                                          return (
                                            <span
                                              key={mod}
                                              className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                                                isFin
                                                  ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                                                  : "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                                              }`}
                                            >
                                              {mod}
                                            </span>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </td>

                                  <td className="p-3.5">
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                                      ACTIVE
                                    </span>
                                  </td>
                                  <td className="p-3.5 text-right">
                                    <div className="flex items-center justify-end gap-1.5">
                                      <button
                                        onClick={() => {
                                          setEditingEmployeeCreds(emp);
                                          setEditCredUsername(empUser);
                                          setEditCredPassword(empPass);
                                          setEditCredSalary(emp.salary);
                                          setEditCredJoinDate(emp.joinDate || "01 Jan 2024");
                                          setEditCredAccessModules(emp.accessModules && emp.accessModules.length > 0 ? [...emp.accessModules] : ["Dashboard", "Tasks", "Clients"]);
                                          setEditCredPermissionPreset("custom");
                                        }}
                                        className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center gap-1 text-[10px] font-semibold transition-colors"
                                        title="ইউজারনেম, পাসওয়ার্ড, বেতন ও যোগদানের তারিখ পরিবর্তন"
                                      >
                                        <ShieldCheck className="w-3 h-3" />
                                        <span>প্রোফাইল ও পারমিশন</span>
                                      </button>
                                      {emp.id !== "emp-01" && (
                                        <button
                                          onClick={() => {
                                            if (confirm(`Remove ${emp.name}?`)) {
                                              deleteEmployee(emp.id);
                                              showToast(`Employee ${emp.name} removed.`);
                                            }
                                          }}
                                          className="p-1.5 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                                          title="রিমুভ করুন"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 🔑 Staff Credentials & Profile Edit Modal */}
                    {editingEmployeeCreds && (
                      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
                        <div
                          onClick={() => setEditingEmployeeCreds(null)}
                          className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
                        />
                        <div className="relative z-10 w-full max-w-md bg-[#070E1E] border border-cyan-500/30 rounded-2xl p-5 sm:p-6 shadow-2xl text-white animate-in zoom-in-95 duration-200">
                          <div className="flex items-center justify-between pb-3 border-b border-white/10">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                                <Key className="w-4 h-4" />
                              </div>
                              <div>
                                <h3 className="font-bold text-sm text-white">স্টাফ প্রোফাইল ও ক্রেডেনশিয়াল আপডেট</h3>
                                <p className="text-[11px] text-slate-400">বেতন, যোগদানের তারিখ, ইউজারনেম ও পাসওয়ার্ড</p>
                              </div>
                            </div>
                            <button
                              onClick={() => setEditingEmployeeCreds(null)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              const finalMods = editCredAccessModules && editCredAccessModules.length > 0 ? editCredAccessModules : ["Dashboard"];
                              updateEmployee(editingEmployeeCreds.id, {
                                username: editCredUsername.trim().toLowerCase(),
                                password: editCredPassword.trim(),
                                salary: editCredSalary || editingEmployeeCreds.salary,
                                joinDate: editCredJoinDate.trim() || editingEmployeeCreds.joinDate || "01 Jan 2024",
                                accessModules: finalMods,
                              });
                              if (loggedInStaff && loggedInStaff.id === editingEmployeeCreds.id) {
                                setLoggedInStaff({
                                  ...loggedInStaff,
                                  username: editCredUsername.trim().toLowerCase(),
                                  password: editCredPassword.trim(),
                                  salary: editCredSalary || editingEmployeeCreds.salary,
                                  joinDate: editCredJoinDate.trim() || editingEmployeeCreds.joinDate || "01 Jan 2024",
                                  accessModules: finalMods,
                                });
                              }
                              showToast(`${editingEmployeeCreds.name}-এর প্রোফাইল ও অ্যাক্সেস পারমিশন সফলভাবে আপডেট করা হয়েছে!`);
                              setEditingEmployeeCreds(null);
                            }}
                            className="space-y-4 pt-4"
                          >
                            <div>
                              <label className="text-[11px] text-slate-400 block mb-1">স্টাফ মেম্বার</label>
                              <div className="text-xs font-bold text-white bg-white/5 p-2.5 rounded-xl border border-white/10 flex items-center justify-between">
                                <span>{editingEmployeeCreds.name}</span>
                                <span className="text-[10px] text-cyan-400 font-normal">
                                  {editingEmployeeCreds.role} • {editingEmployeeCreds.department}
                                </span>
                              </div>
                            </div>

                            {/* Salary & Join Date Inputs */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="text-[11px] text-slate-300 block mb-1 font-semibold">মাসিক বেতন (Monthly ৳)</label>
                                <input
                                  type="number"
                                  required
                                  value={editCredSalary}
                                  onChange={(e) => setEditCredSalary(parseInt(e.target.value) || 0)}
                                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono ${theme.inputBg}`}
                                />
                              </div>
                              <div>
                                <label className="text-[11px] text-slate-300 block mb-1 font-semibold">যোগদানের তারিখ (Join Date)</label>
                                <input
                                  type="text"
                                  value={editCredJoinDate}
                                  onChange={(e) => setEditCredJoinDate(e.target.value)}
                                  placeholder="যেমন: 01 Jan 2024"
                                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono ${theme.inputBg}`}
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-[11px] text-slate-300 block mb-1 font-semibold">সিস্টেম ইউজারনেম (@Username)</label>
                              <input
                                type="text"
                                required
                                value={editCredUsername}
                                onChange={(e) => setEditCredUsername(e.target.value)}
                                placeholder="যেমন: sayed_editor"
                                className={`w-full px-3 py-2 rounded-xl text-xs font-mono ${theme.inputBg}`}
                              />
                            </div>

                            <div>
                              <label className="text-[11px] text-slate-300 font-semibold block mb-1">লগইন পাসওয়ার্ড (Password)</label>
                              <div className="relative">
                                <input
                                  type={showEditCredPassword ? "text" : "password"}
                                  required
                                  value={editCredPassword}
                                  onChange={(e) => setEditCredPassword(e.target.value)}
                                  placeholder="পাসওয়ার্ড লিখুন"
                                  className={`w-full px-3 py-2 pr-9 rounded-xl text-xs font-mono ${theme.inputBg}`}
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowEditCredPassword(!showEditCredPassword)}
                                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                                >
                                  {showEditCredPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                            </div>

                            {/* 🛡️ Module Access & Permissions Editor */}
                            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#091427] to-[#0B1A33] border border-cyan-500/30 space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                                  <span className="text-xs font-bold text-white">মডিউল পারমিশন (Visible Modules)</span>
                                </div>
                                <span className="text-[10px] text-cyan-400 font-mono font-bold">{editCredAccessModules.length} টি সিলেক্টেড</span>
                              </div>

                              <div>
                                <label className="text-[10px] font-bold text-slate-300 block mb-1">কুইক রোল প্রিসেট (ড্রপডাউন সিলেক্টর)</label>
                                <select
                                  value={editCredPermissionPreset}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setEditCredPermissionPreset(val);
                                    const found = ROLE_PERMISSION_PRESETS.find((p) => p.id === val);
                                    if (found && val !== "custom") {
                                      setEditCredAccessModules([...found.modules]);
                                    }
                                  }}
                                  className={`w-full px-3 py-2 rounded-xl text-xs font-semibold ${theme.inputBg} border border-cyan-500/30 focus:border-cyan-400`}
                                >
                                  {ROLE_PERMISSION_PRESETS.map((p) => (
                                    <option key={p.id} value={p.id} className="bg-slate-900 text-white py-1">
                                      {p.label}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="pt-2 border-t border-white/10 space-y-2">
                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center justify-between">
                                  <span>নির্দিষ্ট মডিউল অনুমোদন:</span>
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditCredAccessModules(AVAILABLE_STAFF_MODULES.map((m) => m.id));
                                        setEditCredPermissionPreset("custom");
                                      }}
                                      className="text-cyan-400 hover:underline"
                                    >
                                      সব সিলেক্ট
                                    </button>
                                    <span>•</span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditCredAccessModules(["Dashboard"]);
                                        setEditCredPermissionPreset("custom");
                                      }}
                                      className="text-rose-400 hover:underline"
                                    >
                                      ক্লিয়ার
                                    </button>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                                  {AVAILABLE_STAFF_MODULES.map((mod) => {
                                    const isChecked = editCredAccessModules.includes(mod.id);
                                    return (
                                      <label
                                        key={mod.id}
                                        onClick={() => {
                                          setEditCredPermissionPreset("custom");
                                          if (isChecked) {
                                            setEditCredAccessModules(editCredAccessModules.filter((m) => m !== mod.id));
                                          } else {
                                            setEditCredAccessModules([...editCredAccessModules, mod.id]);
                                          }
                                        }}
                                        className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer select-none transition-all ${
                                          isChecked
                                            ? mod.isConfidential
                                              ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-200 font-medium"
                                              : "bg-cyan-500/15 border-cyan-500/40 text-cyan-200 font-medium"
                                            : "bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05]"
                                        }`}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={isChecked}
                                          onChange={() => {}}
                                          className="rounded border-white/20 bg-slate-900 text-cyan-500 focus:ring-0 w-3.5 h-3.5"
                                        />
                                        <span className="text-[11px] truncate">{mod.label}</span>
                                      </label>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                              <button
                                type="button"
                                onClick={() => setEditingEmployeeCreds(null)}
                                className="px-3.5 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white bg-white/5"
                              >
                                বাতিল
                              </button>
                              <button
                                type="submit"
                                className={`px-4 py-1.5 rounded-xl text-xs font-semibold ${theme.accentBtn}`}
                              >
                                পরিবর্তন সেভ করুন
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}

                    {/* 📜 Lifetime Salary History Modal */}
                    {viewingSalaryHistoryEmp && (
                      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
                        <div
                          onClick={() => setViewingSalaryHistoryEmp(null)}
                          className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
                        />
                        <div className="relative z-10 w-full max-w-2xl bg-[#070E1E] border border-cyan-500/30 rounded-2xl p-5 sm:p-6 shadow-2xl text-white animate-in zoom-in-95 duration-200">
                          <div className="flex items-center justify-between pb-3 border-b border-white/10">
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                                <Receipt className="w-5 h-5" />
                              </div>
                              <div>
                                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                                  <span>{viewingSalaryHistoryEmp.name}</span>
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-normal">
                                    {viewingSalaryHistoryEmp.role}
                                  </span>
                                </h3>
                                <p className="text-[11px] text-slate-400">
                                  প্রতিষ্ঠানে যোগদানের পর থেকে আজীবনের মোট বেতন ও পারিশ্রমিক হিসাব
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => setViewingSalaryHistoryEmp(null)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Summary Cards */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                              <div className="text-[10px] text-slate-400 uppercase font-semibold">যোগদানের তারিখ</div>
                              <div className="text-xs font-bold text-slate-100 mt-1 flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                                <span>{viewingSalaryHistoryEmp.joinDate || "01 Jan 2024"}</span>
                              </div>
                              <div className="text-[10px] text-cyan-400 font-mono mt-0.5">
                                {getEmployeeTenure(viewingSalaryHistoryEmp.joinDate)}
                              </div>
                            </div>

                            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                              <div className="text-[10px] text-slate-400 uppercase font-semibold">মাসিক নিয়মিত বেতন</div>
                              <div className="text-sm font-black text-emerald-400 mt-1 font-mono">
                                ৳ {viewingSalaryHistoryEmp.salary.toLocaleString()}
                              </div>
                              <div className="text-[10px] text-slate-400 mt-0.5">প্রতি মাসের চুক্তি</div>
                            </div>

                            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                              <div className="text-[10px] text-cyan-300 uppercase font-bold">আজীবনের মোট পরিশোধিত বেতন</div>
                              <div className="text-base font-black text-cyan-300 mt-1 font-mono">
                                ৳ {getEmployeeLifetimeSalary(viewingSalaryHistoryEmp).toLocaleString()}
                              </div>
                              <div className="text-[10px] text-cyan-400/80 mt-0.5">
                                {salaries.filter((s) => (s.employeeId === viewingSalaryHistoryEmp.id || s.employeeName.trim().toLowerCase() === viewingSalaryHistoryEmp.name.trim().toLowerCase()) && s.status === "Paid").length} টি সফল ডিস্ট্রিবিউশন
                              </div>
                            </div>
                          </div>

                          {/* Salary Disbursement History Table */}
                          <div className="space-y-2">
                            <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                              <span>মাসভিত্তিক বিতরণ রেকর্ড (Disbursed Payroll Records)</span>
                              <span className="text-[10px] text-slate-400">সর্বশেষ মাসগুলো ক্রমানুসারে</span>
                            </div>
                            <div className="rounded-xl border border-white/10 overflow-hidden max-h-60 overflow-y-auto">
                              <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                  <tr className="bg-white/5 border-b border-white/10 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                    <th className="p-2.5">মাস (Month)</th>
                                    <th className="p-2.5">ডিপার্টমেন্ট</th>
                                    <th className="p-2.5">পরিমাণ (BDT)</th>
                                    <th className="p-2.5">পরিশোধের তারিখ</th>
                                    <th className="p-2.5 text-right">স্ট্যাটাস</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                  {salaries
                                    .filter(
                                      (s) =>
                                        s.employeeId === viewingSalaryHistoryEmp.id ||
                                        s.employeeName.trim().toLowerCase() === viewingSalaryHistoryEmp.name.trim().toLowerCase()
                                    )
                                    .map((s) => (
                                      <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="p-2.5 font-mono font-bold text-white">{s.month}</td>
                                        <td className="p-2.5 text-slate-300">{s.department}</td>
                                        <td className="p-2.5 font-mono font-bold text-emerald-400">
                                          ৳ {s.amount.toLocaleString()}
                                        </td>
                                        <td className="p-2.5 font-mono text-[11px] text-slate-400">
                                          {s.paidDate || s.month}
                                        </td>
                                        <td className="p-2.5 text-right">
                                          {s.status === "Paid" ? (
                                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                              ✓ DISBURSED
                                            </span>
                                          ) : (
                                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                              PENDING
                                            </span>
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  {salaries.filter(
                                    (s) =>
                                      s.employeeId === viewingSalaryHistoryEmp.id ||
                                      s.employeeName.trim().toLowerCase() === viewingSalaryHistoryEmp.name.trim().toLowerCase()
                                  ).length === 0 && (
                                    <tr>
                                      <td colSpan={5} className="p-4 text-center text-slate-500 text-xs">
                                        কোনো বেতনের রেকর্ড পাওয়া যায়নি।
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 pt-4 mt-4 border-t border-white/10">
                            <button
                              type="button"
                              onClick={() => setViewingSalaryHistoryEmp(null)}
                              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 transition-colors"
                            >
                              বন্ধ করুন
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 5. DEPARTMENTS */}
                {activePage === "departments" && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Agency Departments & Desks</h1>
                        <p className={`text-xs ${theme.textMuted}`}>
                          Specialized operational divisions executing client deliverables with dedicated leadership
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        {
                          name: "Web & Tech Engineering",
                          bnName: "ওয়েব ও টেক ইঞ্জিনিয়ারিং",
                          lead: "Tariqul Islam (Tech Lead)",
                          count: "3 Engineers",
                          budget: "৳ 1,45,000",
                          activeProjects: "5 Active Web & LMS Portals",
                          scope: "Next.js • Madrasa Portal • Cloud Systems",
                          icon: Code2,
                          iconContainer:
                            "bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-indigo-600/10 border-cyan-400/40 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)]",
                          pillBg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
                        },
                        {
                          name: "Video & 3D Animation",
                          bnName: "ভিডিও ও ৩ডি অ্যানিমেশন",
                          lead: "Sayed Mahmud (Video Director)",
                          count: "2 Editors & Animators",
                          budget: "৳ 90,000",
                          activeProjects: "8 Commercial Video Cuts",
                          scope: "4K Video Ads • 3D Motion • Viral Reels",
                          icon: Clapperboard,
                          iconContainer:
                            "bg-gradient-to-br from-purple-500/20 via-fuchsia-600/20 to-pink-600/10 border-purple-400/40 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.25)]",
                          pillBg: "bg-purple-500/10 border-purple-500/30 text-purple-300",
                        },
                        {
                          name: "Creative & Model Production",
                          bnName: "মডেল ও ক্রিয়েটিভ প্রোডাকশন",
                          lead: "Nabila Tabassum (Art Director)",
                          count: "2 Producers",
                          budget: "৳ 85,000",
                          activeProjects: "3 Studio Shoots Scheduled",
                          scope: "Live Model Shoots • Islamic Art • Branding",
                          icon: Camera,
                          iconContainer:
                            "bg-gradient-to-br from-rose-500/20 via-pink-600/20 to-amber-500/10 border-rose-400/40 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.25)]",
                          pillBg: "bg-rose-500/10 border-rose-500/30 text-rose-300",
                        },
                        {
                          name: "Performance Marketing & Ads",
                          bnName: "পারফরম্যান্স মার্কেটিং ও এডস",
                          lead: "Abu Tawfiq (Marketing Lead)",
                          count: "2 Specialists",
                          budget: "৳ 75,000",
                          activeProjects: "12 Meta & Google Campaigns",
                          scope: "High ROAS Funnels • Targeted Enrollment",
                          icon: Target,
                          iconContainer:
                            "bg-gradient-to-br from-amber-500/20 via-orange-600/20 to-yellow-500/10 border-amber-400/40 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)]",
                          pillBg: "bg-amber-500/10 border-amber-500/30 text-amber-300",
                        },
                        {
                          name: "Finance & Accounts",
                          bnName: "ফাইন্যান্স ও একাউন্টস",
                          lead: "Karim Chowdhury (Finance Officer)",
                          count: "1 Officer",
                          budget: "৳ 38,000",
                          activeProjects: "Daily Invoicing & Payroll P&L",
                          scope: "Invoice Dispatch • Gateway Sync • P&L",
                          icon: Coins,
                          iconContainer:
                            "bg-gradient-to-br from-emerald-500/20 via-teal-600/20 to-cyan-600/10 border-emerald-400/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.25)]",
                          pillBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
                        },
                        {
                          name: "Other Services & Custom Operations",
                          bnName: "অন্যান্য সেবা ও বিশেষ অপারেশন",
                          lead: "Abu Tawfiq / Assigned Lead",
                          count: "On-Demand Team",
                          budget: "প্রজেক্ট ভিত্তিক",
                          activeProjects: "বিশেষ ক্লায়েন্ট রিকোয়ারমেন্ট",
                          scope: "কাস্টম কনসাল্টেন্সি • স্পেশাল আইটি ও মিডিয়া • বুস্টিং ক্যাম্পেইন",
                          icon: Layers,
                          iconContainer:
                            "bg-gradient-to-br from-indigo-500/20 via-sky-600/20 to-blue-600/10 border-indigo-400/40 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.25)]",
                          pillBg: "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
                        },
                      ].map((dept, i) => (
                        <div
                          key={i}
                          className={`p-6 rounded-3xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm space-y-4 hover:border-white/20 transition-all duration-300 group relative overflow-hidden`}
                        >
                          {/* Ambient background glow */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500" />

                          {/* Header row with luxury icon & count pill */}
                          <div className="flex items-center justify-between relative z-10">
                            <div
                              className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${dept.iconContainer}`}
                            >
                              <dept.icon className="w-6 h-6 stroke-[2.2]" />
                            </div>

                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border flex items-center gap-1.5 ${dept.pillBg}`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span>{dept.count}</span>
                            </span>
                          </div>

                          {/* Department Title & Scope */}
                          <div className="space-y-1 relative z-10">
                            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">
                              {dept.bnName}
                            </div>
                            <h3 className="font-black text-base text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                              {dept.name}
                            </h3>
                            <p className="text-[11px] text-slate-400 font-mono">{dept.scope}</p>
                          </div>

                          {/* Lead & Project metrics */}
                          <div className="pt-3 border-t border-white/5 space-y-2 text-xs relative z-10">
                            <div className="flex justify-between items-center text-slate-300">
                              <span className="text-slate-500 text-[11px]">Department Lead</span>
                              <span className="font-semibold text-slate-200">{dept.lead}</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-300">
                              <span className="text-slate-500 text-[11px]">Active Operations</span>
                              <span className="font-mono text-cyan-400 font-semibold">
                                {dept.activeProjects}
                              </span>
                            </div>
                            {isSuperAdmin && (
                              <div className="flex justify-between items-center pt-2 border-t border-white/5 font-mono">
                                <span className="text-slate-500 text-[11px]">Monthly Budget</span>
                                <span className="font-bold text-white text-xs">{dept.budget}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ========================================================================
                    6. ⭐️ FINANCE DEPARTMENT (টাকার পূর্ণাঙ্গ হিসাব - শুধুমাত্র সুপার অ্যাডমিন) ⭐️
                   ======================================================================== */}
                {(activePage === "finance" || activePage === "payments" || activePage === "expenses" || activePage === "salary" || activePage === "reports") && (
                  !(isSuperAdmin || hasAnyFinanceAccess) ? (
                    <div className="p-8 sm:p-12 text-center rounded-3xl border border-rose-500/20 bg-rose-950/20 max-w-xl mx-auto my-12 backdrop-blur-md shadow-2xl animate-in fade-in duration-200">
                      <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-500/30 shadow-lg">
                        <Lock className="w-8 h-8 text-rose-400" />
                      </div>
                      <h2 className="text-xl font-bold text-white mb-2">গোপনীয় ফাইন্যান্স ডিপার্টমেন্ট (Access Restricted)</h2>
                      <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                        অর্থ ও অ্যাকাউন্টিং মডিউলটি শুধুমাত্র ThumbStop এজেন্সির সুপার অ্যাডমিনের জন্য সংরক্ষিত। আপনি বর্তমানে <span className="text-white font-semibold font-mono">[{actingRole.toUpperCase()}]</span> রোলে আছেন। এই বিভাগটি দেখতে অনুগ্রহ করে সুপার অ্যাডমিন প্রোফাইলে স্যুইচ করুন।
                      </p>
                      <button
                        onClick={() => handleProfileChange("super_admin")}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg transition-all"
                      >
                        সুপার অ্যাডমিন প্রোফাইলে স্যুইচ করুন
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      {/* Top Header */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              <Receipt className="w-4 h-4" />
                            </span>
                            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                              Finance & Accounts Department
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] border border-emerald-500/30 font-bold flex items-center gap-1">
                              <Lock className="w-3 h-3 text-emerald-400" />
                              <span>Confidential (Super Admin Only)</span>
                            </span>
                          </div>
                          <h1 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                            টাকা-পয়সার পূর্ণাঙ্গ হিসাব ও বাণিজ্যিক লেজার (৳)
                          </h1>
                          <p className={`text-xs ${theme.textMuted}`}>
                            ক্লায়েন্টদের থেকে সংগৃহীত মোট টাকা, প্রজেক্ট বাবদ খরচ ও বর্তমান এজেন্সির নেট উদ্বৃত্ত ব্যালেন্স
                          </p>
                        </div>

                        {/* Top Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <button
                            onClick={() => setShowFinanceStatementModal(true)}
                            className="px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 shadow-sm transition-all"
                            title="সম্পূর্ণ অডিট ও ব্যালেন্স বিবরণী প্রিন্ট বা সেভ করুন"
                          >
                            <FileText className="w-3.5 h-3.5 text-cyan-400" />
                            <span>ফাইন্যান্সিয়াল স্টেটমেন্ট (PDF/Print)</span>
                          </button>

                          <button
                            onClick={() => {
                              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportData());
                              const dl = document.createElement("a");
                              dl.setAttribute("href", dataStr);
                              dl.setAttribute("download", `thumbstop-finance-statement-${Date.now()}.json`);
                              document.body.appendChild(dl);
                              dl.click();
                              dl.remove();
                              showToast("ফাইন্যান্সিয়াল স্টেটমেন্ট ডাউনলোড সম্পন্ন হয়েছে!");
                            }}
                            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border ${theme.secondaryBtn}`}
                          >
                            <Download className="w-3.5 h-3.5 text-slate-400" />
                            <span>এক্সপোর্ট স্টেটমেন্ট</span>
                          </button>

                          <button
                            onClick={() => {
                              setModalType("payment");
                              setPaymentSearchQuery("");
                              setSelectedPaymentClient(null);
                            }}
                            className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 transition-all"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>＋ রেকর্ড পেমেন্ট</span>
                          </button>

                          <button
                            onClick={() => {
                              setModalType("expense");
                              setFormExpenseDate(liveDateFormatted);
                            }}
                            className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition-all"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>＋ খরচ যোগ করুন</span>
                          </button>
                        </div>
                      </div>

                      {/* 🎛️ Dynamic Multi-Filter System Bar (মাস, সার্ভিস খাত, গেটওয়ে ও ব্যয়ের ক্যাটাগরি ফিল্টার) */}
                      <div className={`p-4 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm space-y-3`}>
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                          <div className="flex items-center gap-2">
                            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                            <span className="text-xs font-bold text-white uppercase tracking-wider">
                              ফাইন্যান্সিয়াল ফিল্টার ও কাস্টম অডিট কন্ট্রোল
                            </span>
                            {(financeMonthFilter !== "all" || financeSectorFilter !== "all" || financeGatewayFilter !== "all" || financeExpenseCategoryFilter !== "all") && (
                              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/30">
                                ফিল্টার সক্রিয়
                              </span>
                            )}
                          </div>

                          {(financeMonthFilter !== "all" || financeSectorFilter !== "all" || financeGatewayFilter !== "all" || financeExpenseCategoryFilter !== "all") && (
                            <button
                              onClick={() => {
                                setFinanceMonthFilter("all");
                                setFinanceSectorFilter("all");
                                setFinanceGatewayFilter("all");
                                setFinanceExpenseCategoryFilter("all");
                                setFinanceTimeframe("all");
                              }}
                              className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold underline transition-colors"
                            >
                              <X className="w-3 h-3" />
                              <span>সকল ফিল্টার রিসেট করুন</span>
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {/* 1. Month Filter */}
                          <div>
                            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-cyan-400" />
                              <span>মাস নির্বাচন (Month)</span>
                            </label>
                            <select
                              value={financeMonthFilter}
                              onChange={(e) => setFinanceMonthFilter(e.target.value)}
                              className={`w-full px-3 py-2 rounded-xl text-xs font-bold ${isDark ? "bg-[#0A162B] border-cyan-500/30 text-cyan-200" : "bg-slate-50 border-slate-300 text-slate-800"} border focus:outline-none`}
                            >
                              <option value="all" className="bg-slate-900 text-white">সব মাস (All Months)</option>
                              {availableFinanceMonths.map((m) => (
                                <option key={m} value={m} className="bg-slate-900 text-white">
                                  {m}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* 2. Revenue Sector Filter */}
                          <div>
                            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1 flex items-center gap-1">
                              <Coins className="w-3 h-3 text-emerald-400" />
                              <span>আয়ের খাত / সার্ভিস (Sector)</span>
                            </label>
                            <select
                              value={financeSectorFilter}
                              onChange={(e) => setFinanceSectorFilter(e.target.value)}
                              className={`w-full px-3 py-2 rounded-xl text-xs font-bold ${isDark ? "bg-[#0A162B] border-emerald-500/30 text-emerald-300" : "bg-slate-50 border-slate-300 text-slate-800"} border focus:outline-none`}
                            >
                              <option value="all" className="bg-slate-900 text-white">সকল আয়ের খাত (All Sectors)</option>
                              {availableFinanceSectors.map((sec) => (
                                <option key={sec} value={sec} className="bg-slate-900 text-white">
                                  {sec}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* 3. Payment Gateway Filter */}
                          <div>
                            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1 flex items-center gap-1">
                              <Wallet className="w-3 h-3 text-amber-400" />
                              <span>পেমেন্ট গেটওয়ে (Gateway)</span>
                            </label>
                            <select
                              value={financeGatewayFilter}
                              onChange={(e) => setFinanceGatewayFilter(e.target.value)}
                              className={`w-full px-3 py-2 rounded-xl text-xs font-bold ${isDark ? "bg-[#0A162B] border-amber-500/30 text-amber-300" : "bg-slate-50 border-slate-300 text-slate-800"} border focus:outline-none`}
                            >
                              <option value="all" className="bg-slate-900 text-white">সকল গেটওয়ে (All Methods)</option>
                              <option value="bKash Merchant" className="bg-slate-900 text-white">bKash Merchant</option>
                              <option value="Nagad Personal" className="bg-slate-900 text-white">Nagad Personal</option>
                              <option value="Rocket" className="bg-slate-900 text-white">Rocket</option>
                              <option value="Bank Wire" className="bg-slate-900 text-white">Bank Wire / Transfer</option>
                              <option value="Cash" className="bg-slate-900 text-white">Cash / নগদ</option>
                            </select>
                          </div>

                          {/* 4. Expense Category Filter */}
                          <div>
                            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1 flex items-center gap-1">
                              <TrendingDown className="w-3 h-3 text-rose-400" />
                              <span>ব্যয়ের খাত (Expense Category)</span>
                            </label>
                            <select
                              value={financeExpenseCategoryFilter}
                              onChange={(e) => setFinanceExpenseCategoryFilter(e.target.value)}
                              className={`w-full px-3 py-2 rounded-xl text-xs font-bold ${isDark ? "bg-[#0A162B] border-rose-500/30 text-rose-300" : "bg-slate-50 border-slate-300 text-slate-800"} border focus:outline-none`}
                            >
                              <option value="all" className="bg-slate-900 text-white">সকল ব্যয়ের খাত (All Categories)</option>
                              <option value="Salaries" className="bg-slate-900 text-white">Salaries (বেতন)</option>
                              <option value="Office Rent" className="bg-slate-900 text-white">Office Rent (অফিস ভাড়া)</option>
                              <option value="Marketing" className="bg-slate-900 text-white">Marketing & Ads (বিজ্ঞাপন)</option>
                              <option value="Software & Tools" className="bg-slate-900 text-white">Software & Cloud (টুলস)</option>
                              <option value="Equipment" className="bg-slate-900 text-white">Equipment (যন্ত্রপাতি)</option>
                              <option value="Utilities" className="bg-slate-900 text-white">Utilities & Internet</option>
                              <option value="Entertainment" className="bg-slate-900 text-white">Team Bonus & Treats</option>
                              <option value="Miscellaneous" className="bg-slate-900 text-white">Miscellaneous (অন্যান্য)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* ⭐️ 4 Hero Financial Metric Cards (টোটাল কত টাকা আছে, কত টাকা মাইনাস হইছে, নেট ব্যালেন্স) ⭐️ */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* 1. টোটাল কত টাকা আয় হলো */}
                        <div className={`p-5 rounded-2xl border ${theme.cardBg} border-emerald-500/30 shadow-lg relative overflow-hidden group hover:border-emerald-500/50 transition-all`}>
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-emerald-400/90 uppercase tracking-wider">
                              মোট আয় (Total Inflow)
                            </span>
                            <span className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-bold flex items-center gap-1">
                              <Coins className="w-3.5 h-3.5 text-emerald-400" />
                              <span>জমা</span>
                            </span>
                          </div>
                          <div className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? "text-slate-100" : "text-slate-900"} font-mono`}>
                            ৳ {totalRevenue.toLocaleString()}
                          </div>
                          <div className="text-[11px] text-emerald-400/80 mt-1.5 flex items-center gap-1.5 font-medium">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span>{filteredPayments.length}টি পেমেন্ট রেকর্ড অন্তর্ভুক্ত</span>
                          </div>
                        </div>

                        {/* 2. টোটাল কত টাকা ব্যয় হলো */}
                        <div className={`p-5 rounded-2xl border ${theme.cardBg} border-rose-500/30 shadow-lg relative overflow-hidden group hover:border-rose-500/50 transition-all`}>
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-600" />
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-rose-400/90 uppercase tracking-wider">
                              মোট ব্যয় (Total Outflow)
                            </span>
                            <span className="p-1.5 rounded-lg bg-rose-500/15 text-rose-400 text-xs font-bold flex items-center gap-1">
                              <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                              <span>খরচ</span>
                            </span>
                          </div>
                          <div className="text-2xl sm:text-3xl font-black tracking-tight text-rose-400 font-mono">
                            - ৳ {totalExpenses.toLocaleString()}
                          </div>
                          <div className="text-[11px] text-rose-400/80 mt-1.5 flex items-center gap-1.5 font-medium">
                            <AlertCircle className="w-3 h-3 text-rose-400 shrink-0" />
                            <span>{filteredExpenses.length}টি খরচ ও পরিচালন ব্যয়</span>
                          </div>
                        </div>

                        {/* 3. লাইভ কারেন্ট ব্যালেন্স (যদি টাকা নাই / লোনে থাকি -> মাইনাস ফিগার ও সতর্কবার্তা) */}
                        {isDeficit ? (
                          <div className="p-5 rounded-2xl border border-rose-500/80 bg-gradient-to-br from-rose-950/40 to-red-950/30 shadow-xl shadow-rose-500/20 ring-2 ring-rose-500/50 relative overflow-hidden group transition-all">
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 animate-pulse" />
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                                <span>ঘাটতি / ঋণ ব্যালেন্স</span>
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30 flex items-center gap-1">
                                ⚠️ লোনে / ধারের ব্যালেন্স
                              </span>
                            </div>
                            <div className="text-2xl sm:text-3xl font-black tracking-tight text-rose-400 font-mono">
                              - ৳ {Math.abs(netProfit).toLocaleString()}
                            </div>
                            <div className="text-[11px] text-rose-300/90 mt-1.5 flex items-center gap-1 font-semibold">
                              <span>⚠️ বর্তমানে প্রতিষ্ঠানে ক্যাশ ঘাটতি রয়েছে</span>
                            </div>
                          </div>
                        ) : (
                          <div className={`p-5 rounded-2xl border ${theme.cardBg} border-cyan-500/30 shadow-lg relative overflow-hidden group hover:border-cyan-500/50 transition-all`}>
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-emerald-500" />
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-semibold text-cyan-400/90 uppercase tracking-wider">
                                বর্তমান সঞ্চয় তহবিল (Net Reserves)
                              </span>
                              <span className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-400 text-xs font-bold flex items-center gap-1">
                                <Wallet className="w-3.5 h-3.5 text-cyan-400" />
                                <span>উদ্বৃত্ত</span>
                              </span>
                            </div>
                            <div className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? "text-cyan-300" : "text-emerald-600"} font-mono`}>
                              + ৳ {netProfit.toLocaleString()}
                            </div>
                            <div className="text-[11px] text-cyan-400/80 mt-1.5 flex items-center gap-1 font-medium">
                              <span>সঞ্চয় উদ্বৃত্ত • মার্জিন: {totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0}%</span>
                            </div>
                          </div>
                        )}

                        {/* 4. ক্লায়েন্ট কমার্শিয়াল অ্যাকাউন্ট */}
                        <div className={`p-5 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-lg relative overflow-hidden group hover:border-amber-500/50 transition-all`}>
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-amber-400/90 uppercase tracking-wider">
                              ক্লায়েন্ট অ্যাকাউন্টস
                            </span>
                            <span className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 text-xs font-bold flex items-center gap-1">
                              <Users className="w-3.5 h-3.5 text-amber-400" />
                              <span>ক্লায়েন্ট</span>
                            </span>
                          </div>
                          <div className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? "text-slate-100" : "text-slate-900"} font-mono`}>
                            {clients.length} টি
                          </div>
                          <div className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"} mt-1.5 flex items-center gap-1 font-medium`}>
                            <span>bKash, Nagad, Rocket ও ব্যাংক ট্রান্সফার</span>
                          </div>
                        </div>
                      </div>

                      {/* 🎯 Sector Revenue Breakdown Widget (আলাদা আলাদা কোন খাত থেকে কত টাকা আয় হয়েছে) */}
                      <div className={`p-5 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm space-y-3`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Coins className="w-4 h-4 text-emerald-400" />
                            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                              খাতভিত্তিক আয় ও রেভিনিউ বিবরণী (Revenue by Sector)
                            </h3>
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">
                            মোট খাত: {sectorBreakdown.length} টি
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {sectorBreakdown.map((sb) => {
                            const isSelected = financeSectorFilter === sb.sector;
                            return (
                              <div
                                key={sb.sector}
                                onClick={() => setFinanceSectorFilter(isSelected ? "all" : sb.sector)}
                                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                                  isSelected
                                    ? "bg-emerald-500/20 border-emerald-500/60 ring-1 ring-emerald-500/40"
                                    : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="text-[11px] font-bold text-slate-200 truncate pr-2">
                                    {sb.sector}
                                  </span>
                                  <span className="text-[10px] font-mono font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                                    {sb.percentage}%
                                  </span>
                                </div>
                                <div className="text-base font-black font-mono text-emerald-400 mb-1">
                                  ৳ {sb.total.toLocaleString()}
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-slate-400">
                                  <span>{sb.count}টি পেমেন্ট লেনদেন</span>
                                  <span className="text-cyan-400 font-semibold">{isSelected ? "✓ নির্বাচিত" : "ফিল্টার করুন →"}</span>
                                </div>
                                <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                                    style={{ width: `${Math.min(100, sb.percentage)}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* 🗓️ Monthly Income vs Expense Ledger Table (মান্থলি কত টাকা ইনকাম ও খরচ হয়েছে) */}
                      <div className={`p-5 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm space-y-3`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-cyan-400" />
                            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                              মাসভিত্তিক আয় বনাম ব্যয় লেজার (Monthly Income vs Expense Ledger)
                            </h3>
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {monthlyAnalytics.length}টি মাসের তুলনা
                          </span>
                        </div>

                        <div className="rounded-xl border border-white/5 overflow-hidden">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className={`border-b border-white/5 ${theme.tableHeaderBg} text-[11px] font-semibold text-slate-400 uppercase tracking-wider`}>
                                <th className="p-3">মাস (Month)</th>
                                <th className="p-3">মোট আয় (Inflow)</th>
                                <th className="p-3">মোট ব্যয় (Outflow)</th>
                                <th className="p-3">নিট উদ্বৃত্ত / ঘাটতি (Net)</th>
                                <th className="p-3">মার্জিন (%)</th>
                                <th className="p-3 text-right">অ্যাকশন</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 font-mono">
                              {monthlyAnalytics.map((ma) => (
                                <tr key={ma.month} className={`hover:bg-white/[0.02] transition-colors ${financeMonthFilter === ma.month ? "bg-cyan-500/10" : ""}`}>
                                  <td className="p-3 font-bold text-white font-sans flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                                    <span>{ma.month}</span>
                                    {financeMonthFilter === ma.month && (
                                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-cyan-500/20 text-cyan-300 font-bold">
                                        সক্রিয় ফিল্টার
                                      </span>
                                    )}
                                  </td>
                                  <td className="p-3 text-emerald-400 font-bold">
                                    ৳ {ma.income.toLocaleString()}
                                  </td>
                                  <td className="p-3 text-rose-400 font-bold">
                                    - ৳ {ma.expense.toLocaleString()}
                                  </td>
                                  <td className="p-3">
                                    {ma.isDeficit ? (
                                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1 w-fit">
                                        <AlertTriangle className="w-3 h-3 text-rose-400" />
                                        <span>ঘাটতি / ঋণ - ৳ {Math.abs(ma.net).toLocaleString()}</span>
                                      </span>
                                    ) : (
                                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 w-fit">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                        <span>উদ্বৃত্ত + ৳ {ma.net.toLocaleString()}</span>
                                      </span>
                                    )}
                                  </td>
                                  <td className="p-3 text-slate-300">
                                    {ma.margin}%
                                  </td>
                                  <td className="p-3 text-right">
                                    <button
                                      type="button"
                                      onClick={() => setFinanceMonthFilter(financeMonthFilter === ma.month ? "all" : ma.month)}
                                      className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[10px] font-sans font-semibold transition-colors"
                                    >
                                      {financeMonthFilter === ma.month ? "রিসেট ফিল্টার" : "এই মাসের হিসাব"}
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* ⭐️ Navigation Sub-Tabs inside Finance Department ⭐️ */}
                      <div className={`flex items-center gap-2 border-b ${isDark ? "border-white/10" : "border-slate-200"} pb-3 overflow-x-auto scrollbar-none`}>
                        {[
                          { id: "payments", label: "পেমেন্ট ও রাজস্ব (Inflow)", icon: Receipt, count: filteredPayments.length },
                          { id: "expenses", label: "ব্যয় ও পরিচালনা খরচ (Outflow)", icon: CreditCard, count: filteredExpenses.length },
                          { id: "salary", label: "টিম পে-রোল (Salaries)", icon: Wallet, count: salaries.length },
                          { id: "reports", label: "আর্থিক বিবরণী ও অডিট (P&L)", icon: BarChart3 },
                        ].map((st) => {
                          const Icon = st.icon;
                          const isActive = financeSubTab === st.id;
                          return (
                            <button
                              key={st.id}
                              onClick={() => {
                                setFinanceSubTab(st.id as any);
                                setActivePage(st.id as any);
                              }}
                              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
                                isActive
                                  ? "bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-500/20"
                                  : isDark
                                  ? "text-slate-400 hover:text-white hover:bg-white/5"
                                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              <span>{st.label}</span>
                              {st.count !== undefined && (
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                                  isActive ? "bg-white/20 text-white font-bold" : isDark ? "bg-white/5 text-slate-400" : "bg-slate-100 text-slate-600"
                                }`}>
                                  {st.count}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* 💰 Sub-Tab 1: Payments & Receipts */}
                      {financeSubTab === "payments" && (
                        <div className="space-y-3">
                          <div className={`flex items-center justify-between text-xs ${isDark ? "text-slate-400" : "text-slate-600"} px-1`}>
                            <span>ক্লায়েন্টদের থেকে সংগৃহীত বাণিজ্যিক পেমেন্ট তালিকা</span>
                            <span className="font-mono text-emerald-500 font-bold">মোট জমা: ৳ {totalRevenue.toLocaleString()}</span>
                          </div>
                          <div className={`rounded-2xl border overflow-hidden ${theme.cardBg} ${theme.cardBorder} shadow-sm`}>
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                  <tr className={`border-b ${isDark ? "border-white/5 text-slate-400" : "border-slate-200 text-slate-600"} ${theme.tableHeaderBg} text-[11px] font-semibold uppercase tracking-wider`}>
                                    <th className="p-3.5">Client</th>
                                    <th className="p-3.5">Service</th>
                                    <th className="p-3.5">Gateway</th>
                                    <th className="p-3.5">Transaction ID</th>
                                    <th className="p-3.5">Amount (BDT)</th>
                                    <th className="p-3.5">Date</th>
                                    <th className="p-3.5 text-right">Status</th>
                                  </tr>
                                </thead>
                                <tbody className={`divide-y ${isDark ? "divide-white/5" : "divide-slate-200/80"}`}>
                                  {filteredPayments.map((p) => (
                                    <tr key={p.id} className={`transition-colors ${theme.rowHover}`}>
                                      <td className={`p-3.5 font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>{p.clientName}</td>
                                      <td className={`p-3.5 ${isDark ? "text-slate-300" : "text-slate-600"}`}>{p.serviceName}</td>
                                      <td className="p-3.5">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                                          p.method === "bKash"
                                            ? "bg-pink-500/20 text-pink-400"
                                            : p.method === "Nagad"
                                            ? "bg-orange-500/20 text-orange-400"
                                            : p.method === "Rocket"
                                            ? "bg-purple-500/20 text-purple-400"
                                            : "bg-blue-500/20 text-blue-400"
                                        }`}>
                                          {p.method}
                                        </span>
                                      </td>
                                      <td className="p-3.5 font-mono text-slate-400 text-[10px]">{p.transactionId}</td>
                                      <td className="p-3.5 font-mono font-bold text-emerald-400">
                                        ৳ {p.amount.toLocaleString()}
                                      </td>
                                      <td className="p-3.5 text-slate-400 font-mono text-[10px]">{p.date}</td>
                                      <td className="p-3.5 text-right">
                                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                                          {p.status}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 📉 Sub-Tab 2: Expenses & Disbursals */}
                      {financeSubTab === "expenses" && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                            <span>এজেন্সির অফিস, সফটওয়্যার ও অন্যান্য পরিচালন ব্যয় (মাইনাস)</span>
                            <span className="font-mono text-rose-400 font-bold">মোট খরচ: - ৳ {totalExpenses.toLocaleString()}</span>
                          </div>
                          <div className={`rounded-2xl border overflow-hidden ${theme.cardBg} ${theme.cardBorder} shadow-sm`}>
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                  <tr className={`border-b border-white/5 ${theme.tableHeaderBg} text-[11px] font-semibold text-slate-400 uppercase tracking-wider`}>
                                    <th className="p-3.5">Category</th>
                                    <th className="p-3.5">Description</th>
                                    <th className="p-3.5">Method</th>
                                    <th className="p-3.5">Expense Date (তারিখ)</th>
                                    <th className="p-3.5 text-right">Amount</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                  {filteredExpenses.map((exp) => (
                                    <tr key={exp.id} className={`transition-colors ${theme.rowHover}`}>
                                      <td className="p-3.5">
                                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-rose-500/10 text-rose-400">
                                          {exp.category}
                                        </span>
                                      </td>
                                      <td className={`p-3.5 font-medium ${isDark ? "text-white" : "text-slate-900"}`}>{exp.description}</td>
                                      <td className="p-3.5 text-slate-400 font-mono text-[10px]">{exp.paymentMethod}</td>
                                      <td className="p-3.5">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-xs font-semibold ${
                                          isDark ? "bg-white/[0.04] border border-white/10 text-slate-200" : "bg-slate-100 border border-slate-200 text-slate-700"
                                        }`}>
                                          <Calendar className="w-3 h-3 text-cyan-400" />
                                          {exp.date}
                                        </span>
                                      </td>
                                      <td className="p-3.5 text-right font-mono font-bold text-rose-400">
                                        ৳ {exp.amount.toLocaleString()}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 💼 Sub-Tab 3: Team Salaries */}
                      {financeSubTab === "salary" && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                            <span>কর্মকর্তাদের মাসিক বেতন, যোগদানের তারিখ ও আজীবনের পরিশোধিত স্যালারি তালিকা</span>
                            <span className="font-mono text-cyan-400">সক্রিয় পে-রোল ও হিস্ট্রি</span>
                          </div>
                          <div className={`rounded-2xl border overflow-hidden ${theme.cardBg} ${theme.cardBorder} shadow-sm`}>
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                  <tr className={`border-b ${isDark ? "border-white/5" : "border-slate-200"} ${theme.tableHeaderBg} text-[11px] font-semibold text-slate-400 uppercase tracking-wider`}>
                                    <th className="p-3.5">Employee</th>
                                    <th className="p-3.5">Department</th>
                                    <th className="p-3.5">যোগদানের তারিখ</th>
                                    <th className="p-3.5">Month</th>
                                    <th className="p-3.5">Amount (BDT)</th>
                                    <th className="p-3.5">আজীবনের মোট স্যালারি</th>
                                    <th className="p-3.5 text-right">Status</th>
                                  </tr>
                                </thead>
                                <tbody className={`divide-y ${isDark ? "divide-white/5" : "divide-slate-200"}`}>
                                  {salaries.map((s) => {
                                    const matchingEmp = employees.find(
                                      (e) => e.id === s.employeeId || e.name.trim().toLowerCase() === s.employeeName.trim().toLowerCase()
                                    );
                                    const lifetimeSalary = matchingEmp ? getEmployeeLifetimeSalary(matchingEmp) : s.amount;
                                    const joinDate = matchingEmp?.joinDate || "01 Jan 2024";

                                    return (
                                      <tr key={s.id} className={`transition-colors ${theme.rowHover}`}>
                                        <td className={`p-3.5 font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{s.employeeName}</td>
                                        <td className="p-3.5 text-slate-400">{s.department}</td>
                                        <td className="p-3.5">
                                          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-300">
                                            <Calendar className="w-3 h-3 text-cyan-400" />
                                            <span>{joinDate}</span>
                                          </div>
                                        </td>
                                        <td className={`p-3.5 font-mono text-[11px] ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                                          <div>{s.month}</div>
                                          {s.paidDate && (
                                            <div className="text-[10px] text-slate-500">পরিশোধ: {s.paidDate}</div>
                                          )}
                                        </td>
                                        <td className="p-3.5 font-mono font-bold text-emerald-400">
                                          ৳ {s.amount.toLocaleString()}
                                        </td>
                                        <td className="p-3.5">
                                          <div className="font-mono font-bold text-cyan-300">
                                            ৳ {lifetimeSalary.toLocaleString()}
                                          </div>
                                          {matchingEmp && (
                                            <button
                                              type="button"
                                              onClick={() => setViewingSalaryHistoryEmp(matchingEmp)}
                                              className="inline-flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-200 underline mt-0.5"
                                            >
                                              <Receipt className="w-2.5 h-2.5" />
                                              <span>হিস্ট্রি দেখুন</span>
                                            </button>
                                          )}
                                        </td>
                                        <td className="p-3.5 text-right">
                                          {s.status === "Paid" ? (
                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                              ✓ DISBURSED
                                            </span>
                                          ) : (
                                            <button
                                              onClick={() => {
                                                markSalaryPaid(s.id);
                                                showToast(`Marked ${s.employeeName}'s salary as paid.`);
                                              }}
                                              className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500 hover:bg-amber-400 text-slate-950"
                                            >
                                              Mark Paid
                                            </button>
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 📊 Sub-Tab 4: Reports */}
                      {financeSubTab === "reports" && (
                        <div className="space-y-4">
                          <div className={`p-6 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm space-y-6`}>
                            <div>
                              <h3 className={`text-sm font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>Commercial Financial Statement</h3>
                              <p className={`text-xs ${theme.textMuted}`}>
                                P&L overview, operating margin, and commercial audit reporting
                              </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div className={`p-4 rounded-xl border ${isDark ? "bg-black/20 border-white/5" : "bg-slate-50 border-slate-200"}`}>
                                <div className="text-xs text-slate-400">Total Gross Income</div>
                                <div className="text-xl font-bold text-emerald-400 mt-1">৳ {totalRevenue.toLocaleString()}</div>
                              </div>
                              <div className={`p-4 rounded-xl border ${isDark ? "bg-black/20 border-white/5" : "bg-slate-50 border-slate-200"}`}>
                                <div className="text-xs text-slate-400">Total Expenses</div>
                                <div className="text-xl font-bold text-rose-400 mt-1">৳ {totalExpenses.toLocaleString()}</div>
                              </div>
                              <div className={`p-4 rounded-xl border ${isDark ? "bg-black/20 border-white/5" : "bg-slate-50 border-slate-200"}`}>
                                <div className="text-xs text-slate-400">Net Retained Margin</div>
                                <div className="text-xl font-bold text-cyan-400 mt-1">
                                  ৳ {netProfit.toLocaleString()} ({Math.round((netProfit / (totalRevenue || 1)) * 100)}%)
                                </div>
                              </div>
                            </div>
                            <div className="pt-2 flex flex-wrap gap-3">
                              <button
                                onClick={() => setShowFinanceStatementModal(true)}
                                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg flex items-center gap-2 transition-all"
                              >
                                <FileText className="w-4 h-4" />
                                <span>সম্পূর্ণ অডিট স্টেটমেন্ট দেখুন ও প্রিন্ট করুন (Open & Print Full Statement)</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )}

                {/* 10. ROLES & PERMISSIONS */}
                {activePage === "permissions" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Roles & Access Control Matrix</h1>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <div className={`md:col-span-4 p-4 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} space-y-1.5`}>
                        <div className="text-[10px] uppercase font-bold text-slate-400 px-2 mb-2">Roles</div>
                        {Object.keys(rolePermissions).map((role) => (
                          <button
                            key={role}
                            onClick={() => setSelectedRole(role)}
                            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                              selectedRole === role
                                ? "bg-[#1E5BC4] text-white shadow"
                                : "text-slate-300 hover:bg-white/5"
                            }`}
                          >
                            {role}
                          </button>
                        ))}
                      </div>

                      <div className={`md:col-span-8 p-5 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} space-y-4`}>
                        <div className="flex items-center justify-between pb-3 border-b border-white/5">
                          <h3 className="text-sm font-bold text-white">{selectedRole} — Permissions</h3>
                          <button
                            onClick={() => showToast(`Permissions for ${selectedRole} saved!`)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${theme.accentBtn}`}
                          >
                            Save Policy
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {Object.entries(rolePermissions[selectedRole] || {}).map(([perm, enabled]) => (
                            <div
                              key={perm}
                              onClick={() => togglePermission(selectedRole, perm)}
                              className="p-3 rounded-xl border border-white/5 bg-black/20 flex items-center justify-between cursor-pointer hover:border-white/10"
                            >
                              <span className="text-xs text-slate-200">{perm}</span>
                              <button
                                type="button"
                                className={`w-10 h-6 rounded-full transition-colors relative ${
                                  enabled ? "bg-[#1E5BC4]" : "bg-slate-700"
                                }`}
                              >
                                <span
                                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                                    enabled ? "right-1" : "left-1"
                                  }`}
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 11. WORKFLOW BUILDER */}
                {activePage === "workflow" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Workflow & Stage Percentage Rules</h1>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Video Editing & 4K Animation Workflow",
                          stages: [
                            { name: "Raw Ingestion & Cut", pct: "20%", role: "Video Editor" },
                            { name: "Motion & SFX", pct: "20%", role: "Video Editor" },
                            { name: "Color Grading Master", pct: "30%", role: "Video Editor" },
                            { name: "Final 4K Upload", pct: "30%", role: "Uploader" },
                          ],
                        },
                        {
                          name: "Online Madrasa Solution (LMS & Portals)",
                          stages: [
                            { name: "Requirements Spec", pct: "20%", role: "Tech Lead" },
                            { name: "UI/UX Portal", pct: "25%", role: "Designer" },
                            { name: "Student DB & Gateway", pct: "30%", role: "Tech Lead" },
                            { name: "Production Deploy", pct: "25%", role: "Uploader" },
                          ],
                        },
                      ].map((wf, idx) => (
                        <div key={idx} className={`p-5 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm space-y-3`}>
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-sm text-white">{wf.name}</h3>
                            <span className="text-[10px] font-mono text-emerald-400">Total: 100% Weight</span>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap">
                            {wf.stages.map((stg, sIdx) => (
                              <React.Fragment key={sIdx}>
                                <div className="px-3 py-2 rounded-xl bg-black/30 border border-white/10 text-xs flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                                  <span className="font-medium text-slate-200">{stg.name}</span>
                                  <span className="text-[10px] font-mono text-amber-400 font-bold">{stg.pct}</span>
                                  <span className="text-[9px] font-mono px-1 rounded bg-white/10 text-slate-400">
                                    {stg.role}
                                  </span>
                                </div>
                                {sIdx < wf.stages.length - 1 && (
                                  <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 12. 🛡️ REAL-TIME SECURITY & ACCESS AUDIT LOGS (সুপার অ্যাডমিন এক্সক্লুসিভ) */}
                {activePage === "logs" && (
                  !isSuperAdmin ? (
                    <div className="p-8 sm:p-12 text-center rounded-3xl border border-rose-500/30 bg-rose-950/20 max-w-xl mx-auto my-12 backdrop-blur-xl shadow-2xl animate-in fade-in duration-200">
                      <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-500/40 shadow-lg">
                        <ShieldCheck className="w-8 h-8 text-rose-400" />
                      </div>
                      <h2 className="text-xl font-bold text-white mb-2">সিকিউরিটি ও এক্টিভিটি লগ অ্যাক্সেস সংরক্ষিত</h2>
                      <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                        সিস্টেমের রিয়েল-টাইম লগইন, লগআউট ও সিকিউরিটি অডিট রিপোর্ট শুধুমাত্র সুপার অ্যাডমিনের জন্য সংরক্ষিত। কোনো সাধারণ স্টাফ এই পেজ দেখতে পারবে না।
                      </p>
                      <button
                        onClick={() => setActivePage("dashboard")}
                        className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all border border-white/10"
                      >
                        ড্যাশবোর্ডে ফিরে যান
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      {/* Top Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className="p-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm">
                              <ShieldCheck className="w-4 h-4 text-cyan-400" />
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/30">
                              SUPER ADMIN SECURITY AUDIT
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1.5">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                              </span>
                              <span>Real-Time Active Tracking</span>
                            </span>
                          </div>
                          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                            রিয়েল-টাইম সিকিউরিটি ও সিস্টেম অডিট লগ
                          </h1>
                          <p className={`text-xs ${theme.textMuted} mt-0.5`}>
                            কে কখন ঢুকতেছে, কে কখন বের হচ্ছে এবং এজেন্সির প্রতিটি গুরুত্বপূর্ণ পরিবর্তনের পূর্ণাঙ্গ টাইমস্ট্যাম্পযুক্ত ইতিহাস।
                          </p>
                        </div>

                        {/* Top Action Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const exportTxt = activityLogs.map(l => `[${l.time}] ${l.user} [${l.module}]: ${l.action}`).join("\n");
                              navigator.clipboard.writeText(exportTxt);
                              showToast("সম্পূর্ণ অডিট লগ ক্লিপবোর্ডে কপি করা হয়েছে!");
                            }}
                            className="px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
                            title="লগ কপি করুন"
                          >
                            <Copy className="w-3.5 h-3.5 text-cyan-400" />
                            <span>কপি লগ</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activityLogs, null, 2));
                              const dl = document.createElement("a");
                              dl.setAttribute("href", jsonStr);
                              dl.setAttribute("download", `thumbstop-security-audit-logs-${Date.now()}.json`);
                              document.body.appendChild(dl);
                              dl.click();
                              dl.remove();
                              showToast("সিকিউরিটি লগ JSON ফরম্যাটে ডাউনলোড হয়েছে!");
                            }}
                            className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>এক্সপোর্ট অডিট রিপোর্ট</span>
                          </button>
                        </div>
                      </div>

                      {/* 3 Executive Luxury SOC Stat Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        {/* 1. Live Operator Session Card */}
                        <div className={`p-4 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-lg relative overflow-hidden`}>
                          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 to-cyan-500" />
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-semibold text-slate-400">বর্তমান অ্যাক্টিভ সেশন (Live Session)</span>
                            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              <Activity className="w-3.5 h-3.5" />
                            </span>
                          </div>
                          <div className="text-base font-bold text-white flex items-center gap-2">
                            <span>Abu Tawfiq</span>
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[9px] font-bold border border-amber-500/30">
                              👑 Super Admin
                            </span>
                          </div>
                          <div className="text-[10px] text-emerald-400 mt-1.5 flex items-center gap-1.5 font-mono">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span>Online Now • Encrypted SSL Session</span>
                          </div>
                        </div>

                        {/* 2. Total Security Records */}
                        <div className={`p-4 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-lg relative overflow-hidden`}>
                          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500" />
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-semibold text-slate-400">মোট রেকর্ডকৃত ইভেন্ট (Audit Trail)</span>
                            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                              <Clock className="w-3.5 h-3.5" />
                            </span>
                          </div>
                          <div className="text-2xl font-black text-white font-mono">
                            {activityLogs.length} টি
                          </div>
                          <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                            <span>অপরিবর্তনযোগ্য ও সুরক্ষিত অডিট লগ</span>
                          </div>
                        </div>

                        {/* 3. Auth Events */}
                        <div className={`p-4 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-lg relative overflow-hidden`}>
                          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400 to-pink-500" />
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-semibold text-slate-400">লগইন ও অ্যাক্সেস যাচাই (Auth Events)</span>
                            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                              <Key className="w-3.5 h-3.5" />
                            </span>
                          </div>
                          <div className="text-2xl font-black text-white font-mono">
                            {activityLogs.filter(l => l.action.includes("লগইন") || l.action.includes("লগআউট") || l.module === "System").length} বার
                          </div>
                          <div className="text-[10px] text-purple-300 mt-1 flex items-center gap-1">
                            <span>সবশেষ লগইন আজ সকালেই রেকর্ড হয়েছে</span>
                          </div>
                        </div>
                      </div>

                      {/* Filter Controls & Search */}
                      <div className={`p-3 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3`}>
                        {/* Category Filter Tabs */}
                        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                          {[
                            { id: "all", label: "সব ইভেন্ট (All)" },
                            { id: "auth", label: "🔑 লগইন ও লগআউট (Auth)" },
                            { id: "security", label: "🛡️ টিম ও পারমিশন (Staff)" },
                            { id: "finance", label: "💰 ফাইন্যান্সিয়াল (Finance)" },
                            { id: "tasks", label: "📋 টাস্ক ও ক্লায়েন্ট (Tasks)" },
                          ].map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() => setLogsFilter(tab.id as any)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                                logsFilter === tab.id
                                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md font-bold"
                                  : "text-slate-300 hover:text-white hover:bg-white/5"
                              }`}
                            >
                              {tab.label}
                            </button>
                          ))}
                        </div>

                        {/* Search Input */}
                        <div className="relative min-w-[220px]">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="অপারেটর বা বিবরণী খুঁজুন..."
                            value={logsSearchQuery}
                            onChange={(e) => setLogsSearchQuery(e.target.value)}
                            className={`w-full pl-8 pr-3 py-1.5 rounded-xl text-xs ${theme.inputBg}`}
                          />
                        </div>
                      </div>

                      {/* Luxury Audit Log Table */}
                      <div className={`rounded-2xl border overflow-hidden ${theme.cardBg} ${theme.cardBorder} shadow-xl`}>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className={`border-b border-white/5 ${theme.tableHeaderBg} text-[11px] font-semibold text-slate-400 uppercase tracking-wider`}>
                                <th className="p-3.5">টাইমস্ট্যাম্প (Timestamp)</th>
                                <th className="p-3.5">অপারেটর / ব্যবহারকারী</th>
                                <th className="p-3.5">ইভেন্টের ধরন (Event Type)</th>
                                <th className="p-3.5">বিবরণী (Detailed Action)</th>
                                <th className="p-3.5 text-right">মডিউল</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                              {filteredActivityLogs.length === 0 ? (
                                <tr>
                                  <td colSpan={5} className="p-8 text-center text-slate-400">
                                    কোনো অডিট লগ রেকর্ড পাওয়া যায়নি।
                                  </td>
                                </tr>
                              ) : (
                                filteredActivityLogs.map((log) => {
                                  const isLogin = log.action.includes("লগইন") || log.action.includes("login");
                                  const isLogout = log.action.includes("লগআউট") || log.action.includes("logout");
                                  const isFinance = log.module === "Finance";
                                  const isSecurity = log.module === "Employees" || log.action.includes("পারমিশন");

                                  return (
                                    <tr key={log.id} className={`transition-colors ${theme.rowHover} group`}>
                                      {/* Timestamp */}
                                      <td className="p-3.5 font-mono text-[11px] text-slate-300 shrink-0 whitespace-nowrap">
                                        <div className="flex items-center gap-1.5">
                                          <Clock className="w-3 h-3 text-cyan-400" />
                                          <span>{log.time}</span>
                                        </div>
                                      </td>

                                      {/* Operator */}
                                      <td className="p-3.5 font-semibold text-white whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                                            {log.user.charAt(0)}
                                          </div>
                                          <span>{log.user}</span>
                                        </div>
                                      </td>

                                      {/* Event Type Badge */}
                                      <td className="p-3.5 whitespace-nowrap">
                                        {isLogin ? (
                                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1 w-fit">
                                            <Key className="w-2.5 h-2.5 text-emerald-400" />
                                            <span>USER_LOGIN</span>
                                          </span>
                                        ) : isLogout ? (
                                          <span className="px-2 py-0.5 rounded-full bg-slate-500/20 text-slate-300 font-mono text-[10px] font-bold border border-slate-500/30 flex items-center gap-1 w-fit">
                                            <span>USER_LOGOUT</span>
                                          </span>
                                        ) : isFinance ? (
                                          <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono text-[10px] font-bold border border-teal-500/30 flex items-center gap-1 w-fit">
                                            <Receipt className="w-2.5 h-2.5 text-teal-400" />
                                            <span>FINANCIAL_TX</span>
                                          </span>
                                        ) : isSecurity ? (
                                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/30 flex items-center gap-1 w-fit">
                                            <ShieldCheck className="w-2.5 h-2.5 text-amber-400" />
                                            <span>ROLE_SECURITY</span>
                                          </span>
                                        ) : (
                                          <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/20 w-fit">
                                            OPERATION
                                          </span>
                                        )}
                                      </td>

                                      {/* Action Details */}
                                      <td className="p-3.5 text-slate-200">
                                        <div className="font-medium">{log.action}</div>
                                      </td>

                                      {/* Module Column */}
                                      <td className="p-3.5 text-right whitespace-nowrap">
                                        <span className="px-2 py-0.5 rounded-md bg-white/[0.05] text-slate-300 text-[10px] font-mono border border-white/10">
                                          {log.module}
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )
                )}
                {/* 12. 🎨 MANAGEMENT THEME & SETTINGS (ম্যানেজমেন্ট থিম ও কালার কনফিগারেশন) */}
                {activePage === "settings" && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    {/* Header */}
                    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${isDark ? "border-white/10" : "border-slate-200"}`}>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/30 flex items-center gap-1">
                            <Palette className="w-3 h-3 text-cyan-400" />
                            MANAGEMENT SETTINGS
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                            10 Presets Available
                          </span>
                        </div>
                        <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"} flex items-center gap-2`}>
                          Management Theme & Colors
                          <span className="text-xs sm:text-sm font-normal text-slate-400">
                            (এডমিন ও ম্যানেজমেন্ট কালার স্যুইট)
                          </span>
                        </h1>
                        <p className={`text-xs ${theme.textMuted} mt-1 max-w-2xl`}>
                          ম্যানেজমেন্ট পোর্টালের পরিবেশ আপনার পছন্দ অনুযায়ী পরিবর্তন করুন। এখানে ১০টি স্পেশালাইজড লাক্সারি থিম, কাস্টম অ্যাকসেন্ট কালার এবং কার্ড স্টাইলিং দেওয়া রয়েছে।
                        </p>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            saveManagementThemeConfig("cyber_obsidian", "", "glass", "subtle");
                            setToastMessage("ডিফল্ট সাইবার অবসিডিয়ান থিম রিস্টোর করা হয়েছে");
                            setTimeout(() => setToastMessage(""), 3000);
                          }}
                          className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                            isDark
                              ? "border-white/10 text-slate-300 hover:text-white hover:bg-white/5"
                              : "border-slate-300 text-slate-700 hover:bg-slate-100 shadow-sm"
                          }`}
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reset to Default</span>
                        </button>
                        {isSuperAdmin && (
                          <button
                            onClick={() => {
                              setWorkspaceMode("cms");
                              setCmsPage("colors");
                            }}
                            className="px-3 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white shadow-lg shadow-purple-600/20 transition-all flex items-center gap-1.5"
                          >
                            <Globe className="w-3.5 h-3.5" />
                            <span>Website Colors CMS ↗</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Active Theme Highlight Banner */}
                    <div className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      isDark
                        ? "border-white/10 bg-gradient-to-r from-white/[0.04] to-white/[0.01] backdrop-blur-xl"
                        : "border-slate-200 bg-white shadow-sm"
                    }`}>
                      <div className="flex items-center gap-3.5">
                        <div
                          className="w-12 h-12 rounded-xl border border-white/20 shadow-lg flex items-center justify-center shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${activeMgmtTheme.accent}, ${activeMgmtTheme.accentSecondary})`,
                          }}
                        >
                          <Sparkles className="w-6 h-6 text-white drop-shadow-md" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Theme:</span>
                            <span className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{activeMgmtTheme.name}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                              isDark ? "bg-white/10 text-slate-200" : "bg-slate-100 text-slate-700"
                            }`}>
                              {activeMgmtTheme.isDark ? "Dark Mode" : "Light Mode"}
                            </span>
                          </div>
                          <p className={`text-xs ${isDark ? "text-slate-300" : "text-slate-600"} mt-0.5`}>{activeMgmtTheme.nameBn} • {activeMgmtTheme.desc}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-[10px] uppercase font-bold text-slate-400">Accent Tone</div>
                          <div className={`flex items-center gap-1.5 font-mono text-xs ${isDark ? "text-white" : "text-slate-900"}`}>
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-white/30"
                              style={{ backgroundColor: theme.accentHex }}
                            />
                            <span>{theme.accentHex}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setIsDark(!isDark)}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                            isDark
                              ? "border-white/10 bg-white/5 hover:bg-white/10 text-slate-200"
                              : "border-slate-300 bg-white hover:bg-slate-100 text-slate-700 shadow-sm"
                          }`}
                        >
                          {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-blue-500" />}
                          <span>{isDark ? "Switch to Light" : "Switch to Dark"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Section 1: 10 Management Themes Grid */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h2 className={`text-sm font-bold uppercase tracking-wider ${isDark ? "text-slate-300" : "text-slate-700"} flex items-center gap-2`}>
                          <span>1. Select Management Theme Preset</span>
                          <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-cyan-300">
                            10 Available
                          </span>
                        </h2>
                        <span className="text-xs text-slate-400">এক ক্লিকেই পুরো ম্যানেজমেন্ট সিস্টেম পরিবর্তন হবে</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
                        {MANAGEMENT_THEMES.map((t) => {
                          const isSelected = activeMgmtTheme.id === t.id && (t.isDark ? isDark : !isDark);
                          return (
                            <div
                              key={t.id}
                              onClick={() => {
                                if (t.isDark !== isDark) {
                                  setIsDark(t.isDark);
                                }
                                saveManagementThemeConfig(t.id, undefined, undefined, undefined);
                                setToastMessage(`থিম পরিবর্তন করা হয়েছে: ${t.name}`);
                                setTimeout(() => setToastMessage(""), 2500);
                              }}
                              className={`p-4 rounded-2xl border cursor-pointer transition-all relative overflow-hidden group ${
                                isSelected
                                  ? "border-cyan-400 ring-2 ring-cyan-500/30 bg-white/[0.08] shadow-xl"
                                  : isDark
                                  ? "border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20"
                                  : "border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 shadow-sm"
                              }`}
                            >
                              {/* Glowing side accent line */}
                              <div
                                className="absolute left-0 top-0 bottom-0 w-1.5 transition-opacity"
                                style={{ backgroundColor: t.accent }}
                              />

                              <div className="flex items-start justify-between gap-2 pl-1 mb-2">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"} group-hover:text-cyan-400 transition-colors`}>
                                      {t.name}
                                    </h3>
                                    {isSelected && (
                                      <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[9px] font-bold border border-cyan-500/30">
                                        ACTIVE
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[11px] text-slate-400 font-medium">{t.nameBn}</div>
                                </div>

                                <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${t.badgeBg} ${t.badgeText}`}>
                                  {t.isDark ? "DARK" : "LIGHT"}
                                </span>
                              </div>

                              <p className={`text-xs ${isDark ? "text-slate-300/80" : "text-slate-600"} mb-3 pl-1 leading-relaxed`}>{t.desc}</p>

                              {/* Color Preview Swatches */}
                              <div className={`flex items-center justify-between pt-2.5 border-t ${isDark ? "border-white/5" : "border-slate-100"} pl-1`}>
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className="w-5 h-5 rounded-md border border-white/20 shadow-sm"
                                    style={{ backgroundColor: t.accent }}
                                    title={`Primary Accent: ${t.accent}`}
                                  />
                                  <span
                                    className="w-5 h-5 rounded-md border border-white/20 shadow-sm"
                                    style={{ backgroundColor: t.accentSecondary }}
                                    title={`Secondary Accent: ${t.accentSecondary}`}
                                  />
                                  <div
                                    className="h-5 w-16 rounded-md border border-white/10 shadow-inner"
                                    style={{
                                      background: `linear-gradient(90deg, ${t.accent}, ${t.accentSecondary})`,
                                    }}
                                  />
                                </div>

                                <span className="text-[11px] font-mono text-slate-400">{t.accent}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Section 2: Custom Accent & Fine-Tuning Controls */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Left: Custom Accent Color Picker */}
                      <div className={`p-4 rounded-2xl border ${isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white shadow-sm"} space-y-4`}>
                        <div className="flex items-center justify-between">
                          <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"} flex items-center gap-2`}>
                            <Sliders className="w-4 h-4 text-cyan-400" />
                            <span>2. Custom Accent Tone (কাস্টম কালার)</span>
                          </h3>
                          {managementCustomAccent && (
                            <button
                              onClick={() => {
                                saveManagementThemeConfig(undefined, "", undefined, undefined);
                                setToastMessage("কাস্টম অ্যাকসেন্ট সরিয়ে থিমের মূল রঙে ফিরে যাওয়া হয়েছে");
                                setTimeout(() => setToastMessage(""), 2000);
                              }}
                              className="text-[11px] text-rose-400 hover:text-rose-300 font-medium"
                            >
                              Reset to Theme Color
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">
                          আপনার নিজের কোনো পছন্দের রঙ থাকলে সেটি ম্যানেজমেন্ট সিস্টেমের অ্যাকসেন্ট হিসেবে সেট করতে পারেন:
                        </p>

                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={managementCustomAccent || activeMgmtTheme.accent}
                            onChange={(e) => {
                              saveManagementThemeConfig(undefined, e.target.value, undefined, undefined);
                            }}
                            className="w-12 h-12 rounded-xl bg-transparent border border-white/20 cursor-pointer"
                          />
                          <div className="flex-1">
                            <input
                              type="text"
                              value={managementCustomAccent || activeMgmtTheme.accent}
                              onChange={(e) => {
                                saveManagementThemeConfig(undefined, e.target.value, undefined, undefined);
                              }}
                              placeholder="#1FA8CB"
                              className={`w-full px-3 py-2 rounded-xl border font-mono text-xs focus:outline-none focus:border-cyan-500 ${
                                isDark ? "bg-black/40 border-white/10 text-white" : "bg-white border-slate-300 text-slate-900"
                              }`}
                            />
                          </div>
                        </div>

                        {/* Quick Color Swatches */}
                        <div>
                          <div className="text-[11px] font-semibold text-slate-400 mb-2">Quick Color Swatches:</div>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { label: "Cyan", color: "#06B6D4" },
                              { label: "Electric Blue", color: "#3B82F6" },
                              { label: "Emerald", color: "#10B981" },
                              { label: "Gold", color: "#F59E0B" },
                              { label: "Violet", color: "#8B5CF6" },
                              { label: "Rose", color: "#F43F5E" },
                              { label: "Teal", color: "#14B8A6" },
                              { label: "Amber", color: "#D97706" },
                            ].map((swatch) => (
                              <button
                                key={swatch.color}
                                onClick={() => {
                                  saveManagementThemeConfig(undefined, swatch.color, undefined, undefined);
                                  setToastMessage(`অ্যাকসেন্ট কালার: ${swatch.label}`);
                                  setTimeout(() => setToastMessage(""), 2000);
                                }}
                                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-all ${
                                  isDark
                                    ? "border-white/10 bg-white/5 hover:bg-white/10 text-slate-300"
                                    : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                                }`}
                              >
                                <span
                                  className="w-3 h-3 rounded-full border border-white/30"
                                  style={{ backgroundColor: swatch.color }}
                                />
                                <span>{swatch.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Card Surface & Ambience Settings */}
                      <div className={`p-4 rounded-2xl border ${isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white shadow-sm"} space-y-4`}>
                        <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"} flex items-center gap-2`}>
                          <Layers className="w-4 h-4 text-cyan-400" />
                          <span>3. Surface & Lighting Style (কার্ড ও গ্লো)</span>
                        </h3>
                        <p className="text-xs text-slate-400">
                          ম্যানেজমেন্টের কার্ডগুলোর গ্লাস মরফিজম বা সলিড বর্ডার কেমন হবে তা নির্ধারণ করুন:
                        </p>

                        <div>
                          <div className="text-[11px] font-semibold text-slate-400 mb-2">Card Style:</div>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: "glass", label: "Glassmorphism", desc: "Translucent + Blur" },
                              { id: "solid", label: "Solid Card", desc: "Opaque High-Contrast" },
                              { id: "bordered", label: "Accent Bordered", desc: "Highlighted Edges" },
                            ].map((styleOpt) => (
                              <button
                                key={styleOpt.id}
                                onClick={() => {
                                  saveManagementThemeConfig(undefined, undefined, styleOpt.id as any, undefined);
                                  setToastMessage(`কার্ড স্টাইল: ${styleOpt.label}`);
                                  setTimeout(() => setToastMessage(""), 2000);
                                }}
                                className={`p-2.5 rounded-xl text-left border transition-all ${
                                  managementCardStyle === styleOpt.id
                                    ? isDark
                                      ? "border-cyan-500 bg-cyan-500/15 text-white"
                                      : "border-blue-600 bg-blue-50 text-blue-950 font-bold shadow-sm"
                                    : isDark
                                    ? "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                <div className="text-xs font-bold">{styleOpt.label}</div>
                                <div className="text-[10px] text-slate-400 mt-0.5">{styleOpt.desc}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="text-[11px] font-semibold text-slate-400 mb-2">Ambient Glow Effect:</div>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: "subtle", label: "Subtle (Calm)", desc: "Gentle Peaceful Glow" },
                              { id: "vibrant", label: "Vibrant", desc: "High Contrast Glow" },
                              { id: "off", label: "Minimal / Off", desc: "Strictly Dark Screen" },
                            ].map((glowOpt) => (
                              <button
                                key={glowOpt.id}
                                onClick={() => {
                                  saveManagementThemeConfig(undefined, undefined, undefined, glowOpt.id as any);
                                  setToastMessage(`অ্যাম্বিয়েন্ট গ্লো: ${glowOpt.label}`);
                                  setTimeout(() => setToastMessage(""), 2000);
                                }}
                                className={`p-2.5 rounded-xl text-left border transition-all ${
                                  managementGlowIntensity === glowOpt.id
                                    ? isDark
                                      ? "border-cyan-500 bg-cyan-500/15 text-white"
                                      : "border-blue-600 bg-blue-50 text-blue-950 font-bold shadow-sm"
                                    : isDark
                                    ? "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                <div className="text-xs font-bold">{glowOpt.label}</div>
                                <div className="text-[10px] text-slate-400 mt-0.5">{glowOpt.desc}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Live Interactive Preview */}
                    <div className={`p-5 rounded-2xl border ${isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white shadow-sm"} space-y-4`}>
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"} flex items-center gap-2`}>
                          <Eye className="w-4 h-4 text-cyan-400" />
                          <span>4. Live Component Preview Under Active Theme</span>
                        </h3>
                        <span className="text-[11px] text-emerald-400 font-mono">Live Simulation</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Sample Stat Card */}
                        <div className={`p-4 rounded-xl border ${theme.cardBorder} ${theme.cardBg}`}>
                          <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Total Active Clients</div>
                          <div className={`text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>48+ Org</div>
                          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold" style={{ color: theme.accentHex }}>
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>+18.4% this month</span>
                          </div>
                        </div>

                        {/* Sample Interactive Button */}
                        <div className={`p-4 rounded-xl border ${theme.cardBorder} ${theme.cardBg} flex flex-col justify-between`}>
                          <div>
                            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Primary Call to Action</div>
                            <div className={`text-xs ${isDark ? "text-slate-300" : "text-slate-600"}`}>Active gradient and accent reflection</div>
                          </div>
                          <button
                            className={`w-full mt-3 py-2.5 rounded-xl font-bold text-xs text-white transition-all shadow-lg flex items-center justify-center gap-2`}
                            style={{
                              background: `linear-gradient(135deg, ${theme.accentHex}, ${activeMgmtTheme.accentSecondary})`,
                              boxShadow: `0 10px 25px -5px ${theme.accentHex}40`,
                            }}
                          >
                            <Zap className="w-3.5 h-3.5" />
                            <span>Primary Action Button</span>
                          </button>
                        </div>

                        {/* Sample Badge & Status */}
                        <div className={`p-4 rounded-xl border ${theme.cardBorder} ${theme.cardBg} space-y-2`}>
                          <div className="text-[10px] uppercase font-bold text-slate-400">Badge & Notification Style</div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className="px-2.5 py-1 rounded-full text-[11px] font-bold border"
                              style={{
                                backgroundColor: `${theme.accentHex}20`,
                                color: theme.accentHex,
                                borderColor: `${theme.accentHex}40`,
                              }}
                            >
                              Active Pipeline
                            </span>
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              Completed
                            </span>
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              Urgent
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 4: Integration with Public Site Notice */}
                    <div className="p-4 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-cyan-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-cyan-200">
                            Looking to change the Public Website Front Page Colors?
                          </div>
                          <div className="text-[11px] text-cyan-300/80">
                            Public website colors (Hero glow, Services cards, CTA buttons) can be changed anytime in the <strong>Website CMS &gt; Colors</strong> tab.
                          </div>
                        </div>
                      </div>

                      {isSuperAdmin && (
                        <button
                          onClick={() => {
                            setWorkspaceMode("cms");
                            setCmsPage("colors");
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all shrink-0"
                        >
                          Open Website CMS Colors ↗
                        </button>
                      )}
                    </div>

                    {/* Section 5: Bangladesh Prayer Times & Luxury 10-Second Adhan Notification Settings */}
                    <div className={`p-5 sm:p-6 rounded-2xl border ${isDark ? "border-amber-500/20 bg-gradient-to-b from-[#0A162D]/80 to-[#060D1D]/80" : "border-amber-200 bg-amber-50/50 shadow-sm"} space-y-5`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                        <div className="flex items-start gap-3.5">
                          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#E8B343]/25 to-[#E8B343]/10 border border-[#E8B343]/40 flex items-center justify-center text-2xl shrink-0 shadow-lg shadow-[#E8B343]/10">
                            🕌
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-[#E8B343] font-mono text-[10px] font-bold border border-amber-500/30">
                                5. ADHAN & PRAYER SYSTEM
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                                Asia/Dhaka • 10-Sec Auto Dismiss
                              </span>
                            </div>
                            <h3 className={`text-base font-bold ${isDark ? "text-white" : "text-slate-900"} flex items-center gap-2`}>
                              <span>Bangladesh Prayer Time & Adhan Alert</span>
                              <span className="text-xs font-normal text-slate-400">
                                (নামাজ ও আজান নোটিফিকেশন সিস্টেম)
                              </span>
                            </h3>
                            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                              বাংলাদেশের স্থানীয় সময় (Asia/Dhaka) অনুযায়ী প্রতিদিন স্বয়ংক্রিয়ভাবে ফজর, যোহর, আসর, মাগরিব ও ইশার আজানের সঠিক সময় নির্ধারিত হয়। আজানের সময় পৌঁছালে ম্যানেজমেন্ট সিস্টেমে ঠিক ১০ সেকেন্ডের জন্য ফুল-স্ক্রিন লাক্সারি ওভারলে নোটিফিকেশন স্বয়ংক্রিয়ভাবে চালু হবে।
                            </p>
                          </div>
                        </div>

                        {/* Test Adhan Modal Preview Button */}
                        <button
                          type="button"
                          onClick={handleTestAdhanModal}
                          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#E8B343] to-[#D49E2E] hover:brightness-110 text-slate-950 shadow-lg shadow-[#E8B343]/20 flex items-center gap-2 transition-all shrink-0 active:scale-95 cursor-pointer"
                          title="আজান নোটিফিকেশনের ১০ সেকেন্ডের প্রিভিউ দেখুন"
                        >
                          <span className="text-base">🔔</span>
                          <span>Test Adhan Alert (১০ সেকেন্ড প্রিভিউ)</span>
                        </button>
                      </div>

                      {/* Controls Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Setting 1: Adhan Notification Overlay Toggle */}
                        <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white"}`}>
                          <div>
                            <div className="flex items-center gap-2">
                              <Bell className={`w-4 h-4 ${adhanNotificationEnabled ? "text-[#E8B343]" : "text-slate-500"}`} />
                              <span className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                                Adhan Notification (আজান নোটিফিকেশন)
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">
                              আজানের সময় পৌঁছালে ১০ সেকেন্ডের জন্য ফুল-স্ক্রিন লাক্সারি ওভারলে পপআপ প্রদর্শন করুন।
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleToggleAdhanNotification(!adhanNotificationEnabled)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              adhanNotificationEnabled
                                ? "bg-[#E8B343] text-slate-950 shadow-md shadow-amber-500/20 font-black"
                                : "bg-white/10 text-slate-400 hover:text-white"
                            }`}
                          >
                            {adhanNotificationEnabled ? "ON" : "OFF"}
                          </button>
                        </div>

                        {/* Setting 2: Adhan Sound Alert Toggle */}
                        <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white"}`}>
                          <div>
                            <div className="flex items-center gap-2">
                              {adhanSoundEnabled ? (
                                <Volume2 className="w-4 h-4 text-cyan-400" />
                              ) : (
                                <VolumeX className="w-4 h-4 text-slate-500" />
                              )}
                              <span className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                                Adhan Sound (আজান সাউন্ড এলার্ট)
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">
                              পপআপের সময় মৃদু হারমোনিক আজান চিম সাউন্ড বাজবে (ব্রাউজার পারমিশন অনুমোদিত থাকলে)।
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleToggleAdhanSound(!adhanSoundEnabled)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              adhanSoundEnabled
                                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-black"
                                : "bg-white/10 text-slate-400 hover:text-white"
                            }`}
                          >
                            {adhanSoundEnabled ? "ON" : "OFF"}
                          </button>
                        </div>
                      </div>

                      {/* Today's Calculated Daily Prayer Schedule for Dhaka */}
                      {prayerSchedule && (
                        <div className={`p-4 rounded-xl border ${isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white"}`}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                            <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                              <span>📅</span>
                              <span>আজকের নামাজের সময়সূচী (ঢাকা, বাংলাদেশ)</span>
                              <span className="text-[11px] text-slate-400 font-normal">
                                — {prayerSchedule.dateStr} • {prayerSchedule.dateBn}
                              </span>
                            </div>
                            <span className="text-[11px] font-mono text-[#E8B343]">
                              পরবর্তী নামাজ: {prayerSchedule.nextPrayer.nameBn} ({prayerSchedule.nextPrayer.nameEn}) • {prayerSchedule.nextPrayer.time12}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                            {prayerSchedule.prayers.map((p) => {
                              const isNext = p.id === prayerSchedule.nextPrayer.id;
                              return (
                                <div
                                  key={p.id}
                                  className={`p-3 rounded-xl border text-center transition-all ${
                                    isNext
                                      ? "bg-[#E8B343]/15 border-[#E8B343]/50 text-white shadow-md shadow-[#E8B343]/10 ring-1 ring-[#E8B343]/30"
                                      : p.isPassed
                                      ? isDark
                                        ? "bg-white/[0.01] border-white/5 text-slate-500"
                                        : "bg-slate-50 border-slate-200 text-slate-400"
                                      : isDark
                                      ? "bg-white/[0.03] border-white/10 text-slate-200"
                                      : "bg-slate-100/80 border-slate-200 text-slate-800"
                                  }`}
                                >
                                  <div className="text-xs font-bold">
                                    {p.nameBn}{" "}
                                    <span className="text-[10px] font-mono opacity-70">
                                      ({p.nameEn})
                                    </span>
                                  </div>
                                  <div className="text-sm font-black font-mono mt-1 text-[#E8B343]">
                                    {p.time12}
                                  </div>
                                  <div className="text-[10px] text-slate-400 mt-1">
                                    {isNext ? (
                                      <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                        {prayerSchedule.timeRemainingFormatted}
                                      </span>
                                    ) : p.isPassed ? (
                                      "অতিক্রান্ত ✓"
                                    ) : (
                                      "আসন্ন"
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ====================================================================
                B. WEBSITE CMS WORKSPACE (SUPER ADMIN EXCLUSIVE)
               ==================================================================== */}
            {workspaceMode === "cms" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[10px] font-bold">
                        SUPER ADMIN WORKSPACE
                      </span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      Website CMS & Public Content Editor
                    </h1>
                    <p className={`text-xs ${theme.textMuted}`}>
                      Isolated from agency operations to prevent accidental changes to public site text and pricing.
                    </p>
                  </div>
                  <Link
                    href="/"
                    target="_blank"
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border ${theme.secondaryBtn}`}
                  >
                    <span>View Public Website ↗</span>
                  </Link>
                </div>

                {/* CMS 1: Home Banner Picture & Hero Luxury Showcase (Priority) */}
                {cmsPage === "hero" && (
                  <form onSubmit={handleSaveSettings} className="space-y-6">
                    {/* Header Banner */}
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-purple-950/40 to-blue-950/50 border border-cyan-500/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold mb-2">
                          <ImageIcon className="w-3 h-3" />
                          <span>SUPER ADMIN CONTROL • হোম ব্যানার ছবি ও হিরো প্রেজেন্টেশন</span>
                        </div>
                        <h2 className="text-base font-bold text-white">
                          হোম ব্যানার ফটোগ্রাফি, হেডলাইন ও অ্যাকশন বাটন কন্ট্রোল
                        </h2>
                        <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                          ওয়েবসাইটের প্রথম দর্শনেই যে মূল ব্যানার ও ছবি দেখা যায়, তা এখান থেকে সরাসরি কম্পিউটার/মোবাইল থেকে আপলোড করতে পারেন অথবা ইউআরএল দিয়ে পরিবর্তন করতে পারবেন।
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/30 flex items-center gap-2 shrink-0 self-start sm:self-auto transition-all"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save & Sync Home Banner</span>
                      </button>
                    </div>

                    {/* Image Upload & Link Selector Card */}
                    <div className={`p-6 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm space-y-5`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                        <div>
                          <h3 className="text-sm font-bold text-white flex items-center gap-2">
                            <UploadCloud className="w-4 h-4 text-cyan-400" />
                            হোম ব্যানারের ছবি আপলোড (Home Banner Picture Upload)
                          </h3>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            কম্পিউটার বা মোবাইল থেকে সরাসরি ছবি আপলোড করুন অথবা যেকোনো ইমেজ লিংক পেস্ট করুন।
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setSettingsForm({ ...settingsForm, heroImageUrl: "/images/hero-showcase.jpg" });
                            showToast("ডিফল্ট স্টুডিও শোকেস ছবিতে রিসেট করা হয়েছে");
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 flex items-center gap-1.5 transition-all self-start"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset to Default</span>
                        </button>
                      </div>

                      {/* File Upload Trigger & Manual URL Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Direct File Upload Zone */}
                        <div className="p-4 rounded-xl border border-dashed border-cyan-500/40 bg-cyan-500/5 flex flex-col items-center justify-center text-center space-y-2.5 group hover:border-cyan-400 transition-all">
                          <input
                            type="file"
                            accept="image/*"
                            id="hero-file-input"
                            className="hidden"
                            onChange={(e) =>
                              handleImageFileUpload(e, (dataUrl) => {
                                setSettingsForm({ ...settingsForm, heroImageUrl: dataUrl });
                              })
                            }
                          />
                          <label
                            htmlFor="hero-file-input"
                            className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center cursor-pointer group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/20"
                          >
                            <UploadCloud className="w-6 h-6" />
                          </label>
                          <div>
                            <label
                              htmlFor="hero-file-input"
                              className="text-xs font-bold text-white cursor-pointer hover:text-cyan-300 block"
                            >
                              ডিভাইস থেকে সরাসরি ছবি আপলোড করুন
                            </label>
                            <span className="text-[11px] text-slate-400 block mt-0.5">
                              PNG, JPG, WebP বা SVG (Max 10MB)
                            </span>
                          </div>
                          <label
                            htmlFor="hero-file-input"
                            className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 cursor-pointer hover:bg-cyan-500/30 transition-all"
                          >
                            Choose Image File
                          </label>
                        </div>

                        {/* Manual Image URL / Path Input */}
                        <div className="space-y-3 flex flex-col justify-center">
                          <div>
                            <label className="text-xs text-slate-300 font-semibold block mb-1">
                              অথবা ছবির সরাসরি পাথ / অনলাইন লিংক (Image URL / Path) *
                            </label>
                            <input
                              type="text"
                              required
                              value={settingsForm.heroImageUrl}
                              onChange={(e) => setSettingsForm({ ...settingsForm, heroImageUrl: e.target.value })}
                              placeholder="/images/hero-showcase.jpg বা https://..."
                              className={`w-full px-3 py-2.5 rounded-xl text-xs font-mono ${theme.inputBg} border border-white/10 text-cyan-300 focus:border-cyan-400 focus:outline-none`}
                            />
                            <p className="text-[10px] text-slate-400 mt-1">
                              স্থানীয় পাথ (যেমন: <span className="font-mono text-slate-300">/images/hero-showcase.jpg</span>) বা যেকোনো অনলাইন ইমেজ লিংক সাপোর্ট করে।
                            </p>
                          </div>

                          {/* Quick Studio Showcase Presets */}
                          <div>
                            <label className="text-[11px] text-slate-400 font-semibold block mb-1.5">
                              কুইক স্টুডিও শোকেস প্রিসেট (1-Click Switch):
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                {
                                  title: "Luxury Obsidian",
                                  url: "/images/hero-showcase.jpg",
                                  badge: "Signature",
                                },
                                {
                                  title: "Apple Web Studio",
                                  url: "/images/web-development-apple.jpg",
                                  badge: "Tech & Code",
                                },
                                {
                                  title: "Madrasa Solution",
                                  url: "/images/madrasa-solution-showcase.jpg",
                                  badge: "Portal App",
                                },
                                {
                                  title: "Creative Video Studio",
                                  url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&q=80",
                                  badge: "Media Prod",
                                },
                              ].map((preset) => (
                                <button
                                  key={preset.url}
                                  type="button"
                                  onClick={() => {
                                    setSettingsForm({ ...settingsForm, heroImageUrl: preset.url });
                                    showToast(`প্রিসেট সিলেক্ট করা হয়েছে: ${preset.title}`);
                                  }}
                                  className={`p-2 rounded-xl border text-left transition-all ${
                                    settingsForm.heroImageUrl === preset.url
                                      ? "border-cyan-400 bg-cyan-500/15 text-white shadow"
                                      : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20"
                                  }`}
                                >
                                  <span className="text-[9px] font-mono text-cyan-300 block">{preset.badge}</span>
                                  <span className="text-xs font-medium block truncate">{preset.title}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Live 16:9 Banner Cinematic Preview */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs text-slate-400">লাইভ ব্যানার প্রিভিউ (16:9 Aspect Ratio Preview):</label>
                          <span className="text-[10px] font-mono text-cyan-300">Live Aspect 16:9</span>
                        </div>
                        <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/15 bg-black/60 relative group shadow-2xl">
                          <img
                            src={settingsForm.heroImageUrl}
                            alt="Hero Banner Preview"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#040711] via-[#040711]/40 to-transparent" />
                          <div className="absolute inset-0 bg-gradient-to-r from-[#040711]/90 via-transparent to-transparent" />
                          
                          <div className="absolute bottom-5 left-5 right-5 text-white space-y-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 inline-flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                              <span>LIVE HERO PREVIEW</span>
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white max-w-xl line-clamp-1">
                              {settingsForm.heroHeadlineEn || settingsForm.name}
                            </h3>
                            <p className="text-xs text-slate-300 max-w-lg line-clamp-2 leading-relaxed">
                              {settingsForm.heroSubtitleEn || settingsForm.taglineEn}
                            </p>
                            <div className="flex items-center gap-2 pt-1">
                              <span
                                style={{ backgroundColor: settingsForm.themeAccentColor }}
                                className="px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-lg inline-flex items-center gap-1"
                              >
                                <span>{settingsForm.heroCtaTextEn}</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </span>
                              <span className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 inline-flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                <span>WhatsApp Consult</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hero Bilingual Copy & CTA Button Settings */}
                    <div className={`p-6 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm space-y-4`}>
                      <div className="pb-3 border-b border-white/10">
                        <h3 className="text-sm font-bold text-white">হিরো হেডলাইন, সাবটাইটেল ও কল-টু-অ্যাকশন বাটন</h3>
                        <p className="text-[11px] text-slate-400">ওয়েবসাইটের ব্যানারে প্রদর্শিত বড় হেডলাইন ও লেখার ভাষা নিয়ন্ত্রণ করুন</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-slate-300 font-semibold block mb-1">English Main Headline</label>
                          <input
                            type="text"
                            value={settingsForm.heroHeadlineEn}
                            onChange={(e) => setSettingsForm({ ...settingsForm, heroHeadlineEn: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-300 font-semibold block mb-1">বাংলা হেডলাইন (Bengali Headline)</label>
                          <input
                            type="text"
                            value={settingsForm.heroHeadlineBn}
                            onChange={(e) => setSettingsForm({ ...settingsForm, heroHeadlineBn: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl text-xs font-bangla ${theme.inputBg}`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-slate-300 font-semibold block mb-1">English Subtitle / Value Proposition</label>
                          <textarea
                            rows={3}
                            value={settingsForm.heroSubtitleEn}
                            onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtitleEn: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-300 font-semibold block mb-1">বাংলা সাবটাইটেল (Bengali Subtitle)</label>
                          <textarea
                            rows={3}
                            value={settingsForm.heroSubtitleBn}
                            onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtitleBn: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl text-xs font-bangla ${theme.inputBg}`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                        <div>
                          <label className="text-xs text-slate-300 font-semibold block mb-1">Primary Button Text (EN)</label>
                          <input
                            type="text"
                            value={settingsForm.heroCtaTextEn}
                            onChange={(e) => setSettingsForm({ ...settingsForm, heroCtaTextEn: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-300 font-semibold block mb-1">বাটন টেক্সট (BN)</label>
                          <input
                            type="text"
                            value={settingsForm.heroCtaTextBn}
                            onChange={(e) => setSettingsForm({ ...settingsForm, heroCtaTextBn: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl text-xs font-bangla ${theme.inputBg}`}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-300 font-semibold block mb-1">Button Destination URL</label>
                          <input
                            type="text"
                            value={settingsForm.heroCtaLink}
                            onChange={(e) => setSettingsForm({ ...settingsForm, heroCtaLink: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl text-xs font-mono ${theme.inputBg}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Save Action */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-xl shadow-cyan-500/30 flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save & Publish Hero Banner to Live Site</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* CMS 2: Facebook, WhatsApp & Social Channels (Priority) */}
                {cmsPage === "socials" && (
                  <form onSubmit={handleSaveSettings} className="space-y-6">
                    {/* Header Banner */}
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-purple-950/40 to-emerald-950/50 border border-purple-500/20 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold mb-2">
                          <Share2 className="w-3 h-3" />
                          <span>SUPER ADMIN CONTROL • সোশ্যাল মিডিয়া ও ডিরেক্ট গেটওয়ে</span>
                        </div>
                        <h2 className="text-base font-bold text-white">
                          অফিসিয়াল ফেসবুক পেইজ ও ডেডিকেটেড হোয়াটসঅ্যাপ সংযোগ
                        </h2>
                        <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                          এখানে আপনার এজেন্সির ফেসবুক পেইজ এবং সরাসরি চ্যাটের জন্য হোয়াটসঅ্যাপ নাম্বার দিন। পরিবর্তনের পর সাথে সাথে ওয়েবসাইটের হেডার, ফুটার এবং কন্টাক্ট ডেস্কে তা আপডেট হয়ে যাবে।
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 flex items-center gap-2 shrink-0 self-start sm:self-auto transition-all"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save & Sync All Socials</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* ⭐️ Facebook Page Integration Card */}
                      <div className={`p-6 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm space-y-4 relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#1877F2]/10 blur-2xl pointer-events-none" />
                        <div className="flex items-center justify-between pb-3 border-b border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#1877F2]/20 border border-[#1877F2]/40 flex items-center justify-center text-[#1877F2] shadow-sm">
                              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-white">অফিসিয়াল ফেসবুক পেইজ (Facebook Page URL)</h3>
                              <p className="text-[11px] text-slate-400">পাবলিক ভিজিটরদের অফিসিয়াল ফেসবুক পেইজে রিডাইরেক্ট করবে</p>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/30">
                            Active
                          </span>
                        </div>

                        <div>
                          <label className="text-xs text-slate-300 font-semibold block mb-1.5">
                            ফেসবুক পেইজ লিংক (Facebook Page Direct URL) *
                          </label>
                          <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                              <input
                                type="url"
                                required
                                value={settingsForm.facebook}
                                onChange={(e) => setSettingsForm({ ...settingsForm, facebook: e.target.value })}
                                placeholder="https://facebook.com/thumbstopagency"
                                className={`w-full px-3 py-2.5 rounded-xl text-xs font-mono ${theme.inputBg} border border-white/10 text-blue-300 focus:border-[#1877F2] focus:outline-none`}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                if (settingsForm.facebook) {
                                  window.open(settingsForm.facebook, "_blank");
                                } else {
                                  showToast("প্রথমে ফেসবুক লিংক ইনপুট করুন!");
                                }
                              }}
                              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-[#1877F2]/20 hover:bg-[#1877F2]/30 text-[#1877F2] border border-[#1877F2]/40 flex items-center gap-1.5 transition-all shrink-0"
                              title="Test link in new tab"
                            >
                              <span>Test Link ↗</span>
                            </button>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1.5">
                            উদাহরণ: <span className="font-mono text-slate-300">https://facebook.com/yourpage</span>
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/15 text-xs text-slate-300 space-y-1.5">
                          <div className="text-[11px] font-semibold text-blue-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>ওয়েবসাইটের যেসব স্থানে এই লিংক দৃশ্যমান থাকবে:</span>
                          </div>
                          <ul className="text-[11px] text-slate-400 list-disc list-inside space-y-0.5 pl-1">
                            <li>মূল ওয়েবসাইটের ফুটার সোশ্যাল লিংক আইকন বার</li>
                            <li>মোবাইল নেভিগেশন মেনুর ডিরেক্ট সোশ্যাল বাটন</li>
                            <li>ক্লায়েন্ট ইনভয়েস ও অফিসিয়াল রসিদের ব্র্যান্ড ফুটার</li>
                          </ul>
                        </div>
                      </div>

                      {/* ⭐️ Dedicated WhatsApp Direct Gateway Card */}
                      <div className={`p-6 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm space-y-4 relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-2xl pointer-events-none" />
                        <div className="flex items-center justify-between pb-3 border-b border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-sm">
                              <MessageCircle className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-white">আলাদা হোয়াটসঅ্যাপ গেটওয়ে (Dedicated WhatsApp)</h3>
                              <p className="text-[11px] text-slate-400">সরাসরি ১-ক্লিকে ক্লায়েন্টদের সাথে চ্যাট শুরুর ব্যবস্থা</p>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Direct wa.me
                          </span>
                        </div>

                        <div>
                          <label className="text-xs text-slate-300 font-semibold block mb-1.5">
                            অফিসিয়াল হোয়াটসঅ্যাপ নম্বর (WhatsApp Number) *
                          </label>
                          <input
                            type="text"
                            required
                            value={settingsForm.whatsappNumber}
                            onChange={(e) => {
                              const num = e.target.value;
                              const clean = num.replace(/[^0-9]/g, "");
                              const defaultMsg = settingsForm.whatsappDefaultMsg || "Hello ThumbStop, I want to discuss a project";
                              setSettingsForm({
                                ...settingsForm,
                                whatsappNumber: num,
                                whatsappLink: `https://wa.me/${clean}?text=${encodeURIComponent(defaultMsg)}`,
                              });
                            }}
                            placeholder="+8801886900800"
                            className={`w-full px-3 py-2.5 rounded-xl text-xs font-mono ${theme.inputBg} border border-white/10 text-emerald-300 focus:border-emerald-400 focus:outline-none`}
                          />
                          <p className="text-[10px] text-slate-400 mt-1">
                            দেশের কোডসহ লিখুন (যেমন: <span className="font-mono text-slate-300">+8801886900800</span>)
                          </p>
                        </div>

                        <div>
                          <label className="text-xs text-slate-300 font-semibold block mb-1.5">
                            ডিফল্ট মেসেজ (Pre-filled Chat Message)
                          </label>
                          <input
                            type="text"
                            value={settingsForm.whatsappDefaultMsg}
                            onChange={(e) => {
                              const msg = e.target.value;
                              const clean = settingsForm.whatsappNumber.replace(/[^0-9]/g, "");
                              setSettingsForm({
                                ...settingsForm,
                                whatsappDefaultMsg: msg,
                                whatsappLink: `https://wa.me/${clean}?text=${encodeURIComponent(msg)}`,
                              });
                            }}
                            placeholder="Hello ThumbStop, I want to discuss a project"
                            className={`w-full px-3 py-2.5 rounded-xl text-xs ${theme.inputBg} border border-white/10 text-white focus:border-emerald-400 focus:outline-none`}
                          />
                          <p className="text-[10px] text-slate-400 mt-1">
                            ক্লায়েন্ট ক্লিক করলে হোয়াটসঅ্যাপে এই মেসেজটি স্বয়ংক্রিয়ভাবে ড্রাফট হবে।
                          </p>
                        </div>

                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">
                            উৎপন্ন ডিরেক্ট চ্যাট লিংক (Live Generated Link):
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              readOnly
                              value={settingsForm.whatsappLink}
                              className={`w-full px-3 py-2 rounded-xl text-[11px] font-mono ${theme.inputBg} opacity-80 border border-white/10 text-slate-300`}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (settingsForm.whatsappLink) {
                                  window.open(settingsForm.whatsappLink, "_blank");
                                }
                              }}
                              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 transition-all shrink-0"
                            >
                              <span>Test Chat ↗</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ⭐️ Other Social Channels Grid (Instagram, LinkedIn, YouTube, Twitter) */}
                    <div className={`p-6 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm space-y-4`}>
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div>
                          <h3 className="text-sm font-bold text-white">অন্যান্য সামাজিক যোগাযোগ মাধ্যম (Additional Social Channels)</h3>
                          <p className="text-[11px] text-slate-400">ইনস্টাগ্রাম, লিংকডইন, ইউটিউব ও এক্স (টুইটার) প্রোফাইল লিংকসমূহ</p>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">4 Channels</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Instagram */}
                        <div>
                          <label className="text-xs text-slate-300 font-semibold block mb-1">Instagram URL</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="url"
                              value={settingsForm.instagram}
                              onChange={(e) => setSettingsForm({ ...settingsForm, instagram: e.target.value })}
                              placeholder="https://instagram.com/thumbstopagency"
                              className={`w-full px-3 py-2 rounded-xl text-xs font-mono ${theme.inputBg} border border-white/10 text-pink-300 focus:border-pink-500 focus:outline-none`}
                            />
                            <button
                              type="button"
                              onClick={() => settingsForm.instagram && window.open(settingsForm.instagram, "_blank")}
                              className="px-2.5 py-2 rounded-lg text-xs bg-pink-500/20 text-pink-300 hover:bg-pink-500/30 shrink-0 border border-pink-500/30"
                            >
                              Test
                            </button>
                          </div>
                        </div>

                        {/* LinkedIn */}
                        <div>
                          <label className="text-xs text-slate-300 font-semibold block mb-1">LinkedIn Company Page</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="url"
                              value={settingsForm.linkedin}
                              onChange={(e) => setSettingsForm({ ...settingsForm, linkedin: e.target.value })}
                              placeholder="https://linkedin.com/company/thumbstopagency"
                              className={`w-full px-3 py-2 rounded-xl text-xs font-mono ${theme.inputBg} border border-white/10 text-blue-300 focus:border-blue-500 focus:outline-none`}
                            />
                            <button
                              type="button"
                              onClick={() => settingsForm.linkedin && window.open(settingsForm.linkedin, "_blank")}
                              className="px-2.5 py-2 rounded-lg text-xs bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 shrink-0 border border-blue-500/30"
                            >
                              Test
                            </button>
                          </div>
                        </div>

                        {/* YouTube */}
                        <div>
                          <label className="text-xs text-slate-300 font-semibold block mb-1">YouTube Channel URL</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="url"
                              value={settingsForm.youtube}
                              onChange={(e) => setSettingsForm({ ...settingsForm, youtube: e.target.value })}
                              placeholder="https://youtube.com/@thumbstopagency"
                              className={`w-full px-3 py-2 rounded-xl text-xs font-mono ${theme.inputBg} border border-white/10 text-rose-300 focus:border-rose-500 focus:outline-none`}
                            />
                            <button
                              type="button"
                              onClick={() => settingsForm.youtube && window.open(settingsForm.youtube, "_blank")}
                              className="px-2.5 py-2 rounded-lg text-xs bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 shrink-0 border border-rose-500/30"
                            >
                              Test
                            </button>
                          </div>
                        </div>

                        {/* Twitter / X */}
                        <div>
                          <label className="text-xs text-slate-300 font-semibold block mb-1">Twitter / X Profile URL</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="url"
                              value={settingsForm.twitter}
                              onChange={(e) => setSettingsForm({ ...settingsForm, twitter: e.target.value })}
                              placeholder="https://twitter.com/thumbstopagency"
                              className={`w-full px-3 py-2 rounded-xl text-xs font-mono ${theme.inputBg} border border-white/10 text-slate-200 focus:border-white focus:outline-none`}
                            />
                            <button
                              type="button"
                              onClick={() => settingsForm.twitter && window.open(settingsForm.twitter, "_blank")}
                              className="px-2.5 py-2 rounded-lg text-xs bg-white/10 text-slate-200 hover:bg-white/20 shrink-0 border border-white/20"
                            >
                              Test
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Save Action */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xl shadow-purple-600/30 flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save & Sync All Channels to Live Website</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* CMS 3: Logo & Brand Identity Hub */}
                {cmsPage === "branding" && (
                  <form onSubmit={handleSaveSettings} className="space-y-6">
                    {/* Header Banner */}
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 via-indigo-950/40 to-slate-900 border border-purple-500/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold mb-2">
                          <Sliders className="w-3 h-3" />
                          <span>SUPER ADMIN CONTROL • লোগো ও ব্র্যান্ড আইডেন্টিটি</span>
                        </div>
                        <h2 className="text-base font-bold text-white">
                          অফিসিয়াল লোগো আপলোড ও এজেন্সির পরিচয় নিয়ন্ত্রণ
                        </h2>
                        <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                          ওয়েবসাইটের হেডার, মোবাইল মেনু, ফুটার এবং ইনভয়েসে ব্যবহৃত ব্র্যান্ড এম্ব্লেম ও ফুল লোগো সরাসরি এখান থেকে আপলোড ও কাস্টমাইজ করুন।
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 flex items-center gap-2 shrink-0 self-start sm:self-auto transition-all"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save & Sync All Logos</span>
                      </button>
                    </div>

                    {/* Logo Upload Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Logo 1: Brand Emblem (Monogram Icon) */}
                      <div className={`p-6 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm space-y-4`}>
                        <div className="flex items-center justify-between pb-3 border-b border-white/10">
                          <div>
                            <h3 className="text-sm font-bold text-white">ব্র্যান্ড এম্ব্লেম / আইকন (Logo Emblem)</h3>
                            <p className="text-[11px] text-slate-400">স্কয়ার সাইজ বা ট্রান্সপারেন্ট আইকন (হেডার ও ফেভিকন)</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setSettingsForm({ ...settingsForm, logoUrl: "/images/brand/logo-emblem-transparent.png" });
                              showToast("ডিফল্ট ট্রান্সপারেন্ট এম্ব্লেমে রিসেট করা হয়েছে");
                            }}
                            className="px-2.5 py-1 rounded-lg text-[10px] bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 flex items-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset</span>
                          </button>
                        </div>

                        {/* File Upload Zone */}
                        <div className="p-3.5 rounded-xl border border-dashed border-purple-500/40 bg-purple-500/5 flex items-center justify-between gap-3">
                          <input
                            type="file"
                            accept="image/*"
                            id="logo-emblem-input"
                            className="hidden"
                            onChange={(e) =>
                              handleImageFileUpload(e, (dataUrl) => {
                                setSettingsForm({ ...settingsForm, logoUrl: dataUrl });
                              })
                            }
                          />
                          <div className="flex items-center gap-3">
                            <label
                              htmlFor="logo-emblem-input"
                              className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shrink-0"
                            >
                              <UploadCloud className="w-5 h-5" />
                            </label>
                            <div>
                              <label
                                htmlFor="logo-emblem-input"
                                className="text-xs font-bold text-white cursor-pointer hover:text-purple-300 block"
                              >
                                এম্ব্লেম ছবি আপলোড করুন
                              </label>
                              <span className="text-[10px] text-slate-400">PNG with transparent background</span>
                            </div>
                          </div>
                          <label
                            htmlFor="logo-emblem-input"
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/40 cursor-pointer hover:bg-purple-500/30 shrink-0"
                          >
                            Upload File
                          </label>
                        </div>

                        {/* Text URL */}
                        <div>
                          <label className="text-xs text-slate-400 block mb-1">অথবা এম্ব্লেম ইমেজ পাথ (Logo URL / Path):</label>
                          <input
                            type="text"
                            value={settingsForm.logoUrl}
                            onChange={(e) => setSettingsForm({ ...settingsForm, logoUrl: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl text-xs font-mono ${theme.inputBg}`}
                          />
                        </div>

                        {/* Transparency Checkerboard Preview */}
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1.5">ট্রান্সপারেন্ট প্রিভিউ (Checkered Grid Preview):</label>
                          <div
                            className="w-full h-28 rounded-xl border border-white/10 p-3 flex items-center justify-center relative overflow-hidden"
                            style={{
                              backgroundImage: `linear-gradient(45deg, #181c26 25%, transparent 25%), linear-gradient(-45deg, #181c26 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #181c26 75%), linear-gradient(-45deg, transparent 75%, #181c26 75%)`,
                              backgroundSize: `16px 16px`,
                              backgroundPosition: `0 0, 0 8px, 8px -8px, -8px 0px`,
                              backgroundColor: "#0d1117",
                            }}
                          >
                            <img
                              src={settingsForm.logoUrl}
                              alt="Logo Emblem Preview"
                              className="max-h-full max-w-full object-contain filter drop-shadow-md"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Logo 2: Full Brand Logo (Horizontal / Typography) */}
                      <div className={`p-6 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm space-y-4`}>
                        <div className="flex items-center justify-between pb-3 border-b border-white/10">
                          <div>
                            <h3 className="text-sm font-bold text-white">ফুল ব্র্যান্ড লোগো (Full Brand Logo)</h3>
                            <p className="text-[11px] text-slate-400">এজেন্সির পূর্ণাঙ্গ লোগো (টেক্সট ও আইকন সহ)</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setSettingsForm({ ...settingsForm, logoFullUrl: "/images/brand/thumbstop-logo.png" });
                              showToast("ডিফল্ট ফুল লোগোতে রিসেট করা হয়েছে");
                            }}
                            className="px-2.5 py-1 rounded-lg text-[10px] bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 flex items-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset</span>
                          </button>
                        </div>

                        {/* File Upload Zone */}
                        <div className="p-3.5 rounded-xl border border-dashed border-indigo-500/40 bg-indigo-500/5 flex items-center justify-between gap-3">
                          <input
                            type="file"
                            accept="image/*"
                            id="logo-full-input"
                            className="hidden"
                            onChange={(e) =>
                              handleImageFileUpload(e, (dataUrl) => {
                                setSettingsForm({ ...settingsForm, logoFullUrl: dataUrl });
                              })
                            }
                          />
                          <div className="flex items-center gap-3">
                            <label
                              htmlFor="logo-full-input"
                              className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shrink-0"
                            >
                              <UploadCloud className="w-5 h-5" />
                            </label>
                            <div>
                              <label
                                htmlFor="logo-full-input"
                                className="text-xs font-bold text-white cursor-pointer hover:text-indigo-300 block"
                              >
                                ফুল লোগো ছবি আপলোড করুন
                              </label>
                              <span className="text-[10px] text-slate-400">Horizontal format with typography</span>
                            </div>
                          </div>
                          <label
                            htmlFor="logo-full-input"
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 cursor-pointer hover:bg-indigo-500/30 shrink-0"
                          >
                            Upload File
                          </label>
                        </div>

                        {/* Text URL */}
                        <div>
                          <label className="text-xs text-slate-400 block mb-1">অথবা ফুল লোগো পাথ (Full Logo URL / Path):</label>
                          <input
                            type="text"
                            value={settingsForm.logoFullUrl}
                            onChange={(e) => setSettingsForm({ ...settingsForm, logoFullUrl: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl text-xs font-mono ${theme.inputBg}`}
                          />
                        </div>

                        {/* Transparency Checkerboard Preview */}
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1.5">ট্রান্সপারেন্ট প্রিভিউ (Full Logo Preview):</label>
                          <div
                            className="w-full h-28 rounded-xl border border-white/10 p-3 flex items-center justify-center relative overflow-hidden"
                            style={{
                              backgroundImage: `linear-gradient(45deg, #181c26 25%, transparent 25%), linear-gradient(-45deg, #181c26 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #181c26 75%), linear-gradient(-45deg, transparent 75%, #181c26 75%)`,
                              backgroundSize: `16px 16px`,
                              backgroundPosition: `0 0, 0 8px, 8px -8px, -8px 0px`,
                              backgroundColor: "#0d1117",
                            }}
                          >
                            <img
                              src={settingsForm.logoFullUrl}
                              alt="Full Logo Preview"
                              className="max-h-full max-w-full object-contain filter drop-shadow-md"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Agency Identity & Taglines */}
                    <div className={`p-6 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm space-y-4`}>
                      <div className="pb-3 border-b border-white/10">
                        <h3 className="text-sm font-bold text-white">Agency Name, Taglines & Headquarters</h3>
                        <p className="text-[11px] text-slate-400">এজেন্সির নাম, প্রতিষ্ঠা সাল ও দ্বিভাষিক স্লোগান</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs text-slate-300 font-semibold block mb-1">Agency Brand Name *</label>
                          <input
                            type="text"
                            required
                            value={settingsForm.name}
                            onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl text-xs font-bold ${theme.inputBg}`}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-300 font-semibold block mb-1">Established Year</label>
                          <input
                            type="text"
                            value={settingsForm.established}
                            onChange={(e) => setSettingsForm({ ...settingsForm, established: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl text-xs font-mono ${theme.inputBg}`}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-300 font-semibold block mb-1">Headquarters City</label>
                          <input
                            type="text"
                            value={settingsForm.location}
                            onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-slate-300 font-semibold block mb-1">English Official Tagline</label>
                          <input
                            type="text"
                            value={settingsForm.taglineEn}
                            onChange={(e) => setSettingsForm({ ...settingsForm, taglineEn: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-300 font-semibold block mb-1">বাংলা অফিসিয়াল স্লোগান</label>
                          <input
                            type="text"
                            value={settingsForm.taglineBn}
                            onChange={(e) => setSettingsForm({ ...settingsForm, taglineBn: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl text-xs font-bangla ${theme.inputBg}`}
                          />
                        </div>
                      </div>

                      {/* Live Brand Box Preview */}
                      <div className="p-4 rounded-2xl bg-black/50 border border-white/15 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 p-2 flex items-center justify-center shrink-0">
                            <img
                              src={settingsForm.logoUrl}
                              alt="Logo"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <div className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                              <span>{settingsForm.name}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                Est. {settingsForm.established}
                              </span>
                            </div>
                            <div className="text-xs text-cyan-400 font-medium">{settingsForm.taglineEn}</div>
                            <div className="text-[11px] text-slate-400 font-bangla">{settingsForm.taglineBn}</div>
                          </div>
                        </div>
                        <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[10px] font-mono bg-white/5 text-slate-300 border border-white/10">
                          {settingsForm.location}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Save Action */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xl shadow-purple-600/30 flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save & Sync Brand Identity</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* CMS 4: Website Theme Colors & Glow Customizer */}
                {cmsPage === "colors" && (
                  <form onSubmit={handleSaveSettings} className="space-y-6">
                    {/* Header Banner */}
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-cyan-950/40 to-blue-950/50 border border-emerald-500/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold mb-2">
                          <Palette className="w-3 h-3" />
                          <span>SUPER ADMIN CONTROL • থিম কালার ও ডায়নামিক গ্লো কাস্টমাইজার</span>
                        </div>
                        <h2 className="text-base font-bold text-white">
                          পুরো ওয়েবসাইটের থিম ও অ্যাকসেন্ট কালার পরিবর্তন
                        </h2>
                        <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                          ওয়েবসাইটের প্রাইমারি বাটন, কার্ড গ্লো, গ্রাডিয়েন্ট লাইন এবং টেক্সট হাইলাইটের রঙ এখান থেকে নিজের পছন্দমত নির্বাচন করুন অথবা নিচে দেওয়া ৬টি লাক্সারি প্রিসেট থেকে ১-ক্লিকে সেট করুন।
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/30 flex items-center gap-2 shrink-0 self-start sm:self-auto transition-all"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save & Apply Theme Live</span>
                      </button>
                    </div>

                    {/* Color Pickers & Hex Codes Card */}
                    <div className={`p-6 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm space-y-5`}>
                      <div className="pb-3 border-b border-white/10">
                        <h3 className="text-sm font-bold text-white">প্রাইমারি ও সেকেন্ডারি অ্যাকসেন্ট কালার (Color Pickers)</h3>
                        <p className="text-[11px] text-slate-400">কালার পিকার বা হেক্স কোড লিখে যেকোনো রঙ সিলেক্ট করুন</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Primary Accent Color */}
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">Primary Accent Color</span>
                            <span
                              className="w-4 h-4 rounded-full border border-white/30 shadow"
                              style={{ backgroundColor: settingsForm.themeAccentColor }}
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={settingsForm.themeAccentColor}
                              onChange={(e) => {
                                const col = e.target.value;
                                setSettingsForm({ ...settingsForm, themeAccentColor: col });
                                if (setAccentColor) setAccentColor(col);
                              }}
                              className="w-14 h-12 rounded-xl bg-transparent cursor-pointer border-0 p-0"
                            />
                            <div className="flex-1">
                              <label className="text-[10px] text-slate-400 block mb-1">HEX Color Code</label>
                              <input
                                type="text"
                                value={settingsForm.themeAccentColor}
                                onChange={(e) => {
                                  const col = e.target.value;
                                  setSettingsForm({ ...settingsForm, themeAccentColor: col });
                                  if (setAccentColor) setAccentColor(col);
                                }}
                                className={`w-full px-3 py-2 rounded-xl text-xs font-mono font-bold ${theme.inputBg}`}
                              />
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-400">
                            ব্যবহৃত হয়: মূল বাটন, সক্রিয় লিঙ্ক, আইকন গ্লো এবং হেডলাইনের স্পার্কল-এ।
                          </p>
                        </div>

                        {/* Secondary / Glow Accent Color */}
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">Secondary / Glow Gradient Color</span>
                            <span
                              className="w-4 h-4 rounded-full border border-white/30 shadow"
                              style={{ backgroundColor: settingsForm.themeSecondaryColor }}
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={settingsForm.themeSecondaryColor}
                              onChange={(e) => setSettingsForm({ ...settingsForm, themeSecondaryColor: e.target.value })}
                              className="w-14 h-12 rounded-xl bg-transparent cursor-pointer border-0 p-0"
                            />
                            <div className="flex-1">
                              <label className="text-[10px] text-slate-400 block mb-1">HEX Color Code</label>
                              <input
                                type="text"
                                value={settingsForm.themeSecondaryColor}
                                onChange={(e) => setSettingsForm({ ...settingsForm, themeSecondaryColor: e.target.value })}
                                className={`w-full px-3 py-2 rounded-xl text-xs font-mono font-bold ${theme.inputBg}`}
                              />
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-400">
                            ব্যবহৃত হয়: ব্যাকগ্রাউন্ড রেডিয়াল ব্লার, সেকেন্ডারি গ্রাডিয়েন্ট ও কার্ড বর্ডার গ্লো-তে।
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 6 Curated Luxury Presets (1-Click Switcher) */}
                    <div className={`p-6 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm space-y-4`}>
                      <div className="pb-3 border-b border-white/10">
                        <h3 className="text-sm font-bold text-white">৬টি লাক্সারি কালার প্যালেট প্রিসেট (1-Click Presets)</h3>
                        <p className="text-[11px] text-slate-400">যেকোনো একটি প্রিসেটে ক্লিক করলেই সাথে সাথে সম্পূর্ণ ওয়েবসাইট নতুন থিমে রূপান্তর হবে</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {COLOR_THEME_PRESETS.map((preset) => {
                          const isSelected =
                            settingsForm.themeAccentColor.toLowerCase() === preset.primary.toLowerCase();
                          return (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => {
                                setSettingsForm({
                                  ...settingsForm,
                                  themeAccentColor: preset.primary,
                                  themeSecondaryColor: preset.secondary,
                                });
                                if (setAccentColor) setAccentColor(preset.primary);
                                showToast(`কালার থিম প্রয়োগ করা হয়েছে: ${preset.name}`);
                              }}
                              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                                isSelected
                                  ? "border-white bg-white/10 shadow-xl"
                                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span
                                    className="w-4 h-4 rounded-full shadow-md"
                                    style={{ backgroundColor: preset.primary }}
                                  />
                                  <span
                                    className="w-4 h-4 rounded-full shadow-md -ml-2 border border-black/40"
                                    style={{ backgroundColor: preset.secondary }}
                                  />
                                </div>
                                {isSelected && (
                                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-white text-black">
                                    ACTIVE
                                  </span>
                                )}
                              </div>
                              <div className="text-xs font-bold text-white">{preset.name}</div>
                              <div className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                                {preset.description}
                              </div>
                              <div
                                className="h-1 w-full rounded-full mt-3 opacity-60 group-hover:opacity-100 transition-opacity"
                                style={{
                                  background: `linear-gradient(90deg, ${preset.primary}, ${preset.secondary})`,
                                }}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Real-time Interactive Component Preview */}
                    <div className={`p-6 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm space-y-4`}>
                      <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-white">লাইভ কম্পোনেন্ট প্রিভিউ (Real-Time Interactive Preview)</h3>
                          <p className="text-[11px] text-slate-400">এই থিম কালারে ওয়েবসাইটের বোতাম, কার্ড ও ব্যাজ কেমন দেখাবে:</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-white border border-white/20">
                          LIVE ENGINE
                        </span>
                      </div>

                      <div className="p-6 rounded-2xl bg-[#040711] border border-white/10 space-y-6 relative overflow-hidden">
                        {/* Background Ambient Glow */}
                        <div
                          className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-500"
                          style={{ backgroundColor: settingsForm.themeAccentColor }}
                        />
                        <div
                          className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none transition-all duration-500"
                          style={{ backgroundColor: settingsForm.themeSecondaryColor }}
                        />

                        {/* Button Variations Row */}
                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            style={{
                              background: `linear-gradient(135deg, ${settingsForm.themeAccentColor}, ${settingsForm.themeSecondaryColor})`,
                              boxShadow: `0 8px 24px -6px ${settingsForm.themeAccentColor}66`,
                            }}
                            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 hover:opacity-90 transition-all"
                          >
                            <span>Primary Action Button</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            style={{
                              borderColor: `${settingsForm.themeAccentColor}66`,
                              color: settingsForm.themeAccentColor,
                            }}
                            className="px-4 py-2.5 rounded-xl text-xs font-semibold border bg-white/5 hover:bg-white/10 transition-all"
                          >
                            Glass Secondary Button
                          </button>

                          <span
                            style={{
                              backgroundColor: `${settingsForm.themeAccentColor}22`,
                              borderColor: `${settingsForm.themeAccentColor}44`,
                              color: settingsForm.themeAccentColor,
                            }}
                            className="px-3 py-1 rounded-full text-[10px] font-mono font-bold border flex items-center gap-1.5"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full animate-pulse"
                              style={{ backgroundColor: settingsForm.themeAccentColor }}
                            />
                            <span>FEATURED STATUS BADGE</span>
                          </span>
                        </div>

                        {/* Interactive Glowing Card Preview */}
                        <div
                          className="p-4 rounded-xl border relative transition-all"
                          style={{
                            borderColor: `${settingsForm.themeAccentColor}44`,
                            backgroundColor: "#080e1a",
                            boxShadow: `0 4px 20px -5px ${settingsForm.themeAccentColor}22`,
                          }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-white">Live Glowing Feature Card</span>
                            <span
                              className="text-[10px] font-mono font-bold"
                              style={{ color: settingsForm.themeAccentColor }}
                            >
                              99.4% IMPACT
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">
                            This simulated card dynamically uses your primary accent for borders, glows, and key metric badges.
                          </p>
                          <div
                            className="h-1 w-full rounded-full mt-3"
                            style={{
                              background: `linear-gradient(90deg, ${settingsForm.themeAccentColor}, ${settingsForm.themeSecondaryColor})`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Save Action */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-xl shadow-emerald-500/30 flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save & Publish Theme to Entire Website</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* CMS 2: Public 8 Services & Pricing, Themes & Live Demos Editor */}
                {cmsPage === "services" && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/5">
                      <div>
                        <h2 className="text-base font-bold text-white flex items-center gap-2">
                          <Palette className="w-4 h-4 text-purple-400" />
                          Public Services, Themes & Live Work Demos
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Customize theme accents, badge tags, starting prices, live working prototypes, video reels, and detailed public write-ups.
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20 self-start">
                        {services.length} Services Configured
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {services.map((svc) => {
                        const accent = svc.themeColor || "#1FA8CB";
                        const hasVideo = Boolean(svc.demoVideoUrl);

                        return (
                          <div
                            key={svc.id}
                            className={`p-5 rounded-3xl border ${theme.cardBg} ${theme.cardBorder} shadow-lg space-y-4 flex flex-col justify-between transition-all hover:border-white/20`}
                          >
                            <div className="space-y-3">
                              {/* Header & Badges */}
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span
                                    className="w-3 h-3 rounded-full shadow-sm"
                                    style={{ backgroundColor: accent }}
                                    title={`Theme Color: ${accent}`}
                                  />
                                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/5 text-slate-300 border border-white/10">
                                    {svc.id}
                                  </span>
                                </div>
                                <span className="font-mono font-bold text-sm text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-lg">
                                  {svc.startingPrice}
                                </span>
                              </div>

                              {/* Image Banner thumbnail if available */}
                              {svc.imageUrl && (
                                <div className="relative h-28 rounded-xl overflow-hidden border border-white/10 bg-black/40">
                                  <img
                                    src={svc.imageUrl}
                                    alt={svc.titleEn}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                  {svc.badge && (
                                    <span
                                      className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-black shadow"
                                      style={{ backgroundColor: accent }}
                                    >
                                      {svc.badge}
                                    </span>
                                  )}
                                </div>
                              )}

                              {/* Title & Description */}
                              <div>
                                <h3 className="font-bold text-base text-white">{svc.titleEn}</h3>
                                <div className="text-xs text-slate-400 font-bangla mt-0.5">{svc.titleBn}</div>
                                <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                                  {svc.shortDescriptionEn}
                                </p>
                              </div>

                              {/* Work Screenshots & Video Reel Status */}
                              <div className="p-2.5 rounded-xl bg-black/20 border border-white/5 space-y-2 text-[11px]">
                                <div className="flex items-center justify-between">
                                  <span className="text-slate-400 flex items-center gap-1.5">
                                    <Images className="w-3.5 h-3.5 text-cyan-400" />
                                    Work Screenshots:
                                  </span>
                                  <span className="font-mono text-cyan-300 font-semibold flex items-center gap-1">
                                    {svc.portfolioSamples?.length || 0} Slides Configured
                                  </span>
                                </div>

                                {/* Mini Thumbnails Bar */}
                                {svc.portfolioSamples && svc.portfolioSamples.length > 0 && (
                                  <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                                    {svc.portfolioSamples.slice(0, 4).map((sample, sIdx) => (
                                      <div
                                        key={sIdx}
                                        className="w-9 h-6 rounded border border-white/10 overflow-hidden shrink-0 bg-black/40"
                                        title={sample.title}
                                      >
                                        <img
                                          src={sample.imageUrl}
                                          alt={sample.title}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    ))}
                                    {svc.portfolioSamples.length > 4 && (
                                      <span className="text-[10px] text-slate-400 font-mono">
                                        +{svc.portfolioSamples.length - 4} more
                                      </span>
                                    )}
                                  </div>
                                )}

                                <div className="flex items-center justify-between pt-1 border-t border-white/5">
                                  <span className="text-slate-400 flex items-center gap-1.5">
                                    <Film className="w-3.5 h-3.5 text-purple-400" />
                                    Video Drive Link:
                                  </span>
                                  {hasVideo ? (
                                    <a
                                      href={svc.demoVideoUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="font-mono text-purple-300 hover:underline truncate max-w-[170px] flex items-center gap-1"
                                    >
                                      {svc.demoVideoUrl}
                                      <ArrowUpRight className="w-3 h-3 flex-shrink-0" />
                                    </a>
                                  ) : (
                                    <span className="text-slate-500 italic">Not set</span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Actions Toolbar */}
                            <div className="space-y-2.5 pt-3 border-t border-white/5">
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] text-slate-400 whitespace-nowrap">Price:</span>
                                <input
                                  type="text"
                                  defaultValue={svc.startingPrice}
                                  onBlur={(e) => {
                                    if (e.target.value !== svc.startingPrice) {
                                      updateService(svc.id, { startingPrice: e.target.value });
                                      showToast(`Price updated for ${svc.titleEn}!`);
                                    }
                                  }}
                                  className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-mono ${theme.inputBg}`}
                                  placeholder="e.g. ৳35,000+"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleOpenServiceEditor(svc)}
                                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center gap-1.5 shadow transition-all"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                  Edit Theme & Demos
                                </button>
                                <Link
                                  href={`/services/${svc.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/10 flex items-center justify-center gap-1.5 transition-all"
                                >
                                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                                  <span>View Page ↗</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Modal: Edit Service Theme, Details & Demos */}
                    {editingService && (
                      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                        <div className="w-full max-w-2xl rounded-3xl bg-[#0B132B] border border-purple-500/30 text-white shadow-2xl p-6 sm:p-7 space-y-5 my-auto max-h-[92vh] overflow-y-auto">
                          <div className="flex items-center justify-between pb-3 border-b border-white/10">
                            <div>
                              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400">
                                CMS Service & Demo Customizer
                              </span>
                              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <span
                                  className="w-3.5 h-3.5 rounded-full inline-block"
                                  style={{ backgroundColor: serviceForm.themeColor }}
                                />
                                Edit {serviceForm.titleEn || editingService.titleEn}
                              </h3>
                            </div>
                            <button
                              type="button"
                              onClick={() => setEditingService(null)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5 hover:bg-white/10"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>

                          <form onSubmit={handleSaveServiceEditor} className="space-y-4">
                            {/* Service Names */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="text-xs text-slate-300 block mb-1 font-semibold">
                                  Service Title (English) *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={serviceForm.titleEn}
                                  onChange={(e) => setServiceForm({ ...serviceForm, titleEn: e.target.value })}
                                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900/80 border border-white/10 text-white focus:border-purple-400 focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-xs text-slate-300 block mb-1 font-semibold">
                                  সার্ভিস শিরোনাম (বাংলা) *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={serviceForm.titleBn}
                                  onChange={(e) => setServiceForm({ ...serviceForm, titleBn: e.target.value })}
                                  className="w-full px-3 py-2 rounded-xl text-xs font-bangla bg-slate-900/80 border border-white/10 text-white focus:border-purple-400 focus:outline-none"
                                />
                              </div>
                            </div>

                            {/* Theme Customizer: Badge & Accent Color */}
                            <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 space-y-3">
                              <h4 className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                                <Palette className="w-3.5 h-3.5" />
                                Service Visual Theme & Badge
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="text-[11px] text-slate-300 block mb-1">
                                    Theme Badge Tag (e.g. GUARANTEED STUDENTS)
                                  </label>
                                  <input
                                    type="text"
                                    value={serviceForm.badge}
                                    onChange={(e) => setServiceForm({ ...serviceForm, badge: e.target.value })}
                                    placeholder="e.g. 4K CINEMATIC, ENTERPRISE"
                                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900/80 border border-white/10 text-white font-mono focus:border-purple-400 focus:outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-300 block mb-1">
                                    Starting Price Display
                                  </label>
                                  <input
                                    type="text"
                                    value={serviceForm.startingPrice}
                                    onChange={(e) => setServiceForm({ ...serviceForm, startingPrice: e.target.value })}
                                    placeholder="e.g. ৳35,000+ or Custom Quote"
                                    className="w-full px-3 py-2 rounded-xl text-xs font-mono bg-slate-900/80 border border-white/10 text-amber-400 focus:border-purple-400 focus:outline-none"
                                  />
                                </div>
                              </div>

                              {/* Theme Color Palette Selector */}
                              <div>
                                <label className="text-[11px] text-slate-300 block mb-1.5">
                                  Theme Accent Color:
                                </label>
                                <div className="flex flex-wrap items-center gap-2">
                                  {[
                                    { name: "Cyan", hex: "#1FA8CB" },
                                    { name: "Emerald", hex: "#10B981" },
                                    { name: "Royal Purple", hex: "#8B5CF6" },
                                    { name: "ThumbStop Gold", hex: "#E8B343" },
                                    { name: "Vibrant Amber", hex: "#F59E0B" },
                                    { name: "Rose Pink", hex: "#EC4899" },
                                    { name: "Cobalt Blue", hex: "#3B82F6" },
                                  ].map((p) => (
                                    <button
                                      key={p.hex}
                                      type="button"
                                      onClick={() => setServiceForm({ ...serviceForm, themeColor: p.hex })}
                                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] border transition-all ${
                                        serviceForm.themeColor.toLowerCase() === p.hex.toLowerCase()
                                          ? "border-white bg-white/15 text-white font-bold"
                                          : "border-white/10 bg-black/20 text-slate-300 hover:border-white/30"
                                      }`}
                                    >
                                      <span
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: p.hex }}
                                      />
                                      {p.name}
                                    </button>
                                  ))}
                                  <input
                                    type="text"
                                    value={serviceForm.themeColor}
                                    onChange={(e) => setServiceForm({ ...serviceForm, themeColor: e.target.value })}
                                    className="w-24 px-2 py-1 rounded-lg text-[11px] font-mono bg-black/40 border border-white/20 text-white uppercase text-center"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* ⭐️ Work Screenshots Showcase & Direct File Upload ⭐️ */}
                            <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 space-y-3.5">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div>
                                  <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                                    <Images className="w-3.5 h-3.5" />
                                    কাজের স্ক্রিনশট ও ডেমো স্লাইডার (Auto-Swipe Screenshot Gallery)
                                  </h4>
                                  <p className="text-[10px] text-slate-400 mt-0.5">
                                    ওয়েবসাইটে ক্লায়েন্টরা ক্লিক করলে এই স্ক্রিনশটগুলো অটোমেটিক সোয়াইপ হয়ে প্রদর্শিত হবে।
                                  </p>
                                </div>
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 self-start">
                                  {serviceForm.portfolioSamples.length} Screenshots
                                </span>
                              </div>

                              {/* Upload / Add Action Buttons */}
                              <div className="flex flex-wrap items-center gap-2.5">
                                <label className="cursor-pointer px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md flex items-center gap-2 transition-all">
                                  <UploadCloud className="w-4 h-4" />
                                  <span>📤 সরাসরি স্ক্রিনশট আপলোড করুন (Upload Images)</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleScreenshotFileUpload}
                                    className="hidden"
                                  />
                                </label>

                                <button
                                  type="button"
                                  onClick={() => {
                                    const url = prompt("Enter Screenshot Image URL (e.g. /images/... or https://...):");
                                    if (url) {
                                      const title = prompt("Enter Page Title (e.g. Desktop Homepage):") || "Showcase Screen";
                                      handleAddSampleScreenshot(url, title);
                                    }
                                  }}
                                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 flex items-center gap-1.5 transition-all"
                                >
                                  <Plus className="w-3.5 h-3.5 text-cyan-300" />
                                  <span>Add Image URL</span>
                                </button>
                              </div>

                              {/* Uploaded Screenshots List */}
                              {serviceForm.portfolioSamples.length > 0 ? (
                                <div className="space-y-2 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
                                  {serviceForm.portfolioSamples.map((sample, sIdx) => (
                                    <div
                                      key={sIdx}
                                      className="p-2.5 rounded-xl bg-slate-900/90 border border-white/10 flex items-center gap-3 shadow-sm"
                                    >
                                      <div className="w-16 h-11 rounded-lg overflow-hidden bg-black/60 border border-white/10 shrink-0">
                                        <img
                                          src={sample.imageUrl}
                                          alt={sample.title}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>

                                      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <div>
                                          <label className="text-[9px] text-slate-400 block mb-0.5">Title / Page Name:</label>
                                          <input
                                            type="text"
                                            value={sample.title}
                                            onChange={(e) => handleUpdateScreenshot(sIdx, { title: e.target.value })}
                                            placeholder="Page Name (e.g. Desktop Homepage)"
                                            className="w-full px-2.5 py-1 rounded-lg text-xs bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                                          />
                                        </div>
                                        <div>
                                          <label className="text-[9px] text-slate-400 block mb-0.5">Short Caption:</label>
                                          <input
                                            type="text"
                                            value={sample.caption || ""}
                                            onChange={(e) => handleUpdateScreenshot(sIdx, { caption: e.target.value })}
                                            placeholder="Description / features shown"
                                            className="w-full px-2.5 py-1 rounded-lg text-xs bg-black/40 border border-white/10 text-slate-300 focus:outline-none focus:border-cyan-400"
                                          />
                                        </div>
                                      </div>

                                      <button
                                        type="button"
                                        onClick={() => handleDeleteScreenshot(sIdx)}
                                        className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all shrink-0"
                                        title="Delete Screenshot"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="p-4 rounded-xl bg-black/30 border border-dashed border-white/15 text-center text-xs text-slate-400">
                                  এখনো কোনো স্ক্রিনশট আপলোড করা হয়নি। উপরে "সরাসরি স্ক্রিনশট আপলোড করুন" বাটনে ক্লিক করে প্রজেক্টের পেইজ স্ক্রিনশট যুক্ত করুন।
                                </div>
                              )}
                            </div>

                            {/* ⭐️ Video Work Google Drive Link (Strictly for Video) ⭐️ */}
                            <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                                  <Film className="w-3.5 h-3.5" />
                                  Google Drive / Video Showcase Link
                                </h4>
                                <span className="text-[10px] text-purple-300 font-mono">ভিডিও কাজের ড্রাইভ লিংক</span>
                              </div>
                              <input
                                type="url"
                                value={serviceForm.demoVideoUrl}
                                onChange={(e) => setServiceForm({ ...serviceForm, demoVideoUrl: e.target.value })}
                                placeholder="https://drive.google.com/file/d/... or YouTube / Vimeo link"
                                className="w-full px-3 py-2 rounded-xl text-xs font-mono bg-slate-900/80 border border-white/10 text-purple-300 focus:border-purple-400 focus:outline-none"
                              />
                              <p className="text-[10px] text-slate-400">
                                শুধুমাত্র ভিডিও কাজের ক্ষেত্রে ক্লায়েন্টদের হাই-কোয়ালিটি ভিডিও ফাইল দেখাতে আপনার গুগল ড্রাইভ বা ভিডিও লিংক দিন।
                              </p>
                            </div>

                            {/* Showcase Banner Image URL */}
                            <div>
                              <label className="text-[11px] text-slate-300 block mb-1">
                                Showcase Banner Image URL
                              </label>
                              <input
                                type="text"
                                value={serviceForm.imageUrl}
                                onChange={(e) => setServiceForm({ ...serviceForm, imageUrl: e.target.value })}
                                placeholder="/images/madrasa-showcase.jpg or image URL"
                                className="w-full px-3 py-2 rounded-xl text-xs font-mono bg-slate-900/80 border border-white/10 text-slate-300 focus:border-cyan-400 focus:outline-none"
                              />
                            </div>

                            {/* Short Descriptions */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="text-xs text-slate-300 block mb-1">
                                  Card Summary (English)
                                </label>
                                <textarea
                                  rows={2}
                                  value={serviceForm.shortDescriptionEn}
                                  onChange={(e) => setServiceForm({ ...serviceForm, shortDescriptionEn: e.target.value })}
                                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900/80 border border-white/10 text-white focus:border-purple-400 focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-xs text-slate-300 block mb-1">
                                  কার্ড সংক্ষিপ্ত বিবরণ (বাংলা)
                                </label>
                                <textarea
                                  rows={2}
                                  value={serviceForm.shortDescriptionBn}
                                  onChange={(e) => setServiceForm({ ...serviceForm, shortDescriptionBn: e.target.value })}
                                  className="w-full px-3 py-2 rounded-xl text-xs font-bangla bg-slate-900/80 border border-white/10 text-white focus:border-purple-400 focus:outline-none"
                                />
                              </div>
                            </div>

                            {/* Detailed Scope Write-up for Public Website Modal */}
                            <div className="space-y-3">
                              <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5" />
                                Comprehensive Public Scope Write-up (Shown when visitors click on service)
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="text-[11px] text-slate-300 block mb-1">
                                    Full Project Scope & Methodology (English)
                                  </label>
                                  <textarea
                                    rows={4}
                                    value={serviceForm.detailedDescriptionEn}
                                    onChange={(e) => setServiceForm({ ...serviceForm, detailedDescriptionEn: e.target.value })}
                                    placeholder="Explain your full approach, strategy, and deliverables..."
                                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900/80 border border-white/10 text-white focus:border-purple-400 focus:outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-300 block mb-1">
                                    বিস্তারিত কাজের পরিধি ও কর্মপরিকল্পনা (বাংলা)
                                  </label>
                                  <textarea
                                    rows={4}
                                    value={serviceForm.detailedDescriptionBn}
                                    onChange={(e) => setServiceForm({ ...serviceForm, detailedDescriptionBn: e.target.value })}
                                    placeholder="বিস্তারিত কর্মপরিকল্পনা ও ফলাফল তুলে ধরুন..."
                                    className="w-full px-3 py-2 rounded-xl text-xs font-bangla bg-slate-900/80 border border-white/10 text-white focus:border-purple-400 focus:outline-none"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Key Features List */}
                            <div>
                              <label className="text-xs text-slate-300 block mb-1">
                                Key Deliverables & Features (One per line)
                              </label>
                              <textarea
                                rows={3}
                                value={serviceForm.featuresText}
                                onChange={(e) => setServiceForm({ ...serviceForm, featuresText: e.target.value })}
                                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900/80 border border-white/10 text-white font-mono focus:border-purple-400 focus:outline-none"
                              />
                            </div>

                            {/* Submit & Cancel */}
                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                              <button
                                type="button"
                                onClick={() => setEditingService(null)}
                                className="px-4 py-2.5 rounded-xl text-xs border border-white/10 hover:bg-white/5 text-slate-300"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 flex items-center gap-1.5"
                              >
                                <Check className="w-4 h-4" />
                                Save & Sync Public Website
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}

                    {/* Public Service Modal Preview for Admin */}
                    {previewingService && (
                      <ServiceDetailModal
                        service={previewingService}
                        onClose={() => setPreviewingService(null)}
                      />
                    )}
                  </div>
                )}

                {/* CMS 4: Office Contact & Headquarters */}
                {cmsPage === "contact" && (
                  <form onSubmit={handleSaveSettings} className={`p-6 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm space-y-5`}>
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <h2 className="text-sm font-bold text-white">Dhaka Headquarters & Official Inquiries</h2>
                        <p className="text-[11px] text-slate-400">অফিসিয়াল ফোন নম্বর, ইমেইল ও দ্বৈত ভাষার ঠিকানা নির্ধারণ করুন</p>
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow"
                      >
                        Save Contact Info
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-300 font-semibold block mb-1">Official Phone Number *</label>
                        <input
                          type="text"
                          required
                          value={settingsForm.phone}
                          onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                          className={`w-full px-3 py-2 rounded-xl text-xs font-mono ${theme.inputBg}`}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-300 font-semibold block mb-1">Official Inquiries Email *</label>
                        <input
                          type="email"
                          required
                          value={settingsForm.email}
                          onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                          className={`w-full px-3 py-2 rounded-xl text-xs font-mono ${theme.inputBg}`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-300 font-semibold block mb-1">Office Address (English)</label>
                        <textarea
                          rows={2}
                          value={settingsForm.addressEn}
                          onChange={(e) => setSettingsForm({ ...settingsForm, addressEn: e.target.value })}
                          className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-300 font-semibold block mb-1">অফিসের ঠিকানা (বাংলা)</label>
                        <textarea
                          rows={2}
                          value={settingsForm.addressBn}
                          onChange={(e) => setSettingsForm({ ...settingsForm, addressBn: e.target.value })}
                          className={`w-full px-3 py-2 rounded-xl text-xs font-bangla ${theme.inputBg}`}
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-slate-300 flex items-center gap-3">
                      <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>
                        WhatsApp কনফিগারেশন আলাদা ট্যাবে স্থানান্তরিত হয়েছে। সরাসরি <button type="button" onClick={() => setCmsPage("socials")} className="text-purple-300 underline font-semibold">Facebook & WhatsApp ট্যাবে</button> গিয়ে হোয়াটসঅ্যাপ নম্বর পরিবর্তন করতে পারবেন।
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-lg"
                    >
                      Save & Sync Contact Details
                    </button>
                  </form>
                )}

                {/* CMS 6: Urgent RGB Notice Ticker */}
                {cmsPage === "ticker" && (
                  <form onSubmit={handleSaveSettings} className={`p-6 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm space-y-5`}>
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <h2 className="text-sm font-bold text-white">জরুরি অ্যানাউন্সমেন্ট ও আরজিবি টিকার (Live Notice Ticker)</h2>
                        <p className="text-[11px] text-slate-400">ওয়েবসাইটের শীর্ষভাগে চলমান জরুরি লাইভ স্ক্রোলিং নোটিশ নিয়ন্ত্রণ করুন</p>
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow"
                      >
                        Save Ticker Config
                      </button>
                    </div>

                    {/* Enable / Disable Switch */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                      <div>
                        <div className="text-xs font-bold text-white">টিকার লাইভ স্ট্যাটাস (Active Display)</div>
                        <div className="text-[11px] text-slate-400">অন করলে ওয়েবসাইটের একদম উপরে স্ক্রোলিং নোটিশ প্রদর্শিত হবে</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSettingsForm({ ...settingsForm, urgentTickerEnabled: !settingsForm.urgentTickerEnabled })}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          settingsForm.urgentTickerEnabled
                            ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30"
                            : "bg-slate-700 text-slate-300"
                        }`}
                      >
                        {settingsForm.urgentTickerEnabled ? "✓ TICKER ACTIVE" : "OFF / DISABLED"}
                      </button>
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">
                        জরুরি নোটিশের টেক্সট (Notice Headline Text) *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={settingsForm.urgentTickerText}
                        onChange={(e) => setSettingsForm({ ...settingsForm, urgentTickerText: e.target.value })}
                        placeholder="জরুরি নোটিশ লিখুন..."
                        className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-300 font-semibold block mb-1">বাটন টেক্সট (Action Button Label)</label>
                        <input
                          type="text"
                          value={settingsForm.urgentTickerLinkText}
                          onChange={(e) => setSettingsForm({ ...settingsForm, urgentTickerLinkText: e.target.value })}
                          className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-300 font-semibold block mb-1">বাটন লিংক (Action Destination URL)</label>
                        <input
                          type="text"
                          value={settingsForm.urgentTickerLinkUrl}
                          onChange={(e) => setSettingsForm({ ...settingsForm, urgentTickerLinkUrl: e.target.value })}
                          className={`w-full px-3 py-2 rounded-xl text-xs font-mono ${theme.inputBg}`}
                        />
                      </div>
                    </div>

                    {/* Live Preview Bar */}
                    <div>
                      <label className="text-xs text-slate-400 block mb-1.5">Live Ticker Visual Preview:</label>
                      <div className="p-3 rounded-xl bg-gradient-to-r from-red-900/40 via-purple-900/30 to-blue-900/40 border border-purple-500/30 flex items-center justify-between gap-3 text-xs text-white">
                        <div className="flex items-center gap-2 truncate">
                          <span className="px-2 py-0.5 rounded bg-red-500 text-white font-bold text-[10px] uppercase shrink-0 animate-pulse">
                            URGENT
                          </span>
                          <span className="truncate">{settingsForm.urgentTickerText || "নোটিশ টেক্সট লিখুন"}</span>
                        </div>
                        <span className="px-3 py-1 rounded-lg bg-white/20 text-white text-[11px] font-semibold shrink-0">
                          {settingsForm.urgentTickerLinkText}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-lg"
                    >
                      Save & Sync Ticker
                    </button>
                  </form>
                )}

                {/* CMS 7: Agency Trust Numbers & Stats */}
                {cmsPage === "stats" && (
                  <form onSubmit={handleSaveSettings} className={`p-6 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm space-y-6`}>
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <h2 className="text-sm font-bold text-white">Agency Credibility & Trust Metrics (Stats)</h2>
                        <p className="text-[11px] text-slate-400">ওয়েবসাইটের হোমপেজে প্রদর্শিত মূল পরিসংখ্যান ও গ্রাহক সন্তুষ্টির মেট্রিকস</p>
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow"
                      >
                        Save Trust Stats
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Stat 1 */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-cyan-300">Metric #1</span>
                          <span className="text-[10px] font-mono text-slate-400">Satisfaction</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-1">Value (e.g. 99.4%)</label>
                            <input
                              type="text"
                              value={settingsForm.stat1Value}
                              onChange={(e) => setSettingsForm({ ...settingsForm, stat1Value: e.target.value })}
                              className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-bold text-cyan-300 ${theme.inputBg}`}
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-1">English Label</label>
                            <input
                              type="text"
                              value={settingsForm.stat1LabelEn}
                              onChange={(e) => setSettingsForm({ ...settingsForm, stat1LabelEn: e.target.value })}
                              className={`w-full px-2.5 py-1.5 rounded-lg text-xs ${theme.inputBg}`}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">বাংলা লেবেল</label>
                          <input
                            type="text"
                            value={settingsForm.stat1LabelBn}
                            onChange={(e) => setSettingsForm({ ...settingsForm, stat1LabelBn: e.target.value })}
                            className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-bangla ${theme.inputBg}`}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">Subtext</label>
                          <input
                            type="text"
                            value={settingsForm.stat1Subtext}
                            onChange={(e) => setSettingsForm({ ...settingsForm, stat1Subtext: e.target.value })}
                            className={`w-full px-2.5 py-1.5 rounded-lg text-xs ${theme.inputBg}`}
                          />
                        </div>
                      </div>

                      {/* Stat 2 */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-purple-300">Metric #2</span>
                          <span className="text-[10px] font-mono text-slate-400">Disciplines</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-1">Value (e.g. 8+)</label>
                            <input
                              type="text"
                              value={settingsForm.stat2Value}
                              onChange={(e) => setSettingsForm({ ...settingsForm, stat2Value: e.target.value })}
                              className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-bold text-purple-300 ${theme.inputBg}`}
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-1">English Label</label>
                            <input
                              type="text"
                              value={settingsForm.stat2LabelEn}
                              onChange={(e) => setSettingsForm({ ...settingsForm, stat2LabelEn: e.target.value })}
                              className={`w-full px-2.5 py-1.5 rounded-lg text-xs ${theme.inputBg}`}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">বাংলা লেবেল</label>
                          <input
                            type="text"
                            value={settingsForm.stat2LabelBn}
                            onChange={(e) => setSettingsForm({ ...settingsForm, stat2LabelBn: e.target.value })}
                            className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-bangla ${theme.inputBg}`}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">Subtext</label>
                          <input
                            type="text"
                            value={settingsForm.stat2Subtext}
                            onChange={(e) => setSettingsForm({ ...settingsForm, stat2Subtext: e.target.value })}
                            className={`w-full px-2.5 py-1.5 rounded-lg text-xs ${theme.inputBg}`}
                          />
                        </div>
                      </div>

                      {/* Stat 3 */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-300">Metric #3</span>
                          <span className="text-[10px] font-mono text-slate-400">Turnaround</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-1">Value (e.g. 12-24h)</label>
                            <input
                              type="text"
                              value={settingsForm.stat3Value}
                              onChange={(e) => setSettingsForm({ ...settingsForm, stat3Value: e.target.value })}
                              className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-bold text-emerald-300 ${theme.inputBg}`}
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-1">English Label</label>
                            <input
                              type="text"
                              value={settingsForm.stat3LabelEn}
                              onChange={(e) => setSettingsForm({ ...settingsForm, stat3LabelEn: e.target.value })}
                              className={`w-full px-2.5 py-1.5 rounded-lg text-xs ${theme.inputBg}`}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">বাংলা লেবেল</label>
                          <input
                            type="text"
                            value={settingsForm.stat3LabelBn}
                            onChange={(e) => setSettingsForm({ ...settingsForm, stat3LabelBn: e.target.value })}
                            className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-bangla ${theme.inputBg}`}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">Subtext</label>
                          <input
                            type="text"
                            value={settingsForm.stat3Subtext}
                            onChange={(e) => setSettingsForm({ ...settingsForm, stat3Subtext: e.target.value })}
                            className={`w-full px-2.5 py-1.5 rounded-lg text-xs ${theme.inputBg}`}
                          />
                        </div>
                      </div>

                      {/* Stat 4 */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-300">Metric #4</span>
                          <span className="text-[10px] font-mono text-slate-400">Retention</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-1">Value (e.g. 3x)</label>
                            <input
                              type="text"
                              value={settingsForm.stat4Value}
                              onChange={(e) => setSettingsForm({ ...settingsForm, stat4Value: e.target.value })}
                              className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-bold text-amber-300 ${theme.inputBg}`}
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-1">English Label</label>
                            <input
                              type="text"
                              value={settingsForm.stat4LabelEn}
                              onChange={(e) => setSettingsForm({ ...settingsForm, stat4LabelEn: e.target.value })}
                              className={`w-full px-2.5 py-1.5 rounded-lg text-xs ${theme.inputBg}`}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">বাংলা লেবেল</label>
                          <input
                            type="text"
                            value={settingsForm.stat4LabelBn}
                            onChange={(e) => setSettingsForm({ ...settingsForm, stat4LabelBn: e.target.value })}
                            className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-bangla ${theme.inputBg}`}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">Subtext</label>
                          <input
                            type="text"
                            value={settingsForm.stat4Subtext}
                            onChange={(e) => setSettingsForm({ ...settingsForm, stat4Subtext: e.target.value })}
                            className={`w-full px-2.5 py-1.5 rounded-lg text-xs ${theme.inputBg}`}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-lg"
                    >
                      Save & Sync Metrics
                    </button>
                  </form>
                )}

                {/* CMS 8: Backup, Snapshot & JSON Restore */}
                {cmsPage === "data" && (
                  <div className={`p-6 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-sm space-y-6`}>
                    <div className="pb-3 border-b border-white/10">
                      <h2 className="text-sm font-bold text-white">System Snapshot, Backup & Restore</h2>
                      <p className="text-[11px] text-slate-400">পুরো ওয়েবসাইট কনফিগারেশন, সার্ভিসেস ও এজেন্সির ডেটা ব্যাকআপ ও রিস্টোর করুন</p>
                    </div>

                    {/* Export */}
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                      <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                        <Download className="w-4 h-4 text-purple-400" />
                        Export Full System Snapshot (.JSON)
                      </h3>
                      <p className="text-xs text-slate-400">
                        Download an unencrypted, complete JSON backup containing all website settings, Facebook & WhatsApp gateways, public services, portfolio screenshots, and active clients.
                      </p>
                      <button
                        onClick={() => {
                          const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportData());
                          const dl = document.createElement("a");
                          dl.setAttribute("href", dataStr);
                          dl.setAttribute("download", `thumbstop-full-backup-${Date.now()}.json`);
                          document.body.appendChild(dl);
                          dl.click();
                          dl.remove();
                          showToast("✓ Full JSON backup snapshot downloaded successfully!");
                        }}
                        className={`px-4 py-2.5 rounded-xl text-xs font-semibold border ${theme.secondaryBtn} flex items-center gap-2 shadow transition-all`}
                      >
                        <Download className="w-4 h-4 text-purple-400" />
                        <span>Download Complete JSON Backup</span>
                      </button>
                    </div>

                    {/* Import / Restore */}
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                      <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                        <Upload className="w-4 h-4 text-cyan-400" />
                        Restore Snapshot From JSON File
                      </h3>
                      <p className="text-xs text-slate-400">
                        Upload a previously exported JSON backup to instantly restore all website configurations.
                      </p>
                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          accept=".json"
                          id="json-restore-file-input"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              try {
                                const content = event.target?.result as string;
                                const success = importData(content);
                                if (success) {
                                  showToast("✓ ব্যাকআপ ফাইল সফলভাবে রিস্টোর হয়েছে!");
                                  setTimeout(() => window.location.reload(), 800);
                                } else {
                                  showToast("ত্রুটি: অবৈধ JSON ব্যাকআপ ফরম্যাট!");
                                }
                              } catch {
                                showToast("ব্যাকআপ ফাইল রিড করতে সমস্যা হয়েছে!");
                              }
                            };
                            reader.readAsText(file);
                          }}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById("json-restore-file-input")?.click()}
                          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 flex items-center gap-2 transition-all"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Select JSON File & Restore</span>
                        </button>
                      </div>
                    </div>

                    {/* Factory Reset */}
                    <div className="pt-4 border-t border-white/10 p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-3">
                      <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Factory Reset (ফ্যাক্টরি ডিফল্ট রিস্টোর)
                      </h3>
                      <p className="text-xs text-slate-400">
                        Reset all website content, contact numbers, and agency operational data back to the clean initial deployment defaults.
                      </p>
                      <button
                        onClick={() => {
                          if (confirm("সতর্কতা: আপনি কি নিশ্চিতভাবে সমস্ত ডেটা ফ্যাক্টরি ডিফল্টে রিসেট করতে চান?")) {
                            resetToDefaults();
                            showToast("ফ্যাক্টরি রিসেট সম্পন্ন হয়েছে।");
                            setTimeout(() => window.location.reload(), 600);
                          }
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30 transition-all"
                      >
                        Reset Everything to Factory Defaults
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Dock */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 h-16 border-t px-2 flex items-center justify-around backdrop-blur-xl ${
        isDark ? "bg-[#060D1A]/95 border-white/10" : "bg-white/95 border-slate-200"
      }`}>
        {[
          { id: "dashboard", label: "Home", icon: LayoutDashboard },
          { id: "tasks", label: "Tasks", icon: CheckSquare },
          { id: "clients", label: "Clients", icon: Users },
          ...(isSuperAdmin ? [{ id: "finance", label: "Finance", icon: Receipt }] : []),
        ].map((item) => {
          const Icon = item.icon;
          const isActive =
            (activePage === item.id || (item.id === "finance" && ["payments", "expenses", "salary", "reports"].includes(activePage))) &&
            workspaceMode === "operations";
          return (
            <button
              key={item.id}
              onClick={() => {
                setWorkspaceMode("operations");
                setActivePage(item.id);
                if (item.id === "finance") setFinanceSubTab("payments");
              }}
              className={`flex flex-col items-center justify-center w-14 py-1 text-[10px] transition-colors ${
                isActive ? "text-[#1FA8CB] font-bold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
        {isSuperAdmin && (
          <button
            onClick={() => {
              setWorkspaceMode("cms");
              setCmsPage("socials");
            }}
            className={`flex flex-col items-center justify-center w-14 py-1 text-[10px] transition-colors ${
              workspaceMode === "cms" ? "text-purple-400 font-bold" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Globe className="w-5 h-5 mb-0.5" />
            <span>CMS</span>
          </button>
        )}
      </div>

      {/* Quick Add Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200 ${
            isDark ? "bg-[#0A1222] border-[#1C2E4C] text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold capitalize">
                {modalType === "client" && "Onboard New Client"}
                {modalType === "task" && "Launch New Task / Project"}
                {modalType === "payment" && "Record Client Payment"}
                {modalType === "expense" && "Record Agency Expense"}
                {modalType === "employee" && "Onboard New Employee"}
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleQuickAddSubmit} className="space-y-3.5">
              {/* Task / Schedule Type Selector */}
              {modalType === "task" && (
                <div className="space-y-2">
                  <label className={`text-xs font-semibold block ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    কাজের ধরণ / Schedule Type নির্বাচন করুন
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "client_meeting", label: "Client Meeting", sub: "ক্লায়েন্ট মিটিং ও অফিস ভিজিট" },
                      { id: "studio_session", label: "Studio Session", sub: "ভিডিও শুট ও স্টুডিও সেশন" },
                      { id: "urgent_deadline", label: "Urgent Deadline", sub: "জরুরি হেডলাইন ও ডেডলাইন" },
                      { id: "agency_task", label: "Agency Work", sub: "প্রতিষ্ঠানের অভ্যন্তরীণ কাজ" },
                    ].map((st) => (
                      <button
                        type="button"
                        key={st.id}
                        onClick={() => setFormTaskType(st.id as any)}
                        className={`p-2.5 rounded-xl text-left border transition-all ${
                          formTaskType === st.id
                            ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm"
                            : isDark
                            ? "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <div className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{st.label}</div>
                        <div className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>{st.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* For Payment: Live Search by Client Phone or Name */}
              {modalType === "payment" && (
                <div className={`space-y-2.5 p-3.5 rounded-2xl ${isDark ? "bg-cyan-950/20 border border-cyan-500/30" : "bg-cyan-50/60 border border-cyan-200"}`}>
                  <div className="flex items-center justify-between">
                    <label className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? "text-cyan-300" : "text-cyan-900"}`}>
                      <Search className="w-3.5 h-3.5 text-cyan-400" />
                      <span>ক্লায়েন্ট খুঁজুন (ফোন নম্বর বা নাম দিয়ে সার্চ করুন)</span>
                    </label>
                    {selectedPaymentClient && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPaymentClient(null);
                          setPaymentSearchQuery("");
                          setFormName("");
                          setFormPhone("");
                          setFormAmount("");
                        }}
                        className="text-[10px] text-rose-400 hover:text-rose-300 font-bold underline cursor-pointer"
                      >
                        ✕ ক্লায়েন্ট পরিবর্তন করুন
                      </button>
                    )}
                  </div>

                  {!selectedPaymentClient ? (
                    <div className="space-y-2">
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
                        <input
                          type="text"
                          placeholder="মোবাইল নম্বর (যেমন: 017... বা +880) অথবা ক্লায়েন্টের নাম লিখুন..."
                          value={paymentSearchQuery}
                          onChange={(e) => setPaymentSearchQuery(e.target.value)}
                          className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs ${theme.inputBg} border-cyan-500/30 focus:border-cyan-400`}
                          autoFocus
                        />
                      </div>

                      {paymentSearchQuery.trim() && (
                        <div className={`max-h-48 overflow-y-auto space-y-1.5 p-1 rounded-xl scrollbar-none ${
                          isDark ? "bg-black/40 border border-white/10" : "bg-white border border-slate-200 shadow-lg"
                        }`}>
                          {clients.filter(c =>
                            (c.phone && c.phone.toLowerCase().includes(paymentSearchQuery.toLowerCase())) ||
                            (c.name && c.name.toLowerCase().includes(paymentSearchQuery.toLowerCase())) ||
                            (c.company && c.company.toLowerCase().includes(paymentSearchQuery.toLowerCase()))
                          ).length === 0 ? (
                            <div className="p-3 text-center text-xs text-slate-400">
                              কোনো রেজিস্টার্ড ক্লায়েন্ট পাওয়া যায়নি। আপনি নিচে ম্যানুয়ালি নাম ও টাকা লিখতে পারেন।
                            </div>
                          ) : (
                            clients.filter(c =>
                              (c.phone && c.phone.toLowerCase().includes(paymentSearchQuery.toLowerCase())) ||
                              (c.name && c.name.toLowerCase().includes(paymentSearchQuery.toLowerCase())) ||
                              (c.company && c.company.toLowerCase().includes(paymentSearchQuery.toLowerCase()))
                            ).map(c => (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => {
                                  setSelectedPaymentClient(c);
                                  setFormName(c.name);
                                  setFormPhone(c.phone);
                                  setFormServiceId(c.serviceId);
                                  setFormAmount(c.dueAmount > 0 ? c.dueAmount.toString() : c.totalAmount.toString());
                                }}
                                className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-2 cursor-pointer ${
                                  isDark ? "bg-white/5 hover:bg-cyan-500/15 border border-white/5 hover:border-cyan-500/40" : "bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300"
                                }`}
                              >
                                <div>
                                  <div className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"} flex items-center gap-1.5`}>
                                    <span>{c.name}</span>
                                    {c.company && <span className="text-slate-400 font-normal">({c.company})</span>}
                                  </div>
                                  <div className="text-[11px] text-slate-400 font-mono">
                                    {c.phone} • <span className="text-cyan-400">{c.serviceName}</span>
                                  </div>
                                </div>
                                <div className="text-right shrink-0">
                                  <div className="text-[11px] font-bold text-amber-500 font-mono">
                                    বকেয়া ডিউ: ৳{c.dueAmount.toLocaleString()}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-mono">
                                    চুক্তি: ৳{c.totalAmount.toLocaleString()} | জমা: ৳{c.paidAmount.toLocaleString()}
                                  </div>
                                </div>
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={`p-3 rounded-xl border space-y-2 animate-in fade-in duration-200 ${
                      isDark ? "bg-gradient-to-r from-amber-500/15 via-cyan-500/10 to-transparent border-amber-500/40" : "bg-amber-50/60 border-amber-300"
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className={`text-xs font-bold block ${isDark ? "text-white" : "text-slate-900"}`}>{selectedPaymentClient.name}</span>
                          <span className="text-[11px] text-cyan-400 font-mono">{selectedPaymentClient.phone} • {selectedPaymentClient.serviceName}</span>
                        </div>
                        <div className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 font-mono text-xs font-bold">
                          বকেয়া ডিউ: ৳{selectedPaymentClient.dueAmount.toLocaleString()}
                        </div>
                      </div>

                      <div className={`grid grid-cols-3 gap-2 pt-1 border-t ${isDark ? "border-white/10" : "border-amber-200"} text-center font-mono text-[11px]`}>
                        <div className={`p-1.5 rounded-lg ${isDark ? "bg-black/30" : "bg-white border border-slate-200 shadow-xs"}`}>
                          <div className="text-[10px] text-slate-400">মোট চুক্তি</div>
                          <div className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>৳{selectedPaymentClient.totalAmount.toLocaleString()}</div>
                        </div>
                        <div className={`p-1.5 rounded-lg ${isDark ? "bg-black/30" : "bg-white border border-slate-200 shadow-xs"}`}>
                          <div className="text-[10px] text-slate-400">পরিশোধিত</div>
                          <div className="font-bold text-emerald-500">৳{selectedPaymentClient.paidAmount.toLocaleString()}</div>
                        </div>
                        <div className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30">
                          <div className="text-[10px] text-amber-500">বর্তমান বকেয়া ডিউ</div>
                          <div className="font-bold text-amber-500">৳{selectedPaymentClient.dueAmount.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Title / Name Input for Tasks, Clients, Employees or unselected walk-in payment */}
              {modalType !== "payment" ? (
                <div>
                  <label className="text-xs text-slate-400 block mb-1">
                    {modalType === "client"
                      ? "Client / Organization Name"
                      : modalType === "task"
                      ? "মিটিং বা কাজের শিরোনাম / Title"
                      : modalType === "employee"
                      ? "Employee Full Name"
                      : "Title / Particulars"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={
                      modalType === "task"
                        ? formTaskType === "client_meeting"
                          ? "e.g. Client Meeting with Madrasa Principle"
                          : formTaskType === "studio_session"
                          ? "e.g. 4K Studio Reel Shoot & Production"
                          : formTaskType === "urgent_deadline"
                          ? "e.g. Urgent Meta Ads Approval & Handover"
                          : "Task title"
                        : "Enter name or title"
                    }
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                  />
                </div>
              ) : !selectedPaymentClient ? (
                <div>
                  <label className="text-xs text-slate-400 block mb-1">
                    ক্লায়েন্ট বা প্রতিষ্ঠানের নাম (Client Name)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: Akram Hossain বা প্রতিষ্ঠানের নাম"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                  />
                </div>
              ) : null}

              {/* Specific inputs for Task / Schedule */}
              {modalType === "task" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">
                        ক্লায়েন্ট / প্রতিষ্ঠান (Client Name)
                      </label>
                      <input
                        type="text"
                        placeholder="যেমন: Akram Hossain / আল-মদিনা"
                        value={formClientName}
                        onChange={(e) => setFormClientName(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">
                        তারিখ ও সময় (Scheduled Date & Time)
                      </label>
                      <input
                        type="text"
                        placeholder="যেমন: Tomorrow, 3:30 PM অথবা 06 Sep, 4:00 PM"
                        value={formScheduledTime}
                        onChange={(e) => setFormScheduledTime(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">
                      দায়িত্বপ্রাপ্ত টিম / ব্যক্তি (Assigned Staff / Team)
                    </label>
                    <select
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                    >
                      <option value="Abu Tawfiq (Lead Specialist)">Abu Tawfiq (Lead Specialist)</option>
                      <option value="Sayed Mahmud (Video Director)">Sayed Mahmud (Video Director)</option>
                      <option value="Nabila Tabassum (Art Director)">Nabila Tabassum (Art Director)</option>
                      <option value="Tariqul Islam (Tech Lead)">Tariqul Islam (Tech Lead)</option>
                      <option value="Tanvir Ahmed (Web Dev)">Tanvir Ahmed (Web Dev)</option>
                      {employees.filter(e => !["emp-01", "emp-02", "emp-03", "emp-04", "emp-05"].includes(e.id)).map(e => (
                        <option key={e.id} value={`${e.name} (${e.role})`}>{e.name} ({e.role})</option>
                      ))}
                      <option value="All Team / উন্মুক্ত (Open for All)">All Team / উন্মুক্ত (Open for All)</option>
                    </select>
                  </div>
                </>
              )}

              {(modalType === "client" || modalType === "payment") && (
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Assigned Agency Discipline</label>
                  <select
                    value={formServiceId}
                    onChange={(e) => setFormServiceId(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                        {s.titleEn}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {modalType === "client" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Phone / WhatsApp Number</label>
                      <input
                        type="text"
                        placeholder="+880 1XXXXXXXXX"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Contract Amount (BDT ৳)</label>
                      <input
                        type="number"
                        placeholder="e.g. 35000"
                        value={formAmount}
                        onChange={(e) => setFormAmount(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl text-xs font-mono ${theme.inputBg}`}
                      />
                    </div>
                  </div>

                  {/* Facebook Boosting & Meta Ads Details */}
                  <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/20 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-blue-300 flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formIsBoosting}
                          onChange={(e) => setFormIsBoosting(e.target.checked)}
                          className="w-4 h-4 rounded text-blue-500 bg-slate-900 border-white/20 focus:ring-0 cursor-pointer"
                        />
                        <span>ফেসবুক ও মেটা অ্যাড বুস্টিং (Facebook / Meta Ads Boosting)</span>
                      </label>
                      <span className="text-[10px] text-blue-400 font-mono">ক্যাম্পেইন অপশন</span>
                    </div>

                    {formIsBoosting && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 animate-in fade-in duration-200">
                        <div>
                          <label className="text-[11px] text-slate-300 block mb-1">ফেসবুক পেইজের নাম (Page Name)</label>
                          <input
                            type="text"
                            placeholder="যেমন: আল-মদিনা একাডেমি বা ব্র্যান্ড নাম"
                            value={formFacebookPageName}
                            onChange={(e) => setFormFacebookPageName(e.target.value)}
                            className={`w-full px-2.5 py-1.5 rounded-lg text-xs ${theme.inputBg}`}
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-300 block mb-1">পেইজ লিংক (Facebook Page URL)</label>
                          <input
                            type="url"
                            placeholder="https://facebook.com/yourpage"
                            value={formFacebookPageUrl}
                            onChange={(e) => setFormFacebookPageUrl(e.target.value)}
                            className={`w-full px-2.5 py-1.5 rounded-lg text-xs ${theme.inputBg}`}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {modalType === "payment" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Payment Method</label>
                    <select
                      value={formMethod}
                      onChange={(e) => setFormMethod(e.target.value as any)}
                      className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                    >
                      <option value="bKash" className="bg-slate-900 text-white">bKash Merchant</option>
                      <option value="Nagad" className="bg-slate-900 text-white">Nagad</option>
                      <option value="Rocket" className="bg-slate-900 text-white">Rocket</option>
                      <option value="Bank Wire" className="bg-slate-900 text-white">Bank Wire</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Amount Received (৳)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 25000"
                      value={formAmount}
                      onChange={(e) => setFormAmount(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-mono ${theme.inputBg}`}
                    />
                  </div>
                </div>
              )}

              {modalType === "expense" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Expense Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as any)}
                      className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                    >
                      <option value="Software & Cloud" className="bg-slate-900 text-white">Software & Cloud</option>
                      <option value="Studio & Gear" className="bg-slate-900 text-white">Studio & Gear</option>
                      <option value="Marketing" className="bg-slate-900 text-white">Marketing & Ads</option>
                      <option value="Salary" className="bg-slate-900 text-white">Salary & Contractor</option>
                      <option value="Other" className="bg-slate-900 text-white">Office / Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Amount (৳)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 8500"
                      value={formAmount}
                      onChange={(e) => setFormAmount(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-mono ${theme.inputBg}`}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Payment Method</label>
                    <select
                      value={formMethod}
                      onChange={(e) => setFormMethod(e.target.value as any)}
                      className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                    >
                      <option value="bKash" className="bg-slate-900 text-white">bKash Merchant</option>
                      <option value="Nagad" className="bg-slate-900 text-white">Nagad</option>
                      <option value="Rocket" className="bg-slate-900 text-white">Rocket</option>
                      <option value="Bank Wire" className="bg-slate-900 text-white">Bank Wire</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      <span>খরচের তারিখ (Expense Date)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 04 Sep 2026"
                      value={formExpenseDate}
                      onChange={(e) => setFormExpenseDate(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-mono ${theme.inputBg}`}
                    />
                  </div>
                </div>
              )}

              {modalType === "employee" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Department (বিভাগ)</label>
                      <select
                        value={formDept}
                        onChange={(e) => setFormDept(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                      >
                        <option value="Web & Tech" className="bg-slate-900 text-white">Web & Tech</option>
                        <option value="Video & Animation" className="bg-slate-900 text-white">Video & Animation</option>
                        <option value="Creative" className="bg-slate-900 text-white">Creative & Shoot</option>
                        <option value="Marketing" className="bg-slate-900 text-white">Marketing & Ads</option>
                        <option value="Finance & Accounts" className="bg-slate-900 text-white">Finance</option>
                        <option value="Other / অন্যান্য" className="bg-slate-900 text-white">Other / অন্যান্য ডিপার্টমেন্ট</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Role / পদবি</label>
                      <input
                        type="text"
                        placeholder="যেমন: Video Editor, Web Developer, Graphic Designer বা Other"
                        value={formRole}
                        onChange={(e) => setFormRole(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Monthly Salary (মাসিক বেতন ৳)</label>
                      <input
                        type="number"
                        placeholder="যেমন: 45000"
                        value={formAmount}
                        onChange={(e) => setFormAmount(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl text-xs font-mono ${theme.inputBg}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">যোগদানের তারিখ (Join Date)</label>
                      <input
                        type="text"
                        placeholder={liveDateFormatted || "01 Sep 2026"}
                        value={formEmployeeJoinDate}
                        onChange={(e) => setFormEmployeeJoinDate(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl text-xs font-mono ${theme.inputBg}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Official Email</label>
                      <input
                        type="email"
                        placeholder="staff@thumbstop.agency"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                      />
                    </div>
                  </div>

                  {/* Staff Credentials Assignment */}
                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-2.5">
                    <div className="text-[11px] font-bold text-cyan-300 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>স্টাফ লগইন অ্যাক্সেস (Username & Password)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[10px] text-slate-300 block mb-1">ইউজারনেম (@Username)</label>
                        <input
                          type="text"
                          placeholder="যেমন: robin_dev"
                          value={formUsername}
                          onChange={(e) => setFormUsername(e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg text-xs font-mono text-white ${theme.inputBg}`}
                          style={{ colorScheme: "dark", WebkitTextFillColor: "#ffffff" }}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-300 block mb-1">লগইন পাসওয়ার্ড (Password)</label>
                        <input
                          type="text"
                          placeholder="যেমন: pass2026"
                          value={formPassword}
                          onChange={(e) => setFormPassword(e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg text-xs font-mono text-white ${theme.inputBg}`}
                          style={{ colorScheme: "dark", WebkitTextFillColor: "#ffffff" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 🛡️ Module Access & Permissions Selector System */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#091427] to-[#0B1A33] border border-cyan-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-cyan-400" />
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>মডিউল এক্সেস ও পারমিশন কন্ট্রোল</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">Role-Based</span>
                          </div>
                          <p className="text-[10px] text-slate-400">এই স্টাফ কোন কোন মডিউল দেখতে পাবে তা ড্রপডাউন বা চেকবক্স দিয়ে নির্ধারণ করুন</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-cyan-400 font-mono font-bold">{formAccessModules.length} টি অনুমোদিত</span>
                    </div>

                    {/* Preset Dropdown System */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-300 block mb-1">
                        কুইক রোল প্রিসেট (ড্রপডাউন সিলেক্টর)
                      </label>
                      <select
                        value={formPermissionPreset}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormPermissionPreset(val);
                          const found = ROLE_PERMISSION_PRESETS.find((p) => p.id === val);
                          if (found && val !== "custom") {
                            setFormAccessModules([...found.modules]);
                          }
                        }}
                        className={`w-full px-3 py-2 rounded-xl text-xs font-semibold ${theme.inputBg} border border-cyan-500/30 focus:border-cyan-400`}
                      >
                        {ROLE_PERMISSION_PRESETS.map((p) => (
                          <option key={p.id} value={p.id} className="bg-slate-900 text-white py-1">
                            {p.label}
                          </option>
                        ))}
                      </select>
                      {/* Note */}
                      {formPermissionPreset !== "custom" && (
                        <div className="text-[10px] text-cyan-300/90 mt-1 bg-cyan-500/10 p-1.5 rounded-lg border border-cyan-500/20">
                          💡 {ROLE_PERMISSION_PRESETS.find((p) => p.id === formPermissionPreset)?.note}
                        </div>
                      )}
                    </div>

                    {/* Granular Module Checkboxes */}
                    <div className="pt-2 border-t border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <span>অনুমোদিত মডিউলসমূহ (চেকবক্স দিয়ে কাস্টমাইজ করুন):</span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setFormAccessModules(AVAILABLE_STAFF_MODULES.map((m) => m.id));
                              setFormPermissionPreset("custom");
                            }}
                            className="text-cyan-400 hover:underline"
                          >
                            সব সিলেক্ট
                          </button>
                          <span>•</span>
                          <button
                            type="button"
                            onClick={() => {
                              setFormAccessModules(["Dashboard"]);
                              setFormPermissionPreset("custom");
                            }}
                            className="text-rose-400 hover:underline"
                          >
                            ক্লিয়ার
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                        {AVAILABLE_STAFF_MODULES.map((mod) => {
                          const isSelected = formAccessModules.includes(mod.id);
                          const isConfidential = mod.isConfidential;
                          return (
                            <label
                              key={mod.id}
                              onClick={() => {
                                setFormPermissionPreset("custom");
                                if (isSelected) {
                                  setFormAccessModules(formAccessModules.filter((m) => m !== mod.id));
                                } else {
                                  setFormAccessModules([...formAccessModules, mod.id]);
                                }
                              }}
                              className={`flex items-start gap-2.5 p-2 rounded-xl border cursor-pointer select-none transition-all ${
                                isSelected
                                  ? isConfidential
                                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-200 font-medium"
                                    : "bg-cyan-500/15 border-cyan-500/40 text-cyan-200 font-medium"
                                  : "bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05]"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}}
                                className="mt-0.5 rounded border-white/20 bg-slate-900 text-cyan-500 focus:ring-0 w-3.5 h-3.5"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="text-[11px] font-semibold flex items-center justify-between">
                                  <span className="truncate">{mod.label}</span>
                                  {isConfidential && (
                                    <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono shrink-0 ml-1">
                                      গোপনীয়
                                    </span>
                                  )}
                                </div>
                              </div>
                            </label>
                          );
                        })}
                      </div>

                      <p className="text-[9px] text-amber-300/90 bg-amber-500/10 p-1.5 rounded-lg border border-amber-500/20">
                        ⚠️ <strong>নিরাপত্তা নোটিশ:</strong> রোলস পারমিশন, অ্যাক্টিভিটি লগস এবং ওয়েবসাইট CMS পোর্টাল শুধুমাত্র সুপার অ্যাডমিনের জন্য সংরক্ষিত।
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs text-slate-400 block mb-1">Notes / Specifics</label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Optional notes or milestone deliverables..."
                  className={`w-full px-3 py-2 rounded-xl text-xs ${theme.inputBg}`}
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className={`px-4 py-2 rounded-xl text-xs border ${theme.secondaryBtn}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 rounded-xl text-xs font-semibold shadow-lg ${theme.accentBtn}`}
                >
                  Save & Commit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ⭐️ EXECUTIVE FINANCE STATEMENT & BALANCE AUDIT REPORT (PRINT / PDF MODAL) ⭐️ */}
      {showFinanceStatementModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-[#091120] text-slate-100 rounded-3xl border border-cyan-500/30 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
            {/* Top Control Bar (Hidden on Print) */}
            <div className="p-4 bg-[#0A162B] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0 print:hidden">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300">
                  <Receipt className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">ফাইন্যান্সিয়াল স্টেটমেন্ট ও ব্যালেন্স অডিট রিপোর্ট</h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Official Executive Statement • Super Admin Mode
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Timeframe selector */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <select
                    value={financeTimeframe}
                    onChange={(e) => setFinanceTimeframe(e.target.value as any)}
                    className="bg-transparent text-cyan-300 font-bold text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="all" className="bg-slate-900 text-white">সর্বমোট (All Time)</option>
                    <option value="30d" className="bg-slate-900 text-white">গত ৩০ দিন (Last 30 Days)</option>
                    <option value="28d" className="bg-slate-900 text-white">গত ২৮ দিন (Last 28 Days)</option>
                    <option value="7d" className="bg-slate-900 text-white">গত ৭ দিন (Last 7 Days)</option>
                  </select>
                </div>

                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>প্রিন্ট / সেভ PDF (Print)</span>
                </button>

                <button
                  onClick={() => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportData());
                    const dl = document.createElement("a");
                    dl.setAttribute("href", dataStr);
                    dl.setAttribute("download", `thumbstop-finance-statement-${financeTimeframe}-${Date.now()}.json`);
                    document.body.appendChild(dl);
                    dl.click();
                    dl.remove();
                    showToast("স্টেটমেন্ট এক্সপোর্ট সম্পন্ন হয়েছে!");
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span>JSON এক্সপোর্ট</span>
                </button>

                <button
                  onClick={() => setShowFinanceStatementModal(false)}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable Statement Sheet */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 print:p-0 print:overflow-visible print:bg-white print:text-black">
              {/* Header Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 print:border-slate-300">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-black tracking-wider text-white print:text-black uppercase">
                      THUMBSTOP CREATIVE AGENCY
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-300 print:bg-slate-200 print:text-black border border-cyan-500/30">
                      FINANCE AUDIT
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white print:text-black">
                    বাণিজ্যিক আর্থিক বিবরণী ও ব্যালেন্স প্রতিবেদন
                  </h2>
                  <p className="text-xs text-slate-400 print:text-slate-600 mt-0.5">
                    Official Financial Statement, Cash Inflow Ledger, Operating Outflow & Balance Audit
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0 space-y-1 font-mono text-xs">
                  <div className="text-slate-300 print:text-slate-700">
                    <span className="text-slate-500">স্টেটমেন্ট আইডি:</span>{" "}
                    <span className="font-bold text-white print:text-black">{statementId}</span>
                  </div>
                  <div className="text-slate-300 print:text-slate-700">
                    <span className="text-slate-500">অডিটের তারিখ:</span>{" "}
                    <span className="font-bold text-cyan-400 print:text-black">{liveDateFormatted}</span>
                  </div>
                  <div className="text-slate-300 print:text-slate-700">
                    <span className="text-slate-500">নির্বাচিত সময়কাল:</span>{" "}
                    <span className="font-bold text-amber-400 print:text-black">
                      {financeTimeframe === "all"
                        ? "সর্বমোট (All Time)"
                        : financeTimeframe === "30d"
                        ? "গত ৩০ দিন (Last 30 Days)"
                        : financeTimeframe === "28d"
                        ? "গত ২৮ দিন (Last 28 Days)"
                        : "গত ৭ দিন (Last 7 Days)"}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 Major Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 print:grid-cols-3">
                <div className="p-4 rounded-2xl bg-emerald-950/30 print:bg-slate-50 border border-emerald-500/30 print:border-slate-300">
                  <div className="text-[11px] font-semibold text-emerald-400 print:text-emerald-700 uppercase tracking-wider flex items-center justify-between">
                    <span>মোট নগদ আদায় / জমা (Inflow)</span>
                    <Coins className="w-3.5 h-3.5 text-emerald-400 print:text-emerald-700" />
                  </div>
                  <div className="text-2xl font-black text-white print:text-black font-mono mt-1">
                    ৳ {totalRevenue.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-400/80 print:text-slate-600 mt-1">
                    {filteredPayments.length}টি সফল ক্লায়েন্ট পেমেন্ট
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-950/30 print:bg-slate-50 border border-rose-500/30 print:border-slate-300">
                  <div className="text-[11px] font-semibold text-rose-400 print:text-rose-700 uppercase tracking-wider flex items-center justify-between">
                    <span>মোট ব্যয় ও পরিচালনা খরচ (Outflow)</span>
                    <TrendingDown className="w-3.5 h-3.5 text-rose-400 print:text-rose-700" />
                  </div>
                  <div className="text-2xl font-black text-rose-400 print:text-red-700 font-mono mt-1">
                    - ৳ {totalExpenses.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-rose-400/80 print:text-slate-600 mt-1">
                    {filteredExpenses.length}টি অনুমোদিত ভাউচার খরচ
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-950/30 print:bg-slate-50 border border-cyan-500/40 print:border-slate-300">
                  <div className="text-[11px] font-semibold text-cyan-400 print:text-cyan-800 uppercase tracking-wider flex items-center justify-between">
                    <span>বর্তমান নিট ব্যালেন্স (Net Balance)</span>
                    <Wallet className="w-3.5 h-3.5 text-cyan-400 print:text-cyan-800" />
                  </div>
                  <div className="text-2xl font-black text-cyan-300 print:text-black font-mono mt-1">
                    ৳ {netProfit.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-cyan-400/80 print:text-slate-600 mt-1">
                    মার্জিন: {Math.round((netProfit / (totalRevenue || 1)) * 100)}% উদ্বৃত্ত
                  </div>
                </div>
              </div>

              {/* Client Contract & Receivables Snapshot */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] print:bg-slate-100 border border-white/5 print:border-slate-300 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400 print:text-slate-700" />
                  <span className="text-slate-300 print:text-slate-800 font-medium">ক্লায়েন্ট বাণিজ্যিক অ্যাকাউন্টস: {clients.length} টি</span>
                </div>
                <div className="flex items-center gap-4 font-mono text-xs">
                  <span>মোট চুক্তি: <strong className="text-white print:text-black">৳{clients.reduce((s, c) => s + c.totalAmount, 0).toLocaleString()}</strong></span>
                  <span>মোট পরিশোধিত: <strong className="text-emerald-400 print:text-emerald-700">৳{clients.reduce((s, c) => s + c.paidAmount, 0).toLocaleString()}</strong></span>
                  <span>সর্বমোট বকেয়া (Due): <strong className="text-amber-400 print:text-amber-700">৳{clients.reduce((s, c) => s + c.dueAmount, 0).toLocaleString()}</strong></span>
                </div>
              </div>

              {/* Section 1: Inflow Transactions Ledger */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <h4 className="font-bold text-white print:text-black flex items-center gap-1.5">
                    <Coins className="w-3.5 h-3.5 text-emerald-400 print:text-emerald-700" />
                    <span>ক্লায়েন্ট পেমেন্ট ও জমা ট্রানজেকশন (Cash Inflow Ledger)</span>
                  </h4>
                  <span className="font-mono text-emerald-400 print:text-emerald-700 font-bold text-[11px]">
                    মোট আদায়: ৳ {totalRevenue.toLocaleString()}
                  </span>
                </div>

                <div className="rounded-xl border border-white/10 print:border-slate-300 overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-white/5 print:bg-slate-200 text-slate-400 print:text-slate-700 text-[10px] font-semibold uppercase tracking-wider border-b border-white/10 print:border-slate-300">
                        <th className="p-2.5">ক্লায়েন্ট ও সার্ভিস</th>
                        <th className="p-2.5">গেটওয়ে / মেথড</th>
                        <th className="p-2.5">Trx ID</th>
                        <th className="p-2.5">তারিখ (Date)</th>
                        <th className="p-2.5 text-right">টাকা (Amount)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 print:divide-slate-200">
                      {filteredPayments.map((p) => (
                        <tr key={p.id} className="text-slate-200 print:text-slate-800">
                          <td className="p-2.5 font-medium">
                            <div className="font-bold text-white print:text-black">{p.clientName}</div>
                            <div className="text-[10px] text-slate-400 print:text-slate-600">{p.serviceName}</div>
                          </td>
                          <td className="p-2.5 font-mono text-[11px]">{p.method}</td>
                          <td className="p-2.5 font-mono text-[10px] text-slate-400 print:text-slate-600">{p.transactionId}</td>
                          <td className="p-2.5 font-mono text-[11px]">{p.date}</td>
                          <td className="p-2.5 text-right font-mono font-bold text-emerald-400 print:text-emerald-700">
                            + ৳ {p.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 2: Outflow Expenses Ledger */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <h4 className="font-bold text-white print:text-black flex items-center gap-1.5">
                    <TrendingDown className="w-3.5 h-3.5 text-rose-400 print:text-rose-700" />
                    <span>পরিচালন ব্যয় ও খরচ বিবরণী (Operating Outflow Ledger)</span>
                  </h4>
                  <span className="font-mono text-rose-400 print:text-rose-700 font-bold text-[11px]">
                    মোট খরচ: - ৳ {totalExpenses.toLocaleString()}
                  </span>
                </div>

                <div className="rounded-xl border border-white/10 print:border-slate-300 overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-white/5 print:bg-slate-200 text-slate-400 print:text-slate-700 text-[10px] font-semibold uppercase tracking-wider border-b border-white/10 print:border-slate-300">
                        <th className="p-2.5">ক্যাটাগরি</th>
                        <th className="p-2.5">বিবরণ (Purpose)</th>
                        <th className="p-2.5">মেথড</th>
                        <th className="p-2.5">খরচের তারিখ (Expense Date)</th>
                        <th className="p-2.5 text-right">খরচ (Amount)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 print:divide-slate-200">
                      {filteredExpenses.map((exp) => (
                        <tr key={exp.id} className="text-slate-200 print:text-slate-800">
                          <td className="p-2.5">
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-rose-500/10 print:bg-rose-100 text-rose-400 print:text-rose-800 font-semibold">
                              {exp.category}
                            </span>
                          </td>
                          <td className="p-2.5 font-medium text-white print:text-black">{exp.description}</td>
                          <td className="p-2.5 font-mono text-[10px] text-slate-400 print:text-slate-600">{exp.paymentMethod}</td>
                          <td className="p-2.5 font-mono text-[11px]">
                            <span className="inline-flex items-center gap-1 font-semibold text-slate-200 print:text-slate-800">
                              <Calendar className="w-3 h-3 text-cyan-400 print:text-slate-600" />
                              {exp.date}
                            </span>
                          </td>
                          <td className="p-2.5 text-right font-mono font-bold text-rose-400 print:text-rose-700">
                            - ৳ {exp.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Verification & Signature Stamp */}
              <div className="pt-6 border-t border-white/10 print:border-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white print:text-black">
                      অফিসিয়াল অডিট স্ট্যাম্প ও ডিজিটাল অনুমোদন
                    </div>
                    <div className="text-[10px] text-slate-400 print:text-slate-600 font-mono">
                      CERTIFIED BY SUPER ADMIN & FOUNDER • THUMBSTOP ERP
                    </div>
                  </div>
                </div>

                <div className="text-left sm:text-right border-t sm:border-t-0 border-slate-700 pt-2 sm:pt-0">
                  <div className="text-xs font-bold text-white print:text-black font-mono">Abu Tawfiq</div>
                  <div className="text-[10px] text-slate-400 print:text-slate-600">Chief Executive & Founder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ⭐️ INTERACTIVE CLIENT PROGRESS & DELIVERABLES CHECKLIST MODAL ⭐️ */}
      {selectedClientForProgress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-500/30 bg-[#081226] text-white shadow-2xl p-6 sm:p-7 space-y-6">
            {/* Modal Top Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10 gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg sm:text-xl font-black text-white">
                    {selectedClientForProgress.name}
                  </h2>
                  {selectedClientForProgress.clientCode && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                      {selectedClientForProgress.clientCode}
                    </span>
                  )}
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      selectedClientForProgress.progress === 100
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    }`}
                  >
                    {selectedClientForProgress.progress === 100 ? "COMPLETED" : "IN EXECUTION"}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  সার্ভিস: <strong className="text-cyan-400">{selectedClientForProgress.serviceName}</strong>
                  {selectedClientForProgress.company && ` • ${selectedClientForProgress.company}`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/invoice?clientId=${selectedClientForProgress.id}`}
                  target="_blank"
                  className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-semibold border border-amber-500/30 flex items-center gap-1.5 transition-all shadow-sm"
                  title="ইনভয়েস বের করুন"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">ইনভয়েস (PDF)</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setSelectedClientForProgress(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Live Progress Bar Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  বর্তমান অগ্রগতি (Total Completion)
                </span>
                <span className="text-2xl font-black font-mono text-cyan-400">
                  {selectedClientForProgress.progress}%
                </span>
              </div>
              <div className="h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    selectedClientForProgress.progress === 100
                      ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                      : "bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400"
                  }`}
                  style={{ width: `${selectedClientForProgress.progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
                <span>২৪/৭ লাইভ ক্লায়েন্ট ট্র্যাকারের সাথে তাৎক্ষণিক সিঙ্ক</span>
                <Link
                  href={`/track/${selectedClientForProgress.id}`}
                  target="_blank"
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>ক্লায়েন্ট লাইভ ভিউ</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* ⭐️ SECTION A: ONLINE MADRASA SOLUTION SUB-TASKS CHECKLIST (or if client has stages) ⭐️ */}
            {(selectedClientForProgress.serviceId === "madrasa-solution" ||
              (selectedClientForProgress.stages && selectedClientForProgress.stages.length > 0)) && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <span>মাদরাসা প্যাকেজ ডেলিভারেবল চেকলিস্ট (Sub-tasks Checklist)</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {
                          (selectedClientForProgress.stages || MADRASA_DEFAULT_STAGES).filter(
                            (s) => s.isDone
                          ).length
                        }{" "}
                        / {(selectedClientForProgress.stages || MADRASA_DEFAULT_STAGES).length} সম্পন্ন
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      যে ডেস্কে যে কাজ সম্পন্ন হবে, শুধু টিক চিহ্ন দিন (✓) — স্বয়ংক্রিয়ভাবে প্রোগ্রেস আপডেট হবে:
                    </p>
                  </div>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {(selectedClientForProgress.stages || MADRASA_DEFAULT_STAGES).map(
                    (stage, sIdx) => {
                      return (
                        <div
                          key={sIdx}
                          onClick={() => handleClientStageToggle(sIdx)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                            stage.isDone
                              ? "bg-emerald-950/25 border-emerald-500/40 text-emerald-200 hover:bg-emerald-950/35"
                              : "bg-slate-900/60 border-white/5 text-slate-300 hover:bg-slate-800/80 hover:border-white/10"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                              stage.isDone
                                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 font-black"
                                : "border border-slate-600 hover:border-cyan-400"
                            }`}
                          >
                            {stage.isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span
                                className={`text-xs font-semibold ${
                                  stage.isDone ? "line-through text-emerald-300/80" : "text-white"
                                }`}
                              >
                                {stage.name}
                              </span>
                              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded">
                                +{stage.percentage}%
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 flex-wrap gap-2">
                              <span>
                                {stage.completedBy ? (
                                  <span className="text-emerald-400 font-mono">
                                    ✓ {stage.completedBy}{" "}
                                    {stage.completedAt && `(${stage.completedAt})`}
                                  </span>
                                ) : (
                                  <span className="text-slate-500 italic">
                                    অপেক্ষমান (Pending) • ক্লিক করে টিক দিন
                                  </span>
                                )}
                              </span>

                              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-white/10 text-slate-300">
                                Desk: {stage.assignedRole || "All Team"}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {/* ⭐️ SECTION B: QUICK PERCENTAGE OVERRIDES (For other services or fast change) ⭐️ */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <span>সরাসরি প্রোগ্রেস পার্সেন্টেজ কন্ট্রোল (Direct Progress %)</span>
                </h4>
                <span className="text-[11px] font-mono text-cyan-400 font-bold">
                  {selectedClientForProgress.progress}%
                </span>
              </div>

              {/* 4 Quick Preset Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: "25% • শুরু", val: 25 },
                  { label: "50% • মাঝামাঝি", val: 50 },
                  { label: "75% • রিভিউ", val: 75 },
                  { label: "100% • ডেলিভারি", val: 100 },
                ].map((preset) => (
                  <button
                    key={preset.val}
                    type="button"
                    onClick={() => handleSetDirectProgress(preset.val)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      selectedClientForProgress.progress === preset.val
                        ? "bg-[#1E5BC4] border-cyan-400 text-white shadow-lg"
                        : "bg-slate-900/80 border-white/10 text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Range Slider */}
              <div className="space-y-1 pt-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={selectedClientForProgress.progress}
                  onChange={(e) => handleSetDirectProgress(Number(e.target.value))}
                  className="w-full accent-[#00AEEF] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>0% (Kickoff)</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100% (Completed)</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-2.5 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setSelectedClientForProgress(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-lg"
              >
                সম্পন্ন / সেভ করুন (Close)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ⭐️ MANAGEMENT INTER-PROFILE NOTIFICATION MODAL (সেন্টার পপআপ - কমপ্যাক্ট ও প্রিমিয়াম) ⭐️ */}
      {isNotifModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <div
            onClick={() => setIsNotifModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          />

          {/* Centered Compact Modal Card */}
          <div className="relative z-10 w-full max-w-lg bg-[#070E1E] text-white rounded-2xl sm:rounded-3xl border border-cyan-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.85)] shadow-cyan-500/10 flex flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Top Header with RGB top line */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-[#0A162D]/95 relative shrink-0">
              <div className="absolute top-0 left-0 right-0 h-[2px] rgb-gradient-animated" />

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-md shadow-cyan-500/10 shrink-0">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <span>টিম নোটিফিকেশন হাব</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        LIVE HUB
                      </span>
                    </h2>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      টিম মেম্বারদের আন্তঃযোগাযোগ, টাস্ক অ্যালার্ট এবং বিষয়ভিত্তিক নোটিশ
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsNotifModalOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title="বন্ধ করুন"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

                {/* Active Profile Info & Switcher Bar */}
                <div className="mt-4 p-2.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-between gap-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[11px]">বর্তমান প্রোফাইল:</span>
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${activeProfile.avatarBg}`} />
                      {activeProfile.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10 text-slate-300 font-mono text-[10px]">
                      {activeProfile.title}
                    </span>
                  </div>

                  {/* Switch Active Profile Shortcut */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-400">প্রোফাইল সুইচ:</span>
                    <select
                      value={activeProfileId}
                      onChange={(e) => handleProfileChange(e.target.value)}
                      className="bg-slate-900 text-cyan-300 border border-white/15 px-2 py-1 rounded-lg text-xs font-semibold outline-none cursor-pointer"
                    >
                      {MANAGEMENT_PROFILES.map((p) => (
                        <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                          {p.name} ({p.title})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Floating Toast Notice */}
                {notifToast && (
                  <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>{notifToast}</span>
                  </div>
                )}

                {/* Navigation Tabs */}
                <div className="flex items-center gap-2 mt-4 pt-1">
                  <button
                    onClick={() => setNotifActiveTab("inbox")}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                      notifActiveTab === "inbox"
                        ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>ইনবক্স / নোটিফিকেশন</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      notifActiveTab === "inbox" ? "bg-slate-950 text-cyan-300" : "bg-white/15 text-slate-200"
                    }`}>
                      {profileNotifications.length}
                    </span>
                    {unreadCount > 0 && (
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    )}
                  </button>

                  <button
                    onClick={() => setNotifActiveTab("compose")}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                      notifActiveTab === "compose"
                        ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>নতুন নোটিফিকেশন পাঠান</span>
                  </button>
                </div>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
                {/* TAB 1: INBOX */}
                {notifActiveTab === "inbox" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                      <span className="text-slate-400 font-medium">
                        মোট {profileNotifications.length}টি নোটিফিকেশন ({unreadCount}টি অপঠিত)
                      </span>
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllAsRead}
                          className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline flex items-center gap-1 text-[11px]"
                        >
                          <CheckCheck className="w-3.5 h-3.5" />
                          <span>সব পড়া হয়েছে মার্ক করুন</span>
                        </button>
                      )}
                    </div>

                    {profileNotifications.length === 0 ? (
                      <div className="py-12 text-center text-slate-500">
                        <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
                        <p className="text-xs">কোনো নোটিফিকেশন পাওয়া যায়নি</p>
                      </div>
                    ) : (
                      profileNotifications.map((notif) => {
                        const isSender = notif.senderId === activeProfileId;
                        const isUnread = !notif.isRead && !isSender;

                        return (
                          <div
                            key={notif.id}
                            className={`p-4 rounded-2xl border transition-all relative ${
                              isUnread
                                ? "bg-[#0C1A35] border-cyan-500/50 shadow-lg shadow-cyan-500/5"
                                : "bg-white/[0.02] border-white/10 hover:border-white/20"
                            }`}
                          >
                            {/* Top Row: Sender Info, Subject Tag, Time, Actions */}
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md">
                                  {notif.senderName.charAt(0)}
                                </div>
                                <div>
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="font-bold text-white text-xs">{notif.senderName}</span>
                                    <span className="text-[10px] text-slate-400 font-mono">({notif.senderRole})</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                                    <span className="text-cyan-400 font-medium">
                                      {notif.recipientId === "all" ? "সকল মেম্বারকে (Broadcast)" : `প্রাপক: ${notif.recipientName}`}
                                    </span>
                                    <span>•</span>
                                    <span>{notif.timestamp}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                {notif.priority === "urgent" ? (
                                  <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-[9px] font-black uppercase flex items-center gap-1 animate-pulse">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    জরুরি
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/10 text-[9px] font-bold">
                                    সাধারণ
                                  </span>
                                )}

                                {isUnread && (
                                  <button
                                    onClick={() => handleMarkAsRead(notif.id)}
                                    className="p-1 rounded-md bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[10px] font-semibold flex items-center gap-1 transition-all"
                                    title="পড়া হয়েছে মার্ক করুন"
                                  >
                                    <Check className="w-3 h-3" />
                                  </button>
                                )}

                                <button
                                  onClick={() => handleDeleteNotif(notif.id)}
                                  className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                                  title="মুছে ফেলুন"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Subject / Topic Badge */}
                            <div className="mt-2 flex items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 font-semibold text-[10px] border border-cyan-500/30">
                                বিষয়: {notif.subject || "সাধারণ বার্তা"}
                              </span>
                            </div>

                            {/* Detailed Note Content */}
                            <div className="mt-2 pt-2 border-t border-white/5">
                              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                                {notif.message}
                              </p>
                            </div>

                            {/* Bottom Quick Reply action */}
                            {!isSender && (
                              <div className="mt-2.5 flex justify-end">
                                <button
                                  onClick={() => {
                                    setNotifRecipientId(notif.senderId);
                                    setNotifSubject(notif.subject || "সাধারণ আলোচনা ও প্রশ্ন");
                                    setNotifActiveTab("compose");
                                  }}
                                  className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold hover:underline flex items-center gap-1"
                                >
                                  <Send className="w-3 h-3" />
                                  <span>{notif.senderName}-কে উত্তর দিন</span>
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}

                {/* TAB 2: COMPOSE NOTIFICATION */}
                {notifActiveTab === "compose" && (
                  <form onSubmit={handleSendNotification} className="space-y-4">
                    {/* Sender Info Bar */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
                      <span className="text-slate-400">প্রেরক (Sender):</span>
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${activeProfile.avatarBg}`} />
                        {activeProfile.name} ({activeProfile.title})
                      </span>
                    </div>

                    {/* 1. Recipient Selector: ONLY Super Admin can broadcast to all, others must pick one person */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                        <span>কাকে পাঠাচ্ছেন (Recipient):</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {activeProfileId === "super_admin" ? "সুপার অ্যাডমিন: সবাইকে অথবা একজনকে" : "ম্যানুয়ালি নির্দিষ্ট ১ জনকে নির্বাচন করুন"}
                        </span>
                      </label>
                      <select
                        value={notifRecipientId}
                        onChange={(e) => setNotifRecipientId(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C172E] border border-white/15 text-white font-semibold text-xs outline-none focus:border-cyan-400 cursor-pointer"
                      >
                        {/* Super Admin exclusive: Broadcast to All */}
                        {activeProfileId === "super_admin" && (
                          <option value="all">সকল টিম মেম্বারকে পাঠান (Broadcast to All Team)</option>
                        )}
                        {/* Individual members */}
                        {MANAGEMENT_PROFILES.filter((p) => p.id !== activeProfileId).map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} — {p.title}
                          </option>
                        ))}
                      </select>
                      {activeProfileId !== "super_admin" && (
                        <p className="text-[10px] text-slate-400">
                          * আপনি নির্দিষ্ট একজন সহকর্মীকে নোটিফিকেশন পাঠাতে পারছেন।
                        </p>
                      )}
                    </div>

                    {/* 2. Topic / Subject Selector */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">কোন বিষয়ে (Subject / Topic):</label>
                      <select
                        value={notifSubject}
                        onChange={(e) => setNotifSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C172E] border border-white/15 text-white font-semibold text-xs outline-none focus:border-cyan-400 cursor-pointer"
                      >
                        {NOTIFICATION_SUBJECTS.map((subj) => (
                          <option key={subj} value={subj}>
                            {subj}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 3. Priority Level */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">অগ্রাধিকার (Priority Level):</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setNotifPriority("urgent")}
                          className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                            notifPriority === "urgent"
                              ? "bg-red-500/20 border-red-500/50 text-red-300 shadow-md shadow-red-500/10"
                              : "bg-white/[0.02] border-white/10 text-slate-400 hover:text-white"
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                          <span className="flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5 text-red-400" /><span>জরুরি অ্যালার্ট (Urgent)</span></span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setNotifPriority("normal")}
                          className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                            notifPriority === "normal"
                              ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-md shadow-cyan-500/10"
                              : "bg-white/[0.02] border-white/10 text-slate-400 hover:text-white"
                          }`}
                        >
                          <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5 text-cyan-400" /><span>সাধারণ নোটিশ (Normal)</span></span>
                        </button>
                      </div>
                    </div>

                    {/* 4. Quick Presets: EXCLUSIVELY FOR SUPER ADMIN (ব্যবহারকারীর নির্দেশ: অন্যদের সাজেস্টে থাকবে না) */}
                    {activeProfileId === "super_admin" && (
                      <div className="space-y-1.5 pt-1">
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-amber-400" />
                          <span>সুপার অ্যাডমিন কুইক সাজেস্ট (এক ক্লিকে লিখুন):</span>
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {NOTIF_QUICK_PRESETS.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setNotifMessage(preset);
                                setNotifSubject("জরুরি ডেলিভারি ও ডেডলাইন");
                              }}
                              className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] text-slate-300 hover:text-cyan-300 transition-colors text-left"
                            >
                              {preset}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 5. Detailed Note Textarea (কাজের বিস্তারিত নির্দেশনা) */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                        <span>নোট / বিস্তারিত বার্তা (Detailed Note):</span>
                        <span className="text-[10px] text-slate-400 font-mono">{notifMessage.length} অক্ষর</span>
                      </label>
                      <textarea
                        rows={4}
                        value={notifMessage}
                        onChange={(e) => setNotifMessage(e.target.value)}
                        placeholder="এখানে আপনার কাজের বিস্তারিত নির্দেশনা বা নোট লিখুন..."
                        className="w-full p-3.5 rounded-xl bg-[#0C172E] border border-white/15 text-white font-medium text-xs outline-none focus:border-cyan-400 resize-none leading-relaxed"
                      />
                    </div>

                    {/* 6. Clean Send Button */}
                    <div className="pt-2 flex justify-end gap-2.5 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setNotifActiveTab("inbox")}
                        className="px-4 py-2 rounded-xl text-xs border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                      >
                        বাতিল
                      </button>
                      <button
                        type="submit"
                        disabled={!notifMessage.trim()}
                        className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-40 active:scale-95"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>নোটিফিকেশন পাঠান</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-3.5 bg-[#0A162D]/95 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
                <span>টিপ: যেকোনো সময় নোটিফিকেশন পাঠাতে বা দেখতে পারেন।</span>
                <button
                  type="button"
                  onClick={() => setIsNotifModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
                >
                  বন্ধ করুন (Close)
                </button>
              </div>
            </div>
          </div>
        )}

      {/* 🕌 Full-screen 10-Second Luxury Adhan Notification Modal (Authenticated Management System Only) */}
      <AdhanNotificationModal
        isOpen={!!activeAdhanAlert}
        prayer={activeAdhanAlert}
        dateStr={prayerSchedule?.dateStr || ""}
        dateBn={prayerSchedule?.dateBn || ""}
        soundEnabled={adhanSoundEnabled}
        onClose={() => setActiveAdhanAlert(null)}
      />
    </div>
  );
}
