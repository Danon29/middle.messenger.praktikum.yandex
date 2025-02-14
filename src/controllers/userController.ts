import { UserType } from '../types'
import { userAPI } from '../api/userApi.ts'
import { store } from '../core/store.ts'

class UserController {
  public updateUserInfo(data: UserType) {
    return userAPI
      .updateUserInfo(data)
      .then((data) => store.setState('user', JSON.parse(data.responseText)))
      .catch((err) => console.log('Ошибка при изменении данных', err))
  }

  public changePassword(data: { oldPassword: string; newPassword: string }) {
    return userAPI
      .changePassword(data)
      .then(() => console.log('Успешно обновлен'))
      .catch((err) => console.log('Ошибка при обновлении пароля', err))
  }

  public async updateAvatar(file: File) {
    try {
      const formData = new FormData()
      formData.append('avatar', file)

      await userAPI.updateUserAvatar(formData as FormData)
      console.log('Успешно')
    } catch (err) {
      console.log(err)
    }
  }
}

export const userController = new UserController()
