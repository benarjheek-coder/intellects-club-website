"use client";
// =========================================================
// components/sections/About.tsx
// Premium refined glassmorphism cards and timeline
// =========================================================
import { motion } from "framer-motion";
import { Target, Eye, Star, CheckCircle2, Users } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/effects/ScrollReveal";

const PremiumCard = ({ 
  children, 
  className = "", 
  innerClassName = "flex flex-col h-full", 
  padding = "32px",
  onClick = undefined, 
  borderGradient = "from-purple-500/50 via-blue-500/50 to-cyan-500/50", 
  hoverBorderGradient = "group-hover:from-purple-500/90 group-hover:via-blue-500/90 group-hover:to-cyan-500/90", 
  glowGradient = "group-hover:from-purple-500/25 group-hover:via-blue-500/25 group-hover:to-cyan-500/25",
  hoverShadow = "hover:shadow-[0_20px_50px_-10px_rgba(168,85,247,0.4)]"
}: any) => {
  return (
    <motion.div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[22px] bg-[#030712]/60 backdrop-blur-3xl transition-all duration-300 ease-out shadow-[0_8px_32px_0_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.05)] ${hoverShadow} ${className}`}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
    >
      {/* 2.5px Gradient Border mask */}
      <div 
        className={`absolute inset-0 rounded-[22px] bg-gradient-to-br ${borderGradient} ${hoverBorderGradient} transition-all duration-300 pointer-events-none z-0`}
        style={{
          padding: "2.5px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude"
        }}
      />
      
      {/* Soft Neon Glow inside card on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent ${glowGradient} transition-opacity duration-300 pointer-events-none z-0 blur-2xl opacity-0 group-hover:opacity-100`} />

      {/* Guaranteed safe zone via inline style padding */}
      <div 
        className={`relative z-10 box-border w-full ${innerClassName}`} 
        style={{ padding: padding }}
      >
        {children}
      </div>
    </motion.div>
  );
};

// --- NEW COMPONENT SPECIFICALLY FOR TIMELINE CARDS ---
const TimelineCard = ({ item, tStyles }: any) => {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-[22px] bg-[#030712]/60 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.05)] ${tStyles.shadow}`}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
    >
      {/* 2.5px Gradient Border mask */}
      <div 
        className={`absolute inset-0 rounded-[22px] bg-gradient-to-br ${tStyles.border} ${tStyles.hover} transition-all duration-300 pointer-events-none z-0`}
        style={{
          padding: "2.5px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude"
        }}
      />
      
      {/* Soft Neon Glow inside card on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent ${tStyles.glow} transition-opacity duration-300 pointer-events-none z-0 blur-2xl opacity-0 group-hover:opacity-100`} />

      {/* Internal layout EXACTLY as required */}
      <div className="relative z-10 timeline-card-inner" style={{ 
        padding: '32px', 
        display: 'flex', 
        flexDirection: 'column', 
        boxSizing: 'border-box', 
        width: '100%' 
      }}>
        <div className="flex flex-col items-center text-center w-full">
          <h3 className="text-[34px] font-[800] text-white leading-tight tracking-tight m-0 p-0" style={{ wordBreak: 'break-word' }}>
            {item.title}
          </h3>
          <div className="w-[160px] h-[4px] mt-[22px] mb-[24px] rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee] shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
        </div>
        
        {item.desc}
      </div>
    </motion.div>
  );
};
// ----------------------------------------------------

const getTimelineStyles = (color: string) => {
  switch(color) {
    case 'purple': return {
      border: "from-purple-500/50 via-fuchsia-500/50 to-pink-500/50",
      hover: "group-hover:from-purple-500/90 group-hover:via-fuchsia-500/90 group-hover:to-pink-500/90",
      glow: "group-hover:from-purple-500/25 group-hover:via-fuchsia-500/25 group-hover:to-pink-500/25",
      shadow: "hover:shadow-[0_20px_50px_-10px_rgba(168,85,247,0.4)]",
      nodeBg: "bg-purple-500/20",
      nodeDot: "bg-purple-400",
      nodeShadow: "shadow-[0_0_20px_rgba(192,132,252,0.8)]",
      textGradient: "from-purple-400 to-fuchsia-400"
    };
    case 'blue': return {
      border: "from-blue-500/50 via-indigo-500/50 to-cyan-500/50",
      hover: "group-hover:from-blue-500/90 group-hover:via-indigo-500/90 group-hover:to-cyan-500/90",
      glow: "group-hover:from-blue-500/25 group-hover:via-indigo-500/25 group-hover:to-cyan-500/25",
      shadow: "hover:shadow-[0_20px_50px_-10px_rgba(59,130,246,0.4)]",
      nodeBg: "bg-blue-500/20",
      nodeDot: "bg-blue-400",
      nodeShadow: "shadow-[0_0_20px_rgba(96,165,250,0.8)]",
      textGradient: "from-blue-400 to-indigo-400"
    };
    case 'cyan': return {
      border: "from-cyan-500/50 via-teal-500/50 to-emerald-500/50",
      hover: "group-hover:from-cyan-500/90 group-hover:via-teal-500/90 group-hover:to-emerald-500/90",
      glow: "group-hover:from-cyan-500/25 group-hover:via-teal-500/25 group-hover:to-emerald-500/25",
      shadow: "hover:shadow-[0_20px_50px_-10px_rgba(6,182,212,0.4)]",
      nodeBg: "bg-cyan-500/20",
      nodeDot: "bg-cyan-400",
      nodeShadow: "shadow-[0_0_20px_rgba(34,211,238,0.8)]",
      textGradient: "from-cyan-400 to-teal-400"
    };
    default: return { 
      border: "from-purple-500/50 via-blue-500/50 to-cyan-500/50",
      hover: "group-hover:from-purple-500/90 group-hover:via-blue-500/90 group-hover:to-cyan-500/90",
      glow: "group-hover:from-purple-500/25 group-hover:via-blue-500/25 group-hover:to-cyan-500/25",
      shadow: "hover:shadow-[0_20px_50px_-10px_rgba(168,85,247,0.4)]",
      nodeBg: "bg-purple-500/20",
      nodeDot: "bg-purple-400",
      nodeShadow: "shadow-[0_0_20px_rgba(192,132,252,0.8)]",
      textGradient: "from-purple-400 to-fuchsia-400"
    };
  }
};

export default function About() {
  const JOURNEY_MILESTONES = [
    { 
      year: "Late 2023", 
      title: "The Beginning", 
      desc: (
        <p className="text-gray-300 leading-[1.8] text-[17px] text-left m-0 p-0" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>
          Intellects Club officially began its journey in late 2023 under the Department of Computer Science and Engineering at SRM Institute of Science and Technology, Ramapuram. The club was established to create a collaborative platform where students could innovate, build technical skills, develop leadership qualities, and work on impactful projects together.
        </p>
      ), 
      color: "purple" 
    },
    { 
      year: "15 Feb 2025", 
      title: "Prompt Kraft – AI Workshop", 
      desc: (
        <>
          <p className="text-gray-300 leading-[1.8] text-[17px] text-left m-0 p-0" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>
            Prompt Kraft became one of the club's first flagship technical workshops, introducing students to the rapidly evolving world of Artificial Intelligence and Prompt Engineering.
          </p>
          
          <div className="text-left m-0 p-0 flex flex-col gap-[18px]">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px] font-bold uppercase tracking-wider m-0">Highlights</span>
            </div>
            <ul className="flex flex-col gap-[12px] m-0 p-0">
              {[
                "Zero-shot, Few-shot and Chain-of-Thought prompting",
                "Hands-on chatbot development using Hugging Face",
                "Prompt optimization and ethical AI discussions",
                "Interactive coding sessions",
                "Certificates and recognition for participants"
              ].map(highlight => (
                <li key={highlight} className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <span className="text-gray-300 text-[17px] leading-[1.8] text-left m-0 p-0" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="impact-box p-[20px] rounded-[18px] bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20 flex flex-col sm:flex-row gap-5 items-start sm:items-center text-left box-border w-full m-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex flex-col gap-2">
              <h5 className="font-bold text-white text-[11px] uppercase tracking-widest opacity-80 m-0 p-0">Impact</h5>
              <p className="text-[17px] text-gray-300 leading-[1.8] font-medium text-left m-0 p-0" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>
                89 enthusiastic participants successfully completed the workshop and gained practical AI development experience.
              </p>
            </div>
          </div>
        </>
      ), 
      color: "blue" 
    },
    { 
      year: "2025", 
      title: "TEXUS – Inter-College Technical Event", 
      desc: (
        <>
          <p className="text-gray-300 leading-[1.8] text-[17px] text-left m-0 p-0" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>
            Following the success of Prompt Kraft, Intellects Club organized TEXUS, welcoming students from institutions including A.M. Jain College, Saveetha Engineering College, Eswari Engineering College, and Sathyabama Engineering College.
          </p>
          
          <div className="text-left m-0 p-0 flex flex-col gap-[18px]">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] font-bold uppercase tracking-wider m-0">Highlights</span>
            </div>
            <ul className="flex flex-col gap-[12px] m-0 p-0">
              {[
                "Technical workshop",
                "Hands-on AI development",
                "Chatbot building competition",
                "Collaborative learning environment"
              ].map(highlight => (
                <li key={highlight} className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                  <span className="text-gray-300 text-[17px] leading-[1.8] text-left m-0 p-0" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="impact-box p-[20px] rounded-[18px] bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-500/20 flex flex-col sm:flex-row gap-5 items-start sm:items-center text-left box-border w-full m-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/20 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Users className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="flex flex-col gap-2">
              <h5 className="font-bold text-white text-[11px] uppercase tracking-widest opacity-80 m-0 p-0">Impact</h5>
              <p className="text-[17px] text-gray-300 leading-[1.8] font-medium text-left m-0 p-0" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>
                71 participants successfully designed their own AI-powered chatbots, making TEXUS a highly successful inter-college event.
              </p>
            </div>
          </div>
        </>
      ), 
      color: "cyan" 
    },
    { 
      year: "2026", 
      title: "Blind Stack Challenge", 
      desc: (
        <>
          <p className="text-gray-300 leading-[1.8] text-[17px] text-left m-0 p-0" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>
            During TEXUS 2026, the club introduced the Blind Stack Challenge, a unique technical competition focused on creativity, logical thinking, and problem-solving under challenging conditions.
          </p>
          
          <div className="text-left m-0 p-0 flex flex-col gap-[18px]">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-bold uppercase tracking-wider m-0">Highlights</span>
            </div>
            <ul className="flex flex-col gap-[12px] m-0 p-0">
              {[
                "Innovative technical challenge",
                "Team collaboration",
                "Real-world problem solving",
                "Practical development experience"
              ].map(highlight => (
                <li key={highlight} className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                  <span className="text-gray-300 text-[17px] leading-[1.8] text-left m-0 p-0" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="impact-box p-[20px] rounded-[18px] bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 flex flex-col sm:flex-row gap-5 items-start sm:items-center text-left box-border w-full m-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/20 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex flex-col gap-2">
              <h5 className="font-bold text-white text-[11px] uppercase tracking-widest opacity-80 m-0 p-0">Impact</h5>
              <p className="text-[17px] text-gray-300 leading-[1.8] font-medium text-left m-0 p-0" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>
                28 participants actively competed, marking another successful milestone in the club's journey.
              </p>
            </div>
          </div>
        </>
      ), 
      color: "purple" 
    },
    { 
      year: "Present & Beyond", 
      title: "Growing Into The Future", 
      desc: (
        <p className="text-gray-300 leading-[1.8] text-[17px] text-left m-0 p-0" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>
          Today, Intellects Club continues to inspire students through workshops, coding challenges, project showcases, innovation initiatives, leadership opportunities, and technical events. The club remains committed to building a vibrant community where students learn, innovate, collaborate, and prepare for successful careers in technology.
        </p>
      ), 
      color: "blue" 
    }
  ];

  return (
    <section
      id="about"
      className="section-spacing relative w-full flex justify-center overflow-hidden"
      style={{ backgroundColor: "#030712" }}
      aria-labelledby="about-heading"
    >
      <div className="bg-tech" aria-hidden="true" />
      <div className="container-premium relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column - Text & Visuals */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="right">
              <PremiumCard 
                padding="32px 32px 32px 32px"
                borderGradient="from-purple-500/50 via-blue-500/50 to-cyan-500/50"
              >
                <div className="relative z-10 text-left w-full box-border">
                  
                  <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col">
                      <div className="inline-flex items-center gap-2 mb-8">
                        <span className="badge badge-purple shadow-[0_0_15px_rgba(168,85,247,0.4)]">Who We Are</span>
                      </div>
                      <h2
                        id="about-heading"
                        className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        Who We Are
                      </h2>
                    </div>

                    {/* SRM Logo - Top Right */}
                    <div className="w-[140px] sm:w-[180px] h-[55px] sm:h-[70px] bg-white rounded-[12px] p-2 shadow-[0_0_20px_rgba(168,85,247,0.2)] flex items-center justify-center shrink-0 border border-white/20 ml-4">
                      <img 
                        src="/images/srm-ramapuram-logo.png" 
                        onError={(e) => { e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/en/f/fe/Srmseal.png"; }}
                        alt="SRM Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  <p className="text-[17px] text-gray-300 leading-[1.8] mb-10 text-left m-0 p-0" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>
                    Intellects Club is a student-led technical community at SRM Institute of Science and Technology, Ramapuram. The club provides opportunities for students to build technical skills, collaborate on innovative projects, organize impactful events, and grow as future leaders through teamwork and creativity.
                  </p>
                  
                  {/* Featured Image - Inner Premium Card */}
                  <div className="relative w-full aspect-[16/9] hidden sm:block mt-6">
                    <PremiumCard padding="0" className="w-full h-full group/img">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent z-10 opacity-60" />
                      <div className="absolute inset-0 bg-purple-500/10 mix-blend-overlay z-10" />
                      
                      <img 
                        src="/images/ai-robotics.jpg" 
                        alt="AI Robotics Innovation"
                        className="w-full h-full object-cover transform group-hover/img:scale-105 transition-transform duration-700 ease-out"
                      />
                      
                      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                        <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase drop-shadow-md">Innovation</span>
                      </div>
                    </PremiumCard>
                  </div>
                </div>
              </PremiumCard>
            </ScrollReveal>
          </div>

          {/* Right Column - Premium Information Blocks */}
          <div className="lg:col-span-7 flex flex-col h-full w-full">
            <StaggerContainer className="flex flex-col w-full h-full">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
                {/* Mission */}
                <StaggerItem className="flex flex-col h-full w-full">
                  <PremiumCard padding="32px" className="h-full w-full flex flex-col">
                    <h3 className="text-[24px] font-extrabold text-white mb-[24px] flex items-center gap-[16px] tracking-tight text-left">
                      <div className="w-12 h-12 rounded-[14px] bg-purple-500/20 flex items-center justify-center border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)] shrink-0">
                        <Target className="w-6 h-6 text-purple-400" />
                      </div>
                      <span>Mission</span>
                    </h3>
                    <div className="flex-1 flex flex-col">
                      <ul className="flex flex-col gap-[14px] text-[17px] text-gray-300 relative z-10 leading-[1.8] font-medium text-left box-border m-0 px-0 pb-0">
                         <li className="flex items-start gap-4 text-left">
                            <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                            <span className="m-0 p-0" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>Encourage innovation</span>
                         </li>
                         <li className="flex items-start gap-4 text-left">
                            <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                            <span className="m-0 p-0" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>Promote project-based learning</span>
                         </li>
                         <li className="flex items-start gap-4 text-left">
                            <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                            <span className="m-0 p-0" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>Organize technical events</span>
                         </li>
                         <li className="flex items-start gap-4 text-left">
                            <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                            <span className="m-0 p-0" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>Build leadership qualities</span>
                         </li>
                         <li className="flex items-start gap-4 text-left">
                            <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                            <span className="m-0 p-0" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>Foster teamwork and collaboration</span>
                         </li>
                      </ul>
                    </div>
                  </PremiumCard>
                </StaggerItem>

                {/* Vision */}
                <StaggerItem className="flex flex-col h-full w-full">
                  <PremiumCard 
                    padding="32px"
                    className="h-full w-full flex flex-col"
                    borderGradient="from-blue-500/50 via-cyan-500/50 to-teal-500/50"
                    hoverBorderGradient="group-hover:from-blue-500/90 group-hover:via-cyan-500/90 group-hover:to-teal-500/90"
                    glowGradient="group-hover:from-blue-500/25 group-hover:via-cyan-500/25 group-hover:to-teal-500/25"
                    hoverShadow="hover:shadow-[0_20px_50px_-10px_rgba(59,130,246,0.4)]"
                  >
                    <h3 className="text-[24px] font-extrabold text-white mb-[22px] flex items-center gap-[16px] tracking-tight text-left">
                      <div className="w-12 h-12 rounded-[14px] bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)] shrink-0">
                        <Eye className="w-6 h-6 text-blue-400" />
                      </div>
                      <span>Vision</span>
                    </h3>
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="text-[17px] leading-[1.8] text-gray-300 relative z-10 font-medium text-left m-0 px-0 pb-0" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>
                         To build an innovative student community that inspires learning, leadership, technical excellence, collaboration, and meaningful real-world impact by empowering students to create, innovate, and grow together.
                      </p>
                    </div>
                  </PremiumCard>
                </StaggerItem>
              </div>

              {/* Core Values - Full Width Bottom Row */}
              <StaggerItem className="flex flex-col h-full w-full mt-[48px]">
                <PremiumCard 
                  padding="24px 32px 28px 32px"
                  className="h-full w-full flex flex-col"
                  borderGradient="from-cyan-500/50 via-blue-500/50 to-purple-500/50"
                  hoverBorderGradient="group-hover:from-cyan-500/90 group-hover:via-blue-500/90 group-hover:to-purple-500/90"
                  glowGradient="group-hover:from-cyan-500/25 group-hover:via-blue-500/25 group-hover:to-purple-500/25"
                  hoverShadow="hover:shadow-[0_20px_50px_-10px_rgba(6,182,212,0.4)]"
                >
                  <h3 className="text-[24px] font-extrabold text-white mb-[20px] flex items-center gap-[16px] tracking-tight text-left">
                    <div className="w-12 h-12 rounded-[14px] bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)] shrink-0">
                      <Star className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span>Core Values</span>
                  </h3>
                  <div className="flex flex-wrap gap-x-[16px] gap-y-[14px] flex-1 content-center items-center relative z-10 text-left box-border m-0 px-0 pb-0">
                     {["Innovation", "Collaboration", "Leadership", "Integrity", "Community", "Growth"].map(value => (
                        <div key={value} className="flex justify-center items-center gap-3 py-3 px-6 rounded-full bg-[#030712]/50 border border-cyan-500/20 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300 group/pill shadow-lg backdrop-blur-md cursor-default">
                           <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)] group-hover/pill:scale-125 transition-transform shrink-0" />
                           <span className="text-[17px] font-bold tracking-wide text-gray-200 group-hover/pill:text-white transition-colors m-0 p-0">{value}</span>
                        </div>
                     ))}
                  </div>
                </PremiumCard>
              </StaggerItem>

            </StaggerContainer>
          </div>
        </div>

        {/* Animated Timeline of Club Journey */}
        <div className="mt-40 relative z-10">
          <ScrollReveal>
            <div className="w-full flex flex-col items-center justify-center text-center mb-[60px] box-border">
               <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-[20px] tracking-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  Our <span className="gradient-text-blue">Journey</span>
               </h3>
               <p className="text-[17px] text-gray-400 max-w-[800px] leading-[1.8] font-medium m-0 p-0 text-center" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>
                  From a student initiative to one of SRM Ramapuram's growing technical communities, Intellects Club continues to empower students through innovation, leadership, collaboration, and hands-on learning.
               </p>
            </div>
          </ScrollReveal>

          <div className="relative max-w-5xl mx-auto box-border">
            {/* Vertical Line */}
            <div className="absolute left-[36px] md:left-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-b from-purple-500/50 via-cyan-500/50 to-transparent -translate-x-1/2 rounded-full" />

            <StaggerContainer className="space-y-16 md:space-y-24 w-full">
               {JOURNEY_MILESTONES.map((item, i) => {
                 const tStyles = getTimelineStyles(item.color);
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

                      {/* Mobile Card / Desktop Year */}
                      <div className={`w-full pl-24 md:w-5/12 md:pl-0 box-border ${i % 2 === 0 ? "order-3 text-left pl-14" : "text-right pr-14"}`}>
                         <div className="md:hidden w-full box-border mb-6">
                           <TimelineCard item={item} tStyles={tStyles} />
                         </div>
                         
                         <span className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${tStyles.textGradient} opacity-70 group-hover:opacity-100 transition-opacity duration-400 drop-shadow-2xl`} style={{ fontFamily: "var(--font-space-grotesk)" }}>
                           {item.year}
                         </span>
                      </div>
                   </StaggerItem>
                 );
               })}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
