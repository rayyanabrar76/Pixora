import Link from "next/link";

type Props = {
  size?: number;
  href?: string;
  showWordmark?: boolean;
  dark?: boolean;
};

export function PMark({ size = 46 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* F vertical bar */}
      <rect x="12" y="12" width="36" height="196" rx="6" fill="#0097B2" />
      {/* F top horizontal bar */}
      <rect x="12" y="12" width="168" height="46" rx="6" fill="#0097B2" />
      {/* F middle horizontal bar */}
      <rect x="12" y="94" width="116" height="38" rx="6" fill="#0097B2" />
      {/* Small dot — top right */}
      <circle cx="182" cy="68" r="14" fill="#0097B2" />
      {/* Medium dot — middle right */}
      <circle cx="154" cy="128" r="21" fill="#0097B2" />
      {/* Large dot — bottom center */}
      <circle cx="108" cy="188" r="30" fill="#0097B2" />
    </svg>
  );
}

export default function Logo({ size = 46, href = "/", showWordmark = true }: Props) {
  return (
    <Link href={href} className="flex items-center gap-2.5 shrink-0">
      <PMark size={size} />
      {showWordmark && (
        <span className="text-xl font-extrabold tracking-tight leading-tight">
          <span className="text-white">Fahadamina</span>
          <br />
          <span style={{ color: "#0097B2", fontSize: "0.7em", letterSpacing: "0.05em" }}>ENTERPRISES</span>
        </span>
      )}
    </Link>
  );
}
