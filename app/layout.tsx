// =========================================================
// app/layout.tsx — Root Layout
// Next.js 16 App Router
// =========================================================
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/effects/SmoothScroll";
import GlobalAmbient from "@/components/effects/GlobalAmbient";
import "./globals.css";

// ── Fonts ─────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// ── SEO Metadata ──────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Intellects Club — SRM IST Ramapuram",
    template: "%s | Intellects Club",
  },
  description:
    "Intellects Club is the premier technical community at SRM Institute of Science and Technology, Ramapuram. Empowering students through hackathons, workshops, open-source projects, and mentorship.",
  keywords: [
    "Intellects Club",
    "SRM Ramapuram",
    "SRM IST",
    "Technical Club",
    "Hackathon Chennai",
    "Student Community",
    "Coding Club",
    "Innovation Hub",
  ],
  authors: [{ name: "Intellects Club" }],
  creator: "Intellects Club — SRM IST Ramapuram",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://intellects.srmrmp.edu.in",
    title: "Intellects Club — SRM IST Ramapuram",
    description:
      "Innovate. Build. Inspire. The official technical community of SRM IST Ramapuram.",
    siteName: "Intellects Club",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intellects Club — SRM IST Ramapuram",
    description: "Innovate. Build. Inspire.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

// ── Root Layout ───────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        {/* Global Ambient Background Effects */}
        <GlobalAmbient />

        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
