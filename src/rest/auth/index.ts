import express from 'express'
import passport from 'passport'
import facebook from './facebook'
import google from './google'

const router = express.Router()
const FORM = 'http://localhost:3000/#/ca/1'
const redirect = (req: any, res: any) => res.redirect(`${FORM}?token=${req.user.accessToken}`)

passport.use(facebook)
passport.use(google)
passport.serializeUser((user, cb) => cb(null, user))
passport.deserializeUser((obj, cb) => cb(null, obj))

router.use(passport.initialize())
router.use(passport.session())

router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }))
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), redirect)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), redirect)

export default router
