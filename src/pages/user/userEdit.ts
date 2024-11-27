import Block from '../../core/block.ts'
import { Avatar, Button, IconButton, InputField, UserPageForm } from '../../components'
import FormValidator from '../../utils/validator/FormValidator.ts'

export default class UserPage extends Block {
  constructor(props) {
    super('div', {
      ...props,
      formState: {
        email: 'pochta@yandex.ru',
        login: 'Vasya',
        first_name: 'Василий',
        second_name: 'Иванов',
        phone: '+79233123311'
      },
      errors: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: ''
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
        onChange: (e) => this.handleInputChange(e),
        version: 'userPage'
      }),
      InputLogin: new InputField({
        label: 'Логин',
        name: 'login',
        value: 'Vasya',
        onChange: (e) => this.handleInputChange(e),
        version: 'userPage'
      }),
      InputFirstName: new InputField({
        label: 'Имя',
        name: 'first_name',
        value: 'Василий',
        onChange: (e) => this.handleInputChange(e),
        version: 'userPage'
      }),
      InputSecondName: new InputField({
        label: 'Фамилия',
        name: 'second_name',
        value: 'Иванов',
        onChange: (e) => this.handleInputChange(e),
        version: 'userPage'
      }),
      InputNickname: new InputField({
        label: 'Имя в чате',
        value: 'Pupkin',
        onChange: (e) => this.handleInputChange(e),
        version: 'userPage'
      }),
      InputPhone: new InputField({
        label: 'Телефон',
        type: 'tel',
        name: 'phone',
        value: '+79233123311',
        onChange: (e) => this.handleInputChange(e),
        version: 'userPage'
      }),
      SaveButton: new Button({
        label: 'Сохранить',
        type: 'primary',
        onClick: (e) => this.handleSubmit(e)
      })
    })
    this.validator = new FormValidator(this.props.formState)
  }

  render(): string {
    return new UserPageForm({
      inputs: `
        {{{ InputEmail }}}
        {{{ InputLogin }}}
        {{{ InputFirstName }}}
        {{{ InputSecondName }}}
        {{{ InputNickname }}}
        {{{ InputPhone }}}
      `,
      buttons: `
        {{{ SaveButton }}}
      `,
      onSubmit: (e) => this.handleSubmit(e)
    }).render()
  }
}
