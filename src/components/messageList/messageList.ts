import Block from '../../core/block.ts'
import { MessageItem } from '../messageItem'
import template from './template.hbs?raw'
import { connect } from '../../core/HOC.ts'
import isEqual from '../../utils/isEqual.ts'
import { store } from '../../core/store.ts'
import { MessageType, UserType } from '../../types'
import formatDate from '../../utils/formatDate.ts'

class MessageList extends Block {
  constructor() {
    super('div', {
      className: 'chat-container'
    })
  }

  //@ts-ignore
  componentDidUpdate(oldProps, newProps): boolean {
    if (isEqual(oldProps, newProps)) return false
    this.children.messagesList = newProps.messages.map(
      (message: MessageType) =>
        new MessageItem({
          text: message.content,
          time: formatDate(message.time) as string,
          isRead: message.is_read,
          isOwnMessage: message.user_id === (store.getState().user as UserType).id
        })
    )
    return true
  }

  render() {
    return this.compile(template as string, this.props)
  }
}

const ConnectedMessageList = connect(MessageList, (state) => {
  return {
    //@ts-ignore
    messages: state.messages?.[state.currentChat as number] || []
  }
})

export default ConnectedMessageList
