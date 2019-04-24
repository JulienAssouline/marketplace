import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Query } from "react-apollo"
import gql from "graphql-tag";



function ListUsers(props) {

  return (
    <div>
    <p>Users</p>
    {
      props.data.getUsers.map((d, i) =>
        <li className ="list" key= {i}> {d.email} </li>
      )
    }
    </div>
    )
}

function Users() {
  return (
    <Query query={gql`
      query{
         getUsers {
           email
         }
       }
      `}>
      {
        ({loading, errors, data}) => {
          if(loading) return <div> Loading</div>
          if(errors) return <div> Errors {JSON.stringify(errors)} </div>
          return (
            <Router>
            <Route path="/users" exact render={props => (
                <ListUsers data = {data} />
              )}/>
            </Router>
            )
      }

      }
    </Query>
    )
}

export default Users