import { ApolloServer } from 'apollo-server-express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import * as configG from 'config'
import * as jwt from 'express-jwt'
import ProjectResolver from './resolvers/project.resolver'
import PageResolver from './resolvers/page.resolver'
import UserResolver from './resolvers/user.resolver'
import * as express from 'express'
import { Container } from 'typescript-ioc'
import Database from './services/database'
import TaskResolver from './resolvers/task.resolver'
import UserTaskResolver from './resolvers/userTask.resolver'

interface IConfig {
  port: number,
  jwt_secret: string
}
const config: IConfig = (<any>configG)

const customAuthChecker: any =
  ({ root, args, context, info }, roles) => {
    return !!context.user || process.env.NODE_ENV === 'test'
  }

let server, apolloServer
buildSchema({
  resolvers: [ProjectResolver, PageResolver, UserResolver, TaskResolver, UserTaskResolver],
  authChecker: customAuthChecker
}).then((schema) => {
  apolloServer = new ApolloServer({
    schema,
    engine: {
      apiKey: 'service:websense:B2NAq_2Wmoidx9FQX65sDQ'
    },
    context: async ({ args, req, res }) => {
      const db = Container.get(Database)
      const domain = req.hostname
console.log(domain)
      const project = await db.models.Project.findOne({ where: { domain } })

      return {
        user: req.user,
        project
      }
    }
   })

  const app = express()
  app.use('/', jwt({ secret: config.jwt_secret, credentialsRequired: false }))

  apolloServer.applyMiddleware({ app, path: '/' })

  server = app.listen({ port: config.port }, () => {
    console.log(`🚀  Server ready at localhost:${config.port}`)
  })
}).catch(err => {
  console.log(err)
})

export {
  server,
  apolloServer
}