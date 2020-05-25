import { SchemaComposer } from 'graphql-compose'
import { GraphQLUpload } from 'graphql-upload'

import { IngredientQuery, IngredientMutation } from './Ingredient'
import { UserQuery, UserMutation } from './User'
import { RecipeQuery, RecipeMutation } from './Recipe'
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
  ...RecipeQuery,
  ...FileQuery
})

schemaComposer.Mutation.addFields({
  ...IngredientMutation,
  ...UserMutation,
  ...RecipeMutation,
  upload
})

export default schemaComposer.buildSchema()

export interface IResolver {
  source: any,
  args: any,
  context: any,
  info: any
}
