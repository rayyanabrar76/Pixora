import Link from "next/link";
import { FileText, Briefcase, UserCheck, Lock, AlertTriangle, Scale, RefreshCw } from "lucide-react";

const SECTIONS = [
  {
    Icon: FileText,
    title: "Acceptance of Terms",
    body: `By accessing our website or placing an order, you confirm that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services.

These terms apply to all visitors, clients, and anyone who accesses or uses Pixora's services. We reserve the right to update these terms at any time, and your continued use of our services constitutes acceptance of any changes.`,
  },
  {
    Icon: Briefcase,
    title: "Description of Services",
    body: `Pixora is a digital services agency based in Pakistan offering a range of online services including but not limited to: logo and brand identity design, website design and development, social media content creation and management, search engine optimisation (SEO), video editing and motion graphics, and digital marketing services.

All services are delivered digitally. There are no physical products involved. Specific deliverables, timelines, and scope are described on each individual service listing and confirmed at the time of order.`,
  },
  {
    Icon: UserCheck,
    title: "Client Responsibilities",
    body: `To allow us to complete your project effectively, you agree to:

- Provide all required content, assets, and information within 3 business days of placing your order, or as otherwise agreed.
- Respond to requests for feedback, approval, or clarification in a timely manner.
- Ensure that any content, images, or materials you provide do not infringe on the intellectual property rights of any third party.
- Provide accurate business information, including your business name, industry, and target audience, so that deliverables are suitable for your specific needs.

Delays caused by failure to meet these responsibilities do not entitle you to a refund and may affect delivery timelines.`,
  },
  {
    Icon: Lock,
    title: "Intellectual Property",
    body: `Upon receipt of full payment, you own the final deliverables created specifically for you. This includes all source files (AI, PSD, Figma, etc.) as detailed in your order.

Pixora retains the right to display completed work in our portfolio and on our website as examples of our service quality, unless you formally request confidentiality in writing before delivery.

Any third-party assets, stock assets, fonts, or libraries used in your project are subject to their respective licences. Pixora will inform you of any such assets and their applicable licence terms. If you require fully custom assets with no third-party dependencies, please specify this in your brief.

Work remains the intellectual property of Pixora until full payment has been received.`,
  },
  {
    Icon: AlertTriangle,
    title: "Limitation of Liability",
    body: `Pixora provides services on an "as is" basis. We make no warranties, expressed or implied, beyond those explicitly stated in these terms or on individual service pages.

To the fullest extent permitted by applicable law, Pixora shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services or deliverables, including but not limited to loss of revenue, loss of data, or business interruption.

Our maximum liability to you for any claim arising out of or relating to these terms or our services shall not exceed the total amount you paid for the specific order giving rise to the claim.`,
  },
  {
    Icon: Scale,
    title: "Governing Law",
    body: `These Terms of Service are governed by and construed in accordance with the laws of the Islamic Republic of Pakistan. Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the courts of Pakistan.

If any provision of these terms is found to be unlawful or unenforceable, the remaining provisions shall remain in full force and effect.`,
  },
  {
    Icon: RefreshCw,
    title: "Changes to These Terms",
    body: `We reserve the right to modify these Terms of Service at any time. When we make material changes, we will update the "Last updated" date at the top of this page.

We encourage you to review these terms periodically. Your continued use of our services after any changes constitutes your acceptance of the updated terms. If you do not agree to the revised terms, please discontinue use of our services and contact us to discuss any open orders.`,
  },
];

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: "rgba(148,163,184,0.75)" }}>
            Please read these terms carefully before using our services. They govern the relationship between you and Pixora.
          </p>
          <p className="text-xs mt-4" style={{ color: "rgba(100,116,139,0.6)" }}>
            Last updated: June 2026
          </p>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="max-w-3xl mx-auto space-y-6">

          {SECTIONS.map(({ Icon, title, body }) => (
            <div key={title} className="rounded-2xl overflow-hidden"
              style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center gap-3 px-6 py-5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.2)" }}>
                  <Icon size={16} style={{ color: "#60a5fa" }} />
                </div>
                <h2 className="font-extrabold text-base" style={{ color: "#f1f5f9" }}>{title}</h2>
              </div>
              <div className="px-6 py-5">
                {body.split("\n\n").map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed mb-3 last:mb-0"
                    style={{ color: "rgba(148,163,184,0.75)", whiteSpace: "pre-line" }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* Questions CTA */}
          <div className="rounded-2xl p-6"
            style={{ background: "linear-gradient(135deg,rgba(37,99,235,0.1),rgba(79,70,229,0.07))", border: "1px solid rgba(37,99,235,0.2)" }}>
            <h2 className="font-extrabold text-base mb-2" style={{ color: "#f1f5f9" }}>Questions About These Terms?</h2>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(203,213,225,0.8)" }}>
              If you have any questions about these Terms of Service or need clarification on any point, please reach out to us before placing an order.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl text-white text-sm transition-all hover:scale-[1.03]"
              style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 16px rgba(37,99,235,0.4)" }}>
              Contact Us
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
