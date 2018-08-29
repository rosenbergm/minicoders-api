import { ObjectType, Field } from 'type-graphql'
import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Task from './task.model'

@Table({
  timestamps: true,
  paranoid: true
})
@ObjectType()
export default class UserTask extends Model<UserTask> {
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
}
