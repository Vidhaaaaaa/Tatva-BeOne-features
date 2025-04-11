// import { useState } from 'react'
// import './App.css'

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/home/navBar.tsx'
import Home_Main from './components/home/main_window.tsx'
import Footer from './components/home/footer.tsx'
import Feedback from './components/feedback/feedback.tsx';

const App: React.FC = () => {
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

export default App;