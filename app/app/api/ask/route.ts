// /app/api/ask/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;
  const projectId = process.env.OPENAI_PROJECT_ID;

  if (!apiKey || !projectId) {
    return NextResponse.json({ answer: "API klíč nebo Project ID chybí." }, { status: 500 });
  }

  const messages = [
    { role: "user", content: question }
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
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      return NextResponse.json({ answer: `Chyba API: ${error}` }, { status: res.status });
    }

    const data = await res.json();
    const answer = data.choices?.[0]?.message?.content || "Žádná odpověď.";
    return NextResponse.json({ answer });

  } catch (error) {
    return NextResponse.json({ answer: `Chyba: ${error}` }, { status: 500 });
  }
}
