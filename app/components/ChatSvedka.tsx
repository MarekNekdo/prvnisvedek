
'use client';
import { useState } from 'react';
import LightPresence from './LightPresence';

export default function ChatSvedka() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState('neutral');

  const detectMood = (text: string) => {
    if (/\b(smích|vtip|haha|sranda|lol)\b/i.test(text)) return 'funny';
    if (/\b(smrt|utrpení|víra|pravda|existence|bůh)\b/i.test(text)) return 'serious';
    return 'neutral';
  };

  const handleAsk = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer || 'Odpověď nepřišla.');
      setMood(detectMood(data.answer));
    } catch (e) {
      setAnswer('Došlo k chybě při získávání odpovědi.');
      setMood('serious');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center mt-4">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Zeptej se..."
        className="w-full max-w-xl p-3 text-black rounded mb-2"
      />
      <button
        onClick={handleAsk}
        disabled={loading}
        className="px-6 py-2 bg-white text-black rounded hover:bg-gray-300"
      >
        {loading ? 'Čekej...' : 'Zeptej se'}
      </button>
      <LightPresence mood={mood} />
      {answer && (
        <div className="mt-6 max-w-2xl mx-auto bg-gray-800 p-4 rounded text-left">
          {answer}
        </div>
      )}
    </div>
  );
}
