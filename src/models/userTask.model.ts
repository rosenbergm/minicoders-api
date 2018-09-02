import { ObjectType, Field } from 'type-graphql'
import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Task from './task.model'
import User from './user.model'

@Table({
  timestamps: true,
  paranoid: true
})
@ObjectType()
export default class UserTask extends Model<UserTask> {
  @Field()
  id: number

  @Field()
  @Column
  progress: string

  @Field()
  @ForeignKey(() => Task)
  @Column
  taskId: number

  @Field(type => Task)
  @BelongsTo(() => Task)
  task: Task

  @Field()
  @ForeignKey(() => User)
  @Column
  userId: number

  @Field(type => User)
  @BelongsTo(() => User)
  user: User
}
