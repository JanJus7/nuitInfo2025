"use client";
import Hero from "./Hero";
import VillageGrid from "./VillageGrid";
import Challenge from "./Challenge";
import Footer from "./Footer";

export default function HomeContent() {
  return (
    <div className="font-sans min-h-screen p-6 bg-gradient-to-b from-indigo-950 to-black text-yellow-100">
      <div className="max-w-5xl mx-auto space-y-16">
        
        <Hero />
        
        <VillageGrid />

        {/* Ancre du quiz */}
        <div id="nird-quiz">
          <Challenge />
        </div>

        <Footer />
      </div>
    </div>
  );
}
