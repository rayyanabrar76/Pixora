import { Zap, CircleDollarSign, RefreshCw, Headphones } from "lucide-react";

const REASONS = [
  { Icon: Zap,              title: "Fast Delivery",      desc: "Most services delivered within 24–72 hours" },
  { Icon: CircleDollarSign, title: "Affordable Pricing", desc: "Professional quality at Pakistani market rates" },
  { Icon: RefreshCw,        title: "Free Revisions",      desc: "Not happy? We'll redo it until you are" },
  { Icon: Headphones,       title: "24/7 Support",       desc: "Always reachable via phone or email" },
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-linear-to-br from-[#0a0f1a] to-blue-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white mb-2">Why Choose Us?</h2>
          <p className="text-white/60">We deliver real results, not just promises</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS.map((r) => (
            <div key={r.title}
              className="border border-white/10 rounded-xl p-7 text-center hover:bg-white/10 transition-colors"
              style={{ background: "rgba(255,255,255,0.06)" }}>
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-400/20 mx-auto mb-5">
                <r.Icon size={26} className="text-blue-300" />
              </div>
              <h4 className="text-white font-bold text-base mb-2">{r.title}</h4>
              <p className="text-white/60 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
