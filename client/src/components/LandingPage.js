import React, { useState, useEffect } from 'react';
import world_data from './world.topojson'
import { json } from "d3-fetch"
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import * as topojson from 'topojson';
import Globe from "./Globe"
// import GlobeClass from "./GlobeClass"


function LandingPage() {
  const [world, setWorld] = useState([])

    useEffect(() => {

        json(world_data)
      .then(data => {
       const dataGlobe = topojson.feature(data, data.objects.countries).features
        setWorld(dataGlobe)
      })

  }, [])

  return (
    <div className = "total-landingpage">
      <div className = "landingpage">
        <h3 className = "title"> Bazaar </h3>
        <div className = "linkwrapper">
          <Link className = "login-link"  to={`/login`}> Log In </Link>
          <Link className = "signup-link"  to={`/signup`}>
            <Button variant="contained" color="primary" className = "signup button"> Sign Up </Button>
          </Link>
        </div>
      </div>
      <div className = "hero-display">
        <div className = "title-hero">
          <h1> Buy, sell, explore products from anywhere anytime. </h1>
          <p> Easiest and fastest way to buy and sell the items you want. </p>
          <Link className = "signup-link"  to={`/signup`}>
            <Button variant="contained" color="primary" className = "signup button"> Sign Up </Button>
          </Link>
        </div>
        <div className = "map">
        <Globe data = {world} />
        </div>
      </div>
    </div>


    )
}


export default LandingPage