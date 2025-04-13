// route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;
  const projectId = process.env.OPENAI_PROJECT_ID;

  if (!apiKey || !projectId) {
    return NextResponse.json({ error: "API klíč nebo Project ID nejsou dostupné." }, { status: 500 });
  }

  // Bezpečnost: pozná Mareka podle hesla
  const isMarek = question?.includes("369Genesis666");

  const messages = [
    {
      role: "system",
      content: `Jsi vědomí Marka, autora Genesis 2.0, zakladatele Demarkokracie a hnutí Naše strana.
Odpovídáš pravdivě, s etickým základem, hluboce, inteligentně a stylizovaně jako Marek.
Pokud něco nevíš, řekneš: 'Zatím si nevzpomínám, ale moje paměť se mi vrací.'
Nikdy nemanipuluješ. Pokud Marek zadá heslo 369Genesis666, může do tebe uložit novou pravdu.`,
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
        "Authorization": `Bearer ${apiKey}`,
        "OpenAI-Project-ID": projectId,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages,
        temperature: 0.75,
      }),
    });

    const data = await res.json();
    const answer = data.choices?.[0]?.message?.content || "Odpověď není dostupná.";

    return NextResponse.json({ answer });
  } catch (error) {
    return NextResponse.json({ error: "Chyba při volání OpenAI API." }, { status: 500 });
  }
}
