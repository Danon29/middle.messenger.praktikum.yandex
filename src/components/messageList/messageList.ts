import Block from '../../core/block.ts'
import { MessageItemProps } from '../messageItem/messageItem.ts'
import { MessageItem } from '../messageItem'
import template from './template.hbs?raw'
import { connect } from '../../core/HOC.ts'
import isEqual from '../../utils/isEqual.ts'
import { store } from '../../core/store.ts'
import { UserType } from '../../types'
import formatDate from '../../utils/formatDate.ts'

interface MessageListProps {
  messages: MessageItemProps[]
}

class MessageList extends Block {
  constructor(props) {
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
      ),
      messageList: props.messages
    })

    console.log(this.props)
  }

  componentDidUpdate(oldProps, newProps): boolean {
    if (isEqual(oldProps, newProps)) return false

    const newMessages = newProps.messages.map(
      (message) =>
        new MessageItem({
          text: message.content,
          time: formatDate(message.time) as string,
          isRead: message.is_read,
          isOwnMessage: message.user_id === (store.getState().user as UserType).id
        })
    )

    this.children.messagesList = newMessages
    return true
  }

  render() {
    return this.compile(template as string, this.props)
  }
}

const ConnectedMessageList = connect(MessageList, (state) => {
  return {
    messages: state.messages?.[state.currentChat] || []
  }
})

export default ConnectedMessageList
