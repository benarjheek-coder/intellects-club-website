"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function GlobalAmbient() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement natively in framer-motion without triggering React re-renders
  const springX = useSpring(mouseX, { stiffness: 50, damping: 15, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 15, mass: 0.1 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by 192px (half of 384px height/width) to center the glow
      mouseX.set(e.clientX - 192);
      mouseY.set(e.clientY - 192);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* 1. Global Noise Texture */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 2. Mouse Tracking Ambient Glow */}
      <motion.div
        className="pointer-events-none fixed z-0 h-96 w-96 rounded-full blur-[60px] opacity-20 will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.8) 0%, rgba(37,99,235,0) 70%)",
          x: springX,
          y: springY,
        }}
      />

      {/* 3. Slow Floating Aurora Blobs (Background Mesh) */}
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-[#02040a]">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] h-[60vh] w-[60vw] rounded-full blur-[60px] will-change-transform"
          style={{ background: "rgba(124, 58, 237, 0.15)" }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -right-[10%] h-[70vh] w-[50vw] rounded-full blur-[60px] will-change-transform"
          style={{ background: "rgba(37, 99, 235, 0.12)" }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.08, 0.12, 0.08],
            x: [0, 100, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] left-[20%] h-[50vh] w-[70vw] rounded-full blur-[50px] will-change-transform"
          style={{ background: "rgba(6, 182, 212, 0.1)" }}
        />
      </div>
    </>
  );
}
