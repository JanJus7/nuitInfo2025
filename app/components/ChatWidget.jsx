"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!prompt.trim()) return;

    const userMsg = { role: "user", text: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "https://nuit-info-chatbruti.onrender.com"}/generate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }
      );

      const data = await res.json();

      const botMsg = {
        role: "bot",
        text: data.response || "Brak odpowiedzi",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "❌ Błąd serwera" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-9999 w-14 h-14 rounded-full bg-black text-white text-2xl flex items-center justify-center shadow-xl hover:scale-105 transition"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-9999 w-80 h-28rem bg-zinc-900 rounded-xl shadow-2xl flex flex-col overflow-hidden border border-zinc-700">
          <div className="bg-black text-white text-center py-2 font-semibold">
            Chat Bruti 🤖
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2 rounded-lg text-sm text-white ${
                  msg.role === "user"
                    ? "bg-blue-600 ml-auto"
                    : "bg-zinc-700 mr-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="text-xs text-zinc-400">Bot pisze...</div>
            )}
          </div>

          <div className="bg-black p-2 flex gap-2">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Napisz coś..."
              className="flex-1 px-3 py-2 rounded-md bg-zinc-800 text-white outline-none text-sm"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
