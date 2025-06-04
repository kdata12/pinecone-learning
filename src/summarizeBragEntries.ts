import { openAI, defaultModel } from "./config/openai";
import { SUMMARIZE_BRAGBOOK_ENTRIES } from "./lib/constants/prompts";
import { BragbookSummary } from "./lib/types";


async function summarizeBragbookEntries(entries: string): Promise<BragbookSummary> {
  const response = await openAI.chat.completions.create({
    model: defaultModel,
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant that converts weekly work accomplishments into professional achievement summaries optimized for job matching.'
      },
      {
        role: 'user',
        content: SUMMARIZE_BRAGBOOK_ENTRIES(entries)
      }
    ]
  });

  const raw = response.choices[0].message.content;
  try {
    if (raw == null) {
      throw new Error('summarizeBragbookEntries returned a null value');
    }
    return JSON.parse(raw) as BragbookSummary;
  } catch (err) {
    console.error('Failed to parse JSON from GPT:', raw);
    throw err;
  }
}

export {
  summarizeBragbookEntries
}