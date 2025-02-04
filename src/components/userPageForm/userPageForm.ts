import Block from '../../core/block.ts'
import { IconButton } from '../iconButton'
import { Avatar } from '../avatar'
import template from './template.hbs?raw'
import { router } from '../../core/Router.ts'

interface UserPageProps {
  inputs: any[]
  buttons: any[]
  onSubmit?: (e: Event) => void
  userName?: string
}

export default class UserPageForm extends Block {
  constructor(props: UserPageProps) {
    super('div', {
      ...props,
      className: 'user-page',
      GoBackButton: new IconButton({
        kind: 'arrowLeft',
        onClick: () => router.go('/'),
        type: 'icon-filled'
      }),
      UserAvatar: new Avatar({
        size: 'big',
        clickable: true
      })
    })
  }

  render() {
    return this.compile(template as string, this.props)
  }
}
