import { Resolver, Mutation, Arg, Query, Authorized, Ctx } from 'type-graphql'
import { ApolloError, AuthenticationError } from 'apollo-server-express'
import User from '../models/user.model'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import * as config from 'config'
import * as jwt from 'jsonwebtoken'
import * as bCrypt from 'bcrypt-nodejs'
import { LoginInput, UserRegisterInput } from '../types/user'

@Resolver(User)
export default class UserResolver {
  @Inject private database: Database

  @Query(returns => [User])
  @Authorized()
  async users (): Promise<User[]> {
    return await this.database.models.User.findAll()
  }

  @Mutation(returns => String)
  async login (@Arg('data') credentials: LoginInput): Promise<string> {
    const user = await this.database.models.User.findOne({ where: { email: credentials.email } })

    if (!user) {
      throw new AuthenticationError('User not found.')
    }

    const passwordHash = bCrypt.hashSync(credentials.password, user.salt, undefined)
    if (passwordHash !== user.password) {
      throw new AuthenticationError('Invalid user password.')
    }

    return this.getUserToken(user)
  }

  @Mutation(returns => String)
  async register (@Arg('data') userRegisterInput: UserRegisterInput): Promise<string> {
    await this.checkUserExists(userRegisterInput.email)
    await this.checkProjectExists(userRegisterInput.domain)

    const user = {
      email: userRegisterInput.email,
      name: userRegisterInput.name,
      password: '',
      salt: bCrypt.genSaltSync()
    }
    user.password = bCrypt.hashSync(userRegisterInput.password, user.salt, undefined)

    const newUser = await this.database.models.User.create(user)

    const project = {
      title: userRegisterInput.title,
      domain: userRegisterInput.domain
    }
    await this.database.models.Project.create(project)

    return this.getUserToken(newUser)
  }

  private async checkUserExists (email: string) {
    const user = await this.database.models.User.findOne({ where: { email } })
    if (user) {
      throw new ApolloError('User with this email address already exists.', 'USER_ALREADY_EXISTS')
    }
  }

  private async checkProjectExists (domain: string) {
    const project = await this.database.models.Project.findOne({ where: { domain } })
    if (project) {
      throw new ApolloError('This domain is already registered.', 'DOMAIN_ALREADY_EXISTS')
    }
  }

  private getUserToken (user: User) {
    const payload = { id: user.id }
    return jwt.sign(payload, config.jwt_secret)
  }
}
