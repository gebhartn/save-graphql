import { nexusPrismaPlugin } from 'nexus-prisma'
import { makeSchema } from '@nexus/schema'

import { User } from './User'
import { Post } from './Post'
import { Query } from './Query'
import { Mutation } from './Mutation'

export const schema = makeSchema({
  types: [User, Post, Query, Mutation],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/../../schema.graphql',
    typegen: __dirname + '/../generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('../context'),
        alias: 'Context',
      },
    ],
  },
})
