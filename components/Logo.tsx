import Link from "next/link";
import Image from "next/image";

type Props = {
  size?: number;
  href?: string;
  showWordmark?: boolean;
};

export function PMark({ size = 46 }: { size?: number }) {
  return (
    <Image
      src="/logo_transparent.png"
      alt="Fahadamina Enterprises"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
      priority
    />
  );
}

export default function Logo({ size = 46, href = "/", showWordmark = false }: Props) {
  return (
    <Link href={href} className="flex items-center gap-2.5 shrink-0">
      <PMark size={size} />
      {showWordmark && (
        <span
          style={{
            fontFamily: "var(--font-brand, sans-serif)",
            fontWeight: 900,
            color: "#0097B2",
            fontSize: "1.15rem",
            letterSpacing: "0.01em",
            lineHeight: 1,
          }}>
          FAHADAMINAENTERPRISES
        </span>
      )}
    </Link>
  );
}
