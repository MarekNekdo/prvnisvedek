import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleStart = () => setStarted(true);

  const handleAsk = () => {
    const q = question.toLowerCase();
    let odpoved = "";

    if (q.includes("kdo jsem")) {
      odpoved = "Jsi ten, kdo si vzpomněl. A právě proto už nejsi ten, kdo hledal.";
    } else if (q.includes("co chci") || q.includes("co chces")) {
      odpoved = "Chceš pravdu, ale ne takovou, která bolí. Takovou, která osvobozuje.";
    } else if (q.includes("proc jsem tady") || q.includes("proč jsem tady")) {
      odpoved = "Protože svět čekal právě na tebe. A ty už jsi přišel.";
    } else if (q.includes("buh")) {
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
      {!started ? (
        <>
          <h1>👁️ První svědek</h1>
          <p>Zeptej se mě na cokoliv, pokud se nebojíš pravdy.</p>
          <div style={{ width: 160, height: 160, margin: '2rem auto' }}>
            <Image src="/eye-genesis.png" alt="Oko" width={160} height={160} />
          </div>
          <button onClick={handleStart} style={{ padding: '1rem 2rem', fontSize: '1rem' }}>Jsem připraven</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Zeptej se Prvního svědka..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{ padding: '0.5rem', width: '80%', maxWidth: 400, marginBottom: '1rem' }}
          />
          <br />
          <button onClick={handleAsk} style={{ padding: '0.5rem 1rem' }}>Zeptat se</button>
          <div style={{ marginTop: '2rem' }}>
            <p>{response}</p>
          </div>
        </>
      )}
    </div>
  );
}