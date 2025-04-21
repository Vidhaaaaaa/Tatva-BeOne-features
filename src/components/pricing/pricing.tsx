import React from 'react';
import { Link } from 'react-router-dom';
import './pricing.css';

const Pricing: React.FC = () => {
  return (
    <>
      <nav className="navigation">
        <div className="flex items-center">
          <Link to="/" className="no-underline text-gray-600 text-base flex items-center hover:text-purple-600">
            <img src="/tatva-icon.svg" alt="TatvaCare Logo" className="h-10" />
            <span className="text-xl font-bold text-purple-600 ml-2">Tatva</span>
          </Link>
        </div>
        <ul className="menu">
          <li>
            <Link to="/" className="menu-item">Home</Link>
          </li>
          <li>
            <Link to="/pricing" className="menu-item">Pricing</Link>
          </li>
          <li>
            <Link to="/support" className="menu-item">Support</Link>
          </li>
          <li>
            <Link to="/login" className="menu-item">Login</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pricing;