import { InputType, Field, ObjectType } from 'type-graphql'

@InputType()
export class UserTasksFilterInput {
  @Field()
  category: string
}

@InputType()
export class UserTaskInput {
  @Field()
  taskId: number

  @Field()
  progress: string

  @Field({ nullable: true })
  userTaskId: number

  @Field({ nullable: true })
  finished: boolean
}

@ObjectType()
export class UserTaskResponse {
  @Field()
  taskId: number

  @Field({ nullable: true })
  userTaskId: number

  @Field({ nullable: true })
  progress: string

  @Field()
  title: string

  @Field()
  problem: string

  @Field()
  solution: string

  @Field()
  test: string

  @Field({ nullable: true })
  asyncTest: boolean

  @Field()
  category: string

  @Field({ nullable: true })
  default: string

  @Field({ nullable: true })
  canvas: boolean

  @Field({ nullable: true })
  finished: boolean
}
