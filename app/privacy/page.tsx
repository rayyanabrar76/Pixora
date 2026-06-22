import Link from "next/link";
import { Shield, Eye, Cookie, Lock, UserCheck, Mail } from "lucide-react";

const SECTIONS = [
  {
    Icon: Eye,
    title: "Information We Collect",
    content: [
      {
        heading: "Personal Information",
        body: "When you place an order or create an account, we collect your full name and email address. Payment is handled manually via bank transfer or mobile wallets (EasyPaisa / JazzCash). We do not collect or store card numbers.",
      },
      {
        heading: "Usage Data",
        body: "We automatically collect information about how you interact with our website, including your IP address, browser type, pages visited, and time spent on each page. This data helps us improve our services.",
      },
      {
        heading: "Communications",
        body: "When you contact us via the contact form or email, we retain those messages to provide support and follow up on your requests.",
      },
    ],
  },
  {
    Icon: Shield,
    title: "How We Use Your Information",
    content: [
      {
        heading: "Service Delivery",
        body: "Your name and email are used to create your account, process your orders, deliver completed digital files, and send project update notifications.",
      },
      {
        heading: "Payment Processing",
        body: "Payments are processed manually via bank transfer or mobile wallet (EasyPaisa / JazzCash). We do not collect card numbers. Payment details shared during the order process are used solely to confirm your transaction.",
      },
      {
        heading: "Marketing Communications",
        body: "We may send you promotional emails about new services or offers. You can unsubscribe at any time using the link at the bottom of any email.",
      },
      {
        heading: "Service Improvement",
        body: "Aggregated, anonymised usage data helps us identify which services are most popular, fix bugs, and improve the overall experience on our platform.",
      },
    ],
  },
  {
    Icon: Cookie,
    title: "Cookies",
    content: [
      {
        heading: "Essential Cookies",
        body: "We use strictly necessary cookies to keep you logged in and maintain your shopping session. These cannot be disabled as the website would not function without them.",
      },
      {
        heading: "Analytics Cookies",
        body: "With your consent, we use analytics cookies to understand how visitors use our site. This data is anonymous and is never sold to third parties.",
      },
      {
        heading: "Managing Cookies",
        body: "You can control or delete cookies at any time through your browser settings. Disabling analytics cookies will not affect your ability to use our services.",
      },
    ],
  },
  {
    Icon: Lock,
    title: "Third-Party Services",
    content: [
      {
        heading: "Clerk (Authentication)",
        body: "We use Clerk to manage user accounts, sign-in, and session security. Clerk stores your email and authentication credentials in compliance with industry security standards.",
      },
      {
        heading: "Supabase (Database)",
        body: "We use Supabase to store order data and account information securely. Data is stored on Supabase's servers in compliance with industry security standards.",
      },
      {
        heading: "Google Drive",
        body: "Completed project files are delivered via shared Google Drive links. We do not share your personal information with Google beyond what is required to generate the delivery link.",
      },
    ],
  },
  {
    Icon: UserCheck,
    title: "Your Rights",
    content: [
      {
        heading: "Access and Correction",
        body: "You have the right to request a copy of the personal information we hold about you and ask us to correct any inaccurate data.",
      },
      {
        heading: "Deletion",
        body: "You may request deletion of your account and associated personal data at any time by contacting us at the email address below. We will process deletion requests within 14 business days.",
      },
      {
        heading: "Data Portability",
        body: "You can request an export of your order history and account data in a machine-readable format.",
      },
    ],
  },
];

export default function PrivacyPage() {
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
            Legal
          </span>
          <h1 className="text-5xl font-extrabold mb-5 leading-tight"
            style={{ background: "linear-gradient(135deg,#fff 40%,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Privacy Policy
          </h1>
          <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: "rgba(148,163,184,0.75)" }}>
            We take your privacy seriously. This policy explains what data Fahadamina Enterprises collects, how we use it, and the rights you have over your information.
          </p>
          <p className="text-xs mt-4" style={{ color: "rgba(100,116,139,0.6)" }}>
            Last updated: June 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-24">
        <div className="max-w-3xl mx-auto space-y-8">

          {/* Intro card */}
          <div className="rounded-2xl p-6"
            style={{ background: "linear-gradient(135deg,rgba(37,99,235,0.1),rgba(79,70,229,0.07))", border: "1px solid rgba(37,99,235,0.2)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(203,213,225,0.85)" }}>
              This Privacy Policy applies to all services offered by Fahadamina Enterprises, a digital agency based in Pakistan, accessible at this website. By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree, please do not use our services.
            </p>
          </div>

          {/* Sections */}
          {SECTIONS.map(({ Icon, title, content }) => (
            <div key={title} className="rounded-2xl overflow-hidden"
              style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
              {/* Section header */}
              <div className="flex items-center gap-3 px-6 py-5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.2)" }}>
                  <Icon size={16} style={{ color: "#60a5fa" }} />
                </div>
                <h2 className="font-extrabold text-base" style={{ color: "#f1f5f9" }}>{title}</h2>
              </div>
              {/* Sub-items */}
              <div className="px-6 py-5 space-y-5">
                {content.map(({ heading, body }) => (
                  <div key={heading}>
                    <h3 className="text-sm font-bold mb-1.5" style={{ color: "#e2e8f0" }}>{heading}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Contact card */}
          <div className="rounded-2xl p-6"
            style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.2)" }}>
                <Mail size={16} style={{ color: "#60a5fa" }} />
              </div>
              <h2 className="font-extrabold text-base" style={{ color: "#f1f5f9" }}>Contact Us About Your Data</h2>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(148,163,184,0.75)" }}>
              If you have any questions about this Privacy Policy, wish to exercise your rights, or want to submit a data request, please reach out to us directly.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl text-white text-sm transition-all hover:scale-[1.03]"
              style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 16px rgba(37,99,235,0.4)" }}>
              Go to Contact Page
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
