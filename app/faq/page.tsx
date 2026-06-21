"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "How do I place an order?",
    a: "Browse our services on the Shop page, select the service you need, and complete the checkout process. Once payment is confirmed, you will receive an order confirmation email and we will reach out to collect your project brief within a few hours.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major debit and credit cards (Visa, Mastercard) processed securely through Stripe. For clients in Pakistan, we also accept bank transfer and EasyPaisa / JazzCash — please contact us before ordering to arrange this.",
  },
  {
    q: "How long does each service take?",
    a: "Delivery times vary by service. Logo design is typically delivered within 24–48 hours. Website projects take 5–7 business days. Social media packages take 3–5 business days, and video editing takes 2–3 business days. All timelines start once we have received your complete brief and assets.",
  },
  {
    q: "Do you offer revisions?",
    a: "Yes — all services include unlimited free revisions within the original project scope. We keep refining the work until you are 100% satisfied. Revisions that require a significantly different direction from the original brief may be treated as a new request.",
  },
  {
    q: "What if I am not happy with the final result?",
    a: "We will do everything we can to resolve your concerns through additional revisions first. If the quality issue cannot be fixed, you may be eligible for a partial or full refund depending on the circumstances. Please review our Refund Policy or contact us directly.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes, absolutely. While we are based in Pakistan, we work with clients all over the world. All communication is conducted in English via email, and files are delivered digitally, so there are no geographical limitations.",
  },
  {
    q: "Can I see samples of your previous work?",
    a: "Yes. Visit our Shop page to see examples attached to each service listing. You can also browse our portfolio on our social media pages, or simply ask us for samples in the specific niche or style you are looking for — we are happy to share relevant work.",
  },
  {
    q: "How do I contact you with questions before ordering?",
    a: "You can reach us via the Contact page on this website. We respond to all messages within 2 hours during business hours (Monday to Saturday, 9am to 9pm PKT). For urgent queries, you can also reach us on WhatsApp.",
  },
  {
    q: "What file formats will I receive?",
    a: "File formats depend on the service. Logo design includes AI, EPS, SVG, PNG, and PDF. Website projects include live site access and source code. Social media content is delivered as PNG and MP4 files, with Figma or Canva source files on request. Video editing is delivered as MP4 (1080p or 4K).",
  },
  {
    q: "Do you offer ongoing support after project completion?",
    a: "Yes. We offer ongoing retainer packages for services like SEO, social media management, and website maintenance. For one-time projects, we provide 14 days of post-delivery support for minor adjustments at no extra charge.",
  },
  {
    q: "Can I request a custom service not listed on your site?",
    a: "Definitely. If you need something that is not listed, reach out to us through the Contact page with a description of what you need. We handle many custom requests and will provide a quote within 24 hours.",
  },
  {
    q: "Is my payment information secure?",
    a: "Yes. All payments are processed by Stripe, which is PCI-DSS Level 1 compliant — the highest level of payment security certification available. Fahadamina Enterprises never sees or stores your card number.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}>

      {/* Ambient glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle,#2563eb,transparent)" }} />
      <div className="fixed top-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle,#7c3aed,transparent)" }} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 px-4">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
          style={{ background: "linear-gradient(to right,transparent,rgba(37,99,235,0.4),transparent)" }} />
        <div className="max-w-3xl mx-auto text-center relative">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-5"
            style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)", color: "#60a5fa" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Support
          </span>
          <h1 className="text-5xl font-extrabold mb-5 leading-tight"
            style={{ background: "linear-gradient(135deg,#fff 40%,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Frequently Asked Questions
          </h1>
          <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: "rgba(148,163,184,0.75)" }}>
            Everything you need to know about working with Fahadamina Enterprises. Can't find what you're looking for? Reach out to us directly.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="px-4 pb-24">
        <div className="max-w-3xl mx-auto space-y-3">

          {FAQS.map(({ q, a }, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background: "#0b1120",
                  border: isOpen
                    ? "1px solid rgba(37,99,235,0.35)"
                    : "1px solid rgba(255,255,255,0.07)",
                  boxShadow: isOpen ? "0 0 0 1px rgba(37,99,235,0.1)" : "none",
                }}
              >
                {/* Question row */}
                <button
                  className="w-full flex items-center gap-4 px-6 py-5 text-left transition-colors duration-150"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  style={{ cursor: "pointer", background: "transparent" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200"
                    style={{
                      background: isOpen ? "rgba(37,99,235,0.2)" : "rgba(37,99,235,0.1)",
                      border: isOpen ? "1px solid rgba(37,99,235,0.3)" : "1px solid rgba(37,99,235,0.15)",
                    }}
                  >
                    <HelpCircle size={14} style={{ color: "#60a5fa" }} />
                  </div>
                  <span
                    className="flex-1 text-sm font-bold leading-snug text-left"
                    style={{ color: isOpen ? "#f1f5f9" : "#e2e8f0" }}
                  >
                    {q}
                  </span>
                  <ChevronDown
                    size={16}
                    style={{
                      color: "#60a5fa",
                      flexShrink: 0,
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  />
                </button>

                {/* Answer */}
                {isOpen && (
                  <div
                    className="px-6 pb-5"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <p
                      className="text-sm leading-relaxed pt-4"
                      style={{ color: "rgba(148,163,184,0.8)" }}
                    >
                      {a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Still have questions CTA */}
          <div
            className="rounded-2xl p-8 text-center mt-8"
            style={{
              background: "linear-gradient(135deg,rgba(37,99,235,0.1),rgba(79,70,229,0.07))",
              border: "1px solid rgba(37,99,235,0.2)",
            }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.2)" }}
            >
              <HelpCircle size={20} style={{ color: "#60a5fa" }} />
            </div>
            <h2 className="font-extrabold text-lg mb-2" style={{ color: "#f1f5f9" }}>
              Still Have Questions?
            </h2>
            <p className="text-sm mb-6 max-w-xs mx-auto" style={{ color: "rgba(148,163,184,0.75)" }}>
              Our team responds to every message within 2 hours during business hours.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-white text-sm transition-all hover:scale-[1.03]"
                style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 16px rgba(37,99,235,0.4)" }}
              >
                Contact Us
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-sm transition-all hover:scale-[1.03]"
                style={{ color: "#93c5fd", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                Browse Services
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
