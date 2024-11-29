import Block from '../../core/block.ts'
import { ChatItem } from '../chatItem'
import { ChatItemProps } from '../chatItem/chatItem.ts'

interface ChatListProps {
  chats: ChatItemProps[]
}

export default class ChatList extends Block {
  constructor(props: ChatListProps) {
    super('div', {
      ...props,
      activeIndex: -1,
      className: 'chat-list',
      chats: props.chats.map(
        (props, index) =>
          new ChatItem({
            ...props,
            onClick: () => {
              this.setProps({ activeIndex: index })
            },
            onRemove: () => {
              this.setProps({ showDialog: true })
            }
          })
      )
    })
  }

  render(): string {
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
    } else {
      chats.setProps({ active: true })
    }

    return `
      {{#each chats}}
        {{{ this }}}
      {{/each}}
    `
  }
}
