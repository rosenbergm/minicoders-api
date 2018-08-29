import { Resolver, Args, Query } from 'type-graphql'
import Project from '../models/project.model'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'

@Resolver(Project)
export default class ProjectResolver {
  @Inject private database: Database

  @Query(returns => [Project])
  projects (/*@Args() { skip, take }: RecipesArgs*/) {
    return this.database.models.Project.findAll({})
  }
}
