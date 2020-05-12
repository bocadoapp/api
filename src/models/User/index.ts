import { Schema, model, Document } from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

export interface IUser {
  name: string,
  username: string,
  mail: string,
  password: string,
  googleId?: string,
  facebookId?: string,
  accessToken: string,
  pic?: string
}

export type TUser = IUser & Document

export const UserSchema: Schema = new Schema({
  name: {
    required: true,
    type: String
  },
  username: String,
  mail: {
    required: true,
    type: String
  },
  password: {
    type: String
  },
  googleId: String,
  facebookId: String,
  accessToken: String,
  pic: String
})

export const User = model<TUser>('User', UserSchema)
export const UserTC = composeWithMongoose(User, {})
