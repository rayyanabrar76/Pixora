"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, CheckCircle, TrendingUp, ArrowUpRight, Gauge, Smartphone, Rocket, Palette, Package, FileImage } from "lucide-react";

/* ─── CSS Animations ───────────────────────────────────── */
const ANIM = `
  @keyframes hfloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes hfloat2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
  .hf  { animation: hfloat  5s ease-in-out infinite; }
  .hf2 { animation: hfloat2 4.5s ease-in-out infinite 1s; }
  .hf3 { animation: hfloat2 5.5s ease-in-out infinite 0.5s; }
  .hf4 { animation: hfloat  4s ease-in-out infinite 1.8s; }

  /* cursor moves to 4 click targets, squishes on each click */
  @keyframes cursor-path {
    0%   { transform: translate(46px,64px); }
    6%   { transform: translate(46px,64px) scale(0.72); }
    11%  { transform: translate(46px,64px); }
    28%  { transform: translate(112px,152px); }
    34%  { transform: translate(112px,152px) scale(0.72); }
    39%  { transform: translate(112px,152px); }
    54%  { transform: translate(58px,210px); }
    60%  { transform: translate(58px,210px) scale(0.72); }
    65%  { transform: translate(58px,210px); }
    80%  { transform: translate(168px,112px); }
    86%  { transform: translate(168px,112px) scale(0.72); }
    91%  { transform: translate(168px,112px); }
    100% { transform: translate(46px,64px); }
  }
  .cursor-live { animation: cursor-path 6.5s cubic-bezier(.4,0,.2,1) infinite; pointer-events:none; position:absolute; z-index:50; }

  /* ripple fires at each click moment */
  @keyframes ripple-click {
    0%,5%           { transform:scale(0); opacity:0.7; }
    5%              { transform:scale(0); opacity:0.7; }
    20%             { transform:scale(3.5); opacity:0; }
    100%            { transform:scale(3.5); opacity:0; }
  }
  .ripple-1 { animation: ripple-click 6.5s linear infinite 0s; }
  .ripple-2 { animation: ripple-click 6.5s linear infinite 2.16s; }
  .ripple-3 { animation: ripple-click 6.5s linear infinite 4.16s; }
  .ripple-4 { animation: ripple-click 6.5s linear infinite 5.85s; }

  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  .blink { animation: blink 0.9s step-end infinite; }

  /* bars bounce up/down like live data */
  @keyframes bar-live { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.3)} }
  .bl1 { animation: bar-live 0.85s ease-in-out infinite 0s;    transform-origin:bottom; }
  .bl2 { animation: bar-live 0.85s ease-in-out infinite 0.12s; transform-origin:bottom; }
  .bl3 { animation: bar-live 0.85s ease-in-out infinite 0.24s; transform-origin:bottom; }
  .bl4 { animation: bar-live 0.85s ease-in-out infinite 0.36s; transform-origin:bottom; }
  .bl5 { animation: bar-live 0.85s ease-in-out infinite 0.48s; transform-origin:bottom; }
  .bl6 { animation: bar-live 1.1s  ease-in-out infinite 0.1s;  transform-origin:bottom; }
  .bl7 { animation: bar-live 1.1s  ease-in-out infinite 0.3s;  transform-origin:bottom; }
  .bl8 { animation: bar-live 1.1s  ease-in-out infinite 0.55s; transform-origin:bottom; }

  /* row highlight sweeps through list */
  @keyframes row-hl { 0%,100%{background:transparent} 50%{background:rgba(59,130,246,0.14)} }
  .rl1 { animation: row-hl 2.1s ease-in-out infinite 0s; }
  .rl2 { animation: row-hl 2.1s ease-in-out infinite 0.7s; }
  .rl3 { animation: row-hl 2.1s ease-in-out infinite 1.4s; }

  /* ping — CTA button press */
  @keyframes ping-btn {
    0%  { box-shadow: 0 0 0 0 rgba(37,99,235,0.7); }
    70% { box-shadow: 0 0 0 8px rgba(37,99,235,0); }
    100%{ box-shadow: 0 0 0 0 rgba(37,99,235,0); }
  }
  .ping-btn { animation: ping-btn 1.4s ease-out infinite; }

  /* progress bar fill — loops */
  @keyframes prog-fill { 0%{width:0%} 80%{width:74%} 100%{width:74%} }
  .prog-fill { animation: prog-fill 3s ease-out infinite; }

  /* slide in new lines in terminal */
  @keyframes slide-in { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
  .slide-in-1 { animation: slide-in 0.4s ease-out forwards; }
  .slide-in-2 { animation: slide-in 0.4s ease-out 0.6s both; }
  .slide-in-3 { animation: slide-in 0.4s ease-out 1.2s both; }

  /* number-pop when a stat updates */
  @keyframes numflash { 0%{color:#34d399;transform:scale(1.2)} 100%{color:inherit;transform:scale(1)} }
  .numflash { animation: numflash 0.4s ease-out; }

  /* selection box moving on canvas */
  @keyframes sel-move {
    0%,100% { transform:translate(0,0); }
    33%     { transform:translate(12px,-8px); }
    66%     { transform:translate(-6px,10px); }
  }
  .sel-move { animation: sel-move 3.5s ease-in-out infinite; }

  /* typing text reveal */
  @keyframes type-reveal { from{width:0} to{width:100%} }
  .type-line { overflow:hidden; white-space:nowrap; animation: type-reveal 1.8s steps(20,end) infinite alternate; }
`;

/* ─── Live cursor with ripple ──────────────────────────── */
function LiveCursor() {
  return (
    <div className="cursor-live">
      {/* Ripple rings at each click position (attached to cursor) */}
      <div style={{ position:"absolute", width:16, height:16, borderRadius:"50%",
        border:"2px solid rgba(59,130,246,0.9)", top:1, left:1 }}
        className="ripple-1" />
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" style={{ filter:"drop-shadow(0 1px 3px rgba(0,0,0,0.6))" }}>
        <path d="M2 1L2 16L6 12.5L8.5 18.5L10.5 17.5L8 11.5L13.5 11.5Z" fill="white" stroke="#0f172a" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

/* ─── FloatCard ────────────────────────────────────────── */
function FloatCard({ cls, icon: Icon, iconBg, title, sub, subColor="text-gray-400" }: {
  cls:string; icon:React.ElementType; iconBg:string;
  title:string; sub:string; subColor?:string;
}) {
  return (
    <div className={`${cls} absolute z-20 bg-white rounded-2xl px-3 py-2.5 shadow-xl border border-gray-100/80 flex items-center gap-2.5 w-43`}>
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon size={15}/>
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-extrabold text-gray-900 leading-tight truncate">{title}</div>
        <div className={`text-[9px] font-semibold ${subColor}`}>{sub}</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SLIDE 0 — Website preview + live cursor
══════════════════════════════════════════════════════ */
function Mock0() {
  const [clicks, setClicks] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setClicks(c => c + 1), 6500);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Browser */}
      <div className="hf relative z-10 w-85 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10">

        {/* Live cursor inside browser */}
        <LiveCursor />

        {/* Chrome bar */}
        <div className="bg-[#1a1a2e] flex items-center gap-2.5 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] block"/>
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] block"/>
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] block"/>
          </div>
          <div className="flex-1 bg-[#2c2c44] rounded-md px-3 py-1 text-[10px] text-white/35 font-mono text-center flex items-center justify-center gap-1">
            <span className="text-white/25">yourclient.com</span>
            <span className="blink text-blue-400/70 text-[11px] leading-none">|</span>
          </div>
        </div>

        {/* Page content */}
        <div className="bg-white">
          {/* Nav */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-blue-600 rounded"/>
              <div className="w-12 h-2 bg-gray-700 rounded"/>
            </div>
            <div className="flex gap-2">
              {[7,9,7,16].map((w,i) => (
                <div key={i} className={`h-1.5 rounded transition-all duration-300 ${clicks%4===i?"bg-blue-400":"bg-gray-200"}`} style={{width:w}}/>
              ))}
            </div>
          </div>

          {/* Hero */}
          <div className="px-4 py-5" style={{background:"linear-gradient(135deg,#1e3a8a,#4f46e5)"}}>
            <div className="w-20 h-2 rounded-full bg-blue-300/40 mb-2.5"/>
            <div className="w-40 h-3.5 rounded bg-white/70 mb-1.5"/>
            <div className="type-line w-32 h-3.5 rounded bg-white/45 mb-4"/>
            <div className="flex gap-2">
              <div className="ping-btn w-16 h-5 rounded bg-blue-400 cursor-pointer"/>
              <div className="w-16 h-5 rounded border border-white/30 bg-white/10"/>
            </div>
          </div>

          {/* Cards */}
          <div className="px-3 pt-3 pb-2 bg-gray-50">
            <div className="w-24 h-2 bg-gray-300 rounded mx-auto mb-3"/>
            <div className="grid grid-cols-3 gap-2">
              {[{bg:"bg-blue-500"},{bg:"bg-violet-500"},{bg:"bg-teal-500"}].map((c,i) => (
                <div key={i} className={`bg-white rounded-lg p-2 shadow-sm transition-all duration-300 ${clicks%3===i?"ring-1 ring-blue-400 scale-105":""}`}>
                  <div className={`${c.bg} w-5 h-5 rounded mb-1.5 opacity-80`}/>
                  <div className="w-full h-1.5 bg-gray-200 rounded mb-1"/>
                  <div className="w-2/3 h-1.5 bg-gray-100 rounded"/>
                </div>
              ))}
            </div>
          </div>

          {/* Live bar chart */}
          <div className="px-3 pb-2 bg-white border-t border-gray-100 pt-2">
            <div className="flex items-end gap-1 h-8 justify-center">
              {[3,6,4,8,5,10,7,12].map((h,i) => (
                <div key={i} className={`w-3 rounded-t ${i>=6?"bl7 bl8":["bl1","bl2","bl3","bl4","bl5","bl6"][i]}`}
                  style={{height:h*2.5, background:i>=6?"#3b82f6":"#bfdbfe"}}/>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-around py-2.5 border-t border-gray-100">
            {[["200+","Clients"],["5★","Rating"],["24h","Delivery"]].map(([v,l]) => (
              <div key={l} className="text-center">
                <div className="text-[10px] font-extrabold text-gray-800">{v}</div>
                <div className="text-[7px] text-gray-400 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Float: Rating */}
      <div className="hf2 absolute top-2 right-0 z-20 bg-white rounded-2xl px-3 py-2 shadow-xl border border-gray-100/80 flex items-center gap-2">
        <div className="w-8 h-8 bg-yellow-50 rounded-xl flex items-center justify-center shrink-0">
          <Star size={15} className="text-yellow-400 fill-yellow-400"/>
        </div>
        <div>
          <div className="text-[12px] font-extrabold text-gray-900">4.9 / 5.0</div>
          <div className="text-[9px] text-gray-400">Client Rating</div>
        </div>
      </div>

      <FloatCard cls="hf3 bottom-2 -left-2" icon={CheckCircle} iconBg="bg-green-50 text-green-500" title="Logo Design" sub="Delivered in 24h" subColor="text-green-600"/>

      {/* Float: SEO with live bars */}
      <div className="hf4 absolute top-1/2 -right-2 z-20 -translate-y-1/2 bg-white rounded-2xl px-3 py-2.5 shadow-xl border border-gray-100/80">
        <div className="flex items-center gap-1 mb-1">
          <TrendingUp size={11} className="text-blue-500"/>
          <span className="text-[9px] text-gray-400">SEO Traffic</span>
        </div>
        <div className="flex items-end gap-1 mb-1.5">
          <span className="text-sm font-extrabold text-blue-600">+127%</span>
          <ArrowUpRight size={12} className="text-green-500 mb-0.5"/>
        </div>
        <div className="flex items-end gap-0.5 h-5">
          {[2,3,2,5,4,6,5,8,7,10].map((h,i) => (
            <div key={i} className={i>=6?"bl6":i>=4?"bl4":"bl2"} style={{width:6,height:h*2,borderRadius:2,background:i>=7?"#3b82f6":"#bfdbfe"}}/>
          ))}
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════
   SLIDE 1 — Marketing analytics dashboard (live)
══════════════════════════════════════════════════════ */
function Mock1() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % 10), 800);
    return () => clearInterval(id);
  }, []);

  const reach  = (12400 + tick * 37).toLocaleString();
  const clicks = (3200  + tick * 12).toLocaleString();
  const conv   = (847   + tick * 3).toLocaleString();

  const platforms = [
    { label:"Instagram", color:"#e1306c", gain:"+1.2k" },
    { label:"Facebook",  color:"#1877f2", gain:"+0.8k" },
    { label:"Google Ads",color:"#fbbc05", gain:"+2.1k" },
  ];

  return (
    <>
      <div className="hf relative z-10 w-85 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10">

        {/* Header */}
        <div className="bg-[#0f172a] px-4 py-3 flex items-center justify-between">
          <span className="text-white text-xs font-bold tracking-wide">Marketing Dashboard</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 block animate-pulse"/>
            <span className="text-[9px] text-green-400 font-mono">LIVE</span>
          </div>
        </div>

        {/* KPI row — numbers tick up */}
        <div className="grid grid-cols-3 bg-[#1e293b]">
          {[[reach,"Reach","↑18%"],[clicks,"Clicks","↑24%"],[conv,"Conv.","↑12%"]].map(([v,l,d],i) => (
            <div key={i} className={`px-3 py-3 ${i<2?"border-r border-white/5":""}`}>
              <div className="text-white text-sm font-extrabold tabular-nums" key={`${v}`}>{v}</div>
              <div className="text-[9px] text-white/40 mt-0.5">{l}</div>
              <div className="text-[9px] text-green-400 font-semibold mt-1">{d}</div>
            </div>
          ))}
        </div>

        {/* Bar chart — live bounce */}
        <div className="bg-[#0f172a] px-4 py-3">
          <div className="text-[9px] text-white/40 mb-2.5 font-medium">Weekly Engagement</div>
          <div className="flex items-end gap-1.5 h-14">
            {[5,8,6,11,9,14,12,16].map((h,i) => (
              <div key={i} className={`flex-1 rounded-sm ${["bl1","bl2","bl3","bl4","bl5","bl6","bl7","bl8"][i]}`}
                style={{height:h*3.5, background:i>=6?"#3b82f6":"#1e3a8a"}}/>
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            {["M","T","W","T","F","S","S","T"].map((d,i) => (
              <span key={i} className="flex-1 text-center text-[7px] text-white/25">{d}</span>
            ))}
          </div>
        </div>

        {/* Platform list — rows highlight in sequence */}
        <div className="bg-[#0d1525] px-4 py-3 space-y-1.5">
          {platforms.map((p,i) => (
            <div key={p.label} className={`flex items-center gap-2.5 px-2 py-1 rounded-lg ${["rl1","rl2","rl3"][i]}`}>
              <div className="w-5 h-5 rounded-md shrink-0" style={{background:p.color+"22",border:`1px solid ${p.color}44`}}>
                <div className="w-2 h-2 rounded-sm m-1.5" style={{background:p.color}}/>
              </div>
              <span className="flex-1 text-[10px] text-white/60">{p.label}</span>
              <span className="text-[10px] font-bold text-green-400">{p.gain}</span>
              <ArrowUpRight size={10} className="text-green-400"/>
            </div>
          ))}
        </div>
      </div>

      <FloatCard cls="hf2 top-2 right-0"  icon={TrendingUp}  iconBg="bg-blue-50 text-blue-500"  title="+2.4k Followers" sub="This week"    subColor="text-blue-500"/>
      <FloatCard cls="hf3 bottom-2 -left-2" icon={CheckCircle} iconBg="bg-green-50 text-green-500" title="Email Campaign"  sub="87% Open Rate" subColor="text-green-600"/>
      <div className="hf4 absolute top-1/2 -right-2 z-20 -translate-y-1/2 bg-white rounded-2xl px-3 py-2.5 shadow-xl border border-gray-100/80">
        <div className="text-[9px] text-gray-400 mb-0.5">Click-Through Rate</div>
        <div className="text-sm font-extrabold text-violet-600 mb-1.5">CTR +34%</div>
        <div className="flex items-end gap-0.5 h-5">
          {[3,5,4,7,6,9,8,11].map((h,i) => (
            <div key={i} className={i%2===0?"bl2":"bl5"} style={{width:6,height:h*1.8,borderRadius:2,background:i>=6?"#7c3aed":"#ddd6fe"}}/>
          ))}
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════
   SLIDE 2 — Code editor + live compile
══════════════════════════════════════════════════════ */
function Mock2() {
  const [lineIdx, setLineIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setLineIdx(i => (i + 1) % 5), 1200);
    return () => clearInterval(id);
  }, []);

  const lines = [
    { t:"keyword", s:"export default " },{ t:"fn", s:"function " },{ t:"name", s:"Hero() {" },
    { t:"kw2",  s:"  return (" },
    { t:"tag",  s:"    <section" },
    { t:"attr", s:'      className=' },{ t:"str", s:'"hero-wrap"' },
    { t:"tag",  s:"    >" },
    { t:"tag",  s:"      <h1>" },{ t:"white", s:"        Grow" },{ t:"tag", s:"      </h1>" },
    { t:"tag",  s:"      <Button />" },
    { t:"tag",  s:"    </section>" },
    { t:"kw2",  s:"  )" },
    { t:"name",  s:"}" },
  ];
  const colors: Record<string,string> = {
    keyword:"#ff7b72", fn:"#79c0ff", name:"#ffa657",
    kw2:"#79c0ff", tag:"#7ee787", attr:"#cae8ff",
    str:"#a5d6ff", white:"#e6edf3",
  };

  const termLines = [
    "▶  Building... (Turbopack)",
    "✓  Compiled in 312ms",
    "✓  Ready on localhost:3000",
    "◉  Hot reload active",
    "✓  Module updated (Hero.tsx)",
  ];

  return (
    <>
      <div className="hf relative z-10 w-85 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10">

        {/* Title bar */}
        <div className="bg-[#1a1a2e] flex items-center gap-2.5 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] block"/>
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] block"/>
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] block"/>
          </div>
          <div className="flex gap-3 ml-2">
            {["Hero.tsx","styles.css"].map((f,i) => (
              <span key={f} className={`text-[10px] px-2 py-0.5 rounded ${i===0?"bg-[#2c2c44] text-white/70":"text-white/30"} font-mono`}>{f}</span>
            ))}
          </div>
        </div>

        {/* Split pane */}
        <div className="flex" style={{height:225}}>
          {/* Code editor */}
          <div className="flex-1 bg-[#0d1117] overflow-hidden py-2">
            {lines.map((l,i) => (
              <div key={i} className={`flex text-[8.5px] font-mono leading-[1.55] px-1 rounded-sm mx-1 transition-colors ${i===lineIdx?"bg-blue-500/10":""}`}>
                <span className="w-5 text-right text-white/15 mr-2 shrink-0">{i+1}</span>
                <span style={{color:colors[l.t]??"#e6edf3"}}>{l.s}</span>
                {i===lineIdx && <span className="blink inline-block w-0.5 h-2.5 bg-blue-400 ml-0.5 mt-0.5"/>}
              </div>
            ))}
          </div>

          {/* Live preview */}
          <div className="w-34 flex flex-col overflow-hidden border-l border-white/5">
            <div className="bg-[#1c1c2e] px-2 py-1 text-[8px] text-white/30 font-mono border-b border-white/5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
              Preview
            </div>
            <div className="flex-1 overflow-hidden" style={{background:"linear-gradient(135deg,#1e3a8a,#4f46e5)"}}>
              <div className="h-4 bg-white/10 flex items-center px-2 gap-1">
                <div className="w-2 h-1 bg-blue-300/50 rounded"/>
                <div className="w-8 h-1 bg-white/20 rounded"/>
              </div>
              <div className="p-2.5">
                <div className="w-16 h-2 bg-blue-300/40 rounded mb-2"/>
                <div className="w-20 h-3 bg-white/70 rounded mb-1.5"/>
                <div className="type-line w-16 h-2.5 bg-white/40 rounded mb-3"/>
                <div className="ping-btn w-12 h-5 bg-blue-400 rounded text-[7px] text-white flex items-center justify-center font-bold">GET STARTED</div>
              </div>
              <div className="mx-2 grid grid-cols-2 gap-1">
                {[...Array(4)].map((_,i) => <div key={i} className="bg-white/10 rounded h-7"/>)}
              </div>
            </div>
          </div>
        </div>

        {/* Terminal — cycles through lines */}
        <div className="bg-[#030712] px-3 py-1.5 border-t border-white/5">
          <div key={lineIdx} className="flex items-center gap-2 slide-in-1">
            <span className="w-2 h-2 rounded-full bg-green-400 shrink-0"/>
            <span className="text-[9px] text-green-400 font-mono">{termLines[lineIdx % termLines.length]}</span>
          </div>
        </div>
      </div>

      <div className="hf2 absolute top-2 right-0 z-20 bg-white rounded-2xl px-3 py-2 shadow-xl border border-gray-100/80 flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
          <Gauge size={15} className="text-blue-600"/>
        </div>
        <div>
          <div className="text-[12px] font-extrabold text-gray-900">98 / 100</div>
          <div className="text-[9px] text-gray-400">Lighthouse Score</div>
        </div>
      </div>
      <FloatCard cls="hf3 bottom-2 -left-2"         icon={Smartphone} iconBg="bg-purple-50 text-purple-500" title="Mobile Ready"   sub="All screen sizes"  subColor="text-purple-500"/>
      <FloatCard cls="hf4 top-1/2 -right-2 -translate-y-1/2" icon={Rocket} iconBg="bg-green-50 text-green-500"  title="Deployed Live"  sub="Production build" subColor="text-green-600"/>
    </>
  );
}

/* ══════════════════════════════════════════════════════
   SLIDE 3 — Brand design canvas (Figma-style)
══════════════════════════════════════════════════════ */
function Mock3() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % 6), 700);
    return () => clearInterval(id);
  }, []);

  const palette = ["#0f172a","#1d4ed8","#3b82f6","#93c5fd","#f8fafc","#64748b"];

  return (
    <>
      <div className="hf relative z-10 w-85 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10">

        {/* App chrome */}
        <div className="bg-[#1c1c1c] flex items-center gap-2.5 px-3 py-2.5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] block"/>
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] block"/>
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] block"/>
          </div>
          <div className="flex-1 flex justify-center gap-4">
            {["File","Edit","View","Plugins"].map(m => (
              <span key={m} className="text-[10px] text-white/40">{m}</span>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-[#2c2c2c] px-3 py-1.5 flex items-center gap-1.5 border-b border-black/30">
          {[0,1,2,3,4].map(i => (
            <div key={i} className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${active%5===i?"bg-blue-600":""}`}>
              <div className="w-3 h-3 bg-white/25 rounded-sm"/>
            </div>
          ))}
          <div className="flex-1"/>
          {/* Export progress */}
          <div className="flex items-center gap-1.5">
            <div className="w-16 h-1.5 bg-black/30 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full prog-fill"/>
            </div>
            <div className="bg-blue-600 rounded px-2 py-0.5 text-[9px] text-white font-bold ping-btn">Export</div>
          </div>
        </div>

        {/* Canvas */}
        <div className="bg-[#333] relative flex items-center justify-center" style={{height:155}}>
          <div className="absolute inset-0 opacity-10"
            style={{backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",backgroundSize:"20px 20px"}}/>

          {/* Moving selection box */}
          <div className="sel-move absolute z-20 border-2 border-blue-400 rounded pointer-events-none"
            style={{width:60,height:60,top:"50%",left:"30%",transform:"translate(-50%,-50%)",
              boxShadow:"0 0 0 1px rgba(59,130,246,0.3)",
              background:"rgba(59,130,246,0.06)"}}>
            {[[-3,-3],[-3,63],[63,-3],[63,63]].map(([tx,ty],i) => (
              <div key={i} className="absolute w-2 h-2 bg-blue-400 rounded-sm" style={{left:tx,top:ty}}/>
            ))}
          </div>

          {/* Business card */}
          <div className="relative z-10 shadow-2xl rounded-lg overflow-hidden flex" style={{width:220,height:115}}>
            <div className="flex-1 bg-[#0f172a] flex flex-col items-center justify-center gap-1 p-3">
              <Image src="/logo_transparent.png" alt="logo" width={32} height={32} style={{ objectFit: "contain" }} />
              <div style={{ fontFamily: "var(--font-brand, sans-serif)", fontWeight: 900, color: "#0097B2", fontSize: "5.5px", letterSpacing: "0.5px", lineHeight: 1, textAlign: "center" }}>FAHADAMINAENTERPRISES</div>
            </div>
            <div className="w-22.5 bg-[#1d4ed8] flex flex-col justify-between p-2.5">
              <div className="w-full h-1.5 bg-white/30 rounded"/>
              <div>
                <div className="w-3/4 h-1 bg-white/20 rounded mb-1"/>
                <div className="w-full h-1 bg-white/20 rounded mb-1"/>
                <div className="w-2/3 h-1 bg-white/20 rounded"/>
              </div>
              <div className="w-full h-1.5 bg-white/30 rounded"/>
            </div>
          </div>
        </div>

        {/* Palette row — highlight active swatch */}
        <div className="bg-[#1c1c1c] px-3 py-2.5 flex items-center gap-2 border-t border-black/30">
          <span className="text-[9px] text-white/35 mr-1">Colors</span>
          {palette.map((c,i) => (
            <div key={c} className={`w-5 h-5 rounded-full border-2 shrink-0 transition-all duration-300 ${active%6===i?"border-white scale-125 shadow-lg":"border-white/10"}`}
              style={{background:c}}/>
          ))}
        </div>

        {/* Type row */}
        <div className="bg-[#181818] px-3 py-2 border-t border-black/20 flex items-center justify-between">
          <div>
            <span className="text-lg font-extrabold text-white/70" style={{fontFamily:"sans-serif"}}>Aa</span>
            <div className="text-[8px] text-white/25 mt-0.5">Inter — Bold / Regular</div>
          </div>
          <div className="flex gap-1">
            {["B","I","U"].map((s,i) => (
              <div key={s} className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold transition-colors ${active%3===i?"bg-blue-600 text-white":"bg-white/10 text-white/40"}`}>{s}</div>
            ))}
          </div>
        </div>
      </div>

      <FloatCard cls="hf2 top-2 right-0"  icon={Package}   iconBg="bg-blue-50 text-blue-600"   title="Brand Kit Ready"  sub="All assets exported" subColor="text-blue-500"/>
      <FloatCard cls="hf3 bottom-2 -left-2" icon={FileImage} iconBg="bg-violet-50 text-violet-500" title="3 Logo Formats"   sub="SVG · PNG · PDF"   subColor="text-violet-500"/>
      <FloatCard cls="hf4 top-1/2 -right-2 -translate-y-1/2" icon={Palette} iconBg="bg-pink-50 text-pink-500" title="Style Guide" sub="Fonts + Colors" subColor="text-pink-500"/>
    </>
  );
}

/* ══════════════════════════════════════════════════════
   Main export
══════════════════════════════════════════════════════ */
const MOCKS = [Mock1, Mock0, Mock2, Mock3];

export default function HeroMockup({ slide }: { slide: number }) {
  const Mock = MOCKS[slide] ?? Mock0;
  return (
    <div className="relative py-8 px-8" style={{zoom: 1.2}}>
      <style>{ANIM}</style>
      <Mock />
    </div>
  );
}
