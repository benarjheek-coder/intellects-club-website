"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/lib/data";
import ScrollReveal from "@/components/effects/ScrollReveal";

const CATEGORIES = [
  "All",
  "Workshops",
  "Hackathons",
  "AI & Chatbot",
  "Competitions",
  "Club Activities",
  "Special Events",
  "Alumni"
];

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const openLightbox = (idx: number) => {
    setLightboxIdx(idx);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxIdx(null);
    document.body.style.overflow = "";
  };

  const prev = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx - 1 + filteredItems.length) % filteredItems.length);
  };
  const next = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + 1) % filteredItems.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  return (
    <section id="gallery" className="relative w-full overflow-hidden" style={{ backgroundColor: "#02040a" }}>
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-0 w-[800px] h-[800px] pointer-events-none transform-gpu" style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 60%)' }} />
      <div className="absolute bottom-1/4 right-0 w-[800px] h-[800px] pointer-events-none transform-gpu" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 60%)' }} />

      <div className="container-premium relative z-10 flex flex-col items-center px-4 md:px-8">
        
        {/* HEADER SECTION */}
        <ScrollReveal className="w-full max-w-[850px] mx-auto text-center flex flex-col items-center" style={{ paddingTop: "150px", paddingBottom: "50px" }}>
          
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md mb-[24px]">
            <span className="text-sm font-medium text-purple-200 tracking-widest uppercase">✨ OUR GALLERY</span>
          </div>
          
          {/* Heading */}
          <h2 className="text-[40px] md:text-[56px] lg:text-[72px] font-[900] tracking-[-2px] text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-500 to-blue-500 text-center leading-tight drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            OUR MOMENTS
          </h2>

          {/* Subtitle */}
          <p className="max-w-[850px] w-full text-[22px] leading-[1.8] text-white/80 text-center mt-[24px] mb-[40px]">
            Explore workshops, hackathons, technical sessions, club meetings, competitions and memorable moments from Intellects Club.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-[16px] mb-[50px]">
            {CATEGORIES.map(cat => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative flex items-center justify-center h-[48px] px-[28px] py-[18px] rounded-full font-semibold text-[16px] transition-all duration-300 group border ${
                    isSelected 
                      ? "text-white border-transparent" 
                      : "text-gray-300 border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.05)] backdrop-blur-[20px] hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  }`}
                  style={{
                    background: isSelected ? "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)" : undefined,
                    boxShadow: isSelected ? "0 0 20px rgba(168, 85, 247, 0.4)" : undefined,
                  }}
                >
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* MASONRY GALLERY */}
        <ScrollReveal className="w-full max-w-[1500px] mx-auto pb-32">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20 text-gray-500 font-medium text-lg border border-white/5 rounded-3xl bg-white/[0.01]">
              Images coming soon...
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-[24px] w-full">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="break-inside-avoid mb-[24px] relative group overflow-hidden cursor-pointer bg-[#0a0a10]"
                    onClick={() => openLightbox(i)}
                    style={{
                      borderRadius: "18px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)"
                    }}
                  >
                    <motion.div className="w-full h-full relative" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}>
                      <Image
                        src={item.src}
                        alt={item.title}
                        width={600}
                        height={800}
                        className="w-full h-auto object-cover"
                        sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      
                      {/* Purple Glow */}
                      <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen pointer-events-none z-10" />
                      
                      {/* Content Overlay */}
                      {item.category !== "Alumni" && (
                        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 z-20 flex flex-col justify-end">
                          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                            {item.category}
                          </span>
                          <h3 className="text-xl font-bold text-white mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-150">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity delay-200 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity delay-300">
                            <span className="text-sm font-semibold text-white">View Photo</span>
                            <ArrowRightIcon className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </ScrollReveal>
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[2000] flex flex-col items-center justify-center p-4 md:p-8"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            {/* Background Blur */}
            <div className="absolute inset-0 bg-[#02040a]/80 backdrop-blur-xl" />

            {/* Controls */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center z-50 hover:bg-white/20 transition-colors text-white backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>

            {filteredItems.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center z-50 hover:bg-white/20 transition-colors text-white backdrop-blur-md"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center z-50 hover:bg-white/20 transition-colors text-white backdrop-blur-md"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Lightbox Content */}
            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-6xl max-h-[85vh] flex flex-col md:flex-row bg-[#0a0a0f]/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-40 backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Side */}
              <div className={`relative w-full ${filteredItems[lightboxIdx].category === "Alumni" ? "md:w-full" : "md:w-2/3"} h-[50vh] md:h-[80vh] bg-black/50 flex items-center justify-center p-4`}>
                <Image
                  src={filteredItems[lightboxIdx].src}
                  alt={filteredItems[lightboxIdx].title}
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>

              {/* Details Side */}
              {filteredItems[lightboxIdx].category !== "Alumni" && (
                <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-center bg-white/5 border-l border-white/10">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-sm font-semibold mb-6 border border-purple-500/30 w-fit uppercase tracking-widest">
                    {filteredItems[lightboxIdx].category}
                  </span>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    {filteredItems[lightboxIdx].title}
                  </h2>
                  
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {filteredItems[lightboxIdx].description}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Arrow icon helper
function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
