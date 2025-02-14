import template from '../template.hbs?raw'
import { InputFieldProps } from '../../../components/inputField/inputField.ts'
import { ButtonProps } from '../../../components/button/button.ts'
import Block from '../../../core/block.ts'
import { Button, Dialog, FileUploader, InputField, UserPageForm } from '../../../components'
import FormValidator from '../../../utils/validator/FormValidator.ts'
import { router } from '../../../core/Router.ts'
import { authController } from '../../../controllers/authController.ts'
import { store } from '../../../core/store.ts'
import { userController } from '../../../controllers/userController.ts'

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

export default class UserPage extends Block {
  constructor(props: UserPageProps) {
    super('div', {
      ...props,
      className: 'user-page',
      formState: {
        email: props.user?.email ?? '',
        login: props.user?.login ?? '',
        first_name: props.user?.first_name ?? '',
        second_name: props.user?.second_name ?? '',
        display_name: props.user?.display_name ?? '',
        phone: props.user?.phone ?? ''
      },
      errors: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: ''
      },
      fileSelectModal: new Dialog({
        Content: new FileUploader({
          onFileSelect: (file) => {
            console.log('Выбран файл:', file)
            this.setProps({ selectedFile: file })
          }
        }),
        ConfirmButton: new Button({
          label: 'Загрузить файл',
          type: 'primary',
          onClick: async () => {
            if (this.props.selectedFile) {
              try {
                await userController.updateAvatar(this.props.selectedFile)
                console.log('Аватар успешно загружен')
                this.setProps({ isModalOpen: false, selectedFile: null }) // Закрываем модалку и очищаем файл
              } catch (error) {
                console.error('Ошибка загрузки аватара:', error)
              }
            } else {
              console.warn('Файл не выбран')
            }
          }
        }),
        onClose: () => this.setProps({ isModalOpen: false })
      }),
      isModalOpen: false,
      selectedFile: null
    })

    this.validator = new FormValidator({
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      phone: ''
    })

    authController.getUserData().then(() => {
      const { isEditing, user } = store.getState()
      this.children.Form = this.getFormData(
        isEditing ?? false,
        user as {
          first_name: string
          second_name: string
          display_name: string
          login: string
          phone: string
          email: string
        }
      )

      this.eventBus().emit(Block.EVENTS.FLOW_CDU)
    })
  }

  getFormData = (
    isEditing: boolean,
    user:
      | {
          first_name: string
          second_name: string
          display_name: string
          login: string
          phone: string
          email: string
        }
      | undefined
  ) => {
    return new UserPageForm({
      inputs: (user
        ? [
            {
              label: 'Почта',
              name: 'email',
              value: user.email,
              disabled: !isEditing,
              version: 'userPage',
              type: 'text'
            },
            {
              label: 'Логин',
              name: 'login',
              value: user.login,
              disabled: !isEditing,
              version: 'userPage',
              type: 'text'
            },
            {
              label: 'Имя',
              name: 'first_name',
              value: user.first_name,
              disabled: !isEditing,
              version: 'userPage',
              type: 'text'
            },
            {
              label: 'Фамилия',
              name: 'second_name',
              value: user.second_name,
              disabled: !isEditing,
              version: 'userPage',
              type: 'text'
            },
            {
              label: 'Имя в чате',
              name: 'display_name',
              value: user.display_name,
              disabled: !isEditing,
              version: 'userPage',
              type: 'text'
            },
            {
              label: 'Телефон',
              type: 'tel',
              name: 'phone',
              value: user.phone,
              disabled: !isEditing,
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
      ),
      buttons: (isEditing
        ? ([
            {
              label: 'Сохранить',
              type: 'primary',
              submit: true,
              onClick: async (e) => {
                const isValid = this.handleSubmit(e)
                if (isValid) {
                  const { email, login, first_name, second_name, display_name, phone } = this.props.formState
                  await userController
                    .updateUserInfo({ email, login, first_name, second_name, display_name, phone })
                    .then(() => {
                      this.children.Form = this.getFormData(false, this.props.user)
                      this.eventBus().emit(Block.EVENTS.FLOW_CDU)
                    })
                    .catch((error) => console.log(error))
                }
              }
            },
            {
              label: 'Назад',
              type: 'link',
              submit: false,
              onClick: () => {
                this.children.Form = this.getFormData(false, this.props.user)
                this.eventBus().emit(Block.EVENTS.FLOW_CDU)
              }
            }
          ] as ButtonProps[])
        : ([
            {
              label: 'Изменить данные',
              type: 'primary',
              submit: false,
              onClick: () => {
                this.children.Form = this.getFormData(true, this.props.user)
                this.eventBus().emit(Block.EVENTS.FLOW_CDU)
              }
            },
            {
              label: 'Изменить пароль',
              type: 'link',
              onClick: () => router.go('/settings/edit-password'),
              submit: false
            },
            {
              label: 'Выйти',
              type: 'link',
              textColor: 'cancel',
              onClick: async () => await authController.logout()
            }
          ] as ButtonProps[])
      ).map(
        (button) =>
          new Button({
            label: button.label,
            type: button.type,
            submit: button.submit,
            textColor: button.textColor,
            onClick: (e) => {
              if (button.onClick) button.onClick(e)
            }
          })
      ),
      onAvatarClick: () => this.setProps({ isModalOpen: true })
    })
  }
  render() {
    return this.compile(template as string, this.props)
  }
}
