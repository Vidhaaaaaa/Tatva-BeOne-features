import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="TatvaCare Logo" className="logo-img" /> {/* Replace with actual logo path */}
        <span className="logo-text">tatvacare</span>
      </div>
      <ul className="navbar-menu">
        <li><a href="#solutions">Solutions</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#abha">ABHA</a></li>
        <li><a href="#blogs">Blogs</a></li>
        <li><a href="#about">About Us</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;