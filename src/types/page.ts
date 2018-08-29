import { InputType, Field } from 'type-graphql'
import Page from '../models/page.model'

@InputType({ description: 'User credentials' })
export class PageInput implements Partial<Page> {
  @Field({ nullable: false })
  title: string
}
