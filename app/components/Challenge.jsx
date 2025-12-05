"use client";
import React, { useEffect, useState } from "react";

export default function Challenge() {
  const STORAGE_KEY = "nird_challenge_state_v1";

  const questions = [
    {
      id: 1,
      q: "Un PC encore fonctionnel mais lent doit-il être jeté ?",
      choices: [
        "Oui, s'il est lent il est obsolète",
        "Non, on peut le réemployer ou installer Linux",
        "Seulement si la batterie est morte",
      ],
      answer: 1,
    },
    {
      id: 2,
      q: "Les logiciels libres :",
      choices: ["Sont toujours payants", "Permettent la modification et le partage", "Interdisent l'éducation"],
      answer: 1,
    },
    {
      id: 3,
      q: "La sobriété numérique consiste à :",
      choices: ["Acheter plus d'appareils", "Optimiser, réemployer et limiter la consommation", "Toujours utiliser le cloud propriétaire"],
      answer: 1,
    },
  ];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [badges, setBadges] = useState({ helper: false, libre: false });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setAnswers(parsed.answers || {});
        setSubmitted(parsed.submitted || false);
        setBadges(parsed.badges || { helper: false, libre: false });
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ answers, submitted, badges })
      );
    } catch (e) {}
  }, [answers, submitted, badges]);

  function select(qid, choiceIndex) {
    setAnswers({ ...answers, [qid]: choiceIndex });
  }

  function submit() {
    setSubmitted(true);
    // award simple badges
    const score = questions.reduce((acc, q) => {
      const a = answers[q.id];
      return acc + (a === q.answer ? 1 : 0);
    }, 0);

    if (score >= 2) setBadges((b) => ({ ...b, helper: true }));
    if (score === questions.length) setBadges((b) => ({ ...b, libre: true }));
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
    setBadges({ helper: false, libre: false });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  return (
    <div className="mt-8 max-w-3xl mx-auto bg-indigo-800/50 p-4 rounded-lg border border-indigo-700 bg-opacity-60">
      <h3 className="text-xl font-semibold text-yellow-300">Défi NIRD : Mini-Quiz</h3>
      <p className="text-sm text-yellow-100 mt-2">
        Répondez à quelques questions pour gagner des badges et comprendre
        des actions simples à mettre en place dans un établissement.
      </p>

      <div className="mt-4 space-y-4">
        {questions.map((q) => (
          <div key={q.id} className="bg-indigo-900/40 p-3 rounded">
            <p className="font-medium text-yellow-200">{q.q}</p>
            <div className="mt-2 flex flex-col gap-2">
              {q.choices.map((c, i) => {
                const chosen = answers[q.id] === i;
                const correct = submitted && i === q.answer;
                const wrong = submitted && chosen && i !== q.answer;
                return (
                  <button
                    key={i}
                    onClick={() => select(q.id, i)}
                    className={`text-left px-3 py-2 rounded transition border ${
                      chosen ? "border-yellow-400" : "border-transparent"
                    } ${correct ? "bg-green-600" : wrong ? "bg-red-600" : "hover:bg-indigo-700/60"}`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={submit}
          disabled={submitted}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 disabled:opacity-60"
        >
          Valider
        </button>
        <button onClick={reset} className="bg-transparent border border-yellow-400 text-yellow-200 px-3 py-2 rounded">
          Réinitialiser
        </button>

        <div className="ml-auto text-sm text-yellow-200">
          {badges.helper && <span className="mr-2">🛠️ Badge Réemploi</span>}
          {badges.libre && <span>🐧 Badge Libre</span>}
        </div>
      </div>
    </div>
  );
}
