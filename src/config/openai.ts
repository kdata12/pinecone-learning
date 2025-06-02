import { OpenAI } from 'openai';

import dotenv from 'dotenv'

dotenv.config();

export const openAI = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY
})

export const generateEmbedding = async (text: string): Promise<number[]> => {
  const response = await openAI.embeddings.create({
    model: 'text-embedding-3-small',
    input: text
  })

  return response.data[0].embedding;
}