import { expect } from 'chai'
import { request } from 'graphql-request'
import * as config from 'config'

describe('Page resolver', () => {
  it('Should return all pages', async () => {
    const query = `query {
      pages {
        title
        slug
        project {
          title
        }
      }
    }`

    const response = await request(`http://localhost:${config.port}/`, query)
    expect((<any>response).pages.length).to.equal(2)
    expect((<any>response).pages[0].title).to.equal('Contact')
    expect((<any>response).pages[0].slug).to.equal('contact')
    expect((<any>response).pages[0].project.title).to.equal('Test')
    expect((<any>response).pages[1].title).to.equal('About us')
  })

  it('Should create page', async () => {
    const mutation = `mutation {
      createPage (data: { title: "Test page" }) {
        title
        slug
        project {
          title
        }
      }
    }`

    const response = await request(`http://localhost:${config.port}/`, mutation)
    expect((<any>response).createPage.title).to.equal('Test page')
    expect((<any>response).createPage.slug).to.equal('Test-page')
    expect((<any>response).createPage.project.title).to.equal('Test')
  })

  it('Should throw an error when page already exists', async () => {
    const mutation = `mutation {
      createPage (data: { title: "Test page" }) {
        title
        slug
        project {
          title
        }
      }
    }`

    await request(`http://localhost:${config.port}/`, mutation)

    try {
      await request(`http://localhost:${config.port}/`, mutation).catch()
      expect(false).to.be(true)
    } catch (err) {
      expect(err.response.errors[0].extensions.code).to.equals('PAGE_EXISTS')
    }
  })
})
