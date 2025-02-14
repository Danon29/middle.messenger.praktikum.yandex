import { httpTransport } from '../core/http/httpTransport.ts'
import { baseURL } from '../consts'

const baseUrl = `${baseURL}/chats`

class ChatAPI {
  public getChats() {
    return httpTransport.get(`${baseUrl}/`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      }
    })
  }

  createChat(data: { title: string }) {
    return httpTransport.post(`${baseUrl}/`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    })
  }

  deleteChat(data: { chatId: number }) {
    return httpTransport.delete(`${baseUrl}/`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    })
  }

  addUserToChat(data: { users: number[]; chatId: number }) {
    return httpTransport.put(`${baseUrl}/users`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    })
  }

  removeUserFromChat(data: { users: number[]; chatId: number }) {
    return httpTransport.delete(`${baseUrl}/users`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    })
  }

  getChatToken(chatId: number) {
    return httpTransport.post(`${baseUrl}/token/${chatId}`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      }
    })
  }
}

export const chatAPI = new ChatAPI()
