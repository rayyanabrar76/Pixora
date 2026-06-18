import Link from "next/link";

type Props = {
  size?: number;
  href?: string;
  showWordmark?: boolean;
  dark?: boolean;
};

export function PMark({ size = 46 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="9" fill="#0f172a" />
      {/* P letterform — solid bold geometric */}
      <path
        d="M8,8 L8,32 L13,32 L13,22 L26,22 L28,20 L28,10 L26,8 Z"
        fill="white"
      />
      {/* Counter (hole in the P bump) */}
      <path
        d="M13,12 L24,12 L25,13 L25,19 L24,20 L13,20 Z"
        fill="#0f172a"
      />
      {/* Accent dot */}
      <circle cx="33" cy="30" r="3.5" fill="#3b82f6" />
    </svg>
  );
}

export default function Logo({ size = 46, href = "/", showWordmark = true, dark = false }: Props) {
  return (
    <Link href={href} className="flex items-center gap-2.5 shrink-0">
      <PMark size={size} />
      {showWordmark && (
        <span className="text-2xl font-extrabold tracking-tight">
          <span className={dark ? "text-white" : "text-gray-900"}>Pix</span>
          <span className="text-blue-500">ora</span>
        </span>
      )}
    </Link>
  );
}
