const { gql } = require('apollo-server-express')

module.exports = gql`

  scalar Date

  type Query {
    getMyItems: [Item!]
    getAllItems: [Item!]
    getUserProfile: User!
    getUsers: [User!]
    getAllActiveItems: [Item!]
    getPurchasedItems: [purchasedItem!]
    getTransaction(id: Int): Transaction!
    getTransactions: [Transaction!]
  }

type Transaction {
  id: Int,
  stripe_charge_id: Int,
  date_of_purchase: Date
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

type User {
  id: Int,
  email: String,
  fullname: String,
  username: String,
  status: String,
  country: String,
  items: [Item]!,
  itemsActive: [Item]!,
  itemsInactive: [Item]!
}

type Item{
  id: Int,
  item_name: String,
  item_type: String,
  status: String,
  price: Float,
  inventory: Int,
  owner: User!,
  item_description: String,
  purchased_quantity: Int,
  transaction_id: Int
}

  type Mutation {
    signUp(email: String!, password: String!, fullname: String, username: String, status: String, country: String, date_created: Date): SignupResponse!
    logIn(email: String!, password: String!): LoginResponse!
    addItem(item_name: String!, item_type: String, status: String!, price: Float!, inventory: Int!, owner_id: Int, date_created: Date, date_updated: Date, item_description: String): AddItemResponse!
    buyItem(id: ID!, purchased_quantity: Int): buyItemResponse!
    updateItem(id: ID!, item_name: String, item_type: String, status: String, price: Float, inventory: Int, owner_id: Int, date_updated: Date, item_description: String): updateItemResponse!
    updateUser(id: ID!, email: String, password: String, fullname: String, username: String, status: String, country: String, date_updated: Date): updateUserResponse!
    removeItem(id: ID!, item_name: String, item_type: String, status: String, price: Float, inventory: Int, owner_id: Int, date_updated: Date, item_description: String): removeItemResponse!
  }

  type removeItemResponse {
    message: String
  }

  type updateUserResponse {
    message: String
  }

  type updateItemResponse {
    message: String
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