export default function ServiceLoading() {
  return (
    <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}>
      <style>{`
        .sk { background: linear-gradient(90deg,rgba(255,255,255,0.05) 25%,rgba(255,255,255,0.1) 50%,rgba(255,255,255,0.05) 75%); background-size:200% 100%; animation:shimmer 1.4s infinite; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Back link */}
        <div className="sk h-4 w-24 rounded mb-10" />

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 mb-20">
          {/* Banner skeleton */}
          <div className="sm:col-span-3 rounded-2xl sk" style={{height:"clamp(180px,45vw,420px)"}} />

          {/* Details skeleton */}
          <div className="sm:col-span-2 rounded-2xl p-8" style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)"}}>
            <div className="sk h-5 w-24 rounded-full mb-5" />
            <div className="sk h-9 w-full rounded-xl mb-2" />
            <div className="sk h-9 w-3/4 rounded-xl mb-5" />
            <div className="sk h-4 w-full rounded mb-2" />
            <div className="sk h-4 w-5/6 rounded mb-1" />
            <div className="sk h-4 w-4/5 rounded mb-8" />
            <div className="sk h-px w-full mb-6" />
            <div className="sk h-3 w-28 rounded mb-4" />
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center gap-3 mb-3">
                <div className="sk w-4 h-4 rounded-full shrink-0" />
                <div className="sk h-4 rounded flex-1" />
              </div>
            ))}
            <div className="mt-8 pt-6 flex justify-between items-center" style={{borderTop:"1px solid rgba(255,255,255,0.07)"}}>
              <div className="sk h-9 w-28 rounded-lg" />
              <div className="sk h-11 w-36 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
