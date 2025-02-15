export enum StoreEvents {
  Updated = 'updated'
}

import { set } from '../utils/set.ts'
import EventBus from './eventBus.ts'
import { StoreType } from '../types'

export class Store extends EventBus {
  private state: StoreType = {
    user: {
      id: null,
      first_name: '',
      second_name: '',
      display_name: '',
      login: '',
      phone: '',
      email: '',
      avatar: ''
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
    set(this.state, path, value)

    this.emit(StoreEvents.Updated, this.getState())
  }
}

export const store = new Store()
