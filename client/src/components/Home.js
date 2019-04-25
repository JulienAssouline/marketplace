import React from "react";
import { Link } from "react-router-dom";


function Home() {
  return (
    <div>
    <h1> Home </h1>
      <Link className = "browse-items-link"  to={`/items`}> Browse Items </Link>
      <Link className = "sell-items-link"  to={`/items`}> Sell your items </Link>
      <Link className = "add-items-link"  to={`/add-items`}> Add Items </Link>
      <Link className = "view-items-link"  to={`/items`}> View your inventory </Link>
    </div>
  )
}

export default Home