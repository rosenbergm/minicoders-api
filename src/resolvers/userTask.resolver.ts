import { Resolver, Query, Mutation, FieldResolver, Root, Arg, Ctx } from 'type-graphql'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import UserTask from '../models/userTask.model'
import Task from '../models/task.model'
import { UserTaskInput, UserTaskResponse } from '../types/task'

@Resolver(UserTask)
export default class UserTaskResolver {
  @Inject private database: Database

  @Query(returns => [UserTaskResponse])
  async userTasks (@Ctx() ctx) {
    const tasks = await this.database.models.Task.findAll({
      attributes: [ 'id', 'title', 'problem', 'test', 'solution' ],
      include: [ {
        model: this.database.models.UserTask,
        where: { userId: ctx.user.id },
        required: false
      } ]
    })

    return tasks.map(task => {
      return {
        title: task.title,
        problem: task.problem,
        solution: task.solution,
        test: task.test,
        taskId: task.id,
        progress: task.userTasks.length > 0 ? task.userTasks[0].progress : undefined,
        userTaskId: task.userTasks.length > 0 ? task.userTasks[0].id : undefined
      }
    })
  }

  @FieldResolver()
  async task (@Root() userTask: UserTask): Promise<Task> {
    return await this.database.models.Task.findById(userTask.taskId)
  }

  @Mutation(returns => UserTask)
  async updateProgress (
    @Arg('data') userTaskInput: UserTaskInput,
    @Ctx() ctx
): Promise<UserTask> {
    const userTask = await this.database.models.UserTask.findById(userTaskInput.userTaskId)

    if (userTask) {
      userTask.update({ progress: userTaskInput.progress })
    } else {
      await this.database.models.UserTask.create({
        progress: userTaskInput.progress,
        taskId: userTaskInput.taskId,
        userId: ctx.user.id
      })
    }

    return userTask
  }
}
