"use client";
import React from "react";
import Hero from "./Hero";
import VillageGrid from "./VillageGrid";
import Challenge from "./Challenge";
import Footer from "./Footer";

export default function HomeContent() {
  return (
    <div className="font-sans min-h-screen p-6 bg-gradient-to-b from-indigo-950 to-black text-yellow-100">
      <div className="max-w-5xl mx-auto space-y-16">
        <Hero />

        <section id="why" className="mt-6">
          <h2 className="text-2xl font-semibold">Pourquoi le NIRD ?</h2>
          <p className="mt-3 text-yellow-200">Le NIRD promeut des pratiques pour réduire la dépendance aux grandes plateformes et rendre les établissements plus autonomes, inclusifs et durables.</p>
        </section>

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
