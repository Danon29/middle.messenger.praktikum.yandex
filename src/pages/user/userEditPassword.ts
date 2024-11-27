import Block from '../../core/block.ts'
import { Avatar, Button, IconButton, InputField, UserPageForm } from '../../components'
import FormValidator from '../../utils/validator/FormValidator.ts'

export default class UserEditPassword extends Block {
  constructor(props) {
    super('div', {
      ...props,
      formState: {
        password: '',
        password_again: ''
      },
      errors: {
        password: '',
        password_again: ''
      },
      className: 'user-page',
      GoBackButton: new IconButton({
        kind: 'arrowLeft',
        onClick: () => console.log('avatar changed'),
        type: 'icon-filled'
      }),
      UserAvatar: new Avatar({
        size: 'big',
        clickable: true
      }),
      InputEmail: new InputField({
        label: 'Почта',
        name: 'email',
        value: 'pochta@yandex.ru',
        disabled: true,
        version: 'userPage'
      }),
      InputOldPassword: new InputField({
        label: 'Старый пароль',
        type: 'password',
        onChange: (e) => this.handleInputChange(e),
        value: 'someValueforPassword',
        version: 'userPage'
      }),
      InputPassword: new InputField({
        label: 'Новый пароль',
        type: 'password',
        onChange: (e) => this.handleInputChange(e),
        name: 'password',
        value: 'someNewValue',
        version: 'userPage'
      }),
      InputPasswordAgain: new InputField({
        label: 'Повторите новый пароль',
        type: 'password',
        onChange: (e) => this.handleInputChange(e),
        name: 'password_again',
        value: 'someNewValue',
        version: 'userPage'
      }),
      SaveButton: new Button({
        label: 'Сохранить',
        type: 'primary',
        onClick: (e) => this.handleSubmit(e),
        submit: true
      })
    })
    this.validator = new FormValidator(this.props.formState)
  }

  render(): string {
    return new UserPageForm({
      inputs: `
        {{{ InputOldPassword }}}
        {{{ InputPassword }}}
        {{{ InputPasswordAgain }}}
      `,
      buttons: `
        {{{ SaveButton }}}
      `,
      onSubmit: (e) => this.handleSubmit(e)
    }).render()
  }
}
