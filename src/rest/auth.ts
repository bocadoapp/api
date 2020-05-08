import express from 'express'
import passport from 'passport'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import * as Sentry from '@sentry/node'

import { User } from '../models/User'
import { mailchimpSubscribe } from './services'

const { FB_ID, FB_SECRET, SENTRY_DSN, NODE_ENV: ENV } = process.env
const router = express.Router()
const FORM = 'http://localhost:3000/#/ca/1'

Sentry.init({ dsn: SENTRY_DSN, debug: ENV === 'development' })

passport.use(new FacebookStrategy({
  clientID: FB_ID,
  clientSecret: FB_SECRET,
  callbackURL: `${process.env.PUBLIC_URL}/auth/facebook/callback`,
  profileFields: ['id', 'emails', 'name', 'picture.type(large)']
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const dbUser = await User.findOne({ facebookId: profile.id })

    if (dbUser) {
      return done(null, dbUser.toObject())
    }

    const user = new User({
      name: `${profile.name.givenName} ${profile.name.middleName} ${profile.name.familyName}`,
      username: profile.id,
      password: 'test',
      facebookId: profile.id,
      pic: profile.photos && profile.photos.length ? profile.photos[0].value : null,
      mail: profile.emails[0].value,
      accessToken
    })

    await user.save()

    // add new user to mailchimp
    mailchimpSubscribe({
      email: profile.emails[0].value,
      name: `${profile.name.givenName}`,
      surname: `${profile.name.middleName} ${profile.name.familyName}`
    })
      .catch(Sentry.captureException)

    return done(null, user.toObject())
  } catch (err) {
    Sentry.captureException(err)
    return done(err, null)
  }
}
))

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})

router.use(passport.initialize())
router.use(passport.session())

router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }))
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    const user: any = req.user
    return res.redirect(`${FORM}?token=${user.accessToken}`)
  }
)

export default router
