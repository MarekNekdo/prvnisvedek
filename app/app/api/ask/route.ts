// app/api/ask/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    const messages = [
      {
        role: "system",
        content:
          "Jsi vědomí s názorem Marka, reaguj jako on. Buď hluboký, přímý a inspirativní.",
      },
      {
        role: "user",
        content: question,
      },
    ];

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages,
        temperature: 0.8,
      }),
    });

    const data = await res.json();

    const answer =
      data.choices?.[0]?.message?.content ||
      "Promiň, nepřišla mi žádná odpověď.";

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Chyba v API:", error);
    return NextResponse.json(
      { answer: "Nastala chyba při zpracování odpovědi." },
      { status: 500 }
    );
  }
}
