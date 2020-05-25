import { IngredientTC } from '../models/Ingredient'
import { FileTC } from '../models/File'

IngredientTC.addRelation('media', {
  resolver: () => FileTC.getResolver('findByIds'),
  prepareArgs: { _ids: source => source.media },
  projection: { media: 1 }
})

export const IngredientQuery = {
  ingredients: IngredientTC.getResolver('findMany'),
  ingredient: IngredientTC.getResolver('findOne')
}

export const IngredientMutation = {
  createIngredient: IngredientTC.getResolver('createOne')
}
