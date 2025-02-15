import template from '../template.hbs?raw'
import { InputFieldProps } from '../../../components/inputField/inputField.ts'
import { ButtonProps, ButtonTypes } from '../../../components/button/button.ts'
import Block from '../../../core/block.ts'
import { Button, InputField, UserPageForm } from '../../../components'
import FormValidator from '../../../utils/validator/FormValidator.ts'
import { UserType } from '../../../types'
import { router } from '../../../core/Router.ts'
import { userController } from '../../../controllers/userController.ts'

export interface UserPageProps {
  inputs: InputFieldProps[]
  buttons: ButtonProps[]
  user: Pick<UserType, 'password'>
}

export default class UserPage extends Block {
  constructor(props: UserPageProps) {
    const form = new UserPageForm({
      buttons: [
        {
          label: 'Сохранить',
          type: 'primary',
          submit: true
        }
      ].map(
        (button) =>
          new Button({
            label: button.label,
            type: button.type as ButtonTypes,
            submit: button.submit,
            onClick: async (e) => {
              const isValid = this.handleSubmit(e)
              if (isValid) {
                const { password, old_password } = this.props.formState
                await userController
                  .changePassword({ newPassword: password, oldPassword: old_password })
                  .then(() => {
                    router.back()
                  })
                  .catch((error) => console.log(error))
              }
            }
          })
      ),
      inputs: [
        {
          label: 'Старый пароль',
          type: 'password',
          value: '',
          version: 'userPage',
          name: 'old_password'
        },
        {
          label: 'Новый пароль',
          type: 'password',
          name: 'password',
          value: '',
          version: 'userPage'
        },
        {
          label: 'Повторите новый пароль',
          type: 'password',
          name: 'password_again',
          value: '',
          version: 'userPage'
        }
      ].map(
        (input) =>
          new InputField({
            label: input.label,
            name: input.name,
            type: input?.type,
            onChange: (e) => this.handleInputChange(e),
            value: input.value,
            disabled: false,
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
        old_password: props.user.password
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
