"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeroMockup from "@/components/HeroMockup";

/* ─── SVG Backgrounds ─────────────────────────────────── */

const Bg1 = () => (
  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="b1bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#030c1e"/>
        <stop offset="100%" stopColor="#0f1f4a"/>
      </linearGradient>
      <filter id="b1glow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="28" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="b1soft" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="40"/>
      </filter>
      <radialGradient id="b1core" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.9"/>
        <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1440" height="620" fill="url(#b1bg)"/>
    {/* Outer diffuse halo */}
    <circle cx="1080" cy="280" r="360" fill="#1d4ed8" fillOpacity="0.18" filter="url(#b1soft)"/>
    {/* Mid glow ring */}
    <circle cx="1080" cy="280" r="240" fill="#2563eb" fillOpacity="0.28" filter="url(#b1glow)"/>
    {/* Core orb */}
    <circle cx="1080" cy="280" r="140" fill="url(#b1core)"/>
    {/* Bright inner */}
    <circle cx="1080" cy="280" r="60" fill="#bfdbfe" fillOpacity="0.55"/>
    {/* Halo ring */}
    <circle cx="1080" cy="280" r="200" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeOpacity="0.3"/>
    <circle cx="1080" cy="280" r="290" fill="none" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.15"/>
    {/* Star field */}
    {[[120,80],[220,150],[80,300],[300,50],[450,120],[550,200],[700,60],[350,400],[600,520],[900,80],[1280,400],[1350,150],[1400,500],[200,500],[750,530]].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r={i%3===0?2:1} fill="white" fillOpacity={0.15+i%4*0.08}/>
    ))}
    {/* Sweep line from orb */}
    <line x1="0" y1="320" x2="880" y2="280" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.12"/>
    <line x1="0" y1="200" x2="880" y2="260" stroke="#60a5fa" strokeWidth="0.5" strokeOpacity="0.1"/>
  </svg>
);

const Bg2 = () => (
  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="b2bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0d0520"/>
        <stop offset="60%" stopColor="#1a0a3d"/>
        <stop offset="100%" stopColor="#0f172a"/>
      </linearGradient>
      <filter id="b2blur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="35"/>
      </filter>
      <filter id="b2node" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <rect width="1440" height="620" fill="url(#b2bg)"/>
    {/* Aurora blobs */}
    <ellipse cx="900" cy="150" rx="450" ry="130" fill="#6d28d9" fillOpacity="0.22" filter="url(#b2blur)"/>
    <ellipse cx="700" cy="400" rx="380" ry="110" fill="#4f46e5" fillOpacity="0.18" filter="url(#b2blur)"/>
    <ellipse cx="1200" cy="500" rx="280" ry="90" fill="#7c3aed" fillOpacity="0.15" filter="url(#b2blur)"/>
    {/* Constellation nodes + lines */}
    {[
      [800,80],[950,160],[1100,100],[1050,260],[900,320],[1150,380],[1000,450],[850,200],
      [1200,240],[1300,150],[1250,350],[700,280],[750,180]
    ].map(([x,y],i,arr)=>(
      <g key={i}>
        {arr.slice(i+1,i+3).map(([x2,y2],j)=>{
          const dist=Math.hypot(x2-x,y2-y);
          return dist<220 ? <line key={j} x1={x} y1={y} x2={x2} y2={y2} stroke="#a78bfa" strokeWidth="0.8" strokeOpacity="0.2"/> : null;
        })}
        <circle cx={x} cy={y} r={i%4===0?5:3} fill="#a78bfa" fillOpacity={0.6} filter="url(#b2node)"/>
        <circle cx={x} cy={y} r={i%4===0?2:1.5} fill="white" fillOpacity={0.8}/>
      </g>
    ))}
  </svg>
);

const Bg3 = () => (
  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="b3bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#020d1f"/>
        <stop offset="100%" stopColor="#0c2a52"/>
      </linearGradient>
      <linearGradient id="b3wave1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0369a1" stopOpacity="0.5"/>
        <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.4"/>
        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3"/>
      </linearGradient>
      <linearGradient id="b3wave2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4"/>
      </linearGradient>
      <filter id="b3glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <rect width="1440" height="620" fill="url(#b3bg)"/>
    {/* Glow sphere top right */}
    <circle cx="1300" cy="80" r="200" fill="#0284c7" fillOpacity="0.12" filter="url(#b3glow)"/>
    {/* Ocean waves — back to front */}
    <path d="M0,500 C180,460 360,540 540,500 C720,460 900,540 1080,500 C1260,460 1380,490 1440,480 L1440,620 L0,620 Z" fill="url(#b3wave1)"/>
    <path d="M0,540 C150,510 330,570 520,540 C710,510 880,570 1060,540 C1240,510 1360,535 1440,520 L1440,620 L0,620 Z" fill="url(#b3wave2)"/>
    <path d="M0,570 C200,545 400,590 620,565 C840,540 1040,590 1200,560 C1310,540 1390,558 1440,550 L1440,620 L0,620 Z" fill="#1e40af" fillOpacity="0.55"/>
    <path d="M0,595 C240,575 480,610 720,590 C960,570 1200,605 1440,585 L1440,620 L0,620 Z" fill="#1e3a8a" fillOpacity="0.8"/>
    {/* Sparkle dots on crests */}
    {[[180,458],[540,458],[900,458],[1260,458],[360,510],[720,510],[1080,510]].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r="2.5" fill="#7dd3fc" fillOpacity="0.6" filter="url(#b3glow)"/>
    ))}
    {/* Star dots */}
    {[[100,60],[300,120],[500,50],[700,100],[200,200],[400,300],[600,240],[1000,200],[1100,80],[800,350]].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r="1.5" fill="white" fillOpacity={0.1+i%5*0.05}/>
    ))}
  </svg>
);

const Bg4 = () => (
  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="b4bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#020617"/>
        <stop offset="100%" stopColor="#0f0a2e"/>
      </linearGradient>
      <filter id="b4aurora" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="45"/>
      </filter>
      <filter id="b4glow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <rect width="1440" height="620" fill="url(#b4bg)"/>
    {/* Aurora layers */}
    <ellipse cx="720" cy="100" rx="600" ry="140" fill="#3b82f6" fillOpacity="0.2" filter="url(#b4aurora)"/>
    <ellipse cx="1000" cy="250" rx="500" ry="120" fill="#8b5cf6" fillOpacity="0.22" filter="url(#b4aurora)"/>
    <ellipse cx="400" cy="300" rx="420" ry="100" fill="#06b6d4" fillOpacity="0.18" filter="url(#b4aurora)"/>
    <ellipse cx="900" cy="450" rx="380" ry="90" fill="#6d28d9" fillOpacity="0.15" filter="url(#b4aurora)"/>
    {/* Geometric diamond shapes */}
    <polygon points="1150,60 1280,190 1150,320 1020,190" fill="none" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.25"/>
    <polygon points="1150,100 1240,190 1150,280 1060,190" fill="none" stroke="#c4b5fd" strokeWidth="0.8" strokeOpacity="0.18"/>
    <polygon points="1150,140 1200,190 1150,240 1100,190" fill="#8b5cf6" fillOpacity="0.15"/>
    {/* Glowing accent dot on diamond center */}
    <circle cx="1150" cy="190" r="8" fill="#c4b5fd" fillOpacity="0.7" filter="url(#b4glow)"/>
    <circle cx="1150" cy="190" r="3" fill="white" fillOpacity="0.9"/>
    {/* Bottom diamond */}
    <polygon points="300,350 420,470 300,590 180,470" fill="none" stroke="#7c3aed" strokeWidth="0.8" strokeOpacity="0.2"/>
    {/* Stars */}
    {[[80,50],[200,100],[400,60],[600,90],[750,40],[950,70],[1050,130],[200,380],[450,420],[650,310],[1350,380],[1400,80]].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r={i%4===0?2:1} fill="white" fillOpacity={0.08+i%5*0.06}/>
    ))}
    {/* Subtle grid lines far right */}
    {[0,1,2,3].map(i=>(
      <line key={i} x1={1100+i*80} y1="0" x2={1100+i*80} y2="620" stroke="#6366f1" strokeWidth="0.5" strokeOpacity="0.08"/>
    ))}
    {[0,1,2,3,4,5].map(i=>(
      <line key={i} x1="1100" y1={i*105} x2="1440" y2={i*105} stroke="#6366f1" strokeWidth="0.5" strokeOpacity="0.08"/>
    ))}
  </svg>
);

/* ─── Slides data ─────────────────────────────────────── */

const SLIDES = [
  {
    Bg: Bg1,
    tag: "Professional Digital Services",
    title: "Grow Your Business",
    highlight: "Online — Fast.",
    sub: "From logos to full websites, SEO to social media — we handle your digital presence so you can focus on what you do best.",
  },
  {
    Bg: Bg2,
    tag: "Digital Marketing Experts",
    title: "Reach More Customers",
    highlight: "With Smart Marketing.",
    sub: "SEO, social media, email automation — we grow your audience with data-driven strategies that deliver real results.",
  },
  {
    Bg: Bg3,
    tag: "Web Development",
    title: "Beautiful Websites",
    highlight: "Built to Convert.",
    sub: "From landing pages to full e-commerce stores — fast, modern websites that turn visitors into paying customers.",
  },
  {
    Bg: Bg4,
    tag: "Brand Identity & Design",
    title: "Stand Out From",
    highlight: "The Competition.",
    sub: "Logos, business cards, social graphics — a consistent brand identity that builds trust and gets remembered.",
  },
];

const STATS = [
  { val: "200+", label: "Clients Served" },
  { val: "5★",   label: "Rated Service"  },
  { val: "Fast", label: "Delivery"       },
  { val: "24/7", label: "Support"        },
];

/* ─── Component ───────────────────────────────────────── */

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback((index: number) => {
    setFading(true);
    setTimeout(() => { setCurrent(index); setFading(false); }, 300);
  }, []);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  const { Bg, tag, title, highlight, sub } = SLIDES[current];

  return (
    <section className="relative h-155 overflow-hidden">

      {/* Backgrounds */}
      {SLIDES.map(({ Bg: B }, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === current ? 1 : 0 }}>
          <B />
        </div>
      ))}

      {/* Content — 2 columns on lg+ */}
      <div
        className="relative h-full max-w-6xl mx-auto px-6 flex items-center gap-8 transition-opacity duration-300"
        style={{ opacity: fading ? 0 : 1 }}
      >
        {/* Left: text */}
        <div className="flex-1 flex flex-col">
          <span className="inline-block bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full mb-4 backdrop-blur-sm w-fit">
            {tag}
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4 text-white">
            {title} <br />
            <span className="text-blue-300">{highlight}</span>
          </h1>
          <p className="text-white/75 text-base leading-relaxed mb-7 max-w-md">{sub}</p>

          <div className="flex flex-wrap gap-4 mb-8">
            <Link href="/shop" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg shadow-blue-900/40">
              Browse Services
            </Link>
            <Link href="/contact" className="border-2 border-white/40 hover:border-white hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Contact Us
            </Link>
          </div>

          <div className="flex gap-8 flex-wrap">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-xl font-extrabold text-white">{s.val}</div>
                <div className="text-xs text-white/55 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: mockup — large screens only */}
        <div className="hidden lg:flex items-center justify-center shrink-0">
          <HeroMockup slide={current} />
        </div>
      </div>

      {/* Arrows — hidden on lg where mockup is visible */}
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 lg:hidden w-9 h-9 bg-white/8 hover:bg-white/18 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center text-white transition-all">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 lg:hidden w-9 h-9 bg-white/8 hover:bg-white/18 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center text-white transition-all">
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 items-center">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? "w-7 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"}`}
          />
        ))}
      </div>

    </section>
  );
}
