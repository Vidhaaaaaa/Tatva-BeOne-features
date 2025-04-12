import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState<any>(null);
  const [chat, setChat] = useState<any>(null);

  useEffect(() => {
    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
    const geminiModel = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });
    setModel(geminiModel);

    // Start a new chat
    const newChat = geminiModel.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 2000,
        temperature: 0.7,
      },
    });
    setChat(newChat);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !model || !chat) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chat.sendMessage(input);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: text }
      ]);
    } catch (error: any) {
      console.error('Error:', error);
      
      let errorMessage = 'An error occurred while processing your request.';
      
      if (error.message?.includes('quota')) {
        errorMessage = 'API quota exceeded. Please try again later.';
      } else if (error.message?.includes('key')) {
        errorMessage = 'Invalid API key. Please check your API key configuration.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Error: ' + errorMessage },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Gemini Chat</h2>
          <p className="text-sm text-gray-600">Powered by Google AI</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg h-[400px] overflow-y-auto mb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-3 p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-100 ml-auto max-w-[80%]'
                  : 'bg-white shadow-sm max-w-[80%]'
              }`}
            >
              <div className="text-sm font-semibold mb-1 text-gray-700">
                {msg.role === 'user' ? 'You' : 'Gemini'}
              </div>
              <div className="text-gray-800 whitespace-pre-wrap">{msg.content}</div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="animate-pulse">Thinking</div>
              <div className="animate-bounce">.</div>
              <div className="animate-bounce delay-100">.</div>
              <div className="animate-bounce delay-200">.</div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            className={`px-6 py-2 rounded-lg font-medium ${
              isLoading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;