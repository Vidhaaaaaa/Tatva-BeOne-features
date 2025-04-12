import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-link">
          <img src="/tatva-icon.svg" alt="TatvaCare Logo" className="logo-img" />
          <span className="logo-text">Tatva</span>
        </Link>
      </div>
      <ul className="navbar-menu">
        <li>
            <Link to="/points" className="navbar-link">Points</Link>
        </li>
        <li>
            <Link to="/schedule" className="navbar-link">Schedule</Link>
        </li>

        <li>
            <Link to="/abha" className="navbar-link">ABHA</Link>
        </li>

        <li>
            <Link to="/hub" className="navbar-link">Hub</Link>
        </li>

        <li>
          <Link to="/feedback" className="navbar-link">Feedback</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;