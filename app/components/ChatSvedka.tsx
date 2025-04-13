'use client';

import { useState } from 'react';

export default function ChatSvedka() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

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
    } catch {
      setAnswer('Došlo k chybě při získávání odpovědi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h2 className="mb-4 text-xl font-semibold">Zeptej se, a já ti odpovím.</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Zeptej se..."
        className="w-full max-w-xl p-2 text-black mb-2"
      />
      <button
        onClick={handleAsk}
        disabled={loading}
        className="px-4 py-2 bg-white text-black rounded"
      >
        {loading ? 'Čekej...' : 'Zeptej se'}
      </button>
      {answer && (
        <div
          className="mt-8 max-w-xl p-4 bg-gray-900 rounded-lg"
          data-answer-box
        >
          {answer}
        </div>
      )}
    </div>
  );
}
