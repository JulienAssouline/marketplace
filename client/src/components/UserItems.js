import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Query } from "react-apollo"
import gql from "graphql-tag";

function UserItems() {
  return (
  <div>
    <h1> User Items </h1>
    <Query>
    </Query>
  </div>
    )
}

export default UserItems