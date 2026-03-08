import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt } from '@/lib/conciergePrompt';
import type { ConciergeRequest } from '@/lib/conciergeTypes';

const anthropic = new Anthropic();

export async function POST(request: Request) {
  try {
    const body: ConciergeRequest = await request.json();

    if (!body.messages || body.messages.length === 0) {
      return Response.json({ error: 'messages required' }, { status: 400 });
    }

    const systemPrompt = buildSystemPrompt(body.context || {
      recentSymptoms: [],
      sleepType: 'unknown',
      avgSleepHours: 0,
      moodTrend: 'stable',
      displayName: '회원',
    });

    const stream = anthropic.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: systemPrompt,
      messages: body.messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    // Stream the response using Server-Sent Events
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              const data = JSON.stringify({ text: event.delta.text });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error: unknown) {
    console.error('Concierge API error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return Response.json({ error: message }, { status: 500 });
  }
}
