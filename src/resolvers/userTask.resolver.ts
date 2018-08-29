import { Resolver, Args, Query, FieldResolver, Root } from 'type-graphql'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import UserTask from '../models/userTask.model'
import Task from '../models/task.model'

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
}
