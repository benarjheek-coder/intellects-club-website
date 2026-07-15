"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { Crown, Diamond, FileText, Shield, Zap, Target, Palette, Smartphone, Sparkles, X } from "lucide-react";
import Image from "next/image";
import { LEADERSHIP_DATA } from "@/lib/data";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/effects/ScrollReveal";
import PremiumPresidentModal from "./PremiumPresidentModal";

type Member = {
  name: string;
  role: string;
  image: string;
};

// Custom Premium President Crown
const CustomRoyalCrown = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2 19H22V21H2V19Z" fill="url(#goldGradient)" />
    <path d="M2 17L4 7L9 12L12 4L15 12L20 7L22 17H2Z" fill="url(#goldGradient)" stroke="#B8860B" strokeWidth="0.5"/>
    <circle cx="12" cy="15" r="1.5" fill="#8B5CF6" />
    <circle cx="7" cy="14" r="1" fill="#8B5CF6" />
    <circle cx="17" cy="14" r="1" fill="#8B5CF6" />
    <circle cx="12" cy="5" r="1" fill="#8B5CF6" />
    <circle cx="4.5" cy="7.5" r="0.8" fill="#8B5CF6" />
    <circle cx="19.5" cy="7.5" r="0.8" fill="#8B5CF6" />
    <defs>
      <linearGradient id="goldGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#FFF8DC" />
        <stop offset="100%" stopColor="#DAA520" />
      </linearGradient>
    </defs>
  </svg>
);

// ==========================================
// TRADING CARD FRAME CONFIGURATION
// ==========================================
const getRoleConfig = (role: string) => {
  const r = role.toLowerCase();
  
  if (r.includes("president") && !r.includes("vice")) {
    return {
      type: "president",
      badge: "PRESIDENT",
      outerGradient: "", // handled custom
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

  if (r.includes("event")) {
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

  // Default
  return {
    type: "default",
    badge: role.toUpperCase(),
    outerGradient: "from-gray-500 via-gray-600 to-gray-700",
    glowColor: "rgba(156, 163, 175, 0.4)",
    icon: Sparkles,
  };
};

// ==========================================
// TRADING CARD COMPONENT
// ==========================================
function PremiumTanishqaCard({ member, onClick }: { member: Member; onClick: () => void }) {
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
      {/* BOTTOM GLOW PLATFORM */}
      <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-[120%] h-12 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.6),transparent_70%)] blur-md transition-all duration-500 ease-out z-0 ${isHovered ? 'scale-110 opacity-100' : 'scale-90 opacity-60'} animate-[pulse_4s_infinite]`} style={{ transform: `translateX(-50%) rotateX(70deg)` }} />

      <motion.div
        ref={ref}
        onClick={onClick}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={`relative w-full aspect-[3/4] cursor-pointer perspective-1000 group z-[5] ${isHovered ? 'z-[30]' : 'z-[5]'}`}
        animate={{ 
           y: isHovered ? -20 : 0, 
           scale: isHovered ? 1.06 : 1 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20, duration: 0.5 }}
      >
        {/* FLOATING ENERGY RING (Layer 4) */}
        <div className={`absolute -inset-[15px] rounded-[38px] border-[2px] border-cyan-400/30 transition-transform duration-500 ${isHovered ? 'animate-[spin_4s_linear_infinite] scale-105' : 'animate-[spin_10s_linear_infinite] scale-100'}`} style={{ borderStyle: 'dashed', maskImage: 'radial-gradient(circle, black, transparent)' }} />
        <div className={`absolute -inset-[15px] rounded-[38px] border-[1px] border-blue-500/50 transition-transform duration-500 ${isHovered ? 'animate-[spin_3s_linear_infinite_reverse] scale-105' : 'animate-[spin_8s_linear_infinite_reverse] scale-100'}`} style={{ borderStyle: 'dotted' }} />

        <motion.div
          className="absolute inset-0 rounded-[26px] transition-all duration-500 ease-out"
          style={{
            boxShadow: isHovered 
              ? `0 0 60px rgba(6, 182, 212, 0.8), 0 20px 40px rgba(0,0,0,0.9)` 
              : `0 0 25px rgba(6, 182, 212, 0.4), 0 10px 30px 0 rgba(0,0,0,0.7)`,
          }}
        >
          {/* LAYER 1: Thick electric blue animated gradient border */}
          <div className="absolute inset-0 rounded-[26px] bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 bg-[length:300%_300%] animate-gradient overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            
            {/* Animated Energy: flowing electric energy around border */}
            <div className={`absolute top-1/2 left-1/2 w-[250%] h-[250%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0_300deg,#06b6d4_360deg)] ${isHovered ? 'animate-[spin_1.5s_linear_infinite]' : 'animate-[spin_3s_linear_infinite]'}`} />
            
            {/* Holographic shine sweep */}
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/90 to-transparent skew-x-12 -translate-x-[150%] transition-transform duration-500 ease-out ${isHovered ? 'translate-x-[200%]' : ''}`} />
          </div>

          {/* INNER CONTAINER */}
          <div 
            className="absolute rounded-[22px] bg-[#02040a] overflow-hidden z-10 shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]"
            style={{ top: "4px", right: "4px", bottom: "4px", left: "4px" }}
          >
            {/* LAYER 2 & 3: Transparent glass frosted border + Metallic chrome inner edge */}
            <div className="absolute inset-0 rounded-[22px] border-[2px] border-white/20 mix-blend-overlay backdrop-blur-[2px] shadow-[inset_0_0_15px_rgba(255,255,255,0.3)] z-20 pointer-events-none" />
            <div className="absolute inset-[2px] rounded-[20px] border-[1px] border-cyan-300/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.8)] z-20 pointer-events-none mix-blend-screen" />

            {/* BACKGROUND EFFECTS */}
            <div className={`absolute inset-0 transition-all duration-500 ease-out ${isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-70'}`}>
              {/* Aurora glow / Nebula */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(59,130,246,0.4),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(168,85,247,0.3),transparent_70%)]" />
              {/* Soft blue fog */}
              <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-[1px]" />
              {/* Subtle hex grid */}
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"28\" height=\"49\" viewBox=\"0 0 28 49\" xmlns=\"http://www.w3.org/2000/svg\"><g stroke=\"%23FFF\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><path d=\"M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM14 0v9.25m0 39.5V49\"/></g></svg>')" }} />
              
              {/* Floating stars & twinkling */}
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="absolute rounded-full bg-white shadow-[0_0_5px_#fff]" style={{
                  width: Math.random() > 0.5 ? '2px' : '1px',
                  height: Math.random() > 0.5 ? '2px' : '1px',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `pulse ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`
                }} />
              ))}
              
              {/* Animated light rays */}
              <div className={`absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_90deg,transparent_0_15deg,rgba(255,255,255,0.05)_30deg,transparent_45deg)] ${isHovered ? 'animate-[spin_10s_linear_infinite]' : 'animate-[spin_20s_linear_infinite]'}`} />
            </div>

            {/* CORNER DECORATIONS */}
            {/* Cyber brackets */}
            <div className="absolute top-[6px] left-[6px] w-6 h-6 border-t-[2px] border-l-[2px] border-cyan-400 z-30 rounded-tl-[12px] shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            <div className="absolute top-[6px] right-[6px] w-6 h-6 border-t-[2px] border-r-[2px] border-cyan-400 z-30 rounded-tr-[12px] shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            <div className="absolute bottom-[6px] left-[6px] w-6 h-6 border-b-[2px] border-l-[2px] border-cyan-400 z-30 rounded-bl-[12px] shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            <div className="absolute bottom-[6px] right-[6px] w-6 h-6 border-b-[2px] border-r-[2px] border-cyan-400 z-30 rounded-br-[12px] shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            
            {/* Rotating circular nodes */}
            <div className={`absolute top-[10px] left-[10px] w-2 h-2 rounded-full border border-cyan-300 z-30 flex items-center justify-center ${isHovered ? 'animate-[spin_1s_linear_infinite]' : 'animate-[spin_3s_linear_infinite]'}`}>
               <div className="w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_10px_#67e8f9] animate-pulse" />
            </div>
            <div className={`absolute top-[10px] right-[10px] w-2 h-2 rounded-full border border-cyan-300 z-30 flex items-center justify-center ${isHovered ? 'animate-[spin_1s_linear_infinite]' : 'animate-[spin_3s_linear_infinite]'}`}>
               <div className="w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_10px_#67e8f9] animate-pulse" />
            </div>
            <div className={`absolute bottom-[10px] left-[10px] w-2 h-2 rounded-full border border-cyan-300 z-30 flex items-center justify-center ${isHovered ? 'animate-[spin_1s_linear_infinite]' : 'animate-[spin_3s_linear_infinite]'}`}>
               <div className="w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_10px_#67e8f9] animate-pulse" />
            </div>
            <div className={`absolute bottom-[10px] right-[10px] w-2 h-2 rounded-full border border-cyan-300 z-30 flex items-center justify-center ${isHovered ? 'animate-[spin_1s_linear_infinite]' : 'animate-[spin_3s_linear_infinite]'}`}>
               <div className="w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_10px_#67e8f9] animate-pulse" />
            </div>
            
            {/* EXPLODING PARTICLES (Hover only) */}
            <AnimatePresence>
              {isHovered && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                      animate={{ 
                         x: (Math.random() - 0.5) * 300, 
                         y: (Math.random() - 0.5) * 300,
                         scale: [0, Math.random() * 2 + 1, 0],
                         opacity: [1, 1, 0]
                      }}
                      transition={{ duration: 0.6 + Math.random() * 0.5, ease: "easeOut" }}
                      className="absolute top-1/2 left-1/2 rounded-full bg-cyan-300 blur-[1px]"
                      style={{ width: "4px", height: "4px" }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* FEATURED MEMBER BADGE (Top-right) */}
            <div className="absolute top-5 right-5 z-40 bg-white/10 backdrop-blur-md border border-white/30 px-3 py-1.5 rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-[pulse_4s_infinite]">
              <span className="text-[9px] font-black text-white tracking-[0.2em] relative z-10 flex items-center gap-1">
                 <Sparkles className="w-3 h-3 text-cyan-300" />
                 FEATURED MEMBER
              </span>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
            </div>

            {/* IMAGE */}
            <div className="absolute inset-0 z-[10] flex items-center justify-center">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className={`object-cover transition-all duration-500 ease-out`}
                style={{ 
                   filter: isHovered 
                     ? "brightness(1.1) contrast(1.05) drop-shadow(0 0 20px rgba(59,130,246,0.6))" 
                     : "brightness(1) contrast(1.0) drop-shadow(0 15px 20px rgba(0,0,0,0.8))"
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              {/* Bottom gradient fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/60 to-transparent opacity-95 z-[11]" />
              
              {/* Edge Lighting & Cinematic Rim Light & Bloom */}
              <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(6,182,212,0.3)] z-[12] pointer-events-none mix-blend-screen" />
              <div className={`absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-cyan-400/20 z-[12] mix-blend-overlay transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-60'}`} />
            </div>

            {/* TEXT CONTENT */}
            <div 
              className="absolute bottom-0 left-0 right-0 p-8 z-40 flex flex-col items-center justify-end h-full text-center"
              style={{ transform: "translateZ(50px)" }}
            >
              {/* NAME */}
              <h4 
                className="text-[32px] font-black mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-cyan-300 tracking-[1px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {member.name}
              </h4>
              
              {/* ROLE BADGE */}
              <div className="relative group/badge">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-70 blur-[6px] animate-pulse" />
                <span className="relative flex items-center gap-2 bg-white/10 backdrop-blur-md border-[1.5px] border-white/30 px-6 py-2.5 rounded-full text-[12px] font-black uppercase tracking-[2px] shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                    <Palette className="w-4 h-4 text-cyan-300 drop-shadow-[0_0_8px_#67e8f9]" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-100 to-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                       {member.role}
                    </span>
                </span>
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function TiltProfileCard({ member, onClick }: { member: Member; onClick: () => void }) {
  if (member.name === "Tanishqa") {
    return <PremiumTanishqaCard member={member} onClick={onClick} />;
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

  // 1. OUTER 5px FRAME RENDERER
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
            {/* Animated PCB Circuit Lines traversing border */}
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

  // 2. INNER 2px FRAME RENDERER (Overlays inside the dark card background)
  const renderInnerFrame = () => {
    switch (config.type) {
      case "president":
        return (
          <>
            {/* 2px semi-transparent white inner border */}
            <div className="absolute inset-[6px] border-[2px] border-white/50 rounded-[14px] z-20 pointer-events-none transition-colors duration-500 shadow-[0_0_15px_rgba(255,255,255,0.3)]" style={{ borderColor: isHovered ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)' }} />
            {/* Premium Engraved Diamond Corners */}
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
        onClick={onClick}
      >
        {/* TOP CROWN DECORATION (President Only) */}
        {config.type === 'president' && (
          <div className="absolute -top-[20px] left-1/2 -translate-x-1/2 z-[6] flex flex-col items-center w-full px-12">
            <div className="relative flex items-center justify-center w-full">
               <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-70" />
               <div className="absolute w-2 h-2 rotate-45 bg-[#FFD700] left-[15%]" />
               <div className="absolute w-2 h-2 rotate-45 bg-[#FFD700] right-[15%]" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#030712] rounded-full p-2">
                 <CustomRoyalCrown className={`w-[46px] h-[46px] drop-shadow-[0_0_15px_rgba(255,215,0,0.8)] transition-all duration-700 ${isHovered ? 'scale-110 drop-shadow-[0_0_25px_rgba(255,215,0,1)]' : ''}`} />
                 {isHovered && <div className="absolute top-[10%] right-[10%] w-2 h-2 bg-white rounded-full blur-[1px] animate-ping" />}
               </div>
            </div>
          </div>
        )}

        {/* 1. THE CONTINUOUS OUTER BORDER */}
        <div className="absolute inset-0 rounded-[24px] overflow-hidden">
          {renderOuterFrame()}
        </div>

        {/* 2. THE INNER CARD CONTAINER */}
        <div 
          className="absolute rounded-[19px] bg-[#030712] overflow-hidden z-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.9)]"
          style={{ top: config.outerBorder || "5px", right: config.outerBorder || "5px", bottom: config.outerBorder || "5px", left: config.outerBorder || "5px" }}
        >
           
           {/* Inner 2px Frame Line & Corner Ornaments */}
           {renderInnerFrame()}

           {/* Icon Badge at Top Right */}
           {Icon && (
             <div className={`absolute top-4 right-4 z-30 transition-all duration-500 ${isHovered ? 'scale-125 opacity-100 drop-shadow-[0_0_10px_rgba(255,255,255,1)]' : 'scale-100 opacity-80'}`}>
               <Icon className="w-6 h-6 text-white" />
             </div>
           )}

           {/* Animated Particles & Overlay Effects inside the inner frame */}
           <AnimatePresence>
             {renderParticles()}
           </AnimatePresence>

           {/* Standard Hover Shine Sweep */}
           <div 
             className={`absolute inset-0 z-30 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full transition-transform duration-1000 ${isHovered ? 'translate-x-[200%]' : ''}`}
           />

           {/* Image Background */}
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

export default function Leadership() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [activeTab, setActiveTab] = useState("All");
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

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#leadership-")) {
        const section = hash.replace("#leadership-", "");
        let tabName = "All";
        if (section === "executive") tabName = "Executive Committee";
        else if (section === "technical") tabName = "Technical Team";
        else if (section === "events") tabName = "Event Management";
        else if (section === "creative") tabName = "Creative Team";
        else if (section === "social") tabName = "Social Media Team";
        
        setActiveTab(tabName);
        
        // Wait for framer-motion AnimatePresence to render
        setTimeout(() => {
           const id = `team-${tabName.replace(/\s+/g, '-')}`;
           const el = document.getElementById(id);
           if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({ top: y, behavior: 'smooth' });
              
              el.classList.add('highlight-glow-effect');
              setTimeout(() => {
                el.classList.remove('highlight-glow-effect');
              }, 2000);
           }
        }, 400);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const CATEGORIES = [
    { name: "All", icon: Sparkles },
    { name: "Executive Committee", icon: Crown },
    { name: "Technical Team", icon: Zap },
    { name: "Event Management", icon: Target },
    { name: "Creative Team", icon: Palette },
    { name: "Social Media Team", icon: Smartphone }
  ];
  
  const filteredGroups = activeTab === "All"
    ? LEADERSHIP_DATA
    : LEADERSHIP_DATA.filter(g => g.category === activeTab);

  return (
    <section
      id="leadership"
      className="section-spacing relative w-full flex justify-center overflow-hidden"
      style={{ backgroundColor: "#02040a" }}
      aria-labelledby="leadership-heading"
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="container-premium relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center flex flex-col items-center" style={{ marginBottom: "40px" }}>
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <span className="badge badge-purple shadow-[0_0_15px_rgba(168,85,247,0.4)]">Our People</span>
          </div>
          <h2
            id="leadership-heading"
            className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight text-center"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Meet Our <span className="gradient-text-purple">Leadership</span>
          </h2>
          <div className="text-center mx-auto px-4" style={{ maxWidth: "760px", fontSize: "18px", lineHeight: "1.8", color: "rgba(255,255,255,0.82)" }}>
            <p className="mb-4">
              Meet the passionate leaders driving innovation, technology, creativity, and impactful initiatives at Intellects Club, SRM Institute of Science and Technology, Ramapuram.
            </p>
            <p>
              Our leadership team inspires innovation, empowers students, organizes impactful events, and builds a collaborative technical community where future leaders grow through real-world experience.
            </p>
          </div>
        </ScrollReveal>

        {/* Tab Navigation */}
        <ScrollReveal className="w-full pb-4" style={{ marginBottom: "60px" }}>
          <div className="w-full overflow-x-auto lg:overflow-visible scrollbar-hide">
            <div className="w-fit mx-auto flex flex-nowrap items-center justify-center gap-3 lg:gap-4 xl:gap-5 px-4 py-2">
              {CATEGORIES.map(category => {
                const isActive = activeTab === category.name;
                const Icon = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => setActiveTab(category.name)}
                    className={`relative w-auto flex-shrink-0 flex items-center justify-center gap-2 lg:gap-3 text-[15px] lg:text-[16px] font-semibold whitespace-nowrap transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] overflow-hidden group px-6 lg:px-8 xl:px-10 h-[44px] lg:h-[48px] rounded-[12px] ${
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
        </ScrollReveal>

        {/* Categories */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="popLayout">
            {filteredGroups.map((group, index) => (
              <motion.div 
                key={group.category}
                id={`team-${group.category.replace(/\s+/g, '-')}`} 
                className="w-full flex flex-col rounded-3xl transition-all duration-700"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                {/* Heading */}
                <ScrollReveal delay={0.1} className="relative" style={{ zIndex: 30 }}>
                  <h3 className="text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {group.category}
                  </h3>
                </ScrollReveal>

                {/* 60px gap between heading and cards */}
                <div className="relative" style={{ perspective: "1000px", marginTop: "30px", paddingTop: "30px", zIndex: 5 }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10 items-end">
                    {group.members.map((member) => (
                      <TiltProfileCard key={member.name} member={member} onClick={() => setSelectedMember(member)} />
                    ))}
                  </div>
                </div>

                {/* Divider Line (only if not the last category) */}
                {index < filteredGroups.length - 1 && (
                  <div className="w-full flex justify-center" style={{ marginTop: "30px", marginBottom: "50px" }}>
                    <div className="w-full h-[2.5px] rounded-full bg-gradient-to-r from-purple-500/70 to-blue-500/70 shadow-[0_0_10px_rgba(168,85,247,0.4)]" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Lightbox Modal */}
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
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              className="p-4"
              onClick={() => setSelectedMember(null)}
            >
              {selectedMember.name === "Karthik S" && selectedMember.role === "President" ? (
                <PremiumPresidentModal 
                  member={selectedMember} 
                  onClose={() => setSelectedMember(null)} 
                />
              ) : (
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
              )}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
