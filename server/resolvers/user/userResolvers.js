const authenticate = require('../authenticate')

module.exports = {
  User: {
    async items(parent, input, {app, req, postgres}) {
        const id = parent.id

        console.log("User Resolvers ID: ", id)

        const getItems = {
            text: 'SELECT * FROM bazaar.items WHERE owner_id = $1',
            values: [id]
        }
        const results = await postgres.query(getItems)
        console.log(results)
        return results.rows
    },
    async itemsActive(parent, input, {app, req, postgres}){
        const id = parent.id

        const active_status = "active"

        const getActiveItem = {
            text: "SELECT * FROM bazaar.items WHERE status = $2 AND owner_id = $1",
            values: [id, active_status]
        }

        const results = await postgres.query(getActiveItem)

        return results.rows

    },
    async itemsInactive(parent, input, {app, req, postgres}) {
        const id = parent.id

        const inactive_status = "inactive"

        const getInactiveItem = {
            text: "SELECT * FROM bazaar.items WHERE status = $2 AND owner_id = $1",
            values: [id, inactive_status]
        }

        const results = await postgres.query(getInactiveItem)

        return results.rows

    }
  },
}
