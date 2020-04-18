import { ApolloServer } from 'apollo-server-express'
import schema from './schema'

export default () =>
  new ApolloServer({
    schema,
    playground: { endpoint: '/graphql' },
    introspection: true,
    tracing: true
  })