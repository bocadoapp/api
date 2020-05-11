import { Schema, Document, model } from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'
import { ITranslatedString, SchemaTranslatedString } from '../TranslatedString'
import {IIngredient} from '../Ingredient';

interface IIngredientAmount {
  ingredient: IIngredient,
  amount: number,
  unit: ITranslatedString
}

export interface IRecipe {
  name: ITranslatedString,
  people: number,
  time: number,
  //type: ITranslatedString,
  ingredients: IIngredientAmount[]
}

export type TRecipe = IRecipe & Document

export const RecipeSchema: Schema = new Schema({
  name: {
    required: true,
    type: SchemaTranslatedString
  },
  people: {
    value: Number,
    type: SchemaTranslatedString
  },
  time: {
    value: Number,
    unit: String
  },
  ingredients: [{
    value: Number,
    unit: String
  }]
})

export const Recipe = model<TRecipe>('Recipe', RecipeSchema)

export const RecipeTC = composeWithMongoose(Recipe, {})

const findMany = RecipeTC
  .getResolver('findMany')
  .addFilterArg({
    name: 'nameByRegex',
    type: '[String]',
    description: 'Search by regex LIKE',
    query: (query, [locale, value]) => {
      query['name.ca'] = new RegExp(value, "i")
    }
  })
findMany.name = 'findMany'
RecipeTC.addResolver(findMany)