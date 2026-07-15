"use client";
import React from "react";
import { Camera } from "lucide-react";
import { LinkedinIcon as Linkedin } from "@/components/icons/LinkedinIcon";

const LINKEDIN_URL = "https://www.linkedin.com/company/intellectsclub-srm-ramapuram/";
const INSTAGRAM_URL = "https://www.instagram.com/intellects_srmramapuram/";

export default function CTA() {
  return (
    <div style={{ display: "block", height: "auto", overflow: "visible", position: "relative", width: "100%" }}>
      {/* FAQ CTA SECTION */}
      <section id="faq-cta" className="w-full" style={{ display: "block", height: "auto", overflow: "visible", position: "relative" }}>
        <div style={{ maxWidth: "1200px", margin: "100px auto 100px auto", padding: "0 20px", display: "block", position: "relative" }}>
          <div className="w-full rounded-[30px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] p-12 md:p-16 flex flex-col items-center justify-center text-center backdrop-blur-[16px] transition-colors duration-500" style={{ display: "block", position: "relative" }}>
            <h3 className="text-[40px] md:text-[56px] font-bold text-white mb-[24px] tracking-tight leading-tight">
              Still have questions?
            </h3>
            
            <p className="text-[18px] md:text-[20px] text-gray-400 font-medium mb-[40px] max-w-[700px] mx-auto">
              We're always happy to help. Reach out to us for any queries about joining the club or participating in our events.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-[20px] w-full">
              <a href="#contact" className="w-full sm:w-[220px] h-[60px] flex items-center justify-center rounded-xl bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] text-white font-bold text-[16px] hover:bg-[rgba(255,255,255,0.15)] transition-colors duration-300 backdrop-blur-md">
                Contact Us
              </a>
              <a href="https://docs.google.com/forms" target="_blank" rel="noopener noreferrer" className="w-full sm:w-[220px] h-[60px] flex items-center justify-center rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white font-bold text-[16px] hover:bg-[rgba(255,255,255,0.08)] transition-colors duration-300 backdrop-blur-md">
                Join Intellects Club
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION SEPARATOR */}
      <div className="w-full flex justify-center items-center" style={{ display: "flex", height: "auto", overflow: "visible", position: "relative" }}>
        <div className="w-[240px] h-[1px] rounded-full" style={{ background: 'linear-gradient(90deg, transparent 0%, #a855f7 30%, #22d3ee 70%, transparent 100%)', boxShadow: "0 0 20px rgba(34,211,238,0.6)" }} />
      </div>

      {/* SOCIAL CONNECT SECTION */}
      <section id="social-connect" className="w-full" style={{ display: "block", height: "auto", overflow: "visible", position: "relative" }}>
        <div style={{ maxWidth: "1280px", margin: "120px auto 140px auto", padding: "70px", display: "block", position: "relative", borderRadius: "32px", backgroundColor: "rgba(15, 20, 35, 0.9)", border: "1.5px solid rgba(255,255,255,0.1)", backdropFilter: "blur(24px)" }}>
          <div className="flex flex-col items-center text-center">
            <h2
              className="text-4xl md:text-[48px] font-black text-white mb-6 tracking-wide leading-tight"
              style={{ fontFamily: "var(--font-space-grotesk)", textShadow: "0 0 20px rgba(255,255,255,0.1)" }}
            >
              Stay Connected with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 whitespace-nowrap">Intellects Club</span>
            </h2>
            
            <p className="text-gray-300 text-lg md:text-[20px] max-w-[900px] mx-auto mb-[40px]" style={{ lineHeight: 1.8 }}>
              Follow our official LinkedIn page to explore recruitment updates, technical initiatives, workshops, leadership announcements, project showcases, and community activities.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-[24px] w-full">
               <a 
                 href={LINKEDIN_URL}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-full sm:w-[240px] h-[60px] rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300"
                 style={{ 
                    background: "linear-gradient(135deg, #0a66c2 0%, #004182 100%)",
                 }}
               >
                  <Linkedin className="w-6 h-6 text-white" fill="white" />
                  <span className="text-white text-[16px]">Follow on LinkedIn</span>
               </a>
               
               <a 
                 href={INSTAGRAM_URL}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-full sm:w-[240px] h-[60px] rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.12)] hover:border-pink-500/50 hover:bg-[rgba(255,255,255,0.1)] backdrop-blur-md"
               >
                  <Camera className="w-6 h-6 text-pink-400" />
                  <span className="text-white text-[16px]">Visit Instagram</span>
               </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
