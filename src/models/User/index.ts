import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  name: string,
  email: string
}

const UserSchema: Schema = new Schema({
  name: String,
  email: String
}, { timestamps: true })

export default model('User', UserSchema)