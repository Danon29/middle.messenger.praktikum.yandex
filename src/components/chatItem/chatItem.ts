import Block from '../../core/block.ts'
import { Avatar } from '../avatar'
import template from './template.hbs?raw'

export interface ChatItemProps {
  name: string
  time: string
  text: string
  isOwnMessage: boolean
  active: boolean
  onClick?: () => void
  onRemove?: (index: number) => void
  count?: number
  imageUrl?: string
  selected?: boolean
}

export default class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super('div', {
      ...props,
      className: `chat-item${props.active ? ' selected' : ''}`,
      events: {
        click: props.onClick
      },
      UserAvatar: new Avatar({
        size: 'small',
        imageUrl: props.imageUrl,
        clickable: false,
        onClick: () => console.log('changed avatar')
      }),
      handleRemove: () => {}
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
