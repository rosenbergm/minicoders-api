import { Singleton } from 'typescript-ioc'
import { Sequelize } from 'sequelize-typescript'
import * as configG from 'config'

const config = (<any>configG) // TODO create interface for config

@Singleton
export default class Database extends Sequelize {
  constructor () {
    super(config.db)

    this.addModels([__dirname + config.db.modelPath])
  }
}
