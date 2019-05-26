const { AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const authenticate = (app, req) => {
  try {
    const jwtCookie = req.cookies.bazaar_app;
    const verified_information = jwt.verify(jwtCookie, "secret")
    console.log("verfiy token", verified_information)
    return verified_information.id;
  } catch(e) {
    throw e.message;
  }


}

module.exports = authenticate
