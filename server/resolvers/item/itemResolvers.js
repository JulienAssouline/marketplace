const authenticate = require('../authenticate')

module.exports = {
  Item: {
    async owner(parent, input, {app, req, postgres}) {
        const ownerid = parent.owner_id || 1
        const getOwner = {
            text: 'SELECT * FROM bazaar.users WHERE id = $1',
            values: [ownerid]
        }
        const results = await postgres.query(getOwner);
        console.log(results)
        return results.rows[0]
    }
  },
}
