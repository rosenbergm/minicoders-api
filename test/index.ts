import { server, apolloServer } from '../src/index'
import { Sequelize } from 'sequelize-typescript'
import * as config from 'config'
import { exec } from 'child-process-promise'

before(async () => {
  const sequelize = new Sequelize(config.db)
  sequelize.addModels([__dirname + '/../src/models/*.model.ts'])

  await sequelize.sync({ force: true })
})

beforeEach(async () => {
  await exec('NODE_ENV=test ./node_modules/.bin/sequelize db:seed:all', [])
})

afterEach(async () => {
  await exec('NODE_ENV=test ./node_modules/.bin/sequelize db:seed:undo:all', [])
})

after(async () => {
  await server.close()
  await apolloServer.stop()
})
