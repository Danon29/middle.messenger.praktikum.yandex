import Block from '../../core/block.ts'
import { ChatItem } from '../chatItem'
import template from './template.hbs?raw'
import { store } from '../../core/store.ts'

interface ChatListProps {
  chats: ChatItem[] | []
}

export default class ChatList extends Block {
  constructor(props: ChatListProps) {
    const chats = store.getState().chats

    super('div', {
      ...props,
      activeIndex: -1,
      className: 'chat-list',
      chats: chats.map((chat) => new ChatItem({ ...chat }))
    })

    if (Array.isArray(this.children.chats)) {
      ;(this.children.chats as ChatItem[]).forEach((chat: ChatItem, index: number) => {
        chat.setProps({
          events: {
            click: () => {
              this.setProps({ activeIndex: index })
            }
          }
        })
      })
    } else {
      console.error('не массив')
    }
  }

  render() {
    const { activeIndex } = this.props
    const { chats } = this.children

    if (Array.isArray(chats)) {
      chats.forEach((chat, index) => {
        if (index === activeIndex) {
          chat.setProps({ active: true })
          return
        }

        if (chat.props.active) {
          chat.setProps({ active: false })
        }
      })
    } else if (chats) {
      chats.setProps({ active: true })
    }

    return this.compile(template as string, this.props)
  }
}
