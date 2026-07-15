"use client";
// =========================================================
// components/sections/Hero.tsx
// Pixel-Perfect Cinematic Hero (Reference Match)
// =========================================================
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Users, Calendar, Crown, FolderGit2, Boxes, Images, Mail, Camera, ChevronRight, ArrowDown } from "lucide-react";
import Image from "next/image";
import CinematicHeroBackground from "@/components/effects/CinematicHeroBackground";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Subtle Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 100 };
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative z-0 min-h-screen flex flex-col justify-start lg:justify-center overflow-hidden bg-[#05060B]"
      aria-label="Hero section"
    >
      {/* 3D Cinematic Deep Space sequence (Earth on the right) */}
      <CinematicHeroBackground />

      {/* LEFT FOREGROUND: Exact Astronaut Image Overlay */}
      {/* 
        Refined Premium Cinematic Composition:
        - Z-index [5] keeps it behind the text (Z-[20]) but above the Earth/Stars (Z-[0]).
        - bottom-[60px] moves it upward by 60px.
        - left-[-120px] moves it 120px to the left.
        - scale-[1.9] increases the visual size by 90% (80-100% requested).
        - w-[30vw] ensures the physical box doesn't push into the text container.
      */}
      <motion.div 
        className="absolute left-[-30px] lg:left-[-120px] bottom-[-20px] lg:bottom-[60px] w-[40vw] lg:w-[30vw] min-w-[180px] lg:min-w-[400px] h-[40vh] lg:h-[85vh] z-[5] pointer-events-none select-none flex items-end justify-start origin-bottom-left scale-[1.3] lg:scale-[1.9] opacity-60 lg:opacity-100"
        style={{ x: parallaxX, y: parallaxY }}
        animate={{ y: [0, -15, 0] }} // Subtle floating animation
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <img 
          src="/images/astronaut.png" 
          alt="Astronaut" 
          className="w-full h-full object-contain object-left-bottom drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]"
        />
      </motion.div>

      {/* LAYOUT CONTAINER: Dynamic Flexbox layout to center content within available space */}
      {/* 96px top padding on mobile = 64px navbar + 32px gap + safe area */}
      <div className="relative z-[20] w-full flex-1 flex flex-col lg:flex-row items-center justify-start lg:justify-center pt-safe-hero pb-12 lg:pt-0 lg:pb-0">
        
        {/* LEFT SPACER: Reserves structural space for the absolutely positioned astronaut */}
        <div className="hidden lg:block w-[calc(30vw-120px)] shrink-0" />

        {/* CENTER CONTENT: Typography and UI */}
        <motion.div
          style={{ y: scrollY, opacity, x: useTransform(parallaxX, x => x * -0.5) }} // Subtle counter parallax
          className="w-full flex-1 flex flex-col items-center justify-start lg:justify-center px-[20px] lg:px-[120px] max-w-[1200px]"
        >
          {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <span className="flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-medium tracking-wide bg-white/5 border border-white/10 text-gray-300 backdrop-blur-md shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
            SRM IST Ramapuram — Technical Club
          </span>
        </motion.div>

        {/* Main Heading */}
        <h1
          className="mb-8 font-black uppercase tracking-tight flex flex-col items-center drop-shadow-[0_0_40px_rgba(139,92,246,0.3)] text-center leading-[0.9]"
          style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(3.5rem, 10vw, 8.5rem)" }}
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-400"
          >
            INNOVATE
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#4F9DFF] -mt-2 md:-mt-4"
          >
            BUILD
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-400 -mt-2 md:-mt-4"
          >
            INSPIRE
          </motion.span>
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }}
          className="text-[16px] md:text-[22px] leading-[1.6] mb-10 max-w-[600px] font-light text-center text-white drop-shadow-md"
        >
          Empowering students through technology,<br />
          innovation, leadership,<br />
          creativity, and collaborative learning.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 w-[90%] sm:w-full max-w-[320px] sm:max-w-none mx-auto"
        >
          <a
            href="#about"
            className="px-8 py-4 sm:py-3.5 rounded-full font-bold text-white transition-all w-full sm:w-auto text-center flex items-center justify-center min-h-[50px]"
            style={{
              background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
              boxShadow: "0 0 25px rgba(139,92,246,0.5)"
            }}
          >
            Explore Club
          </a>
          <a
            href="#contact"
            className="px-8 py-4 sm:py-3.5 rounded-full font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all w-full sm:w-auto text-center flex items-center justify-center min-h-[50px] backdrop-blur-md"
          >
            Join Community
          </a>
        </motion.div>

        {/* Quick Access Title */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}
          className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-6"
        >
          QUICK ACCESS
        </motion.div>

        {/* Quick Access Cards (1 Column on Mobile, 4 Columns on Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 w-full max-w-[1000px] mx-auto pb-10 px-4 lg:px-0"
        >
          {[
            { label: "About Club", icon: Users, href: "#about" },
            { label: "Club Activities", icon: Calendar, href: "#activities" },
            { label: "Leadership Team", icon: Crown, href: "#leadership" },
            { label: "Our Projects", icon: FolderGit2, href: "#projects" },
            { label: "Our Domains", icon: Boxes, href: "#domains" },
            { label: "Gallery", icon: Images, href: "#gallery" },
            { label: "Contact Us", icon: Mail, href: "#contact" },
            { label: "Follow Instagram", icon: Camera, href: "https://www.instagram.com/intellects_srmramapuram/" },
          ].map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              className="group flex items-center justify-between px-3 sm:px-4 py-3.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] hover:border-[#8B5CF6]/50 hover:bg-[rgba(255,255,255,0.06)] transition-all duration-300 backdrop-blur-lg hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(139,92,246,0.15)] overflow-hidden"
            >
              <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                <btn.icon className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] text-[#A855F7] shrink-0" />
                <span className="font-medium text-xs sm:text-[13px] text-gray-200 group-hover:text-white transition-colors truncate">
                  {btn.label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-[#A855F7] group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* RIGHT SPACER: Reserves structural space for the Earth */}
      <div className="hidden lg:block w-[15vw] shrink-0" />
      
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500">
          SCROLL
        </span>
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="w-3.5 h-3.5 text-gray-500" />
        </motion.div>
      </motion.a>
    </section>
  );
}
