import { Resolver, Query, Mutation, FieldResolver, Root, Arg } from 'type-graphql'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import UserTask from '../models/userTask.model'
import Task from '../models/task.model'
import { UserTaskInput } from '../types/task'

@Resolver(UserTask)
export default class UserTaskResolver {
  @Inject private database: Database

  @Query(returns => [UserTask])
  userTasks () {
    return this.database.models.UserTask.findAll({})
  }

  @FieldResolver()
  async task (@Root() userTask: UserTask): Promise<Task> {
    return await this.database.models.Task.findById(userTask.taskId)
  }

  @Mutation(returns => UserTask)
  async updateProgress (@Arg('data') userTaskInput: UserTaskInput): Promise<UserTask> {
    const userTask = await this.database.models.UserTask.findById(userTaskInput.taskId)

    userTask.update({ progress: userTaskInput.progress })

    return userTask
  }
}
