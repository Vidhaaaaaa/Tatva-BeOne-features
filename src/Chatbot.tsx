import React, { useState } from 'react';
import axios from 'axios';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };

    // Add a default system message if it's the first message
    const systemPrompt = {
      role: 'system',
      content: 'You are a helpful assistant.',
    };

    const newMessages =
      messages.length === 0
        ? [systemPrompt, userMessage]
        : [...messages, userMessage];

    setMessages(newMessages);
    setInput('');

    try {
      console.log(import.meta.env.VITE_DEEPSEEK_API_KEY)
      const response = await axios.post(
        'https://api.deepseek.com/v1/chat/completions',
        {
          model: 'deepseek-reasoner',
          messages: newMessages,
          stream: false,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
          }, 
        }
      );

      console.log('API response:', response.data);

      const reply = response.data?.choices?.[0]?.message;

      if (reply && reply.content) {
        setMessages([...newMessages, reply]);
      } else {
        setMessages([
          ...newMessages,
          { role: 'assistant', content: 'Sorry, no reply received.' },
        ]);
      }

    } catch (error: any) {
      console.error('Network error:', error);

      if (error.response) {
        console.error('Response error status:', error.response.status);
        console.error('Response error data:', error.response.data);
      } else if (error.request) {
        console.error('Request error:', error.request);
      } else {
        console.error('Error during request setup:', error.message);
      }

      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Error: ' + error.message },
      ]);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <div className="bg-gray-100 p-4 rounded-md h-64 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-md px-3 py-2"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
