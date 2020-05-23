import { Types, Schema, Document, model } from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'
import { ITranslatedString, TranslatedStringSchema } from '../TranslatedString'
import { IIngredient } from '../Ingredient'
import { IFile } from '../File'

interface IStep {
  text: string,
  images: [string],
  order: number
}

interface IAmount {
  ingredient: IIngredient,
  amount: number,
  unit: ITranslatedString
}

export interface IRecipe extends Document {
  userId: string,
  name: ITranslatedString,
  people: number,
  cookingTime: number,
  ingredients: IAmount[],
  steps: IStep[],
  media: IFile[]
}

export const RecipeSchema: Schema = new Schema({
  name: {
    required: true,
    type: TranslatedStringSchema
  },
  userId: {
    required: true,
    type: Types.ObjectId,
    ref: 'User'
  },
  people: {
    type: Number
  },
  cookingTime: {
    required: true,
    type: Number
  },
  ingredients: [{
    ingredient: {
      type: Types.ObjectId,
      ref: 'Ingredient'
    },
    value: Number,
    unit: String
  }],
  steps: [{
    text: String,
    media: [{
      type: Types.ObjectId,
      ref: 'File'
    }],
    order: Number
  }],
  media: [{
    type: Types.ObjectId,
    ref: 'File'
  }]
})

export const Recipe = model<IRecipe>('Recipe', RecipeSchema)
export const RecipeTC = composeWithMongoose(Recipe, {})
