import React from 'react';
import './abha.css';
import Chatbot from './Chatbot.tsx';

const ABHA: React.FC = () => {

  return (
    <div className='chatBot'>
      <h1>Tatva Chatbot</h1>
      <Chatbot />
    </div>
  );
};

export default ABHA;