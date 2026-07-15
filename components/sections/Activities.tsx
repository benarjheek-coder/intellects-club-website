"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { ACTIVITIES } from "@/lib/data";
import { Cpu, Bot, Code2, Terminal, HelpCircle, Lightbulb, Users, UserPlus, MonitorPlay, ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  Cpu, Bot, Code2, Terminal, HelpCircle, Lightbulb, Users, UserPlus, MonitorPlay
};

const ROW_1_CATEGORIES = ["All", "AI Workshop", "Competitions", "Pitching", "Networking"];
const ROW_2_CATEGORIES = ["Recruitment", "Project Showcase", "Quiz"];

export default function Activities() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredActivities = activeTab === "All"
    ? ACTIVITIES
    : ACTIVITIES.filter(a => a.category === activeTab);

  return (
    <section
      id="activities"
      className="relative w-full flex justify-center overflow-hidden"
      style={{ backgroundColor: "#02040a" }}
      aria-labelledby="activities-heading"
    >
      {/* 3D Grid Background */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[50vh] opacity-20 pointer-events-none transform-gpu"
        style={{
           backgroundSize: "40px 40px",
           backgroundImage: "linear-gradient(to right, rgba(124,58,237,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,58,237,0.2) 1px, transparent 1px)",
           transform: "perspective(500px) rotateX(60deg) scale(2) translateZ(0)",
           transformOrigin: "bottom center",
           willChange: "transform"
        }}
      />
      
      {/* Glow Effects */}
      <div 
        className="absolute top-1/4 left-0 w-[800px] h-[800px] pointer-events-none transform-gpu" 
        style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 60%)' }} 
      />
      <div 
        className="absolute bottom-1/4 right-0 w-[800px] h-[800px] pointer-events-none transform-gpu" 
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 60%)' }} 
      />

      <div className="container-premium relative z-10 flex flex-col items-center px-4 md:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="w-full max-w-[760px] mx-auto text-center flex flex-col items-center" style={{ paddingTop: "120px", paddingBottom: "70px" }}>
          <span className="badge badge-purple mb-6">OUR ACTIVITIES</span>
          <h2
            id="activities-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-space-grotesk)", textShadow: "0 0 40px rgba(255,255,255,0.1)" }}
          >
            Club Activities
          </h2>
          <p className="text-[18px] text-gray-400 leading-[1.8] font-medium m-0 p-0 text-center w-full" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>
            Explore the premium initiatives, competitive challenges, and impactful programs that define our community.
          </p>
        </ScrollReveal>

        {/* Category Filters */}
        <div className="sticky top-[80px] z-[100] w-full flex flex-col items-center gap-[18px] pt-[20px] pb-[40px] mb-[60px] bg-[#02040a]/85 backdrop-blur-xl border-b border-white/5 shadow-[0_30px_40px_-15px_rgba(2,4,10,0.8)]">
          {/* Row 1 */}
          <div className="flex flex-wrap justify-center gap-[18px]">
            {ROW_1_CATEGORIES.map(category => (
               <button
                 key={category}
                 onClick={() => setActiveTab(category)}
                 className="relative w-[170px] h-[50px] rounded-[12px] text-[15px] font-bold transition-all duration-300 flex items-center justify-center shrink-0"
                 style={{ color: activeTab === category ? "#fff" : "#9ca3af" }}
               >
                 {activeTab === category && (
                   <motion.div
                     layoutId="activities-tab"
                     className="absolute inset-0 rounded-[12px]"
                     style={{
                       background: "linear-gradient(135deg, rgba(124,58,237,0.9), rgba(6,182,212,0.9))",
                       boxShadow: "0 0 20px rgba(124,58,237,0.4)"
                     }}
                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
                   />
                 )}
                 <span className="relative z-10">{category}</span>
                 {activeTab !== category && (
                   <div className="absolute inset-0 rounded-[12px] border border-gray-800 bg-gray-900/50 hover:bg-gray-800 transition-colors -z-10" />
                 )}
               </button>
            ))}
          </div>
          {/* Row 2 */}
          <div className="flex flex-wrap justify-center gap-[18px]">
            {ROW_2_CATEGORIES.map(category => (
               <button
                 key={category}
                 onClick={() => setActiveTab(category)}
                 className="relative w-[170px] h-[50px] rounded-[12px] text-[15px] font-bold transition-all duration-300 flex items-center justify-center shrink-0"
                 style={{ color: activeTab === category ? "#fff" : "#9ca3af" }}
               >
                 {activeTab === category && (
                   <motion.div
                     layoutId="activities-tab"
                     className="absolute inset-0 rounded-[12px]"
                     style={{
                       background: "linear-gradient(135deg, rgba(124,58,237,0.9), rgba(6,182,212,0.9))",
                       boxShadow: "0 0 20px rgba(124,58,237,0.4)"
                     }}
                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
                   />
                 )}
                 <span className="relative z-10">{category}</span>
                 {activeTab !== category && (
                   <div className="absolute inset-0 rounded-[12px] border border-gray-800 bg-gray-900/50 hover:bg-gray-800 transition-colors -z-10" />
                 )}
               </button>
            ))}
          </div>
        </div>

        {/* Animated Grid */}
        <div className="w-full pb-32">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] max-w-[1500px] mx-auto w-full">
            <AnimatePresence mode="popLayout">
              {filteredActivities.map((activity) => {
                const Icon = iconMap[activity.icon] || Code2;
                return (
                  <motion.div
                    key={activity.title}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="glass-card flex flex-col relative group overflow-hidden border border-white/5 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(124,58,237,0.2)] transition-all duration-500 transform hover:-translate-y-3 w-full text-left"
                    style={{ minHeight: "430px", padding: "32px", borderRadius: "22px" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className={`flex items-start ${activity.image ? 'justify-end' : 'justify-between'} relative z-10 w-full shrink-0 ${activity.image ? 'mb-4' : ''}`}>
                      {activity.image ? (
                        <span className="badge badge-cyan shrink-0">{activity.category}</span>
                      ) : (
                        <>
                          <div className="w-[60px] h-[60px] rounded-[18px] flex items-center justify-center bg-purple-900/30 border border-purple-500/40 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(168,85,247,0.2)] shrink-0">
                            <Icon className="w-8 h-8 text-purple-400" />
                          </div>
                          <span className="badge badge-cyan shrink-0 ml-4">{activity.category}</span>
                        </>
                      )}
                    </div>
                    
                    {activity.image && (
                      <div className="relative w-full h-[180px] sm:h-[220px] rounded-[16px] overflow-hidden p-[2px] bg-gradient-to-r from-purple-500/40 to-cyan-500/40 shadow-[0_0_20px_rgba(168,85,247,0.2)] shrink-0">
                        <div className="w-full h-full rounded-[14px] overflow-hidden">
                          <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    )}

                    <h3 className="text-[28px] font-extrabold text-white tracking-tight relative z-10 w-full shrink-0" style={{ fontFamily: "var(--font-space-grotesk)", marginTop: activity.image ? "24px" : "22px" }}>
                      {activity.title}
                    </h3>

                    {activity.subtitle && (
                      <h4 className="text-[18px] font-bold text-cyan-400 relative z-10 w-full shrink-0 mt-2">
                        {activity.subtitle}
                      </h4>
                    )}
                    
                    <p className="text-gray-400 leading-[1.8] text-[16px] relative z-10 w-full" style={{ wordBreak: 'normal', overflowWrap: 'break-word', marginTop: "20px" }}>
                      {activity.description}
                    </p>

                    <div className="relative z-10 w-full mt-auto shrink-0" style={{ paddingTop: "25px" }}>
                       <div className="text-[15px] font-bold text-gray-300 flex items-center gap-2 mb-4">
                         <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                         Event Highlights
                       </div>
                       <ul className="space-y-3">
                         {(activity.highlights || [
                           "Practical implementation and hands-on technical sessions.",
                           "Exclusive networking with industry experts and peers."
                         ]).map((highlight, idx) => (
                           <li key={idx} className="flex items-start gap-3 text-gray-500 text-[15px] leading-[1.6]">
                             <ArrowRight className="w-4 h-4 text-purple-500 shrink-0 mt-1" />
                             <span>{highlight}</span>
                           </li>
                         ))}
                       </ul>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
          {filteredActivities.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="w-full text-center py-20 text-gray-500 text-lg"
            >
              No activities found for this category yet.
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
