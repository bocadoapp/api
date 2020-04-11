import mongoose, { Schema, model, Document } from 'mongoose'

export interface ITranslatedString extends Document {
  ca: string,
  es: string,
  en: string
}

export const SchemaTranslatedString: Schema = new Schema({
  ca: String,
  es: String,
  en: String
})

export default model<ITranslatedString>('TranslatedString', SchemaTranslatedString)
