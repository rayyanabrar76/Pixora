"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2, Send } from "lucide-react";

const CONTACT_ITEMS = [
  { Icon: Mail,    label: "Email",    value: "fahadwaseem461@gmail.com",    sub: "We reply within 2 hours"    },
  { Icon: Phone,   label: "Phone",    value: "03444-029461",                                                             sub: "Mon–Sat, 9am – 9pm"         },
  { Icon: MapPin,  label: "Location", value: "Arora Chorasta, Mian Khan Baseerpur, Tehsil Depalpur, District Okara", sub: "Available remotely worldwide"},
  { Icon: Clock,   label: "Hours",    value: "Mon–Sat, 9am – 9pm",   sub: "We're usually online early"  },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "0.75rem",
  padding: "0.7rem 1rem",
  fontSize: "0.875rem",
  color: "#e2e8f0",
  outline: "none",
  caretColor: "#60a5fa",
  transition: "border-color 0.2s",
};

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", service: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(37,99,235,0.6)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)";
  };
  const blurBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}>

      {/* Ambient glows */}
      <div className="fixed top-0 left-1/4 w-125 h-125 rounded-full blur-3xl opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle,#2563eb,transparent)" }} />
      <div className="fixed top-0 right-1/4 w-125 h-125 rounded-full blur-3xl opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle,#7c3aed,transparent)" }} />

      <div className="max-w-6xl mx-auto px-4 py-16 relative">

        {/* Page header */}
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4"
            style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)", color: "#60a5fa" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Contact Us
          </span>
          <h1 className="text-5xl font-extrabold mb-4 leading-tight"
            style={{ background: "linear-gradient(135deg,#fff 40%,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Let&apos;s Build Something
          </h1>
          <p className="text-base max-w-md mx-auto leading-relaxed" style={{ color: "rgba(148,163,184,0.7)" }}>
            Have a project in mind? We respond to every message within a few hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Left: info ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Contact items */}
            {CONTACT_ITEMS.map(({ Icon, label, value, sub }) => (
              <div key={label} className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-200 group"
                style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.2)" }}>
                  <Icon size={16} style={{ color: "#60a5fa" }} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "rgba(100,116,139,0.7)" }}>{label}</div>
                  <div className="text-sm font-bold" style={{ color: "#e2e8f0" }}>{value}</div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(100,116,139,0.55)" }}>{sub}</div>
                </div>
              </div>
            ))}

            {/* Quick note */}
            <div className="rounded-2xl p-5 mt-auto"
              style={{ background: "linear-gradient(135deg,rgba(37,99,235,0.1),rgba(79,70,229,0.07))", border: "1px solid rgba(37,99,235,0.2)" }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: "0 0 6px #4ade80" }} />
                <span className="text-xs font-bold" style={{ color: "#4ade80" }}>Currently available</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>
                We&apos;re taking on new projects. Send us a message and we&apos;ll get back to you within 2 hours.
              </p>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl overflow-hidden"
              style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 8px 48px rgba(0,0,0,0.4)" }}>

              {/* gradient top bar */}
              <div className="h-0.75 w-full"
                style={{ background: "linear-gradient(to right,#2563eb,#4f46e5,#7c3aed)" }} />

              <div className="p-7">
                <h2 className="text-xl font-extrabold mb-1" style={{ color: "#f1f5f9" }}>Send a Message</h2>
                <p className="text-xs mb-7" style={{ color: "rgba(100,116,139,0.6)" }}>
                  Fill in the details below and we&apos;ll be in touch shortly.
                </p>

                {sent ? (
                  <div className="text-center py-14">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                      style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)" }}>
                      <CheckCircle2 size={28} style={{ color: "#4ade80" }} />
                    </div>
                    <h3 className="font-extrabold text-xl mb-2" style={{ color: "#e2e8f0" }}>Message Sent!</h3>
                    <p className="text-sm" style={{ color: "rgba(100,116,139,0.7)" }}>
                      We&apos;ll get back to you within 2 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5 uppercase tracking-widest"
                          style={{ color: "rgba(100,116,139,0.7)" }}>Your Name</label>
                        <input
                          required
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          onFocus={focusBorder} onBlur={blurBorder}
                          placeholder="Ahmed Khan"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5 uppercase tracking-widest"
                          style={{ color: "rgba(100,116,139,0.7)" }}>Email</label>
                        <input
                          required type="email"
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          onFocus={focusBorder} onBlur={blurBorder}
                          placeholder="you@example.com"
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-widest"
                        style={{ color: "rgba(100,116,139,0.7)" }}>Service You Need</label>
                      <input
                        value={form.service}
                        onChange={e => setForm({ ...form, service: e.target.value })}
                        onFocus={focusBorder} onBlur={blurBorder}
                        placeholder="e.g. Logo Design, Website, Social Media..."
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-widest"
                        style={{ color: "rgba(100,116,139,0.7)" }}>Message</label>
                      <textarea
                        required rows={5}
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        onFocus={focusBorder} onBlur={blurBorder}
                        placeholder="Tell us about your project, goals, and budget..."
                        style={{ ...inputStyle, resize: "none" }}
                      />
                    </div>

                    <button type="submit"
                      className="w-full flex items-center justify-center gap-2 font-bold py-4 rounded-xl text-white text-sm transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                      style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 24px rgba(37,99,235,0.5)" }}>
                      <Send size={15} />
                      Send Message
                    </button>

                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
