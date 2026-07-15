"use client";
import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="w-full relative flex justify-center items-center py-8 pointer-events-none z-50">
      {/* Glow Line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="w-3/4 max-w-4xl h-[1px] relative"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.4), rgba(6, 182, 212, 0.4), transparent)",
        }}
      >
        {/* Core highlight */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent, #7c3aed, transparent)",
            boxShadow: "0 0 20px 2px rgba(124,58,237,0.5)",
          }}
        />
      </motion.div>
    </div>
  );
}
