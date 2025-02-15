import { UserType } from '../types'
import { httpTransport } from '../core/http/httpTransport.ts'
import { baseURL } from '../consts'

const baseUrl = `${baseURL}/user`

class UserAPI {
  updateUserInfo(data: Omit<UserType, 'password'>) {
    return httpTransport.put(`${baseUrl}/profile`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    })
  }

  updateUserAvatar(formData: FormData) {
    return httpTransport.put(`${baseUrl}/profile/avatar`, {
      data: formData
    })
  }

  changePassword(data: { oldPassword: string; newPassword: string }) {
    return httpTransport.put(`${baseUrl}/password`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    })
  }
}

export const userAPI = new UserAPI()
