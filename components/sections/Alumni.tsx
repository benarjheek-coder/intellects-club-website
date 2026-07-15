"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Crown, Diamond, FileText, Shield, Zap, Target, Palette, Smartphone, Sparkles, Settings, X } from "lucide-react";
import Image from "next/image";
import { ALUMNI_DATA } from "@/lib/data";

type Member = {
  name: string;
  role: string;
  image: string;
};

// Custom Premium President Crown
const CustomRoyalCrown = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2 19H22V21H2V19Z" fill="url(#goldGradientAlumni)" />
    <path d="M2 17L4 7L9 12L12 4L15 12L20 7L22 17H2Z" fill="url(#goldGradientAlumni)" stroke="#B8860B" strokeWidth="0.5"/>
    <circle cx="12" cy="15" r="1.5" fill="#8B5CF6" />
    <circle cx="7" cy="14" r="1" fill="#8B5CF6" />
    <circle cx="17" cy="14" r="1" fill="#8B5CF6" />
    <circle cx="12" cy="5" r="1" fill="#8B5CF6" />
    <circle cx="4.5" cy="7.5" r="0.8" fill="#8B5CF6" />
    <circle cx="19.5" cy="7.5" r="0.8" fill="#8B5CF6" />
    <defs>
      <linearGradient id="goldGradientAlumni" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#FFF8DC" />
        <stop offset="100%" stopColor="#DAA520" />
      </linearGradient>
    </defs>
  </svg>
);

const getRoleConfig = (role: string) => {
  const r = role.toLowerCase();
  
  if (r.includes("president") && !r.includes("vice")) {
    return {
      type: "president",
      badge: "PRESIDENT",
      outerGradient: "",
      glowColor: "rgba(255, 215, 0, 0.4)",
      icon: null,
      hoverLift: "-10px",
      imageZoom: "scale-[1.04]",
      outerBorder: "6px",
    };
  }
  
  if (r.includes("vice president")) {
    return {
      type: "vice-president",
      badge: "💎 VICE PRESIDENT",
      outerGradient: "from-gray-300 via-blue-400 to-gray-300",
      glowColor: "rgba(96, 165, 250, 0.5)",
      icon: Diamond,
    };
  }

  if (r.includes("secretary") && !r.includes("vice")) {
    return {
      type: "secretary",
      badge: "📜 SECRETARY",
      outerGradient: "from-emerald-400 via-emerald-600 to-yellow-500",
      glowColor: "rgba(16, 185, 129, 0.5)",
      icon: FileText,
    };
  }

  if (r.includes("vice secretary")) {
    return {
      type: "vice-secretary",
      badge: "🛡️ VICE SECRETARY",
      outerGradient: "from-purple-500 via-cyan-500 to-purple-500",
      glowColor: "rgba(168, 85, 247, 0.5)",
      icon: Shield,
    };
  }

  if (r.includes("technical")) {
    return {
      type: "technical",
      badge: role.toUpperCase(),
      outerGradient: "from-blue-400 via-cyan-400 to-blue-600",
      glowColor: "rgba(56, 189, 248, 0.6)",
      icon: Zap,
    };
  }

  if (r.includes("event") || r.includes("ops log")) {
    return {
      type: "event",
      badge: role.toUpperCase(),
      outerGradient: "from-orange-500 via-yellow-400 to-red-500",
      glowColor: "rgba(245, 158, 11, 0.6)",
      icon: Target,
    };
  }

  if (r.includes("creative")) {
    return {
      type: "creative",
      badge: role.toUpperCase(),
      outerGradient: "from-purple-500 via-pink-500 to-rose-400",
      glowColor: "rgba(236, 72, 153, 0.6)",
      icon: Palette,
    };
  }

  if (r.includes("social")) {
    return {
      type: "social",
      badge: role.toUpperCase(),
      outerGradient: "from-yellow-400 via-pink-500 to-purple-600",
      glowColor: "rgba(236, 72, 153, 0.6)",
      icon: Smartphone,
    };
  }

  return {
    type: "default",
    badge: role.toUpperCase(),
    outerGradient: "from-gray-500 via-gray-600 to-gray-700",
    glowColor: "rgba(156, 163, 175, 0.4)",
    icon: Sparkles,
  };
};

function PremiumAkankshaCard({ member }: { member: Member }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
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
    setIsHovered(false);
  };

  return (
    <div className="relative">
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={`relative w-full aspect-[3/4] cursor-pointer perspective-1000 group z-[5] ${isHovered ? 'z-[30]' : 'z-[5]'}`}
        animate={{ 
           y: isHovered ? -18 : 0, 
           scale: isHovered ? 1.05 : 1 
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25, duration: 0.45 }}
      >
        {/* LAYER 4: Floating neon energy outline (slightly detached, rotating) */}
        <div className={`absolute -inset-[18px] rounded-[40px] border-[1px] border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-transform duration-500 ease-out ${isHovered ? 'animate-[spin_4s_linear_infinite_reverse] scale-[1.02] border-cyan-300/80 shadow-[0_0_30px_rgba(6,182,212,0.8)]' : 'animate-[spin_12s_linear_infinite_reverse] scale-100'}`} style={{ borderStyle: 'dashed' }} />

        <motion.div
          className="absolute inset-0 rounded-[28px] transition-all duration-450 ease-out"
          style={{
            boxShadow: isHovered 
              ? `0 0 70px rgba(6, 182, 212, 0.9), 0 25px 45px rgba(0,0,0,0.9)` 
              : `0 0 25px rgba(6, 182, 212, 0.4), 0 10px 30px 0 rgba(0,0,0,0.7)`,
          }}
        >
          {/* LAYER 1: Electric blue plasma border with constant energy flowing */}
          <div className={`absolute inset-0 rounded-[28px] bg-[#02040a] overflow-hidden transition-all duration-450 ${isHovered ? 'shadow-[0_0_40px_rgba(59,130,246,0.8)]' : 'shadow-[0_0_20px_rgba(59,130,246,0.4)]'}`}>
            <div className={`absolute top-1/2 left-1/2 w-[250%] h-[250%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0_90deg,#06b6d4_180deg,#3b82f6_270deg,#a855f7_360deg)] ${isHovered ? 'animate-[spin_1.5s_linear_infinite]' : 'animate-[spin_4s_linear_infinite]'}`} />
            
            {/* Holographic Sweep (Passes over frame) */}
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/90 to-transparent skew-x-12 -translate-x-[150%] transition-transform duration-500 ease-out ${isHovered ? 'translate-x-[200%]' : ''}`} />
          </div>

          {/* INNER CONTAINER (Contains Layer 2 & 3) */}
          <div 
            className="absolute rounded-[24px] bg-[#02040a] overflow-hidden z-10 shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]"
            style={{ top: "4px", right: "4px", bottom: "4px", left: "4px" }}
          >
            {/* LAYER 2 & 3: Transparent holographic glass + Chrome border */}
            <div className="absolute inset-0 rounded-[24px] border-[2px] border-white/10 mix-blend-overlay backdrop-blur-[2px] z-20 pointer-events-none shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]" />
            <div className="absolute inset-[2px] rounded-[22px] border-[1px] border-cyan-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.9)] z-20 pointer-events-none mix-blend-screen overflow-hidden">
               {/* Metallic light sweep every 4s */}
               <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_4s_infinite]" />
            </div>

            {/* BACKGROUND EFFECTS */}
            <div className={`absolute inset-0 transition-all duration-450 ease-out ${isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-60'}`}>
              {/* Holographic aura & Nebula */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(6,182,212,0.5),transparent_60%)] animate-[pulse_6s_infinite]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(168,85,247,0.4),transparent_70%)] animate-[pulse_5s_infinite]" />
              
              {/* Subtle moving fog */}
              <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-[2px]" />
              
              {/* Cyber grid & tiny floating polygons */}
              <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" xmlns=\"http://www.w3.org/2000/svg\"><g stroke=\"%23FFF\" stroke-width=\"1\" fill=\"none\"><path d=\"M0 30V0h30\"/></g></svg>')" }} />
              
              {/* Animated blue light rays */}
              <div className={`absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_90deg,transparent_0_15deg,rgba(59,130,246,0.1)_30deg,transparent_45deg)] ${isHovered ? 'animate-[spin_8s_linear_infinite]' : 'animate-[spin_15s_linear_infinite]'}`} />

              {/* Glowing Stars & Energy Dust */}
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="absolute rounded-full bg-white shadow-[0_0_6px_#fff]" style={{
                  width: Math.random() > 0.5 ? '2px' : '1px',
                  height: Math.random() > 0.5 ? '2px' : '1px',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `pulse ${1 + Math.random() * 4}s infinite ${Math.random() * 2}s`
                }} />
              ))}
            </div>

            {/* CORNERS: Rotating cyber rings, glowing energy cores, orbiting particles, hexagon outline */}
            <div className="absolute top-[8px] left-[8px] w-8 h-8 z-30 flex items-center justify-center">
               <div className={`absolute w-full h-full border border-cyan-400/50 rounded-full border-dashed ${isHovered ? 'animate-[spin_2s_linear_infinite]' : 'animate-[spin_6s_linear_infinite]'}`} />
               <div className={`absolute w-6 h-6 border-[1.5px] border-blue-400/60 rounded-full border-dotted ${isHovered ? 'animate-[spin_1s_linear_infinite_reverse]' : 'animate-[spin_4s_linear_infinite_reverse]'}`} />
               <div className="w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_15px_#67e8f9] animate-pulse" />
               <div className="absolute w-8 h-8 border border-purple-500/30 rotate-45 animate-pulse" />
            </div>
            <div className="absolute top-[8px] right-[8px] w-8 h-8 z-30 flex items-center justify-center">
               <div className={`absolute w-full h-full border border-cyan-400/50 rounded-full border-dashed ${isHovered ? 'animate-[spin_2s_linear_infinite]' : 'animate-[spin_6s_linear_infinite]'}`} />
               <div className={`absolute w-6 h-6 border-[1.5px] border-blue-400/60 rounded-full border-dotted ${isHovered ? 'animate-[spin_1s_linear_infinite_reverse]' : 'animate-[spin_4s_linear_infinite_reverse]'}`} />
               <div className="w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_15px_#67e8f9] animate-pulse" />
               <div className="absolute w-8 h-8 border border-purple-500/30 rotate-45 animate-pulse" />
            </div>
            <div className="absolute bottom-[8px] left-[8px] w-8 h-8 z-30 flex items-center justify-center">
               <div className={`absolute w-full h-full border border-cyan-400/50 rounded-full border-dashed ${isHovered ? 'animate-[spin_2s_linear_infinite]' : 'animate-[spin_6s_linear_infinite]'}`} />
               <div className={`absolute w-6 h-6 border-[1.5px] border-blue-400/60 rounded-full border-dotted ${isHovered ? 'animate-[spin_1s_linear_infinite_reverse]' : 'animate-[spin_4s_linear_infinite_reverse]'}`} />
               <div className="w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_15px_#67e8f9] animate-pulse" />
               <div className="absolute w-8 h-8 border border-purple-500/30 rotate-45 animate-pulse" />
            </div>
            <div className="absolute bottom-[8px] right-[8px] w-8 h-8 z-30 flex items-center justify-center">
               <div className={`absolute w-full h-full border border-cyan-400/50 rounded-full border-dashed ${isHovered ? 'animate-[spin_2s_linear_infinite]' : 'animate-[spin_6s_linear_infinite]'}`} />
               <div className={`absolute w-6 h-6 border-[1.5px] border-blue-400/60 rounded-full border-dotted ${isHovered ? 'animate-[spin_1s_linear_infinite_reverse]' : 'animate-[spin_4s_linear_infinite_reverse]'}`} />
               <div className="w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_15px_#67e8f9] animate-pulse" />
               <div className="absolute w-8 h-8 border border-purple-500/30 rotate-45 animate-pulse" />
            </div>

            {/* EXPLODING PARTICLES & ELECTRIC ARCS (Hover only) */}
            <AnimatePresence>
              {isHovered && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                  {/* Exploding particles */}
                  {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                      animate={{ 
                         x: (Math.random() - 0.5) * 350, 
                         y: (Math.random() - 0.5) * 350,
                         scale: [0, Math.random() * 2 + 1.5, 0],
                         opacity: [1, 1, 0]
                      }}
                      transition={{ duration: 0.5 + Math.random() * 0.5, ease: "easeOut" }}
                      className="absolute top-1/2 left-1/2 rounded-full bg-cyan-300 blur-[1px]"
                      style={{ width: "3px", height: "3px" }}
                    />
                  ))}
                  {/* Electric Arcs traveling across border */}
                  <motion.div 
                    initial={{ left: '-10%', top: '0%' }}
                    animate={{ left: '110%', top: '0%' }}
                    transition={{ duration: 0.6, ease: "linear" }}
                    className="absolute w-20 h-[2px] bg-cyan-200 shadow-[0_0_15px_#22d3ee]"
                  />
                  <motion.div 
                    initial={{ right: '0%', top: '-10%' }}
                    animate={{ right: '0%', top: '110%' }}
                    transition={{ duration: 0.6, ease: "linear", delay: 0.1 }}
                    className="absolute w-[2px] h-20 bg-blue-300 shadow-[0_0_15px_#60a5fa]"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* FEATURED BADGE: CORE MEMBER (Top-right) */}
            <div className="absolute top-5 right-5 z-40 bg-white/10 backdrop-blur-md border border-white/30 px-3 py-1.5 rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-[pulse_4s_infinite]">
              <span className="text-[9px] font-black text-white tracking-[0.2em] relative z-10 flex items-center gap-1">
                 <Sparkles className="w-3 h-3 text-cyan-300 animate-spin" style={{ animationDuration: "3s" }} />
                 CORE MEMBER
              </span>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full animate-[shimmer_5s_infinite]" />
            </div>

            {/* IMAGE */}
            <div className="absolute inset-0 z-[10] flex items-center justify-center">
              {/* Holographic sweep passes over image on hover */}
              {isHovered && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent skew-x-12 -translate-x-[150%] animate-[shimmer_1s_forwards] z-[15] pointer-events-none mix-blend-screen" />}
              
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-all duration-450 ease-out"
                style={{ 
                   filter: isHovered 
                     ? "brightness(1.1) contrast(1.1) drop-shadow(0 0 30px rgba(6,182,212,0.7))" 
                     : "brightness(1) contrast(1.05) drop-shadow(0 15px 25px rgba(0,0,0,0.9))"
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              {/* Bottom gradient fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/60 to-transparent opacity-95 z-[11]" />
              
              {/* Soft bloom, blue rim lighting, cinematic depth */}
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(6,182,212,0.4)] z-[12] pointer-events-none mix-blend-screen" />
              <div className={`absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-transparent to-cyan-400/30 z-[12] mix-blend-overlay transition-opacity duration-450 ${isHovered ? 'opacity-100' : 'opacity-70'}`} />
            </div>

            {/* TEXT CONTENT */}
            <div 
              className="absolute bottom-0 left-0 right-0 p-8 z-40 flex flex-col items-center justify-end h-full text-center"
              style={{ transform: "translateZ(60px)" }}
            >
              {/* NAME */}
              <div className="relative overflow-hidden mb-4">
                 <h4 
                   className="text-[32px] font-black drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 tracking-[1px] animate-[pulse_3s_infinite]"
                   style={{ fontFamily: "var(--font-space-grotesk)" }}
                 >
                   {member.name}
                 </h4>
                 {/* Light shimmer every 5 seconds over the text */}
                 <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full animate-[shimmer_5s_infinite] mix-blend-overlay" />
              </div>
              
              {/* ROLE BADGE */}
              <div className="relative group/badge">
                {/* Blue neon glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-80 blur-[8px] animate-pulse" />
                <span className="relative flex items-center gap-2 bg-white/10 backdrop-blur-md border-[2px] border-cyan-400/50 px-6 py-2.5 rounded-full text-[12px] font-black uppercase tracking-[2px] shadow-[0_0_30px_rgba(6,182,212,0.6)] overflow-hidden">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-100 to-white drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]">
                       {member.role}
                    </span>
                    {/* Small holographic shine inside badge */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent -translate-x-full animate-[shimmer_4s_infinite]" />
                </span>
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function TiltProfileCard({ member }: { member: Member }) {
  if (member.name === "Akanksha Tirkala") {
    return <PremiumAkankshaCard member={member} />;
  }

  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const [isHovered, setIsHovered] = useState(false);
  const config = getRoleConfig(member.role);
  const Icon = config.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
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
    setIsHovered(false);
  };

  const renderOuterFrame = () => {
    switch (config.type) {
      case "president":
        return (
          <>
            <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-[#FFD700] via-[#FFF8DC] to-[#DAA520] bg-[length:200%_200%] animate-gradient shadow-[0_0_30px_rgba(255,215,0,0.5)]" style={{ animationDuration: '6s' }} />
            {isHovered && <div className="absolute inset-0 rounded-[24px] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(255,255,255,1)_360deg)] animate-spin-slow mix-blend-screen opacity-100" style={{ WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: "6px" }} />}
          </>
        );
      case "vice-president":
        return (
          <>
            <div className={`absolute inset-0 rounded-[24px] bg-gradient-to-tr ${config.outerGradient}`} />
            <div className={`absolute inset-0 rounded-[24px] bg-gradient-to-bl from-transparent via-white/50 to-transparent skew-x-12 transition-transform duration-1000 ${isHovered ? 'translate-x-[200%]' : '-translate-x-[150%]'}`} style={{ mixBlendMode: 'overlay' }} />
          </>
        );
      case "secretary":
        return (
          <>
            <div className={`absolute inset-0 rounded-[24px] bg-gradient-to-b ${config.outerGradient}`} />
            {isHovered && <div className="absolute inset-0 rounded-[24px] shadow-[inset_0_0_15px_rgba(250,204,21,0.5)]" />}
          </>
        );
      case "vice-secretary":
        return (
          <>
            <div className={`absolute inset-0 rounded-[24px] bg-gradient-to-r ${config.outerGradient}`} />
            <div className="absolute inset-0 rounded-[24px] border border-cyan-300/50" />
            <div className="absolute inset-[3px] rounded-[21px] border border-purple-400/50" />
          </>
        );
      case "technical":
        return (
          <>
            <div className={`absolute inset-0 rounded-[24px] bg-[#0f172a]`} />
            <div className={`absolute inset-0 rounded-[24px] border-2 border-blue-500/50 z-10 ${isHovered ? 'shadow-[0_0_15px_rgba(59,130,246,0.8),inset_0_0_15px_rgba(59,130,246,0.8)]' : ''}`} />
            <div className="absolute inset-0 rounded-[24px] overflow-hidden">
               <div className={`absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent ${isHovered ? 'animate-marquee' : 'opacity-0'}`} />
               <div className={`absolute bottom-0 right-0 w-full h-[5px] bg-gradient-to-l from-transparent via-blue-400 to-transparent ${isHovered ? 'animate-marquee' : 'opacity-0'}`} />
               <div className={`absolute top-0 left-0 w-[5px] h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent ${isHovered ? 'animate-marquee-vertical' : 'opacity-0'}`} />
               <div className={`absolute top-0 right-0 w-[5px] h-full bg-gradient-to-t from-transparent via-cyan-400 to-transparent ${isHovered ? 'animate-marquee-vertical' : 'opacity-0'}`} />
            </div>
          </>
        );
      case "event":
        return (
          <>
            <div className={`absolute inset-0 rounded-[24px] bg-gradient-to-br ${config.outerGradient}`} />
            {isHovered && <div className="absolute inset-0 rounded-[24px] bg-[conic-gradient(from_0deg_at_50%_100%,rgba(255,255,255,0.8)_0deg,transparent_60deg,transparent_300deg,rgba(255,255,255,0.8)_360deg)] opacity-60 mix-blend-overlay animate-pulse" />}
          </>
        );
      case "creative":
        return (
          <>
            <div className={`absolute inset-0 rounded-[24px] bg-gradient-to-r ${config.outerGradient} animate-gradient bg-[length:200%_200%]`} />
            <div className="absolute inset-0 rounded-[24px] bg-black/10 backdrop-blur-[1px]" />
          </>
        );
      case "social":
        return (
          <>
            <div className={`absolute inset-0 rounded-[24px] bg-gradient-to-tr ${config.outerGradient} ${isHovered ? 'animate-pulse' : ''}`} />
          </>
        );
      default:
        return (
           <div className={`absolute inset-0 rounded-[24px] bg-gradient-to-br ${config.outerGradient}`} />
        );
    }
  };

  const renderInnerFrame = () => {
    switch (config.type) {
      case "president":
        return (
          <>
            <div className="absolute inset-[6px] border-[2px] border-white/50 rounded-[14px] z-20 pointer-events-none transition-colors duration-500 shadow-[0_0_15px_rgba(255,255,255,0.3)]" style={{ borderColor: isHovered ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)' }} />
            <div className="absolute top-[2px] left-[2px] w-[14px] h-[14px] rotate-45 bg-gradient-to-br from-[#FFD700] to-[#B8860B] border border-yellow-200 shadow-[0_0_12px_#8B5CF6] z-20 rounded-[2px]" />
            <div className="absolute top-[2px] right-[2px] w-[14px] h-[14px] rotate-45 bg-gradient-to-br from-[#FFD700] to-[#B8860B] border border-yellow-200 shadow-[0_0_12px_#8B5CF6] z-20 rounded-[2px]" />
            <div className="absolute bottom-[2px] left-[2px] w-[14px] h-[14px] rotate-45 bg-gradient-to-br from-[#FFD700] to-[#B8860B] border border-yellow-200 shadow-[0_0_12px_#8B5CF6] z-20 rounded-[2px]" />
            <div className="absolute bottom-[2px] right-[2px] w-[14px] h-[14px] rotate-45 bg-gradient-to-br from-[#FFD700] to-[#B8860B] border border-yellow-200 shadow-[0_0_12px_#8B5CF6] z-20 rounded-[2px]" />
          </>
        );
      case "vice-president":
        return (
          <div className="absolute inset-[6px] border-[2px] border-blue-300/40 rounded-[13px] z-20 pointer-events-none" style={{ clipPath: 'polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)' }} />
        );
      case "secretary":
        return (
          <div className="absolute inset-[8px] border-[2px] border-emerald-500/50 rounded-[11px] z-20 pointer-events-none shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]" />
        );
      case "vice-secretary":
        return (
          <>
            <div className="absolute inset-[5px] border-[2px] border-cyan-500/40 rounded-[14px] z-20 pointer-events-none" />
            <div className="absolute top-[4px] left-[50%] -translate-x-1/2 w-8 h-3 bg-purple-500 rounded-b-full z-20" />
            <div className="absolute bottom-[4px] left-[50%] -translate-x-1/2 w-8 h-3 bg-cyan-500 rounded-t-full z-20" />
          </>
        );
      case "technical":
        return (
          <>
            <div className="absolute inset-[5px] border border-blue-400/30 rounded-[14px] z-20 pointer-events-none" />
            <div className="absolute top-[4px] left-[4px] w-2 h-2 rounded-full bg-cyan-400 z-20 shadow-[0_0_5px_#22d3ee]" />
            <div className="absolute top-[4px] right-[4px] w-2 h-2 rounded-full bg-cyan-400 z-20 shadow-[0_0_5px_#22d3ee]" />
            <div className="absolute bottom-[4px] left-[4px] w-2 h-2 rounded-full bg-blue-400 z-20 shadow-[0_0_5px_#60a5fa]" />
            <div className="absolute bottom-[4px] right-[4px] w-2 h-2 rounded-full bg-blue-400 z-20 shadow-[0_0_5px_#60a5fa]" />
          </>
        );
      case "event":
        return (
          <div className="absolute inset-[4px] border-[2px] border-orange-500/40 rounded-[15px] z-20 pointer-events-none border-dashed" />
        );
      case "creative":
        return (
          <>
            <div className="absolute inset-[4px] border-[2px] border-pink-500/50 rounded-[15px] z-20 pointer-events-none rotate-[0.5deg]" />
            <div className="absolute inset-[4px] border-[2px] border-purple-500/50 rounded-[15px] z-20 pointer-events-none -rotate-[0.5deg]" />
          </>
        );
      case "social":
        return (
          <div className={`absolute inset-[5px] border-[2px] border-white/20 rounded-[14px] z-20 pointer-events-none transition-all duration-300 ${isHovered ? 'shadow-[0_0_15px_rgba(255,255,255,0.3),inset_0_0_15px_rgba(255,255,255,0.3)]' : ''}`} />
        );
      default:
        return (
          <div className="absolute inset-[4px] border-[2px] border-white/10 rounded-[15px] z-20 pointer-events-none" />
        );
    }
  };

  const renderParticles = () => {
    if (!isHovered) return null;
    
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-[19px]"
      >
        {config.type === 'event' && Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -60, 0], x: [0, (i % 2 === 0 ? 30 : -30), 0], opacity: [0, 0.8, 0], scale: [0, 1.5, 0] }}
            transition={{ duration: 1 + Math.random() * 2, repeat: Infinity, delay: Math.random() }}
            className={`absolute rounded-full bg-yellow-400 blur-[1px]`}
            style={{ width: Math.random() * 4 + 2 + "px", height: Math.random() * 4 + 2 + "px", left: Math.random() * 100 + "%", top: (40 + Math.random() * 60) + "%" }}
          />
        ))}

        {config.type === 'social' && (
           <>
             <motion.div animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-[20%] right-[10%] w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg">❤</motion.div>
             <motion.div animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }} transition={{ duration: 2, delay: 1, repeat: Infinity }} className="absolute top-[40%] left-[10%] w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg">👍</motion.div>
           </>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full aspect-[3/4] cursor-pointer perspective-1000 group transition-transform duration-500 ${isHovered ? 'scale-[1.03] z-[20]' : 'scale-100 z-[5]'}`}
    >
      <motion.div
        className="absolute inset-0 rounded-[24px] transition-all duration-300"
        style={{
          boxShadow: isHovered 
            ? `0 0 35px ${config.glowColor}, 0 15px 30px rgba(0,0,0,0.6)` 
            : `0 10px 30px 0 rgba(0,0,0,0.7)`,
          transform: isHovered ? `translateY(${config.hoverLift || "-10px"})` : "translateY(0)"
        }}
      >
        {/* Crown removed by user request */}
        <div className="absolute inset-0 rounded-[24px] overflow-hidden">
          {renderOuterFrame()}
        </div>

        <div 
          className="absolute rounded-[19px] bg-[#030712] overflow-hidden z-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.9)]"
          style={{ top: config.outerBorder || "5px", right: config.outerBorder || "5px", bottom: config.outerBorder || "5px", left: config.outerBorder || "5px" }}
        >
           {renderInnerFrame()}

           {Icon && (
             <div className={`absolute top-4 right-4 z-30 transition-all duration-500 ${isHovered ? 'scale-125 opacity-100 drop-shadow-[0_0_10px_rgba(255,255,255,1)]' : 'scale-100 opacity-80'}`}>
               <Icon className="w-6 h-6 text-white" />
             </div>
           )}

           <AnimatePresence>
             {renderParticles()}
           </AnimatePresence>

           <div 
             className={`absolute inset-0 z-30 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full transition-transform duration-1000 ${isHovered ? 'translate-x-[200%]' : ''}`}
           />

           <div className="absolute inset-0 z-[5]">
             <Image
               src={member.image}
               alt={member.name}
               fill
               className={`object-cover transition-transform duration-700 ease-out ${isHovered ? (config.imageZoom || "scale-[1.05]") : "scale-100"}`}
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
             />
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Alumni() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectedMember(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedMember]);

  const ALUMNI_CATEGORIES = [
    { name: "All", icon: Sparkles },
    { name: "Executive Committee", icon: Crown },
    { name: "Technical & Innovation", icon: Zap },
    { name: "Event Management", icon: Target },
    { name: "Creative & Content", icon: Palette },
    { name: "Social Media", icon: Smartphone },
    { name: "Operations", icon: Settings }
  ];
  
  const filteredGroups = activeTab === "All"
    ? ALUMNI_DATA
    : ALUMNI_DATA.filter(g => g.category === activeTab);

  const scrollToLeadership = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative w-full overflow-hidden mt-[100px] pt-[70px] pb-[100px]" id="alumni">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-[500px] bg-purple-900/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="container-premium relative z-10">
        
        <div className="text-center flex flex-col items-center" style={{ marginBottom: "40px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-purple-500/30 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-sm font-medium text-purple-300 tracking-wider uppercase">OUR LEGACY</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400"
          >
            Meet Our Alumni Leaders
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-[850px] mx-auto leading-relaxed"
          >
            These remarkable leaders laid the foundation of Intellects Club and helped build the community through innovation, leadership, teamwork, and dedication. Their contributions continue to inspire every new generation of members.
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="w-full" style={{ marginBottom: "60px" }}>
          <div className="w-full pb-4 overflow-x-auto lg:overflow-visible scrollbar-hide">
            <div className="w-fit mx-auto flex flex-nowrap items-center justify-center gap-3 lg:gap-4 xl:gap-5 px-4 py-2">
            {ALUMNI_CATEGORIES.map(category => {
                const isActive = activeTab === category.name;
                const Icon = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => setActiveTab(category.name)}
                    className={`relative w-auto flex-shrink-0 flex items-center justify-center gap-2 lg:gap-3 text-[14px] lg:text-[15px] font-semibold whitespace-nowrap transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] overflow-hidden group px-6 lg:px-8 xl:px-10 h-[44px] lg:h-[48px] rounded-[12px] ${
                      isActive 
                        ? 'text-white border-[2px] border-purple-400 bg-gradient-to-r from-purple-500 to-blue-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]' 
                        : 'text-white border-[1.5px] border-[#9370DB]/35 bg-[#14141E]/55 backdrop-blur-[12px]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 lg:w-5 lg:h-5 transition-colors flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-purple-400'}`} />
                    <span>{category.name}</span>
                  </button>
                );
              })}
          </div>
        </div>
        </div>

        <div className="min-h-[500px]">
          <AnimatePresence mode="popLayout">
            {filteredGroups.map((group, index) => (
              <motion.div 
                key={group.category}
                className="w-full flex flex-col rounded-3xl transition-all duration-700"
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative z-30">
                  <h3 className="text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {group.category}
                  </h3>
                </div>

                <div className="relative" style={{ perspective: "1000px", marginTop: "30px", paddingTop: "30px", zIndex: 5 }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10 items-end">
                    {group.members.map((member) => (
                      <div key={member.name} onClick={() => setSelectedMember(member)}>
                        <TiltProfileCard member={member} />
                      </div>
                    ))}
                  </div>
                </div>

                {index < filteredGroups.length - 1 && (
                  <div className="w-full flex justify-center" style={{ marginTop: "30px", marginBottom: "50px" }}>
                    <div className="w-[70%] h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full flex flex-col items-center justify-center pt-24 pb-32"
        >
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
            <h3 className="text-3xl font-bold text-white mb-6">Their Legacy Lives On</h3>
            <p className="text-gray-400 text-lg leading-[1.8] mb-9 px-4">
              Every successful generation of Intellects Club stands on the dedication and leadership of those who came before. We proudly recognize our alumni leaders whose passion helped shape the club into the thriving technical community it is today.
            </p>
            <button 
              onClick={scrollToLeadership}
              className="group relative px-8 py-4 rounded-full font-bold text-white overflow-hidden inline-flex justify-center items-center transition-all hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.8), rgba(6,182,212,0.8))",
                boxShadow: "0 0 30px rgba(124,58,237,0.3)"
              }}
            >
              <span className="relative z-10">View Current Leadership</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </motion.div>

      </div>

      {/* Cinematic Lightbox Modal */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                background: "rgba(0,0,0,0.85)",
                backdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              className="p-4 md:p-8"
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center bg-[#030712] border border-gray-800"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-all hover:scale-110 shadow-lg backdrop-blur-md"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
