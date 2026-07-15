"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Mail, MapPin, ArrowRight, Heart, ArrowUp } from "lucide-react";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineEnvelope } from "react-icons/hi2";

export default function Footer() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }).map(() => ({
        left: `${Math.random() * 100}%`,
        bottom: `${Math.random() * 100}%`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 3,
        x: Math.random() * 20 - 10,
      }))
    );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Activities", href: "#activities" },
    { name: "Leadership", href: "#leadership" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = href;
  };

  return (
    <footer className="relative w-full overflow-hidden flex justify-center bg-[#0a0a0f] mt-[120px]" style={{ display: "block", height: "auto", overflow: "hidden", position: "relative" }}>
      <div className="w-full flex justify-center">
      
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('/images/noise.png')" }} />
        {/* Tiny floating particles behind footer */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: [0.2, 0.6, 0.2], y: -30, x: particle.x }}
            transition={{ duration: particle.duration, repeat: Infinity, ease: "linear", delay: particle.delay }}
            className="absolute rounded-full bg-purple-400"
            style={{
              left: particle.left,
              bottom: particle.bottom,
              width: particle.width,
              height: particle.height,
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-[1400px] pt-[80px] pb-[40px] px-[60px]"
      >
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[60px] mb-[80px]">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="relative w-16 h-16 flex items-center justify-center overflow-hidden rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                 <img src="/images/logo.jpg" alt="Intellects Club Logo" className="object-contain w-full h-full scale-150" />
              </div>
              <div>
                <h3 className="font-black text-2xl text-white tracking-wide" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  Intellects Club
                </h3>
              </div>
            </div>
            
            <p className="text-gray-300 font-light text-[15px] leading-relaxed mb-8 max-w-[320px]">
              Empowering students through innovation, leadership, technical excellence, and collaborative learning.
            </p>

            <div className="flex gap-4 items-center">
              {/* Instagram */}
              <div className="relative group flex flex-col items-center">
                <motion.a 
                  whileHover={{ scale: 1.12, y: -6, rotate: 8 }}
                  transition={{ duration: 0.3 }}
                  href="https://www.instagram.com/intellects_srmramapuram/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center backdrop-blur-md hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all duration-300 relative overflow-hidden"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2), inset 0 0 20px rgba(168,85,247,0.1)"
                  }}
                >
                  <FaInstagram 
                    className="w-6 h-6 transition-transform duration-300" 
                    style={{ fill: "url(#instagram-gradient-footer)" }}
                  />
                  <svg width="0" height="0">
                    <linearGradient id="instagram-gradient-footer" x1="100%" y1="100%" x2="0%" y2="0%">
                      <stop stopColor="#F58529" offset="0%" />
                      <stop stopColor="#DD2A7B" offset="50%" />
                      <stop stopColor="#8134AF" offset="100%" />
                    </linearGradient>
                  </svg>
                </motion.a>
                <div className="absolute -top-10 px-3 py-1.5 bg-[#1a1a24]/90 backdrop-blur-md rounded-lg text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl whitespace-nowrap">
                  Instagram
                </div>
              </div>

              {/* LinkedIn */}
              <div className="relative group flex flex-col items-center">
                <motion.a 
                  whileHover={{ scale: 1.12, y: -6, rotate: 8 }}
                  transition={{ duration: 0.3 }}
                  href="https://www.linkedin.com/company/intellectsclub-srm-ramapuram/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center backdrop-blur-md hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all duration-300 relative overflow-hidden"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2), inset 0 0 20px rgba(168,85,247,0.1)"
                  }}
                >
                  <FaLinkedinIn 
                    className="w-5 h-5 transition-transform duration-300" 
                    style={{ color: "#0A66C2" }}
                  />
                </motion.a>
                <div className="absolute -top-10 px-3 py-1.5 bg-[#1a1a24]/90 backdrop-blur-md rounded-lg text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl whitespace-nowrap">
                  LinkedIn
                </div>
              </div>

              {/* Email */}
              <div className="relative group flex flex-col items-center">
                <motion.a 
                  whileHover={{ scale: 1.12, y: -6, rotate: 8 }}
                  transition={{ duration: 0.3 }}
                  href="mailto:karthik.santhanam2007@gmail.com"
                  className="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center backdrop-blur-md hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all duration-300 relative overflow-hidden"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2), inset 0 0 20px rgba(168,85,247,0.1)"
                  }}
                >
                  <HiOutlineEnvelope 
                    className="w-6 h-6 text-white transition-transform duration-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" 
                  />
                </motion.a>
                <div className="absolute -top-10 px-3 py-1.5 bg-[#1a1a24]/90 backdrop-blur-md rounded-lg text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl whitespace-nowrap">
                  Email
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-white font-bold text-[18px] mb-[32px]">Quick Links</h4>
            <ul className="flex flex-col space-y-[20px]">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <motion.a 
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className="group relative inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-[15px] font-medium"
                  >
                    <span className="relative pb-1">
                      {link.name}
                      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-purple-500 transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-purple-400" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Stay Updated */}
          <div className="flex flex-col">
            <h4 className="text-white font-bold text-[18px] mb-[32px]">Stay Updated</h4>
            <p className="text-gray-400 text-[14px] leading-relaxed mb-[24px]">
              Stay informed about workshops, hackathons, and announcements.
            </p>
            <form className="relative flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 blur-md opacity-0 group-focus-within:opacity-40 transition-opacity duration-300" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="relative w-full bg-[#11111a]/80 backdrop-blur-md border border-white/10 text-white placeholder-gray-500 rounded-2xl px-5 py-4 focus:outline-none transition-all duration-300 focus:border-purple-500/50 text-[15px]"
                />
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-6 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] transition-all flex items-center justify-center gap-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                <span className="relative z-10 flex items-center gap-2">Subscribe <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
              </motion.button>
            </form>
          </div>

          {/* Column 4: Connect */}
          <div className="flex flex-col">
            <h4 className="text-white font-bold text-[18px] mb-[32px]">Connect</h4>
            <div className="flex flex-col gap-[14px]">
              
              <a href="https://www.instagram.com/intellects_srmramapuram/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between h-[56px] px-4 rounded-[14px] bg-[#11111a]/80 backdrop-blur-md border border-white/5 hover:border-purple-500/50 hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white font-medium transition-colors text-[14px]">Instagram</span>
                </div>
                <ArrowRight className="w-4 h-4 text-purple-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>

              <a href="https://www.linkedin.com/company/intellectsclub-srm-ramapuram/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between h-[56px] px-4 rounded-[14px] bg-[#11111a]/80 backdrop-blur-md border border-white/5 hover:border-purple-500/50 hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_10px_rgba(37,99,235,0.5)]">
                    <LinkedinIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white font-medium transition-colors text-[14px]">LinkedIn</span>
                </div>
                <ArrowRight className="w-4 h-4 text-purple-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>

              <a href="mailto:karthik.santhanam2007@gmail.com" className="group flex items-center justify-between h-[56px] px-4 rounded-[14px] bg-[#11111a]/80 backdrop-blur-md border border-white/5 hover:border-purple-500/50 hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                    <Mail className="w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white font-medium transition-colors text-[14px]">Email</span>
                </div>
                <ArrowRight className="w-4 h-4 text-purple-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>

              <div className="group flex items-center justify-between h-[56px] px-4 rounded-[14px] bg-[#11111a]/80 backdrop-blur-md border border-white/5 hover:border-purple-500/50 hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                    <MapPin className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white font-medium transition-colors text-[14px]">SRM IST Ramapuram</span>
                </div>
                <ArrowRight className="w-4 h-4 text-purple-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
              
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
        
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-gray-400 text-[14px] font-medium tracking-wide">
            © 2026 Intellects Club
          </p>
          <p className="text-gray-500 text-[14px] flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> at SRM Ramapuram
          </p>
          <div className="flex items-center justify-center gap-4 text-gray-500 text-[13px] mt-2">
            <a href="/privacy-policy" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="/terms-of-use" className="hover:text-purple-400 transition-colors">Terms</a>
            <span>•</span>
            <button onClick={scrollToTop} className="hover:text-purple-400 transition-colors">Back to Top</button>
          </div>
        </div>

      </motion.div>
      </div>
    </footer>
  );
}
