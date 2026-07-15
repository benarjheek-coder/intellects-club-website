"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin, BadgeCheck, Camera, Film, Heart, Calendar, CircleDashed, ArrowUpRight, Sparkles } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/icons/InstagramIcon";
import ScrollReveal from "@/components/effects/ScrollReveal";

const INSTAGRAM_URL = "https://www.instagram.com/intellects_srmramapuram/";

// =========================================================
// MINI COUNTER COMPONENT (Inside Card)
// =========================================================
const MiniCounter = ({ value, suffix, label, icon: Icon, color }: any) => {
  return (
    <div className="flex flex-col items-center text-center p-4 rounded-[16px] bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group shadow-lg h-full justify-center">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300`} />
      <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r ${color} opacity-30 group-hover:opacity-100 transition-opacity`} />
      
      <Icon className="w-6 h-6 text-white opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300 mb-3" />
      
      {value && (
        <div className="text-[28px] font-bold text-white tracking-tight leading-none mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          {value}{suffix}
        </div>
      )}
      
      <span className="text-[11px] font-bold text-gray-400 tracking-widest uppercase group-hover:text-gray-300 transition-colors">{label}</span>
    </div>
  );
};

// =========================================================
// MAIN COMPONENT
// =========================================================
export default function InstagramShowcase() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative w-full min-h-[900px] overflow-hidden bg-[#02040a] flex items-center justify-center pt-[100px] pb-40">
      
      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      {/* Interactive Spotlight */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 mix-blend-screen"
        style={{ background: `radial-gradient(1000px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(221,42,123,0.06), transparent 40%)` }}
      />
      
      {/* Enhanced Orbital Lines & Glowing Nebulas */}
      <div className="absolute top-1/4 -left-1/4 w-[1200px] h-[1200px] rounded-full border border-pink-500/10 pointer-events-none rotate-12 opacity-50" />
      <div className="absolute top-1/3 -right-1/4 w-[1500px] h-[1500px] rounded-full border border-orange-500/10 pointer-events-none -rotate-12 opacity-50" />
      
      <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-[#DD2A7B]/10 rounded-full blur-[200px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[#F58529]/10 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8134AF]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Floating 3D Instagram Icons */}
      <motion.div 
        animate={{ y: [-30, 30, -30], rotate: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[2%] md:left-[5%] w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4] opacity-40 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-[0_0_40px_rgba(221,42,123,0.3)] transform -rotate-12 z-0"
      >
        <Instagram className="w-8 h-8 md:w-12 md:h-12 text-white drop-shadow-lg" />
      </motion.div>

      <motion.div 
        animate={{ y: [30, -30, 30], rotate: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] right-[2%] md:right-[5%] w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-3xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4] opacity-40 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-[0_0_40px_rgba(221,42,123,0.3)] transform rotate-12 z-0 scale-75"
      >
        <Instagram className="w-6 h-6 md:w-10 md:h-10 text-white drop-shadow-lg" />
      </motion.div>

      <div className="container-premium relative z-10 w-full max-w-[1200px] mx-auto px-4 lg:px-8 flex flex-col items-center justify-center">
        
        {/* =========================================================
            HERO SECTION
        ========================================================= */}
        <ScrollReveal className="text-center flex flex-col items-center w-full max-w-[900px]">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] mb-[24px] backdrop-blur-md shadow-lg"
          >
            <span className="text-xs font-bold text-gray-300 tracking-widest uppercase">INSTAGRAM SHOWCASE</span>
          </motion.div>
          
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-[72px] font-black text-white tracking-tight leading-[1.1] mb-[28px]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            FOLLOW OUR<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] animate-gradient bg-[length:200%_auto] drop-shadow-[0_0_30px_rgba(221,42,123,0.3)]">
              JOURNEY
            </span>
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 leading-relaxed font-medium mb-[60px] max-w-[850px]"
          >
            Follow Intellects Club on Instagram for Workshops, Club Activities, Hackathons, Competitions, Behind The Scenes, Recruitment Updates, Event Highlights, Student Achievements, and Community Moments.
          </motion.p>
        </ScrollReveal>

        {/* =========================================================
            MAIN INSTAGRAM CARD
        ========================================================= */}
        <ScrollReveal direction="up" delay={0.3} className="w-full max-w-[1150px] mx-auto relative z-20">
          
          {/* Glowing Border Background */}
          <div className="absolute -inset-1 rounded-[34px] bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] blur-xl opacity-20 animate-pulse-slow" />
          
          {/* Card Container */}
          <div className="relative rounded-[34px] p-[1px] bg-gradient-to-br from-[#DD2A7B]/50 via-[#8134AF]/30 to-[#515BD4]/50 overflow-hidden shadow-[0_0_60px_rgba(221,42,123,0.15)] group/card hover:shadow-[0_0_80px_rgba(221,42,123,0.25)] transition-shadow duration-500">
            
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} 
              className="relative rounded-[32px] bg-[#050914]/90 backdrop-blur-3xl p-[40px] flex flex-col lg:flex-row items-center justify-center min-h-[420px]"
            >
              {/* Dynamic Glass Reflection */}
              <div 
                className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[32px]"
                style={{
                  background: `radial-gradient(1000px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(255,255,255,0.05), transparent 40%)`
                }}
              />

              {/* Floating Instagram Icon inside the card */}
              <div className="absolute top-8 right-8 w-12 h-12 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4] hidden md:flex items-center justify-center shadow-[0_0_20px_rgba(221,42,123,0.4)] animate-pulse-slow">
                <Instagram className="w-6 h-6 text-white" />
              </div>

              <div className="w-full flex flex-col lg:flex-row h-full">
                
                {/* =========================================================
                    LEFT COLUMN: PROFILE IMAGE (25%)
                ========================================================= */}
                <div className="w-full lg:w-[25%] flex items-center justify-center relative mb-10 lg:mb-0 lg:pr-8">
                  {/* Outer Glowing Rings (Instagram Story Style) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border-[3px] border-transparent bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4] style={{ maskImage: 'linear-gradient(#fff, #fff), linear-gradient(#fff, #fff)', maskClip: 'padding-box, border-box', maskComposite: 'exclude', WebkitMaskComposite: 'xor' }} p-[2px] animate-spin-slow shadow-[0_0_40px_rgba(221,42,123,0.3)]">
                     <div className="w-full h-full rounded-full bg-[#050914]" />
                  </div>
                  
                  {/* Inner Halos */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[190px] h-[190px] bg-[#DD2A7B]/20 rounded-full blur-xl pointer-events-none animate-pulse-slow" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-[#F58529]/20 rounded-full blur-lg pointer-events-none" />

                  {/* Perfect 1:1 Circular Logo Container (190x190px) */}
                  <div className="w-[190px] h-[190px] rounded-full bg-black overflow-hidden border-[4px] border-[#050914] z-10 flex items-center justify-center relative shadow-[0_0_30px_rgba(0,0,0,0.8)] aspect-square flex-shrink-0">
                    <img 
                      src="/images/logo.jpg" 
                      alt="Intellects Logo" 
                      className="w-full h-full object-contain p-[2px]" 
                      style={{ objectFit: "contain" }}
                    />
                  </div>

                  {/* Floating Particles */}
                  <div className="absolute top-[10%] right-[10%] w-3 h-3 rounded-full bg-[#DD2A7B] blur-[2px] animate-bounce pointer-events-none" style={{ animationDuration: '3s' }} />
                  <div className="absolute bottom-[10%] left-[10%] w-2 h-2 rounded-full bg-[#F58529] blur-[2px] animate-bounce pointer-events-none" style={{ animationDuration: '2.5s' }} />
                  <Heart className="absolute bottom-[20%] right-[5%] w-4 h-4 text-pink-500 animate-bounce" style={{ animationDuration: '4s' }} />
                </div>

                {/* =========================================================
                    RIGHT COLUMN: DETAILS & STATS (75%)
                ========================================================= */}
                <div className="w-full lg:w-[75%] flex flex-col justify-center relative z-10">
                  
                  {/* Header Information */}
                  <div className="flex flex-col items-center lg:items-start w-full">
                    
                    {/* Title & Badge */}
                    <div className="flex items-center gap-3 mb-[16px]">
                      <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                        Intellects Club
                      </h3>
                      <BadgeCheck className="w-8 h-8 text-blue-500 fill-blue-500/20 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                    </div>
                    
                    <div className="flex items-center gap-2 mb-[16px]">
                      <h4 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                        SRM Ramapuram
                      </h4>
                    </div>

                    <div className="text-gray-400 font-mono text-sm mb-[16px]">
                      @intellects_srmramapuram
                    </div>
                    
                    {/* Tags & Location */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-[16px] text-gray-300 font-medium text-sm md:text-base">
                      <div className="flex items-center gap-2">
                        <Camera className="w-5 h-5 text-pink-400" />
                        <span>Official Instagram</span>
                      </div>
                      <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20" />
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-purple-400" />
                        <span>Chennai, Tamil Nadu</span>
                      </div>
                      <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20" />
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-orange-400" />
                        <span>Student Community</span>
                      </div>
                    </div>
                    
                    {/* Bio */}
                    <div className="flex flex-col text-lg text-gray-300 mb-[32px] font-medium items-center lg:items-start">
                      <span>Creating.</span>
                      <span>Innovating.</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 mt-1">Inspiring Future Tech Leaders 🚀</span>
                    </div>

                  </div>

                  {/* Grid of Stats - 5 Equal Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[16px] xl:gap-[20px] mb-[30px] w-full">
                    <MiniCounter label="Posts" icon={Camera} color="from-pink-400 to-orange-400" />
                    <MiniCounter label="Reels" icon={Film} color="from-purple-400 to-pink-400" />
                    <MiniCounter label="Community" icon={Heart} color="from-red-400 to-pink-500" />
                    <MiniCounter label="Events" icon={Calendar} color="from-orange-400 to-yellow-400" />
                    <MiniCounter label="Stories" icon={CircleDashed} color="from-indigo-400 to-purple-400" />
                  </div>

                  {/* =========================================================
                      CTA BUTTON
                  ========================================================= */}
                  <a 
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-[60px] relative overflow-hidden rounded-[18px] flex items-center justify-between px-8 transition-all duration-300 group/btn hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(221,42,123,0.6)]"
                    style={{ background: "linear-gradient(90deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)" }}
                  >
                    {/* Light Sweep */}
                    <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-30 group-hover/btn:animate-sweep" />
                    </div>
                    
                    <div className="relative z-10 flex items-center gap-4">
                      <Instagram className="w-6 h-6 text-white group-hover/btn:scale-110 transition-transform duration-300" />
                      <span className="text-xl font-bold text-white tracking-wide">Follow on Instagram</span>
                    </div>
                    
                    <div className="relative z-10">
                      <ArrowUpRight className="w-7 h-7 text-white/90 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </div>
                  </a>

                </div>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
