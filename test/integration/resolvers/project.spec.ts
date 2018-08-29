import { expect } from 'chai'
import { request } from 'graphql-request'
import * as config from 'config'

describe('Project resolver', () => {
  it('Should return all projects', async () => {
    const query = `query {
      projects {
        title
        domain
      }
    }`

    const response = await request(`http://localhost:${config.port}/`, query)
    expect((<any>response).projects.length).to.equal(1)
    expect((<any>response).projects[0].title).to.equal('Test')
    expect((<any>response).projects[0].domain).to.equal('localhost')
  })
})
