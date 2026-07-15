"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Quote, Sparkles, ChevronRight, Users, Code, Award, Target, Briefcase, Shield, Cpu, Network, X, Play } from "lucide-react";
import ScrollReveal from "@/components/effects/ScrollReveal";

// ============================================================================
// DATA & PLACEHOLDERS
// ============================================================================

const ALUMNI_SHOWCASE = [
  {
    id: 1,
    quote: "Intellects Club wasn't just an extracurricular activity; it was the foundation of my technical career. The late-night hackathons and collaborative environment shaped my understanding of what it means to build impactful software.",
    name: "Alex Sterling",
    role: "Former President",
    batch: "Class of 2023",
    journey: "Software Engineer at Google",
    companyColor: "from-blue-400 to-green-400",
  },
  {
    id: 2,
    quote: "The leadership opportunities provided by this community taught me more about project management and team dynamics than any classroom could. It’s a true sandbox for future innovators.",
    name: "Priya Patel",
    role: "Tech Lead",
    batch: "Class of 2024",
    journey: "Product Manager at Microsoft",
    companyColor: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    quote: "Building open-source projects with the Intellects Club team gave me the confidence to contribute to global repositories. The mentorship here is unparalleled.",
    name: "David Chen",
    role: "Open Source Head",
    batch: "Class of 2022",
    journey: "Senior Developer at Vercel",
    companyColor: "from-gray-100 to-gray-400",
  }
];

const TIMELINE = [
  { year: "2022", achievement: "Founded Club" },
  { year: "2023", achievement: "National Hackathon" },
  { year: "2024", achievement: "500+ Members" },
  { year: "2025", achievement: "Industry Collaborations" },
  { year: "2026", achievement: "AI Community Growth" },
];

const LEGACY_WALL = [
  { name: "[Placeholder Name]", position: "President 2023", contribution: "Scaled the club to 300+ members and initiated the first national hackathon.", year: "2023" },
  { name: "[Placeholder Name]", position: "Vice President", contribution: "Established the Open Source and AI community chapters.", year: "2023" },
  { name: "[Placeholder Name]", position: "Tech Lead", contribution: "Architected the club's flagship event portal.", year: "2024" },
  { name: "[Placeholder Name]", position: "Event Head", contribution: "Organized 50+ technical workshops and coding bootcamps.", year: "2024" },
  { name: "[Placeholder Name]", position: "Design Lead", contribution: "Created the official Intellects Club brand identity.", year: "2025" },
  { name: "[Placeholder Name]", position: "R&D Head", contribution: "Published 3 research papers with the community.", year: "2025" },
  { name: "[Placeholder Name]", position: "Community Manager", contribution: "Grew the Discord server to 10k+ active developers.", year: "2026" },
  { name: "[Placeholder Name]", position: "Treasurer", contribution: "Secured sponsorships from 10+ major tech companies.", year: "2026" },
];

const COUNTERS = [
  { label: "Members", value: "1000", suffix: "+" },
  { label: "Events", value: "150", suffix: "+" },
  { label: "Projects", value: "250", suffix: "+" },
  { label: "Hackathons", value: "40", suffix: "+" },
  { label: "Workshops", value: "120", suffix: "+" },
  { label: "Community Reach", value: "10", suffix: "K+" },
];

const MEMORIES = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop",
];

// ============================================================================
// COMPONENTS
// ============================================================================

const Counter = ({ value, suffix, label }: any) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = parseInt(value);
          const duration = 2000;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 glass-card rounded-[24px] border border-white/5 bg-white/[0.02]">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tighter" style={{ fontFamily: "var(--font-space-grotesk)" }}>
        {count}{suffix}
      </div>
      <div className="text-sm font-medium text-purple-400 uppercase tracking-widest">{label}</div>
    </div>
  );
};

const TiltCard3D = ({ children, className }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function BuildingFutures() {
  const [activeShowcase, setActiveShowcase] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Auto-rotate showcase
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveShowcase((prev) => (prev + 1) % ALUMNI_SHOWCASE.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Mouse tracker for galaxy glow
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#02040a] pt-32 pb-40">
      
      {/* =========================================================
          BACKGROUND: FUTURISTIC GALAXY
      ========================================================= */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 mix-blend-screen"
        style={{
          background: `radial-gradient(800px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(124,58,237,0.08), transparent 40%)`
        }}
      />
      
      {/* Aurora Blobs */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[200px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Constellations */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "120px 120px"
        }}
      />

      <div className="container-premium relative z-10 max-w-[1200px] mx-auto px-4 lg:px-8">
        
        {/* =========================================================
            SECTION HEADER
        ========================================================= */}
        <ScrollReveal className="text-center flex flex-col items-center mb-32 max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-purple-500/30 mb-8 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-purple-300 tracking-wider uppercase">INTELLECTS LEGACY</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Building Futures,<br/>
            Creating <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 animate-gradient bg-[length:200%_auto]">Leaders.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 leading-[1.8] font-medium"
          >
            Every generation of Intellects Club leaves behind more than memories. They leave knowledge, innovation, friendships, leadership, and inspiration for the next generation.
          </motion.p>
        </ScrollReveal>

        {/* =========================================================
            MAIN SHOWCASE
        ========================================================= */}
        <div className="w-full max-w-[1000px] mx-auto mb-32 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-[32px] blur opacity-20 animate-pulse-slow" />
          
          <div className="glass-card relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0a0a0f]/80 backdrop-blur-2xl p-10 md:p-16 min-h-[400px] flex flex-col justify-center">
            <Quote className="absolute top-10 right-10 w-32 h-32 text-purple-500/10 rotate-12" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeShowcase}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <p className="text-2xl md:text-3xl lg:text-4xl text-white font-medium leading-relaxed mb-12" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  "{ALUMNI_SHOWCASE[activeShowcase].quote}"
                </p>
                
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full mb-4 bg-gradient-to-br from-purple-500 to-blue-500 p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#0a0a0f] flex items-center justify-center font-bold text-2xl text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      {ALUMNI_SHOWCASE[activeShowcase].name.charAt(0)}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">{ALUMNI_SHOWCASE[activeShowcase].name}</h4>
                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
                    <span>{ALUMNI_SHOWCASE[activeShowcase].role}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                    <span>{ALUMNI_SHOWCASE[activeShowcase].batch}</span>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${ALUMNI_SHOWCASE[activeShowcase].companyColor} text-gray-900 font-bold text-xs uppercase tracking-wider`}>
                    {ALUMNI_SHOWCASE[activeShowcase].journey}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {ALUMNI_SHOWCASE.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveShowcase(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${activeShowcase === idx ? 'w-8 bg-purple-500' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================
            LEGACY TIMELINE
        ========================================================= */}
        <ScrollReveal className="mb-40 w-full overflow-hidden">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>The Journey of Innovation</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-between max-w-[1000px] mx-auto py-10 px-4">
            {/* Horizontal Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/20 via-blue-500/50 to-cyan-500/20 -translate-y-1/2" />
            
            {TIMELINE.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative z-10 flex flex-col items-center mb-8 md:mb-0 group cursor-default"
              >
                <div className="text-purple-400 font-bold text-xl mb-4 group-hover:-translate-y-2 transition-transform duration-300" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {item.year}
                </div>
                <div className="w-6 h-6 rounded-full bg-[#0a0a0f] border-2 border-blue-500 flex items-center justify-center mb-4 group-hover:scale-150 group-hover:bg-blue-500 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-sm font-medium text-gray-400 text-center max-w-[120px] group-hover:text-white transition-colors">
                  {item.achievement}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* =========================================================
            IMPACT COUNTERS
        ========================================================= */}
        <ScrollReveal className="mb-40">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {COUNTERS.map((counter, idx) => (
              <Counter key={idx} value={counter.value} suffix={counter.suffix} label={counter.label} />
            ))}
          </div>
        </ScrollReveal>

        {/* =========================================================
            LEGACY WALL
        ========================================================= */}
        <ScrollReveal className="mb-40">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>Legacy Wall</h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Meet the visionary leaders who laid the stepping stones for our success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEGACY_WALL.map((alumni, idx) => (
              <TiltCard3D key={idx} className="glass-card relative rounded-[24px] overflow-hidden p-8 border border-white/5 bg-gradient-to-br from-[#11111a]/80 to-[#0a0a0f]/80 group hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] group-hover:bg-purple-500/20 transition-colors" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center mb-4 overflow-hidden">
                    <UserIconPlaceholder />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">{alumni.name}</h4>
                  <div className="text-sm text-cyan-400 font-medium mb-4 uppercase tracking-wider">{alumni.position}</div>
                  <div className="text-xs text-gray-500 font-bold bg-white/5 px-3 py-1 rounded-full mb-6">{alumni.year}</div>
                  <p className="text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                    {alumni.contribution}
                  </p>
                </div>
              </TiltCard3D>
            ))}
          </div>
        </ScrollReveal>

        {/* =========================================================
            MEMORIES GALLERY
        ========================================================= */}
        <div className="mb-40 w-full relative">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>Moments Captured</h3>
          </div>

          <div className="relative w-full overflow-hidden flex py-4">
            {/* Fade edges */}
            <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#02040a] to-transparent z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#02040a] to-transparent z-10" />
            
            <motion.div 
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex gap-6 px-6 cursor-pointer"
            >
              {[...MEMORIES, ...MEMORIES].map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setLightboxImg(img)}
                  className="relative w-[300px] md:w-[400px] h-[250px] flex-shrink-0 rounded-[24px] overflow-hidden group border border-white/10"
                >
                  <img src={img} alt="Memory" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-12 h-12 text-white/80" />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* =========================================================
            QUOTE OF THE MONTH
        ========================================================= */}
        <ScrollReveal className="mb-40 max-w-[800px] mx-auto">
          <div className="glass-card relative overflow-hidden rounded-[32px] p-12 border border-purple-500/20 bg-gradient-to-br from-[#1a1125] to-[#0a0a0f] text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            <Quote className="w-12 h-12 text-purple-400 mx-auto mb-8 opacity-50" />
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-snug" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              "The best way to predict the future is to invent it together."
            </h3>
            <p className="text-purple-300 font-medium uppercase tracking-widest text-sm">— Quote of the Month</p>
          </div>
        </ScrollReveal>

        {/* =========================================================
            WHY JOIN / CTA
        ========================================================= */}
        <ScrollReveal className="max-w-[1000px] mx-auto mb-20">
          <div className="glass-card relative overflow-hidden rounded-[40px] p-12 md:p-20 border border-blue-500/30 bg-gradient-to-b from-[#111122]/90 to-[#0a0a0f]/90 text-center shadow-[0_0_80px_rgba(37,99,235,0.15)]">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Why Every Journey Starts Here
            </h2>
            
            <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
              Innovation isn't built alone. At Intellects Club, students don't just attend events—they build projects, solve real-world problems, lead teams, mentor peers, create lifelong friendships, and prepare for careers that shape the future.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-4xl mx-auto">
              {['Innovation', 'Leadership', 'Open Source', 'Hackathons', 'Networking', 'AI', 'Robotics', 'Development', 'Cybersecurity', 'Research'].map((chip, i) => (
                <div key={i} className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-semibold hover:bg-white/10 hover:text-white transition-all cursor-default">
                  {chip}
                </div>
              ))}
            </div>

            <motion.a 
              href="#join"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center px-10 py-5 rounded-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-3 text-lg font-bold text-white tracking-wide">
                Become Part of the Legacy <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.a>
          </div>
        </ScrollReveal>

      </div>

      {/* =========================================================
          LIGHTBOX MODAL
      ========================================================= */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-lg p-4"
            onClick={() => setLightboxImg(null)}
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
              <X className="w-8 h-8" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightboxImg} 
              className="max-w-full max-h-[90vh] rounded-[24px] border border-white/10 shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const UserIconPlaceholder = () => (
  <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
