import { streamText } from 'ai';
import { SYSTEM_PROMPT } from '@/lib/ai/system-prompt';
import { getAIProvider } from '@/lib/ai/provider';

export async function POST(request: Request) {
  const { prompt, provider = 'openai', apiKey, authToken } = await request.json();
  
  if (!apiKey && !authToken) {
    return new Response('API key or auth token required', { status: 401 });
  }
  
  const model = getAIProvider(provider, { apiKey, authToken });
  
  const result = streamText({
    model,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  });
  
  return result.toTextStreamResponse();
}