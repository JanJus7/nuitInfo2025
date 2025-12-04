import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.js file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}






"use client";
import { useState } from "react";
import Challenge from "./components/Challenge";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [popup, setPopup] = useState(null);
  const [badges, setBadges] = useState({
    badge1: false,
    badge2: false,
  });

  const buildings = [
    { id: "linux", title: "Linux & Autonomie", emoji: "🐧" },
    { id: "reemploi", title: "Réemploi du matériel", emoji: "🔧" },
    { id: "logiciels", title: "Logiciels libres", emoji: "📚" },
    { id: "sobriete", title: "Sobriété numérique", emoji: "♻️" },
    { id: "acteurs", title: "Acteurs du NIRD", emoji: "🏛️" },
    { id: "quiz", title: "Mini-Quiz", emoji: "❓" },
  ];

  function openSection(id) {
    setPopup(id);
    if (progress < 100) setProgress(progress + 20);
  }

  function earnBadge(b) {
    setBadges({ ...badges, [b]: true });
  }

  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-[#0d0f2c] to-[#13154b] text-white p-6">

      <h1 className="text-center text-4xl font-bold text-yellow-300 drop-shadow mt-4">
        🏘️ Village Numérique Résistant
      </h1>
      <p className="text-center text-yellow-200 mt-2 max-w-3xl mx-auto">
        Résiste aux Big Tech comme un village gaulois ! Découvrez comment
        établissements, élèves et équipes éducatives peuvent réduire leur
        dépendance numérique, prolonger la vie du matériel, favoriser les
        logiciels libres et construire une communauté NIRD (Numérique
        Inclusif, Responsable et Durable).
      </p>

      {/* Intro / CTA */}
      <div className="max-w-4xl mx-auto bg-indigo-800/60 border border-indigo-700 mt-6 p-5 rounded-lg">
        <h2 className="text-2xl font-semibold text-yellow-300">Présentation</h2>
        <p className="mt-2 text-sm text-yellow-100">
          Ce mini-site présente des actions concrètes et des ressources libres
          pour aider un établissement scolaire à devenir plus autonome et
          résilient face aux écosystèmes fermés des grandes plateformes. Vous
          trouverez des pistes sur le réemploi matériel, l'usage de Linux,
          la sobriété numérique, et des outils pour mutualiser des ressources
          éducatives.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <a
            href="https://nird.forge.apps.education.fr/"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 text-center"
          >
            Visiter le site officiel NIRD
          </a>
          <button
            onClick={() => openSection('quiz')}
            className="inline-block bg-transparent border border-yellow-400 text-yellow-200 px-4 py-2 rounded hover:bg-yellow-500/20"
          >
            Essayer le Mini-Quiz
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-4/5 mx-auto bg-indigo-900 h-6 rounded-full mt-6 overflow-hidden border border-yellow-400">
        <div
          className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Badges */}
      <div className="text-center mt-3 text-3xl">
        {badges.badge1 && <span>⭐</span>}
        {badges.badge2 && <span className="ml-2">🌟</span>}
      </div>

      {/* Village grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
        {buildings.map((b) => (
          <div
            key={b.id}
            onClick={() => openSection(b.id)}
            className="bg-indigo-800 hover:bg-indigo-700 border border-transparent hover:border-yellow-400 transition p-6 rounded-xl cursor-pointer text-center shadow-lg"
          >
            <div className="text-5xl">{b.emoji}</div>
            <h3 className="mt-2 text-xl font-semibold">{b.title}</h3>
          </div>
        ))}
      </div>

      {/* Composant interactif (quiz/défi) */}
      <Challenge />

      {/* POPUP */}
      {popup && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4">
          <div className="bg-indigo-900 border-2 border-yellow-400 p-6 rounded-xl max-w-lg w-full text-center shadow-xl">

            <h2 className="text-2xl font-bold mb-4">
              {popup === "quiz"
                ? "Mini-Quiz"
                : buildings.find((b) => b.id === popup)?.title}
            </h2>

            {/* Content */}
            {popup === "linux" && (
              <p>Linux prolonge la vie des PC et libère des Big Tech.</p>
            )}

            {popup === "reemploi" && (
              <p>Réparer ou reconditionner un PC = autonomie.</p>
            )}

            {popup === "logiciels" && (
              <p>Les logiciels libres donnent des super-pouvoirs aux écoles.</p>
            )}

            {popup === "sobriete" && (
              <p>Moins consommer, mieux utiliser.</p>
            )}

            {popup === "acteurs" && (
              <p>Une résistance collective !</p>
            )}

            {/* QUIZ */}
            {popup === "quiz" && (
              <>
                <p className="mt-4 mb-2">Un PC trop vieux doit-il être jeté ?</p>
                <button
                  onClick={() => earnBadge("badge1")}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded mr-2"
                >
                  Non 
                </button>

                <p className="mt-6 mb-2">Les logiciels libres sont…</p>
                <button
                  onClick={() => earnBadge("badge2")}
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                >
                  Gratuits et modifiables 
                </button>
              </>
            )}

            <button
              onClick={() => setPopup(null)}
              className="mt-6 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Footer / ressources */}
      <footer className="mt-10 text-center text-sm text-yellow-100">
        <div className="max-w-3xl mx-auto">
          <p className="mb-2">
            Ressources : <a className="underline" href="https://nird.forge.apps.education.fr/" target="_blank" rel="noreferrer">NIRD</a> •
            Vidéos & articles média (France 3, France Inter, France Info)
          </p>
          <p className="text-xs opacity-80">
            Licence : travail à fournir sous licence libre (CC BY-SA ou équivalente).
          </p>
          <p className="mt-3 text-yellow-300">Envie d'aider ? Contribuez, testez, partagez !</p>
        </div>
      </footer>
    </div>
  );
}
