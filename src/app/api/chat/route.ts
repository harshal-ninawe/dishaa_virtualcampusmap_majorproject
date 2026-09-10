import { NextRequest, NextResponse } from 'next/server';
import { DISHAA_SYSTEM_PROMPT, parseCampusQuery } from '@/lib/campusKnowledge';

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

    if (apiKey) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const body = {
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `${DISHAA_SYSTEM_PROMPT}\n\nUSER QUESTION:\n${message}\n\nPlease respond with clear, friendly, and structured Markdown guidance.`
                }
              ]
            }
          ]
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
          console.warn('Gemini API response not OK, falling back to Campus Engine:', res.status, await res.text());
        }
      } catch (err) {
        console.error('Error invoking Gemini API:', err);
      }
    }

    // High-precision Campus Engine Fallback
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
