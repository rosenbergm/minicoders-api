import { ObjectType, Field } from 'type-graphql'
import { Table, Column, Model, HasMany, Default } from 'sequelize-typescript'
import UserTask from './userTask.model'
import * as Sequelize from 'sequelize'

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
  title: string

  @Field()
  @Column
  problem: string

  @Field()
  @Column
  solution: string

  @Field()
  @Column
  test: string

  @HasMany(() => UserTask)
  userTasks: UserTask

  @Field()
  @Column
  category: string

  @Field()
  @Default(false)
  @Column
  canvas: boolean

  @Field()
  @Default('')
  @Column(Sequelize.TEXT)
  default: string
}
