import { Resolver, Query, Mutation, FieldResolver, Root, Arg, Ctx } from 'type-graphql'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import UserTask from '../models/userTask.model'
import Task from '../models/task.model'
import { UserTaskInput, UserTaskResponse, UserTasksFilterInput } from '../types/task'

@Resolver(UserTask)
export default class UserTaskResolver {
  @Inject private database: Database

  @Query(returns => [UserTaskResponse])
  async userTasks (@Arg('data') data: UserTasksFilterInput, @Ctx() ctx) {
    // TODO: refactor
    // OPTIMIZE: Should not use map function, but directly return object
    const tasks = await this.database.models.Task.findAll({
      attributes: [ 'id', 'title', 'problem', 'test', 'solution', 'level', 'points', 'canvas' ],
      include: [ {
        model: this.database.models.UserTask,
        where: { userId: ctx.user.id },
        required: false
      } ],
      where: {
        level: data.level
      }
    })

    return tasks.map(task => {
      return {
        title: task.title,
        problem: task.problem,
        solution: task.solution,
        test: task.test,
        taskId: task.id,
        level: task.level,
        points: task.points,
        canvas: task.canvas,
        progress: task.userTasks.length > 0 ? task.userTasks[0].progress : undefined,
        finished: task.userTasks.length > 0 ? task.userTasks[0].finished : undefined,
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
      userTask.update({ progress: userTaskInput.progress, finished: userTaskInput.finished })
    } else {
      await this.database.models.UserTask.create({
        progress: userTaskInput.progress,
        taskId: userTaskInput.taskId,
        userId: ctx.user.id,
        finished: userTaskInput.finished
      })
    }

    return userTask
  }
}
