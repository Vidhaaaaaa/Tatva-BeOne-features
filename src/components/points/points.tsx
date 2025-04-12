import React from 'react';
import './points.css';

const Points: React.FC = () => {
  return (
    <section className="point-container">
      <h1 className="point-heading">Daily Streak  6🔥</h1>

      <ul className="point-benefits">
        <li className="point-benefit-item">
          <strong>Points Accumulated:</strong> 32
        </li>
        {/* <li className="point-benefit-item">
          <strong>Easy to Use:</strong> Designed with simplicity in mind.
        </li>
        <li className="point-benefit-item">
          <strong>Always Supported:</strong> Our team has your back, anytime.
        </li> */}
      </ul>
      <button className="point-cta">Redeem Now</button>
    </section>
  );
};

export default Points;