import express from 'express'
import passport from 'passport'
import jwt from 'jwt-simple'
import { Strategy as InstagramStrategy } from 'passport-instagram'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { User } from '../models/User'
import {mailchimpSubscribe} from './services';

const { IG_ID, IG_SECRET, FB_ID, FB_SECRET } = process.env
const router = express.Router()
const FORM = 'http://localhost:3000/#/ca/1'

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

    //add new user to mailchimp
    let userData = {
      email: user.mail,
      name: `${profile.name.givenName}`,
      surname: `${profile.name.middleName} ${profile.name.familyName}`
    }
    try{
      mailchimpSubscribe(userData)
    } catch(err){
      //send event to sentry
    }

    return done(null, user.toObject())
  } catch (err) {
    return done(err, null)
  }
}
))

passport.use(new InstagramStrategy({
  clientID: IG_ID,
  clientSecret: IG_SECRET,
  callbackURL: `${process.env.PUBLIC_URL}/auth/instagram/callback`
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const dbUser = await User.findOne({ instagramId: profile.id })

    if (dbUser) {
      return done(null, dbUser.toObject())
    }

    const user = new User({
      name: profile.displayName,
      username: profile.username,
      password: 'test',
      instagramId: profile.id,
      accessToken
    })

    await user.save()

    return done(null, user.toObject())
  } catch (err) {
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

router.get('/instagram', passport.authenticate('instagram'))
router.get(
  '/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/login' }),
  (req, res) => {
    return res.send(jwt.encode(req.user, 'bocado'))
  }
)

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
