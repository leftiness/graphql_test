const express = require('express')
const fs = require('fs')
const graphql = require('graphql')
const graphqlHTTP = require('express-graphql')
const Knex = require('knex')

const user = require('./resolver/user.js')

const schema = fs.readFileSync(
  process.env.GRAPHQL_SCHEMA_FILE || './schema.graphql',
  'utf-8'
)

const knex = Knex({
  client: 'pg',
  connection: {
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432,
    user: process.env.PGUSER || 'postgres',
    database: process.env.PGDATABASE || 'postgres'
  }
})

const handler = graphqlHTTP({
  schema: graphql.buildSchema(schema),
  rootValue: { ...user(knex) },
  graphiql: true
})

express().use(handler).listen(8080)
