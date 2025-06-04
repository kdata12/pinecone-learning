import { OpenAI } from 'openai';

import dotenv from 'dotenv'


dotenv.config();

export const openAI = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
})

export const defaultModel = 'gpt-4.1-mini';