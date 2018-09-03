import { InputType, Field, ObjectType } from 'type-graphql'

@InputType()
export class UserTaskInput {
  @Field()
  taskId: number

  @Field()
  progress: string

  @Field({ nullable: true })
  userTaskId: number
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
}
