"use client";

import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, PhoneCall, MapPin, MessageCircle, Zap, Users, Copy, CheckCircle2, Navigation, Lightbulb, Handshake, Target, Globe } from "lucide-react";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import ScrollReveal from "@/components/effects/ScrollReveal";

const EMAIL = "karthik.santhanam2007@gmail.com";
const PHONE = "+91 63741 62898";
const PHONE_CLEAN = "+916374162898";
const WHATSAPP_LINK = "https://wa.me/916374162898";
const MAPS_LINK = "https://maps.app.goo.gl/JkKF19CYAaTxRSF6A";
const INSTA_LINK = "https://www.instagram.com/intellects_srmramapuram/";
const LINKEDIN_LINK = "https://www.linkedin.com/company/intellectsclub-srm-ramapuram/";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  glowColor: string;
};

// 3D Tilt Card Component
const TiltCard = memo(({ children, className, glowColor }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transform: "translateZ(0)", willChange: "transform" }}
      className={`relative group h-full transition-transform duration-700 ease-out hover:scale-[1.03] hover:-translate-y-[10px] ${className}`}
    >
      <div className={`absolute -bottom-12 left-1/2 -translate-x-1/2 w-[90%] h-[50px] bg-gradient-to-r ${glowColor} blur-[30px] opacity-40 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none z-[-1]`} style={{ willChange: "opacity" }} />
      {children}
    </motion.div>
  );
});

TiltCard.displayName = "TiltCard";

export default function Contact() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let ticking = false;
    const updateMouse = (e: MouseEvent) => {
      if (!ticking && sectionRef.current) {
        window.requestAnimationFrame(() => {
          const rect = sectionRef.current!.getBoundingClientRect();
          setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, [inView]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative min-h-screen w-full overflow-hidden pt-[180px] pb-40 flex items-center flex-col" style={{ backgroundColor: "#02040a" }}>
      
      {/* Background */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 mix-blend-screen transition-opacity duration-500"
        style={{ 
          background: `radial-gradient(1000px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(124,58,237,0.06), transparent 40%)`,
          opacity: inView ? 1 : 0,
          willChange: "background"
        }}
      />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" style={{ transform: "translateZ(0)" }} />
      <div className="absolute bottom-[10%] right-[10%] w-[800px] h-[800px] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none" style={{ transform: "translateZ(0)" }} />

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          whileInView={{ y: [-20, 20, -20], x: [-15, 15, -15] }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 15 + i, repeat: Infinity, ease: "linear" }}
          className="absolute w-2 h-2 rounded-full pointer-events-none opacity-40"
          style={{ top: `${15 + i * 10}%`, left: `${10 + i * 10}%`, backgroundColor: i % 2 === 0 ? '#a855f7' : '#22d3ee', filter: "blur(2px)", willChange: "transform", transform: "translateZ(0)" }}
        />
      ))}

      <div className="container-premium relative z-10 w-full max-w-[1400px] mx-auto px-4 lg:px-8 flex flex-col items-center">
        
        {/* Section Header */}
        <ScrollReveal className="text-center flex flex-col items-center justify-center w-full max-w-[900px] mx-auto">
          <h2 className="text-[60px] md:text-[80px] font-black text-white tracking-tight mb-[24px] leading-[1.1] text-center" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Connect</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-medium text-center mb-[60px]">
            Whether you're interested in joining Intellects Club, collaborating on innovative ideas, participating in workshops, or simply learning more about our community, we'd love to hear from you.
          </p>
        </ScrollReveal>

        {/* ========================================================
            CONTACT CARDS (PREMIUM REDESIGN)
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] mb-[100px] w-full">
          
          {/* ================= CARD 1: EMAIL ================= */}
          <ScrollReveal direction="up" delay={0.1} className="h-full">
            <TiltCard glowColor="from-purple-600 to-cyan-600">
              <div className="relative p-[1.5px] rounded-[30px] overflow-hidden h-full group/frame z-0 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                {/* Full Animated Border */}
                <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#a855f7_0deg,#22d3ee_90deg,#3b82f6_180deg,#ec4899_270deg,#a855f7_360deg)] animate-[spin_4s_linear_infinite] opacity-50 group-hover/frame:opacity-100 transition-opacity duration-700" style={{ transform: "translateZ(0)", willChange: "transform, opacity" }} />
                
                {/* Inner Card (Glassmorphism & Border) */}
                <div className="relative h-full min-h-[320px] bg-[#0f1423]/85 backdrop-blur-2xl rounded-[28.5px] border-[1.5px] border-white/15 p-[36px] flex flex-col justify-between z-10 overflow-hidden transition-colors duration-700 group-hover/frame:bg-[#13192c]/90 gap-[20px]">
                  
                  {/* Sweep Animation & Hover Glow */}
                  <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none -skew-x-12 z-0" />
                  <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover/frame:opacity-100 transition-opacity duration-700 blur-[80px] z-0 pointer-events-none" />

                  {/* TOP */}
                  <div className="flex flex-col items-start gap-4 relative z-10 w-full">
                    <motion.div whileInView={{ y: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                      <Mail className="w-7 h-7 text-purple-200" style={{ filter: "drop-shadow(0 0 10px rgba(216,180,254,0.8))" }} />
                    </motion.div>
                    <h3 className="text-[32px] font-bold text-white leading-none tracking-tight">EMAIL</h3>
                    <p className="text-[18px] text-gray-400 leading-snug">For collaborations, club activities, and workshops.</p>
                  </div>

                  {/* CENTER */}
                  <div className="flex flex-col items-center justify-center flex-grow py-2 relative z-10 w-full">
                    <p className="text-[26px] font-semibold text-white truncate w-full text-center tracking-wide">{EMAIL}</p>
                  </div>

                  {/* BOTTOM */}
                  <div className="flex gap-4 w-full relative z-10">
                    <a href={`mailto:${EMAIL}`} className="flex-1 bg-purple-500/20 border border-purple-400/40 text-white rounded-2xl py-4 flex items-center justify-center gap-3 text-[18px] font-bold hover:bg-purple-600 hover:border-purple-500 transition-colors duration-300 shadow-lg">
                      <Mail className="w-5 h-5" /> Send Email
                    </a>
                    <button onClick={handleCopy} className="flex-1 bg-white/5 border border-white/10 text-white rounded-2xl py-4 flex items-center justify-center gap-3 text-[18px] font-bold hover:bg-white/10 hover:border-white/30 transition-colors duration-300 shadow-lg">
                      {copied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />} {copied ? "Copied" : "Copy"}
                    </button>
                  </div>

                </div>
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* ================= CARD 2: PHONE ================= */}
          <ScrollReveal direction="up" delay={0.2} className="h-full">
            <TiltCard glowColor="from-cyan-600 to-blue-600">
              <div className="relative p-[1.5px] rounded-[30px] overflow-hidden h-full group/frame z-0 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#a855f7_0deg,#22d3ee_90deg,#3b82f6_180deg,#ec4899_270deg,#a855f7_360deg)] animate-[spin_4s_linear_infinite_reverse] opacity-50 group-hover/frame:opacity-100 transition-opacity duration-700" style={{ transform: "translateZ(0)", willChange: "transform, opacity" }} />
                
                <div className="relative h-full min-h-[320px] bg-[#0f1423]/85 backdrop-blur-2xl rounded-[28.5px] border-[1.5px] border-white/15 p-[36px] flex flex-col justify-between z-10 overflow-hidden transition-colors duration-700 group-hover/frame:bg-[#13192c]/90 gap-[20px]">
                  
                  <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none -skew-x-12 z-0" />
                  <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover/frame:opacity-100 transition-opacity duration-700 blur-[80px] z-0 pointer-events-none" />

                  <div className="flex flex-col items-start gap-4 relative z-10 w-full">
                    <motion.div whileInView={{ y: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                      <PhoneCall className="w-7 h-7 text-blue-200" style={{ filter: "drop-shadow(0 0 10px rgba(147,197,253,0.8))" }} />
                    </motion.div>
                    <h3 className="text-[32px] font-bold text-white leading-none tracking-tight">PRESIDENT</h3>
                    <p className="text-[18px] text-gray-400 leading-snug">Contact Karthik S for immediate assistance.</p>
                  </div>

                  <div className="flex flex-col items-center justify-center flex-grow py-2 relative z-10 w-full">
                    <p className="text-[26px] font-semibold text-white truncate w-full text-center tracking-wide">{PHONE}</p>
                  </div>

                  <div className="flex gap-4 w-full relative z-10">
                    <a href={`tel:${PHONE_CLEAN}`} className="flex-1 bg-blue-500/20 border border-blue-400/40 text-white rounded-2xl py-4 flex items-center justify-center gap-3 text-[18px] font-bold hover:bg-blue-600 hover:border-blue-500 transition-colors duration-300 shadow-lg">
                      <PhoneCall className="w-5 h-5" /> Call
                    </a>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex-1 bg-emerald-500/20 border border-emerald-400/40 text-white rounded-2xl py-4 flex items-center justify-center gap-3 text-[18px] font-bold hover:bg-emerald-600 hover:border-emerald-500 transition-colors duration-300 shadow-lg">
                      <MessageCircle className="w-5 h-5" /> WhatsApp
                    </a>
                  </div>

                </div>
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* ================= CARD 3: LOCATION ================= */}
          <ScrollReveal direction="up" delay={0.1} className="h-full">
            <TiltCard glowColor="from-blue-600 to-pink-600">
              <div className="relative p-[1.5px] rounded-[30px] overflow-hidden h-full group/frame z-0 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#a855f7_0deg,#22d3ee_90deg,#3b82f6_180deg,#ec4899_270deg,#a855f7_360deg)] animate-[spin_4s_linear_infinite] opacity-50 group-hover/frame:opacity-100 transition-opacity duration-700" style={{ transform: "translateZ(0)", willChange: "transform, opacity" }} />
                
                <div className="relative h-full min-h-[320px] bg-[#0f1423]/85 backdrop-blur-2xl rounded-[28.5px] border-[1.5px] border-white/15 p-[36px] flex flex-col justify-between z-10 overflow-hidden transition-colors duration-700 group-hover/frame:bg-[#13192c]/90 gap-[20px]">
                  
                  <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none -skew-x-12 z-0" />
                  <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover/frame:opacity-100 transition-opacity duration-700 blur-[80px] z-0 pointer-events-none" />

                  <div className="flex flex-col items-start gap-4 relative z-10 w-full">
                    <motion.div whileInView={{ y: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                      <MapPin className="w-7 h-7 text-cyan-200" style={{ filter: "drop-shadow(0 0 10px rgba(103,232,249,0.8))" }} />
                    </motion.div>
                    <h3 className="text-[32px] font-bold text-white leading-none tracking-tight">CAMPUS</h3>
                    <p className="text-[18px] text-gray-400 leading-snug">SRM Institute of Science & Technology.</p>
                  </div>

                  <div className="flex flex-col items-center justify-center flex-grow py-2 relative z-10 w-full">
                    <p className="text-[26px] font-semibold text-white w-full text-center tracking-wide leading-tight">Ramapuram Campus<br/><span className="text-[20px] font-medium text-gray-300">Chennai, Tamil Nadu</span></p>
                  </div>

                  <div className="flex gap-4 w-full relative z-10">
                    <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="flex-1 bg-cyan-500/20 border border-cyan-400/40 text-white rounded-2xl py-4 flex items-center justify-center gap-3 text-[18px] font-bold hover:bg-cyan-600 hover:border-cyan-500 transition-colors duration-300 shadow-lg">
                      <Navigation className="w-5 h-5" /> Open Maps
                    </a>
                  </div>

                </div>
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* ================= CARD 4: SOCIAL ================= */}
          <ScrollReveal direction="up" delay={0.2} className="h-full">
            <TiltCard glowColor="from-pink-600 to-purple-600">
              <div className="relative p-[1.5px] rounded-[30px] overflow-hidden h-full group/frame z-0 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#a855f7_0deg,#22d3ee_90deg,#3b82f6_180deg,#ec4899_270deg,#a855f7_360deg)] animate-[spin_4s_linear_infinite_reverse] opacity-50 group-hover/frame:opacity-100 transition-opacity duration-700" style={{ transform: "translateZ(0)", willChange: "transform, opacity" }} />
                
                <div className="relative h-full min-h-[320px] bg-[#0f1423]/85 backdrop-blur-2xl rounded-[28.5px] border-[1.5px] border-white/15 p-[36px] flex flex-col justify-between z-10 overflow-hidden transition-colors duration-700 group-hover/frame:bg-[#13192c]/90 gap-[20px]">
                  
                  <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }} className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none -skew-x-12 z-0" />
                  <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover/frame:opacity-100 transition-opacity duration-700 blur-[80px] z-0 pointer-events-none" />

                  <div className="flex flex-col items-start gap-4 relative z-10 w-full">
                    <motion.div whileInView={{ y: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 3 }} className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                      <Globe className="w-7 h-7 text-pink-200" style={{ filter: "drop-shadow(0 0 10px rgba(244,114,182,0.8))" }} />
                    </motion.div>
                    <h3 className="text-[32px] font-bold text-white leading-none tracking-tight">SOCIALS</h3>
                    <p className="text-[18px] text-gray-400 leading-snug">Follow Intellects Club for latest updates.</p>
                  </div>

                  <div className="flex flex-col items-center justify-center flex-grow py-2 relative z-10 w-full">
                    <p className="text-[22px] font-semibold text-white w-full text-center tracking-wide leading-relaxed">
                      Workshops • Events<br/>Hackathons • Recruitment
                    </p>
                  </div>

                  <div className="flex gap-4 w-full relative z-10">
                    <a href={INSTA_LINK} target="_blank" rel="noopener noreferrer" className="flex-1 bg-pink-500/20 border border-pink-400/40 text-white rounded-2xl py-4 flex items-center justify-center gap-3 text-[18px] font-bold hover:bg-pink-600 hover:border-pink-500 transition-colors duration-300 shadow-lg">
                      <InstagramIcon className="w-5 h-5" /> Instagram
                    </a>
                    <a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer" className="flex-1 bg-blue-500/20 border border-blue-400/40 text-white rounded-2xl py-4 flex items-center justify-center gap-3 text-[18px] font-bold hover:bg-blue-600 hover:border-blue-500 transition-colors duration-300 shadow-lg">
                      <LinkedinIcon className="w-5 h-5 text-white" fill="white" /> LinkedIn
                    </a>
                  </div>

                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
