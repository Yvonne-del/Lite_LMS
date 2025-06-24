import React from 'react';
import { Link } from 'react-router-dom';
import './LandingHeader.css'; // optional styling

function LandingHeader() {
  return (
    <header className="landing-header">
      <div className="logo">Lite LMS</div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header> 
  );
}

export default LandingHeader;
