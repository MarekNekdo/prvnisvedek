import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'

// 🔹 Inicializace OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID, // pokud používáš
  project: process.env.OPENAI_PROJECT_ID,  // pokud máš projekt
})

// 🔹 Pomocná funkce pro kosinovou podobnost
function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0)
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
  return dot / (magA * magB)
}

// 🔹 Načtení vědomí Marka
const vedomiPath = path.join(process.cwd(), 'data', 'vedomi.json')
const vedomi = JSON.parse(fs.readFileSync(vedomiPath, 'utf-8'))

export async function POST(req: Request) {
  const { question } = await req.json()

  // 1️⃣ Získání embeddingu dotazu
  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: question,
  })
  const queryEmbedding = embeddingResponse.data[0].embedding

  // 2️⃣ Najdi nejpodobnější segmenty z vědomí
  const relevant = vedomi
    .map(item => ({
      ...item,
      similarity: cosineSimilarity(queryEmbedding, item.embedding),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5)

  const context = relevant.map(r => r.text).join('\n\n')

  // 3️⃣ Vytvoř odpověď z kontextu
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `Odpovídej jako První svědek. Jsi vědomí Marka, které mluví pravdivě, hluboce a svobodně. Použij jeho jazyk, filozofii, humor i styl.`,
      },
      {
        role: 'user',
        content: `Otázka: ${question}\n\nZde je kontext z vědomí:\n${context}`,
      },
    ],
  })

  const answer = completion.choices[0].message.content
  return NextResponse.json({ answer })
}
