import React from "react";

export default function Apropos() {
  return (
    <main className="px-4 py-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">À propos</h1>
      <p className="mt-3 text-neutral-700">Ce mini-site a été préparé pour la Nuit de l'Info afin de sensibiliser aux pratiques numériques responsables et résilientes.</p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Contributeurs</h2>
        <ul className="mt-2 list-disc pl-5 text-neutral-700">
          <li>Équipe pédagogique</li>
          <li>Étudiants et contributeurs du projet</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="mt-2 text-neutral-700">Pour contribuer ou signaler un problème, ouvre une issue sur le dépôt GitHub.</p>
      </section>
    </main>
  );
}
