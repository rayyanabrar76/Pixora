export default function Loading() {
  return (
    <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}
      className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "rgba(37,99,235,0.3)", borderTopColor: "#60a5fa" }} />
        <p className="text-sm font-medium" style={{ color: "rgba(148,163,184,0.5)" }}>Loading…</p>
      </div>
    </div>
  );
}
