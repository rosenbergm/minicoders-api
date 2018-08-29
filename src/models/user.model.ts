import { ObjectType, Field } from 'type-graphql'
import { Table, Column, Model } from 'sequelize-typescript'

@Table({
  timestamps: true,
  paranoid: true
})
@ObjectType()
export default class User extends Model<User> {
  @Field()
  @Column
  name: string

  @Field()
  @Column({ unique: true })
  email: string

  @Field()
  @Column
  password: string

  @Column
  salt: string
}
