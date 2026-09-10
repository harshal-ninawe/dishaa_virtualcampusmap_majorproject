import { NextRequest, NextResponse } from 'next/server';
import { DISHAA_SYSTEM_PROMPT, parseCampusQuery } from '@/lib/campusKnowledge';

// Deploy on Vercel Node.js Runtime for fast serverless execution
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Message content is required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const fallbackResult = parseCampusQuery(message);

    // Fast-Path Intent Recognition (Instant 0ms response for clear navigation queries)
    const q = message.toLowerCase().trim();
    const isNavigationQuery = (q.includes('from') && (q.includes('to') || q.includes('go to') || q.includes('reach'))) ||
                              q.startsWith('how to go') || q.startsWith('how can i go');

    if (isNavigationQuery && fallbackResult.actions && fallbackResult.actions.length > 0) {
      return NextResponse.json({
        success: true,
        reply: fallbackResult.reply,
        actions: fallbackResult.actions
      });
    }

    if (apiKey) {
      // Try high-speed Gemini 2.0 Flash first, fallback to 1.5 Flash if needed
      const models = ['gemini-2.0-flash', 'gemini-1.5-flash'];

      for (const modelName of models) {
        try {
          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
          const body = {
            systemInstruction: {
              parts: [{ text: `${DISHAA_SYSTEM_PROMPT}\n\nRespond with concise, friendly, and structured Markdown guidance under 120 words.` }]
            },
            contents: [
              {
                role: 'user',
                parts: [{ text: message }]
              }
            ],
            generationConfig: {
              maxOutputTokens: 350,
              temperature: 0.4
            }
          };

          const res = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          });

          if (res.ok) {
            const data = await res.json();
            const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (candidateText) {
              return NextResponse.json({
                success: true,
                reply: candidateText,
                actions: fallbackResult.actions || []
              });
            }
          } else {
            console.warn(`Gemini model ${modelName} returned status ${res.status}, trying next fallback...`);
          }
        } catch (err) {
          console.error(`Error with model ${modelName}:`, err);
        }
      }
    }

    // High-precision Campus Engine Fallback (Instant zero-latency response)
    return NextResponse.json({
      success: true,
      reply: fallbackResult.reply,
      actions: fallbackResult.actions || []
    });

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown chat error';
    console.error('Error processing chat request:', msg);
    return NextResponse.json(
      { success: false, error: `Chat Error: ${msg}` },
      { status: 500 }
    );
  }
}
