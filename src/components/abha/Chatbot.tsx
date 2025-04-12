import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import './chatbot.css';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState<any>(null);
  const [chat, setChat] = useState<any>(null);

  useEffect(() => {
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
    <div className="chatbot-container">
      <div className="chatbot-card">
        <div className="chatbot-header">
          <h2 className="chatbot-title">ABHA</h2>
          <p className="chatbot-subtitle">Your Wellness ChatBot</p>
        </div>
        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chatbot-message ${
                msg.role === 'user' ? 'chatbot-message-user' : 'chatbot-message-assistant'
              }`}
            >
              <div className="chatbot-message-sender">
                {msg.role === 'user' ? 'You' : 'ABHA'}
              </div>
              <div className="chatbot-message-content">{msg.content}</div>
            </div>
          ))}
          {isLoading && (
            <div className="chatbot-loading">
              <div className="chatbot-loading-text">Thinking</div>
              <div className="chatbot-loading-dot">.</div>
              <div className="chatbot-loading-dot chatbot-loading-dot-delay-1">.</div>
              <div className="chatbot-loading-dot chatbot-loading-dot-delay-2">.</div>
            </div>
          )}
        </div>
        <div className="chatbot-input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Type your message..."
            className="chatbot-input"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            className={`chatbot-button ${isLoading ? 'chatbot-button-disabled' : ''}`}
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