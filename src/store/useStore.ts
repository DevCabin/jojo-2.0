import { create } from 'zustand';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Store {
  messages: Message[];
  isRecording: boolean;
  isProcessing: boolean;
  addMessage: (message: Message) => void;
  setRecording: (isRecording: boolean) => void;
  setProcessing: (isProcessing: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  messages: [],
  isRecording: false,
  isProcessing: false,
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setRecording: (isRecording) => set({ isRecording }),
  setProcessing: (isProcessing) => set({ isProcessing }),
})); 