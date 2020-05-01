import { SchemaComposer } from 'graphql-compose'
import { GraphQLUpload } from 'graphql-upload'

import { IngredientQuery, IngredientMutation } from './Ingredient'
import { UserQuery, UserMutation } from './User'
import { FileQuery } from './File'
import { FileResolver } from '../models/File'

const schemaComposer = new SchemaComposer()
const upload = schemaComposer.createResolver(FileResolver)

schemaComposer.addTypeDefs(`
  scalar Upload
`)

schemaComposer.add(GraphQLUpload)

schemaComposer.Query.addFields({
  ...IngredientQuery,
  ...UserQuery,
  ...FileQuery
})

schemaComposer.Mutation.addFields({
  ...IngredientMutation,
  ...UserMutation,
  upload
})

export default schemaComposer.buildSchema()

export interface IResolver {
  source: any,
  args: any,
  context: any,
  info: any
}
