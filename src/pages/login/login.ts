import Block from '../../core/block.ts'
import { Button, InputField } from '../../components'
import FormValidator from '../../utils/validator/FormValidator.ts'
import Form from '../../components/formElement/formElement.ts'

export default class LoginPage extends Block {
  constructor(props) {
    super('div', {
      ...props,
      className: 'loginPage',
      formState: {
        login: '',
        password: ''
      },
      errors: {
        login: '',
        password: ''
      },
      InputLogin: new InputField({
        label: 'Логин',
        name: 'login',
        errorMessage: '',
        onChange: (e) => this.handleInputChange(e)
      }),
      InputPassword: new InputField({
        label: 'Пароль',
        name: 'password',
        errorMessage: '',
        onChange: (e) => this.handleInputChange(e),
        type: 'password'
      }),
      LoginButton: new Button({
        onClick: (e) => this.handleSubmit(e),
        label: 'Войти',
        type: 'primary',
        submit: true
      }),
      RegisterButton: new Button({
        label: 'Нет аккаунта?',
        type: 'link'
      })
    })

    this.validator = new FormValidator(this.props.formState)
  }

  render(): string {
    return new Form({
      title: 'Авторизация',
      inputs: `
        {{{ InputLogin }}}
        {{{ InputPassword }}}
      `,
      buttons: `
        {{{ LoginButton }}}
        {{{ RegisterButton }}}
      `,
      onSubmit: (e) => this.handleSubmit(e)
    }).render()
  }
}
