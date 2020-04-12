import { Schema, model, Document } from 'mongoose'

export interface ITranslatedString {
  ca: string,
  es: string,
  en: string
}

export const SchemaTranslatedString: Schema = new Schema({
  ca: String,
  es: String,
  en: String
})

export default model<ITranslatedString & Document>('TranslatedString', SchemaTranslatedString)
