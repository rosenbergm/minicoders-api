import { InputType, Field, ObjectType } from 'type-graphql'
import User from '../models/user.model'

@InputType({ description: 'User update' })
export class UserInput implements Partial<{ name: string, password: string }> {
  @Field({ nullable: false })
  name: string
  @Field({ nullable: false })
  password: string
}

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
}

@ObjectType()
export class LoginResponse {
  @Field()
  token: string
  @Field()
  user: User
}

@ObjectType()
export class UserResponse {
  @Field()
  name: string
  @Field()
  password: User
}