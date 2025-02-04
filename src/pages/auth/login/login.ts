import { InputFieldProps } from '../../../components/inputField/inputField.ts'
import { ButtonProps } from '../../../components/button/button.ts'
import Block from '../../../core/block.ts'
import FormValidator from '../../../utils/validator/FormValidator.ts'
import template from '../template.hbs?raw'
import { Button, FormElement, InputField } from '../../../components'
import { router } from '../../../core/Router.ts'
import { authController } from '../../../controllers/authController.ts'

interface LoginPageProps {
  inputs: InputFieldProps[]
  buttons: ButtonProps[]
}

const inputs: InputFieldProps[] = [
  {
    label: 'Логин',
    name: 'login'
  },
  {
    label: 'Пароль',
    type: 'password',
    name: 'password'
  }
]
const buttons: ButtonProps[] = [
  {
    label: 'Войти',
    type: 'primary',
    submit: true
  },
  {
    label: 'Нет аккаунта? ',
    type: 'link',
    onClick: () => router.go('/register')
  }
]

export default class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    const form = new FormElement({
      title: 'Войти',
      buttons: buttons.map(
        (button) =>
          new Button({
            label: button.label,
            type: button.type,
            submit: button.submit,
            onClick: button.submit
              ? (e) => {
                  const isValid = this.handleSubmit(e)
                  if (isValid) authController.login(this.props.formState)
                }
              : (e) => {
                  if (button.onClick) button.onClick(e)
                }
          })
      ),
      inputs: inputs.map(
        (input) =>
          new InputField({
            label: input.label,
            name: input.name,
            type: input.type,
            onChange: (e) => this.handleInputChange(e)
          })
      )
    })

    super('div', {
      ...props,
      className: 'authPage',
      formState: {
        login: '',
        password: ''
      },
      errors: {
        login: '',
        password: ''
      },
      Form: form
    })

    this.validator = new FormValidator(this.props.formState)
  }

  render() {
    return this.compile(template as string, this.props)
  }
}
