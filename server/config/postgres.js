const { Pool } = require('pg')

let host, user, password, database, idleTimeoutMillis, connectionTimeoutMillis

  if (process.env.NODE_ENV === "development") {
    console.log("Development hit")

    host = 'bazaardb.cif6vj2k6hsm.us-east-2.rds.amazonaws.com'
    user = "bazaar_user"
    password = "Melchior1_"
    database = "bazaardb"
    idleTimeoutMillis = 30000
    connectionTimeoutMillis = 2000

  } else if(process.env.NODE_ENV === "staging") {

     host = process.env.PG_HOST || 'localhost'
     user =  process.env.PG_USER || 'postgres'
     password = process.env.PG_PASSWORD || ''
     database = process.env.PG_DB || 'postgres'
     idleTimeoutMillis = 30000
     connectionTimeoutMillis = 2000
  }
  else if(process.env.NODE_ENV === "production") {
     host = process.env.PG_HOST || 'localhost'
     user =  process.env.PG_USER || 'postgres'
     password = process.env.PG_PASSWORD || ''
     database = process.env.PG_DB || 'postgres'
     idleTimeoutMillis = 30000
     connectionTimeoutMillis = 2000
  }



const postgres = new Pool({
  host: host,
  user: user,
  password: password,
  database: database,
  idleTimeoutMillis: idleTimeoutMillis,
  connectionTimeoutMillis: connectionTimeoutMillis

  })

module.exports = postgres