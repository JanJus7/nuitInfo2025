"use client";
import { useState } from "react";

const defaultBuildings = [
  { id: "linux", title: "Linux & Autonomie", emoji: "🐧" },
  { id: "reemploi", title: "Réemploi du matériel", emoji: "🔧" },
  { id: "logiciels", title: "Logiciels libres", emoji: "📚" },
  { id: "sobriete", title: "Sobriété numérique", emoji: "♻️" },
  { id: "acteurs", title: "Acteurs du NIRD", emoji: "🏛️" },
  { id: "quiz", title: "Mini-Quiz", emoji: "❓" },
];

export default function VillageGrid({ buildings = defaultBuildings, onOpenQuiz } = {}) {
  const [progress, setProgress] = useState(0);
  const [popup, setPopup] = useState(null);
  const [badges, setBadges] = useState({ badge1: false, badge2: false });

  function openSection(id) {
    setPopup(id);
    setProgress((p) => Math.min(100, p + 20));
    if (id === "quiz" && typeof onOpenQuiz === "function") onOpenQuiz();
  }

  function earnBadge(b) {
    setBadges((s) => ({ ...s, [b]: true }));
  }

  return (
    <div className="mt-10">

      {/* Progress Bar */}
      <div className="w-4/5 mx-auto bg-indigo-900 h-4 rounded-full overflow-hidden border border-yellow-400 shadow-md">
        <div
          className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Badges */}
      <div className="text-center mt-3 text-2xl drop-shadow">
        {badges.badge1 && <span className="animate-pulse">⭐</span>}
        {badges.badge2 && <span className="ml-2 animate-pulse">🌟</span>}
      </div>

      {/* Buildings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
        {buildings.map((b) => (
          <div
            key={b.id}
            onClick={() => openSection(b.id)}
            className="bg-indigo-800 hover:bg-indigo-700 border border-transparent hover:border-yellow-400 
                       transition p-6 rounded-xl cursor-pointer text-center shadow-xl hover:scale-105 
                       duration-200 ease-out"
          >
            <div className="text-5xl drop-shadow">{b.emoji}</div>
            <h3 className="mt-3 text-xl font-bold text-yellow-200">{b.title}</h3>
          </div>
        ))}
      </div>

      {/* POPUP */}
      {popup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-40 animate-fade-in">
          <div className="bg-indigo-900 border-2 border-yellow-400 p-6 rounded-xl max-w-lg w-full text-center shadow-2xl animate-popup-in">

            {/* Title */}
            <h2 className="text-2xl font-bold mb-4 text-yellow-300 drop-shadow">
              {popup === "quiz"
                ? "Mini-Quiz"
                : buildings.find((b) => b.id === popup)?.title}
            </h2>

            {/* Content */}
            {popup === "linux" && <p>Linux prolonge la vie des PC et libère des Big Tech.</p>}
            {popup === "reemploi" && <p>Réparer ou reconditionner un PC = autonomie.</p>}
            {popup === "logiciels" && <p>Les logiciels libres donnent des super-pouvoirs aux écoles.</p>}
            {popup === "sobriete" && <p>Moins consommer, mieux utiliser.</p>}
            {popup === "acteurs" && <p>Une résistance collective !</p>}

            {popup === "quiz" && (
              <>
                <p className="mt-4 mb-2">Un PC trop vieux doit-il être jeté ?</p>
                <button onClick={() => earnBadge("badge1")}
                        className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded mr-2 shadow-md">
                  Non ✔️
                </button>

                <p className="mt-6 mb-2">Les logiciels libres sont…</p>
                <button onClick={() => earnBadge("badge2")}
                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded shadow-md">
                  Gratuits et modifiables
                </button>
              </>
            )}

            {/* Close */}
            <button
              onClick={() => setPopup(null)}
              className="mt-6 bg-yellow-400 text-black px-5 py-2 rounded hover:bg-yellow-300 font-semibold shadow-md"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
