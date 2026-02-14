import { streamText } from 'ai';
import { SYSTEM_PROMPT } from '@/lib/ai/system-prompt';
import { getAIProvider } from '@/lib/ai/provider';

export async function POST(request: Request) {
  const { messages, provider = 'openai', apiKey, builderStep } = await request.json();

  if (!apiKey) {
    return new Response('API key required', { status: 401 });
  }

  const model = getAIProvider(provider, apiKey);

  let systemPrompt = SYSTEM_PROMPT;
  if (builderStep) {
    const { BUILDER_PROMPTS } = await import('@/lib/ai/prompts/builder');
    systemPrompt += `\n\n## CURRENT TASK\nThe user is on Step ${builderStep} of the offer builder. ${BUILDER_PROMPTS[builderStep] || ''}`;
  }

  const result = streamText({
    model,
    system: systemPrompt,
    messages,
  });

  return result.toUIMessageStreamResponse();
}