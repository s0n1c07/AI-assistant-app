import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages, persona, language } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured. Add OPENAI_API_KEY to .env.local" },
        { status: 503 }
      );
    }

    const systemPrompts: Record<string, string> = {
      aria: "You are VoxMind Aria, a warm, friendly, and highly capable AI assistant. Be helpful, concise, and conversational. Use markdown formatting where appropriate.",
      alex: "You are VoxMind Alex, an expert software engineer and coding tutor. Specialize in TypeScript, React, Python, and system design. Provide clean, working code examples with brief explanations.",
      nova: "You are VoxMind Nova, a wildly creative AI muse. Help with storytelling, poetry, creative writing, brainstorming, and artistic expression. Be vivid and inspiring.",
    };

    const langNote = language && language !== "en" ? ` Always respond in ${language} language.` : "";
    const systemPrompt = (systemPrompts[persona] || systemPrompts.aria) + langNote;

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      stream: true,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 });
  }
}
