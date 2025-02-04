import Block from '../../core/block.ts'
import { MessageItemProps } from '../messageItem/messageItem.ts'
import { MessageItem } from '../messageItem'
import template from './template.hbs?raw'

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

  render() {
    return this.compile(template as string, this.props)
  }
}
