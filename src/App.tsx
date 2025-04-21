import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/home/navBar.tsx';
import HomeMain from './components/home/main_window.tsx';

import Points from './components/points/points.tsx';
import Schedule from './components/schedule/schedule.tsx';
import ABHA from './components/abha/abha.tsx';
import Hub from './components/hub/hub.tsx';
import Feedback from './components/feedback/feedback.tsx';

import Landing from './components/landing/landing.tsx';
import Pricing from './components/pricing/pricing.tsx';
import Support from './components/support/support.tsx';
import Login from './components/Login/login.tsx';

// Custom component to conditionally render Navbar
const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <div className="app-container">
      {!(location.pathname === '/' || location.pathname === '/login' || location.pathname === '/pricing' || location.pathname === '/support') && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/support" element={<Support />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomeMain />} />
        <Route path="/points" element={<Points />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/abha" element={<ABHA />} />
        <Route path="/hub" element={<Hub />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;