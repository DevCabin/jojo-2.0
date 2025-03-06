import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
});

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export class ClaudeService {
  private messages: Message[] = [];

  async sendMessage(content: string): Promise<string> {
    try {
      this.messages.push({ role: 'user', content });

      const message = await anthropic.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
        messages: this.messages,
        stream: false,
      });

      const response = message.content[0].type === 'text' ? message.content[0].text : '';
      this.messages.push({ role: 'assistant', content: response });

      return response;
    } catch (error) {
      console.error('Error sending message to Claude:', error);
      throw new Error('Failed to get response from Claude');
    }
  }

  clearConversation() {
    this.messages = [];
  }
}

export const claudeService = new ClaudeService(); 