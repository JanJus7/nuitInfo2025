"use client";
import React from "react";

export default function Hero({ onQuizClick } = {}) {
  return (
  <div className="mt-8 max-w-3xl mx-auto bg-indigo-800/40 p-6 rounded-xl border border-yellow-400/30 shadow-xl">
    <h3 className="text-2xl font-bold text-yellow-300 drop-shadow">
      🧠 Défi NIRD : Mini-Quiz
    </h3>

    <p className="text-sm text-yellow-100 mt-2">
      Répondez aux questions pour débloquer des badges et découvrir les principes du NIRD.
    </p>

    <div className="mt-6 space-y-5">
      {questions.map((q) => (
        <div
          key={q.id}
          className="bg-indigo-900/50 p-4 rounded-lg shadow-inner border border-indigo-700/50"
        >
          <p className="font-semibold text-yellow-200">{q.q}</p>

          <div className="mt-3 flex flex-col gap-2">
            {q.choices.map((c, i) => {
              const chosen = answers[q.id] === i;
              const correct = submitted && i === q.answer;
              const wrong = submitted && chosen && i !== q.answer;

              return (
                <button
                  key={i}
                  onClick={() => select(q.id, i)}
                  className={`
                    text-left px-3 py-2 rounded-lg transition border
                    ${chosen ? "border-yellow-400" : "border-transparent"}
                    ${
                      correct
                        ? "bg-green-600 shadow-md"
                        : wrong
                        ? "bg-red-600 shadow-md"
                        : "hover:bg-indigo-700/40"
                    }
                  `}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>

    <div className="mt-6 flex items-center gap-3">
      <button
        onClick={submit}
        disabled={submitted}
        className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 disabled:opacity-50 shadow-md"
      >
        Valider mes réponses
      </button>

      <button
        onClick={reset}
        className="bg-transparent border border-yellow-400 text-yellow-200 px-4 py-2 rounded-lg hover:bg-yellow-400/20"
      >
        Réinitialiser
      </button>

      <div className="ml-auto text-sm text-yellow-200 flex gap-2">
        {badges.helper && <span className="animate-pulse">🛠️ Badge Réemploi</span>}
        {badges.libre && <span className="animate-pulse">🐧 Badge Libre</span>}
      </div>
    </div>
  </div>
);

}
