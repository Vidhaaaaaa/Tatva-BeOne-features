import React from 'react';
import './main_window.css';

const main_window: React.FC = () => {
  return (
    <main className="main-content">
      <div className="welcome-section">
        <div className="welcome-message">
          <img src="/placeholder_user.jpg" alt="User" className="user-image" />
          <p>Welcome Back, Ayush<br />You have a 1 week streak going.</p>
        </div>
        <div className="streak-bar">
          <span>🟡</span>
          <span>🟡</span>
          <span>🟡</span>
          <span>🟡</span>
          <span>🟡</span>
          <span>🟡</span>
          <span>🟠</span>
        </div>
      </div>
      <div className="activity-section">
        <h2 className="activity-title">Daily Activity</h2>
        <div className="activity-card">
          <h3 className="card-title">Achieve self love activity</h3>
          <p className="progress">4 of 8 classes completed</p>
          <div className="progress-bar_2"></div>
          <div className="progress-bar_1"></div>
          <div className="activity-grid">
            <div className="activity-item">
              <img src="/activity1.jpg" alt="Experience Joy" />
              <div>
                <h4>Experience Joy ✓</h4>
                <p>5 mins<br />This practice is designed to foster emotions of joy, happiness, and overall well-being.</p>
              </div>
            </div>
            <div className="activity-item">
              <img src="/activity2.jpg" alt="Relax Your Mind" />
              <div>
                <h4>Relax Your Mind ✓</h4>
                <p>5 mins<br />The solfeggio frequencies consist of specific tones thought to produce significant effects.</p>
              </div>
            </div>
            <div className="activity-item">
              <img src="/activity3.jpg" alt="Breathing Exercise" />
              <div>
                <h4>Breathing Exercise</h4>
                <p>5 mins<br />Bhramari pranayama represents a refined breathing method.</p>
              </div>
            </div>
            <div className="activity-item">
              <img src="/activity4.jpg" alt="Gyan Mudra" />
              <div>
                <h4>Gyan Mudra</h4>
                <p>5 mins<br />Gyan mudra is recognized as the gesture for enhancing intuitive wisdom.</p>
              </div>
            </div>
          </div>
          <button className="view-button">View →</button>
        </div>
      </div>
      <div className="goals-section">
        <div className="goals-card">
          <h3 className="card-title">Set Goals</h3>
          <p>Establish and reach your well-being objectives seamlessly with our tailored planning tool, leading you toward a more vibrant and joyful life.</p>
          <button className="setup-button">Setup →</button>
        </div>
      </div>
      <div className="survey">
        <div className="survey_container">
          <h3 className="survey-title">Take Survey</h3>
          <p>Share Your Insights: Take Our Wellness Survey!</p>
          <button className="survey-button">Survey →</button>
        </div>
      </div>
    </main>
  );
};

export default main_window;