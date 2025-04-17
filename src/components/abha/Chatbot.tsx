import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: 'Hi! I’m TatvaCare’s Wellness Assistant, powered by Gemini AI. How can I help you today?', isUser: false },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, isUser: true };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const result = await model.generateContent(input);
      const botResponse = result.response.text();
      setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
    } catch (error) {
      console.error('Gemini API error:', error);
      setMessages((prev) => [...prev, { text: 'Sorry, something went wrong. Please try again.', isUser: false }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsTyping(true);
    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Image = reader.result?.toString().split(',')[1];
        if (!base64Image) throw new Error('Failed to read image');

        // Send image and prompt to Gemini
        const result = await model.generateContent([
          'Analyze this image for health-related insights (e.g., skin condition, medical equipment). Provide a brief description.',
          {
            inlineData: {
              data: base64Image,
              mimeType: file.type,
            },
          },
        ]);
        const botResponse = result.response.text();
        setMessages((prev) => [
          ...prev,
          { text: `Image uploaded: ${file.name}`, isUser: true },
          { text: botResponse, isUser: false },
        ]);
      };
    } catch (error) {
      console.error('Image processing error:', error);
      setMessages((prev) => [...prev, { text: 'Failed to process image. Please try again.', isUser: false }]);
    } finally {
      setIsTyping(false);
      if (fileInputRef.current) fileInputRef.current.value = ''; // Reset file input
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
    setTimeout(handleSend, 0); // Ensure input is set before sending
  };

  return (
    <div className="flex max-w-5xl mx-auto mt-8 px-4 sm:px-8 flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-gray-50 p-4 rounded-lg mr-4">
        <h3 className="text-lg font-semibold text-purple-600 mb-4">Quick Links</h3>
        <Link to="/schedule" className="block text-purple-600 hover:text-purple-700 mb-2">Schedule Appointment</Link>
        <Link to="/feedback" className="block text-purple-600 hover:text-purple-700 mb-2">Give Feedback</Link>
        <div className="accordion">
          <button
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="w-full text-left text-purple-600 hover:text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            aria-expanded={isAccordionOpen}
            aria-controls="wellness-tips"
          >
            Wellness Tips
          </button>
          <div
            id="wellness-tips"
            className={`${isAccordionOpen ? 'block' : 'hidden'} mt-2 text-gray-600`}
          >
            Tip: Drink 8 glasses of water daily!
          </div>
        </div>
      </aside>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        {/* Chat Window */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-4 max-h-[500px] overflow-y-auto" role="log" aria-live="polite">
          {messages.map((msg, index) => (
            <div key={index} className="flex items-start mb-2 animate-slide-in">
              <div
                className={`${
                  msg.isUser
                    ? 'bg-purple-600 text-white ml-auto'
                    : 'bg-gray-100 text-gray-800 mr-auto'
                } rounded-lg p-3 max-w-xs`}
              >
                {msg.text}
                {!msg.isUser && (
                  <div className="mt-2">
                    <Link
                      to="/feedback"
                      className="text-xs text-purple-400 hover:text-purple-500"
                      aria-label="Provide feedback on this response"
                    >
                      Was this helpful?
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-1 mb-2" aria-label="Assistant is typing">
              <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="mt-4">
          <div className="flex gap-2 mb-4 flex-wrap">
            <button
              onClick={() => handleSuggestedPrompt('What are migraine symptoms?')}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
              aria-label="Ask about migraine symptoms"
            >
              What are migraine symptoms?
            </button>
            <button
              onClick={() => handleSuggestedPrompt('How to manage stress?')}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
              aria-label="Ask about stress management"
            >
              How to manage stress?
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about symptoms, appointments, or wellness tips..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600"
              aria-label="Enter your question or message"
            />
            <button
              onClick={handleSend}
              className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transform hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-purple-600"
              aria-label="Send message"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="image-upload"
              ref={fileInputRef}
              onChange={handleImageUpload}
              aria-label="Upload an image"
            />
            <label
              htmlFor="image-upload"
              className="p-2 text-purple-600 hover:text-purple-700 cursor-pointer"
              aria-label="Upload an image for analysis"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;