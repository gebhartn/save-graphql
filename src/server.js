const { ApolloServer } = require('apollo-server')
const { schema } = require('./schema')
const { context } = require('./context')

const port = process.env.PORT || 4000

new ApolloServer({
  schema,
  context,
}).listen({ port }, () => console.log(`\nListening on ${port}\n`))
