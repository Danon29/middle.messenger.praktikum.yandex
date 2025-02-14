import Block from '../../core/block.ts'
import { IconButton } from '../iconButton'
import FormValidator from '../../utils/validator/FormValidator.ts'
import template from './template.hbs?raw'
import { store } from '../../core/store.ts'
import { chatController } from '../../controllers/chatController.ts'
import { Input } from '../inputField/input'

interface MessageFieldProps {
  placeholder: string
}

export default class MessageField extends Block {
  constructor(props: MessageFieldProps) {
    super('form', {
      ...props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault()
          const isValid = this.handleSubmit(e)
          const chatId = store.getState().currentChat

          if (isValid && chatId) {
            chatController.sendMessage(chatId, this.props.formState.message)
            ;(this.children.InputMessage as Input).setProps({ value: '' })
            this.setProps({ formState: { message: '' } })
          }
        }
      },
      formState: { message: '' },
      errors: { message: '' },
      className: 'messageField',
      ClipButton: new IconButton({ kind: 'clip', onClick: () => console.log('cliped') }),
      InputMessage: new Input({
        label: 'message',
        placeholder: 'Введите сообщение',
        events: {
          change: (e) => {
            this.setProps({
              formState: {
                ...this.props.formState,
                message: (e.target as HTMLInputElement).value
              }
            })

            this.validator?.updateFormState({
              ...this.props.formState,
              message: (e.target as HTMLTextAreaElement).value
            })
            const isValid = this.validator?.validateForm()
            if (isValid) this.setProps({ errorMessage: '' })
            ;(this.children.InputMessage as Input).setProps({ value: (e.target as HTMLInputElement).value })
          }
        },
        className: 'textArea'
      }),
      SendMessageButton: new IconButton({
        kind: 'arrowRight',
        onClick: (e) => {
          const valid = this.handleSubmit(e)
          const chatId = store.getState().currentChat

          if (valid && chatId) {
            chatController.sendMessage(chatId, this.props.formState.message)
            ;(this.children.InputMessage as Input).setProps({ value: '' })

            this.setProps({ formState: { message: '' } })
          }
        },
        type: 'icon-filled'
      })
    })
    this.validator = new FormValidator(this.props.formState)
    this.selfCheck = true
  }

  render() {
    return this.compile(template as string, this.props)
  }
}
