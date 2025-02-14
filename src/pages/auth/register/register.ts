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
    label: 'Почта',
    type: 'email',
    name: 'email'
  },
  {
    label: 'Логин',
    name: 'login'
  },
  {
    label: 'Имя',
    name: 'first_name'
  },
  {
    label: 'Фамилия',
    name: 'second_name'
  },
  {
    label: 'Телефон',
    type: 'tel',
    name: 'phone'
  },
  {
    label: 'Пароль',
    type: 'password',
    name: 'password'
  },
  {
    label: 'Пароль (еще раз)',
    type: 'password',
    name: 'password_again'
  }
]
const buttons: ButtonProps[] = [
  {
    label: 'Зарегистрироваться',
    type: 'primary',
    submit: true
  },
  {
    label: 'Войти',
    type: 'link',
    onClick: () => router.go('/sign-in')
  }
]

export default class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    const form = new FormElement({
      title: 'Регистрация',
      buttons: buttons.map(
        (button) =>
          new Button({
            label: button.label,
            type: button.type,
            submit: button.submit,
            onClick: button.submit
              ? async (e) => {
                  const isValid = this.handleSubmit(e)
                  if (isValid) await authController.register(this.props.formState)
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
      Form: form
    })

    this.validator = new FormValidator(this.props.formState)
  }

  render() {
    return this.compile(template as string, this.props)
  }
}
