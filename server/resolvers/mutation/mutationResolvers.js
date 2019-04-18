const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 12
const crypto = require('crypto')
const Promise = require('bluebird')
const authenticate = require('../authenticate')

/* For Emergencies only */
const emergencysignup = require('./signup')  /* <-- Use Me for emergencies */
/* For Emergencies only */


module.exports = {
  Mutation: {
    async signUp(parent, input, { req, app, postgres }) {
      console.log("show me input", input);
      let email = input.email.toLowerCase();
      let hashedpassword = await bcrypt.hash(input.password, saltRounds);
      const newUserInsert = {
        text: "INSERT INTO bazaar.users (email, password) VALUES ($1, $2) RETURNING *",
        values: [email, hashedpassword]
      }

      try  {
        let insertResult = await postgres.query(newUserInsert);
         return {
          message: hashedpassword
        }
      }
      catch(error){
       return {
        message: "Email is already taken"
      }
      }
      // console.log("insert result: ", input)



      // console.log(insertResult)

    },

    async logIn(parent, input, { req, app, postgres }) {
      let loginEmail = input.email.toLowerCase();
      let loginPassword = await bcrypt.hash(input.password, saltRounds);

      const userPassword = {
        text: "SELECT password FROM bazaar.users WHERE email = $1",
        values: [loginEmail]
      }
     const loggedIn = await postgres.query(userPassword)

      return {
        message: "logged in"
      }
    }
    /* TODO: Add more resolvers */
  },
}



