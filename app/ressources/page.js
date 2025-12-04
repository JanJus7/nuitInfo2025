export const metadata = {
  title: 'Ressources — NIRD',
};

export default function Resources() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0f2c] to-[#13154b] text-white p-6">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-300">Ressources NIRD</h1>

        <p className="mt-3 text-yellow-100">
          Voici une sélection de ressources libres et recommandations pour
          accompagner la démarche NIRD dans un établissement scolaire.
        </p>

        <section className="mt-6 bg-indigo-800/50 p-4 rounded border border-indigo-700">
          <h2 className="text-xl font-semibold text-yellow-300">Site officiel</h2>
          <ul className="mt-2 space-y-2 text-yellow-100">
            <li>
              • <a href="https://nird.forge.apps.education.fr/" target="_blank" rel="noreferrer" className="underline">Site officiel NIRD</a>
            </li>
          </ul>
        </section>

        <section className="mt-6 bg-indigo-800/50 p-4 rounded border border-indigo-700">
          <h2 className="text-xl font-semibold text-yellow-300">Médias et présentations</h2>
          <ul className="mt-2 space-y-2 text-yellow-100">
            <li>• <a href="https://video.echirolles.fr/w/hVykGUtRZqRen6eiutqRvQ" target="_blank" rel="noreferrer" className="underline">Windows 11 : l'alternative des logiciels libres (France 3 Alpes)</a></li>
            <li>• <a href="https://www.radiofrance.fr/franceinter/podcasts/le-grand-reportage-de-france-inter/le-grand-reportage-du-mardi-14-octobre-2025-4136495" target="_blank" rel="noreferrer" className="underline">Mises à jour de Windows et obsolescence (France Inter)</a></li>
            <li>• <a href="https://www.youtube.com/watch?v=76T8oubek-c" target="_blank" rel="noreferrer" className="underline">Logiciel obsolète : l'État obligé de jeter des milliers d'ordinateurs ? (France Info)</a></li>
            <li>• <a href="https://www.youtube.com/watch?v=S6GLqkhykmA" target="_blank" rel="noreferrer" className="underline">L'Ordinateur Obsolète (Back Market)</a></li>
          </ul>
        </section>

        <section className="mt-6 bg-indigo-800/50 p-4 rounded border border-indigo-700">
          <h2 className="text-xl font-semibold text-yellow-300">Articles & cas</h2>
          <ul className="mt-2 space-y-2 text-yellow-100">
            <li>• <a href="https://www.cafepedagogique.net/2025/04/27/bruay-labuissiere-voyage-au-centre-du-libre-educatif/" target="_blank" rel="noreferrer" className="underline">Projet NIRD au lycée Carnot (Café Pédagogique)</a></li>
            <li>• <a href="https://tube-numerique-educatif.apps.education.fr/w/3LXem3XK4asbwZa5R1qGkW" target="_blank" rel="noreferrer" className="underline">"Linux, c'est facile !" (captation vidéo élèves)</a></li>
            <li>• <a href="https://tube-numerique-educatif.apps.education.fr/w/pZCnzPKTYX2iF38Qh4ZGmq" target="_blank" rel="noreferrer" className="underline">Projet NIRD présenté par les élèves (vidéo)</a></li>
          </ul>
        </section>

        <section className="mt-6 bg-indigo-800/50 p-4 rounded border border-indigo-700">
          <h2 className="text-xl font-semibold text-yellow-300">Recommandations & licences</h2>
          <ul className="mt-2 space-y-2 text-yellow-100">
            <li>• Utiliser des ressources libres de droits (images, icônes, polices).</li>
            <li>• Licence recommandée pour la production : <strong>CC BY-SA</strong> (ou équivalente libre).</li>
            <li>• Favoriser les contenus hébergés en France / UE lorsque possible pour les données.</li>
          </ul>
          <p className="mt-3 text-sm opacity-90 text-yellow-200">
            Si vous voulez que j'ajoute un guide pas-à-pas pour le réemploi,
            l'installation de Linux sur un ancien PC, ou une page de
            contributions (pull requests), dites-le et je la génère.
          </p>
        </section>

      </main>
    </div>
  );
}
