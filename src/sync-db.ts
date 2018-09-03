import Database from './services/database'
import { Container } from 'typescript-ioc'

const db = Container.get(Database)

db.sync({ force: true }).then(() => {
  process.exit(0)
})
