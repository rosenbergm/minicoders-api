import { ObjectType, Field } from 'type-graphql'
import { Table, Column, Model } from 'sequelize-typescript'

@Table({
  timestamps: true,
  paranoid: true
})
@ObjectType()
export default class Project extends Model<Project> {
  @Field()
  @Column
  title: string

  @Field()
  @Column({ unique: true })
  domain: string
}
