import { authAPI } from '../api/auth.ts'
import { UserType } from '../types'
import { store } from '../core/store.ts'
import { router } from '../core/Router.ts'

class AuthController {
  public getUserData() {
    return authAPI.getUserInfo().then((xhr) => {
      const responseText = (xhr as any).responseText
      const parsedData = JSON.parse(responseText)
      store.setState('user', parsedData)
    })
  }

  public async getUserIsAuthed() {
    try {
      await authAPI.getUserInfo()
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  public async login(data: { login: string; password: string }) {
    try {
      await authAPI.login(data)
      await this.getUserData()
        .then(() => router.go('/messenger'))
        .catch((err) => console.log(err))
    } catch (err) {
      console.log(err)
    }
  }

  public async register(data: UserType) {
    return authAPI
      .register(data)
      .then(() => router.go('/sign-in'))
      .catch((err) => console.log(err))
  }

  public async logout() {
    try {
      await authAPI.logout()
      router.go('/sign-in')
    } catch (err) {
      console.log(err)
    }
  }
}

export const authController = new AuthController()
