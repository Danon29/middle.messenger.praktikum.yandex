export enum StoreEvents {
  Updated = 'updated'
}

import { set } from '../utils/set.ts'
import EventBus from './eventBus.ts'
import { StoreType } from '../types'

export class Store extends EventBus<any> {
  private state: StoreType = {
    user: {
      id: null,
      first_name: '',
      second_name: '',
      display_name: '',
      login: '',
      phone: '',
      email: ''
    },
    chats: [],
    messages: [],
    isEditing: false,
    currentChat: undefined
  }

  public getState() {
    return this.state
  }

  public setState(path: string, value: unknown) {
    // Используем вашу утилиту set, которая позволяет устанавливать значение по пути 'user.first_name' и т.д.
    set(this.state, path, value)

    // Оповещаем всех подписчиков, что состояние обновилось
    this.emit(StoreEvents.Updated, this.getState())

    console.log('store updated:', this.state)
  }
}

// Экспортируем единый экземпляр стора
export const store = new Store()
