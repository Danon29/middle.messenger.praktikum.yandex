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

  public getUserIsAuthed() {
    return authAPI
      .getUserInfo()
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })
  }

  public login(data: { login: string; password: string }) {
    return authAPI
      .login(data)
      .then(() => {
        this.getUserData().then(() => router.go('/'))
      })
      .catch((err) => console.log(err))
  }

  public register(data: UserType) {
    return authAPI
      .register(data)
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }
}

export const authController = new AuthController()
