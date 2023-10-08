import React from 'react'
import './landing-page.scss'
import NavBar from '../../components/nav-bar/nav-bar';

function LandingPage() {
  return (
    <div className="landing-page-container">
      <NavBar showLogo={true} showSignIn={true}/>
    </div>
  );
}

export default LandingPage;
