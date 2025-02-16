import * as sinon from 'sinon'
import { expect } from 'chai'
import { HTTPTransport, METHODS } from '../http/httpTransport.ts'
import { baseURL } from '../../consts/index.ts'

const testErrors = {
  BAD_COOKIE: 'Request failed with status 401, Cookie is not valid',
  EMPTY_LOGIN: 'Request failed with status 401, Login or password is incorrect'
}

describe('HTTPTransport', () => {
  it('Must build query string correctly', async () => {
    const http = new HTTPTransport()
    const stub = sinon.stub(http, 'request').resolves()
    const method = METHODS.GET

    await http.get('/test', { data: { a: 123, b: 'abc' } })

    const correctPath = `${baseURL}/test?a=123&b=abc`
    expect(stub.calledWithMatch(correctPath, { method }))
  })

  it('Must return error on try to get user info', async () => {
    const http = new HTTPTransport()

    await http
      .get(`${baseURL}/auth/user`, {
        withCredentials: true,
        headers: {
          'content-type': 'application/json'
        }
      })
      .catch((error) => {
        const errorMessage = error.message.toString()
        expect(errorMessage).to.equal(testErrors.BAD_COOKIE)
      })
  })

  it('Must return error on try to login with wrong data', async () => {
    const http = new HTTPTransport()

    await http
      .post(`${baseURL}/auth/signin`, {
        withCredentials: false,
        headers: {
          'content-type': 'application/json'
        },
        data: JSON.stringify({ login: '', password: 'somethingStupid' })
      })
      .catch((error) => {
        const errorMessage = error.message.toString()
        expect(errorMessage).to.equal(testErrors.EMPTY_LOGIN)
      })
  })
})
