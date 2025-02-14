import Block from '../../core/block.ts'
import { Avatar } from '../avatar'
import template from './template.hbs?raw'
import { UserType } from '../../types'

export interface ChatItemProps {
  id: number
  title: string
  time: string
  avatar?: string
  unread_count: number
  created_by: number
  active: boolean
  onClick?: (id: number) => void
  onRemove?: (index: number) => void
  selected?: boolean
  last_message: {
    user: Partial<UserType>
    time: string
    content: string
  }
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
