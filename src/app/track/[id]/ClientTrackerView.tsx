"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useContent } from "@/context/ContentContext";
import {
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Activity,
  Calendar,
  Layers,
  FileCheck,
  User,
} from "lucide-react";

export default function ClientTrackerView({ id }: { id: string }) {
  const { clients, tasks, siteConfig } = useContent();

  // Find either matching client or matching task
  const client = useMemo(() => {
    return (
      clients.find((c) => c.id === id) ||
      clients.find((c) => c.name.toLowerCase().replace(/\s+/g, "-") === id)
    );
  }, [clients, id]);

  const task = useMemo(() => {
    if (client) {
      return tasks.find((t) => t.clientId === client.id) || tasks.find((t) => t.clientName === client.name);
    }
    return tasks.find((t) => t.id === id);
  }, [tasks, client, id]);

  // Derived details
  const clientName = client?.name || task?.clientName || "Valued Client";
  const projectTitle = task?.title || client?.serviceName || "Digital Asset Production";
  const serviceName = client?.serviceName || task?.serviceName || "Turnkey Agency Solution";
  const progress = task ? task.progress : client ? client.progress : 50;
  const status = task?.status || client?.status || "in_progress";
  const deadline = task?.deadline || "September 2026";
  const deliverableUrl = task?.deliverableUrl;

  // Stages array fallback
  const stages =
    client?.stages && client.stages.length > 0
      ? client.stages
      : task?.stages || [
          { name: "Project Kickoff & Creative Brief", percentage: 20, isDone: true, completedBy: "Creative Lead" },
          { name: "Production & Asset Creation", percentage: 40, isDone: progress >= 50, completedBy: progress >= 50 ? "Specialist" : undefined },
          { name: "Client Revisions & Quality Check", percentage: 20, isDone: progress >= 80, completedBy: progress >= 80 ? "Quality Lead" : undefined },
          { name: "Final 4K Upload & Master Handover", percentage: 20, isDone: progress === 100, completedBy: progress === 100 ? "Agency Director" : undefined },
        ];

  const cleanWhatsApp = siteConfig.whatsappNumber.replace(/[^0-9]/g, "");
  const whatsappInquiryUrl = `https://wa.me/${cleanWhatsApp}?text=Hello%20ThumbStop%2C%20I%20am%20checking%20my%20live%20project%20tracking%20for%20${encodeURIComponent(
    projectTitle
  )}%20(ID%3A%20${id}).`;

  return (
    <div className="min-h-screen bg-[#060B15] text-[#EDF3FB] font-sans antialiased selection:bg-cyan-500 selection:text-black relative overflow-hidden">
      {/* Background Ambient Luxury Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#1FA8CB]/15 via-[#2E5FCC]/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] pointer-events-none" />

      {/* Top Header */}
      <header className="sticky top-0 z-30 h-16 border-b border-white/10 bg-[#091122]/90 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1FA8CB] to-[#2E5FCC] flex items-center justify-center font-black text-white text-xs border border-cyan-400/40 shadow-md group-hover:scale-105 transition-transform">
            TS
          </div>
          <div>
            <div className="font-bold text-xs tracking-tight text-white leading-none">ThumbStop</div>
            <div className="text-[9px] text-cyan-300/80 uppercase tracking-wider font-mono mt-0.5">Live Client Portal</div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>24/7 REAL-TIME SYNC</span>
          </div>

          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition-all shadow"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Live Agency Support</span>
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 relative z-10">
        {/* Project Hero Card */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#0C1628]/95 border border-[#1E304F] shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                  {serviceName}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Tracking ID: <code className="text-white font-bold">{id}</code>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {projectTitle}
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Client Organization: <strong className="text-slate-200">{clientName}</strong>
              </p>
            </div>

            <div className="flex flex-col sm:items-end">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  status === "completed"
                    ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                    : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                }`}
              >
                {status === "completed" ? "Fully Completed" : "In Active Production"}
              </span>
              <div className="text-[11px] text-slate-400 font-mono mt-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Target Handover: {deadline}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar & Percentage Metric */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-cyan-400" />
                Overall Deliverable Progress
              </span>
              <span className="text-xl font-black text-white font-mono">{progress}%</span>
            </div>

            <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-[#1FA8CB] via-[#2E5FCC] to-emerald-400 rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(31,168,203,0.6)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Ready Deliverable Access Box (If URL exists) */}
          {deliverableUrl && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-cyan-950/30 to-blue-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 border border-cyan-500/40">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Master Deliverable / Preview Ready</div>
                  <div className="text-[11px] text-slate-400">High-resolution assets published for your review</div>
                </div>
              </div>
              <a
                href={deliverableUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#1FA8CB] to-[#2E5FCC] text-white text-xs font-bold flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-cyan-500/20 transition-all shrink-0"
              >
                <span>Access Deliverable</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Milestone Stages Step-by-Step Breakdown */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#0C1628]/95 border border-[#1E304F] shadow-xl space-y-6">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Production Milestones & Role Verification
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live progression certified by assigned creative leads, editors, and publishers
            </p>
          </div>

          <div className="space-y-4">
            {stages.map((stg, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl border transition-all ${
                  stg.isDone
                    ? "bg-emerald-950/20 border-emerald-500/30 text-white"
                    : "bg-black/30 border-white/5 text-slate-400"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        stg.isDone
                          ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/40"
                          : "border border-slate-700 text-slate-500"
                      }`}
                    >
                      {stg.isDone ? "OK" : index + 1}
                    </div>
                    <div>
                      <div className="text-xs font-bold flex items-center gap-2">
                        <span className={stg.isDone ? "text-emerald-300" : "text-slate-300"}>
                          {stg.name}
                        </span>
                        {stg.isDone && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                            COMPLETED
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2 flex-wrap">
                        {stg.completedBy && (
                          <span className="flex items-center gap-1 text-slate-300 font-mono text-[10px]">
                            <User className="w-3 h-3 text-cyan-400" />
                            Verified by: {stg.completedBy}
                          </span>
                        )}
                        {stg.completedAt && (
                          <>
                            <span>•</span>
                            <span className="text-slate-500 font-mono text-[10px]">
                              {stg.completedAt}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-amber-400 shrink-0">
                    {stg.percentage}% Weight
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Team & Direct WhatsApp CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-3xl p-6 bg-[#0C1628]/90 border border-[#1E304F] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Agency Guarantees
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>NDA & Commercial Confidentiality Guaranteed</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Dedicated Studio Lead Assigned</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Unlimited Minor Revisions Until Final Sign-off</span>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl p-6 bg-gradient-to-br from-[#0C1628] to-[#122340] border border-[#1E304F] flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Have questions or feedback?
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Your dedicated project lead is available on WhatsApp 24/7.
              </p>
            </div>

            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Message Project Lead on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-slate-500 pt-4">
          ThumbStop Digital Agency • Powered by ThumbStop Live Operating System
        </div>
      </main>
    </div>
  );
}
