import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { context } from './context'

const port = process.env.PORT || 4000

new ApolloServer({
  schema,
  context,
}).listen({ port }, () => console.log(`\nListening on ${port}\n`))
