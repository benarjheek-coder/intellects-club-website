"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ThumbsUp, MessageCircle } from "lucide-react";
import { LinkedinIcon as Linkedin } from "@/components/icons/LinkedinIcon";
import { LINKEDIN_UPDATES } from "@/lib/data";
import ScrollReveal from "@/components/effects/ScrollReveal";

const LINKEDIN_URL = "https://www.linkedin.com/company/intellectsclub-srm-ramapuram/";

export default function LinkedInUpdates() {
  return (
    <section
      id="linkedin-updates"
      className="section-spacing relative w-full flex justify-center overflow-hidden"
      style={{ backgroundColor: "#030712" }}
      aria-labelledby="updates-heading"
    >
      {/* Background glow */}
      <div 
        className="absolute top-1/4 right-0 w-[500px] h-[500px] pointer-events-none transform-gpu" 
        style={{ background: 'radial-gradient(circle, rgba(10,102,194,0.08) 0%, transparent 70%)' }} 
      />

      <div className="container-premium relative z-10 flex flex-col items-center">
        <ScrollReveal className="text-center mb-[80px] w-full">
           <div className="inline-flex items-center gap-2 mb-6 justify-center w-full">
              <span className="badge flex items-center gap-2" style={{ backgroundColor: "rgba(10,102,194,0.15)", color: "#60a5fa", border: "1px solid rgba(10,102,194,0.3)" }}>
                 <Linkedin className="w-3.5 h-3.5" fill="currentColor" /> Official Updates
              </span>
           </div>
           <h2
             id="updates-heading"
             className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight"
             style={{ fontFamily: "var(--font-space-grotesk)" }}
           >
             Club <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Updates</span>
           </h2>
           <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Discover the latest happenings, recruitment announcements, and technical milestones directly from our official LinkedIn page.
           </p>
        </ScrollReveal>

        <div className="w-full pb-16">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] max-w-[1500px] mx-auto w-full">
            <AnimatePresence mode="popLayout">
              {LINKEDIN_UPDATES.map((update, index) => {
                
                return (
                  <motion.div
                    key={update.title}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
                    className={`glass-card flex flex-col relative group overflow-hidden border border-white/5 hover:border-blue-500/40 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] w-full text-left ${update.featured ? 'md:col-span-2' : ''}`}
                    style={{ borderRadius: "18px", backgroundColor: "rgba(17,24,39,0.5)" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* Header Image */}
                    <div className="relative w-full overflow-hidden shrink-0 h-[240px]">
                      <div className="w-full h-full bg-gray-900 border-b border-white/10">
                        {update.image && (
                          <img 
                            src={update.image} 
                            alt={update.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent opacity-60" />
                      </div>
                      
                      {/* LinkedIn Icon Badge over image */}
                      <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#0a66c2] flex items-center justify-center shadow-lg">
                        <Linkedin className="w-5 h-5 text-white" fill="currentColor" />
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="flex flex-col flex-1 p-[32px] pt-[24px]">
                      
                      {/* Date */}
                      <div className="text-gray-400 text-sm font-medium mb-3">
                        {update.postedDate}
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3 leading-snug" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                        {update.title}
                      </h3>
                      
                      <p className="text-gray-400 leading-[1.6] text-[15px] mb-6 line-clamp-3">
                        {update.description}
                      </p>

                      <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
                        
                        {/* Engagement Row */}
                        <div className="flex items-center gap-4 text-gray-400 text-[13px] font-semibold">
                           <div className="flex items-center gap-1.5 hover:text-blue-400 transition-colors cursor-pointer">
                              <ThumbsUp className="w-4 h-4" /> {update.likes}
                           </div>
                           <div className="flex items-center gap-1.5 hover:text-blue-400 transition-colors cursor-pointer">
                              <MessageCircle className="w-4 h-4" /> {update.comments}
                           </div>
                        </div>

                        {/* Action Link */}
                        <a 
                          href={LINKEDIN_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-blue-400 font-bold hover:text-blue-300 transition-colors text-[14px] group/link"
                        >
                          View on LinkedIn <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </a>

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
