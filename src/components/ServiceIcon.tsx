import React from "react";
import {
  BookOpenCheck,
  TrendingUp,
  CodeXml,
  ShieldAlert,
  Palette,
  BadgeCheck,
  Film,
  Clapperboard,
  Sparkles,
  Zap,
  Globe,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";

interface ServiceIconProps {
  name: string;
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  BookOpenCheck,
  TrendingUp,
  CodeXml,
  ShieldAlert,
  Palette,
  BadgeCheck,
  Film,
  Clapperboard,
  Sparkles,
  Zap,
  Globe,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
};

export function ServiceIcon({ name, className = "w-6 h-6" }: ServiceIconProps) {
  const IconComponent = iconMap[name] || Sparkles;
  return <IconComponent className={className} />;
}
