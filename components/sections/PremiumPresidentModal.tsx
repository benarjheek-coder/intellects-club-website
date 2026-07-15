"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Crown, X, Mail, Sparkles, Target, Zap, ChevronRight, Award, Quote } from "lucide-react";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";

interface Member {
  name: string;
  role: string;
  image: string;
  links?: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
}

interface PremiumPresidentModalProps {
  member: Member;
  onClose: () => void;
}

export default function PremiumPresidentModal({ member, onClose }: PremiumPresidentModalProps) {
  // Lock ONLY the body scroll, allow modal scrolling.
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const journeySections = [
    { title: "The Beginning", content: "I joined Intellects Club as an enthusiastic student eager to learn, build meaningful projects, and challenge myself beyond the classroom. Every opportunity became a stepping stone toward growth, confidence, and leadership." },
    { title: "The Turning Point", content: "As time passed, my perspective changed. Instead of asking what the club could offer me, I began asking how I could contribute to its future. That single mindset shift transformed my entire journey." },
    { title: "Leading with Responsibility", content: "Before becoming President, I coordinated the TEXUS Pitching Team, organized meetings, solved challenges, encouraged collaboration, and helped transform ideas into successful initiatives. Leadership wasn't given. It was earned through consistency, trust, accountability, and taking ownership." },
    { title: "My Vision", content: "My vision goes beyond conducting events. I aspire to build a culture where students innovate fearlessly, create impactful projects, compete nationally, collaborate openly, and become future technology leaders. Every initiative should inspire students to grow beyond academics." },
    { title: "Leadership Philosophy", content: "Leadership does not begin with a title. It begins the moment you choose responsibility over comfort and action over excuses." },
    { title: "Looking Ahead", content: "This journey is only the beginning. Every event, workshop, recruitment, project, and milestone is another step toward building one of the strongest technical communities at SRM Ramapuram. The best is yet to come." }
  ];

  const achievements = [
    { icon: Crown, title: "Leadership", desc: "Built Through Trust" },
    { icon: Zap, title: "Innovation", desc: "Projects • AI • Technical Growth" },
    { icon: Target, title: "Events", desc: "Prompt Kraft, TEXUS, Blind Stack" },
    { icon: Sparkles, title: "Vision", desc: "Empowering Future Innovators" },
  ];

  const leadershipJourney = [
    "Joined Intellects Club",
    "Built Technical Projects",
    "Participated in Hackathons",
    "Led TEXUS Pitching Team",
    "Became President",
    "Currently Leading Intellects Club"
  ];

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 20 }}
      transition={{ type: "spring", bounce: 0, duration: 0.5 }}
      className="relative w-[95vw] h-[90vh] max-w-7xl rounded-3xl overflow-hidden bg-[#0a0a0f]/90 backdrop-blur-3xl border border-white/10 shadow-[0_0_80px_rgba(255,215,0,0.15)] flex flex-col lg:flex-row"
      onClick={(e) => e.stopPropagation()} // Stop closing when clicking modal body
    >
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #9333ea, #eab308);
          border-radius: 999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #a855f7, #facc15);
        }
      `}</style>

      {/* Background glow effects inside modal */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-500/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-300 hover:text-white transition-all backdrop-blur-md group"
      >
        <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Left Column: Image & Persona (Sticky on Desktop) */}
      <div className="w-full lg:w-[40%] h-[40vh] lg:h-full flex-shrink-0 relative z-10 flex flex-col items-center justify-center p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10 bg-gradient-to-b from-black/40 to-transparent">
        <motion.div 
          className="relative w-full max-w-[320px] aspect-[3/4] mb-[40px]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Gold Crown */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]">
            <Crown className="w-16 h-16 fill-yellow-400/20" />
          </div>
          
          {/* Image Container with Gold Border */}
          <div className="absolute inset-0 rounded-[24px] p-[2px] bg-gradient-to-b from-yellow-400 via-purple-500 to-blue-600 shadow-[0_0_40px_rgba(250,204,21,0.2)]">
            <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-black">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
          </div>
        </motion.div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 mb-[24px] tracking-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            {member.name}
          </h2>
          <div className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-[24px]">
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-bold tracking-widest uppercase text-sm">{member.role}</span>
          </div>
          <p className="text-gray-400 font-medium tracking-wide">SRM Intellects Club</p>
        </div>
      </div>

      {/* Right Column: Content (Scrollable) */}
      <div 
        className="w-full lg:w-[60%] flex-1 overflow-y-auto custom-scrollbar relative z-10 p-[32px] lg:p-[64px]"
        style={{ overscrollBehavior: 'contain', maxHeight: '90vh' }}
        tabIndex={0}
      >
        <div className="max-w-3xl mx-auto flex flex-col gap-[32px] pb-20">
          
          {/* Header */}
          <div className="relative inline-block mb-[16px]">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-[24px]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              From Member to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">President</span>
            </h3>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-yellow-400 to-transparent rounded-full"
            />
          </div>

          {/* Journey Section Cards */}
          <div>
            <h4 className="text-2xl font-bold text-white/90 flex items-center gap-3 mb-[24px]">
              <Sparkles className="w-6 h-6 text-purple-400" /> My Journey
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
              {journeySections.map((section, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all rounded-[20px] backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)] flex flex-col overflow-hidden h-full"
                >
                  {/* Header Section */}
                  <div className="w-full h-[52px] bg-black/40 border-b border-purple-500/30 flex items-center px-[20px]">
                    <h5 className="text-[20px] lg:text-[24px] font-[700] text-purple-300 m-0 leading-none">{section.title}</h5>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-[24px] flex-1">
                    <p className="text-gray-300/90 text-[16px] leading-[1.9] m-0">
                      {section.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements Grid */}
          <div>
            <h4 className="text-2xl font-bold text-white/90 flex items-center gap-3 mb-[24px]">
              <Target className="w-6 h-6 text-blue-400" /> Core Focus
            </h4>
            <div className="grid grid-cols-2 gap-[24px]">
              {achievements.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[22px] p-[24px] flex flex-col items-center justify-center text-center hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all h-full min-h-[160px]"
                >
                  <item.icon className="w-8 h-8 text-yellow-400 mb-[18px]" />
                  <h5 className="text-white text-[16px] font-bold mb-[12px] m-0">{item.title}</h5>
                  <p className="text-gray-400 text-[14px] leading-[1.5] m-0">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* New Leadership Journey Simple Card */}
          <div>
            <h4 className="text-2xl font-bold text-white/90 flex items-center gap-3 mb-[24px]">
              <ChevronRight className="w-6 h-6 text-yellow-400" /> Leadership Journey
            </h4>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-yellow-500/30 rounded-[22px] p-[24px] backdrop-blur-sm shadow-[0_8px_30px_rgba(250,204,21,0.15)] relative"
            >
              <h5 className="text-yellow-400 text-[18px] font-[700] uppercase tracking-wider m-0">LATE 2023 - PRESENT</h5>
              <div className="w-full h-[2px] bg-yellow-500/70 mt-[20px] mb-[18px]" />

              <div className="flex flex-col gap-[18px]">
                {leadershipJourney.map((title, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className="flex items-center"
                  >
                    {/* Gold Bullet */}
                    <div className="flex-shrink-0 w-[8px] h-[8px] rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)] mr-[20px]" />
                    {/* Text */}
                    <h5 className="text-[16px] font-[600] text-white/90 leading-tight m-0">{title}</h5>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* New Independent Quote Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-black/40 border border-white/5 border-l-[4px] border-l-yellow-400 rounded-r-[22px] rounded-l-sm p-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.3)] mt-[24px]"
          >
            <h4 className="text-xl font-bold text-yellow-400/90 flex items-center gap-3 m-0">
              <Quote className="w-5 h-5 text-yellow-400/70" /> Leadership Quote
            </h4>
            <div className="w-full h-[2px] bg-yellow-500/30 mt-[16px] mb-[20px]" />
            <p className="relative z-10 text-[18px] md:text-[20px] font-medium text-white/90 italic leading-[1.9] m-0">
              "Leadership is not about holding a position. It is about creating opportunities for others to grow."
            </p>
          </motion.div>

          {/* Connect With President Section */}
          <div className="pt-[16px]">
            <h4 className="text-2xl font-bold text-white/90 flex items-center gap-3 mb-[24px]">
              <Award className="w-6 h-6 text-yellow-400" /> Connect With President
            </h4>
            <div className="flex flex-col sm:flex-row gap-[24px]">
              <a 
                href="https://www.linkedin.com/in/7karthiks?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-3 px-[24px] py-[16px] rounded-[22px] bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all"
              >
                <LinkedinIcon className="w-6 h-6" />
                LinkedIn
              </a>
              <a 
                href="mailto:karthik.santhanam2007@gmail.com"
                className="flex flex-1 items-center justify-center gap-3 px-[24px] py-[16px] rounded-[22px] bg-gradient-to-r from-yellow-600 to-yellow-400 text-white font-bold hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transition-all"
              >
                <Mail className="w-6 h-6" />
                Email
              </a>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
