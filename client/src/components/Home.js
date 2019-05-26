import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo"
import gql from "graphql-tag";
import Button from '@material-ui/core/Button';



function Home() {
  return (
    <div id = "home">
      <br />
      <h1 style = {{ backgroundColor:" #ffecc6" }}> Home </h1>
      <div className = "links">
        <br />
        <Link className = "browse-items-link"  to={`/buy-items`}>
           <Button variant="contained" color="primary" className = "submit button"> Browse Items </Button>
        </Link>
        <Link className = "sell-items-link"  to={`/items`}>
           <Button variant="contained" color="primary" className = "submit button"> Sell your items  </Button>
        </Link>
        <Link className = "add-items-link"  to={`/add-items`}>
          <Button variant="contained" color="primary" className = "submit button"> Add Items </Button>
        </Link>
        <Link className = "view-items-link"  to={`/home/items`}>
          <Button variant="contained" color="primary" className = "submit button"> View your inventory </Button>
        </Link>
      </div>
      <br />

      <Query query = {gql`
        query {
          getUserProfile {
              id,
              email,
              fullname,
              username,
              status,
              country
            }
        }
        `
      }
      fetchPolicy = {"network-only"}
      >
      {
        ({loading, errors, data}) => {
          if(loading) return <div> Loading</div>
          if(errors) return <div> Errors {JSON.stringify(errors)} </div>
          console.log(data)
          return (
            <div className = "userInfo">
            <p> {data.getUserProfile.fullname} </p>
            <p> {data.getUserProfile.email} </p>
            <p> {data.getUserProfile.username} </p>
            <p> {data.getUserProfile.country} </p>
            </div>
            )

        }
      }


      </Query>

    </div>

  )
}

export default Home