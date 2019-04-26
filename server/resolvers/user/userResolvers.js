const authenticate = require('../authenticate')

module.exports = {
  User: {
    async items(parent, input, {app, req, postgres}) {
        const id = parent.id
        const getItems = {
            text: 'SELECT * FROM bazaar.items WHERE owner_id = $1',
            values: [id]
        }
        const results = await postgres.query(getItems);
        console.log(results)
        return results.rows
    }
  },
}
