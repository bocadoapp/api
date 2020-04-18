import { Ingredient, IngredientTC } from '../models/Ingredient'

export const IngredientQuery = {
  ingredientAll: IngredientTC.getResolver('findMany')
}

export const IngredientMutation = {
  ingredientCreate: IngredientTC.getResolver('createOne')
}