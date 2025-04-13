import { useState } from "react";
import LightPresence from "./LightPresence";

export default function ChatSvedka() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [responding, setResponding] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    setResponding(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer || "Odpověď nepřišla.");
    } catch (e) {
      setAnswer("Došlo k chybě při získávání odpovědi.");
    } finally {
      setLoading(false);
      setTimeout(() => setResponding(false), 1500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <LightPresence active={responding} />
      <div className="w-full max-w-xl">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Zeptej se..."
          className="w-full p-3 mb-4 text-black rounded"
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="w-full bg-white text-black py-2 rounded"
        >
          {loading ? "Čekej..." : "Zeptej se"}
        </button>
        {answer && (
          <div className="mt-6 p-4 bg-white/10 rounded">
            {answer}
          </div>
        )}
      </div>
    </div>
  );
}
