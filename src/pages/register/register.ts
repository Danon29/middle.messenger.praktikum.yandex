import Block from '../../core/block.ts'
import { Button, InputField } from '../../components'
import FormValidator from '../../utils/validator/FormValidator.ts'
import Form from '../../components/formElement/formElement.ts'

export default class RegisterPage extends Block {
  constructor(props) {
    super('div', {
      ...props,
      className: 'loginPage',
      formState: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        password: '',
        password_again: ''
      },
      errors: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        password: '',
        password_again: ''
      },
      InputEmail: new InputField({
        label: 'Почта',
        type: 'email',
        onChange: (e) => this.handleInputChange(e),
        name: 'email'
      }),
      InputLogin: new InputField({
        label: 'Логин',
        onChange: (e) => this.handleInputChange(e),
        name: 'login'
      }),
      InputFirstName: new InputField({
        label: 'Имя',
        onChange: (e) => this.handleInputChange(e),
        name: 'first_name'
      }),
      InputSecondName: new InputField({
        label: 'Фамилия',
        onChange: (e) => this.handleInputChange(e),
        name: 'second_name'
      }),
      InputPhone: new InputField({
        label: 'Телефон',
        type: 'tel',
        onChange: (e) => this.handleInputChange(e),
        name: 'phone'
      }),
      InputPassword: new InputField({
        label: 'Пароль',
        type: 'password',
        onChange: (e) => this.handleInputChange(e),
        name: 'password'
      }),
      InputPasswordAgain: new InputField({
        label: 'Пароль (еще раз)',
        type: 'password',
        onChange: (e) => this.handleInputChange(e),
        name: 'password_again'
      }),
      LoginButton: new Button({
        label: 'Войти',
        type: 'link'
      }),
      RegisterButton: new Button({
        label: 'Зарегистрироваться',
        type: 'primary',
        onClick: (e) => this.handleSubmit(e)
      })
    })
    this.validator = new FormValidator(this.props.formState)
  }

  render(): string {
    return new Form({
      title: 'Регистрация',
      inputs: `
        {{{ InputEmail }}}
        {{{ InputLogin }}}
        {{{ InputFirstName }}}
        {{{ InputSecondName }}}
        {{{ InputPhone }}}
        {{{ InputPassword }}}
        {{{ InputPasswordAgain }}}
      `,
      buttons: `
        {{{ RegisterButton }}}
        {{{ LoginButton }}}
      `,
      onSubmit: (e) => this.handleSubmit(e)
    }).render()
  }
}
