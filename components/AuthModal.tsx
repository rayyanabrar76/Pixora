"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useSignIn, useSignUp, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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
  const { client } = useClerk();
  const router = useRouter();

  const signInWithGoogle = async () => {
    if (!client?.signIn) return;
    await client.signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: `${window.location.origin}/sso-callback`,
      redirectUrlComplete: `${window.location.origin}/`,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signIn) return;
    setLoginLoading(true); setLoginError("");
    const { error } = await signIn.password({ emailAddress: loginEmail, password: loginPassword });
    if (error) { setLoginError(error.message ?? "Invalid email or password."); setLoginLoading(false); return; }
    if (signIn.status === "complete") {
      await signIn.finalize({ navigate: () => { onClose(); router.refresh(); } });
    }
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
    if (signUp.status === "complete") {
      await signUp.finalize({ navigate: () => { onClose(); router.refresh(); } });
    }
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

            {/* Google button — shared for both login/register */}
            <button type="button" onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-3 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] mb-2"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#e2e8f0" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"}>
              <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                <path d="M47.532 24.552c0-1.636-.132-3.2-.388-4.704H24.48v9.02h12.984c-.56 2.996-2.24 5.532-4.764 7.244v6.016h7.716c4.516-4.164 7.116-10.3 7.116-17.576z" fill="#4285F4"/>
                <path d="M24.48 48c6.48 0 11.916-2.148 15.888-5.836l-7.716-6.016c-2.148 1.436-4.896 2.284-8.172 2.284-6.284 0-11.604-4.244-13.5-9.952H3.016v6.212C6.972 42.916 15.116 48 24.48 48z" fill="#34A853"/>
                <path d="M10.98 28.48A14.46 14.46 0 0 1 10.2 24c0-1.564.268-3.08.78-4.48V13.308H3.016A23.964 23.964 0 0 0 .48 24c0 3.868.928 7.528 2.536 10.692L10.98 28.48z" fill="#FBBC05"/>
                <path d="M24.48 9.568c3.536 0 6.704 1.216 9.2 3.596l6.892-6.892C36.388 2.38 30.952 0 24.48 0 15.116 0 6.972 5.084 3.016 13.308l7.964 6.212c1.896-5.708 7.216-9.952 13.5-9.952z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
              <span className="text-[11px]" style={{ color: "rgba(100,116,139,0.6)" }}>or</span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
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
                <div id="clerk-captcha" />
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
