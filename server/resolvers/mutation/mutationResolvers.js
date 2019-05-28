const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const Promise = require('bluebird')
const authenticate = require('../authenticate')
const buildUpdate = require('../../utils/buildUpdate')

/* For Emergencies only */
const emergencysignup = require('./signup')  /* <-- Use Me for emergencies */
/* For Emergencies only */

const saltRounds = bcrypt.genSaltSync(12)

module.exports = {
  Mutation: {
    async signUp(parent, input, { req, app, postgres }) {

      let email = input.email.toLowerCase();
      let hashedpassword = bcrypt.hashSync(input.password, saltRounds);
      let fullname = input.fullname
      let username = input.username
      let status = "active"
      let country = input.country
      let date = input.date_created

      const newUserInsert = {
        text: "INSERT INTO bazaar.users (email, password, fullname, username, status, country) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        values: [email, hashedpassword, fullname , username, status, country]
      }

      console.log(username, status, country)

      try  {
        let insertResult = await postgres.query(newUserInsert);
        console.log(insertResult.rows)


        let myjwttoken = await jwt.sign({
          email: insertResult.rows[0].email,
          id: insertResult.rows[0].id,
          exp: Math.floor(Date.now() / 1000) + (1000*1000),

        }, "secret");
        console.log("my jwt", myjwttoken)

        req.res.cookie("bazaar_app", myjwttoken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production"
        })

         return {
          message: "Yes!"
        }
      }
      catch(error){
        console.log(error)

        throw "Email is already taken"
      }
    },

    async logIn(parent, input, { req, app, postgres }) {

      try {
         let loginEmail = input.email;

         let password = input.password

         const userPassword = {
           text: "SELECT id, email, date_created, password FROM bazaar.users WHERE email = $1",
           values: [loginEmail]
         }
        const loggedIn = await postgres.query(userPassword)

        const passwordCheck = bcrypt.compareSync(password, loggedIn.rows[0].password)

        if (loggedIn.rows.length === 0 || passwordCheck === false) throw "email or password is incorrect"


        let myjwttoken = await jwt.sign({
          email: loggedIn.rows[0].email,
          id: loggedIn.rows[0].id,
          exp: Math.floor(Date.now() / 1000) + (1000*1000),

        }, "secret");
        console.log("my jwt", myjwttoken)

        req.res.cookie("bazaar_app", myjwttoken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production"
        })

        return {
          message: "logged in"
        }
      }
      catch(error) {
        console.log(error)
        throw "email or password is incorrect"
      }
    },
    async addItem(parent, input, { req, app, postgres }) {
          let userId = authenticate(app, req);
          let item = input.item_name.toLowerCase();
          let item_type = input.item_type
          let item_status = input.status.toLowerCase();
          let price = input.price
          let inventory = input.inventory
          let owner_id = userId
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

      /*
1) CHeck if item is available
2) Check if quantity is above zero
3) Stripe
4) Insert into purchased items
      */
      const user_id = authenticate(app, req);


      let item_id = input.id,
          owner_id = user_id,
          shipping_status = "not shipped",
          purchased_quantity = input.purchased_quantity,
          transaction_id = 10

      const getItem = {
        text: "SELECT * FROM bazaar.items WHERE id = $1",
        values:[item_id]
      }

      const getItemValue = await postgres.query(getItem)

      const item = getItemValue.rows[0];

     let purchased_from_id = item.owner_id
     let newInventory = item.inventory - 1

     console.log("item_id", input.id)
      console.log("owner_id", user_id)
      console.log("shipping_status", shipping_status)
      console.log("purchased_from_id", purchased_from_id)


      const boughtItemQuery = {
        text: "INSERT INTO bazaar.purchased_items (item_id, purchased_from_id, owner_id, shipping_status, purchased_quantity, transaction_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        values: [item_id, purchased_from_id, owner_id, shipping_status, purchased_quantity, transaction_id]
      }

      const boughtItem = await postgres.query(boughtItemQuery)

      const updateItem = {
        text: "UPDATE bazaar.items SET inventory = $1 WHERE id = $2",
        values: [newInventory, item_id]
      }

      const updateResult = await postgres.query(updateItem)


      const queryTransaction = {
        text: "INSERT INTO bazaar.transactions (stripe_charge_id) VALUES ($1) RETURNING *",
        values: [transaction_id]
      }

      const updateTransaction = await postgres.query(queryTransaction)

      return {
        message: `Item ${item_id} has been purchaded from ${purchased_from_id} and is ${shipping_status}`
      }
     },

     async updateItem(parent, input, { req, app, postgres }) {

      const user_id = authenticate(app, req);
      let item_name = input.item_name
      let item_id = input.id

      const updateObject = {
        id: item_id,
        item_name: item_name
      }

      const updateItem = buildUpdate(updateObject, 'id', 'bazaar.items')

      const getItemValue = await postgres.query(updateItem)

      return {
        message: "changed!"
      }

     },

     async updateUser(parent, input, { req, app, postgres }) {
        const user_id = authenticate(app, req);
        let user_id = input.id
        let fullname = input.fullname

        const updateObject = {
          id: user_id,
          fullname: fullname
        }

        const updateUser = buildUpdate(updateObject, 'id', 'bazaar.users')

        const getUserValue = await postgres.query(updateUser)

        return {
          message: "user fullname updated"
        }

     },

     async removeItem(parent, input, { req, app, postgres }) {

      const removedItems = {
        text: "INSERT INTO bazaar.removed_items SELECT * FROM bazaar.items WHERE id = $1",
        values: [id]
      }

     const removedItemValue = await postgres.query(removedItems)

      const deleteItem = {
        text: "DELETE FROM bazaar.items WHERE id = $1",
        values: [id]
      }

      const deleteItemValue = await postgres.query(deleteItem)

      return {
        message: "item removed"
      }
     }

  }

}




