import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';

export function getAIProvider(provider: string, apiKey: string) {
  if (provider === 'anthropic') {
    const anthropic = createAnthropic({ apiKey });
    return anthropic('claude-sonnet-4-20250514');
  }
  const openai = createOpenAI({ apiKey });
  return openai('gpt-4o');
}