import { SchemaComposer } from 'graphql-compose'
import { IngredientQuery, IngredientMutation } from './Ingredient'
import { UserQuery, UserMutation } from './User'

const schemaComposer = new SchemaComposer()

schemaComposer.Query.addFields({
  ...IngredientQuery,
  ...UserQuery
})

schemaComposer.Mutation.addFields({
  ...IngredientMutation,
  ...UserMutation
})

export default schemaComposer.buildSchema()
