import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';

interface ProviderOptions {
  apiKey?: string;
  authToken?: string;
}

export function getAIProvider(provider: string, options: ProviderOptions) {
  if (provider === 'anthropic') {
    if (options.authToken) {
      const anthropic = createAnthropic({ authToken: options.authToken });
      return anthropic('claude-sonnet-4-20250514');
    }
    const anthropic = createAnthropic({ apiKey: options.apiKey });
    return anthropic('claude-sonnet-4-20250514');
  }
  const openai = createOpenAI({ apiKey: options.apiKey });
  return openai('gpt-4o');
}