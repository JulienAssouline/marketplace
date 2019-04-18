const { gql } = require('apollo-server-express')

module.exports = gql`

  type User {
    id: ID!,
    fullname: String
  }
  type Query {
    getAllUsers: [User],
    user(id : ID): User,
    test: String!
    #TODO
  }

  type Mutation {
    signUp(email: String!, password: String!): SignupResponse!
    logIn(email: String!, password: String!): LoginResponse!
  }

  type SignupResponse {
    message: String
  }

  type LoginResponse {
    message: String
  }

  type Test {
    name: String
  }
  # type Mutation {
  #   #TODO
  # }

`

