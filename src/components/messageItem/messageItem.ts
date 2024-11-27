import Block from '../../core/block.ts'

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

  render(): string {
    return `
        <p class="message__text">{{text}}</p>
        <div class="message__wrapper">
          {{#if isRead }}
            {{#if isOwnMessage }}
              <span class="message__read-status">✔️</span>
            {{/if}}
          {{/if}}
          <span class="message__time">{{time}}</span>
        </div>
    `
  }
}
