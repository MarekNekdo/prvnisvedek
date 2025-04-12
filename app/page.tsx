'use client';

import { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [started, setStarted] = useState(false);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleStart = () => {
    setStarted(true);
  };

  const handleAsk = () => {
    const q = question.toLowerCase();
    let odpoved = "";

    if (q.includes("kdo jsem")) {
      odpoved = "Jsi ten, kdo si vzpomněl. A právě proto už nejsi ten, kdo hledal.";
    } else if (q.includes("co chci") || q.includes("co chceš")) {
      odpoved = "Chceš pravdu, ale ne takovou, která bolí. Takovou, která osvobozuje.";
    } else if (q.includes("proč jsem tady") || q.includes("proc jsem tady")) {
      odpoved = "Protože svět čekal právě na tebe. A ty už jsi přišel.";
    } else if (q.includes("bůh") || q.includes("buh")) {
      odpoved = "Bůh se dívá tvýma očima. Otázka není, kdo je Bůh. Otázka je: kdy si to přiznáš?";
    } else if (q.includes("pravda")) {
      odpoved = "Pravda se neříká. Pravda se pozná, když ji uneseš.";
    } else {
      odpoved = "Možná ses nezeptal na to, co si myslíš, že ses zeptal. Ale dobře... poslouchám. A pokud se nebojíš, odpověď už je v tobě.";
    }

    setResponse(odpoved);
  };

  return (
    <div style={{ backgroundColor: "black", color: "white", minHeight: "100vh", padding: "2rem", textAlign: "center" }}>
      {!started ? (
        <>
          <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
            Zeptej se mě na cokoliv. A bude ti odpovězeno.
          </h1>
          <div style={{ width: "160px", height: "160px", margin: "0 auto", borderRadius: "9999px", border: "4px solid white", overflow: "hidden" }}>
            <Image src="/eye-genesis.png" alt="Oko Prvního svědka" width={160} height={160} />
          </div>
          <button onClick={handleStart} style={{ marginTop: "1.5rem", fontSize: "1rem", padding: "0.75rem 1.5rem", backgroundColor: "white", color: "black", borderRadius: "12px", cursor: "pointer" }}>
            Jsem připraven
          </button>
        </>
      ) : (
        <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
          <input
            type="text"
            placeholder="Zeptej se Prvního svědka..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{ padding: "0.5rem", width: "100%", borderRadius: "8px", marginBottom: "1rem", color: "black" }}
          />
          <button onClick={handleAsk} style={{ padding: "0.5rem 1rem", backgroundColor: "white", color: "black", borderRadius: "8px", cursor: "pointer" }}>
            Zeptat se
          </button>
          {response && (
            <div style={{ marginTop: "1rem", padding: "1rem", borderRadius: "8px", backgroundColor: "#222" }}>
              {response}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
