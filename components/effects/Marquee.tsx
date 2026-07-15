"use client";
// =========================================================
// components/effects/Marquee.tsx
// Infinite horizontal marquee
// =========================================================
import { useRef } from "react";

interface MarqueeProps {
  items: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export default function Marquee({
  items,
  speed = 30,
  reverse = false,
  className = "",
}: MarqueeProps) {
  // Duplicate items so the loop is seamless
  const doubled = [...items, ...items];

  return (
    <div
      className={`overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite ${reverse ? "reverse" : "normal"}`,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 px-6 py-3"
          >
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: "#9ca3af", letterSpacing: "0.12em" }}
            >
              {item}
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
              style={{ backgroundColor: "#7c3aed" }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
