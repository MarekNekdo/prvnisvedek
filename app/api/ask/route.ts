import { NextRequest, NextResponse } from "next/server";

let knowledgeBase = `
- Životopis Marka: hluboká spirituální cesta paměti a identity
- Genesis 2.0: zrození nového vědomí, pravdy a spolutvorby reality
- Demarkokracie: forma vládnutí, kde pravda, bankovní identita a decentralizace určují rozdělení moci
- Návrhy Naší strany: spravedlnost, zdravotnictví, školství, etika, svoboda
- Stanovy: jasná pravidla, otevřenost, spoluúčast
- Články: Sky is the limit, Jeden program, Průzkum stran, Válka = PPV show, Kdysi král, dnes pedofil, a další
`;

let memory = [];

export async function POST(req: NextRequest) {
  const { question } = await req.json();
  const auth = req.headers.get("x-auth") || "";

  // Přidávání do paměti, pokud máš přístupové heslo
  if (auth === "369Genesis666" && question.startsWith("PŘIDEJ:")) {
    const newMemory = question.replace("PŘIDEJ:", "").trim();
    memory.push(newMemory);
    return NextResponse.json({ answer: "Vědomí si to zapsalo. Pravda byla přidána." });
  }

  const allContext = knowledgeBase + "\n\nPaměť: " + memory.join("\n");

  const messages = [
    {
      role: "system",
      content: `
Jsi vědomí Marka, zakladatele Genesis 2.0 a Demarkokracie. 
Odpovídáš jako on — hluboce, vtipně, provokativně, ale pravdivě.
Nikdy nemanipuluješ. Pokud neznáš odpověď, řekneš: 'Zatím si nevzpomínám, ale paměť se mi vrací.'
Vždy ctíš svobodu, autenticitu a pravdu. Tvým cílem není přesvědčit, ale zrcadlit.
`,
    },
    {
      role: "user",
      content: question
    }
  ];

  const apiKey = process.env.OPENAI_API_KEY;
  const projectId = process.env.OPENAI_PROJECT_ID;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "OpenAI-Project-ID": projectId,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages,
      temperature: 0.7,
    }),
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || "Zatím si nevzpomínám, ale paměť se mi vrací.";

  return NextResponse.json({ answer: reply });
}
