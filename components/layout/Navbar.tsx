"use client";
// =========================================================
// components/layout/Navbar.tsx
// Premium floating glassmorphism navbar
// =========================================================
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync active section with URL hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveSection(hash.split('-')[0]);
      } else {
        setActiveSection("home");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    window.location.hash = href;
  };

  return (
    <>
      <motion.header
        className={`fixed left-0 right-0 z-[1000] flex justify-center transition-all duration-500 ${
          scrolled ? "top-0 px-0" : "top-5 px-4 md:px-8"
        }`}
        role="banner"
      >
        <div
          className={`w-full transition-all duration-500 ease-out flex items-center justify-between ${
            scrolled ? "max-w-full" : "max-w-[1400px]"
          }`}
          style={{
            height: scrolled ? "72px" : "80px",
            backgroundColor: scrolled ? "rgba(10,10,18,0.95)" : "rgba(15,15,25,0.55)",
            backdropFilter: scrolled ? "blur(30px)" : "blur(20px)",
            borderTop: scrolled ? "none" : "1px solid rgba(255,255,255,0.12)",
            borderRight: scrolled ? "none" : "1px solid rgba(255,255,255,0.12)",
            borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.12)",
            borderLeft: scrolled ? "none" : "1px solid rgba(255,255,255,0.12)",
            borderRadius: scrolled ? "0px" : "20px",
            boxShadow: scrolled
              ? "0 10px 30px rgba(0,0,0,0.5)"
              : "0 0 30px rgba(124,58,237,0.15)",
            padding: scrolled ? "0 32px" : "0 24px",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-4 group"
            aria-label="Intellects Club — back to top"
          >
            <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center flex-shrink-0 overflow-hidden rounded-xl bg-white/5 border border-white/10 group-hover:border-purple-500/50 transition-colors">
               <img src="/images/logo.jpg" alt="Intellects Club Logo" className="object-contain w-full h-full scale-150" />
            </div>
            <span
              className="font-bold text-xl text-white tracking-wide"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Intellects
              <span
                className="font-light ml-1"
                style={{ color: "#a855f7" }}
              >
                Club
              </span>
            </span>
          </button>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-8 h-full" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href} className="h-full flex items-center">
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-4 py-1.5 text-[13px] font-medium transition-all duration-300 rounded-full ${
                      isActive 
                        ? "bg-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]" 
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="relative z-10">{link.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => handleNavClick("#contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex text-sm font-bold text-white transition-all duration-300 relative overflow-hidden group rounded-[16px]"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                boxShadow: "0 0 20px rgba(124,58,237,0.4)",
                padding: "16px 36px",
              }}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 tracking-wide">Join Club</span>
            </motion.button>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[2000] flex flex-col justify-center items-center"
            style={{
              backgroundColor: "rgba(3,7,18,0.98)",
              backdropFilter: "blur(30px)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-8 right-8 p-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close mobile menu"
            >
              <X className="w-8 h-8" />
            </button>

            <nav
              className="flex flex-col items-center gap-8 w-full px-6"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.4, ease: "easeOut" }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-3xl font-bold tracking-wider text-gray-400 hover:text-white transition-colors duration-300 hover:scale-105"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                onClick={() => handleNavClick("#contact")}
                className="mt-8 text-lg font-bold text-white transition-all duration-300 relative overflow-hidden group rounded-[20px] w-full max-w-[300px]"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  boxShadow: "0 0 30px rgba(124,58,237,0.4)",
                  padding: "20px 0",
                }}
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 tracking-widest uppercase">Join the Club</span>
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
