import express, { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import facebook from './facebook'
import google from './google'

const router = express.Router()
const redirect = (req: any, res: any) => {
  const { from } = JSON.parse(req.query.state)
  res.redirect(`${from}?token=${req.user.accessToken}`)
}

const handler = (provider: any, scope: any) =>
  (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate(provider, { scope, state: JSON.stringify(req.query) })(req, res, next)

passport.use(facebook)
passport.use(google)
passport.serializeUser((user, cb) => cb(null, user))
passport.deserializeUser((obj, cb) => cb(null, obj))

router.use(passport.initialize())
router.use(passport.session())

router.get('/facebook', handler('facebook', 'email'))
router.get('/facebook/callback', passport.authenticate('facebook'), redirect)

router.get('/google', handler('google', ['profile', 'email']))
router.get('/google/callback', passport.authenticate('google'), redirect)

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }

  const { from } = JSON.parse(req.query.state)
  res.redirect(`${from}?errCode=${err.code}&errMessage=${err.errmsg}`)
})

export default router
