import React from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';


function LandingPage() {
  return (
    <div className = "total-landingpage">
      <div className = "landingpage">
        <h3 className = "title"> Bazaar </h3>
        <div className = "linkwrapper">
          <Link className = "login-link"  to={`/login`}> Log In </Link>
          <Link className = "signup-link"  to={`/signup`}>
            <Button variant="contained" color="primary"> Sign Up </Button>
          </Link>
        </div>
      </div>
      <div className = "hero-display">
        <div className = "title-hero">
          <h1> Buy, sell, explore products from anywhere anytime </h1>
        </div>
        <div className = "map">
          <svg width = "500" height = "400"> </svg>
        </div>
      </div>
    </div>


    )
}


export default LandingPage