import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)" }}>
      <div className="mb-8 flex flex-col items-center gap-3">
        <Image src="/logo_transparent.png" alt="FAHADAMINAENTERPRISES" width={56} height={56} style={{ objectFit: "contain" }} />
        <span style={{ fontFamily: "var(--font-brand, sans-serif)", fontWeight: 900, color: "#0097B2", fontSize: "1rem", letterSpacing: "0.01em", lineHeight: 1 }}>
          FAHADAMINAENTERPRISES
        </span>
      </div>
      <SignIn />
    </div>
  );
}
