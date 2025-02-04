import template from '../template.hbs?raw'
import { InputFieldProps } from '../../../components/inputField/inputField.ts'
import { ButtonProps } from '../../../components/button/button.ts'
import Block from '../../../core/block.ts'
import { Button, InputField, UserPageForm } from '../../../components'
import FormValidator from '../../../utils/validator/FormValidator.ts'

export interface UserPageProps {
  inputs: InputFieldProps[]
  buttons: ButtonProps[]
  formState?: { [key: string]: string }
  errors?: { [key: string]: string }
}

const inputs: InputFieldProps[] = [
  {
    label: 'Старый пароль',
    type: 'password',
    value: 'someValueforPassword',
    version: 'userPage',
    name: 'old_password'
  },
  {
    label: 'Новый пароль',
    type: 'password',
    name: 'password',
    value: 'someNewValue',
    version: 'userPage'
  },
  {
    label: 'Повторите новый пароль',
    type: 'password',
    name: 'password_again',
    value: 'someNewValue',
    version: 'userPage'
  }
]

const buttons = [
  {
    label: 'Сохранить',
    type: 'primary',
    submit: true
  }
]

export default class UserPage extends Block {
  constructor(props: UserPageProps) {
    const form = new UserPageForm({
      buttons: buttons.map(
        (button) =>
          new Button({
            label: button.label,
            type: button.type,
            submit: button.submit,
            onClick: button.submit
              ? (e) => {
                  this.handleSubmit(e)
                }
              : () => console.log('kek')
          })
      ),
      inputs: inputs.map(
        (input) =>
          new InputField({
            label: input.label,
            name: input.name,
            type: input?.type,
            onChange: (e) => this.handleInputChange(e),
            value: input.value,
            disabled: input.disabled,
            version: input.version
          })
      )
    })

    super('div', {
      ...props,
      className: 'user-page',
      formState: {
        password: '',
        password_again: '',
        old_password: ''
      },
      errors: {
        password: '',
        password_again: '',
        old_password: ''
      },
      Form: form
    })
    this.validator = new FormValidator(this.props.formState)
  }

  render() {
    return this.compile(template as string, this.props)
  }
}
