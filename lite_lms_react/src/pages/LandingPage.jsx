import React from 'react';
import LandingHeader from '../components/LandingHeader';
import LandingHero from '../components/LandingHero';
import LandingFooter from '../components/LandingFooter';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <LandingHeader />
      <LandingHero />
      <LandingFooter />
    </div>
  );
}

export default LandingPage;