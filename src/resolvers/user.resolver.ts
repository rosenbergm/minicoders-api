import { Resolver, Mutation, Arg, Query, Authorized, Ctx } from 'type-graphql'
import { ApolloError, AuthenticationError } from 'apollo-server-express'
import User from '../models/user.model'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import * as config from 'config'
import * as jwt from 'jsonwebtoken'
import * as bCrypt from 'bcrypt-nodejs'
import { LoginInput, UserRegisterInput, LoginResponse, UserInput } from '../types/user'

@Resolver(User)
export default class UserResolver {
  @Inject private database: Database

  @Query(returns => [User])
  @Authorized()
  async users (): Promise<User[]> {
    return await this.database.models.User.findAll()
  }

  @Query(returns => User)
  @Authorized()
  async user (@Ctx() ctx): Promise<User> {
    return await this.database.models.User.findById(ctx.user.id)
  }

  @Mutation(returns => User)
  async userUpdate (@Arg('data') user: UserInput, @Ctx() ctx): Promise<UserInput> {
    const dbUser = await this.database.models.User.findById(ctx.user.id)

    const updatedUser = {
      name: user.name,
      password: '',
    }
    updatedUser.password = bCrypt.hashSync(user.password, ctx.user.salt.genSaltSync(), undefined)
    if (user) {
      return await dbUser.update(updatedUser)
    }
  }

  @Mutation(returns => LoginResponse)
  async login (@Arg('data') credentials: LoginInput): Promise<LoginResponse> {
    const user = await this.database.models.User.findOne({ where: { email: credentials.email } })

    if (!user) {
      throw new AuthenticationError('User not found.')
    }

    const passwordHash = bCrypt.hashSync(credentials.password, user.salt, undefined)
    if (passwordHash !== user.password) {
      throw new AuthenticationError('Invalid user password.')
    }

    return { token: this.getUserToken(user), user }
  }

  @Mutation(returns => LoginResponse)
  async register (@Arg('data') userRegisterInput: UserRegisterInput): Promise<LoginResponse> {
    await this.checkUserExists(userRegisterInput.email)

    const user = {
      email: userRegisterInput.email,
      name: userRegisterInput.name,
      password: '',
      salt: bCrypt.genSaltSync()
    }
    user.password = bCrypt.hashSync(userRegisterInput.password, user.salt, undefined)

    const newUser = await this.database.models.User.create(user)

    return { token: this.getUserToken(newUser), user: newUser }
  }

  private async checkUserExists (email: string) {
    const user = await this.database.models.User.findOne({ where: { email } })
    if (user) {
      throw new ApolloError('User with this email address already exists.', 'USER_ALREADY_EXISTS')
    }
  }

  private getUserToken (user: User) {
    const payload = { id: user.id }
    return jwt.sign(payload, config.jwt_secret)
  }
}
