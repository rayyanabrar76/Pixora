"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function TopProgress() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setVisible(true);
    setWidth(0);
    const t1 = setTimeout(() => setWidth(40), 20);
    const t2 = setTimeout(() => setWidth(75), 200);
    const t3 = setTimeout(() => setWidth(100), 500);
    const t4 = setTimeout(() => setVisible(false), 750);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, [pathname]);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, height: "2px",
      zIndex: 99999, pointerEvents: "none",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.3s ease",
    }}>
      <div style={{
        height: "100%",
        width: `${width}%`,
        background: "linear-gradient(to right, #2563eb, #4f46e5, #7c3aed)",
        boxShadow: "0 0 10px rgba(37,99,235,0.9)",
        transition: "width 0.4s ease",
      }} />
    </div>
  );
}
