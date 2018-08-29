import { ObjectType, Field } from 'type-graphql'
import { Table, Column, Model } from 'sequelize-typescript'

@Table({
  timestamps: true,
  paranoid: true
})
@ObjectType()
export default class Task extends Model<Task> {
  @Field()
  id: number

  @Field()
  @Column
  problem: string

  @Field()
  @Column
  solution: string
}
