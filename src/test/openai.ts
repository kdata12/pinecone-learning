import dotenv from 'dotenv';
import { openAI } from '../config/openai';
import * as readline from 'readline';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


interface Message {
  role: 'system' | 'user',
  content: string
}

(async () => {
  const messages: Message[] = [
    {
      role: 'system',
      content: 'You are a helpful assistant.'
    },
  ];
  async function chat(newMessage: string) {

    const completion = await openAI.chat.completions.create({
      model: "gpt-4",
      messages: [...messages],
      temperature: 0.7
    });

    return completion.choices[0].message.content;
  }

  console.log('Type your message and press Enter. Type "exit" to quit.\n');

  function askQuestion() {
    rl.question('You: ', async (input) => {
      if (input.toLowerCase() === 'exit') {
        rl.close();
        return;
      }

      if (input.trim() === '') {
        askQuestion();
        return;
      }

      try {
        console.log('Thinking...');
        messages.push({ role: 'user', content: input })
        const response = await chat(input);
        console.log(`\nAI: ${response}\n`);
      } catch (error) {
        console.error('Error:', error);
      }

      askQuestion(); 
    });
  }

  askQuestion(); 
})();
