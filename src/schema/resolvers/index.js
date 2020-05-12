const Query = require('./Query')
const Mutation = require('./Mutation')
const User = require('./User')
const Todo = require('./Todo')

const resolvers = {
  Query,
  Mutation,
  User,
  Todo,
}

module.exports = { resolvers }
