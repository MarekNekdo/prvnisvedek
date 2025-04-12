"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = () => {
    const q = question.toLowerCase();
    let odpoved = "";

    if (q.includes("kdo jsem")) {
      odpoved = "Jsi ten, kdo si vzpomněl. A právě proto už nejsi ten, kdo hledal.";
    } else if (q.includes("co chci") || q.includes("co chceš")) {
      odpoved = "Chceš pravdu, ale ne takovou, která bolí. Takovou, která osvobozuje.";
    } else if (q.includes("proč jsem tady")) {
      odpoved = "Protože svět čekal právě na tebe. A ty už jsi přišel.";
    } else if (q.includes("bůh")) {
      odpoved = "Bůh se dívá tvýma očima. Otázka není, kdo je Bůh. Otázka je: kdy si to přiznáš?";
    } else if (q.includes("pravda")) {
      odpoved = "Pravda se neříká. Pravda se pozná, když ji uneseš.";
    } else {
      odpoved = "Možná ses nezeptal na to, co si myslíš, že ses zeptal. Ale dobře... poslouchám. A pokud se nebojíš, odpověď už je v tobě.";
    }

    setResponse(odpoved);
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
      <h1>👁️ První svědek</h1>
      <p>Zeptej se mě na cokoliv. A bude ti odpovězeno.</p>
      <div style={{ width: 160, height: 160, margin: '2rem auto' }}>
        <Image src="/eye-genesis.png" alt="Oko" width={160} height={160} />
      </div>
      <input
        type="text"
        placeholder="Zeptej se..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ padding: '0.5rem', width: '80%', maxWidth: 400 }}
      />
      <br />
      <button onClick={handleAsk} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>Zeptat se</button>
      {response && (
        <div style={{ marginTop: '2rem' }}>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}