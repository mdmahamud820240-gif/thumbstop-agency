"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useContent } from "@/context/ContentContext";
import { ClientRecord } from "@/data/content";
import { 
  Printer, 
  Plus, 
  Search, 
  ArrowLeft, 
  Trash2, 
  Clock, 
  CreditCard 
} from "lucide-react";

interface LineItem {
  id: number;
  desc: string;
  qty: number;
  rate: number;
  amount: number;
}

function InvoiceContent() {
  const searchParams = useSearchParams();
  const clientIdParam = searchParams.get("clientId");
  const { clients } = useContent();

  // Invoice Meta
  const [invNo, setInvNo] = useState("INV-2026-00001");
  const [invDate, setInvDate] = useState(() => {
    return new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  });
  const [invDue, setInvDue] = useState(() => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);
    return dueDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  });

  // Company details
  const [coAddr1, setCoAddr1] = useState("9/15, Junayed Complex, Uttar Rajashon ( Delta Mor ),");
  const [coAddr2, setCoAddr2] = useState("Birulia, Savar, Dhaka");
  const [coPhone, setCoPhone] = useState("+880 1901127945");

  // Client Details
  const [clientCode, setClientCode] = useState("TS-CL-001");
  const [clientName, setClientName] = useState("Client Name");
  const [clientAddr, setClientAddr] = useState("City, District");
  const [clientEmail, setClientEmail] = useState("client@email.com");
  const [clientPhone, setClientPhone] = useState("+880 1XXXXXXXXX");

  // Project Details
  const [projName, setProjName] = useState("Digital Growth Campaign");
  const [projRef, setProjRef] = useState("Online Madrasa Solution");
  const [projTime, setProjTime] = useState(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${formattedDate}, ${formattedTime}`;
  });

  // Payment Details
  const [bankName, setBankName] = useState("United Commercial Bank PLC");
  const [accName, setAccName] = useState("Quran International Institute");
  const [accNo, setAccNo] = useState("7103241003288157");
  const [routingNo, setRoutingNo] = useState("245264098");
  const [bkash, setBkash] = useState("+880 1928616108");
  const [paymentMethod, setPaymentMethod] = useState("bKash");

  // Notes
  const [notes, setNotes] = useState(
    "Thank you for working with us! Payment is due within 7 days of the invoice date.\n\nA 2% late fee applies per week on overdue balances."
  );

  // Line items
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: 1, desc: "Marketing Strategy & Campaign Management", qty: 1, rate: 3000, amount: 3000 },
    { id: 2, desc: "Video Editing & Color Grading (2 Videos)", qty: 2, rate: 4000, amount: 8000 },
    { id: 3, desc: "Facebook Page Setup & Security Hardening", qty: 1, rate: 3000, amount: 3000 },
  ]);

  // Totals
  const [discount, setDiscount] = useState(2000);
  const [totalPaid, setTotalPaid] = useState(12000);

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const flashStatus = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 2000);
  };

  const selectClient = (c: ClientRecord) => {
    setClientCode(c.clientCode || `TS-CL-${c.id.replace(/[^0-9]/g, "").padStart(3, "0")}`);
    setClientName(c.name);
    setClientAddr(c.address || c.company || "Dhaka, Bangladesh");
    setClientEmail(c.email || `${c.name.toLowerCase().replace(/\s+/g, "")}@example.com`);
    setClientPhone(c.phone || c.whatsapp);
    setProjName(c.company ? `${c.company} — Project Execution` : `${c.name} Project`);
    setProjRef(c.serviceName);
    setPaymentMethod(c.paymentMethod || "bKash");

    // Prepopulate line item from their service
    setLineItems([
      {
        id: 1,
        desc: c.serviceName,
        qty: 1,
        rate: c.totalAmount || 10000,
        amount: c.totalAmount || 10000,
      },
    ]);
    setDiscount(0);
    setTotalPaid(c.paidAmount || 0);

    setSearchQuery("");
    setShowSearchDropdown(false);
    flashStatus(`Loaded: ${c.name}`);
  };

  // Pre-load if clientIdParam exists
  useEffect(() => {
    if (clientIdParam && clients.length > 0) {
      const match = clients.find(
        (c) => c.id === clientIdParam || c.clientCode === clientIdParam
      );
      if (match) {
        queueMicrotask(() => {
          selectClient(match);
        });
      }
    }
  }, [clientIdParam, clients]);

  // Calculations
  const subtotal = lineItems.reduce((sum, item) => sum + (item.amount || 0), 0);
  const totalRate = lineItems.reduce((sum, item) => sum + (item.rate || 0), 0);
  const totalPayable = Math.max(subtotal - (discount || 0), 0);
  const totalDue = totalPayable - (totalPaid || 0);
  const isPaid = totalDue <= 0 && totalPayable > 0;

  // Add Row
  const handleAddRow = () => {
    const newItem: LineItem = {
      id: Date.now(),
      desc: "Additional Service Item",
      qty: 1,
      rate: 1000,
      amount: 1000,
    };
    setLineItems([...lineItems, newItem]);
  };

  // Delete Row
  const handleDeleteRow = (id: number) => {
    if (lineItems.length <= 1) return;
    setLineItems(lineItems.filter((i) => i.id !== id));
  };

  // Update item
  const updateItem = (id: number, field: keyof LineItem, val: string | number) => {
    setLineItems(
      lineItems.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: val };
        if (field === "qty" || field === "rate") {
          const q = field === "qty" ? Number(val) || 0 : item.qty;
          const r = field === "rate" ? Number(val) || 0 : item.rate;
          updated.amount = q * r;
        }
        return updated;
      })
    );
  };

  // Start New Invoice
  const handleNewInvoice = () => {
    if (!confirm("Start a new invoice? This resets client and line items.")) return;
    setClientCode(`TS-CL-${String(clients.length + 1).padStart(3, "0")}`);
    setClientName("Client Name");
    setClientAddr("City, District");
    setClientEmail("client@email.com");
    setClientPhone("+880 1XXXXXXXXX");
    setProjName("Project Name");
    setProjRef("Service Name");
    setDiscount(0);
    setTotalPaid(0);
    setLineItems([
      { id: Date.now(), desc: "Service Item Name", qty: 1, rate: 5000, amount: 5000 },
    ]);

    // Bump invoice number
    const m = invNo.match(/(\d+)$/);
    if (m) {
      const nextNum = (parseInt(m[1], 10) + 1).toString().padStart(m[1].length, "0");
      setInvNo(invNo.slice(0, m.index) + nextNum);
    }
    flashStatus("New invoice ready");
  };

  // Filter clients for search
  const filteredClients = clients.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      (c.phone && c.phone.toLowerCase().includes(q)) ||
      (c.clientCode && c.clientCode.toLowerCase().includes(q)) ||
      (c.serviceName && c.serviceName.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-[#EDEAD8] font-sans text-[#1B1D22] p-4 sm:p-6 pb-20 print:p-0 print:bg-[#FCF9EA]">
      {/* ⭐️ Top Control Bar (Hidden on Print) ⭐️ */}
      <header className="max-w-[900px] mx-auto mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-[#DCD8C4] text-xs font-semibold text-[#1B1D22] hover:bg-slate-50 transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Admin Center</span>
          </Link>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2E6FE0] text-white text-xs font-bold hover:bg-[#255ec4] transition-all shadow-md active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>

          <button
            onClick={handleNewInvoice}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-[#DCD8C4] text-xs font-bold text-[#1B1D22] hover:bg-slate-50 transition-all shadow-sm active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Invoice</span>
          </button>
        </div>

        {/* Live Client Search Box (By Name, Phone, or Client ID) */}
        <div className="relative flex-1 max-w-sm">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              placeholder="Search Client by Name, Phone, ID..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white border border-[#DCD8C4] text-xs text-[#1B1D22] focus:outline-none focus:ring-1 focus:ring-[#2E6FE0] shadow-sm"
            />
          </div>

          {/* Search Results Dropdown */}
          {showSearchDropdown && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-1 rounded-xl bg-white border border-slate-200 shadow-xl z-50 max-h-64 overflow-y-auto p-1.5">
              <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">
                Matching Clients ({filteredClients.length})
              </div>
              {filteredClients.length === 0 ? (
                <div className="p-3 text-xs text-slate-500 text-center">No clients found</div>
              ) : (
                filteredClients.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => selectClient(c)}
                    className="w-full text-left p-2 rounded-lg hover:bg-blue-50/80 transition-colors flex items-center justify-between gap-2 border-b border-slate-100 last:border-none"
                  >
                    <div>
                      <div className="font-bold text-xs text-[#1B1D22] flex items-center gap-1.5">
                        <span>{c.name}</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-blue-100 text-blue-800">
                          {c.clientCode || "CL-ID"}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {c.phone} • {c.serviceName}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-bold text-emerald-600 block">
                        ৳{c.totalAmount.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {c.dueAmount > 0 ? `Due: ৳${c.dueAmount}` : "Full Paid"}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {statusMsg && (
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full animate-fade-in">
            {statusMsg}
          </span>
        )}
      </header>

      {/* ⭐️ MAIN INVOICE SHEET (Classic Cream Paper Texture) ⭐️ */}
      <main className="max-w-[900px] mx-auto bg-[#FCF9EA] border border-[#E4E0CC] p-8 sm:p-11 shadow-2xl relative overflow-hidden print:p-6 print:border-none print:shadow-none print:max-w-full">
        {/* ⭐️ DYNAMIC RUBBER STAMP: PAID vs UNPAID (Sticker on top) ⭐️ */}
        <div className="absolute top-28 right-10 sm:right-16 pointer-events-none select-none z-20 transition-all duration-300">
          {isPaid ? (
            <div className="px-5 py-2 border-[4px] border-emerald-600 rounded-xl text-emerald-600 font-black text-2xl sm:text-3xl tracking-widest uppercase rotate-[-14deg] shadow-lg opacity-85 backdrop-blur-[1px] flex flex-col items-center leading-none">
              <span>PAID</span>
              <span className="text-[9px] font-mono tracking-wider mt-1 text-emerald-700">
                VERIFIED PAYMENT
              </span>
            </div>
          ) : (
            <div className="px-5 py-2 border-[4px] border-rose-600 rounded-xl text-rose-600 font-black text-2xl sm:text-3xl tracking-widest uppercase rotate-[-14deg] shadow-lg opacity-85 backdrop-blur-[1px] flex flex-col items-center leading-none">
              <span>UNPAID</span>
              <span className="text-[9px] font-mono tracking-wider mt-1 text-rose-700">
                DUE: {totalDue} BDT
              </span>
            </div>
          )}
        </div>

        {/* Header Grid: Brand Logo / Wordmark + Center Emblem + Invoice Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-4 pb-6 border-b border-[#DCD8C4]">
          {/* Brand Left */}
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              <span className="text-[#00AEEF]">T</span>humb
              <span className="text-[#2762C1]">S</span>top
            </div>
            <div className="text-[11px] font-bold text-[#8A8672] uppercase tracking-widest my-1">
              Creative · Marketing · Video
            </div>
            <div className="space-y-0.5 text-[11.5px] text-[#57543F] max-w-[270px]">
              <input
                type="text"
                value={coAddr1}
                onChange={(e) => setCoAddr1(e.target.value)}
                className="w-full bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none"
              />
              <input
                type="text"
                value={coAddr2}
                onChange={(e) => setCoAddr2(e.target.value)}
                className="w-full bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none"
              />
              <input
                type="text"
                value={coPhone}
                onChange={(e) => setCoPhone(e.target.value)}
                className="w-full bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none font-semibold text-[#1B1D22]"
              />
            </div>
          </div>

          {/* Logo Center */}
          <div className="flex justify-center items-start pt-1">
            <img
              src="/images/brand/logo-emblem-transparent.png"
              alt="ThumbStop Agency Logo"
              className="h-24 sm:h-28 w-auto object-contain drop-shadow-sm"
            />
          </div>

          {/* Invoice Meta Right */}
          <div className="text-left sm:text-right">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-[#1B1D22] mb-2">
              INVOICE
            </h1>
            <div className="space-y-1 text-xs text-[#57543F]">
              <div className="flex sm:justify-end items-center gap-2">
                <span className="text-[#8A8672] font-medium">Invoice No:</span>
                <input
                  type="text"
                  value={invNo}
                  onChange={(e) => setInvNo(e.target.value)}
                  className="font-mono font-bold text-right text-[#1B1D22] w-36 bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none"
                />
              </div>

              {/* Sequential Client ID */}
              <div className="flex sm:justify-end items-center gap-2">
                <span className="text-[#8A8672] font-medium">Client ID:</span>
                <input
                  type="text"
                  value={clientCode}
                  onChange={(e) => setClientCode(e.target.value)}
                  className="font-mono font-bold text-right text-[#1E3A8A] w-36 bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none"
                  title="Client ID Number (e.g. TS-CL-001)"
                />
              </div>

              <div className="flex sm:justify-end items-center gap-2">
                <span className="text-[#8A8672] font-medium">Date:</span>
                <input
                  type="text"
                  value={invDate}
                  onChange={(e) => setInvDate(e.target.value)}
                  className="text-right text-[#1B1D22] w-36 bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none"
                />
              </div>

              <div className="flex sm:justify-end items-center gap-2">
                <span className="text-[#8A8672] font-medium">Due Date:</span>
                <input
                  type="text"
                  value={invDue}
                  onChange={(e) => setInvDue(e.target.value)}
                  className="text-right text-[#1B1D22] w-36 bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid: Bill To & Project Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          {/* Bill To */}
          <div className="p-3.5 bg-[#EEF1F8] border border-[#E4E0CC] rounded-sm space-y-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-[#1E3A8A] tracking-wider uppercase">
                BILL TO
              </span>
              <span className="text-[10px] font-mono font-bold text-[#1E3A8A] bg-blue-200/50 px-1.5 py-0.5 rounded">
                {clientCode}
              </span>
            </div>
            <div>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Client Name"
                className="w-full font-bold text-sm sm:text-base text-[#1B1D22] bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none"
              />
            </div>
            <input
              type="text"
              value={clientAddr}
              onChange={(e) => setClientAddr(e.target.value)}
              placeholder="Client Address"
              className="w-full text-xs text-[#57543F] bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none"
            />
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="client@email.com"
              className="w-full text-xs text-[#57543F] bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none"
            />
            <input
              type="text"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              placeholder="Phone Number"
              className="w-full text-xs font-medium text-[#1B1D22] bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none"
            />
          </div>

          {/* Project Details */}
          <div className="p-3.5 bg-[#FFFFFF] border border-[#E4E0CC] rounded-sm space-y-1.5">
            <span className="text-[11px] font-bold text-[#1E3A8A] tracking-wider uppercase block">
              PROJECT DETAILS
            </span>
            <input
              type="text"
              value={projName}
              onChange={(e) => setProjName(e.target.value)}
              placeholder="Project Name"
              className="w-full font-semibold text-xs sm:text-sm text-[#1B1D22] bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none"
            />
            <input
              type="text"
              value={projRef}
              onChange={(e) => setProjRef(e.target.value)}
              placeholder="Service Discipline Reference"
              className="w-full text-xs text-[#57543F] bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none"
            />
            <div className="flex items-center gap-1.5 text-xs text-[#57543F] pt-1">
              <Clock className="w-3.5 h-3.5 text-[#8A8672]" />
              <input
                type="text"
                value={projTime}
                onChange={(e) => setProjTime(e.target.value)}
                placeholder="Issue Timestamp"
                className="w-full text-[11.5px] text-[#57543F] bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Clean Service & Line Items Table (Simplified: Item Name, Qty, Rate, Amount) */}
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#151726] text-white text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3 w-10 text-center">SL</th>
                <th className="py-2.5 px-3">Service / Item Description</th>
                <th className="py-2.5 px-3 w-16 text-right">Qty</th>
                <th className="py-2.5 px-3 w-28 text-right">Rate (BDT)</th>
                <th className="py-2.5 px-3 w-28 text-right">Amount (BDT)</th>
                <th className="py-2.5 px-2 w-8 text-center print:hidden"></th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`border-b border-[#DCD8C4] ${
                    idx % 2 === 1 ? "bg-[#F6F3E4]" : "bg-transparent"
                  }`}
                >
                  <td className="py-2.5 px-3 text-center text-[#8A8672] font-mono text-xs">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-[#1B1D22]">
                    <input
                      type="text"
                      value={item.desc}
                      onChange={(e) => updateItem(item.id, "desc", e.target.value)}
                      placeholder="Service Name"
                      className="w-full font-semibold bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => updateItem(item.id, "qty", e.target.value)}
                      className="w-full text-right bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none font-mono"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateItem(item.id, "rate", e.target.value)}
                      className="w-full text-right bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none font-mono"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-[#1B1D22] font-mono">
                    {item.amount.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-2 text-center print:hidden">
                    <button
                      type="button"
                      onClick={() => handleDeleteRow(item.id)}
                      className="text-rose-500 hover:text-rose-700 opacity-60 hover:opacity-100 transition-opacity p-1"
                      title="Remove Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[#1B1D22] font-bold text-xs sm:text-sm">
                <td colSpan={2} className="py-3 px-3"></td>
                <td className="py-3 px-3 text-right text-[#57543F] font-semibold">Total</td>
                <td className="py-3 px-3 text-right font-mono text-[#57543F]">
                  {totalRate.toLocaleString()}
                </td>
                <td className="py-3 px-3 text-right font-mono text-[#1B1D22]">
                  {subtotal.toLocaleString()}
                </td>
                <td className="print:hidden"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Add Line Item Button (Hidden on Print) */}
        <div className="my-2 print:hidden">
          <button
            type="button"
            onClick={handleAddRow}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-dashed border-[#A9A48A] text-xs font-semibold text-[#57543F] hover:text-[#2E6FE0] hover:border-[#2E6FE0] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Line Item</span>
          </button>
        </div>

        {/* Totals Calculation Block */}
        <div className="flex justify-end my-6">
          <div className="w-72 space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between items-center py-1 font-bold text-[#1B1D22]">
              <span>Subtotal:</span>
              <span className="font-mono">{subtotal.toLocaleString()} BDT</span>
            </div>

            <div className="flex justify-between items-center py-1 font-bold text-[#1B1D22]">
              <span>Discount:</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                  className="w-20 text-right font-mono font-bold bg-transparent border-b border-dashed border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none"
                />
                <span className="font-mono text-xs">BDT</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-2 border-t border-[#DCD8C4] font-bold text-sm text-[#1B1D22]">
              <span>Total Payable:</span>
              <span className="font-mono text-base">{totalPayable.toLocaleString()} BDT</span>
            </div>

            {/* Total Paid & Due Box */}
            <div className="bg-[#2E6FE0] text-white p-3.5 rounded-sm space-y-2 shadow-md">
              <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                <span>TOTAL PAID:</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={totalPaid}
                    onChange={(e) => setTotalPaid(Number(e.target.value) || 0)}
                    className="w-24 text-right font-mono font-bold text-white bg-transparent border-b border-dashed border-white/50 focus:border-white focus:outline-none"
                  />
                  <span className="font-mono text-xs">BDT</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm font-black pt-2 border-t border-white/30">
                <span>TOTAL DUE:</span>
                <span className="font-mono text-base">{totalDue.toLocaleString()} BDT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Grid: Payment Channel Details & Blank Signature Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-[#DCD8C4] mt-8 text-xs text-[#57543F]">
          {/* Payment Account Details */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-[#1E3A8A] tracking-wider uppercase mb-2 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5" />
              <span>PAYMENT DETAILS</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#8A8672] w-24 shrink-0 font-medium">Channel / Via:</span>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="bg-transparent font-bold text-[#1B1D22] border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none"
              >
                <option value="bKash">bKash (Merchant / Personal)</option>
                <option value="Nagad">Nagad</option>
                <option value="Rocket">Rocket</option>
                <option value="Bank Wire">Bank Wire (UCB PLC)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#8A8672] w-24 shrink-0 font-medium">bKash / Nagad:</span>
              <input
                type="text"
                value={bkash}
                onChange={(e) => setBkash(e.target.value)}
                className="w-full font-mono font-bold text-[#1B1D22] bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#8A8672] w-24 shrink-0 font-medium">Bank Name:</span>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#8A8672] w-24 shrink-0 font-medium">Account Name:</span>
              <input
                type="text"
                value={accName}
                onChange={(e) => setAccName(e.target.value)}
                className="w-full bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#8A8672] w-24 shrink-0 font-medium">Account No:</span>
              <input
                type="text"
                value={accNo}
                onChange={(e) => setAccNo(e.target.value)}
                className="w-full font-mono font-semibold text-[#1B1D22] bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#8A8672] w-24 shrink-0 font-medium">Routing No:</span>
              <input
                type="text"
                value={routingNo}
                onChange={(e) => setRoutingNo(e.target.value)}
                className="w-full font-mono bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none"
              />
            </div>
          </div>

          {/* Notes & Blank Signature Space */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold text-[#1E3A8A] tracking-wider uppercase mb-2">
                TERMS & NOTES
              </div>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs text-[#57543F] bg-transparent border-b border-dashed border-transparent hover:border-[#C9C4AA] focus:border-[#2E6FE0] focus:outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Blank Signature Area (Clean space for physical signature after printing) */}
            <div className="mt-8 flex flex-col items-center sm:items-end">
              <div className="w-56 text-center">
                <div className="h-12 w-full flex items-center justify-center text-[10px] text-slate-300 print:text-transparent select-none italic">
                  [ Sign Here ]
                </div>
                <div className="border-t border-[#A9A48A] pt-1.5 text-[11px] text-[#8A8672] font-semibold tracking-wider uppercase">
                  Authorized Signature
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function InvoicePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading Invoice Generator...</div>}>
      <InvoiceContent />
    </Suspense>
  );
}
