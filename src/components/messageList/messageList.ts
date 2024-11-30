import Block from '../../core/block.ts'
import { MessageItemProps } from '../messageItem/messageItem.ts'
import { MessageItem } from '../messageItem'

interface MessageListProps {
  messages: MessageItemProps[]
}

export default class MessageList extends Block {
  constructor(props: MessageListProps) {
    super('div', {
      ...props,
      className: 'chat-container',
      messages: props.messages.map(
        (message) =>
          new MessageItem({
            text: message.text,
            time: message.time,
            isRead: message.isRead,
            isOwnMessage: message.isOwnMessage
          })
      )
    })
  }

  render(): string {
    return `
      {{#each messages}}
        {{{ this }}}
      {{/each}} 
    `
  }
}
