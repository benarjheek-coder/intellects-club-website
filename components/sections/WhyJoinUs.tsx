"use client";
import { motion } from "framer-motion";
import { Code2, Cpu, Award, Users, Users2, Zap, MonitorPlay, GitBranch, Star, Briefcase } from "lucide-react";
import { WHY_JOIN_US } from "@/lib/data";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/effects/ScrollReveal";

const iconMap: Record<string, React.ComponentType<any>> = {
  Code2,
  Cpu,
  Award,
  Users,
  Users2,
  Zap,
  MonitorPlay,
  GitBranch,
  Star,
  Briefcase,
};

export default function WhyJoinUs() {
  return (
    <section
      id="why-join-us"
      className="section-spacing relative w-full flex justify-center overflow-hidden"
      style={{ backgroundColor: "#02040a" }}
    >
      {/* Background Particles/Glows */}
      <div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none transform-gpu"
        style={{ 
           background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
        }} 
      />
      <div 
        className="absolute top-1/4 right-0 w-[400px] h-[400px] pointer-events-none transform-gpu"
        style={{ 
           background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
        }} 
      />

      {/* Grid Floor */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-30 pointer-events-none transform-gpu"
        style={{
           backgroundSize: "60px 60px",
           backgroundImage: "linear-gradient(to right, rgba(124,58,237,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,58,237,0.15) 1px, transparent 1px)",
           transform: "perspective(500px) rotateX(70deg) scale(2.5) translateZ(0)",
           transformOrigin: "bottom center",
        }}
      />

      <div className="container-premium relative z-10 flex flex-col items-center">
        
        <ScrollReveal className="text-center mb-20">
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 uppercase tracking-widest"
            style={{ fontFamily: "var(--font-space-grotesk)", textShadow: "0 0 30px rgba(255,255,255,0.15)" }}
          >
            WHY <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">JOIN US</span>
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Being part of Intellects Club means unlocking a world of opportunities, from building real-world projects to connecting with industry leaders.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {WHY_JOIN_US.map((item, i) => {
            const Icon = iconMap[item.icon] || Star;
            return (
              <StaggerItem key={item.title} className="flex flex-col h-full">
                <motion.div
                  className="glass-card flex-1 p-8 flex flex-col items-center justify-center text-center transition-all duration-300 group cursor-default relative overflow-hidden h-full"
                  style={{
                    backgroundColor: "rgba(17,24,39,0.4)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(124,58,237,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.05)";
                  }}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none transform-gpu"
                    style={{ background: `radial-gradient(circle at center, rgba(124,58,237,0.15), transparent 70%)` }}
                  />

                  <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gray-900 border border-white/10 group-hover:bg-purple-900/40 group-hover:border-purple-500/50 transition-all duration-500 relative z-10 group-hover:-translate-y-2 group-hover:shadow-[0_10px_30px_rgba(124,58,237,0.4)]">
                     <Icon className="w-8 h-8 text-gray-400 group-hover:text-purple-300 transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-300 group-hover:text-white transition-colors duration-300 relative z-10" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {item.title}
                  </h3>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
