import { Resolver, Mutation, Arg, InputType, Field } from 'type-graphql'
import User from '../models/user.model'

@InputType({ description: 'User credentials' })
export class LoginInput implements Partial<{ username: string, password: string }> {
  @Field({ nullable: false })
  email: string
  @Field({ nullable: false })
  password: string
}

@InputType({ description: 'User data' })
export class UserRegisterInput implements Partial<User> {
  @Field({ nullable: false })
  email: string
  @Field({ nullable: false })
  name: string
  @Field({ nullable: false })
  password: string
  @Field({ nullable: false })
  title: string
  @Field({ nullable: false })
  domain: string
}
