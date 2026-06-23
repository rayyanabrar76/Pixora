import { ReactNode, useId } from "react";

export default function ServiceBanner({ name, icon, category }: {
  name: string; icon: string; category: string;
}) {
  // useId gives each rendered instance a unique ID — prevents gradient/clipPath
  // collisions when multiple ServiceBanners appear on the same page.
  const uid = useId().replace(/:/g, "");
  const gradId = `grad${uid}`;
  const clipId = `clip${uid}`;
  const words = name.toUpperCase().split(" ");
  const lineH = 20;
  const startY = Math.max(24, (120 - words.length * lineH) / 2 + lineH);

  return (
    <svg
      viewBox="0 0 280 156"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMid slice"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradStart(category)} />
          <stop offset="100%" stopColor={gradEnd(category)} />
        </linearGradient>
        <clipPath id={clipId}>
          <rect x="0" y="0" width="150" height="156" />
        </clipPath>
      </defs>

      {/* Background */}
      <rect width="280" height="156" fill={`url(#${gradId})`} />

      {/* Decorative bg circles */}
      <circle cx="240" cy="125" r="65" fill="rgba(255,255,255,0.06)" />
      <circle cx="12"  cy="145" r="38" fill="rgba(255,255,255,0.05)" />

      {/* Right-side illustration */}
      {getIllustration(icon)}

      {/* Site logo mark */}
      <g transform="translate(244,5)">
        <rect width="30" height="30" rx="6" fill="rgba(255,255,255,0.18)" />
        <image href="/logo_transparent.png" x="3" y="3" width="24" height="24" preserveAspectRatio="xMidYMid meet" />
      </g>

      {/* Service name — left column, clipped so it never overlaps the illustration */}
      <g clipPath={`url(#${clipId})`}>
        {words.map((word, i) => (
          <text key={i} x="14" y={startY + i * lineH}
            fill="white"
            fontFamily="system-ui,-apple-system,sans-serif"
            fontSize="16" fontWeight="800" letterSpacing="0.3">
            {word}
          </text>
        ))}
      </g>

      {/* Category label */}
      <text x="14" y="150"
        fill="rgba(255,255,255,0.5)"
        fontFamily="system-ui,sans-serif"
        fontSize="7.5" fontWeight="600" letterSpacing="2">
        {category.toUpperCase()}
      </text>
    </svg>
  );
}

/* ── Per-service illustrations ─────────────────────── */

function getIllustration(icon: string): ReactNode {
  const W = "rgba(255,255,255,0.85)";
  const WM = "rgba(255,255,255,0.45)";
  const WL = "rgba(255,255,255,0.2)";
  const WX = "rgba(255,255,255,0.12)";

  switch (icon) {

    /* Business Card */
    case "id-card":
      return (
        <g>
          {/* Card shadow */}
          <rect x="153" y="54" width="102" height="66" rx="6" fill="rgba(0,0,0,0.15)"/>
          {/* Card body */}
          <rect x="149" y="50" width="102" height="66" rx="6" fill={WL}/>
          <rect x="149" y="50" width="102" height="66" rx="6" fill="none" stroke={WM} strokeWidth="1.2"/>
          {/* Avatar square */}
          <rect x="159" y="61" width="26" height="26" rx="4" fill={WM}/>
          <circle cx="172" cy="72" r="6" fill={W}/>
          <rect x="162" y="81" width="20" height="5" rx="2.5" fill={WL}/>
          {/* Text lines */}
          <rect x="193" y="63" width="50" height="5" rx="2.5" fill={W}/>
          <rect x="193" y="72" width="38" height="4" rx="2" fill={WM}/>
          <rect x="193" y="80" width="44" height="3.5" rx="1.75" fill={WL}/>
          {/* Bottom strip */}
          <rect x="149" y="101" width="102" height="15" rx="0 0 6 6" fill="rgba(255,255,255,0.1)"/>
          <rect x="159" y="106" width="30" height="3.5" rx="1.75" fill={WM}/>
        </g>
      );

    /* Logo Design */
    case "star":
      return (
        <g>
          {/* Outer glow ring */}
          <circle cx="210" cy="80" r="42" fill="rgba(255,255,255,0.06)"/>
          <circle cx="210" cy="80" r="32" fill="rgba(255,255,255,0.08)"/>
          {/* Star shape */}
          <polygon
            points="210,38 219,66 249,66 226,84 234,112 210,95 186,112 194,84 171,66 201,66"
            fill={WM} stroke={W} strokeWidth="1.5" strokeLinejoin="round"
          />
          {/* Inner star */}
          <polygon
            points="210,55 215,70 231,70 219,79 223,94 210,85 197,94 201,79 189,70 205,70"
            fill={WL}
          />
          <circle cx="210" cy="80" r="8" fill={W}/>
        </g>
      );

    /* Facebook Ad / Banner */
    case "image":
      return (
        <g>
          {/* Browser window */}
          <rect x="148" y="28" width="110" height="100" rx="6" fill={WX}/>
          <rect x="148" y="28" width="110" height="100" rx="6" fill="none" stroke={WM} strokeWidth="1.2"/>
          {/* Chrome bar */}
          <rect x="148" y="28" width="110" height="18" rx="6" fill={WL}/>
          <circle cx="158" cy="37" r="3" fill="rgba(255,100,100,0.7)"/>
          <circle cx="167" cy="37" r="3" fill="rgba(255,200,50,0.7)"/>
          <circle cx="176" cy="37" r="3" fill="rgba(80,200,80,0.7)"/>
          <rect x="186" y="32" width="60" height="10" rx="5" fill="rgba(255,255,255,0.1)"/>
          {/* Ad content */}
          <rect x="155" y="52" width="96" height="48" rx="3" fill="rgba(255,255,255,0.08)"/>
          <rect x="155" y="52" width="96" height="22" rx="3" fill={WL}/>
          <rect x="163" y="60" width="55" height="6" rx="3" fill={W}/>
          <rect x="163" y="78" width="70" height="5" rx="2.5" fill={WM}/>
          <rect x="163" y="87" width="50" height="5" rx="2.5" fill={WL}/>
          {/* CTA button */}
          <rect x="163" y="96" width="32" height="14" rx="4" fill={WM}/>
          <rect x="165" y="99" width="28" height="8" rx="3" fill="rgba(255,255,255,0.5)"/>
        </g>
      );

    /* Mobile App UI */
    case "mobile":
      return (
        <g>
          {/* Phone body */}
          <rect x="186" y="16" width="72" height="124" rx="10" fill={WX}/>
          <rect x="186" y="16" width="72" height="124" rx="10" fill="none" stroke={WM} strokeWidth="1.5"/>
          {/* Notch */}
          <rect x="206" y="16" width="32" height="10" rx="5" fill={WL}/>
          {/* Screen */}
          <rect x="192" y="30" width="60" height="96" rx="4" fill="rgba(255,255,255,0.07)"/>
          {/* Nav bar */}
          <rect x="192" y="30" width="60" height="12" rx="4" fill={WL}/>
          <rect x="197" y="34" width="18" height="4" rx="2" fill={W}/>
          <rect x="238" y="34" width="10" height="4" rx="2" fill={WM}/>
          {/* Hero strip */}
          <rect x="192" y="45" width="60" height="24" rx="2" fill="rgba(255,255,255,0.12)"/>
          <rect x="197" y="50" width="30" height="5" rx="2.5" fill={W}/>
          <rect x="197" y="58" width="22" height="4" rx="2" fill={WM}/>
          {/* Cards */}
          <rect x="192" y="73" width="27" height="22" rx="3" fill={WL}/>
          <rect x="225" y="73" width="27" height="22" rx="3" fill={WL}/>
          <rect x="192" y="99" width="60" height="5" rx="2.5" fill={WM}/>
          <rect x="192" y="108" width="44" height="4" rx="2" fill={WL}/>
          {/* Home bar */}
          <rect x="210" y="130" width="24" height="4" rx="2" fill={WM}/>
        </g>
      );

    /* Landing Page / Web Dev */
    case "laptop-code":
      return (
        <g>
          {/* Screen */}
          <rect x="144" y="26" width="110" height="78" rx="5" fill={WX}/>
          <rect x="144" y="26" width="110" height="78" rx="5" fill="none" stroke={WM} strokeWidth="1.5"/>
          {/* Screen content */}
          <rect x="150" y="32" width="98" height="66" rx="2" fill="rgba(255,255,255,0.06)"/>
          {/* Nav line */}
          <rect x="150" y="32" width="98" height="11" rx="2" fill={WL}/>
          <rect x="155" y="35.5" width="16" height="4" rx="2" fill={W}/>
          <rect x="213" y="35.5" width="9" height="4" rx="2" fill={WM}/>
          <rect x="225" y="35.5" width="9" height="4" rx="2" fill={WM}/>
          <rect x="237" y="35.5" width="9" height="4" rx="2" fill={WM}/>
          {/* Hero gradient */}
          <rect x="150" y="45" width="98" height="30" rx="0" fill="rgba(99,102,241,0.3)"/>
          <rect x="156" y="50" width="44" height="6" rx="3" fill={W}/>
          <rect x="156" y="59" width="32" height="4" rx="2" fill={WM}/>
          {/* Cards row */}
          <rect x="153" y="79" width="28" height="14" rx="2" fill={WL}/>
          <rect x="185" y="79" width="28" height="14" rx="2" fill={WL}/>
          <rect x="217" y="79" width="28" height="14" rx="2" fill={WL}/>
          {/* Laptop hinge */}
          <rect x="138" y="104" width="122" height="8" rx="3" fill={WM}/>
          <ellipse cx="199" cy="104" rx="8" ry="2" fill={WL}/>
        </g>
      );

    /* Corporate Website */
    case "building":
      return (
        <g>
          {/* Building 1 (main) */}
          <rect x="162" y="42" width="58" height="96" rx="3" fill={WL}/>
          <rect x="162" y="42" width="58" height="96" rx="3" fill="none" stroke={WM} strokeWidth="1.2"/>
          {/* Building 2 (right) */}
          <rect x="225" y="62" width="38" height="76" rx="3" fill="rgba(255,255,255,0.12)"/>
          <rect x="225" y="62" width="38" height="76" rx="3" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
          {/* Rooftop line B1 */}
          <rect x="162" y="42" width="58" height="8" rx="3" fill={WM}/>
          {/* Windows B1 */}
          {[0,1,2].map(row => [0,1,2].map(col => (
            <rect key={`${row}-${col}`} x={170+col*18} y={56+row*18} width="10" height="10" rx="1.5"
              fill={row===0&&col===1 ? W : WM}/>
          )))}
          {/* Door B1 */}
          <rect x="179" y="116" width="20" height="22" rx="2" fill={WM}/>
          <circle cx="196" cy="127" r="2" fill={W}/>
          {/* Windows B2 */}
          {[0,1,2,3].map(row => [0,1].map(col => (
            <rect key={`b2-${row}-${col}`} x={230+col*14} y={70+row*14} width="9" height="9" rx="1.5" fill={WL}/>
          )))}
        </g>
      );

    /* E-Commerce */
    case "store":
      return (
        <g>
          {/* Phone */}
          <rect x="190" y="14" width="66" height="120" rx="10" fill={WX}/>
          <rect x="190" y="14" width="66" height="120" rx="10" fill="none" stroke={WM} strokeWidth="1.5"/>
          <rect x="208" y="14" width="30" height="9" rx="4.5" fill={WL}/>
          <rect x="196" y="27" width="54" height="94" rx="3" fill="rgba(255,255,255,0.07)"/>
          {/* Nav */}
          <rect x="196" y="27" width="54" height="11" rx="3" fill={WL}/>
          <rect x="200" y="30" width="18" height="4" rx="2" fill={W}/>
          {/* Shopping bag icon */}
          <rect x="239" y="29" width="9" height="9" rx="1.5" fill={WM}/>
          {/* Product cards */}
          <rect x="198" y="42" width="24" height="28" rx="3" fill={WL}/>
          <rect x="226" y="42" width="24" height="28" rx="3" fill={WL}/>
          <rect x="198" y="74" width="24" height="28" rx="3" fill={WL}/>
          <rect x="226" y="74" width="24" height="28" rx="3" fill={WL}/>
          {/* Price tags */}
          <rect x="200" y="73" width="18" height="4" rx="2" fill={WM}/>
          <rect x="228" y="73" width="18" height="4" rx="2" fill={WM}/>
          {/* Cart badge */}
          <circle cx="248" cy="27" r="5" fill="rgba(239,68,68,0.85)"/>
          <rect x="246" y="25.5" width="4" height="3" rx="0.5" fill="white"/>
          {/* Home bar */}
          <rect x="209" y="128" width="28" height="4" rx="2" fill={WM}/>
        </g>
      );

    /* SEO */
    case "search":
      return (
        <g>
          {/* Bar chart */}
          <rect x="152" y="100" width="16" height="36" rx="3" fill={WL}/>
          <rect x="172" y="82"  width="16" height="54" rx="3" fill={WM}/>
          <rect x="192" y="64"  width="16" height="72" rx="3" fill={WM}/>
          <rect x="212" y="48"  width="16" height="88" rx="3" fill={W}/>
          {/* Trend line */}
          <polyline points="160,95 180,78 200,60 220,44" fill="none" stroke={W} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Magnifier */}
          <circle cx="180" cy="46" r="18" fill="rgba(255,255,255,0.1)" stroke={W} strokeWidth="2.5"/>
          <circle cx="180" cy="46" r="10" fill="rgba(255,255,255,0.12)"/>
          <line x1="192" y1="58" x2="208" y2="74" stroke={W} strokeWidth="3" strokeLinecap="round"/>
          {/* Arrow on trend */}
          <circle cx="220" cy="44" r="4" fill={W}/>
        </g>
      );

    /* Social Media */
    case "share-alt":
      return (
        <g>
          {/* Phone */}
          <rect x="194" y="16" width="62" height="110" rx="9" fill={WX}/>
          <rect x="194" y="16" width="62" height="110" rx="9" fill="none" stroke={WM} strokeWidth="1.5"/>
          <rect x="206" y="16" width="28" height="8" rx="4" fill={WL}/>
          <rect x="199" y="28" width="52" height="86" rx="3" fill="rgba(255,255,255,0.07)"/>
          {/* Status bar */}
          <rect x="199" y="28" width="52" height="10" rx="3" fill={WL}/>
          {/* Instagram-like grid */}
          {[0,1].map(row => [0,1,2].map(col => (
            <rect key={`ig-${row}-${col}`}
              x={200+col*18} y={42+row*18} width="16" height="16" rx="2"
              fill={row===0&&col===1 ? WM : WL}/>
          )))}
          {/* Story circles */}
          {[0,1,2].map(i => (
            <circle key={i} cx={207+i*18} cy={90} r="7"
              fill="none" stroke={i===1?W:WM} strokeWidth="2"/>
          ))}
          {/* Like + comment */}
          <rect x="201" y="102" width="20" height="4" rx="2" fill={WM}/>
          <rect x="225" y="102" width="20" height="4" rx="2" fill={WL}/>
          {/* Floating notification */}
          <rect x="148" y="32" width="40" height="26" rx="6" fill="rgba(255,255,255,0.18)"/>
          <circle cx="158" cy="42" r="6" fill={WM}/>
          <rect x="167" y="38" width="16" height="4" rx="2" fill={W}/>
          <rect x="167" y="45" width="12" height="3" rx="1.5" fill={WM}/>
          <circle cx="185" cy="37" r="4" fill="rgba(239,68,68,0.9)"/>
        </g>
      );

    /* Email Automation */
    case "envelope":
      return (
        <g>
          {/* Main envelope */}
          <rect x="148" y="44" width="110" height="76" rx="6" fill={WL}/>
          <rect x="148" y="44" width="110" height="76" rx="6" fill="none" stroke={WM} strokeWidth="1.5"/>
          {/* Envelope flap */}
          <path d="M148 50 L203 88 L258 50" fill="none" stroke={W} strokeWidth="2" strokeLinejoin="round"/>
          <path d="M148 44 L203 80 L258 44" fill="rgba(255,255,255,0.12)"/>
          {/* Bottom creases */}
          <line x1="148" y1="120" x2="185" y2="90" stroke={WM} strokeWidth="1.5"/>
          <line x1="258" y1="120" x2="221" y2="90" stroke={WM} strokeWidth="1.5"/>
          {/* Flying small envelopes */}
          <rect x="155" y="18" width="32" height="22" rx="4" fill="rgba(255,255,255,0.15)"/>
          <path d="M155 22 L171 32 L187 22" fill="none" stroke={W} strokeWidth="1.5"/>
          <rect x="220" y="14" width="26" height="18" rx="3" fill="rgba(255,255,255,0.12)"/>
          <path d="M220 17 L233 25 L246 17" fill="none" stroke={WM} strokeWidth="1.2"/>
          {/* Notification dot */}
          <circle cx="184" cy="22" r="5" fill="rgba(34,197,94,0.9)"/>
        </g>
      );

    /* Photography */
    case "camera":
      return (
        <g>
          {/* Camera body */}
          <rect x="148" y="50" width="106" height="78" rx="9" fill={WL}/>
          <rect x="148" y="50" width="106" height="78" rx="9" fill="none" stroke={WM} strokeWidth="1.5"/>
          {/* Viewfinder bump */}
          <rect x="170" y="38" width="36" height="17" rx="5" fill={WM}/>
          {/* Flash bump */}
          <rect x="210" y="40" width="20" height="14" rx="4" fill="rgba(255,255,255,0.18)"/>
          {/* Shutter button */}
          <circle cx="238" cy="65" r="8" fill={WM}/>
          <circle cx="238" cy="65" r="5" fill={W}/>
          {/* Lens rings */}
          <circle cx="190" cy="92" r="28" fill="rgba(0,0,0,0.15)"/>
          <circle cx="190" cy="92" r="26" fill="rgba(255,255,255,0.08)" stroke={WM} strokeWidth="1.5"/>
          <circle cx="190" cy="92" r="19" fill="rgba(255,255,255,0.1)" stroke={WM} strokeWidth="1"/>
          <circle cx="190" cy="92" r="11" fill="rgba(255,255,255,0.15)"/>
          <circle cx="190" cy="92" r="5"  fill={W}/>
          {/* Flash indicator */}
          <circle cx="164" cy="62" r="5" fill="rgba(255,230,80,0.7)"/>
        </g>
      );

    /* Google My Business */
    case "map-marker-alt":
      return (
        <g>
          {/* Map background */}
          <rect x="148" y="28" width="110" height="100" rx="6" fill="rgba(255,255,255,0.08)"/>
          <rect x="148" y="28" width="110" height="100" rx="6" fill="none" stroke={WM} strokeWidth="1.2"/>
          {/* Map grid lines */}
          {[48,68,88,108].map(y => (
            <line key={y} x1="148" y1={y} x2="258" y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          ))}
          {[168,188,208,228,248].map(x => (
            <line key={x} x1={x} y1="28" x2={x} y2="128" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          ))}
          {/* Roads */}
          <rect x="148" y="74" width="110" height="7" rx="1" fill="rgba(255,255,255,0.12)"/>
          <rect x="193" y="28" width="7" height="100" rx="1" fill="rgba(255,255,255,0.12)"/>
          {/* Map pin */}
          <circle cx="203" cy="62" r="14" fill="rgba(239,68,68,0.85)"/>
          <circle cx="203" cy="62" r="14" fill="none" stroke={W} strokeWidth="1.5"/>
          <circle cx="203" cy="62" r="6" fill={W}/>
          <path d="M203 76 L197 92 L203 89 L209 92 Z" fill="rgba(239,68,68,0.85)"/>
          {/* Info popup */}
          <rect x="212" y="38" width="44" height="30" rx="5" fill="rgba(255,255,255,0.2)"/>
          <rect x="218" y="44" width="32" height="5" rx="2.5" fill={W}/>
          <rect x="218" y="52" width="24" height="4" rx="2" fill={WM}/>
          <path d="M224 68 L218 68 L221 74 Z" fill="rgba(255,255,255,0.2)"/>
        </g>
      );

    /* Brochure/Flyer */
    case "file-text":
      return (
        <g>
          {/* Back paper (shadow) */}
          <rect x="162" y="18" width="80" height="110" rx="5" fill="rgba(0,0,0,0.1)" transform="rotate(5 202 73)"/>
          {/* Main paper */}
          <rect x="158" y="14" width="82" height="112" rx="5" fill="rgba(255,255,255,0.18)"/>
          <rect x="158" y="14" width="82" height="112" rx="5" fill="none" stroke={WM} strokeWidth="1.2"/>
          {/* Fold corner */}
          <path d="M220 14 L240 14 L240 34 Z" fill={WM}/>
          <path d="M220 14 L220 34 L240 34" fill="rgba(255,255,255,0.08)" stroke={WM} strokeWidth="1"/>
          {/* Image placeholder */}
          <rect x="164" y="22" width="68" height="36" rx="3" fill={WL}/>
          <circle cx="178" cy="36" r="6" fill={WM}/>
          <path d="M164 48 L180 38 L193 46 L208 34 L232 48" fill="none" stroke={WM} strokeWidth="1.5" strokeLinejoin="round"/>
          {/* Text lines */}
          <rect x="164" y="64" width="68" height="6" rx="3" fill={W}/>
          <rect x="164" y="75" width="60" height="4" rx="2" fill={WM}/>
          <rect x="164" y="83" width="64" height="4" rx="2" fill={WL}/>
          <rect x="164" y="91" width="48" height="4" rx="2" fill={WL}/>
          {/* CTA button */}
          <rect x="164" y="102" width="40" height="14" rx="4" fill={WM}/>
          <rect x="166" y="104" width="36" height="10" rx="3" fill="rgba(255,255,255,0.35)"/>
        </g>
      );

    /* Google Ads */
    case "trending-up":
      return (
        <g>
          {/* Axis */}
          <line x1="152" y1="118" x2="258" y2="118" stroke={WL} strokeWidth="1.5"/>
          <line x1="152" y1="28"  x2="152" y2="118" stroke={WL} strokeWidth="1.5"/>
          {/* Filled area */}
          <path d="M152 108 L175 90 L198 96 L220 68 L242 52 L258 36 L258 118 L152 118 Z" fill="rgba(255,255,255,0.08)"/>
          {/* Trend line */}
          <polyline points="152,108 175,90 198,96 220,68 242,52 258,36"
            fill="none" stroke={W} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Data points */}
          {[[175,90],[198,96],[220,68],[242,52],[258,36]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r={i===4?5:3.5} fill={i===4?W:WM}/>
          ))}
          {/* Cursor / click icon */}
          <g transform="translate(148,28)">
            <circle cx="20" cy="20" r="18" fill="rgba(255,255,255,0.12)"/>
            <circle cx="20" cy="20" r="18" fill="none" stroke={WM} strokeWidth="1.5"/>
            <path d="M15 14 L15 26 L19 22 L22 28 L24 27 L21 21 L26 21 Z" fill={W}/>
          </g>
        </g>
      );

    /* Website Maintenance */
    case "settings":
      return (
        <g>
          {/* Outer gear */}
          <circle cx="205" cy="76" r="36" fill="rgba(255,255,255,0.06)" stroke={WL} strokeWidth="1"/>
          {[0,45,90,135,180,225,270,315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const ix = 205 + 30 * Math.cos(rad);
            const iy = 76  + 30 * Math.sin(rad);
            return <circle key={angle} cx={ix} cy={iy} r="5.5" fill={WM}/>;
          })}
          <circle cx="205" cy="76" r="24" fill="rgba(255,255,255,0.1)" stroke={WM} strokeWidth="1.5"/>
          <circle cx="205" cy="76" r="14" fill="rgba(255,255,255,0.15)"/>
          <circle cx="205" cy="76" r="7"  fill={W}/>
          {/* Small wrench top-left */}
          <g transform="translate(154,24)" opacity="0.6">
            <rect x="0" y="12" width="6" height="22" rx="3" fill={WM} transform="rotate(-40 3 23)"/>
            <circle cx="5" cy="5" r="7" fill="none" stroke={WM} strokeWidth="3"/>
            <circle cx="5" cy="5" r="3" fill={WL}/>
          </g>
        </g>
      );

    /* Pitch Deck / Monitor */
    case "monitor":
      return (
        <g>
          {/* Monitor */}
          <rect x="146" y="24" width="112" height="78" rx="6" fill={WX}/>
          <rect x="146" y="24" width="112" height="78" rx="6" fill="none" stroke={WM} strokeWidth="1.5"/>
          <rect x="152" y="30" width="100" height="66" rx="3" fill="rgba(255,255,255,0.07)"/>
          {/* Slide header */}
          <rect x="152" y="30" width="100" height="14" rx="3" fill={WL}/>
          <rect x="158" y="35" width="38" height="5" rx="2.5" fill={W}/>
          <rect x="202" y="36" width="16" height="4" rx="2" fill={WM}/>
          <rect x="222" y="36" width="16" height="4" rx="2" fill={WM}/>
          <rect x="242" y="36" width="6" height="4" rx="2" fill={WM}/>
          {/* Slide body */}
          <rect x="155" y="48" width="40" height="40" rx="3" fill={WL}/>
          {/* Pie chart mockup */}
          <circle cx="175" cy="68" r="14" fill="rgba(255,255,255,0.1)" stroke={WM} strokeWidth="1.5"/>
          <path d="M175 68 L175 54 A14 14 0 0 1 187 76 Z" fill={WM}/>
          <path d="M175 68 L187 76 A14 14 0 0 1 163 76 Z" fill={W} fillOpacity="0.4"/>
          {/* Text lines */}
          <rect x="200" y="50" width="48" height="5" rx="2.5" fill={W}/>
          <rect x="200" y="59" width="38" height="4" rx="2" fill={WM}/>
          <rect x="200" y="67" width="42" height="4" rx="2" fill={WL}/>
          <rect x="200" y="75" width="30" height="4" rx="2" fill={WL}/>
          {/* Stand */}
          <rect x="192" y="102" width="20" height="12" rx="2" fill={WL}/>
          <rect x="178" y="113" width="48" height="7" rx="3" fill={WM}/>
          {/* Slide dots */}
          {[0,1,2,3,4].map(i => (
            <circle key={i} cx={186+i*10} cy={136} r="3" fill={i===2?W:WL}/>
          ))}
        </g>
      );

    /* WhatsApp Business */
    case "message-circle":
      return (
        <g>
          {/* Phone */}
          <rect x="192" y="12" width="64" height="116" rx="10" fill={WX}/>
          <rect x="192" y="12" width="64" height="116" rx="10" fill="none" stroke={WM} strokeWidth="1.5"/>
          <rect x="209" y="12" width="30" height="9" rx="4.5" fill={WL}/>
          <rect x="197" y="25" width="54" height="90" rx="3" fill="rgba(255,255,255,0.07)"/>
          {/* Chat header */}
          <rect x="197" y="25" width="54" height="14" rx="3" fill="rgba(37,211,102,0.3)"/>
          <circle cx="206" cy="32" r="5" fill="rgba(37,211,102,0.6)"/>
          <rect x="214" y="29" width="26" height="4" rx="2" fill={W}/>
          <rect x="214" y="35" width="16" height="3" rx="1.5" fill={WM}/>
          {/* Chat bubbles */}
          <rect x="199" y="43" width="36" height="12" rx="5" fill="rgba(255,255,255,0.2)"/>
          <rect x="215" y="59" width="32" height="12" rx="5" fill="rgba(37,211,102,0.35)"/>
          <rect x="199" y="75" width="40" height="12" rx="5" fill="rgba(255,255,255,0.2)"/>
          <rect x="215" y="91" width="28" height="12" rx="5" fill="rgba(37,211,102,0.35)"/>
          {/* Typing indicator */}
          <rect x="199" y="107" width="20" height="10" rx="5" fill="rgba(255,255,255,0.15)"/>
          {[0,1,2].map(i => <circle key={i} cx={204+i*5} cy={112} r="1.5" fill={WM}/>)}
          {/* Floating icon */}
          <circle cx="166" cy="50" r="20" fill="rgba(37,211,102,0.2)" stroke="rgba(37,211,102,0.4)" strokeWidth="1.5"/>
          <path d="M157 50 C157 44 162 40 168 40 C174 40 179 44 179 50 C179 55 175 58 169 59 L166 64 L165 59 C160 58 157 54 157 50 Z" fill={WM}/>
        </g>
      );

    /* Social Media Profile Setup */
    case "users":
      return (
        <g>
          {/* Profile card back */}
          <rect x="170" y="22" width="88" height="108" rx="7" fill="rgba(0,0,0,0.1)" transform="rotate(5 214 76)"/>
          {/* Profile card main */}
          <rect x="162" y="18" width="88" height="108" rx="7" fill="rgba(255,255,255,0.15)"/>
          <rect x="162" y="18" width="88" height="108" rx="7" fill="none" stroke={WM} strokeWidth="1.2"/>
          {/* Cover banner */}
          <rect x="162" y="18" width="88" height="34" rx="7" fill="rgba(255,255,255,0.12)"/>
          <rect x="162" y="38" width="88" height="14" rx="0" fill="rgba(255,255,255,0.08)"/>
          {/* Avatar */}
          <circle cx="206" cy="52" r="16" fill={WL} stroke={W} strokeWidth="2.5"/>
          <circle cx="206" cy="47" r="6.5" fill={WM}/>
          <path d="M192 65 C192 57 200 54 206 54 C212 54 220 57 220 65" fill={WM}/>
          {/* Name + handle */}
          <rect x="180" y="72" width="52" height="6" rx="3" fill={W}/>
          <rect x="187" y="81" width="38" height="4" rx="2" fill={WM}/>
          {/* Stats row */}
          <rect x="165" y="90" width="82" height="1" fill={WL}/>
          {[0,1,2].map(i => (
            <g key={i}>
              <rect x={170+i*27} y={96} width="18" height="5" rx="2.5" fill={W}/>
              <rect x={172+i*27} y={104} width="14" height="3.5" rx="1.75" fill={WL}/>
            </g>
          ))}
          {/* Social icons row */}
          {[0,1,2,3].map(i => (
            <circle key={i} cx={174+i*20} cy={116} r="7" fill={WL} stroke={WM} strokeWidth="1"/>
          ))}
        </g>
      );

    default:
      return (
        <g>
          <circle cx="210" cy="78" r="40" fill="rgba(255,255,255,0.06)"/>
          <circle cx="210" cy="78" r="26" fill="rgba(255,255,255,0.1)"/>
          <circle cx="210" cy="78" r="12" fill={WL}/>
        </g>
      );
  }
}

/* ── Gradient helpers ───────────────────────────────── */
function gradStart(cat: string) {
  const m: Record<string, string> = {
    "Design":             "#1d4ed8",
    "Web Development":    "#1e3a8a",
    "Marketing":          "#5b21b6",
    "Photography":        "#0f766e",
    "Google My Business": "#0369a1",
  };
  return m[cat] ?? "#1d4ed8";
}

function gradEnd(cat: string) {
  const m: Record<string, string> = {
    "Design":             "#7c3aed",
    "Web Development":    "#4f46e5",
    "Marketing":          "#be185d",
    "Photography":        "#0ea5e9",
    "Google My Business": "#16a34a",
  };
  return m[cat] ?? "#7c3aed";
}
