import { httpTransport } from '../core/http/httpTransport.ts'

const baseURL = 'https://ya-praktikum.tech/api/v2/chats'

class ChatAPI {
  public getChats() {
    return httpTransport.get(`${baseURL}/`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      }
    })
  }

  createChat(data: { title: string }) {
    return httpTransport.post(`${baseURL}/`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    })
  }

  deleteChat(data: { chatId: number }) {
    return httpTransport.delete(`${baseURL}/`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    })
  }

  addUserToChat(data: { users: number[]; chatId: number }) {
    return httpTransport.put(`${baseURL}/users`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    })
  }

  removeUserFromChat(data: { users: number[]; chatId: number }) {
    return httpTransport.delete(`${baseURL}/users`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data)
    })
  }

  getChatToken(chatId: number) {
    return httpTransport.post(`${baseURL}/token/${chatId}`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      }
    })
  }
}

export const chatAPI = new ChatAPI()
