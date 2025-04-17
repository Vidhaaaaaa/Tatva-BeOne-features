import React, { useState } from 'react';

const Feedback: React.FC = () => {
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Feedback sent!');
    setFeedbackText(''); // Clear the textbox after submission
  };

  return (
    <div className="flex bg-white rounded-lg shadow-sm text-center m-4 p-4 md:m-0 md:p-0">
      <div className="flex-1">
        <img 
          src="/feedback_sideImage.jpg"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 p-8 bg-white rounded-lg shadow-sm text-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Feedback</h2>
        <textarea
          className="w-full h-[120px] md:h-[150px] p-3 mb-4 border border-gray-300 rounded-sm resize-y text-base focus:outline-none focus:border-purple-600 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Enter your feedback here..."
        />
        <button
          className="bg-purple-600 text-white py-3 px-6 rounded-lg cursor-pointer text-base hover:bg-purple-700"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Feedback;