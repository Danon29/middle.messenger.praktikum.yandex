import template from '../template.hbs?raw'
import { InputFieldProps } from '../../../components/inputField/inputField.ts'
import { ButtonProps } from '../../../components/button/button.ts'
import Block from '../../../core/block.ts'
import { Avatar, Button, IconButton, InputField, UserPageForm } from '../../../components'
import FormValidator from '../../../utils/validator/FormValidator.ts'
import { router } from '../../../core/Router.ts'
import { authController } from '../../../controllers/authController.ts'

export interface UserPageProps {
  inputs: InputFieldProps[]
  buttons: ButtonProps[]
  formState?: { [key: string]: string }
  errors?: { [key: string]: string }
  user?: {
    // Добавляем user в пропсы
    first_name: string
    second_name: string
    display_name: string
    login: string
    phone: string
    email: string
  }
}

const buttonsProfile: ButtonProps[] = [
  {
    label: 'Изменить данные',
    type: 'primary',
    submit: true
  },
  {
    label: 'Изменить пароль',
    type: 'link',
    onClick: () => router.go('/profile-edit-password'),
    submit: false
  },
  {
    label: 'Выйти',
    type: 'link',
    textColor: 'cancel',
    onClick: () => authController.getUserData()
  }
]

export default class UserPage extends Block {
  constructor(props: UserPageProps) {
    const form = new UserPageForm({
      buttons: buttonsProfile.map(
        (button) =>
          new Button({
            label: button.label,
            type: button.type,
            submit: button.submit,
            onClick: button.submit
              ? (e) => {
                  this.handleSubmit(e)
                }
              : (e) => {
                  if (button.onClick) button.onClick(e)
                }
          })
      ),
      inputs: (props.user
        ? [
            {
              label: 'Почта',
              name: 'email',
              value: props.user.email,
              disabled: true,
              version: 'userPage',
              type: 'text'
            },
            {
              label: 'Логин',
              name: 'login',
              value: props.user.login,
              disabled: true,
              version: 'userPage',
              type: 'text'
            },
            {
              label: 'Имя',
              name: 'first_name',
              value: props.user.first_name,
              disabled: true,
              version: 'userPage',
              type: 'text'
            },
            {
              label: 'Фамилия',
              name: 'second_name',
              value: props.user.second_name,
              disabled: true,
              version: 'userPage',
              type: 'text'
            },
            {
              label: 'Имя в чате',
              name: 'display_name',
              value: props.user.display_name,
              disabled: true,
              version: 'userPage',
              type: 'text'
            },
            {
              label: 'Телефон',
              type: 'tel',
              name: 'phone',
              value: props.user.phone,
              disabled: true,
              version: 'userPage'
            }
          ]
        : []
      ).map(
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
      GoBackButton: new IconButton({
        kind: 'arrowLeft',
        onClick: () => console.log('avatar changed'),
        type: 'icon-filled'
      }),
      UserAvatar: new Avatar({
        size: 'big',
        clickable: true
      }),
      Form: form
    })
    if (props.formState) this.validator = new FormValidator(props.formState)
  }

  render() {
    return this.compile(template as string, this.props)
  }
}
