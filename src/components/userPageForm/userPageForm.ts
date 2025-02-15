import Block from '../../core/block.ts'
import { IconButton } from '../iconButton'
import { Avatar } from '../avatar'
import template from './template.hbs?raw'
import { router } from '../../core/Router.ts'
import { connect } from '../../core/HOC.ts'
import { store } from '../../core/store.ts'
import { UserType } from '../../types'
import { InputFieldProps } from '../inputField/inputField.ts'
import { ButtonProps } from '../button/button.ts'

interface UserPageProps {
  inputs: InputFieldProps[]
  buttons: ButtonProps[]
  onSubmit?: (e: Event) => void
  userName?: string
  onAvatarClick?: (e: MouseEvent) => void
}

class UserPageForm extends Block {
  constructor(props: UserPageProps) {
    const { first_name, avatar } = store.getState().user as UserType

    super('div', {
      ...props,
      className: 'user-page',
      GoBackButton: new IconButton({
        kind: 'arrowLeft',
        onClick: () => router.go('/messenger'),
        type: 'icon-filled'
      }),
      UserAvatar: new Avatar({
        size: 'big',
        clickable: true,
        onClick: (e: MouseEvent) => {
          if (props.onAvatarClick) props.onAvatarClick(e)
        },
        imageUrl: avatar
      }),
      userName: first_name
    })
  }

  render() {
    return this.compile(template as string, this.props)
  }
}

const ConnectedUserPageForm = connect(UserPageForm as unknown as typeof Block, (state) => {
  return {
    user: state.user
  }
})

export default ConnectedUserPageForm
