import { expect } from 'chai'
import { request } from 'graphql-request'
import * as config from 'config'

describe('User resolver', () => {
  it('Should return token on login', async () => {
    const mutation = `mutation {
      login (data: { email: "john.doe@gmail.com", password: "test" })
    }`

    const response = await request(`http://localhost:${config.port}/`, mutation)
    expect((<any>response).login.length).to.be.at.least(1)
  })

  it('Should throw error with non existing email', async () => {
    const mutation = `mutation {
      login (data: { email: "no", password: "test" })
    }`

    try {
      const response = await request(`http://localhost:${config.port}/`, mutation)
      expect(false).to.be(true)
    } catch (err) {
      expect(err.response.errors[0].extensions.code).to.equals('UNAUTHENTICATED')
    }
  })

  it('Should throw error with wrong password', async () => {
    const mutation = `mutation {
      login (data: { email: "john.doe@gmail.com", password: "wrong password" })
    }`

    try {
      const response = await request(`http://localhost:${config.port}/`, mutation)
      expect(false).to.be(true)
    } catch (err) {
      expect(err.response.errors[0].extensions.code).to.equals('UNAUTHENTICATED')
    }
  })

  it('Should register new user, create new project and return token', async () => {
    const mutation = `mutation {
      register (data: { email: "another@gmail.com", password: "test", name: "Another Name", title: "Project name", domain: "newdomain.com" })
    }`

    const response = await request(`http://localhost:${config.port}/`, mutation)
    expect((<any>response).register.length).to.be.at.least(1)
  })

  it('Should throw error when user email already exists', async () => {
    const mutation = `mutation {
      register (data: { email: "john.doe@gmail.com", password: "test", name: "Another Name", title: "Project name", domain: "newdomain.com" })
    }`

    try {
      const response = await request(`http://localhost:${config.port}/`, mutation)
      expect(false).to.be(true)
    } catch (err) {
      expect(err.response.errors[0].extensions.code).to.equals('USER_ALREADY_EXISTS')
    }
  })

  it('Should throw error when user email already exists', async () => {
    const mutation = `mutation {
      register (data: { email: "john.doeas@gmail.com", password: "test", name: "Another Name", title: "Project name", domain: "localhost" })
    }`

    try {
      const response = await request(`http://localhost:${config.port}/`, mutation)
      expect(false).to.be(true)
    } catch (err) {
      expect(err.response.errors[0].extensions.code).to.equals('DOMAIN_ALREADY_EXISTS')
    }
  })
})
