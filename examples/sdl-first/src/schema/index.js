import { makeExecutableSchema } from 'graphql-tools'
import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'

export const schema = makeExecutableSchema({ resolvers, typeDefs })
