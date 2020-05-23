import { Schema, Document, model, Types } from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'
import { TranslatedStringSchema, ITranslatedString } from '../TranslatedString'
import { IFile } from '../File'

interface IIngredientAttribute {
  value: number,
  unit: string
}

export interface IIngredient {
  name: ITranslatedString,
  type: ITranslatedString,
  kcal?: IIngredientAttribute,
  fatSaturated?: IIngredientAttribute,
  colesterol?: IIngredientAttribute,
  media: IFile[]
}

export type TIngredient = IIngredient & Document

export const IngredientSchema: Schema = new Schema({
  name: {
    required: true,
    type: TranslatedStringSchema
  },
  type: {
    required: true,
    type: TranslatedStringSchema
  },
  kcal: {
    value: Number,
    unit: String
  },
  fatSaturated: {
    value: Number,
    unit: String
  },
  colesterol: {
    value: Number,
    unit: String
  },
  media: [{
    type: Types.ObjectId,
    ref: 'File'
  }]
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
      query[`name.${locale}`] = new RegExp(value, 'i')
    }
  })
findMany.name = 'findMany'
IngredientTC.addResolver(findMany)
