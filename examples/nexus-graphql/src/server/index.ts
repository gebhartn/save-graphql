import { ApolloServer } from 'apollo-server'
import { schema } from '../schema'
import { context } from '../context'

export const app = new ApolloServer({
  schema,
  context,
})
