import Block from '../../core/block.ts'
import { Avatar, Button, IconButton, InputField, UserPageForm } from '../../components'

export default class UserPage extends Block {
  constructor(props) {
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
      }),
      InputEmail: new InputField({
        label: 'Почта',
        name: 'email',
        value: 'pochta@yandex.ru',
        disabled: true,
        version: 'userPage'
      }),
      InputLogin: new InputField({
        label: 'Логин',
        name: 'login',
        value: 'Vasya',
        disabled: true,
        version: 'userPage'
      }),
      InputFirstName: new InputField({
        label: 'Имя',
        name: 'first_name',
        value: 'Василий',
        disabled: true,
        version: 'userPage'
      }),
      InputSecondName: new InputField({
        label: 'Фамилия',
        name: 'second_name',
        value: 'Иванов',
        disabled: true,
        version: 'userPage'
      }),
      InputNickname: new InputField({
        label: 'Имя в чате',
        name: 'phone',
        value: 'Pupkin',
        disabled: true,
        version: 'userPage'
      }),
      InputPhone: new InputField({
        label: 'Телефон',
        type: 'tel',
        name: 'phone',
        value: '+7(923)3123311',
        disabled: true,
        version: 'userPage'
      }),
      ChangeInfoButton: new Button({
        label: 'Изменить данные',
        type: 'link',
        onClick: () => console.log('changed data')
      }),
      ChangePasswordButton: new Button({
        label: 'Изменить пароль',
        type: 'link',
        onClick: () => console.log('changed password')
      }),
      LogoutButton: new Button({
        label: 'Выйти',
        type: 'link',
        textColor: 'cancel',
        onClick: () => console.log('log out')
      })
    })
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
        {{{ ChangeInfoButton }}}
        {{{ ChangePasswordButton }}}
        {{{ LogoutButton }}}
      `,
      onSubmit: (e) => this.handleSubmit(e)
    }).render()
  }
}
