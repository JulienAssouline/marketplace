import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Query } from "react-apollo"
import gql from "graphql-tag";



function ListItems(props) {

  return (
    <div>
    <p>Items</p>
    {
      props.data.getAllItems.map((d, i) =>
         <li className ="list" key= {i}> {d.item_name} </li>
         )
    }
    </div>
    )
}

function Items() {
  return (
    <Query query={gql`
      query{
        getAllItems {
          item_name
        }

      }
      `}>
      {
        ({loading, errors, data}) => {
          if(loading) return <div> Loading</div>
          if(errors) return <div> Errors {JSON.stringify(errors)} </div>
          return (
            <Router>
            <Route path="/items" exact render={props => (
              <ListItems data = {data} />
              )}/>
            </Router>
            )
      }

      }
    </Query>
    )
}

export default Items