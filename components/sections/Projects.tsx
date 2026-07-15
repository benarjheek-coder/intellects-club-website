"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import ScrollReveal from "@/components/effects/ScrollReveal";

const CATEGORIES = [
  "All",
  "Web",
  "AI",
  "Open Source",
  "App Development",
  "UI/UX"
];

// Fallback images since projects don't have images in data.ts yet
const mockImages = [
  "https://images.unsplash.com/photo-1633511090164-b439cbe1c70e?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1614729939124-032d0b56c9ce?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1618367588411-d9a90fefa881?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop"
];

const glowingBorders = [
  "rgba(124,58,237,0.8)", "rgba(6,182,212,0.8)", "rgba(236,72,153,0.8)",
  "rgba(16,185,129,0.8)", "rgba(245,158,11,0.8)", "rgba(59,130,246,0.8)"
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = activeTab === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeTab);

  return (
    <section
      id="projects"
      className="section-spacing relative w-full flex justify-center overflow-hidden"
      style={{ backgroundColor: "#02040a" }}
      aria-labelledby="projects-heading"
    >
      {/* 3D Floor Grid matching Canva - Hardware Accelerated */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-30 pointer-events-none transform-gpu"
        style={{
           backgroundSize: "60px 60px",
           backgroundImage: "linear-gradient(to right, rgba(37,99,235,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.15) 1px, transparent 1px)",
           transform: "perspective(500px) rotateX(70deg) scale(2.5) translateZ(0)",
           transformOrigin: "bottom center",
           willChange: "transform"
        }}
      />
      
      {/* Background Particles/Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] transform-gpu pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)' }} />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] transform-gpu pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] transform-gpu pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)' }} />

      <div className="container-premium relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <ScrollReveal className="text-center w-full max-w-4xl mb-12">
          <h2
            id="projects-heading"
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 uppercase tracking-widest"
            style={{ fontFamily: "var(--font-space-grotesk)", textShadow: "0 0 30px rgba(255,255,255,0.15)" }}
          >
            OUR BEST WORK <br className="hidden md:block" /> IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">TECH & DESIGN</span>
          </h2>
          <p className="text-base md:text-lg text-gray-300 mx-auto leading-relaxed font-medium">
            Explore standout projects and applications crafted by our talented club members. 
          </p>
        </ScrollReveal>

        {/* Tab Navigation */}
        <ScrollReveal className="w-full flex justify-center mb-16 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex items-center gap-2 md:gap-4 px-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className="relative px-5 py-2.5 rounded-full text-sm md:text-base font-semibold whitespace-nowrap transition-all duration-300"
                style={{
                  color: activeTab === category ? "#fff" : "#9ca3af",
                }}
              >
                {activeTab === category && (
                  <motion.div
                    layoutId="projects-tab"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(37,99,235,0.9), rgba(124,58,237,0.9))",
                      boxShadow: "0 0 20px rgba(37,99,235,0.4)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
                {activeTab !== category && (
                  <div className="absolute inset-0 rounded-full border border-gray-800 bg-gray-900/50 hover:bg-gray-800 transition-colors -z-10" />
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Animated Grid */}
        <div className="w-full min-h-[400px]">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => {
                const imgIdx = PROJECTS.findIndex(p => p.title === project.title) % mockImages.length;
                return (
                  <motion.a 
                    key={project.title}
                    href={project.link}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="block relative aspect-[4/5] w-full rounded-2xl overflow-hidden group"
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    {/* Glowing Border Box */}
                    <div 
                      className="absolute inset-0 z-20 border-2 transition-all duration-500 pointer-events-none rounded-2xl"
                      style={{ borderColor: "rgba(255,255,255,0.1)" }}
                    />
                    <div 
                      className="absolute inset-0 z-20 border-2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none rounded-2xl"
                      style={{ 
                          borderColor: glowingBorders[imgIdx],
                          boxShadow: `inset 0 0 30px ${glowingBorders[imgIdx]}, 0 0 30px ${glowingBorders[imgIdx]}`
                      }}
                    />
                    
                    {/* Image Content */}
                    <motion.img 
                      src={mockImages[imgIdx]} 
                      alt={project.title}
                      className="w-full h-full object-cover relative z-10 brightness-75 group-hover:brightness-100 transition-all duration-500"
                    />
                    
                    {/* Overlay Text */}
                    <div className="absolute inset-0 z-30 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                      <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">
                        {project.category}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2 font-display">{project.title}</h3>
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                          {project.tech.slice(0, 3).map(tech => (
                            <span key={tech} className="text-[10px] uppercase tracking-widest text-gray-300 border border-gray-500/50 px-2 py-1 rounded-sm">{tech}</span>
                          ))}
                      </div>
                      <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center mt-2 group-hover:bg-white group-hover:text-black transition-colors">
                          <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </AnimatePresence>
          </motion.div>
          {filteredProjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="w-full text-center py-20 text-gray-500 text-lg"
            >
              No projects found for this category yet.
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
