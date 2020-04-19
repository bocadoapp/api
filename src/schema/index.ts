import { SchemaComposer } from 'graphql-compose'
// import { GraphQLUpload } from 'apollo-server-express'
import { GraphQLUpload } from 'graphql-upload';

import { IngredientQuery, IngredientMutation } from './Ingredient'
import { UserQuery, UserMutation } from './User'
import { FileQuery, FileMutation } from './File'

const schemaComposer = new SchemaComposer()

schemaComposer.Query.addFields({
  ...IngredientQuery,
  ...UserQuery,
  ...FileQuery
})

schemaComposer.Mutation.addFields({
  ...IngredientMutation,
  ...UserMutation,
  ...FileMutation
})

// schemaComposer.set('Upload', GraphQLUpload);

schemaComposer.addTypeDefs(`
  scalar Upload
`);

export default schemaComposer.buildSchema()

export interface IResolver {
  source: any,
  args: any,
  context: any,
  info: any
}