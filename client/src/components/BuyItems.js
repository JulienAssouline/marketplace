import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Mutation } from "react-apollo"



const BUY_ITEMS_MUTATION = gql`
  mutation buyitemsMutation($id: ID!, $purchased_quantity: Int) {
    buyItem(id: $id, purchased_quantity: $purchased_quantity) {
      message
    }
  }
`

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function IsItemDescription(props) {

  if (0 === props.data.item_description.length) return null;
  return <p className = "buy-item"> { "Description: " + props.data.item_description} </p>
}

function BuyItems() {

  function handleChange(e) {
    console.log(e.target.value)
  }

  return (
    <div id = "buy-items">
      <br />
      <Mutation
      mutation = {BUY_ITEMS_MUTATION}
      onError = {(error) => {
        console.log(error)
        }
      }
      onCompleted = {(data) => {
        console.log("Data: ", data)
        }
      }
      >
      {
        (buyItem, {dataMutation}) => (
          <div>
                <h1 className = "buy-items-title"> Buy Items </h1>
                    <Query query = { gql`
                      query {
                        getAllActiveItems {
                            id
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
                        console.log(data)

                       return (
                          <div className = "buy-items-wrapper">
                            {
                              data.getAllActiveItems.map((d,i) =>
                                <div className = "buy-items-display" key = {i}>

                                  <p className = "buy-item"> {"Name: " + d.item_name} </p>
                                  <p className = "buy-item"> {"Type: " + d.item_type} </p>
                                  <p className = "buy-item"> { "Price: $" + numberWithCommas(d.price)} </p>
                                  <p className = "buy-item"> {"Amount: " + d.inventory} </p>
                                  <IsItemDescription data = {d} />
                                  <div className="buy-item-input-group">
                                  <Button
                                  onClick = {() =>
                                    buyItem({variables: { id: d.id} })
                                  }
                                  variant="contained"
                                  type="submit"
                                  color="primary"
                                  className = "buy item button"> Buy Item </Button>
                                  <TextField
                                    required
                                    id= "inventory"
                                    type = "number"
                                    label= {"Amount"}
                                    className = "additem inventory"
                                    onChange={handleChange}
                                  />
                                  </div>
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
      </Mutation>
    </div>
    )
}

export default BuyItems