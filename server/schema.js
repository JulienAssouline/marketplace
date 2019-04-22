const { gql } = require('apollo-server-express')

module.exports = gql`

  scalar Date

  type Owner {
    id: ID!,
    fullname: String
  }

  type Query {
    getUserItem(id: Int): Item!
    getAllItems: [Item!]
    getUser(id: Int): User!
    getUsers: [User!]
    getPurchasedItems: [purchasedItem!]
  }

type purchasedItem{
  id: Int,
  item_id: Int,
  purchased_from: String,
  shipping_status: String,
  owner_id: Int,
  purchased_quantity: Int,
  transaction_id: Int
}

type Item{
  id: Int,
  item_name: String,
  item_type: String,
  status: String,
  price: Float,
  inventory: Int,
  owner: Owner,
  purchased_quantity: Int,
  transaction_id: Int
}

type User {
  id: Int,
  email: String,
  fullname: String,
  username: String,
  status: String,
  country: String
}

  type Mutation {
    signUp(email: String!, password: String!, fullname: String, username: String, status: String, country: String, date_created: Date): SignupResponse!
    logIn(email: String!, password: String!): LoginResponse!
    addItem(item_name: String!, item_type: String!, status: String!, price: Float, inventory: Int, owner_id: Int, date_created: Date, item_description: String!): AddItemResponse!
    buyItem(id: ID!): buyItemResponse!
  }

  type buyItemResponse{
    message: String
  }

  type SignupResponse {
    message: String
  }

  type LoginResponse {
    message: String
  }

  type AddItemResponse {
    message: String
  }

`