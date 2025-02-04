import Block from '../../core/block.ts'
import { Avatar } from '../avatar'
import template from './template.hbs?raw'
import { store } from '../../core/store.ts'
import { UserType } from '../../types'

export interface ChatItemProps {
  id: number
  title: string
  time: string
  content: string
  avatar?: string
  unread_count
  isOwnMessage: boolean
  active: boolean
  onClick?: (id: number) => void
  onRemove?: (index: number) => void
  selected?: boolean
}

export default class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super('div', {
      ...props,
      className: `chat-item${props.active ? ' selected' : ''}`,
      events: {
        click: () => {
          if (props.onClick) {
            props.onClick(props.id)
          }
        }
      },
      UserAvatar: new Avatar({
        size: 'small',
        imageUrl: props.avatar,
        clickable: false,
        onClick: () => console.log('changed avatar')
      }),
      handleRemove: props.onRemove
    })
  }

  componentDidUpdate(_: ChatItemProps, newProps: ChatItemProps): boolean {
    const element = this.getContent() as HTMLElement
    if (newProps.active) {
      console.log(this.props.id)
      element?.classList?.add('selected')
    } else {
      element?.classList?.remove('selected')
    }
    return true
  }

  render() {
    return this.compile(template as string, this.props)
  }
}
