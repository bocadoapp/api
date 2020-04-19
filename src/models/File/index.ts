import { Document, Schema, model } from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

export interface IFile {
  type: string,
  size?: number,
  name: string,
  url?: string,
  path?: string,
}

export type TFile = IFile & Document

const FileSchema: Schema = new Schema({
  type: {
    required: true,
    type: String
  },
  size: Number,
  name: {
    required: true,
    type: String
  },
  url: String,
  path: String
})

export const File = model<TFile>('File', FileSchema)
export const FileTC = composeWithMongoose(File, {})