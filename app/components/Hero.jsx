"use client";
import React from "react";

export default function Hero({ onQuizClick } = {}) {
  return (
    <section className="max-w-4xl mx-auto text-center mt-6 p-6 bg-indigo-800/40 rounded-lg border border-indigo-700">
      <h1 className="text-4xl font-bold text-yellow-300">🏘️ Village Numérique Résistant</h1>
      <p className="mt-3 text-yellow-100">
        Bienvenue — découvrez la démarche NIRD et comment un établissement
        peut réduire sa dépendance aux Big Tech grâce à des pratiques
        inclusives, responsables et durables.
      </p>

      <div className="mt-6 flex items-center justify-center gap-3">
        <a
          href="/ressources"
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300"
        >
          Ressources
        </a>

        <button
          onClick={() => {
            if (typeof onQuizClick === "function") onQuizClick();
            const el = document.getElementById("nird-quiz");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-transparent border border-yellow-400 text-yellow-200 px-4 py-2 rounded hover:bg-yellow-500/20"
        >
          Essayer le Mini-Quiz
        </button>
      </div>
    </section>
  );
}
