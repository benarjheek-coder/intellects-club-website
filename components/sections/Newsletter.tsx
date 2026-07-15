"use client";
// =========================================================
// components/sections/Newsletter.tsx
// Email signup with animated border + success state
// =========================================================
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, Mail, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/effects/ScrollReveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading" || status === "success") return;

    setStatus("loading");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus("success");
    setEmail("");
  };

  return (
    <section
      id="newsletter"
      className="section-spacing relative w-full flex justify-center"
      style={{ backgroundColor: "#030712" }}
      aria-labelledby="newsletter-heading"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(124,58,237,0.08) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="container-premium relative z-10 flex flex-col items-center">
        <div className="w-full max-w-2xl text-center">
          <ScrollReveal>
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(37,99,235,0.2))",
              border: "1px solid rgba(124,58,237,0.3)",
            }}
          >
            <Sparkles className="w-8 h-8" style={{ color: "#a855f7" }} />
          </div>

          <h2
            id="newsletter-heading"
            className="section-heading text-white mb-4"
          >
            Stay in the{" "}
            <span className="gradient-text-purple">Loop</span>
          </h2>
          <p
            className="text-base mb-10 leading-relaxed"
            style={{ color: "#9ca3af" }}
          >
            Get notified about upcoming hackathons, workshops, and community events —
            directly in your inbox. No spam, ever.
          </p>

          {/* Form */}
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.2))",
                    border: "2px solid rgba(16,185,129,0.4)",
                  }}
                >
                  <Check className="w-8 h-8" style={{ color: "#34d399" }} />
                </div>
                <p className="font-semibold text-white">You&apos;re in!</p>
                <p className="text-sm" style={{ color: "#9ca3af" }}>
                  We&apos;ll send you updates on all the exciting things happening at Intellects Club.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div
                  className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(17,24,39,0.8)",
                    border: focused
                      ? "1px solid rgba(124,58,237,0.6)"
                      : "1px solid rgba(55,65,81,0.5)",
                    boxShadow: focused
                      ? "0 0 20px rgba(124,58,237,0.15)"
                      : "none",
                  }}
                >
                  <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#6b7280" }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-500"
                    required
                    aria-label="Email address for newsletter"
                    style={{ minWidth: 0 }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary text-sm py-3 px-6 flex-shrink-0 justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === "loading" ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Subscribe
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {status !== "success" && (
            <p className="text-xs mt-4" style={{ color: "#6b7280" }}>
              Join 500+ members already subscribed · Unsubscribe anytime
            </p>
          )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
