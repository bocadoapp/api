import { Strategy as FacebookStrategy } from 'passport-facebook'
import middleware from './middleware'

const { FB_ID, FB_SECRET } = process.env
const options = {
  clientID: FB_ID,
  clientSecret: FB_SECRET,
  callbackURL: `${process.env.PUBLIC_URL}/auth/facebook/callback`,
  profileFields: ['id', 'emails', 'name', 'picture.type(large)']
}

export default new FacebookStrategy(options, middleware('facebook'))
