import React from "react";

export default function RessourcesPage() {
  return (
    <main className="px-4 py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Ressources NIRD</h1>
      <p className="mt-3 text-neutral-700">Voici une sélection de ressources libres et utiles pour démarrer:</p>

      <ul className="mt-4 list-disc pl-5 text-neutral-700">
        <li><a href="https://framalibre.org/" target="_blank" rel="noreferrer" className="text-indigo-700">Framalibre</a> — Communauté et services libres.</li>
        <li><a href="https://www.apache.org/" target="_blank" rel="noreferrer" className="text-indigo-700">Apache</a> — Projets open source utiles.</li>
        <li><a href="https://www.gnu.org/" target="_blank" rel="noreferrer" className="text-indigo-700">GNU</a> — Logiciels libres et licences.</li>
        <li><a href="/DEPLOY.md" className="text-indigo-700">Guide de déploiement rapide</a> — Instructions pour Vercel.</li>
      </ul>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Licences recommandées</h2>
        <p className="mt-2 text-neutral-700">Pour partager des ressources pédagogiques, préférez les licences Creative Commons (CC BY-SA) ou licences compatibles avec le libre.</p>
      </section>
    </main>
  );
}
