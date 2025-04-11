import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/tatva-icon.svg" alt="TatvaCare Logo" className="logo-img" />
        <span className="logo-text">Tatva</span>
      </div>
      <ul className="navbar-menu">
        <li><a href="#solutions">Solutions</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#abha">ABHA</a></li>
        <li><a href="#blogs">Blogs</a></li>
        <li>
          <Link to="/feedback" className="navbar-link">About Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;