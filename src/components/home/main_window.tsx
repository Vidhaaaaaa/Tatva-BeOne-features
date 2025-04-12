import React from 'react';
import './main_window.css';

const main_window: React.FC = () => {
  return (
    <main className="main-content">
      <div className="main-text">
        <h1 className="main-title">Let's Transform Every Day!</h1>
        <p className="main-description">
        TatvaCare is an innovative digital platform that empowers healthcare professionals and individuals with chronic conditions to build sustainable habits, driving positive health outcomes.
        </p>
        <div className="main-buttons">
          <button className="main-button">For Individuals</button>
          <button className="main-button">For Healthcare Professionals</button>
        </div>
      </div>
      {/* Placeholder for illustrations (replace with actual images or SVG) */}
      {/* <div className="illustrations">
        <img src="/doctor.png" alt="Doctor" className="illustration-doctor" />
        <img src="/patient.png" alt="Patient" className="illustration-patient" />
        <img src="/phone.png" alt="Phone" className="illustration-phone" />
        <img src="/butter-block.png" alt="Butter Block" className="illustration-butter" />
      </div> */}
    </main>
  );
};

export default main_window;