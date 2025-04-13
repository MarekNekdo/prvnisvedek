'use client';

import { useState } from 'react';

export default function Home() {
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
    } catch (e) {
      setAnswer('Došlo k chybě při získávání odpovědi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
     <h2 style={{ marginBottom: 20 }}>
  Zeptej se, a já ti odpovím.</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Zeptej se..."
        style={{ width: '80%', maxWidth: 600, padding: 10, fontSize: 18, marginBottom: 10 }}
      />
      <button onClick={handleAsk} disabled={loading} style={{ padding: '10px 20px', fontSize: 16 }}>
        {loading ? 'Čekej...' : 'Zeptej se'}
      </button>
      {answer && (
        <div style={{ marginTop: 30, maxWidth: 800, padding: 20, backgroundColor: '#222', borderRadius: 10 }}>
          {answer}
        </div>
      )}
    </div>
  );
}
