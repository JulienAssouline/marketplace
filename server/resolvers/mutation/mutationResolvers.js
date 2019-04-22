const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 12
const crypto = require('crypto')
const Promise = require('bluebird')
const authenticate = require('../authenticate')
const buildUpdate = require('../../utils/buildUpdate')

/* For Emergencies only */
const emergencysignup = require('./signup')  /* <-- Use Me for emergencies */
/* For Emergencies only */


module.exports = {
  Mutation: {
    async signUp(parent, input, { req, app, postgres }) {

      let email = input.email.toLowerCase();
      let hashedpassword = await bcrypt.hash(input.password, saltRounds);
      let fullname = input.fullname.toLowerCase()
      let username = input.username.toLowerCase()
      let status = input.status.toLowerCase()
      let country = input.country.toLowerCase()
      let date = input.date_created

      const newUserInsert = {
        text: "INSERT INTO bazaar.users (email, password, fullname, username, status, country) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        values: [email, hashedpassword, fullname , username, status, country]
      }

      try  {
        let insertResult = await postgres.query(newUserInsert);
         return {
          message: hashedpassword
        }
      }
      catch(error){
        console.log(error)

        throw "Email is already taken"
      }
    },

    async logIn(parent, input, { req, app, postgres }) {
      let loginEmail = input.email.toLowerCase();

      const userPassword = {
        text: "SELECT date_created, password FROM bazaar.users WHERE email = $1",
        values: [loginEmail]
      }
     const loggedIn = await postgres.query(userPassword)

      return {
        message: "logged in"
      }
    },
    async addItem(parent, input, { req, app, postgres }) {
          let item = input.item_name.toLowerCase();
          let item_type = input.item_type.toLowerCase();
          let item_status = input.status.toLowerCase();
          let price = input.price
          let inventory = input.inventory
          let owner_id = input.owner_id
          let item_description = input.item_description


          const userItem = {
            text: "INSERT INTO bazaar.items (item_name, item_type, status, price, inventory, owner_id, item_description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            values: [item, item_type, item_status, price, inventory, owner_id, item_description]
          }

          const insertItem = await postgres.query(userItem)

          return {
            message: `Item ${item} has been added`
          }
     },

     async buyItem(parent, input, { req, app, postgres }) {
      let user_id = 1; // authenticate(req.headers['Authorization']) id of person who made the query

      let item_id = input.id,
          owner_id = user_id,
          shipping_status = "not shipped",
          purchased_quantity = 1,
          transaction_id = 1

      const getItem = {
        text: "SELECT * FROM bazaar.items WHERE id = $1",
        values:[item_id]
      }

      const getItemValue = await postgres.query(getItem)

      const item = getItemValue.rows[0];

     let purchased_from_id = item.owner_id
     let newInventory = item.inventory - 1

      const boughtItemQuery = {
        text: "INSERT INTO bazaar.purchased_items (item_id, purchased_from_id, owner_id, shipping_status, purchased_quantity, transaction_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        values: [item_id, purchased_from_id, owner_id, shipping_status, purchased_quantity, transaction_id]
      }

      const boughtItem = await postgres.query(boughtItemQuery)

      // const updateObject = {
      //   id: item_id,
      //   inventory: newInventory
      // }

      // const updateQuery = buildUpdate(updateObject, 'id', 'bazaar.items')

      // const updateResult = await postgres.query(updateQuery)

      const updateItem = {
        text: "UPDATE bazaar.items SET inventory = $1 WHERE id = $2",
        values: [newInventory, item_id]
      }

      const updateResult2 = await postgres.query(updateItem)

      console.log(updateResult2)

      return {
        message: `Item ${item_id} has been purchaded from ${purchased_from_id} and is ${shipping_status}`
      }
     }

     // async updateItem(parent, input, { req, app, postgres }) {
     //  let item = input.item_name.toLowerCase()

     //  const itemUpdated = {
     //    text: "UPDATE bazaar.items SET status = deleted WHERE status"
     //  }

     //    return {
     //      message: "item updated"
     //    }
     // }
    /* TODO: Add more resolvers */
  }

}




