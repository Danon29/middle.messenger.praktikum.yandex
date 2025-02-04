import Block from '../../core/block.ts'
import template from './template.hbs?raw'

export interface MessageItemProps {
  text: string
  time: string
  isRead?: boolean
  isOwnMessage: boolean
}

export default class MessageItem extends Block {
  constructor(props: MessageItemProps) {
    super('div', {
      ...props,
      className: `message${props.isOwnMessage ? ' own-message' : ' friends-message'}`
    })
  }

  render() {
    return this.compile(template as string, this.props)
  }
}
