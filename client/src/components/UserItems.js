import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Query } from "react-apollo"
import gql from "graphql-tag";

function Items(props) {
  return(
    <div className = "my-items">
      <p> {props.data[0].item_name} </p>
      <p> {props.data[0].item_type} </p>
      <p> {props.data[0].price} </p>
      <p> {props.data[0].inventory} </p>
      <p> {props.data[0].item_description} </p>
    </div>
    )
}

function UserItems() {
  return (
  <div>
    <h1> User Items </h1>
    <Query query = {gql`
      query {
        getUserProfile {
          id
          items {
            id
            item_name
            item_type
            status
            price
            inventory
            item_description
            purchased_quantity
          }
        }
      }
      `
    }>
    {
      ({loading, errors, data}) => {
        if(loading) return <div> Loading</div>
          if(errors) return <div> Errors {JSON.stringify(errors)} </div>
          return (
            <Items data = {data.getUserProfile.items} />
            )
      }
    }
    </Query>
  </div>
    )
}

export default UserItems