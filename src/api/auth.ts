import { httpTransport } from '../core/http/httpTransport.ts'
import { UserType } from '../types'

const baseURL = 'https://ya-praktikum.tech/api/v2/auth'

class AuthAPI {
  public getUserInfo() {
    return httpTransport.get(`${baseURL}/user`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      }
    })
  }

  public login(data: Pick<UserType, 'login' | 'password'>) {
    return httpTransport.post(`${baseURL}/signin`, {
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    })
  }

  public register(data: UserType) {
    return httpTransport.post(`${baseURL}/signup`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    })
  }

  logout() {
    return httpTransport.post(`${baseURL}/logout`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      }
    })
  }
}

export const authAPI = new AuthAPI()
