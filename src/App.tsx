import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/home/navBar.tsx'
import Home_Main from './components/home/main_window.tsx'
import Footer from './components/home/footer.tsx'

import Points from './components/points/points.tsx';
import Schedule from './components/schedule/schedule.tsx';
import ABHA from './components/abha/abha.tsx';
import Hub from './components/hub/hub.tsx';
import Feedback from './components/feedback/feedback.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <Routes>

          <Route path="/" element={<Home_Main />} />

          <Route path="/points" element={<Points />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/abha" element={<ABHA />} />
          <Route path="/hub" element={<Hub />} />
          <Route path="/feedback" element={<Feedback />} />
          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;