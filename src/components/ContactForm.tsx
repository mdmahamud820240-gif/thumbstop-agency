"use client";

import React, { useState } from "react";
import { useContent } from "@/context/ContentContext";
import { Send, CheckCircle2, MessageCircle, AlertCircle, ArrowUpRight } from "lucide-react";

interface ContactFormProps {
  defaultService?: string;
}

export function ContactForm({ defaultService = "" }: ContactFormProps) {
  const { siteConfig, services, locale, addLeadFromContactForm } = useContent();
  const isBn = locale === "bn";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceId: defaultService || services[0]?.id || "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectedServiceObj = services.find((s) => s.id === formData.serviceId);
  const selectedServiceName = selectedServiceObj
    ? isBn
      ? selectedServiceObj.titleBn
      : selectedServiceObj.titleEn
    : "General Consultation";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus("error");
      setErrorMessage(
        isBn
          ? "অনুগ্রহ করে আপনার নাম এবং ফোন/হোয়াটসঅ্যাপ নাম্বারটি লিখুন।"
          : "Please enter your name and phone/WhatsApp number."
      );
      return;
    }

    setStatus("submitting");

    // Sync directly to agency backend ERP
    addLeadFromContactForm({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      serviceId: formData.serviceId,
      serviceName: selectedServiceName,
      message: formData.message.trim(),
    });

    setTimeout(() => {
      setStatus("success");
    }, 500);
  };

  const formattedWhatsAppText = encodeURIComponent(
    `Hello ThumbStop!\nMy Name: ${formData.name || "A Client"}\nContact: ${formData.phone || "N/A"}\nService: ${selectedServiceName}\nDetails: ${formData.message || "I would like to discuss my project."}`
  );
  const directWhatsAppUrl = `https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=${formattedWhatsAppText}`;

  return (
    <div className="relative rounded-3xl p-8 sm:p-10 bg-[#0A0E1A]/90 border border-white/10 shadow-2xl backdrop-blur-xl">
      {status === "success" ? (
        <div className="text-center py-12 space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h3 className={`text-2xl font-bold text-white mb-2 ${isBn ? "font-bangla" : "font-serif"}`}>
              {isBn ? "আপনার মেসেজটি গৃহীত হয়েছে!" : "Message Received!"}
            </h3>
            <p className={`text-sm text-slate-300 max-w-md mx-auto leading-relaxed ${isBn ? "font-bangla" : ""}`}>
              {isBn ? (
                <>
                  ধন্যবাদ, <span className="text-white font-semibold">{formData.name}</span>। আমাদের প্রজেক্ট লিড আপনার{" "}
                  <span className="text-cyan-300 font-medium">{selectedServiceName}</span> সম্পর্কিত বার্তাটি পর্যালোচনা করে ১২ ঘণ্টার মধ্যে যোগাযোগ করবেন।
                </>
              ) : (
                <>
                  Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our project lead will review your request for{" "}
                  <span className="text-cyan-300 font-medium">{selectedServiceName}</span> and contact you within 12 hours.
                </>
              )}
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#1FA8CB] to-[#2E5FCC] shadow-lg shadow-[#1FA8CB]/25 hover:opacity-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span className={isBn ? "font-bangla" : ""}>
                {isBn ? "হোয়াটসঅ্যাপে দ্রুত কথা বলুন" : "Speed up on WhatsApp"}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => {
                setStatus("idle");
                setFormData({
                  name: "",
                  phone: "",
                  email: "",
                  serviceId: services[0]?.id || "",
                  message: "",
                });
              }}
              className={`px-6 py-3 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-white/[0.04] border border-white/10 ${
                isBn ? "font-bangla" : ""
              }`}
            >
              {isBn ? "আরেকটি মেসেজ পাঠান" : "Send Another Message"}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === "error" && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className={isBn ? "font-bangla" : ""}>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className={`block text-xs font-medium text-slate-300 mb-2 ${isBn ? "font-bangla" : ""}`}
              >
                {isBn ? "আপনার পুরো নাম" : "Your Full Name"} <span className="text-cyan-400">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={isBn ? "যেমন: তানভীর আহমেদ" : "e.g. Tanvir Ahmed"}
                className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#1FA8CB] focus:ring-1 focus:ring-[#1FA8CB] transition-colors ${
                  isBn ? "font-bangla" : ""
                }`}
              />
            </div>

            {/* Phone / WhatsApp */}
            <div>
              <label
                htmlFor="phone"
                className={`block text-xs font-medium text-slate-300 mb-2 ${isBn ? "font-bangla" : ""}`}
              >
                {isBn ? "ফোন / হোয়াটসঅ্যাপ নাম্বার" : "Phone / WhatsApp Number"} <span className="text-cyan-400">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+880 17..."
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-[#1FA8CB] focus:ring-1 focus:ring-[#1FA8CB] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className={`block text-xs font-medium text-slate-300 mb-2 ${isBn ? "font-bangla" : ""}`}
              >
                {isBn ? "ইমেইল এড্রেস (ঐচ্ছিক)" : "Email Address (Optional)"}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#1FA8CB] focus:ring-1 focus:ring-[#1FA8CB] transition-colors font-mono"
              />
            </div>

            {/* Service Selection */}
            <div>
              <label
                htmlFor="serviceId"
                className={`block text-xs font-medium text-slate-300 mb-2 ${isBn ? "font-bangla" : ""}`}
              >
                {isBn ? "প্রয়োজনীয় সেবা নির্বাচন করুন" : "Desired Service Discipline"}
              </label>
              <select
                id="serviceId"
                name="serviceId"
                value={formData.serviceId}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#0d1424] border border-white/10 text-white text-sm focus:outline-none focus:border-[#1FA8CB] focus:ring-1 focus:ring-[#1FA8CB] transition-colors"
              >
                {services.map((srv) => (
                  <option key={srv.id} value={srv.id} className="bg-[#070A12] text-white">
                    {isBn ? `${srv.titleBn} (${srv.titleEn})` : `${srv.titleEn} (${srv.titleBn})`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Project Details */}
          <div>
            <label
              htmlFor="message"
              className={`block text-xs font-medium text-slate-300 mb-2 ${isBn ? "font-bangla" : ""}`}
            >
              {isBn ? "প্রজেক্টের বিবরণ ও প্রয়োজনীয়তা" : "Project Overview & Requirements"}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder={
                isBn
                  ? "আপনার ব্যবসার লক্ষ্য, বাজেট ও বর্তমান চ্যালেঞ্জ সম্পর্কে বিস্তারিত লিখুন..."
                  : "Tell us about your business goals, timeline, and current challenges..."
              }
              className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#1FA8CB] focus:ring-1 focus:ring-[#1FA8CB] transition-colors resize-none ${
                isBn ? "font-bangla" : ""
              }`}
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#1FA8CB] to-[#2E5FCC] hover:opacity-95 shadow-lg shadow-[#1FA8CB]/25 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span className={isBn ? "font-bangla" : ""}>
                {status === "submitting"
                  ? isBn
                    ? "পাঠানো হচ্ছে..."
                    : "Submitting..."
                  : isBn
                  ? "প্রজেক্ট প্রস্তাব পাঠান"
                  : "Send Project Inquiry"}
              </span>
            </button>

            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span className={isBn ? "font-bangla" : ""}>
                {isBn ? "অথবা সরাসরি হোয়াটসঅ্যাপে পাঠান" : "Or Send via WhatsApp Instantly"}
              </span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
