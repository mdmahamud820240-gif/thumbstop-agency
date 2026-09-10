/**
 * ==============================================================================
 * THUMBSTOP DIGITAL AGENCY - CENTRAL CONTENT CONFIGURATION
 * ==============================================================================
 * 
 * WELCOME! This is the single source of truth for ALL text, prices, services,
 * and contact details on the ThumbStop website.
 * 
 * HOW TO EDIT THIS FILE (FOR NON-DEVELOPERS):
 * 1. To change any text: Simply edit the words inside the quotes ("...").
 * 2. To change a price: Edit the number or the "startingPrice" text string.
 * 3. To add a new service: Copy an existing service block {...}, paste it at
 *    the end of the `services` array, and change its values.
 * 4. To remove a service: Delete or comment out the service block {...}.
 * 5. To change phone, email, WhatsApp, or address: Edit `siteConfig` below.
 * 
 * After saving this file, run `npm run build` or view changes on `npm run dev`.
 * ==============================================================================
 */

export interface ServicePackage {
  name: string;
  price: string;
  period?: string;
  isPopular?: boolean;
  isGuaranteed?: boolean;
  description: string;
  features: string[];
}

export interface PortfolioSample {
  id?: string;
  title: string;
  imageUrl: string;
  caption?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  iconName: string; // Lucide icon identifier
  imageUrl?: string; // High-resolution showcase image
  titleEn: string;
  titleBn: string;
  badge?: string;
  themeColor?: string; // Theme accent color (e.g. #1FA8CB, #10B981, #8B5CF6, #E8B343)
  demoUrl?: string; // Optional internal link
  demoVideoUrl?: string; // Google Drive / Video Showcase Reel Link (specifically for video work)
  portfolioSamples?: PortfolioSample[]; // Array of screenshots for the interactive auto-swipe carousel
  shortDescriptionEn: string;
  shortDescriptionBn: string;
  detailedDescriptionEn: string;
  detailedDescriptionBn: string;
  startingPrice: string;
  categories?: {
    nameEn: string;
    nameBn: string;
    items: string[];
  }[];
  processSteps?: {
    step: number;
    titleEn: string;
    titleBn: string;
    descriptionEn: string;
    descriptionBn: string;
  }[];
  guarantees?: string[];
  features: string[];
  packages?: ServicePackage[];
}

// ------------------------------------------------------------------------------
// OPERATIONAL ERP & CONTROL PANEL DATA STRUCTURES
// ------------------------------------------------------------------------------
export interface ClientRecord {
  id: string;
  clientCode?: string; // Sequential Client ID Number (e.g. TS-CL-001)
  name: string;
  company?: string;
  serviceId: string;
  serviceName: string;
  phone: string;
  email?: string;
  address?: string;
  whatsapp: string;
  paymentMethod: "bKash" | "Nagad" | "Rocket" | "Bank Wire";
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  progress: number;
  status: "active" | "pending" | "completed";
  date: string;
  isLead?: boolean;
  notes?: string;
  stages?: TaskStage[];
  isBoosting?: boolean;
  facebookPageName?: string;
  facebookPageUrl?: string;
}

export interface TaskStage {
  name: string;
  percentage: number;
  isDone: boolean;
  assignedRole?: "editor" | "uploader" | "designer" | "developer" | "admin" | "all";
  completedBy?: string;
  completedAt?: string;
}

export const MADRASA_DEFAULT_STAGES: TaskStage[] = [
  {
    name: "Professional Facebook Page Setup & Optimization",
    percentage: 12.5,
    isDone: true,
    assignedRole: "all",
    completedBy: "Abu Tawfiq (Marketing Lead)",
    completedAt: "02 Sep 2026"
  },
  {
    name: "Custom Islamic Logo & Brand Identity Design",
    percentage: 12.5,
    isDone: true,
    assignedRole: "designer",
    completedBy: "Nabila Tabassum (Art Director)",
    completedAt: "02 Sep 2026"
  },
  {
    name: "High-Impact Promotional Video Production",
    percentage: 12.5,
    isDone: true,
    assignedRole: "editor",
    completedBy: "Sayed Mahmud (Video Lead)",
    completedAt: "03 Sep 2026"
  },
  {
    name: "Targeted Meta Ads Campaign Setup & Management",
    percentage: 12.5,
    isDone: true,
    assignedRole: "all",
    completedBy: "Abu Tawfiq (Ad Specialist)",
    completedAt: "03 Sep 2026"
  },
  {
    name: "Madrasa Management Software & Guardian SMS Portal",
    percentage: 12.5,
    isDone: true,
    assignedRole: "developer",
    completedBy: "Tariqul Islam (Tech Lead)",
    completedAt: "04 Sep 2026"
  },
  {
    name: "Dedicated Authentic Review Video Production",
    percentage: 12.5,
    isDone: true,
    assignedRole: "editor",
    completedBy: "Sayed Mahmud (Video Lead)",
    completedAt: "04 Sep 2026"
  },
  {
    name: "3 Thematic Islamic Social Posts",
    percentage: 12.5,
    isDone: false,
    assignedRole: "designer"
  },
  {
    name: "5 Confirmed Students Enrollment Guarantee & Verification",
    percentage: 12.5,
    isDone: false,
    assignedRole: "admin"
  }
];

export interface TaskRecord {
  id: string;
  clientId?: string;
  title: string;
  clientName: string;
  serviceId?: string;
  serviceName?: string;
  assignedTo: string;
  department: string;
  currentStage?: string;
  progress: number;
  status: "in_progress" | "pending" | "completed";
  deadline: string;
  deliverableUrl?: string;
  stages?: TaskStage[];
  taskType?:
    | "client_meeting"
    | "studio_session"
    | "urgent_deadline"
    | "agency_task"
    | "client_visit"
    | "video_shoot"
    | "internal_todo";
  scheduledTime?: string;
  location?: string;
  notes?: string;
}

export interface EmployeeRecord {
  id: string;
  name: string;
  email: string;
  username?: string;
  password?: string;
  department: string;
  role: string;
  salary: number;
  status: "active" | "on_leave";
  accessModules: string[];
  notes?: string;
  joinDate?: string; // e.g. "01 Jan 2024" or "2024-01-01"
}

export interface PaymentRecord {
  id: string;
  clientName: string;
  serviceName: string;
  method: "bKash" | "Nagad" | "Rocket" | "Bank Wire";
  amount: number;
  date: string;
  transactionId: string;
  status: "Paid" | "Pending";
}

export interface ExpenseRecord {
  id: string;
  category: "Salary" | "Software & Cloud" | "Product Purchase" | "Marketing" | "Studio & Gear" | "Other";
  description: string;
  amount: number;
  date: string;
  paymentMethod: string;
}

export interface SalaryRecord {
  id: string;
  employeeId?: string;
  employeeName: string;
  department: string;
  month: string;
  amount: number;
  status: "Paid" | "Pending";
  paidDate?: string;
}

export interface ActivityLog {
  id: string;
  time: string;
  user: string;
  action: string;
  module: "Clients" | "Tasks" | "Finance" | "Employees" | "System" | "Leads";
  type?: "client" | "payment" | "task" | "expense" | "lead";
}

export interface SiteConfig {
  name: string;
  taglineEn: string;
  taglineBn: string;
  logoUrl?: string;
  logoFullUrl?: string;
  heroImageUrl?: string;
  themeAccentColor?: string; // e.g. #1FA8CB
  themeSecondaryColor?: string; // e.g. #2E5FCC
  heroHeadlineEn?: string;
  heroHeadlineBn?: string;
  heroSubtitleEn?: string;
  heroSubtitleBn?: string;
  heroCtaTextEn?: string;
  heroCtaTextBn?: string;
  heroCtaLink?: string;
  established: string;
  location: string;
  addressEn: string;
  addressBn: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  whatsappLink: string;
  urgentHeadline?: {
    enabled: boolean;
    text: string;
    linkText?: string;
    linkUrl?: string;
  };
  socials: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    twitter: string;
  };
  stats: {
    labelEn: string;
    labelBn: string;
    value: string;
    subtext: string;
  }[];
  aboutStory: {
    headingEn: string;
    headingBn: string;
    subheadingEn: string;
    subheadingBn: string;
    paragraphsEn: string[];
    paragraphsBn: string[];
    values: {
      titleEn: string;
      titleBn: string;
      descriptionEn: string;
      descriptionBn: string;
    }[];
  };
  whyChooseUs: {
    titleEn: string;
    titleBn: string;
    descriptionEn: string;
    descriptionBn: string;
    points: {
      titleEn: string;
      titleBn: string;
      descriptionEn: string;
      descriptionBn: string;
    }[];
  };
  faqs: {
    questionEn: string;
    questionBn: string;
    answerEn: string;
    answerBn: string;
  }[];
}

// ------------------------------------------------------------------------------
// 1. BRAND & CONTACT INFORMATION (Edit your business details here)
// ------------------------------------------------------------------------------
export const siteConfig: SiteConfig = {
  name: "ThumbStop",
  taglineEn: "Got Stopped? It's ThumbStop",
  taglineBn: "আঙুল থামবেই — কারণ এটা থাম্বস্টপ",
  logoUrl: "/images/brand/logo-emblem-transparent.png",
  logoFullUrl: "/images/brand/thumbstop-logo.png",
  heroImageUrl: "/images/hero-showcase.jpg",
  themeAccentColor: "#1FA8CB",
  themeSecondaryColor: "#2E5FCC",
  heroHeadlineEn: "Crafting Digital Impact That Makes Every Thumb Stop.",
  heroHeadlineBn: "ডিজিটাল মাধ্যমে অনন্য প্রভাব — যেখানে আঙুল থামবেই।",
  heroSubtitleEn: "Bangladesh's luxury digital agency uniting institutional madrasa solutions, high-ROAS marketing, bespoke web engineering, Meta verification, and cinematic video production.",
  heroSubtitleBn: "বাংলাদেশের প্রিমিয়াম ডিজিটাল এজেন্সি—অনলাইন মাদরাসা সল্যুশন, হাই-আরওএএস মার্কেটিং, আধুনিক ওয়েব আর্কিটেকচার, মেটা ভেরিফিকেশন ও সিনেমেটিক ভিডিও প্রোডাকশনের নির্ভরযোগ্য প্রতিষ্ঠান।",
  heroCtaTextEn: "Explore Core Services",
  heroCtaTextBn: "বিশেষায়িত সেবা দেখুন",
  heroCtaLink: "/services",
  established: "2023",
  location: "Dhaka, Bangladesh",
  addressEn: "Suite 7B, Gulshan Avenue, Gulshan 1, Dhaka-1212, Bangladesh",
  addressBn: "স্যুট ৭বি, গুলশান এভিনিউ, গুলশান ১, ঢাকা-১২১২, বাংলাদেশ",
  email: "hello@thumbstop.agency",
  phone: "+880 1886-900800",
  whatsappNumber: "+8801886900800",
  // Direct WhatsApp chat link
  whatsappLink: "https://wa.me/8801886900800?text=Hello%20ThumbStop%2C%20I%20want%20to%20discuss%20a%20project",
  urgentHeadline: {
    enabled: true,
    text: "জরুরি নোটিশ: সকল ক্লায়েন্ট মিটিং ও শুটিং শিডিউল যথাসময়ে সম্পন্ন করার নির্দেশ দেওয়া হচ্ছে • নতুন অনলাইন মাদ্রাসা পোর্টাল ২.০ আপডেট লাইভ • ২৪/৭ সাপোর্ট চালু আছে",
    linkText: "বিস্তারিত দেখুন",
    linkUrl: "/admin",
  },
  socials: {
    facebook: "https://facebook.com/thumbstopagency",
    instagram: "https://instagram.com/thumbstopagency",
    linkedin: "https://linkedin.com/company/thumbstopagency",
    youtube: "https://youtube.com/@thumbstopagency",
    twitter: "https://twitter.com/thumbstopagency",
  },
  stats: [
    {
      value: "99.4%",
      labelEn: "Client Satisfaction",
      labelBn: "গ্রাহক সন্তুষ্টি",
      subtext: "Across 450+ delivered campaigns",
    },
    {
      value: "8+",
      labelEn: "Core Digital Disciplines",
      labelBn: "বিশেষায়িত ডিজিটাল সেবা",
      subtext: "End-to-end creative & tech ecosystem",
    },
    {
      value: "12-24h",
      labelEn: "Turnaround Priority",
      labelBn: "দ্রুততম ডেলিভারি ও রিকোভারি",
      subtext: "Rapid execution for time-critical assets",
    },
    {
      value: "3x",
      labelEn: "Higher Hook Retention",
      labelBn: "অধিক হুক রেটেনশন",
      subtext: "High-impact thumb-stopping creatives",
    },
  ],

  // ------------------------------------------------------------------------------
  // 2. AGENCY STORY & PHILOSOPHY (Edit About page text here)
  // ------------------------------------------------------------------------------
  aboutStory: {
    headingEn: "Stopping The Infinite Scroll In A Distracted World",
    headingBn: "অনন্ত স্ক্রলিং থামিয়ে দৃষ্টি আকর্ষণের শৈল্পিক রূপকার",
    subheadingEn: "Born in Dhaka, Built For High-Converting Impact Everywhere.",
    subheadingBn: "বাংলাদেশে উদ্ভাবন, বিশ্বমানের ক্রিয়েটিভ উৎকর্ষতা।",
    paragraphsEn: [
      "Every single second, millions of thumbs flick past generic ads, templated websites, and lifeless designs. At ThumbStop, we engineer creative visual moments and robust technical foundations that force attention, inspire belief, and command action.",
      "Rooted in Bangladesh with a relentless standard for luxury aesthetic execution, we combine deep cultural resonance with precision digital marketing, software architecture, enterprise social recovery, and cinematic video production.",
      "We do not do average. We build brands that become impossible to scroll past."
    ],
    paragraphsBn: [
      "প্রতি সেকেন্ডে সামাজিক মাধ্যমের অগণিত কনটেন্টের ভিড়ে গতানুগতিক ডিজাইন ও বিজ্ঞাপন মানুষ এড়িয়ে যায়। 'থাম্বস্টপ'-এর মূল লক্ষ্যই হলো এমন সৃজনশীল ও মনস্তাত্ত্বিক ভিজ্যুয়াল তৈরি করা যা ব্যবহারকারীর আঙুল থামিয়ে দিতে বাধ্য করে।",
      "আমরা শুধু সেবা দেই না, বরং ব্র্যান্ডের সাথে কাস্টমারের গভীর মানসিক সংযোগ ও নির্ভরযোগ্যতার সেতু তৈরি করি। শিক্ষা প্রতিষ্ঠান থেকে শুরু করে আধুনিক ই-কমার্স ও কর্পোরেট ব্র্যান্ড—সবার জন্য আমাদের প্রতিটি সমাধান নিখুঁত ও রূপান্তরমুখী।"
    ],
    values: [
      {
        titleEn: "Obsession With Craft",
        titleBn: "নিখুঁত নির্মাণশৈলী",
        descriptionEn: "Every pixel, video frame, and line of code is designed to exude luxury and uncompromising precision.",
        descriptionBn: "প্রতিটি পিক্সেল ও ফ্রেমকে আমরা সাজাই অত্যন্ত যত্ন ও আধুনিক নান্দনিকতায়।"
      },
      {
        titleEn: "Guaranteed Commercial Outcome",
        titleBn: "নিশ্চিত ফলাফল ও রিটার্ন",
        descriptionEn: "We tie our creative execution to tangible business growth, confirmed conversions, and verifiable metrics.",
        descriptionBn: "সৃজনশীলতার সাথে বাস্তব ব্যবসায়িক সাফল্য ও কাস্টমার বৃদ্ধির নিশ্চিত মেলবন্ধন।"
      },
      {
        titleEn: "Institutional Security & Speed",
        titleBn: "নিরাপত্তা ও বিদ্যুৎগতির সাপোর্ট",
        descriptionEn: "From 12–24h turnaround verification to enterprise crisis account recovery, we protect your brand equity.",
        descriptionBn: "জরুরি অ্যাকাউন্ট রিকভারি থেকে শুরু করে ২৪ ঘণ্টা দ্রুততম প্রযুক্তিগত সহায়তা।"
      }
    ]
  },

  // ------------------------------------------------------------------------------
  // 3. WHY CHOOSE US (Trust & Credibility Points)
  // ------------------------------------------------------------------------------
  whyChooseUs: {
    titleEn: "Why High-Performing Brands Trust ThumbStop",
    titleBn: "শীর্ষস্থানীয় ব্র্যান্ডগুলো কেন থাম্বস্টপ বেছে নেয়?",
    descriptionEn: "We fuse Dhaka's sharpest creative minds with enterprise execution protocols.",
    descriptionBn: "আমাদের প্রযুক্তি ও নান্দনিকতার সমন্বয় আপনার ব্র্যান্ডকে দেয় অনন্য শ্রেষ্ঠত্ব।",
    points: [
      {
        titleEn: "Thumb-Stopping Creative Architecture",
        titleBn: "অনবদ্য হুক ও থাম্বস্টপিং ক্রিয়েটিভ",
        descriptionEn: "Engineered specifically to capture human attention within the first 1.5 seconds of viewing.",
        descriptionBn: "দর্শকের প্রথম দেড় সেকেন্ডের মনোযোগ আটকে রেখে রূপান্তর নিশ্চিত করার বৈজ্ঞানিক পদ্ধতি।"
      },
      {
        titleEn: "Complete Turnkey Accountability",
        titleBn: "সম্পূর্ণ ওয়ান-স্টপ সমাধান",
        descriptionEn: "From madrasa software and ads to Meta verification and cinematic video ads, one dedicated partner handles all.",
        descriptionBn: "মাদরাসা ম্যানেজমেন্ট থেকে শুরু করে মেটা ভেরিফিকেশন ও সিনেমেটিক ভিডিও—সবকিছু এক ছাতার নিচে।"
      },
      {
        titleEn: "Direct Support With No Bureaucracy",
        titleBn: "সরাসরি হোয়াটসঅ্যাপ ও ডেডিকেটেড সাপোর্ট",
        descriptionEn: "Transparent pricing in BDT, dedicated project leads, and instant communication via WhatsApp.",
        descriptionBn: "স্বচ্ছ মূল্যতালিকা, সরাসরি প্রজেক্ট লিডের সাথে যোগাযোগ এবং নিরবচ্ছিন্ন সার্বক্ষণিক সেবা।"
      }
    ]
  },

  // ------------------------------------------------------------------------------
  // 4. FREQUENTLY ASKED QUESTIONS (Edit FAQs here)
  // ------------------------------------------------------------------------------
  faqs: [
    {
      questionEn: "How do I get started with ThumbStop?",
      questionBn: "থাম্বস্টপের সাথে কাজ শুরু করার উপায় কি?",
      answerEn: "Select your desired service or contact us directly via WhatsApp or the contact form. We provide a customized roadmap and kickoff within 24 hours.",
      answerBn: "আপনার প্রয়োজনীয় সেবাটি সিলেক্ট করুন অথবা সরাসরি হোয়াটসঅ্যাপ বা ফর্মের মাধ্যমে মেসেজ দিন। ২৪ ঘণ্টার মধ্যে আমরা আপনার সাথে যোগাযোগ করব।"
    },
    {
      questionEn: "What payment methods do you accept?",
      questionBn: "পেমেন্ট পরিশোধের মাধ্যম কি কি?",
      answerEn: "We accept bKash, Nagad, Rocket, direct Bank Transfer (all major Bangladeshi banks), and international credit cards / wire.",
      answerBn: "বিকাশ, নগদ, রকেট, যেকোনো বাংলাদেশি ব্যাংকের অনলাইন ট্রান্সফার এবং ইন্টারন্যাশনাল কার্ডের মাধ্যমে পেমেন্ট করা যায়।"
    },
    {
      questionEn: "Can I customize a package for my specific agency or business needs?",
      questionBn: "আমার ব্যবসার জন্য কি কাস্টম প্যাকেজ নেওয়া সম্ভব?",
      answerEn: "Yes! Every single package can be scaled or customized. Talk to our project consultants for custom enterprise scopes.",
      answerBn: "হ্যাঁ, আপনার পছন্দ ও প্রয়োজন অনুযায়ী যেকোনো প্যাকেজ কাস্টমাইজ করে নেওয়া যাবে।"
    },
    {
      questionEn: "How fast is the Social Media Verification & Account Recovery process?",
      questionBn: "সোশ্যাল মিডিয়া ভেরিফিকেশন ও রিকভারি হতে কতক্ষণ সময় লাগে?",
      answerEn: "Our Meta Verified service has a turnaround of 12 to 24 hours. Emergency hacked/locked account resolutions typically begin immediately upon case submission.",
      answerBn: "মেটা ভেরিফাইড সাবস্ক্রিপশন সাধারণত ১২ থেকে ২৪ ঘণ্টার মধ্যে প্রস্তুত হয়। এবং জরুরি অ্যাকাউন্ট রিকভারি কাজ সাথে সাথেই শুরু করা হয়।"
    }
  ]
};

// ------------------------------------------------------------------------------
// 5. THE 8 SERVICES (Edit, reorder, or add services here)
// ------------------------------------------------------------------------------
export const services: ServiceItem[] = [
  // ----------------------------------------------------------------------------
  // SERVICE 1: অনলাইন মাদরাসা সল্যুশন (Online Madrasa Solution)
  // ----------------------------------------------------------------------------
  {
    id: "madrasa-solution",
    slug: "online-madrasa-solution",
    iconName: "BookOpenCheck",
    imageUrl: "/images/madrasa-solution.jpg",
    badge: "Guaranteed Students",
    themeColor: "#10B981",
    demoVideoUrl: "https://drive.google.com/file/d/sample-madrasa-demo/view",
    portfolioSamples: [
      {
        title: "Student Admission & Online Application Portal",
        imageUrl: "/images/madrasa-solution.jpg",
        caption: "Clean, responsive portal where parents apply and submit student documentation online."
      },
      {
        title: "Digital Institutional Homepage & Islamic Branding",
        imageUrl: "/images/hero-showcase.jpg",
        caption: "Exclusive Islamic typography, course catalog, and campus showcase layout."
      },
      {
        title: "Fee Management & Guardian SMS Automation Dashboard",
        imageUrl: "/images/web-development.jpg",
        caption: "Automated monthly tuition fee collections via bKash/Nagad and instant SMS receipts."
      },
      {
        title: "Social Enrollment Campaign Creative Suite",
        imageUrl: "/images/digital-marketing.jpg",
        caption: "Targeted enrollment ad creatives generating 500+ qualified guardian admissions."
      }
    ],
    titleEn: "Online Madrasa Solution",
    titleBn: "অনলাইন মাদরাসা সল্যুশন",
    startingPrice: "Custom Quote",
    shortDescriptionEn: "A complete end-to-end operational, branding, and student enrollment engine for modern online madrasas.",
    shortDescriptionBn: "অনলাইন মাদরাসার প্রচার, কাস্টম লোগো, ম্যানেজমেন্ট সফটওয়্যার ও নিশ্চিত শিক্ষার্থী ভর্তির পূর্ণাঙ্গ প্যাকেজ।",
    detailedDescriptionEn: "A specialized turnkey solution designed specifically for Islamic institutions seeking high-enrollment growth and automated digital administration. Includes full social presence, customized brand identity, dedicated student-teacher-guardian management software, viral promotional videos, and contractual student guarantees.",
    detailedDescriptionBn: "আধুনিক অনলাইন মাদরাসা পরিচালনার জন্য আমাদের বিশেষায়িত পূর্ণাঙ্গ প্যাকেজ। প্রফেশনাল পেইজ ও লোগো ডিজাইন থেকে শুরু করে শিক্ষক, অভিভাবক ও শিক্ষার্থীদের জন্য স্বয়ংক্রিয় সফটওয়্যার, আকর্ষণীয় প্রমোশনাল ভিডিও ও সরাসরি ছাত্র ভর্তির নিশ্চয়তা।",
    features: [
      "Professional Facebook Page Setup & Optimization",
      "Custom Islamic Logo & Brand Identity Design",
      "High-Impact Promotional Video + Targeted Ads Campaign",
      "Teacher, Guardian & Student Management Software",
      "Dedicated Authentic Review Video Production",
      "3 Custom Thematic Islamic Social Posts",
      "Contractual Guarantee of 5 Confirmed Students",
      "3 Months Dedicated On-Demand Technical Support",
      "6 Months General Maintenance & Consultation"
    ],
    guarantees: [
      "৫ জন নিশ্চিত শিক্ষার্থী ভর্তির নিশ্চয়তা (5 Confirmed Students Guaranteed)",
      "৩ মাসের সার্বক্ষণিক ডেডিকেটেড সাপোর্ট (3 Months Dedicated Support)",
      "৬ মাসের সাধারণ সফটওয়্যার ও ক্যাম্পেইন সাপোর্ট (6 Months General Support)"
    ],
    packages: [
      {
        name: "Complete Institutional Suite",
        price: "Contact for Institutional Quote",
        isGuaranteed: true,
        description: "Full turnkey solution including branding, software ecosystem, ad strategy, and student guarantees.",
        features: [
          "Complete Facebook Page creation & branding",
          "Exclusive Islamic logo design",
          "Promotional video + targeted ads management",
          "Comprehensive management software (Teacher/Student/Guardian)",
          "Own review video production",
          "3 High-aesthetic Islamic social media posts",
          "5 Confirmed students enrollment guarantee",
          "3 Months dedicated direct support",
          "6 Months general maintenance"
        ]
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // SERVICE 2: ডিজিটাল মার্কেটিং (Digital Marketing)
  // ----------------------------------------------------------------------------
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    iconName: "TrendingUp",
    imageUrl: "/images/digital-marketing.jpg",
    badge: "High ROAS",
    themeColor: "#F59E0B",
    portfolioSamples: [
      {
        title: "ROAS 6.2x Meta Ads Campaign Performance",
        imageUrl: "/images/digital-marketing.jpg",
        caption: "Real-time analytics dashboard showcasing conversion scaling and lowest CAC."
      },
      {
        title: "Psychological Ad Creative & Video Scripting",
        imageUrl: "/images/hero-showcase.jpg",
        caption: "Thumb-stopping hooks and motion creatives engineered for maximum click-through rate."
      },
      {
        title: "Multi-Platform Retargeting Funnel Architecture",
        imageUrl: "/images/graphic-design.jpg",
        caption: "Comprehensive buyer journey targeting cold traffic to repeat high-value orders."
      }
    ],
    titleEn: "Digital Marketing",
    titleBn: "ডিজিটাল মার্কেটিং",
    startingPrice: "৳8,000+",
    shortDescriptionEn: "Data-driven Ads Creation and continuous Ads Management engineered to maximize Return on Ad Spend.",
    shortDescriptionBn: "বিজ্ঞাপন তৈরি, টার্গেটেড ক্যাম্পেইন পরিচালনা, নিয়মিত মনিটরিং এবং সার্বিক ডিজিটাল মার্কেটিং সেবা।",
    detailedDescriptionEn: "Stop burning ad budget on futile impressions. We structure scientifically planned marketing funnels consisting of psychological ad planning, thumb-stopping creatives, and real-time ad performance management with transparent reporting.",
    detailedDescriptionBn: "সঠিক গ্রাহকের কাছে আপনার পণ্য বা সেবা পৌঁছে দিতে আমাদের ডেটা-ড্রিভেন অ্যাড স্ট্র্যাটেজি। কনটেন্ট প্ল্যানিং, দৃষ্টিনন্দন বিজ্ঞাপন তৈরি ও প্রতিদিনের অপ্টিমাইজেশন দিয়ে আমরা এনে দেই সর্বোচ্চ সেলস ও আরওএএস (ROAS)।",
    features: [
      "Ads Creation: Psychological content planning & hook guidelines",
      "Creative Ad copy & high-converting visual scripting",
      "Ads Management: Continuous bid optimization & audience retargeting",
      "Transparent regular analytics & performance reports",
      "Optional Add-on: Complete business website integration",
      "Optional Add-on: Mobile application for internal management"
    ],
    categories: [
      {
        nameEn: "Ads Creation (বিজ্ঞাপন তৈরি)",
        nameBn: "অ্যাড ক্রিয়েশন ও প্ল্যানিং",
        items: [
          "Strategic Ad & Content Planning Guidelines",
          "High-CTR Copywriting & Visual Storyboards",
          "A/B Creative Split Testing Formulation"
        ]
      },
      {
        nameEn: "Ads Management (বিজ্ঞাপন পরিচালনা)",
        nameBn: "অ্যাড ম্যানেজমেন্ট ও মনিটরিং",
        items: [
          "24/7 Continuous Budget & Bid Monitoring",
          "Advanced Audience Retargeting & Pixel Tracking",
          "Weekly & Monthly Transparent ROI Reporting"
        ]
      },
      {
        nameEn: "Digital Ecosystem Upgrades (ঐচ্ছিক সেবা)",
        nameBn: "ডিজিটাল ইকোসিস্টেম",
        items: [
          "Complete Conversion-Engineered Business Website",
          "Cross-Platform Mobile Management Application"
        ]
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // SERVICE 3: ওয়েব ডিজাইন ও ডেভেলপমেন্ট (Web Design & Development)
  // ----------------------------------------------------------------------------
  {
    id: "web-development",
    slug: "web-design-development",
    iconName: "CodeXml",
    imageUrl: "/images/web-development.jpg",
    badge: "3-Step Delivery",
    themeColor: "#1FA8CB",
    portfolioSamples: [
      {
        title: "Apple-Grade Desktop Homepage & Fluid Motion UI",
        imageUrl: "/images/web-development.jpg",
        caption: "Dark luxury aesthetic, 60fps micro-interactions, and instant sub-second page loads."
      },
      {
        title: "High-Converting E-Commerce Product & Checkout Flow",
        imageUrl: "/images/hero-showcase.jpg",
        caption: "One-click bKash/Nagad checkout engineered to minimize cart abandonment."
      },
      {
        title: "Mobile-First Responsive Experience & App-like Navigation",
        imageUrl: "/images/digital-marketing.jpg",
        caption: "Flawless rendering on iOS & Android devices with thumb-friendly navigation."
      },
      {
        title: "Client Admin Control Center & Content Management",
        imageUrl: "/images/madrasa-solution.jpg",
        caption: "Clean intuitive dashboard for effortless product, order, and blog updates."
      }
    ],
    titleEn: "Web Design & Development",
    titleBn: "ওয়েব ডিজাইন ও ডেভেলপমেন্ট",
    startingPrice: "৳10,000+",
    shortDescriptionEn: "High-performance, luxury web experiences engineered with modern frameworks, fast load speeds, and seamless checkouts.",
    shortDescriptionBn: "পরিকল্পনা থেকে ডেভেলপমেন্ট—পার্সোনাল, ই-কমার্স ও বিজনেস ওয়েবসাইটের প্রিমিয়াম সমাধান।",
    detailedDescriptionEn: "A website is the flagship digital showroom of your enterprise. Through our structured 3-step process (Planning → Design → Development), we deliver ultra-fast, mobile-first, and SEO-optimized web platforms built for long-term scalability.",
    detailedDescriptionBn: "আমাদের ৩-ধাপের বিশেষ পদ্ধতিতে (পরিকল্পনা → ডিজাইন → ডেভেলপমেন্ট) আমরা তৈরি করি দৃষ্টিনন্দন, দ্রুতগতির ও সুরক্ষিত ওয়েবসাইট। প্রতিটি সাইট মোবাইল-রেসপনসিভ ও গুগলে দ্রুত র‍্যাংক করার উপযোগী করে সাজানো হয়।",
    features: [
      "Structured 3-Stage Process: Planning → Design → Development",
      "Domain (.com) & High-Speed NVMe SSD Hosting Included",
      "Custom UI/UX Prototypes & Mobile-First Coding",
      "Payment Gateway Integration (bKash, Nagad, Cards)",
      "Live Chat & Automated Courier Delivery Tracking",
      "Enterprise Speed Optimization & Core Web Vitals Compliance",
      "Clean Modular CMS Architecture for Effortless Content Updates"
    ],
    processSteps: [
      {
        step: 1,
        titleEn: "Planning (পরিকল্পনা)",
        titleBn: "পরিকল্পনা ও রিসার্চ",
        descriptionEn: "Deep discovery of your user journey, technical stack architecture, and conversion requirements.",
        descriptionBn: "আপনার ব্যবসার লক্ষ্য, টার্গেট অডিয়েন্স এবং প্রয়োজনীয় ফিচার বিশ্লেষণ করে পূর্ণাঙ্গ প্ল্যান তৈরি।"
      },
      {
        step: 2,
        titleEn: "Design (ডিজাইন)",
        titleBn: "ইউআই/ইউএক্স ডিজাইন",
        descriptionEn: "Bespoke wireframes and high-fidelity visual mockups reflecting a world-class luxury aesthetic.",
        descriptionBn: "আধুনিক ও লাক্সারি লুকের ইউজার ফ্রেন্ডলি ইন্টারফেস ডিজাইন ও ফিডব্যাক ফাইনাল করা।"
      },
      {
        step: 3,
        titleEn: "Development (ডেভেলপমেন্ট)",
        titleBn: "ডেভেলপমেন্ট ও লাইভ",
        descriptionEn: "Clean, performant code execution, payment integrations, SEO optimization, and rigorous testing.",
        descriptionBn: "দ্রুতগতির কোডিং, পেমেন্ট গেটওয়ে, সিকিউরিটি এবং এসইও অপ্টিমাইজেশন সম্পন্ন করে সাইট লাইভ।"
      }
    ],
    packages: [
      {
        name: "Personal Website (পার্সোনাল ওয়েবসাইট)",
        price: "৳10,000+",
        description: "Ideal for doctors, consultants, portfolio owners, and individual service professionals.",
        features: [
          ".com Domain Registration Included",
          "5GB High-Speed SSD Hosting Included",
          "WordPress / Custom CMS Platform",
          "Basic Technical & On-Page SEO Setup",
          "Mobile-First Responsive Layout",
          "Contact Forms & Social Media Integration"
        ]
      },
      {
        name: "E-commerce Website (ই-কমার্স ওয়েবসাইট)",
        price: "৳15,000+",
        isPopular: true,
        description: "Engineered for high-volume retailers and brands ready to automate online orders.",
        features: [
          "All features from Personal Website package",
          "Integrated Automated Payment Gateway (bKash/Cards)",
          "Live Customer Chat Widget Setup",
          "Courier & Delivery Tracking API Integration",
          "Automated Invoice Generation & SMS Alerts",
          "Inventory & Product Catalog Manager"
        ]
      },
      {
        name: "Business / Corporate (বিজনেস ওয়েবসাইট)",
        price: "৳20,000+",
        isGuaranteed: true,
        description: "Enterprise caliber for corporations, agencies, and large-scale brands requiring maximum authority.",
        features: [
          "All features from E-commerce package",
          "Advanced Core Web Vitals Speed Optimization",
          "Comprehensive Multi-Page Advanced SEO Structure",
          "Custom Interactive Elements & Micro-Animations",
          "Multi-Layered DDoS & Malware Security Protocols",
          "Dedicated 60-Day Post-Launch Maintenance"
        ]
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // SERVICE 4: সোশ্যাল মিডিয়া সল্যুশন (Social Media Solution)
  // ----------------------------------------------------------------------------
  {
    id: "social-solution",
    slug: "social-media-solution",
    iconName: "ShieldAlert",
    imageUrl: "/images/social-recovery.jpg",
    badge: "Crisis Recovery",
    themeColor: "#EC4899",
    portfolioSamples: [
      {
        title: "Enterprise Social Account Security & Recovery Protocol",
        imageUrl: "/images/social-recovery.jpg",
        caption: "Forensic mitigation and credential restoration for high-value business assets."
      },
      {
        title: "Meta Verified Business Identity Protection Handover",
        imageUrl: "/images/meta-verification.jpg",
        caption: "2FA hardware key enforcement and official Meta concierge account hardening."
      },
      {
        title: "Crisis Resolution & Ownership Re-establishment",
        imageUrl: "/images/hero-showcase.jpg",
        caption: "Full legal and technical restoration of compromised commercial Facebook pages."
      }
    ],
    titleEn: "Social Media Solution",
    titleBn: "সোশ্যাল মিডিয়া সল্যুশন",
    startingPrice: "On Assessment",
    shortDescriptionEn: "Emergency recovery and institutional security for Facebook, Instagram, Twitter, and LinkedIn accounts.",
    shortDescriptionBn: "হ্যাক হওয়া আইডি উদ্ধার, লক বা ডিজেবল অ্যাকাউন্ট সমাধান ও মনিটাইজেশন সমস্যা নিরসন।",
    detailedDescriptionEn: "Account lockouts and malicious takeovers cost brands immense revenue and reputation. Our certified team applies direct escalation paths to restore compromised accounts and resolve monetization, 2-step verification, and copyright disputes.",
    detailedDescriptionBn: "ফেসবুক, ইনস্টাগ্রাম, টুইটার বা লিঙ্কডইন অ্যাকাউন্টের যেকোনো জটিল নিরাপত্তা ও পলিসি সমস্যার সমাধান। হ্যাক হওয়া পেজ/আইডি দ্রুত পুনরুদ্ধার, লক বা ডিজেবল হওয়া সমাধান এবং স্বত্বাধিকার (কপিরাইট) বিষয়ক জটিলতা নিরসন।",
    features: [
      "Hack Account Recovery: Direct escalation & credential restoration",
      "Lock Account Fix: Identity verification bypass & compliance appeals",
      "Disable Account Fix: Official meta & platform appeal submission",
      "2-Step Verification Lock Fix: Authenticator & phone desync resolution",
      "Copyright Dispute Solution: DMCA counternotices & strike clearances",
      "Monetization Policy Recovery: Policy violation cleanup & payout audits"
    ],
    categories: [
      {
        nameEn: "Supported Platforms",
        nameBn: "সমর্থিত প্ল্যাটফর্ম",
        items: ["Facebook (পেইজ ও প্রোফাইল)", "Instagram (ব্যবসায়িক ও ক্রিয়েটর)", "Twitter / X", "LinkedIn Enterprise"]
      },
      {
        nameEn: "Specialized Security Interventions",
        nameBn: "বিশেষায়িত সমাধানসমূহ",
        items: [
          "হ্যাক হওয়া অ্যাকাউন্ট উদ্ধার (Hack Account Recovery)",
          "লক অ্যাকাউন্ট ফিক্স (Lock Account Fix)",
          "ডিজেবল অ্যাকাউন্ট সমাধান (Disable Account Fix)",
          "টু-স্টেপ ভেরিফিকেশন লক সমাধান (2-Step Verification Fix)",
          "কপিরাইট স্ট্রাইক সমাধান (Copyright Solution)",
          "মনিটাইজেশন সমস্যা ও পেআউট ফিক্স (Monetization Solution)"
        ]
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // SERVICE 5: গ্রাফিক্স ডিজাইন (Graphic Design)
  // ----------------------------------------------------------------------------
  {
    id: "graphic-design",
    slug: "graphic-design",
    iconName: "Palette",
    imageUrl: "/images/graphic-design.jpg",
    badge: "24h Support",
    themeColor: "#8B5CF6",
    portfolioSamples: [
      {
        title: "Modern Brand Identity System & Style Guide",
        imageUrl: "/images/graphic-design.jpg",
        caption: "Vector logo craftsmanship, bespoke typography pairings, and chromatic hierarchy."
      },
      {
        title: "Premium Luxury Packaging & Print Collateral",
        imageUrl: "/images/hero-showcase.jpg",
        caption: "Matte-finish commercial packaging, foil-stamped business cards, and marketing brochures."
      },
      {
        title: "Viral High-CTR Social Media Ad Creative Suite",
        imageUrl: "/images/digital-marketing.jpg",
        caption: "High-impact carousel graphics and product promotional banners."
      }
    ],
    titleEn: "Graphic Design",
    titleBn: "গ্রাফিক্স ডিজাইন",
    startingPrice: "৳500+",
    shortDescriptionEn: "World-class visual aesthetics across social media, print collateral, and retail merchandise with 24hr turnaround.",
    shortDescriptionBn: "সোশ্যাল ব্যানার, প্রিন্ট ডিজাইন ও মার্চেন্ডাইজ পণ্যের আকর্ষণীয় নান্দনিক ডিজাইন।",
    detailedDescriptionEn: "Visual craft that commands prestige. From scroll-stopping Facebook feed creatives to luxury tactile print catalogues and retail merchandise, our design studio blends luxury aesthetics with sharp conversion psychology.",
    detailedDescriptionBn: "সেরা মান, ২৪ ঘণ্টার দ্রুত ডেলিভারি এবং সাশ্রয়ী বাজেটে প্রিমিয়াম গ্রাফিক্স ডিজাইন সেবা। ব্র্যান্ডের ইমেজ ফুটে তুলবে এমন আকর্ষণীয় ডিজিটাল অ্যাড ব্যানার থেকে শুরু করে প্রিন্ট ও মার্চেন্ডাইজ প্যাকেজিং।",
    features: [
      "Industry-Leading Aesthetic Quality & Grid Balance",
      "24-Hour Urgent Turnaround Availability",
      "Affordable Scalable Package Pricing",
      "Print-Ready High-DPI Vector Assets",
      "Full Commercial Copyright Transfer Upon Delivery"
    ],
    categories: [
      {
        nameEn: "Social & Digital Marketing Design",
        nameBn: "সোশ্যাল ও ডিজিটাল ব্যানার",
        items: [
          "Social Ad Banners (Facebook, Instagram Carousel, Stories)",
          "Email Templates & Email Newsletters",
          "Facebook Cover & Profile Branding",
          "YouTube Channel Art & High-CTR Thumbnails",
          "Twitter / LinkedIn Header Banners"
        ]
      },
      {
        nameEn: "Print Collateral Design",
        nameBn: "প্রিন্ট ও পাবলিকেশন ডিজাইন",
        items: [
          "Corporate Flyers & Postcards",
          "Multi-Fold Brochures & Company Profiles",
          "Billboards & Event Posters",
          "Luxury Product Catalogues & Lookbooks"
        ]
      },
      {
        nameEn: "Product & Merchandise Design",
        nameBn: "পণ্য ও মার্চেন্ডাইজ প্যাকেজিং",
        items: [
          "Custom Apparel & T-Shirt Graphics",
          "Luxury Box & Retail Product Packaging",
          "Custom Shopping Bags, Bottles & Mug Branding"
        ]
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // SERVICE 6: সোশ্যাল মিডিয়া ভেরিফিকেশন (Social Media Verification)
  // ----------------------------------------------------------------------------
  {
    id: "meta-verification",
    slug: "social-media-verification",
    iconName: "BadgeCheck",
    imageUrl: "/images/meta-verification.jpg",
    badge: "Meta Verified",
    themeColor: "#3B82F6",
    portfolioSamples: [
      {
        title: "Official Meta Blue Verified Badge Approval",
        imageUrl: "/images/meta-verification.jpg",
        caption: "Successfully verified Facebook & Instagram public figures and business entities."
      },
      {
        title: "Press Release & Notability Portfolio Documentation",
        imageUrl: "/images/hero-showcase.jpg",
        caption: "Comprehensive national and international press coverage aggregation."
      },
      {
        title: "Meta Business Manager Verification & Green Security Status",
        imageUrl: "/images/social-recovery.jpg",
        caption: "Tax registration, trade license compliance, and domain authentication verified."
      }
    ],
    titleEn: "Social Media Verification",
    titleBn: "সোশ্যাল মিডিয়া ভেরিফিকেশন",
    startingPrice: "৳3,000",
    shortDescriptionEn: "Authorized Meta Verified subscription setup with blue badge, direct human support access, and elevated reach.",
    shortDescriptionBn: "মেটা ভেরিফায়েড ব্লু ব্যাজ সেটআপ, অফিসিয়াল সাপোর্ট অ্যাক্সেস এবং প্রোফাইলের রিচ বৃদ্ধি।",
    detailedDescriptionEn: "Establish undeniable brand authority. We guide and execute the official Meta Verified subscription protocol for your Facebook and Instagram profiles with guaranteed documentation compliance and expedited 12–24hr turnaround.",
    detailedDescriptionBn: "আপনার ফেসবুক বা ইনস্টাগ্রাম প্রোফাইলে ব্লু টিক (Blue Badge) পাওয়ার নিশ্চিত সহায়তা। অফিসিয়াল মেটা ভেরিফাইড সাবস্ক্রিপশন সম্পন্ন করার মাধ্যমে পেইক অ্যাকাউন্ট প্রতিরোধ, সর্বোচ্চ রিচ ও ডিরেক্ট সাপোর্ট সুবিধা উপভোগ করুন।",
    features: [
      "Official Verified Blue Badge Placement on Meta platforms",
      "Priority Direct Human Support Channel Access from Meta",
      "Significant Algorithmic Increase in Visibility & Comment Reach",
      "Proactive Impersonation Protection & Identity Safeguarding",
      "Rapid 12 to 24 Hour Turnaround Setup Protocol",
      "Transparent Subscription Architecture in BDT"
    ],
    packages: [
      {
        name: "New Meta Verification Setup (নতুন সাবস্ক্রিপশন)",
        price: "৳3,000",
        period: "one-time setup",
        isPopular: true,
        description: "Complete legal identity audit, document compliance preparation, and verified badge onboarding.",
        features: [
          "Documentation & ID compliance review",
          "Official application submission to Meta",
          "Blue verification badge activation",
          "Turnaround time: 12–24 hours",
          "Direct Meta human support activation"
        ]
      },
      {
        name: "Monthly Subscription Renewal (মাসিক রিনিউয়াল)",
        price: "৳1,440",
        period: "per month",
        description: "Hassle-free maintenance and seamless monthly Meta Verified subscription renewal.",
        features: [
          "Uninterrupted badge status guarantee",
          "Monthly billing management in BDT",
          "Priority alert monitoring against suspension",
          "Continuous identity security assurance"
        ]
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // SERVICE 7: ভিডিও এডিটিং ও অ্যানিমেশন (Video Editing & Animation)
  // ----------------------------------------------------------------------------
  {
    id: "video-animation",
    slug: "video-editing-animation",
    iconName: "Film",
    imageUrl: "/images/video-animation.jpg",
    badge: "Motion & Sound",
    themeColor: "#8B5CF6",
    demoVideoUrl: "https://drive.google.com/file/d/sample-video-editing-reel/view",
    portfolioSamples: [
      {
        title: "4K Timeline Color Grading & DaVinci Resolve Workflow",
        imageUrl: "/images/video-animation.jpg",
        caption: "Cinematic film emulation, LUT balancing, and multi-camera audio mastering."
      },
      {
        title: "Motion Graphics & 3D Visual Effects Showcase",
        imageUrl: "/images/hero-showcase.jpg",
        caption: "After Effects typography animation, kinetic text, and commercial sound design."
      },
      {
        title: "High-Paced Viral Social Reel Editing Format (9:16)",
        imageUrl: "/images/model-video.jpg",
        caption: "Dynamic pacing, sound effects, and retention-engineered visual cutaways."
      }
    ],
    titleEn: "Video Editing & Animation",
    titleBn: "ভিডিও এডিটিং ও অ্যানিমেশন",
    startingPrice: "৳850+",
    shortDescriptionEn: "Cinematic commercial video editing, 2D motion graphics, and studio-grade multi-language voiceovers.",
    shortDescriptionBn: "ব্র্যান্ডের স্টোরিটেলিংয়ের জন্য ২ডি অ্যানিমেশন, আধুনিক ভিডিও এডিটিং ও প্রফেশনাল ভয়েস ওভার।",
    detailedDescriptionEn: "Videos that hold viewers spellbound from the opening second. We blend dynamic pacing, sound design, custom 2D animated characters, and broadcast-grade human voice talent to tell stories that ignite desire.",
    detailedDescriptionBn: "আপনার ব্র্যান্ডের গল্প ছড়িয়ে দিন মনোমুগ্ধকর ভিডিওর মাধ্যমে। কাস্টম ক্যারেক্টার ও হাই-ডেফিনিশন ২ডি অ্যানিমেশন এবং দেশসেরা ভয়েস আর্টিস্টদের প্রাণবন্ত কণ্ঠে স্টুডিও-কোয়ালিটি ভয়েস ওভার সেবা।",
    features: [
      "Dynamic Pacing & High-Retention Hook Editing",
      "2D Character & Vector Motion Animation",
      "Full HD & Ultra 4K Render Formats",
      "Professional Scriptwriting & Storyboard Support",
      "Multi-Language Human Voiceover in Studio Quality",
      "Custom SFX & Licensed Cinematic Sound Design"
    ],
    packages: [
      {
        name: "Human Voice Over (হিউম্যান ভয়েস ওভার)",
        price: "৳850+",
        period: "per script",
        description: "Clear, emotionally compelling vocal performance recorded in sound-isolated studios.",
        features: [
          "Multiple Language Options (Bengali, English, Hindi, Arabic)",
          "Studio-grade microphone clarity & mastering",
          "Tone matching (Corporate, Friendly, Dramatic, Narrative)",
          "Quick 24-hour turnaround"
        ]
      },
      {
        name: "2D Animation Video (অ্যানিমেশন ভিডিও)",
        price: "৳1,550+",
        period: "per project",
        isPopular: true,
        description: "Engaging 2D explainer and promotional motion graphics designed to simplify complex value propositions.",
        features: [
          "2D Custom Vector Animation & Motion Graphics",
          "Complete Scriptwriting & Concept Support",
          "Custom Character Design & Keyframing",
          "Crystal Clear HD (1080p) & 4K Master Renders",
          "Background music & sound effects sync"
        ]
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // SERVICE 8: মডেল ভিডিও প্রমোশন ও প্রোডাক্ট বিজ্ঞাপন (Model Video Production)
  // ----------------------------------------------------------------------------
  {
    id: "model-video",
    slug: "model-video-production",
    iconName: "Clapperboard",
    imageUrl: "/images/model-video.jpg",
    badge: "Cinematic Ads",
    themeColor: "#E8B343",
    demoVideoUrl: "https://drive.google.com/file/d/sample-model-shoot-reel/view",
    portfolioSamples: [
      {
        title: "High-Fashion Apparel Runway & Studio Lighting",
        imageUrl: "/images/model-video.jpg",
        caption: "Professional 4K cinema cameras, aperture lighting, and high-fashion styling."
      },
      {
        title: "Commercial Product Presentation & Scripted Dialogue",
        imageUrl: "/images/hero-showcase.jpg",
        caption: "Professional models presenting products with natural delivery and studio audio."
      },
      {
        title: "E-Commerce Lifestyle Campaign & Outdoor Shoot",
        imageUrl: "/images/video-animation.jpg",
        caption: "Vibrant location shoots tailored for premium fashion, jewelry, and cosmetics brands."
      }
    ],
    titleEn: "Model Video Production & Product Ads",
    titleBn: "মডেল ভিডিও প্রমোশন ও প্রোডাক্ট বিজ্ঞাপন",
    startingPrice: "৳4,500+",
    shortDescriptionEn: "High-glamour model shoots, commercial product films, and corporate event videos: 'Bringing Your Vision to Life'.",
    shortDescriptionBn: "মডেল ও ইনফ্লুয়েন্সার সমন্বয়ে প্রমোশনাল ভিডিও, টিভি কমার্শিয়াল এবং লাইফস্টাইল প্রোডাক্ট শ্যুট।",
    detailedDescriptionEn: "\"Bringing Your Vision to Life.\" We curate professional models, state-of-the-art cinema cameras, studio lighting, and post-production color grading to produce advertisements that elevate your product into a luxury status symbol.",
    detailedDescriptionBn: "\"Bringing Your Vision to Life\" — শীর্ষ মডেলদের উপস্থিতি, আধুনিক ক্যামেরা ও লাইটিংয়ের সমন্বয়ে বিজ্ঞাপন তৈরি। সোশ্যাল মিডিয়া ভিডিও থেকে শুরু করে কর্পোরেট ইভেন্ট কাভারেজ—আপনার পণ্যকে উপস্থাপন করুন রাজকীয় আঙ্গিকে।",
    features: [
      "Professional Model Casting & Talent Coordination",
      "Cinema-Grade 4K Studio & Outdoor Video Shoots",
      "Commercial Product Color Grading & High-End Retouching",
      "Ad Films & Television Commercial (TVC) Production",
      "Viral Social Media Video Ads (Reels, TikTok, Shorts)",
      "High-Profile Corporate Event & Milestone Coverage"
    ],
    categories: [
      {
        nameEn: "Specialized Production Formats",
        nameBn: "ভিডিও প্রোডাকশন ক্যাটাগরি",
        items: [
          "Ad Films & Commercial Spots (টিভি কমার্শিয়াল ও বড় ব্র্যান্ডের অ্যাড ফিল্ম)",
          "Promotional Videos (ইনফ্লুয়েন্সার ও মডেল সমন্বয়ে প্রমোশনাল ভিডিও)",
          "Social Media Videos (টিকটক, ইনস্টাগ্রাম রিলস ও ফেসবুক ভিডিও)",
          "Event Coverage (কর্পোরেট সেমিনার ও গ্র্যান্ড ইভেন্ট কাভারেজ)",
          "Corporate Videos (কোম্পানি প্রোফাইল ও ডিরেক্টরস মেসেজ ভিডিও)"
        ]
      }
    ],
    packages: [
      {
        name: "Commercial Production Package",
        price: "৳4,500+",
        period: "starting base",
        isPopular: true,
        description: "Turnkey model shoot with professional lighting, styling, and color-graded final deliverables.",
        features: [
          "Professional model & artist coordination",
          "Dedicated studio or location setup",
          "Cinema lighting & multi-angle 4K capture",
          "Color grading & music licensing",
          "Ready for Facebook, YouTube & Instagram ad campaigns"
        ]
      }
    ]
  },
  {
    id: "other-services",
    slug: "other-services",
    iconName: "Layers",
    badge: "Specialized Ops",
    titleEn: "Other Services & Custom Solutions",
    titleBn: "অন্যান্য সেবা ও বিশেষ অপারেশন",
    startingPrice: "৳5,000+",
    shortDescriptionEn: "Custom digital solutions, bespoke enterprise operations, specialized IT consultancy, and ad campaigns.",
    shortDescriptionBn: "আপনার প্রতিষ্ঠানের সুনির্দিষ্ট প্রয়োজন অনুযায়ী কাস্টম আইটি, মিডিয়া প্রোডাকশন ও বিশেষ কনসালটেন্সি সেবা।",
    detailedDescriptionEn: "Turnkey enterprise solutions designed to fulfill customized operational workflows.",
    detailedDescriptionBn: "আপনার প্রতিষ্ঠানের প্রয়োজন অনুসারে বিশেষায়িত সেবা—কাস্টম সফটওয়্যার, মিডিয়া কাভারেজ ও ডিজিটাল কনসালটেন্সি।",
    features: [
      "Custom Enterprise IT & Web Solutions",
      "Dedicated Media & Event Production",
      "Special Social Media & Ad Campaigns",
      "Direct Priority Support & Operations"
    ],
    categories: [
      {
        nameEn: "Specialized Scope",
        nameBn: "বিশেষ সেবাসমূহ",
        items: [
          "Custom Software & LMS (কাস্টম সফটওয়্যার ও এলএমএস)",
          "Media & Commercial Shoots (বিশেষ মিডিয়া শুট)",
          "Ad Campaigns & Boosting (স্পেশাল অ্যাড ক্যাম্পেইন)"
        ]
      }
    ],
    packages: [
      {
        name: "Custom Enterprise Plan",
        price: "৳5,000+",
        period: "project basis",
        description: "Bespoke scope tailored directly to client operational requirements.",
        features: ["Tailored Scope of Work", "Dedicated Account Manager", "Priority Execution", "Direct Technical Support"]
      }
    ]
  }
];

// ------------------------------------------------------------------------------
// 6. NAVIGATION STRUCTURE
// ------------------------------------------------------------------------------
export const navigationLinks = [
  { nameEn: "Home", nameBn: "হোম", href: "/" },
  { nameEn: "Services", nameBn: "সেবাসমূহ", href: "/services" },
  { nameEn: "Pricing", nameBn: "মূল্যতালিকা", href: "/pricing" },
  { nameEn: "About", nameBn: "আমাদের কথা", href: "/about" },
  { nameEn: "Contact", nameBn: "যোগাযোগ", href: "/contact" },
];

// ------------------------------------------------------------------------------
// 7. DEFAULT AGENCY OPERATIONAL RECORDS (CONNECTED ERP & CMS)
// ------------------------------------------------------------------------------
export const defaultClients: ClientRecord[] = [
  {
    id: "cli-101",
    clientCode: "TS-CL-001",
    name: "Akram Hossain",
    company: "Madina Quran Academy",
    serviceId: "madrasa-solution",
    serviceName: "Online Madrasa Solution",
    phone: "+880 1712-345678",
    email: "akram@madinaacademy.edu.bd",
    address: "Mirpur DOHS, Dhaka",
    whatsapp: "+880 1712-345678",
    paymentMethod: "bKash",
    totalAmount: 45000,
    paidAmount: 30000,
    dueAmount: 15000,
    progress: 75,
    status: "active",
    date: "04 Sep 2026",
    notes: "LMS and student portal setup in progress",
    isBoosting: true,
    facebookPageName: "মদিনা কুরআন একাডেমি",
    facebookPageUrl: "https://facebook.com/madinaquranacademy",
    stages: MADRASA_DEFAULT_STAGES,
  },
  {
    id: "cli-102",
    clientCode: "TS-CL-002",
    name: "Farhana Islam",
    company: "Glamour Lifestyle BD",
    serviceId: "video-editing",
    serviceName: "Video Editing & Animation",
    phone: "+880 1876-654321",
    email: "farhana@glamourbd.com",
    address: "Banani, Dhaka",
    whatsapp: "+880 1876-654321",
    paymentMethod: "Nagad",
    totalAmount: 28000,
    paidAmount: 18000,
    dueAmount: 10000,
    progress: 40,
    status: "pending",
    date: "03 Sep 2026",
    notes: "Awaiting final feedback on 4K reel cut"
  },
  {
    id: "cli-103",
    clientCode: "TS-CL-003",
    name: "Tech World Systems",
    company: "Tech World Systems",
    serviceId: "web-development",
    serviceName: "Web Design & Development",
    phone: "+880 1912-123456",
    email: "info@techworld.com.bd",
    address: "Gulshan-1, Dhaka",
    whatsapp: "+880 1912-123456",
    paymentMethod: "Rocket",
    totalAmount: 65000,
    paidAmount: 65000,
    dueAmount: 0,
    progress: 100,
    status: "completed",
    date: "01 Sep 2026",
    notes: "Full Next.js corporate portal delivered and signed off"
  },
  {
    id: "cli-104",
    clientCode: "TS-CL-004",
    name: "Al-Falah Foundation",
    company: "Al-Falah Education Trust",
    serviceId: "social-solution",
    serviceName: "Social Media Solution",
    phone: "+880 1799-887766",
    email: "admin@alfalah.org.bd",
    address: "Uttara Sector 7, Dhaka",
    whatsapp: "+880 1799-887766",
    paymentMethod: "Bank Wire",
    totalAmount: 35000,
    paidAmount: 35000,
    dueAmount: 0,
    progress: 90,
    status: "active",
    date: "02 Sep 2026",
    notes: "Compromised admin rights restored and 2FA enterprise security established"
  },
  {
    id: "cli-105",
    clientCode: "TS-CL-005",
    name: "Tanvir Rahman",
    company: "Aura Apparel",
    serviceId: "model-video",
    serviceName: "Model Video Production & Product Ads",
    phone: "+880 1611-223344",
    email: "tanvir@auraapparel.com",
    address: "Dhanmondi, Dhaka",
    whatsapp: "+880 1611-223344",
    paymentMethod: "bKash",
    totalAmount: 55000,
    paidAmount: 35000,
    dueAmount: 20000,
    progress: 60,
    status: "active",
    date: "04 Sep 2026",
    notes: "Studio shoot completed, color grading underway"
  }
];

export const defaultTasks: TaskRecord[] = [
  {
    id: "tsk-01",
    clientId: "cli-101",
    title: "Akram Hossain (Madina Academy) — অফিস মিটিং ও প্রজেক্ট রিভিউ",
    clientName: "Akram Hossain",
    serviceId: "madrasa-solution",
    serviceName: "Online Madrasa Solution",
    assignedTo: "Abu Tawfiq & Tariqul",
    department: "Web & Tech",
    taskType: "client_visit",
    scheduledTime: "Tomorrow, 3:30 PM",
    deadline: "05 Sep 2026",
    location: "Savar Office (Delta Mor)",
    notes: "মাদরাসা সফটওয়্যার ও ফেসবুক পেইজ সেটআপ এর লাইভ আপডেট সামনাসামনি দেখবেন এবং পরবর্তী পেমেন্ট কিস্তি পরিশোধ করবেন।",
    progress: 75,
    status: "in_progress",
    stages: MADRASA_DEFAULT_STAGES,
  },
  {
    id: "tsk-02",
    clientId: "cli-102",
    title: "গ্ল্যামার বিডি — অন-সাইট ৪কে মডেল ও প্রোডাক্ট শুট",
    clientName: "Farhana Islam",
    serviceId: "video-editing",
    serviceName: "Video Editing & Animation",
    assignedTo: "Sayed Mahmud (Video Lead)",
    department: "Video & Animation",
    taskType: "video_shoot",
    scheduledTime: "Today, 2:30 PM",
    deadline: "04 Sep 2026",
    location: "Banani Shoot Studio",
    notes: "২টি রিলস ভিডিও শুট ও প্রফেশনাল মডেল ক্লিপ রেকর্ডিং। ক্যামেরা: Sony FX3 + Ronin RS3 Gimbal।",
    progress: 40,
    status: "in_progress",
  },
  {
    id: "tsk-03",
    title: "মাওলানা তানভীর আহমেদ — নতুন অনলাইন মাদরাসা প্যাকেজ কনসাল্টেশন",
    clientName: "মাওলানা তানভীর আহমেদ",
    serviceId: "madrasa-solution",
    serviceName: "Online Madrasa Solution",
    assignedTo: "Abu Tawfiq (Agency Director)",
    department: "Executive Management",
    taskType: "client_visit",
    scheduledTime: "06 Sep 2026, 11:00 AM",
    deadline: "06 Sep 2026",
    location: "Savar Office (Delta Mor)",
    notes: "নতুন মাদরাসা চালুর প্রস্তুতি। ৫ জন নিশ্চিত শিক্ষার্থী ভর্তির গ্যারান্টি প্যাকেজ চুক্তি স্বাক্ষর হবে।",
    progress: 20,
    status: "pending",
  },
  {
    id: "tsk-04",
    title: "ইসলামিক শর্ট ড্রামা ও রিভিউ শুট সেশন",
    clientName: "Quran International",
    serviceId: "model-video",
    serviceName: "Model Video Production",
    assignedTo: "Nabila & Sayed",
    department: "Creative & Video",
    taskType: "video_shoot",
    scheduledTime: "07 Sep 2026, 10:00 AM",
    deadline: "07 Sep 2026",
    location: "In-House Green Screen Studio",
    notes: "শিক্ষার্থীদের কোর্স রিভিউ ও স্টুডিও শুট সম্পন্ন করতে হবে।",
    progress: 60,
    status: "in_progress",
  },
  {
    id: "tsk-05",
    title: "মেটা ও গুগল এড অ্যাকাউন্ট ব্যালেন্স ও কার্ড লিমিট রিলোড",
    clientName: "Agency Internal",
    serviceId: "digital-marketing",
    serviceName: "Digital Marketing & Ads",
    assignedTo: "Abu Tawfiq (Marketing Lead)",
    department: "Performance Marketing",
    taskType: "internal_todo",
    scheduledTime: "Today, 6:00 PM",
    deadline: "04 Sep 2026",
    location: "Marketing Desk",
    notes: "রানিং ক্যাম্পেইন স্মুথ রাখার জন্য ডুয়াল কারেন্সি কার্ড ব্যালেন্স চেক ও বিলিং ক্লিয়ারেন্স।",
    progress: 100,
    status: "completed",
  },
];

export const defaultEmployees: EmployeeRecord[] = [
  {
    id: "emp-01",
    name: "Abu Tawfiq",
    email: "tawfiq@thumbstop.agency",
    username: "tawfiq",
    password: "thumbstop2026",
    department: "Executive Management",
    role: "Super Admin / Agency Director",
    salary: 120000,
    status: "active",
    joinDate: "01 Jan 2024",
    accessModules: ["Dashboard", "Clients", "Services", "Tasks", "Employees", "Departments", "Payments", "Expenses", "Salary", "Reports", "Permissions", "Workflow", "Settings", "Logs"]
  },
  {
    id: "emp-02",
    name: "Tariqul Islam",
    email: "tariqul@thumbstop.agency",
    username: "tariqul_dev",
    password: "dev2026",
    department: "Web & Tech",
    role: "Lead Full-Stack Engineer",
    salary: 65000,
    status: "active",
    joinDate: "15 Jun 2024",
    accessModules: ["Dashboard", "Tasks", "Clients", "Services", "Workflow"]
  },
  {
    id: "emp-03",
    name: "Sayed Mahmud",
    email: "sayed@thumbstop.agency",
    username: "sayed_editor",
    password: "edit2026",
    department: "Video & Animation",
    role: "Senior Video Editor & Colorist",
    salary: 45000,
    status: "active",
    joinDate: "01 Nov 2024",
    accessModules: ["Dashboard", "Tasks", "Clients"]
  },
  {
    id: "emp-04",
    name: "Nabila Tabassum",
    email: "nabila@thumbstop.agency",
    username: "nabila_art",
    password: "art2026",
    department: "Creative",
    role: "Art Director & Model Producer",
    salary: 48000,
    status: "active",
    joinDate: "01 Feb 2025",
    accessModules: ["Dashboard", "Tasks", "Clients", "Services"]
  },
  {
    id: "emp-05",
    name: "Karim Chowdhury",
    email: "karim@thumbstop.agency",
    username: "karim_ops",
    password: "ops2026",
    department: "Finance & Accounts",
    role: "Finance Officer",
    salary: 38000,
    status: "active",
    joinDate: "10 May 2025",
    accessModules: ["Dashboard", "Payments", "Expenses", "Salary", "Reports"]
  }
];

export const defaultPayments: PaymentRecord[] = [
  // September 2026
  {
    id: "pay-101",
    clientName: "Akram Hossain",
    serviceName: "Online Madrasa Solution",
    method: "bKash",
    amount: 30000,
    date: "04 Sep 2026",
    transactionId: "BK9X7712M9",
    status: "Paid"
  },
  {
    id: "pay-102",
    clientName: "Farhana Islam",
    serviceName: "Video Editing & Animation",
    method: "Nagad",
    amount: 18000,
    date: "03 Sep 2026",
    transactionId: "NG88219P4L",
    status: "Paid"
  },
  {
    id: "pay-103",
    clientName: "Tech World Systems",
    serviceName: "Web Design & Development",
    method: "Rocket",
    amount: 65000,
    date: "01 Sep 2026",
    transactionId: "RC441908K1",
    status: "Paid"
  },
  {
    id: "pay-104",
    clientName: "Al-Falah Foundation",
    serviceName: "Social Media Solution",
    method: "Bank Wire",
    amount: 35000,
    date: "02 Sep 2026",
    transactionId: "EBL-WIRE-9921",
    status: "Paid"
  },
  {
    id: "pay-105",
    clientName: "Tanvir Rahman",
    serviceName: "Model Video Production",
    method: "bKash",
    amount: 35000,
    date: "04 Sep 2026",
    transactionId: "BK559812A2",
    status: "Paid"
  },
  // August 2026
  {
    id: "pay-106",
    clientName: "Madrasa Darul Quran",
    serviceName: "Online Madrasa Solution",
    method: "Bank Wire",
    amount: 55000,
    date: "18 Aug 2026",
    transactionId: "DBBL-WIRE-8812",
    status: "Paid"
  },
  {
    id: "pay-107",
    clientName: "Green Life Organic",
    serviceName: "Digital Marketing & Ads",
    method: "bKash",
    amount: 28000,
    date: "12 Aug 2026",
    transactionId: "BK331908X4",
    status: "Paid"
  },
  {
    id: "pay-108",
    clientName: "Apex Media Hub",
    serviceName: "Video Editing & Animation",
    method: "Nagad",
    amount: 32000,
    date: "25 Aug 2026",
    transactionId: "NG77215B9",
    status: "Paid"
  },
  // July 2026
  {
    id: "pay-109",
    clientName: "Iqra Online Institute",
    serviceName: "Online Madrasa Solution",
    method: "bKash",
    amount: 45000,
    date: "14 Jul 2026",
    transactionId: "BK229103C8",
    status: "Paid"
  },
  {
    id: "pay-110",
    clientName: "Smart Care Solutions",
    serviceName: "Web Design & Development",
    method: "Bank Wire",
    amount: 70000,
    date: "22 Jul 2026",
    transactionId: "CITY-WIRE-5519",
    status: "Paid"
  }
];

export const defaultExpenses: ExpenseRecord[] = [
  // September 2026
  {
    id: "exp-01",
    category: "Salary",
    description: "Employee Monthly Payroll Disbursal",
    amount: 185000,
    date: "01 Sep 2026",
    paymentMethod: "Bank Transfer"
  },
  {
    id: "exp-02",
    category: "Software & Cloud",
    description: "Adobe Creative Cloud & Cinema 4D Enterprise",
    amount: 18500,
    date: "02 Sep 2026",
    paymentMethod: "Credit Card"
  },
  {
    id: "exp-03",
    category: "Software & Cloud",
    description: "AWS Cloud Servers & Vercel Pro Hosting",
    amount: 9200,
    date: "02 Sep 2026",
    paymentMethod: "Credit Card"
  },
  {
    id: "exp-04",
    category: "Studio & Gear",
    description: "Godox Studio Lighting Kit & High-CRI Tubes",
    amount: 32000,
    date: "03 Sep 2026",
    paymentMethod: "bKash Merchant"
  },
  {
    id: "exp-05",
    category: "Marketing",
    description: "Meta Ads & Google Display Agency Campaign",
    amount: 25000,
    date: "04 Sep 2026",
    paymentMethod: "Credit Card"
  },
  // August 2026
  {
    id: "exp-06",
    category: "Salary",
    description: "August Staff Payroll Disbursal",
    amount: 180000,
    date: "01 Aug 2026",
    paymentMethod: "Bank Transfer"
  },
  {
    id: "exp-07",
    category: "Marketing",
    description: "Meta Ads Agency Campaign (August)",
    amount: 22000,
    date: "10 Aug 2026",
    paymentMethod: "Credit Card"
  },
  // July 2026
  {
    id: "exp-08",
    category: "Salary",
    description: "July Staff Payroll Disbursal",
    amount: 180000,
    date: "01 Jul 2026",
    paymentMethod: "Bank Transfer"
  },
  {
    id: "exp-09",
    category: "Software & Cloud",
    description: "Vercel & Domain Subscriptions",
    amount: 8500,
    date: "05 Jul 2026",
    paymentMethod: "Credit Card"
  }
];

export const defaultSalaries: SalaryRecord[] = [
  // September 2026
  {
    id: "sal-01",
    employeeId: "emp-01",
    employeeName: "Abu Tawfiq",
    department: "Executive Management",
    month: "September 2026",
    amount: 120000,
    status: "Paid",
    paidDate: "01 Sep 2026"
  },
  {
    id: "sal-02",
    employeeId: "emp-02",
    employeeName: "Tariqul Islam",
    department: "Web & Tech",
    month: "September 2026",
    amount: 65000,
    status: "Paid",
    paidDate: "01 Sep 2026"
  },
  {
    id: "sal-03",
    employeeId: "emp-03",
    employeeName: "Sayed Mahmud",
    department: "Video & Animation",
    month: "September 2026",
    amount: 45000,
    status: "Paid",
    paidDate: "01 Sep 2026"
  },
  {
    id: "sal-04",
    employeeId: "emp-04",
    employeeName: "Nabila Tabassum",
    department: "Creative",
    month: "September 2026",
    amount: 48000,
    status: "Paid",
    paidDate: "01 Sep 2026"
  },
  {
    id: "sal-05",
    employeeId: "emp-05",
    employeeName: "Karim Chowdhury",
    department: "Finance & Accounts",
    month: "September 2026",
    amount: 38000,
    status: "Paid",
    paidDate: "01 Sep 2026"
  },
  // August 2026
  {
    id: "sal-06",
    employeeId: "emp-01",
    employeeName: "Abu Tawfiq",
    department: "Executive Management",
    month: "August 2026",
    amount: 120000,
    status: "Paid",
    paidDate: "01 Aug 2026"
  },
  {
    id: "sal-07",
    employeeId: "emp-02",
    employeeName: "Tariqul Islam",
    department: "Web & Tech",
    month: "August 2026",
    amount: 65000,
    status: "Paid",
    paidDate: "01 Aug 2026"
  },
  {
    id: "sal-08",
    employeeId: "emp-03",
    employeeName: "Sayed Mahmud",
    department: "Video & Animation",
    month: "August 2026",
    amount: 45000,
    status: "Paid",
    paidDate: "01 Aug 2026"
  },
  {
    id: "sal-09",
    employeeId: "emp-04",
    employeeName: "Nabila Tabassum",
    department: "Creative",
    month: "August 2026",
    amount: 48000,
    status: "Paid",
    paidDate: "01 Aug 2026"
  },
  {
    id: "sal-10",
    employeeId: "emp-05",
    employeeName: "Karim Chowdhury",
    department: "Finance & Accounts",
    month: "August 2026",
    amount: 38000,
    status: "Paid",
    paidDate: "01 Aug 2026"
  },
  // July 2026
  {
    id: "sal-11",
    employeeId: "emp-01",
    employeeName: "Abu Tawfiq",
    department: "Executive Management",
    month: "July 2026",
    amount: 120000,
    status: "Paid",
    paidDate: "01 Jul 2026"
  },
  {
    id: "sal-12",
    employeeId: "emp-02",
    employeeName: "Tariqul Islam",
    department: "Web & Tech",
    month: "July 2026",
    amount: 65000,
    status: "Paid",
    paidDate: "01 Jul 2026"
  },
  {
    id: "sal-13",
    employeeId: "emp-03",
    employeeName: "Sayed Mahmud",
    department: "Video & Animation",
    month: "July 2026",
    amount: 45000,
    status: "Paid",
    paidDate: "01 Jul 2026"
  },
  {
    id: "sal-14",
    employeeId: "emp-04",
    employeeName: "Nabila Tabassum",
    department: "Creative",
    month: "July 2026",
    amount: 48000,
    status: "Paid",
    paidDate: "01 Jul 2026"
  },
  {
    id: "sal-15",
    employeeId: "emp-05",
    employeeName: "Karim Chowdhury",
    department: "Finance & Accounts",
    month: "July 2026",
    amount: 38000,
    status: "Paid",
    paidDate: "01 Jul 2026"
  }
];

export const defaultActivityLogs: ActivityLog[] = [
  {
    id: "act-01",
    time: "10 minutes ago",
    user: "Abu Tawfiq",
    action: "New client Akram Hossain assigned to Online Madrasa Solution",
    module: "Clients",
    type: "client"
  },
  {
    id: "act-02",
    time: "25 minutes ago",
    user: "Sayed Mahmud",
    action: "Color grading milestone completed for Glamour Lifestyle",
    module: "Tasks",
    type: "task"
  },
  {
    id: "act-03",
    time: "1 hour ago",
    user: "Karim Chowdhury",
    action: "Payment of ৳18,000 received via Nagad from Farhana Islam",
    module: "Finance",
    type: "payment"
  },
  {
    id: "act-04",
    time: "2 hours ago",
    user: "Tariqul Islam",
    action: "Next.js production build deployed for Tech World Systems",
    module: "Tasks",
    type: "task"
  },
  {
    id: "act-05",
    time: "3 hours ago",
    user: "Karim Chowdhury",
    action: "Expense added for Godox Studio Lighting Kit (৳32,000)",
    module: "Finance",
    type: "expense"
  }
];
