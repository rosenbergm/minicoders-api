import { Resolver, Query, FieldResolver, Root, Authorized, Arg, Mutation, Ctx } from 'type-graphql'
import { ApolloError } from 'apollo-server-express'
import Page from '../models/page.model'
import Project from '../models/project.model'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import { PageInput } from '../types/page'
import * as slug from 'slug'

@Resolver(Page)
export default class PageResolver {
  @Inject private database: Database

  @Query(returns => [Page])
  @Authorized()
  pages (@Ctx() ctx) {
    return this.database.models.Page.findAll({ where: { projectId: ctx.project.id } })
  }

  @FieldResolver()
  async project (@Root() page: Page): Promise<Project> {
    return await this.database.models.Project.findById(page.projectId)
  }

  @Mutation(returns => Page)
  async createPage (@Arg('data') pageInput: PageInput, @Ctx() ctx): Promise<Page> {
    const page: any = {
      title: pageInput.title,
      slug: slug(pageInput.title),
      projectId: ctx.project.id
    }

    let newPage
    try {
      newPage = await this.database.models.Page.create(page)
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw new ApolloError('Page already exists.', 'PAGE_EXISTS')
      }

      throw new ApolloError('Generic error.', 'GENERIC_ERROR')
    }

    return newPage
  }
}
