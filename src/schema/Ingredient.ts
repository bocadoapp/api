import { Ingredient, IngredientTC } from '../models/Ingredient'

export const IngredientQuery = {
  ingredients: IngredientTC.getResolver('findMany'),
  ingredient: IngredientTC.getResolver('findOne')
}

export const IngredientMutation = {
  createIngredient: IngredientTC.getResolver('createOne')
}