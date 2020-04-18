import { Schema, model, Document } from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

export interface IUser {
  name: string,
  mail: string,
  password: string
}

export type TUser = IUser & Document

export const UserSchema: Schema = new Schema({
  name: {
    required: true,
    type: String
  },
  mail: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
})

export const User = model<TUser>('User', UserSchema)
export const UserTC = composeWithMongoose(User, {})