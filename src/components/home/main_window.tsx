import React from 'react';

const main_window: React.FC = () => {
  return (
    <main className="main-content">
      <div className="main-text">
        <h1 className="main-title">Let's make every day better!</h1>
        <p className="main-description">
          TatvaCare is a digital system that empowers both healthcare professionals and individuals
          with chronic conditions to create healthy habits leading to positive health outcomes.
        </p>
        <div className="main-buttons">
          <button className="main-button">For Individuals</button>
          <button className="main-button">For Healthcare Professionals</button>
        </div>
      </div>
      {/* Placeholder for illustrations (replace with actual images or SVG) */}
      <div className="illustrations">
        <img src="/doctor.png" alt="Doctor" className="illustration-doctor" /> {/* Replace with doctor image */}
        <img src="/patient.png" alt="Patient" className="illustration-patient" /> {/* Replace with patient image */}
        <img src="/phone.png" alt="Phone" className="illustration-phone" /> {/* Replace with phone image */}
        <img src="/butter-block.png" alt="Butter Block" className="illustration-butter" /> {/* Replace with butter block image */}
      </div>
    </main>
  );
};

export default main_window;