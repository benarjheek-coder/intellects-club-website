"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, Variants } from "framer-motion";
import SectionDivider from "@/components/layout/SectionDivider";

// Statically imported for immediate rendering on default view
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";

// Dynamically imported components with ssr: false to significantly reduce initial JS payload
const About = dynamic(() => import("@/components/sections/About"), { ssr: false });
const Domains = dynamic(() => import("@/components/sections/Domains"), { ssr: false });
const WhyJoinUs = dynamic(() => import("@/components/sections/WhyJoinUs"), { ssr: false });

const Activities = dynamic(() => import("@/components/sections/Activities"), { ssr: false });
const UpcomingEvents = dynamic(() => import("@/components/sections/UpcomingEvents"), { ssr: false });
const LinkedInUpdates = dynamic(() => import("@/components/sections/LinkedInUpdates"), { ssr: false });

const Leadership = dynamic(() => import("@/components/sections/Leadership"), { ssr: false });
const Alumni = dynamic(() => import("@/components/sections/Alumni"), { ssr: false });

const Gallery = dynamic(() => import("@/components/sections/Gallery"), { ssr: false });
const Projects = dynamic(() => import("@/components/sections/Projects"), { ssr: false });


const FAQ = dynamic(() => import("@/components/sections/FAQ"), { ssr: false });
const ProfessionalNetwork = dynamic(() => import("@/components/sections/ProfessionalNetwork"), { ssr: false });
const InstagramShowcase = dynamic(() => import("@/components/sections/InstagramShowcase"), { ssr: false });
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: false });
const CTA = dynamic(() => import("@/components/sections/CTA"), { ssr: false });

export default function TabManager() {
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const basePath = hash.split('-')[0];
      if (["home", "about", "domains", "activities", "leadership", "gallery", "contact"].includes(basePath)) {
        setActiveTab(basePath);
        // Scroll to top when changing tabs
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (!hash) {
        setActiveTab("home");
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Animation variants for tab transitions
  const tabVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } }
  };

  return (
    <div className="w-full relative min-h-screen">
      <AnimatePresence mode="wait">
        {activeTab === "home" && (
          <motion.div key="home" variants={tabVariants} initial="initial" animate="animate" exit="exit">
            <Hero />
            <SectionDivider />
            <Stats />
          </motion.div>
        )}

        {activeTab === "about" && (
          <motion.div key="about" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="pt-24">
            <About />
            <SectionDivider />
            <WhyJoinUs />
          </motion.div>
        )}

        {activeTab === "domains" && (
          <motion.div key="domains" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="pt-24">
            <Domains />
          </motion.div>
        )}

        {activeTab === "activities" && (
          <motion.div key="activities" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="pt-24">
            <Activities />
            <SectionDivider />
            <UpcomingEvents />
            <SectionDivider />
            <LinkedInUpdates />
          </motion.div>
        )}

        {activeTab === "leadership" && (
          <motion.div key="leadership" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="pt-24">
            <Leadership />
            <SectionDivider />
            <Alumni />
          </motion.div>
        )}

        {activeTab === "gallery" && (
          <motion.div key="gallery" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="pt-24">
            <Gallery />
          </motion.div>
        )}

        {activeTab === "contact" && (
          <motion.div key="contact" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="pt-24">
            <ProfessionalNetwork />
            <SectionDivider />
            <InstagramShowcase />
            <SectionDivider />
            <Contact />
            <SectionDivider />
            <FAQ />
            <CTA />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
