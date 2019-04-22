const queryResolvers = require('./resolvers/query/queryResolvers')
const mutationResolvers = require('./resolvers/mutation/mutationResolvers')
const itemResolvers = require('./resolvers/item/itemResolvers')




module.exports = () => {
  return {
    ...queryResolvers,
    ...mutationResolvers,
    ...itemResolvers,
    /* More resolvers TODO */
  }
}
