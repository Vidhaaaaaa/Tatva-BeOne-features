import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './App.css';
import React from 'react';
import Chatbot from './Chatbot.tsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home_Main />} />
          <Route path="/feedback" element={<Feedback />} />
          {/* Add more routes as needed for other pages (e.g., abha, home) */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <h1>Tatva Chatbot</h1>
      <Chatbot />
    </div>
  );
};

export default App;