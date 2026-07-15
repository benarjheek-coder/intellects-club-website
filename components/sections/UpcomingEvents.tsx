"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { UPCOMING_EVENTS } from "@/lib/data";
import ScrollReveal from "@/components/effects/ScrollReveal";

export default function UpcomingEvents() {
  return (
    <section
      id="upcoming-events"
      className="section-spacing relative w-full flex justify-center overflow-hidden"
      style={{ backgroundColor: "#02040a" }}
    >
      {/* Background Particles/Glows */}
      <div 
        className="absolute top-1/2 left-0 right-0 h-[200px] -translate-y-1/2 pointer-events-none transform-gpu"
        style={{ 
           background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.15) 0%, transparent 70%)',
           filter: 'blur(40px)'
        }} 
      />

      <div className="container-premium relative z-10 flex flex-col items-center">
        
        <ScrollReveal className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] uppercase tracking-widest"
              style={{ fontFamily: "var(--font-space-grotesk)", textShadow: "0 0 30px rgba(255,255,255,0.15)" }}>
            UPCOMING <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">EVENTS</span>
          </h2>
        </ScrollReveal>

        <div className="w-full pb-16">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] max-w-[1500px] mx-auto w-full">
            <AnimatePresence mode="popLayout">
              {UPCOMING_EVENTS.map((event) => {
                
                // Determine status styling
                let statusBadge = "";
                let statusDot = "";
                
                switch(event.status) {
                  case "Registration Open":
                    statusBadge = "border-green-500/30 text-green-400 bg-green-500/10";
                    statusDot = "bg-green-400";
                    break;
                  case "Coming Soon":
                    statusBadge = "border-yellow-500/30 text-yellow-400 bg-yellow-500/10";
                    statusDot = "bg-yellow-400";
                    break;
                  case "Registration Soon":
                    statusBadge = "border-blue-500/30 text-blue-400 bg-blue-500/10";
                    statusDot = "bg-blue-400";
                    break;
                  case "Completed":
                    statusBadge = "border-red-500/30 text-red-400 bg-red-500/10";
                    statusDot = "bg-red-400";
                    break;
                  default:
                    statusBadge = "border-purple-500/30 text-purple-400 bg-purple-500/10";
                    statusDot = "bg-purple-400";
                }

                return (
                  <motion.div
                    key={event.title}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="glass-card flex flex-col relative group overflow-hidden border border-white/5 hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] transition-all duration-500 transform hover:-translate-y-3 w-full text-left"
                    style={{ minHeight: "480px", borderRadius: "18px" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* Header Image with Zoom */}
                    <div className="relative w-full h-[220px] overflow-hidden shrink-0">
                      <div className="w-full h-full bg-gray-900 border-b border-white/10">
                        {event.image && (
                          <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent" />
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="badge badge-purple">{event.category}</span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="flex flex-col flex-1 p-[32px] pt-[24px]">
                      
                      {/* Status & Date Row */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`px-3 py-1 rounded-full border ${statusBadge} text-[12px] font-bold flex items-center gap-2 uppercase tracking-wide`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusDot} animate-pulse`} />
                          {event.status}
                        </div>
                        <span className="flex items-center gap-2 text-[14px] text-gray-400 font-medium">
                          <CalendarDays className="w-4 h-4 text-purple-400" /> {event.date}
                        </span>
                      </div>

                      <h3 className="text-[26px] font-extrabold text-white tracking-tight mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-400 leading-[1.6] text-[15px] mb-6 line-clamp-3">
                        {event.description}
                      </p>

                      <div className="mt-auto pt-4 border-t border-white/5 flex flex-col gap-4">
                        {/* Venue */}
                        <div className="flex items-center gap-2 text-gray-400 text-[14px] font-medium">
                          <MapPin className="w-4 h-4 text-cyan-400" /> {event.venue}
                        </div>
                        
                        {/* Action Button */}
                        <button className="flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition-colors text-[15px]">
                          Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
