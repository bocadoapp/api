import { User, UserTC } from '../models/User'
import { IResolver } from './index'
import { generateRandomPassword, capitalize } from '../lib/helpers'
import { mailchimpSubscribe } from '../rest/services'
import { RecipeTC } from '../models/Recipe'

UserTC.addRelation('recipes', {
  resolver: () => RecipeTC.getResolver('findByIds'),
  prepareArgs: { _ids: source => source.recipesIds },
  projection: { recipesIds: 1 }
})

UserTC.addResolver({
  kind: 'mutation',
  name: 'login',
  type: UserTC,
  args: { mail: 'String!', password: 'String!' },
  resolve: async ({ args, context }: IResolver) => {
    const user = await User.findOne({ mail: args.mail, password: args.password })
    if (!user) {
      throw new Error('User not found')
    }
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

  mailchimpSubscribe({
    email: rp.args.record.mail,
    name: rp.args.record.name
  })

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
