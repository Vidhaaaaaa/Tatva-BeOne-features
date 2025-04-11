// import { useState } from 'react'
// import './App.css'

import React from 'react';
import NavBar from './components/home/navBar.tsx'
import Home_Main from './components/home/main_window.tsx'
import Footer from './components/home/footer.tsx'

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Home_Main />
      <Footer />
    </>
  );
};

export default App;