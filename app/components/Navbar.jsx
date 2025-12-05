"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full py-4 px-6 bg-gradient-to-r from-[#0d0f2c] to-[#13154b] border-b border-indigo-800">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🏘️</div>
          <div>
            <Link href="/" className="text-yellow-300 font-bold text-lg">Village NIRD</Link>
            <div className="text-xs text-yellow-200">Numérique Inclusif • Responsable • Durable</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/ressources" className="text-yellow-100 hover:text-yellow-300">Ressources</Link>
          <a href="https://nird.forge.apps.education.fr/" target="_blank" rel="noreferrer" className="text-yellow-100 hover:text-yellow-300">NIRD</a>
        </div>
      </nav>
    </header>
  );
}
