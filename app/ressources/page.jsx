export const metadata = {
  title: 'Ressources — NIRD',
};

export default function Resources() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#0d0f2c] to-[#13154b] text-white p-6">
      <main className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-yellow-300">Ressources NIRD</h1>

        <p className="mt-3 text-yellow-100">
          Voici une sélection de ressources libres, outils et recommandations
          pour accompagner la démarche NIRD dans un établissement scolaire.
        </p>

        {/* ================== SITE OFFICIEL ================== */}
        <section className="mt-6 bg-indigo-800/50 p-4 rounded border border-indigo-700">
          <h2 className="text-xl font-semibold text-yellow-300">Site officiel</h2>
          <ul className="mt-2 space-y-2 text-yellow-100">
            <li>
              • <a href="https://nird.forge.apps.education.fr/" target="_blank" rel="noreferrer" className="underline">
                Site officiel NIRD
              </a>
            </li>
          </ul>
        </section>

        {/* ================== COMMUNAUTÉS & LOGICIELS LIBRES ================== */}
        <section className="mt-6 bg-indigo-800/50 p-4 rounded border border-indigo-700">
          <h2 className="text-xl font-semibold text-yellow-300">Communautés & logiciels libres</h2>
          <ul className="mt-2 space-y-2 text-yellow-100">
            <li>
              • <a href="https://framalibre.org/" target="_blank" rel="noreferrer" className="underline">
                Framalibre
              </a> — Communauté et services libres
            </li>
            <li>
              • <a href="https://www.apache.org/" target="_blank" rel="noreferrer" className="underline">
                Apache
              </a> — Projets open source utiles
            </li>
            <li>
              • <a href="https://www.gnu.org/" target="_blank" rel="noreferrer" className="underline">
                GNU
              </a> — Logiciels libres et licences
            </li>
            <li>
              • <a href="/DEPLOY.md" className="underline">
                Guide de déploiement rapide
              </a> — Instructions pour Vercel
            </li>
          </ul>
        </section>

        {/* ================== MÉDIAS ================== */}
        <section className="mt-6 bg-indigo-800/50 p-4 rounded border border-indigo-700">
          <h2 className="text-xl font-semibold text-yellow-300">Médias & présentations</h2>
          <ul className="mt-2 space-y-2 text-yellow-100">
            <li>• <a href="https://video.echirolles.fr/w/hVykGUtRZqRen6eiutqRvQ" target="_blank" rel="noreferrer" className="underline">
              Windows 11 : l'alternative des logiciels libres (France 3 Alpes)
            </a></li>
            <li>• <a href="https://www.radiofrance.fr/franceinter/podcasts/le-grand-reportage-de-france-inter/le-grand-reportage-du-mardi-14-octobre-2025-4136495" target="_blank" rel="noreferrer" className="underline">
              Mises à jour Windows & obsolescence (France Inter)
            </a></li>
            <li>• <a href="https://www.youtube.com/watch?v=76T8oubek-c" target="_blank" rel="noreferrer" className="underline">
              Logiciel obsolète & ordinateurs jetés ? (France Info)
            </a></li>
            <li>• <a href="https://www.youtube.com/watch?v=S6GLqkhykmA" target="_blank" rel="noreferrer" className="underline">
              L'Ordinateur Obsolète (Back Market)
            </a></li>
          </ul>
        </section>

        {/* ================== ARTICLES & CAS ================== */}
        <section className="mt-6 bg-indigo-800/50 p-4 rounded border border-indigo-700">
          <h2 className="text-xl font-semibold text-yellow-300">Articles & cas concrets</h2>
          <ul className="mt-2 space-y-2 text-yellow-100">
            <li>• <a href="https://www.cafepedagogique.net/2025/04/27/bruay-labuissiere-voyage-au-centre-du-libre-educatif/" target="_blank" rel="noreferrer" className="underline">
              Projet NIRD au lycée Carnot (Café Pédagogique)
            </a></li>
            <li>• <a href="https://tube-numerique-educatif.apps.education.fr/w/3LXem3XK4asbwZa5R1qGkW" target="_blank" rel="noreferrer" className="underline">
              "Linux, c'est facile !" (captation élèves)
            </a></li>
            <li>• <a href="https://tube-numerique-educatif.apps.education.fr/w/pZCnzPKTYX2iF38Qh4ZGmq" target="_blank" rel="noreferrer" className="underline">
              Projet NIRD présenté par les élèves
            </a></li>
          </ul>
        </section>

        {/* ================== LICENCES ================== */}
        <section className="mt-6 bg-indigo-800/50 p-4 rounded border border-indigo-700">
          <h2 className="text-xl font-semibold text-yellow-300">Recommandations & licences</h2>
          <ul className="mt-2 space-y-2 text-yellow-100">
            <li>• Utiliser des ressources libres de droits (images, icônes, polices).</li>
            <li>• Licence recommandée : <strong>CC BY-SA</strong>.</li>
            <li>• Favoriser l’hébergement France / UE pour les données.</li>
          </ul>

          <p className="mt-3 text-sm opacity-90 text-yellow-200">
            Si vous souhaitez un guide d’installation Linux, un tutoriel de réemploi de PC,
            ou une page de contribution (pull requests), je peux les générer.
          </p>
        </section>

      </main>
    </div>
  );
}
