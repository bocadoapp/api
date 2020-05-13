import { User } from '../../models/User'
import { generate } from 'generate-password'
import { mailchimpSubscribe } from '../services'
import * as Sentry from '@sentry/node'

import { getName } from '../../lib/helpers'

const { SENTRY_DSN, NODE_ENV: ENV } = process.env

Sentry.init({ dsn: SENTRY_DSN, debug: ENV === 'development' })

export default (provider: string) =>
  async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      const dbUser = await User.findOne({ [`${provider}Id`]: profile.id })

      if (dbUser) {
        return done(null, dbUser.toObject())
      }

      const user = new User({
        name: getName(profile),
        username: profile.id,
        password: generate({ length: 10, numbers: true }),
        [`${provider}Id`]: profile.id,
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
