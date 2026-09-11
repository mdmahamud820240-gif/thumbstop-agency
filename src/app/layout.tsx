import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/content";
import { ContentProvider } from "@/context/ContentContext";
import { AppShell } from "@/components/AppShell";
import { SpeedInsights } from "@vercel/speed-insights/next";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#070A12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.taglineEn}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Bangladesh's premier luxury digital agency. Specializing in online madrasa solutions, high-ROAS marketing, bespoke web development, social media verification, and cinematic video ads.",
  keywords: [
    "ThumbStop",
    "Digital Agency Bangladesh",
    "Online Madrasa Solution",
    "Web Design Dhaka",
    "Meta Verified Bangladesh",
    "Video Editing",
    "Social Media Recovery",
  ],
  authors: [{ name: siteConfig.name }],
  metadataBase: new URL("https://thumbstop.agency"),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ThumbStop",
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.taglineEn}`,
    description:
      "Crafting digital impact that makes every thumb stop. Premier digital architecture, marketing, and media production from Dhaka, Bangladesh.",
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${playfair.variable} ${hindSiliguri.variable} scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ThumbStop" />
        <meta name="application-name" content="ThumbStop" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="bg-[#070A12] text-slate-100 min-h-screen flex flex-col font-sans selection:bg-[#1FA8CB]/30 selection:text-white antialiased">
        <ContentProvider>
          <AppShell>{children}</AppShell>
        </ContentProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
