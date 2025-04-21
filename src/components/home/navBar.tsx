import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="flex flex-col gap-4 md:flex-row md:gap-0 justify-between items-center px-48 py-4 bg-white shadow-sm">
      <div className="flex items-center">
        <Link to="/home" className="no-underline text-gray-600 text-base flex items-center hover:text-purple-600">
          <img src="/tatva-icon.svg" alt="TatvaCare Logo" className="h-10" />
          <span className="text-xl font-bold text-purple-600 ml-2">Tatva</span>
        </Link>
      </div>
      <ul className="list-none flex flex-col gap-2 md:flex-row md:gap-6">
        <li>
          <Link to="/points" className="no-underline text-gray-600 text-base flex items-center hover:text-purple-600">Points</Link>
        </li>
        <li>
          <Link to="/schedule" className="no-underline text-gray-600 text-base flex items-center hover:text-purple-600">Schedule</Link>
        </li>
        <li>
          <Link to="/abha" className="no-underline text-gray-600 text-base flex items-center hover:text-purple-600">ABHA</Link>
        </li>
        <li>
          <Link to="/hub" className="no-underline text-gray-600 text-base flex items-center hover:text-purple-600">Hub</Link>
        </li>
        <li>
          <Link to="/feedback" className="no-underline text-gray-600 text-base flex items-center hover:text-purple-600">Feedback</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;