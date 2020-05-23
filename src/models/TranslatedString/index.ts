import { Schema } from 'mongoose'

export interface ITranslatedString {
  ca: string,
  es: string,
  en: string
}

export const TranslatedStringSchema: Schema = new Schema({
  es: String,
  ca: String,
  en: String
})
