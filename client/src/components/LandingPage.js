import React from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';


function LandingPage() {
  return (
    <div className = "landingpage">
      <h3 className = "title"> Bazaar </h3>
      <div className = "linkwrapper">
        <Link className = "login-link"  to={`/login`}> Log In </Link>
        <Link className = "signup-link"  to={`/signup`}>
          <Button variant="contained" color="primary"> Sign Up </Button>
        </Link>
      </div>
    </div>
    )
}


export default LandingPage