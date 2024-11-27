import Block from '../../core/block.ts'
import { IconButton } from '../iconButton'
import { Avatar } from '../avatar'

interface UserPageProps {
  inputs: string
  buttons: string
  onSubmit: (e: Event) => void
  userName?: string
}

export default class UserPageForm extends Block {
  constructor(props: UserPageProps) {
    super('div', {
      ...props,
      className: 'user-page',
      GoBackButton: new IconButton({
        kind: 'arrowLeft',
        onClick: () => console.log('avatar changed'),
        type: 'icon-filled'
      }),
      UserAvatar: new Avatar({
        size: 'big',
        clickable: true
      })
    })
  }

  render(): string {
    return `
      <div class="user-page__goback-btn">
        {{{ GoBackButton }}}
      </div>
      <div class="user-page__content">
          <div class="user-page__header">
              <div>{{{ UserAvatar }}}</div>
              {{#if userName}}
                  <span class="user-page__user-name">{{userName}}</span>
              {{/if}}
          </div>
        <form onsubmit="${this.props.onSubmit}">
          <div class="user-page__body">
              ${this.props.inputs}
          </div>
          <div class="user-page_buttons">
            ${this.props.buttons}
          </div>
        </form>
      </div>
    `
  }
}
