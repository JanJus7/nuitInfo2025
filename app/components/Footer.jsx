export default function Footer() {
  return (
    <footer className="mt-16 py-6 text-center text-sm text-yellow-100 border-t border-yellow-400/30 bg-indigo-950/20 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-4">
        
        <p className="mb-3">
          📚 Ressources :{" "}
          <a
            className="underline hover:text-yellow-300 transition"
            href="https://nird.forge.apps.education.fr/"
            target="_blank"
            rel="noreferrer"
          >
            Site officiel du NIRD
          </a>{" "}
          • Vidéos & articles média
        </p>

        <p className="text-xs opacity-80">
          Licence : production fournie sous licence libre (par ex. CC BY-SA).
        </p>

        <p className="mt-4 text-yellow-300 font-semibold">
          💛 Envie d’aider ? Contribuez, testez, partagez !
        </p>

        <p className="mt-2 text-[10px] opacity-60">
          Projet développé pendant la Nuit de l’Info 2025.
        </p>
      </div>
    </footer>
  );
}
