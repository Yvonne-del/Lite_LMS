import React from 'react';
import { Link } from 'react-router-dom';
import './LandingHero.css'; // optional styling

function LandingHero() {
  return (
    <section className="landing-hero">
      <h1>Welcome to Lite LMS!</h1>
      <p>Your all-in-one platform for online learning and teaching.</p>
      <div className="hero-buttons">
        <Link to="/register" className="btn">Start Learning</Link>
        <Link to="/login" className="btn-outline">I'm a Lecturer</Link>
      </div>
    </section>
  );
}

export default LandingHero;
