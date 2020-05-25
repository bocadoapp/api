import { Schema, model, Document, Types } from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

export interface IUser {
  name: string,
  username: string,
  mail: string,
  password: string,
  googleId?: string,
  facebookId?: string,
  accessToken: string,
  pic?: string,
  points?: number,
  recipesIds: string[]
}

export type TUser = IUser & Document

export const UserSchema: Schema = new Schema({
  name: {
    required: true,
    type: String
  },
  username: {
    type: String,
    unique: true
  },
  mail: {
    required: true,
    unique: true,
    type: String
  },
  password: {
    type: String
  },
  googleId: String,
  facebookId: String,
  accessToken: String,
  pic: String,
  points: {
    required: false,
    type: Number,
    default: 0
  },
  recipesIds: [{
    type: Types.ObjectId,
    ref: 'Recipe'
  }]
})

export const User = model<TUser>('User', UserSchema)
export const UserTC = composeWithMongoose(User, {})
