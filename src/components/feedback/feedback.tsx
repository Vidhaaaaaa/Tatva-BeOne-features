import React, { useState } from 'react';
import './Feedback.css';

const Feedback: React.FC = () => {
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Feedback sent!');
    setFeedbackText(''); // Clear the textbox after submission
  };

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Feedback</h2>
      <textarea
        className="feedback-textbox"
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        placeholder="Enter your feedback here..."
      />
      <button className="feedback-submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Feedback;