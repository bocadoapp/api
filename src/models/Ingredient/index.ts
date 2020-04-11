import { Schema, Document, model } from 'mongoose'
import { ITranslatedString, SchemaTranslatedString } from '../TranslatedString'

export interface IIngredient extends Document {
  name: ITranslatedString
}

export const SchemaIngredient: Schema = new Schema({
  name: SchemaTranslatedString
})

export default model<IIngredient>('Ingredient', SchemaIngredient)
