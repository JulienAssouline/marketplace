const queryResolvers = require('./resolvers/query/queryResolvers')
const mutationResolvers = require('./resolvers/mutation/mutationResolvers')
const itemResolvers = require('./resolvers/item/itemResolvers')
const userResolvers = require("./resolvers/user/userResolvers")




module.exports = () => {
  return {
    ...queryResolvers,
    ...mutationResolvers,
    ...itemResolvers,
    ...userResolvers
    /* More resolvers TODO */
  }
}
