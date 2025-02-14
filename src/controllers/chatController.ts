import { chatAPI } from '../api/chatApi.ts'
import { store } from '../core/store.ts'
import { UserType } from '../types'

class ChatController {
  private sockets: { [chatId: number]: WebSocket } = {}
  public getChats() {
    return chatAPI.getChats()
  }

  public createChat(title: string) {
    return chatAPI
      .createChat({ title })
      .then(() => this.getChats())
      .catch((err) => console.log('Ошибка при создании чата', err))
  }

  public deleteChat(chatId: number) {
    return chatAPI
      .deleteChat({ chatId })
      .then(() => this.getChats())
      .catch((err) => console.log('Ошибка при удалении чата', err))
  }

  public addUserToChat(chatId: number, users: number[]) {
    return chatAPI
      .addUserToChat({ users, chatId })
      .then(() => `Чат успешно обновлен`)
      .catch((err) => console.log('Ошибка при добавлении пользователей', err))
  }

  public removeUserFromChat(chatId: number, users: number[]) {
    return chatAPI
      .removeUserFromChat({ users, chatId })
      .then(() => console.log('Успешно удалено'))
      .catch(() => console.log('Ошибка при удалении пользователей'))
  }

  public getChatToken(chatId: number) {
    return chatAPI
      .getChatToken(chatId)
      .then((data) => {
        const token = JSON.parse(data.responseText).token
        store.setState(`token_${chatId}`, token)
        return token
      })
      .catch((err) => console.log('Ошибка при получении токена', err))
  }

  public connectToChat(chatId: number) {
    console.log(this.sockets)
    this.getChatToken(chatId)
      .then((token) => {
        const userId = (store.getState().user as UserType).id
        const socketUrl = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
        const socket = new WebSocket(socketUrl) as WebSocket
        this.sockets[chatId] = socket

        socket.addEventListener('open', () => {
          console.log(`WS-соединение установлено (чат ${chatId}). Запрашиваем старые сообщения...`)
          socket.send(
            JSON.stringify({
              content: '0',
              type: 'get old'
            })
          )
        })

        socket.addEventListener('message', (event: MessageEvent) => {
          try {
            const data = JSON.parse(event.data)
            if (Array.isArray(data)) {
              const reversed = data.reverse()
              store.setState('messages', {
                ...store.getState().messages,
                [chatId]: reversed
              })
              store.setState('errorMessage', JSON.stringify(reversed))
            } else if (data.type === 'message' || data.type === 'file') {
              const currentMessages = store.getState().messages?.[chatId] || []
              const newMessages = [...currentMessages, data]
              store.setState('messages', {
                ...store.getState().messages,
                [chatId]: newMessages
              })
              store.setState('errorMessage', JSON.stringify(newMessages))
            }
          } catch (error) {
            console.error('Ошибка обработки входящего сообщения:', error)
          }
        })

        socket.addEventListener('close', (closeEvent: CloseEvent) => {
          if (!closeEvent.wasClean) {
            console.log('WS обрыв. Попытка переподключиться через 3 сек...')
            setTimeout(() => this.connectToChat(chatId), 3000)
          }
          console.log(`Код: ${closeEvent.code} | Причина: ${closeEvent.reason}`)
        })

        socket.addEventListener('error', (errorEvent: Event) => {
          console.error('Ошибка в WebSocket:', errorEvent)
        })
      })
      .catch((error) => {
        console.error('Ошибка при подключении к чату:', error)
      })
  }

  public sendMessage(chatId: number, messageText: string) {
    const socket = this.sockets[chatId]
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          content: messageText,
          type: 'message'
        })
      )
      console.log('Сообщение отправлено в WebSocket:', messageText)
    } else {
      console.log('WebSocket соединение не установлено или уже закрыто.')
    }
  }
}

export const chatController = new ChatController()
