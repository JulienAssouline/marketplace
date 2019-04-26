import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Query } from "react-apollo"
import gql from "graphql-tag";
import Button from '@material-ui/core/Button';



    // <Query>
    // </Query>

function BuyItems() {
  return (
    <div>
      <h1> Buy Items </h1>
      <Query query = { gql`
        query {
          getAllActiveItems {
              item_name
              item_type
              price
              inventory
              item_description
            }
        }
        `
      }>
      {
        ({loading, errors, data}) => {
         if(loading) return <div> Loading</div>
         if(errors) return <div> Errors {JSON.stringify(errors)} </div>
         return (
            <div>
              {
                data.getAllActiveItems.map((d,i) =>
                  <div className = "buy-items-display" key = {i}>

                    <li className = "list"> {d.item_name} </li>
                    <Button
                    variant="contained"
                    color="primary"
                    className = "buy item button"> Buy Item </Button>

                  </div>

                  )
              }
            </div>
          )
         }
        }
      </Query>
    </div>
    )
}

export default BuyItems