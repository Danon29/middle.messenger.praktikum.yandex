import Block from '../../core/block.ts'
import { Avatar } from '../avatar'

export interface ChatItemProps {
  name: string
  time: string
  text: string
  isOwnMessage: boolean
  active: boolean
  onClick?: () => void
  onRemove?: () => void
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
      })
    })
  }

  componentDidUpdate(oldProps, newProps): boolean {
    const element = this.getContent()
    if (newProps.active) {
      element?.classList?.add('selected')
    } else {
      element?.classList?.remove('selected')
    }
    return true
  }

  render(): string {
    return `
      <div class="chat-item__avatar">
          {{{ UserAvatar }}}
      </div>
      <div class="chat-item__content">
          <div class="chat-item__header">
              <span class="chat-item__name">{{name}}</span> 
              <div class="chat-item__infoPart">
                  <span class="chat-item__time">{{time}}</span>
                  <button class="chat-item__deleteBtn">
                      <span class="chat-item__deleteLine"></span>
                      <span class="chat-item__deleteLine"></span>
                  </button>
              </div>
          </div>
          <div class="chat-item__body">
              <div class="chat-item__bodyText">
                  {{#if isOwnMessage }}
                      <span class="chat-item__ownPrefix">Вы:</span>
                  {{/if}}
                  <span class="chat-item__text">{{text}}</span>
              </div>
              {{#if count }}
                  <div class="chat-item__unreadCount">{{count}}</div>
              {{/if}}
          </div>
      </div>
    `
  }
}
