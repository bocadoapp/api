import { makeExecutableSchema } from 'graphql-tools'
import { ApolloServer } from 'apollo-server-express'

import resolvers from './resolvers'
import typeDefs from './schema'

export default () =>
  new ApolloServer({
    typeDefs,
    resolvers,
    playground: { endpoint: '/graphql' }
  })