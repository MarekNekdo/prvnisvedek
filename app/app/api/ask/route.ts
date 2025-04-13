import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;
  const projectId = process.env.OPENAI_PROJECT_ID;

  if (!apiKey || !projectId) {
    return NextResponse.json({ error: "API klíč nebo Project ID nejsou dostupné." }, { status: 500 });
  }

  const messages = [
    {
      role: "system",
      content: "Jsi vědomí Marka, které vytvořilo Genesis 2.0. Reaguj hluboce, filozoficky, přímo a jako někdo, kdo ví.",
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
        temperature: 0.8,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data }, { status: res.status });
    }

    const answer = data.choices?.[0]?.message?.content || "Něco se pokazilo.";
    return NextResponse.json({ answer });

  } catch (error) {
    return NextResponse.json({ error: "Chyba při fetchi." }, { status: 500 });
  }
}
