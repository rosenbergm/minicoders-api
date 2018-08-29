import { Resolver, Args, Query } from 'type-graphql'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import Task from '../models/task.model'

@Resolver(Task)
export default class TaskResolver {
  @Inject private database: Database

  @Query(returns => [Task])
  tasks () {
    return this.database.models.Task.findAll({})
  }
}
