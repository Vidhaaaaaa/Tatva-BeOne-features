import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation (for demo purposes)
    if (!username || !password) {
      setError('Please fill in both fields.');
      return;
    }
    // Simulate a successful login (replace with actual API call)
    setError('');
    // Redirect to main window
    navigate('/home');
  };

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
      <div className="login-container">
        <h2 className="login-title">Login to TatvaCare</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username or Email</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              placeholder="Enter your username or email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="login-link">
          Don't have an account? <a href="#signup">Sign Up</a>
        </p>
      </div>
    </>
  );
};

export default Login;