// =========================================================
// app/page.tsx — Homepage Assembly
// Server Component — all interactive parts are Client Components
// =========================================================
import dynamic from 'next/dynamic';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TabManager from "@/components/layout/TabManager";
import LoadingScreen from "@/components/effects/LoadingScreen";
import BackToTop from "@/components/effects/BackToTop";

export default function HomePage() {
  return (
    <>
      {/* Full-screen loading screen */}
      <LoadingScreen />

      {/* Sticky navigation */}
      <Navbar />

      {/* Main content via TabManager */}
      <main id="main-content">
        <TabManager />
      </main>

      {/* Footer (includes Contact & Newsletter) */}
      <Footer />

      {/* Floating back-to-top button */}
      <BackToTop />
    </>
  );
}
