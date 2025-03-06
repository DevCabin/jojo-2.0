import { useEffect, useRef } from 'react';
import { useStore } from './store/useStore';
import { speechService } from './services/speechService';
import { claudeService } from './services/claudeService';
import './App.css';

function App() {
  const { messages, isRecording, isProcessing, addMessage, setRecording, setProcessing } = useStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleStartRecording = () => {
    setRecording(true);
    speechService.startRecording(
      async (text) => {
        if (text.trim()) {
          addMessage({ role: 'user', content: text, timestamp: new Date() });
          setProcessing(true);
          try {
            const response = await claudeService.sendMessage(text);
            addMessage({ role: 'assistant', content: response, timestamp: new Date() });
            speechService.speak(response);
          } catch (error) {
            console.error('Error processing message:', error);
            addMessage({
              role: 'assistant',
              content: 'Sorry, I encountered an error processing your message.',
              timestamp: new Date(),
            });
          } finally {
            setProcessing(false);
          }
        }
      },
      (error) => {
        console.error('Speech recognition error:', error);
        setRecording(false);
      }
    );
  };

  const handleStopRecording = () => {
    setRecording(false);
    speechService.stopRecording();
    speechService.stopSpeaking();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Claude Speech Interface</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 h-[60vh] overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex justify-center">
          <button
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            disabled={isProcessing}
            className={`px-6 py-3 rounded-full text-white font-semibold ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
