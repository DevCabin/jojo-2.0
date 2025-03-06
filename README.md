# Claude Speech Interface

A modern web application that provides a speech interface for interacting with Anthropic's Claude AI. The application uses the Web Speech API for speech recognition and synthesis, combined with Claude's powerful language model for natural conversations.

## Features

- Real-time speech-to-text conversion
- Natural text-to-speech responses
- Modern, responsive UI with Tailwind CSS
- State management with Zustand
- Integration with Anthropic's Claude API

## Prerequisites

- Node.js v18 or higher
- npm or yarn package manager
- An Anthropic API key

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Anthropic API key:
```
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Click the "Start Recording" button to begin speaking
2. Speak your message clearly
3. Click "Stop Recording" when you're done
4. Wait for Claude's response, which will be both displayed and spoken aloud
5. Repeat the process to continue the conversation

## Browser Support

The application uses the Web Speech API, which is supported in:
- Chrome
- Edge
- Safari

## Security Considerations

- Never commit your `.env` file or expose your API keys
- The application uses HTTPS in production
- API requests are rate-limited and authenticated

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
