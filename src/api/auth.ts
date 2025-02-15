import { httpTransport } from '../core/http/httpTransport.ts'
import { UserType } from '../types'
import { baseURL } from '../consts'

const baseUrl = `${baseURL}/auth`

class AuthAPI {
  public getUserInfo() {
    return httpTransport.get(`${baseUrl}/user`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      }
    })
  }

  public login(data: Pick<UserType, 'login' | 'password'>) {
    return httpTransport.post(`${baseUrl}/signin`, {
      withCredentials: false,
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    })
  }

  public register(data: UserType) {
    return httpTransport.post(`${baseUrl}/signup`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    })
  }

  public logout() {
    return httpTransport.post(`${baseUrl}/logout`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      }
    })
  }
}

export const authAPI = new AuthAPI()
