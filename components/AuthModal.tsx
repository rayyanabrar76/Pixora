"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { X, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { PMark } from "@/components/Logo";

type Props = { onClose: () => void };
type View = "login" | "register" | "verify";

const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#e2e8f0",
  caretColor: "#60a5fa",
};
const inputFocusStyle = {
  border: "1px solid rgba(37,99,235,0.6)",
  boxShadow: "0 0 0 3px rgba(37,99,235,0.12)",
};

export default function AuthModal({ onClose }: Props) {
  const [view, setView] = useState<View>("login");

  const [loginEmail,    setLoginEmail]    = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError,    setLoginError]    = useState("");
  const [loginLoading,  setLoginLoading]  = useState(false);

  const [regEmail,    setRegEmail]    = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regError,    setRegError]    = useState("");
  const [regLoading,  setRegLoading]  = useState(false);

  const [code,          setCode]          = useState("");
  const [verifyError,   setVerifyError]   = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);

  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signIn) return;
    setLoginLoading(true); setLoginError("");
    const { error } = await signIn.password({ emailAddress: loginEmail, password: loginPassword });
    if (error) { setLoginError(error.message ?? "Invalid email or password."); setLoginLoading(false); return; }
    if (signIn.status === "complete") { await signIn.finalize(); onClose(); }
    setLoginLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUp) return;
    setRegLoading(true); setRegError("");
    const { error } = await signUp.password({ emailAddress: regEmail, password: regPassword });
    if (error) { setRegError(error.message ?? "Registration failed."); setRegLoading(false); return; }
    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) { setRegError(sendError.message ?? "Could not send code."); setRegLoading(false); return; }
    setRegLoading(false); setView("verify");
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUp) return;
    setVerifyLoading(true); setVerifyError("");
    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) { setVerifyError(error.message ?? "Incorrect code."); setVerifyLoading(false); return; }
    if (signUp.status === "complete") { await signUp.finalize(); onClose(); }
    setVerifyLoading(false);
  };

  return createPortal(
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      {/* Backdrop — absolute so it doesn't affect flex centering */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(2,6,18,0.85)", backdropFilter: "blur(10px)" }} onClick={onClose} />

      {/* Modal — flex child, naturally centered */}
      <div style={{ position: "relative", width: "100%", maxWidth: "32rem", zIndex: 1 }}>
      <div className="relative w-full rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg,#0d1525 0%,#0a1020 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(37,99,235,0.1)",
        }}>

        {/* Top accent */}
        <div className="h-px w-full" style={{ background: "linear-gradient(to right,transparent,rgba(37,99,235,0.6),rgba(79,70,229,0.4),transparent)" }} />

        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-xl flex items-center justify-center transition-all"
          style={{ background: "rgba(255,255,255,0.07)", color: "rgba(148,163,184,0.8)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.8)"; }}>
          <X size={15} />
        </button>

        {view === "verify" ? (
          /* ── Verify ── */
          <div className="px-8 py-10 text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.25)" }}>
              <ShieldCheck size={26} style={{ color: "#60a5fa" }} />
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-2">Verify your email</h2>
            <p className="text-sm mb-8" style={{ color: "rgba(148,163,184,0.7)" }}>
              We sent a 6-digit code to <span className="text-white font-semibold">{regEmail}</span>
            </p>
            <form onSubmit={handleVerify} className="space-y-4">
              <input value={code} onChange={(e) => setCode(e.target.value)}
                placeholder="000000" maxLength={6} required
                className="w-full py-4 rounded-xl text-center text-2xl font-bold tracking-[0.5em] outline-none transition-all"
                style={inputStyle}
                onFocus={e => Object.assign((e.target as HTMLElement).style, inputFocusStyle)}
                onBlur={e => Object.assign((e.target as HTMLElement).style, { border: "1px solid rgba(255,255,255,0.1)", boxShadow: "none" })} />
              {verifyError && <p className="text-red-400 text-sm">{verifyError}</p>}
              <button type="submit" disabled={verifyLoading}
                className="w-full font-bold py-3 rounded-xl text-sm text-white transition-all hover:scale-[1.02] disabled:opacity-50"
                style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}>
                {verifyLoading ? "Verifying…" : "Confirm Code"}
              </button>
              <button type="button" onClick={() => setView("register")}
                className="text-sm transition-colors" style={{ color: "rgba(100,116,139,0.8)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#60a5fa"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(100,116,139,0.8)"}>
                ← Back
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8">
            {/* Logo + heading */}
            <div className="flex items-center gap-3 mb-7">
              <PMark size={38} />
              <div>
                <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "rgba(100,116,139,0.7)" }}>Welcome to</p>
                <span className="text-xl font-extrabold tracking-tight">
                  <span className="text-white">Pix</span><span className="text-blue-400">ora</span>
                </span>
              </div>
            </div>

            {/* Tab switcher */}
            <div className="flex rounded-xl p-1 mb-7" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {(["login", "register"] as View[]).map((v) => (
                <button key={v} onClick={() => setView(v)}
                  className="flex-1 py-2 rounded-lg text-sm font-bold transition-all capitalize"
                  style={view === v ? {
                    background: "linear-gradient(135deg,#2563eb,#4f46e5)",
                    color: "#fff",
                    boxShadow: "0 2px 12px rgba(37,99,235,0.4)",
                  } : {
                    color: "rgba(148,163,184,0.6)",
                  }}>
                  {v === "login" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            {view === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(148,163,184,0.7)" }}>Email</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(100,116,139,0.6)" }} />
                    <input type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl outline-none transition-all"
                      style={inputStyle}
                      onFocus={e => Object.assign((e.target as HTMLElement).style, inputFocusStyle)}
                      onBlur={e => Object.assign((e.target as HTMLElement).style, { border: "1px solid rgba(255,255,255,0.1)", boxShadow: "none" })} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(148,163,184,0.7)" }}>Password</label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(100,116,139,0.6)" }} />
                    <input type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl outline-none transition-all"
                      style={inputStyle}
                      onFocus={e => Object.assign((e.target as HTMLElement).style, inputFocusStyle)}
                      onBlur={e => Object.assign((e.target as HTMLElement).style, { border: "1px solid rgba(255,255,255,0.1)", boxShadow: "none" })} />
                  </div>
                </div>
                {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
                <button type="submit" disabled={loginLoading}
                  className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm text-white transition-all hover:scale-[1.02] disabled:opacity-50 mt-2"
                  style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}>
                  {loginLoading ? "Signing in…" : <><span>Sign In</span><ArrowRight size={15} /></>}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(148,163,184,0.7)" }}>Email</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(100,116,139,0.6)" }} />
                    <input type="email" required value={regEmail} onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl outline-none transition-all"
                      style={inputStyle}
                      onFocus={e => Object.assign((e.target as HTMLElement).style, inputFocusStyle)}
                      onBlur={e => Object.assign((e.target as HTMLElement).style, { border: "1px solid rgba(255,255,255,0.1)", boxShadow: "none" })} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(148,163,184,0.7)" }}>Password</label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(100,116,139,0.6)" }} />
                    <input type="password" required value={regPassword} onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl outline-none transition-all"
                      style={inputStyle}
                      onFocus={e => Object.assign((e.target as HTMLElement).style, inputFocusStyle)}
                      onBlur={e => Object.assign((e.target as HTMLElement).style, { border: "1px solid rgba(255,255,255,0.1)", boxShadow: "none" })} />
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(100,116,139,0.6)" }}>
                  By signing up you agree to our{" "}
                  <a href="#" className="transition-colors" style={{ color: "#60a5fa" }}>privacy policy</a>.
                </p>
                {regError && <p className="text-red-400 text-sm">{regError}</p>}
                <button type="submit" disabled={regLoading}
                  className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm text-white transition-all hover:scale-[1.02] disabled:opacity-50 mt-2"
                  style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}>
                  {regLoading ? "Creating account…" : <><span>Create Account</span><ArrowRight size={15} /></>}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Bottom accent */}
        <div className="h-px w-full" style={{ background: "linear-gradient(to right,transparent,rgba(79,70,229,0.3),transparent)" }} />
      </div>
      </div>
    </div>,
    document.body
  );
}
