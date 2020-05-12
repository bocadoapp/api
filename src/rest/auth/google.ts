import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

import middleware from './middleware'

const { GOOGLE_ID, GOOGLE_SECRET } = process.env
const options = {
  clientID: GOOGLE_ID,
  clientSecret: GOOGLE_SECRET,
  callbackURL: `${process.env.PUBLIC_URL}/auth/google/callback`
}

export default new GoogleStrategy(options, middleware('google'))
