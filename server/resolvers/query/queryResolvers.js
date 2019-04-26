const authenticate = require('../authenticate')

module.exports = {
  Query: {
    async getUserItem(parent, input, { req, app, postgres }) {
        let itemId = input.id

        const userItem = {
        text: "SELECT * FROM bazaar.items WHERE id = $1",
        values: [itemId]
      }
        const getUserItems = await postgres.query(userItem)
        console.log('getUserItems, ', getUserItems)
        const { id,
            item_name,
            item_type,
            status,
            price,
            inventory,
            owner_id,
            purchased_quantity,
            transaction_id } = getUserItems.rows[0]

        return {
            id,
            item_name,
            item_type,
            status,
            price,
            inventory,
            owner_id,
            purchased_quantity,
            transaction_id
        }
    },

    async getAllItems(parent, input, { req, app, postgres }) {
        const itemGotten = {
        text: "SELECT id, item_name, owner_id FROM bazaar.items"
      }
      const insertItem = await postgres.query(itemGotten)
      console.log(insertItem)

      return insertItem.rows

    },
    async getAllActiveItems(parent, input, { req, app, postgres }) {

        const active_status = "active"

        const allActiveItems = {
        text: "SELECT * FROM bazaar.items WHERE status = $1",
        values: [active_status]
      }

      const results = await postgres.query(allActiveItems)

      return results.rows

    },
    async getUser(parent, input, { req, app, postgres }) {
         let userId = input.id

          const user = {
          text: "SELECT * FROM bazaar.users WHERE id = $1",
          values: [userId]
        }

        const userGotten = await postgres.query(user)
        console.log(userGotten.rows[0])

        const { id,
            email,
            fullname,
            username,
            status,
            country } = userGotten.rows[0]

        return {
            id,
            email,
            fullname,
            username,
            status,
            country
        }
    },
    async getUsers(parent, input, { req, app, postgres }) {
        const usersQuery = {
        text: "SELECT * FROM bazaar.users"
      }

      const allUsers = await postgres.query(usersQuery)
      return allUsers.rows
    },

    async getTransaction(parent, input, { req, app, postgres }) {
         let transaction_id = input.id

          const queryTransaction = {
          text: "SELECT * FROM bazaar.transactions WHERE id = $1",
          values: [transaction_id]
        }

        const transaction = await postgres.query(queryTransaction)

        const { id,
            stripe_charge_id } = transaction.rows[0]

        return {
            id,
            stripe_charge_id
        }

    },

    async getTransactions(parent, input, { req, app, postgres }) {

        const transactions = {
            text: "SELECT * FROM bazaar.transactions"
        }

        const allTransactions = await postgres.query(transactions)
        return allTransactions.rows
    },
  },
}
