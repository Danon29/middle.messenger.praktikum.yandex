import { UserType } from '../types'
import { httpTransport } from '../core/http/httpTransport.ts'

const baseURL = 'https://ya-praktikum.tech/api/v2/user'

class UserAPI {
  updateUserInfo(data: Omit<UserType, 'password'>) {
    return httpTransport.put(`${baseURL}/profile`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    })
  }

  updateUserAvatar(formData: FormData) {
    return httpTransport.put(`${baseURL}/profile/avatar`, {
      data: formData
    })
  }

  changePassword(data: { oldPassword: string; newPassword: string }) {
    return httpTransport.put(`${baseURL}/password`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    })
  }
}

export const userAPI = new UserAPI()
