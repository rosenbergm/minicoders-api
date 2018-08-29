import { ObjectType, Field } from 'type-graphql'
import { Table, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript'
import Project from './project.model'

@Table({
  timestamps: true,
  paranoid: true,
  indexes: [
    {
      unique: true,
      fields: ['slug', 'projectId']
    }
  ]
})
@ObjectType()
export default class Page extends Model<Page> {
  @Field()
  @Column
  title: string

  @Field()
  @Column
  slug: string

  @ForeignKey(() => Project)
  @Column
  projectId: number

  @Field(type => Project)
  @BelongsTo(() => Project)
  project: Project
}
