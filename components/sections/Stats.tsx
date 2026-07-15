"use client";
// =========================================================
// components/sections/Stats.tsx
// Animated counter stats + infinite marquee
// =========================================================
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { STATS, MARQUEE_ITEMS } from "@/lib/data";
import Marquee from "@/components/effects/Marquee";
import ScrollReveal from "@/components/effects/ScrollReveal";

// ── Animated Counter ───────────────────────────────────────
function AnimatedCounter({
  value,
  suffix = "",
  duration = 2000,
  start = false,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  start: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(value);
    };
    requestAnimationFrame(step);
  }, [start, value, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      id="stats"
      className="section-spacing relative overflow-hidden w-full flex justify-center"
      style={{ backgroundColor: "#030712" }}
      aria-label="Statistics"
    >
      <div className="w-full flex flex-col items-center">
      {/* Separator line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)",
        }}
      />

      {/* Stats Grid */}
      <div ref={ref} className="container-premium relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div 
                className="text-center group p-8 rounded-2xl relative overflow-hidden"
                style={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(124,58,237,0.05)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(124,58,237,0.2)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(255,255,255,0.02)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div
                  className="text-4xl lg:text-5xl font-bold mb-3 text-white drop-shadow-md"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                  aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    start={isInView}
                  />
                </div>
                <div
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "#9ca3af" }}
                >
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden">
        <div
          className="absolute left-0 top-0 w-24 h-full z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #030712, transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 w-24 h-full z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, #030712, transparent)",
          }}
        />
        <div
          className="py-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <Marquee items={MARQUEE_ITEMS} speed={40} />
        </div>
        <div className="py-3">
          <Marquee items={[...MARQUEE_ITEMS].reverse()} speed={35} reverse />
        </div>
      </div>

      {/* Bottom separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)",
        }}
      />
      </div>
    </section>
  );
}
