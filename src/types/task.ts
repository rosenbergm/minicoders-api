import { InputType, Field } from 'type-graphql'

@InputType()
export class UserTaskInput {
  @Field()
  progress: string

  @Field()
  taskId: string
}
