import { Schema, Document, model } from 'mongoose'
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

export const SchemaIngredient: Schema = new Schema({
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

export default model<IIngredient & Document>('Ingredient', SchemaIngredient)
