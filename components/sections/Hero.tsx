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
      className="relative z-0 min-h-screen w-full flex flex-col overflow-hidden bg-[#05060B] pt-[64px] md:pt-[72px]"
      aria-label="Hero section"
    >
      {/* 1. Earth (absolute, z-0) */}
      <CinematicHeroBackground />

      {/* 2. Astronaut (absolute, z-5, bottom left) */}
      <motion.div 
        className="absolute left-[-30px] lg:left-[-120px] bottom-[-20px] lg:bottom-[60px] w-[40vw] lg:w-[30vw] min-w-[180px] lg:min-w-[400px] h-[40vh] lg:h-[85vh] z-[5] pointer-events-none select-none flex items-end justify-start origin-bottom-left scale-[1.3] lg:scale-[1.9] opacity-60 lg:opacity-100"
        style={{ x: parallaxX, y: parallaxY }}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <img 
          src="/images/astronaut.png" 
          alt="Astronaut" 
          className="w-full h-full object-contain object-left-bottom drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]"
        />
      </motion.div>

      {/* 3. Hero Content (relative, z-20) */}
      <div className="relative z-[20] w-full flex-1 flex flex-col lg:flex-row items-center justify-start lg:justify-center py-8 lg:py-0">
        
        {/* LEFT SPACER: Reserves space for the astronaut on desktop */}
        <div className="hidden lg:block w-[calc(30vw-120px)] shrink-0" />

        {/* CENTER CONTENT */}
        <motion.div
          style={{ y: scrollY, opacity, x: useTransform(parallaxX, x => x * -0.5) }}
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
          className="mb-4 lg:mb-8 font-black uppercase tracking-tight flex flex-col items-center drop-shadow-[0_0_40px_rgba(139,92,246,0.3)] text-center leading-[0.9]"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-400"
            style={{ fontSize: "clamp(2.5rem, 9vw, 8.5rem)" }}
          >
            INNOVATE
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#4F9DFF] -mt-1 md:-mt-4"
            style={{ fontSize: "clamp(3rem, 11vw, 10rem)" }}
          >
            BUILD
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white -mt-1 md:-mt-4"
            style={{ fontSize: "clamp(2.8rem, 10vw, 9rem)" }}
          >
            INSPIRE
          </motion.span>
        </h1>

        {/* Dynamic Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-300 text-center max-w-[700px] mx-auto text-[13px] sm:text-lg lg:text-xl font-medium leading-relaxed mb-6 lg:mb-10 px-4 drop-shadow-md"
        >
          Empowering students through technology,<br />
          innovation, leadership,<br />
          creativity, and collaborative learning.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-row items-center justify-center gap-2 lg:gap-4 w-full px-2 sm:px-0 mb-6 lg:mb-16"
        >
          <a href="#about" className="w-1/2 sm:w-[220px] h-[44px] sm:h-[56px] rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-bold text-[13px] sm:text-[15px] tracking-wide hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 flex items-center justify-center">
            Explore Club
          </a>
          <a href="#contact" className="w-1/2 sm:w-[220px] h-[44px] sm:h-[56px] rounded-full bg-white/5 border border-white/10 text-white font-bold text-[13px] sm:text-[15px] tracking-wide hover:bg-white/10 transition-all duration-300 backdrop-blur-md flex items-center justify-center">
            Join Community
          </a>
        </motion.div>

        {/* Quick Access Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}
          className="text-center text-[10px] lg:text-xs font-bold text-gray-400 tracking-[0.2em] uppercase mb-2 lg:mb-4"
        >
          QUICK ACCESS
        </motion.div>

        {/* Quick Access Cards (2 Columns on Mobile to save height, 4 on Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 w-full max-w-[1000px] mx-auto pb-4 lg:pb-10 px-2 lg:px-0"
        >
          {[
            { label: "About Club", icon: Users, href: "#about" },
            { label: "Club Activities", icon: Calendar, href: "#activities" },
            { label: "Leadership Team", icon: Crown, href: "#team" },
            { label: "Our Projects", icon: FolderGit2, href: "#projects" },
            { label: "Our Domains", icon: Boxes, href: "#domains" },
            { label: "Gallery", icon: Images, href: "#gallery" },
            { label: "Contact Us", icon: Mail, href: "#contact" },
            { label: "Follow Instagram", icon: Camera, href: "https://instagram.com" },
          ].map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              className="group flex items-center justify-between px-2.5 sm:px-4 py-2 sm:py-3.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] hover:border-[#8B5CF6]/50 hover:bg-[rgba(255,255,255,0.06)] transition-all duration-300 backdrop-blur-lg hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(139,92,246,0.15)] overflow-hidden"
            >
              <div className="flex items-center gap-1.5 sm:gap-3 overflow-hidden">
                <btn.icon className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px] text-[#A855F7] shrink-0" />
                <span className="font-medium text-[10px] sm:text-[13px] text-gray-200 group-hover:text-white transition-colors truncate">
                  {btn.label}
                </span>
              </div>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 group-hover:text-[#A855F7] group-hover:translate-x-0.5 transition-all shrink-0" />
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
