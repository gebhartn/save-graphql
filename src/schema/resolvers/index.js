const Query = require('./Query')
const Mutation = require('./Mutation')
const User = require('./User')

const resolvers = {
  Query,
  Mutation,
  User,
}

module.exports = { resolvers }
