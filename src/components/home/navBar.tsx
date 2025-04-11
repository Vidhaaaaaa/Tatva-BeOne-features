import React from 'react';
import './navBar.css';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/logo.png" alt="TatvaCare Logo" className="h-10" /> {/* Replace with actual logo path */}
        <span className="text-xl font-bold text-purple-700 ml-2">tatvacare</span>
      </div>
      <ul className="flex space-x-6 text-gray-600">
        <li><a href="#solutions" className="hover:text-purple-700">Solutions</a></li>
        <li><a href="#products" className="hover:text-purple-700">Products</a></li>
        <li><a href="#abha" className="hover:text-purple-700">ABHA</a></li>
        <li><a href="#blogs" className="hover:text-purple-700">Blogs</a></li>
        <li><a href="#about" className="hover:text-purple-700">About Us</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;