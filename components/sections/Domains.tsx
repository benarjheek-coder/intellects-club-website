"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Crown, Monitor, CalendarDays, Palette, Smartphone, ArrowRight } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/effects/ScrollReveal";

const TimelineCard = ({ item, tStyles }: any) => {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-[22px] bg-[#030712]/60 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.05)] ${tStyles.shadow}`}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
    >
      <div 
        className={`absolute inset-0 rounded-[22px] bg-gradient-to-br ${tStyles.border} ${tStyles.hover} transition-all duration-300 pointer-events-none z-0`}
        style={{
          padding: "2.5px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude"
        }}
      />
      <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent ${tStyles.glow} transition-opacity duration-300 pointer-events-none z-0 blur-2xl opacity-0 group-hover:opacity-100`} />
      <div className="relative z-10 timeline-card-inner" style={{ 
        padding: '32px', 
        display: 'flex', 
        flexDirection: 'column', 
        boxSizing: 'border-box', 
        width: '100%' 
      }}>
        <div className="flex flex-col items-start text-left mb-6">
          {/* Header block with Icon & Title */}
          <div className="flex items-center gap-4 mb-5">
             <div className={`w-14 h-14 rounded-[16px] flex items-center justify-center bg-gradient-to-br ${tStyles.iconBg} shadow-lg shrink-0`}>
                <item.icon className="w-7 h-7 text-white" />
             </div>
             <h3 className="text-2xl font-extrabold text-white leading-tight tracking-tight m-0 p-0" style={{ wordBreak: 'break-word', fontFamily: "var(--font-space-grotesk)" }}>
               {item.title}
             </h3>
          </div>
          {/* Tagline */}
          <h4 className={`text-[17px] font-bold text-transparent bg-clip-text bg-gradient-to-r ${tStyles.textGradient} uppercase tracking-wide m-0`}>
             {item.tagline}
          </h4>
        </div>
        
        {/* Description */}
        <p className="text-gray-300 leading-[1.8] text-[16px] text-left m-0 mb-6 p-0" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>
          {item.desc}
        </p>

        {/* Responsibilities */}
        <div className="text-left m-0 p-0 mb-8">
          <ul className="flex flex-col gap-3 m-0 p-0">
            {item.responsibilities.map((resp: string) => (
              <li key={resp} className="flex items-start gap-3">
                <CheckCircle2 className={`w-5 h-5 ${tStyles.checkIcon} mt-0.5 shrink-0`} />
                <span className="text-gray-300 text-[16px] leading-[1.6] text-left m-0 p-0">{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-4 border-t border-white/10 text-left">
          <a href={item.link} className="inline-flex items-center gap-2 text-[15px] font-bold text-white group/btn">
             Meet Team 
             <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </motion.div>
  );
};

const getDomainStyles = (color: string) => {
  switch(color) {
    case 'gold': return { 
      border: "from-yellow-500/50 via-yellow-400/50 to-yellow-600/50",
      hover: "group-hover:from-yellow-400/90 group-hover:via-yellow-500/90 group-hover:to-yellow-500/90",
      glow: "group-hover:from-yellow-500/25 group-hover:via-yellow-400/25 group-hover:to-yellow-600/25",
      shadow: "hover:shadow-[0_20px_50px_-10px_rgba(250,204,21,0.4)]",
      nodeBg: "bg-yellow-500/20",
      nodeDot: "bg-yellow-400",
      nodeShadow: "shadow-[0_0_20px_rgba(250,204,21,0.8)]",
      textGradient: "from-yellow-400 to-yellow-200",
      lineGradient: "from-yellow-500 via-yellow-400 to-yellow-500",
      iconBg: "from-yellow-500 to-yellow-700",
      checkIcon: "text-yellow-400"
    };
    case 'blue': return { 
      border: "from-blue-500/50 via-cyan-500/50 to-blue-600/50",
      hover: "group-hover:from-blue-400/90 group-hover:via-cyan-500/90 group-hover:to-blue-500/90",
      glow: "group-hover:from-blue-500/25 group-hover:via-cyan-500/25 group-hover:to-blue-600/25",
      shadow: "hover:shadow-[0_20px_50px_-10px_rgba(59,130,246,0.4)]",
      nodeBg: "bg-blue-500/20",
      nodeDot: "bg-blue-400",
      nodeShadow: "shadow-[0_0_20px_rgba(96,165,250,0.8)]",
      textGradient: "from-blue-400 to-cyan-400",
      lineGradient: "from-blue-500 via-cyan-500 to-blue-400",
      iconBg: "from-blue-500 to-cyan-600",
      checkIcon: "text-blue-400"
    };
    case 'orange': return { 
      border: "from-orange-500/50 via-orange-400/50 to-orange-600/50",
      hover: "group-hover:from-orange-400/90 group-hover:via-orange-500/90 group-hover:to-orange-500/90",
      glow: "group-hover:from-orange-500/25 group-hover:via-orange-400/25 group-hover:to-orange-600/25",
      shadow: "hover:shadow-[0_20px_50px_-10px_rgba(249,115,22,0.4)]",
      nodeBg: "bg-orange-500/20",
      nodeDot: "bg-orange-400",
      nodeShadow: "shadow-[0_0_20px_rgba(251,146,60,0.8)]",
      textGradient: "from-orange-400 to-orange-200",
      lineGradient: "from-orange-500 via-orange-400 to-orange-500",
      iconBg: "from-orange-500 to-orange-700",
      checkIcon: "text-orange-400"
    };
    case 'pink': return { 
      border: "from-pink-500/50 via-pink-400/50 to-pink-600/50",
      hover: "group-hover:from-pink-400/90 group-hover:via-pink-500/90 group-hover:to-pink-500/90",
      glow: "group-hover:from-pink-500/25 group-hover:via-pink-400/25 group-hover:to-pink-600/25",
      shadow: "hover:shadow-[0_20px_50px_-10px_rgba(236,72,153,0.4)]",
      nodeBg: "bg-pink-500/20",
      nodeDot: "bg-pink-400",
      nodeShadow: "shadow-[0_0_20px_rgba(244,114,182,0.8)]",
      textGradient: "from-pink-400 to-pink-200",
      lineGradient: "from-pink-500 via-pink-400 to-pink-500",
      iconBg: "from-pink-500 to-pink-700",
      checkIcon: "text-pink-400"
    };
    case 'purple': return { 
      border: "from-purple-500/50 via-purple-400/50 to-purple-600/50",
      hover: "group-hover:from-purple-400/90 group-hover:via-purple-500/90 group-hover:to-purple-500/90",
      glow: "group-hover:from-purple-500/25 group-hover:via-purple-400/25 group-hover:to-purple-600/25",
      shadow: "hover:shadow-[0_20px_50px_-10px_rgba(168,85,247,0.4)]",
      nodeBg: "bg-purple-500/20",
      nodeDot: "bg-purple-400",
      nodeShadow: "shadow-[0_0_20px_rgba(192,132,252,0.8)]",
      textGradient: "from-purple-400 to-purple-200",
      lineGradient: "from-purple-500 via-purple-400 to-purple-500",
      iconBg: "from-purple-500 to-purple-700",
      checkIcon: "text-purple-400"
    };
    default: return getDomainStyles('blue');
  }
};

export default function Domains() {
  const DOMAINS_DATA = [
    { 
      title: "Executive Committee", 
      icon: Crown,
      tagline: "Leading Vision. Driving Excellence.",
      desc: "Provides strategic leadership for Intellects Club by coordinating every domain, guiding members, managing operations, and ensuring every initiative aligns with the club's mission.",
      responsibilities: ["Strategic Leadership", "Decision Making", "Club Operations", "Mentorship", "Coordination"],
      color: "gold",
      link: "#leadership-executive"
    },
    { 
      title: "Technical & Innovation", 
      icon: Monitor,
      tagline: "Building Tomorrow's Technology.",
      desc: "Develops software solutions, explores Artificial Intelligence, participates in hackathons, builds real-world projects, and conducts technical workshops that strengthen engineering skills.",
      responsibilities: ["Software Development", "AI Projects", "Hackathons", "Technical Workshops", "Open Source"],
      color: "blue",
      link: "#leadership-technical"
    },
    { 
      title: "Event Management", 
      icon: CalendarDays,
      tagline: "Turning Ideas Into Experiences.",
      desc: "Plans and executes workshops, flagship events, competitions, seminars, and technical programs while ensuring smooth coordination from planning to execution.",
      responsibilities: ["Event Planning", "Logistics", "Budgeting", "Team Coordination", "Execution"],
      color: "orange",
      link: "#leadership-events"
    },
    { 
      title: "Creative Team", 
      icon: Palette,
      tagline: "Designing The Identity Of Intellects.",
      desc: "Creates posters, branding, videos, graphics, promotional content, UI designs, and visual assets that represent the club across every platform.",
      responsibilities: ["Graphic Design", "Branding", "Video Editing", "UI Design", "Motion Graphics"],
      color: "pink",
      link: "#leadership-creative"
    },
    { 
      title: "Social Media Team", 
      icon: Smartphone,
      tagline: "Connecting Innovation With The Community.",
      desc: "Manages Instagram, LinkedIn, digital campaigns, announcements, event promotions, photography, videography, and audience engagement.",
      responsibilities: ["Social Media", "Photography", "Videography", "Marketing", "Community Engagement"],
      color: "purple",
      link: "#leadership-social"
    }
  ];

  return (
    <section
      id="domains"
      className="section-spacing relative w-full overflow-hidden"
      style={{ backgroundColor: "#030712" }}
      aria-labelledby="domains-heading"
    >
      <div className="bg-tech" aria-hidden="true" />
      <div className="container-premium relative z-10 mx-auto w-full max-w-[1400px]">
        
        {/* Animated Header */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <ScrollReveal>
            <div className="max-w-[800px] mx-auto flex flex-col items-center text-center mb-[80px] box-border px-4">
               <div className="inline-flex items-center justify-center mb-[18px]">
                 <span className="badge badge-purple shadow-[0_0_15px_rgba(168,85,247,0.4)] tracking-widest uppercase font-bold">OUR SPECIALIZED TEAMS</span>
               </div>
               <h2 id="domains-heading" className="text-4xl md:text-5xl font-extrabold text-white tracking-tight m-0" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Domains</span>
               </h2>
               <p className="w-full text-center mt-[24px] text-[1.15rem] leading-[1.9] m-0 p-0" style={{ color: "rgba(255,255,255,0.78)" }}>
                 Innovation at Intellects Club is powered by five specialized teams working together with one shared vision. Every domain contributes unique expertise to organize technical events, build innovative projects, strengthen leadership, and create meaningful experiences for the SRM community.
               </p>
            </div>
          </ScrollReveal>

          <div className="relative max-w-5xl mx-auto box-border pb-16">
            {/* Vertical Glowing Line */}
            <div className="absolute left-[36px] md:left-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-b from-yellow-500/50 via-purple-500/50 to-pink-500/50 -translate-x-1/2 rounded-full" />

            <StaggerContainer className="w-full flex flex-col gap-[140px]">
               {DOMAINS_DATA.map((item, i) => {
                 const tStyles = getDomainStyles(item.color);
                 return (
                   <StaggerItem key={item.title} className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between group cursor-default w-full box-border">
                      
                      {/* Desktop layout: alternating left/right */}
                      <div className={`hidden md:block w-5/12 ${i % 2 === 0 ? "text-right pr-14" : "order-3 pl-14 text-left"}`}>
                         <TimelineCard item={item} tStyles={tStyles} />
                      </div>

                      {/* Timeline Node */}
                      <div className="absolute left-[36px] md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#030712] border-4 border-gray-800 group-hover:border-white transition-colors duration-400 flex items-center justify-center z-20 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                         <div className={`w-8 h-8 rounded-full ${tStyles.nodeBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-400`}>
                            <div className={`w-2.5 h-2.5 rounded-full ${tStyles.nodeDot} ${tStyles.nodeShadow}`} />
                         </div>
                      </div>

                      {/* Mobile Card / Desktop Large Text + Icon Display */}
                      <div className={`w-full pl-24 md:w-5/12 md:pl-0 box-border flex flex-col justify-center ${i % 2 === 0 ? "order-3 text-left pl-14 items-start" : "text-right pr-14 items-end"}`}>
                         
                         <div className="md:hidden w-full box-border mb-6">
                           <TimelineCard item={item} tStyles={tStyles} />
                         </div>
                         
                         {/* Desktop Opposite Side Content */}
                         <div className={`hidden md:flex flex-col gap-6 ${i % 2 === 0 ? "items-start" : "items-end"}`}>
                           <div className={`w-16 h-16 rounded-[18px] flex items-center justify-center bg-gradient-to-br ${tStyles.iconBg} shadow-lg shadow-black/50 group-hover:shadow-[0_0_20px_${tStyles.shadow}] transition-all duration-500`}>
                              <item.icon className="w-8 h-8 text-white" />
                           </div>
                           <span className={`text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${tStyles.textGradient} opacity-70 group-hover:opacity-100 transition-opacity duration-400 drop-shadow-2xl leading-tight`} style={{ fontFamily: "var(--font-space-grotesk)" }}>
                             {item.title}
                           </span>
                         </div>

                      </div>
                   </StaggerItem>
                 );
               })}
            </StaggerContainer>
          </div>

          {/* Bottom CTA */}
          <ScrollReveal direction="up" className="w-full">
            <div className="max-w-[700px] mx-auto flex flex-col items-center text-center pb-8 pt-24">
              <h3 className="text-[32px] font-extrabold text-white tracking-tight mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                 Together We Build Intellects Club
              </h3>
              <p className="text-[17px] leading-[1.8] text-gray-300 mb-8 font-medium">
                 Every successful workshop, hackathon, competition, and innovation is made possible through the collaboration of these five specialized domains working together toward one common vision.
              </p>
              <a href="#about" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold tracking-wide shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-105 transition-all duration-300">
                 Join Our Community
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
