"use client";
// =========================================================
// components/effects/LoadingScreen.tsx
// Cinematic 3D Intro Manager
// =========================================================
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import the heavy 3D scene so it never blocks SSR
const CinematicScene = dynamic(() => import("./CinematicScene"), { 
  ssr: false,
});

export default function LoadingScreen() {
  const [showIntro, setShowIntro] = useState(true);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Skip only if motion is reduced
    if (prefersReducedMotion) {
      setShowIntro(false);
      setHasChecked(true);
      return;
    }

    setHasChecked(true);
    document.body.style.overflow = "hidden";

    // Failsafe timeout in case WebGL crashes or hangs
    const failSafe = setTimeout(() => {
      completeIntro();
    }, 12000);

    return () => {
      clearTimeout(failSafe);
      document.body.style.overflow = "";
    };
  }, []);

  const completeIntro = () => {
    setShowIntro(false);
    document.body.style.overflow = "";
  };

  if (!hasChecked) {
    return <div className="fixed inset-0 z-[9999] bg-[#000005] pointer-events-none" />;
  }

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          key="cinematic-wrapper"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#000005] flex items-center justify-center overflow-hidden"
        >
          {/* Skip Button */}
          <button
            onClick={completeIntro}
            className="absolute top-6 right-6 z-50 text-white/50 hover:text-white text-sm font-medium tracking-widest uppercase transition-colors px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 backdrop-blur-md"
          >
            Skip Intro
          </button>

          {/* 3D Scene */}
          <CinematicScene onComplete={completeIntro} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
