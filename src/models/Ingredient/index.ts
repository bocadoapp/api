import { Schema, Document, model } from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'
import { ITranslatedString, SchemaTranslatedString } from '../TranslatedString'

interface IIngredientAttribute {
  value: number,
  unit: string
}

export interface IIngredient {
  name: ITranslatedString,
  type: ITranslatedString,
  kcal?: IIngredientAttribute,
  fat_saturated?: IIngredientAttribute,
  colesterol?: IIngredientAttribute
}

export type TIngredient = IIngredient & Document

export const IngredientSchema: Schema = new Schema({
  name: {
    required: true,
    type: SchemaTranslatedString
  },
  type: {
    required: true,
    type: SchemaTranslatedString
  },
  kcal: {
    value: Number,
    unit: String
  },
  fat_saturated: {
    value: Number,
    unit: String
  },
  colesterol: {
    value: Number,
    unit: String    
  }
})

export const Ingredient = model<TIngredient>('Ingredient', IngredientSchema)

export const IngredientTC = composeWithMongoose(Ingredient, {})

const findMany = IngredientTC
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
IngredientTC.addResolver(findMany)