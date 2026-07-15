"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "@/lib/data";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section id="faq" className="w-full py-32 flex flex-col items-center" style={{ backgroundColor: "#02040a" }}>
      
      {/* =========================================================
          SECTION HEADER
      ========================================================= */}
      <div className="flex flex-col items-center text-center max-w-[700px] w-full px-4 mb-[80px]">
        {/* Small Badge */}
        <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-bold tracking-widest text-gray-300 mb-6 uppercase backdrop-blur-md">
          FAQ
        </div>
        
        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white mb-6 leading-[1.1] tracking-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-purple-500">Questions</span>
        </h2>
        
        {/* Subtitle */}
        <p className="text-[18px] md:text-[20px] text-gray-400 leading-relaxed font-medium">
          Everything you need to know about joining and participating in Intellects Club.
        </p>
      </div>

      {/* =========================================================
          FAQ CONTAINER
      ========================================================= */}
      <div className="w-full max-w-[1100px] px-4 md:px-8 mx-auto flex flex-col gap-[16px] bg-transparent">
        {FAQS.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            /* Premium Glass Card */
            <div
              key={i}
              onClick={() => toggle(i)}
              className={`group w-full rounded-[18px] backdrop-blur-[12px] cursor-pointer transition-all duration-300 ease-out shadow-sm shadow-black/20 ${
                isOpen 
                  ? "bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.25)] -translate-y-[3px]"
                  : "bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.12)] hover:border-cyan-400/40 hover:bg-[rgba(255,255,255,0.05)] hover:-translate-y-[3px]"
              }`}
            >
              {/* Question Row */}
              <div className="flex items-center justify-between px-[24px] py-[24px] md:px-[28px] min-h-[72px]">
                <h3 className="text-[18px] md:text-[22px] font-semibold text-white pr-6 leading-tight">
                  {faq.question}
                </h3>
                
                {/* Plus/Cross Icon Button */}
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 border ${
                    isOpen ? "bg-white/10 border-white/20" : "bg-transparent border-white/10 group-hover:bg-white/5"
                  }`}
                  style={{ transform: isOpen ? "rotate(135deg)" : "rotate(0deg)" }}
                >
                  <Plus className="w-4 h-4 text-white" />
                </div>
              </div>
              
              {/* Expandable Answer */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    {/* Very thin separator line */}
                    <div className="h-[1px] w-full bg-[rgba(255,255,255,0.06)]" />
                    
                    <p className="px-[24px] md:px-[28px] pt-[24px] pb-[32px] text-[17px] text-gray-300 leading-relaxed font-medium">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </section>
  );
}
