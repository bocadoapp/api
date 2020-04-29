import { User, UserTC } from '../models/User'
import { IResolver } from './index'

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

export const UserQuery = {
  user: UserTC.getResolver('findOne')
}

export const UserMutation = {
  login: UserTC.getResolver('login'),
  signup: UserTC.getResolver('createOne')
}