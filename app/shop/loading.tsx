export default function ShopLoading() {
  return (
    <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}>
      <style>{`
        .sk { background: linear-gradient(90deg,rgba(255,255,255,0.05) 25%,rgba(255,255,255,0.1) 50%,rgba(255,255,255,0.05) 75%); background-size:200% 100%; animation:shimmer 1.4s infinite; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      `}</style>

      {/* Hero area */}
      <div className="pt-16 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="sk h-5 w-28 rounded-full mb-5" />
          <div className="sk h-12 w-72 rounded-xl mb-4" />
          <div className="sk h-5 w-96 rounded-lg" />
        </div>
      </div>

      {/* Filter bar */}
      <div className="px-4 pb-8">
        <div className="max-w-6xl mx-auto flex gap-2">
          {[80,100,90,110,95].map((w,i) => (
            <div key={i} className="sk h-8 rounded-full" style={{width: w}} />
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({length:6}).map((_,i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{background:"#0b1120",border:"1px solid rgba(255,255,255,0.07)"}}>
              <div className="sk h-52" />
              <div className="p-6">
                <div className="sk h-3 w-20 rounded-full mb-3" />
                <div className="sk h-6 w-3/4 rounded-lg mb-2" />
                <div className="sk h-4 w-full rounded mb-1" />
                <div className="sk h-4 w-2/3 rounded mb-6" />
                <div className="flex justify-between items-center">
                  <div className="sk h-7 w-24 rounded-lg" />
                  <div className="sk h-9 w-28 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
