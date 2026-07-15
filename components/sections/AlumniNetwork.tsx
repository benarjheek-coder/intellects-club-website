"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Mail, ArrowRight, Star, Building, Users, Briefcase, Calendar, ChevronLeft, ChevronRight, GraduationCap, MapPin, Target } from "lucide-react";
import { LinkedinIcon as Linkedin } from "@/components/icons/LinkedinIcon";
import Image from "next/image";
import { FEATURED_ALUMNI, ALUMNI_STATS, TOP_RECRUITERS, ALUMNI_TIMELINE } from "@/lib/data";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/effects/ScrollReveal";

const ALUMNI_TESTIMONIALS = [
  {
    name: "Vikram Anand",
    company: "Razorpay",
    rating: 5,
    quote: "Intellects Club helped me discover leadership and technical confidence that shaped my career.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80"
  },
  {
    name: "Meera Subramanian",
    company: "EduTech Startup",
    rating: 5,
    quote: "The connections I made through the alumni network have been invaluable to my entrepreneurial journey.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
  },
  {
    name: "Aditya Kumar",
    company: "Google",
    rating: 5,
    quote: "The mentorship I received from senior alumni was the secret to cracking my dream job interviews.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80"
  }
];

// Reusable Counter Component for Stats
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
      {count}{suffix}
    </div>
  );
}

export default function AlumniNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Timeline Progress
  const timelineHeight = useTransform(scrollYProgress, [0.3, 0.8], ["0%", "100%"]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % ALUMNI_TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden" style={{ backgroundColor: "#02040a" }}>
      {/* Dynamic Backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-purple-900/10 blur-[120px] -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-0 w-[600px] h-[600px] bg-blue-900/10 blur-[150px] -z-10 rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[150px] -z-10 rounded-full pointer-events-none" />

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" xmlns=\"http://www.w3.org/2000/svg\"><g stroke=\"%23FFF\" stroke-width=\"1\" fill=\"none\"><path d=\"M0 30V0h30\"/></g></svg>')" }} />

      <div className="container-premium relative z-10 pt-32 pb-20">
        
        {/* HERO SECTION */}
        <ScrollReveal className="text-center mb-32 flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-purple-400 max-w-4xl leading-tight drop-shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            Building Leaders <br className="hidden md:block"/> Beyond Campus
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            The journey doesn't end at graduation. Our alumni continue to innovate, lead industries, build startups, and inspire the next generation of Intellects Club members.
          </p>
        </ScrollReveal>

        {/* SECTION 1 - FEATURED ALUMNI */}
        <div className="mb-40">
          <ScrollReveal direction="up" className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Featured Alumni</h2>
              <p className="text-gray-400">Meet the trailblazers shaping the future.</p>
            </div>
            <div className="flex gap-4">
              <button onClick={slideLeft} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-purple-500/50 transition-all">
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button onClick={slideRight} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-purple-500/50 transition-all">
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </ScrollReveal>

          <div 
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mx-4 px-4 md:mx-0 md:px-0"
            style={{ scrollBehavior: "smooth" }}
          >
            {FEATURED_ALUMNI.map((alumni, i) => (
              <motion.div 
                key={i}
                className="relative min-w-[320px] md:min-w-[380px] snap-center group"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />
                <div className="relative h-full bg-[#0a0a10] border border-white/10 rounded-3xl p-8 flex flex-col justify-between overflow-hidden z-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full blur-2xl pointer-events-none" />
                  
                  <div>
                    <div className="flex items-center gap-6 mb-6">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-purple-500/50 transition-colors">
                        <Image src={alumni.image} alt={alumni.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{alumni.name}</h3>
                        <p className="text-purple-400 font-medium text-sm">{alumni.role}</p>
                        <p className="text-gray-400 text-xs mt-1">@ {alumni.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10">{alumni.department}</span>
                      <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10">Batch {alumni.batch}</span>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                      "{alumni.bio}"
                    </p>
                  </div>
                  
                  <div className="flex gap-4 mt-8 pt-6 border-t border-white/5">
                    <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 py-3 rounded-xl transition-all">
                      <Linkedin className="w-4 h-4" />
                      <span className="text-sm font-semibold">LinkedIn</span>
                    </a>
                    <a href={`mailto:${alumni.email}`} className="flex items-center justify-center w-12 h-12 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10">
                      <Mail className="w-4 h-4 text-gray-300" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION 2 - ALUMNI SUCCESS WALL */}
        <div className="mb-40">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The Impact Wall</h2>
            <p className="text-gray-400">Numbers that define our global footprint.</p>
          </ScrollReveal>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {ALUMNI_STATS.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="relative group p-8 rounded-3xl bg-white/5 border border-white/5 overflow-hidden flex flex-col items-center justify-center text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-gray-400 font-medium mt-4 text-sm md:text-base uppercase tracking-wider">{stat.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* SECTION 3 - TOP RECRUITERS */}
        <div className="mb-40 py-12 border-y border-white/10 bg-white/[0.02]">
          <h3 className="text-center text-sm font-bold text-gray-500 uppercase tracking-widest mb-12">Alumni Placed In Top Companies</h3>
          <div className="relative flex overflow-x-hidden group">
            <div className="absolute top-0 bottom-0 left-0 w-32 z-10 bg-gradient-to-r from-[#02040a] to-transparent" />
            <div className="absolute top-0 bottom-0 right-0 w-32 z-10 bg-gradient-to-l from-[#02040a] to-transparent" />
            
            <div className="animate-marquee flex whitespace-nowrap items-center group-hover:[animation-play-state:paused]">
              {TOP_RECRUITERS.map((company, i) => (
                <span key={i} className="text-2xl md:text-3xl font-black text-white/20 hover:text-white mx-8 md:mx-16 transition-all duration-300 cursor-default hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                  {company}
                </span>
              ))}
            </div>
            <div className="animate-marquee flex whitespace-nowrap items-center group-hover:[animation-play-state:paused] absolute top-0">
              {TOP_RECRUITERS.map((company, i) => (
                <span key={`clone-${i}`} className="text-2xl md:text-3xl font-black text-white/20 hover:text-white mx-8 md:mx-16 transition-all duration-300 cursor-default hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4 - ALUMNI TESTIMONIALS */}
        <div className="mb-40 relative">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Voices of Success</h2>
          </ScrollReveal>
          
          <div className="relative max-w-4xl mx-auto h-[350px] md:h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="w-full h-full p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl flex flex-col justify-center shadow-2xl relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 text-[150px] text-white/5 font-serif leading-none">"</div>
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                    ))}
                  </div>
                  
                  <p className="text-xl md:text-2xl lg:text-3xl font-medium text-white mb-8 leading-relaxed">
                    "{ALUMNI_TESTIMONIALS[currentTestimonial].quote}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20">
                      <Image src={ALUMNI_TESTIMONIALS[currentTestimonial].image} alt="Alumni" width={56} height={56} className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{ALUMNI_TESTIMONIALS[currentTestimonial].name}</h4>
                      <p className="text-gray-400">{ALUMNI_TESTIMONIALS[currentTestimonial].company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {ALUMNI_TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === currentTestimonial ? 'w-8 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 5 - ALUMNI MENTORSHIP & SECTION 6 - TIMELINE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-40">
          
          {/* MENTORSHIP CARD */}
          <ScrollReveal direction="left" className="h-full">
            <div className="h-full p-10 md:p-14 rounded-[40px] bg-gradient-to-br from-blue-900/30 to-purple-900/10 border border-white/10 relative overflow-hidden group flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/20 blur-[100px] pointer-events-none group-hover:bg-cyan-500/30 transition-all duration-700" />
              
              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] mb-8">
                  <Users className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Connect With <br/>Our Alumni</h2>
                
                <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md">
                  Book mentorship sessions, career guidance, resume reviews, interview preparation, and networking opportunities with experienced alumni.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button className="flex-1 px-6 py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-100 transition-all text-center">
                  Book Mentorship
                </button>
                <button className="flex-1 px-6 py-4 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 border border-white/10 transition-all text-center backdrop-blur-md">
                  Become a Mentor
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* TIMELINE */}
          <div className="relative pl-8 md:pl-12 py-10">
            <h3 className="text-2xl font-bold text-white mb-10">The Alumni Journey</h3>
            
            <div className="absolute left-0 top-[100px] bottom-0 w-[2px] bg-white/10" />
            <motion.div 
              className="absolute left-0 top-[100px] bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-cyan-400 to-transparent"
              style={{ height: timelineHeight }}
            />

            <StaggerContainer className="flex flex-col gap-10">
              {ALUMNI_TIMELINE.map((item, i) => (
                <StaggerItem key={i} className="relative">
                  {/* Glowing dot */}
                  <div className="absolute -left-[37px] md:-left-[53px] top-1.5 w-4 h-4 rounded-full bg-[#02040a] border-2 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] z-10" />
                  
                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                    <span className="text-cyan-400 font-bold text-lg">{item.year}</span>
                    <h4 className="text-xl font-bold text-white mt-1 mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* SECTION 7 - JOIN ALUMNI NETWORK CTA */}
        <ScrollReveal direction="up">
          <div className="w-full rounded-[40px] p-[2px] bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 opacity-50 blur-xl group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative bg-[#05050a] rounded-[38px] p-10 md:p-20 text-center flex flex-col items-center justify-center z-10">
              {/* Radial background flare */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] bg-gradient-to-tr from-purple-500/20 to-blue-500/20 blur-[100px] pointer-events-none" />
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Once an Intellect, <br/> Always an Intellect.
              </h2>
              
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                Stay connected with your club, mentor students, attend reunions, and grow together with the Intellects Club Alumni Network.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md mx-auto">
                <button className="flex-1 flex items-center justify-center gap-2 px-8 py-5 rounded-2xl bg-white text-black font-bold hover:scale-105 transition-transform">
                  Join Alumni Network <ArrowRight className="w-5 h-5" />
                </button>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-8 py-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold hover:scale-105 transition-transform border border-blue-400/50 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
