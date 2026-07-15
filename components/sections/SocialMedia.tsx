"use client";
// =========================================================
// components/sections/SocialMedia.tsx
// Instagram integration section
// =========================================================
import React from "react";
import { motion } from "framer-motion";
import { Camera, ExternalLink } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/effects/ScrollReveal";

const INSTAGRAM_HANDLE = "@intellects_srmramapuram";
const INSTAGRAM_URL = "https://www.instagram.com/intellects_srmramapuram/";

// The Highlights section was removed to avoid displaying fake mock posts.

export default function SocialMedia() {
  return (
    <section
      id="social"
      className="section-spacing relative w-full flex justify-center overflow-hidden"
      style={{ backgroundColor: "#02040a" }}
      aria-labelledby="social-heading"
    >
      {/* Glow Effects */}
      <div 
        className="absolute top-0 right-1/4 w-[600px] h-[600px] pointer-events-none transform-gpu" 
        style={{ background: 'radial-gradient(circle, rgba(225,48,108,0.1) 0%, transparent 60%)' }} 
      />

      <div className="container-premium relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <ScrollReveal className="text-center w-full max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
             <span className="badge" style={{ backgroundColor: "rgba(225,48,108,0.15)", color: "#f472b6", border: "1px solid rgba(225,48,108,0.3)" }}>
                Social Hub
             </span>
          </div>
          <h2
            id="social-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 uppercase tracking-wide"
            style={{ fontFamily: "var(--font-space-grotesk)", textShadow: "0 0 30px rgba(255,255,255,0.1)" }}
          >
            Follow Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Journey</span>
          </h2>
          <p className="text-base md:text-lg text-gray-300 mx-auto leading-relaxed font-medium">
            Stay connected with Intellects Club for the latest events, workshops, challenges, recruitment updates, and community highlights.
          </p>
        </ScrollReveal>

        <div className="flex justify-center w-full max-w-md mx-auto">
           {/* Instagram Profile Card */}
           <div className="w-full">
              <ScrollReveal direction="left" className="h-full">
                 <motion.div 
                   className="glass-card p-8 flex flex-col items-center text-center h-full relative overflow-hidden group"
                   whileHover={{ y: -5 }}
                   style={{ borderColor: "rgba(225,48,108,0.3)" }}
                 >
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 z-0" />
                    
                    <div className="relative z-10 flex flex-col items-center w-full">
                       <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 mb-6 group-hover:scale-105 transition-transform duration-300">
                          <div className="w-full h-full rounded-full border-4 border-[#02040a] overflow-hidden bg-[#0a0f1a] flex items-center justify-center relative">
                             <img src="/images/logo.jpg" alt="Intellects Logo" className="w-full h-full object-cover scale-150" />
                          </div>
                       </div>
                       
                       <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                          Intellects Club
                       </h3>
                       <p className="text-pink-400 font-medium mb-6">{INSTAGRAM_HANDLE}</p>
                       
                       <div className="mb-8" />
                       
                       <a 
                         href={INSTAGRAM_URL}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 overflow-hidden relative"
                         style={{ 
                            background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                            boxShadow: "0 10px 25px -5px rgba(225,48,108,0.5)"
                         }}
                       >
                          <Camera className="w-5 h-5 text-white" />
                          <span className="text-white">Follow on Instagram</span>
                          <ExternalLink className="w-4 h-4 text-white opacity-70 ml-1" />
                       </a>
                    </div>
                 </motion.div>
              </ScrollReveal>
           </div>
           

        </div>
      </div>
    </section>
  );
}
