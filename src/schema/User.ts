import { User, UserTC } from '../models/User'
import { IResolver } from './index'
import { generateRandomPassword, capitalize } from '../lib/helpers'

UserTC.addResolver({
  kind: 'mutation',
  name: 'login',
  type: UserTC,
  args: { mail: 'String!', password: 'String!' },
  resolve: async ({ args, context }: IResolver) => {
    const user = await User.findOne({ mail: args.mail, password: args.password })
    // Generar token aqui
    if (!user) return null
    return user
  }
})

UserTC.wrapResolverResolve('createOne', next => async rp => {
  if (!rp.args.record.username && rp.args.record.name) {
    rp.args.record.username = rp.args.record.name
      .split(' ')
      .map(capitalize)
      .join('')
      .slice(0, 10)
  }

  if (!rp.args.record.password) {
    rp.args.record.password = generateRandomPassword()
  }

  return next(rp)
})

export const UserQuery = {
  user: UserTC.getResolver('findOne')
}

export const UserMutation = {
  login: UserTC.getResolver('login'),
  signup: UserTC.getResolver('createOne')
}
