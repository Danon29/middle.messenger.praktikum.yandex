import { UserType } from '../types'
import { userAPI } from '../api/userApi.ts'
import { store } from '../core/store.ts'

class UserController {
  public updateUserInfo(data: UserType) {
    return userAPI
      .updateUserInfo(data)
      .then((data) => store.setState('user', JSON.parse(data.responseText)))
      .catch((err) => console.log('Ошибка при изменении данных'))
  }

  public changePassword(data: { oldPassword: string; newPassword: string }) {
    return userAPI
      .changePassword(data)
      .then(() => console.log('Успешно обновлен'))
      .catch((err) => console.log('Ошибка при обновлении пароля'))
  }
}

export const userController = new UserController()
