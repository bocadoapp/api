import { User, UserTC } from '../models/User'

interface ILogin {
  source: any,
  args: any,
  context: any,
  info: any
}

export const UserQuery = {
  userById: UserTC.getResolver('findOne')
}

UserTC.addResolver({
  kind: 'mutation',
  name: 'login',
  type: UserTC,
  args: { mail: 'String!', password: 'String!' },
  resolve: async ({ args, context }: ILogin) => {
    const user = await User.findOne({ mail: args.mail, password: args.password })
    // Generar token aqui
    if (!user) return null
    return user
  }
})

export const UserMutation = {
  login: UserTC.getResolver('login')
}