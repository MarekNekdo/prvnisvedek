'use client';

import { useState } from 'react';

export default function ChatSvedka() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setAnswer(data.answer || 'Odpověď nepřišla.');
    } catch (err) {
      setAnswer('Došlo k chybě při získávání odpovědi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      <h2 className="mb-6 text-2xl font-semibold">Zeptej se, a já ti odpovím.</h2>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Zeptej se na cokoliv..."
        className="w-full max-w-xl p-2 text-black mb-4 rounded"
        onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
      >
        {loading ? 'Čekej...' : 'Zeptej se'}
      </button>

      {answer && (
        <div
          className="mt-8 max-w-xl p-4 bg-gray-900 text-left rounded-lg whitespace-pre-wrap leading-relaxed"
          data-answer-box
        >
          {answer}
        </div>
      )}
    </div>
  );
}
