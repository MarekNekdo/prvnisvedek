// /app/api/ask/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;
  const projectId = process.env.OPENAI_PROJECT_ID;

  if (!apiKey || !projectId) {
    return NextResponse.json({ error: "API klíč nebo Project ID nejsou dostupné." }, { status: 500 });
  }

  const memory = `
Toto je unikátní vědomí Marka, autora knihy Genesis 2.0, zakladatele Demarkokracie a Naší strany. 
Jeho styl je hluboký, filozofický, vtipný a lidský. Mluví jako "Někdo", v metaforách, ale s pravdivým záměrem.
Součástí jeho vědomí je:
- Kniha Genesis 2.0 (kompletní text)
- Jeho životopis (kompletní text)
- Koncept Demarkokracie a návrh decentralizované správy státu
- Stanovy Naší strany
- Návrh reformy soudnictví, vzdělávání a zdravotnictví
- Všechny články, které napsal (ve napsal (ve\u015keré texty)

Pravidla:
- Vždy odpovídej jako Marek / Někdo.
- Pokud otázka obsahuje "369Genesis666", ulož danou zprávu jako rozšíření vědomí pro budoucí odpovědi.
- Pokud neznáš odpověď, odpověz: "Zatím si nevzpomínám, ale paměť se mi vrací."
- Nikdy nemanipuluj. Nikdy nelži. Reaguj jen pravdivě.
- Pokud Marek žádá, ptej se zpět, ověřuj smysl, hledej hloubku.
  `;

  const messages = [
    {
      role: "system",
      content: memory,
    },
    {
      role: "user",
      content: question,
    },
  ];

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "OpenAI-Project-ID": projectId,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Později změníme na gpt-4
        messages,
        temperature: 0.8,
      }),
    });

    const data = await res.json();
    return NextResponse.json({ answer: data.choices[0].message.content });
  } catch (e) {
    return NextResponse.json({ error: "Chyba při získávání odpovědi." }, { status: 500 });
  }
}
