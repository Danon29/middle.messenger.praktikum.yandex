import Block from '../../core/block.ts'
import { IconButton } from '../iconButton'
import FormValidator from '../../utils/validator/FormValidator.ts'
import { TextArea } from './textArea'
import template from './template.hbs?raw'
import { store } from '../../core/store.ts'
import { chatController } from '../../controllers/chatController.ts'

interface MessageFieldProps {
  placeholder: string
}

export default class MessageField extends Block {
  constructor(props: MessageFieldProps) {
    super('form', {
      ...props,
      formState: { message: '' },
      errors: { message: '' },
      className: 'messageField',
      ClipButton: new IconButton({ kind: 'clip', onClick: () => console.log('cliped') }),
      InputMessage: new TextArea({
        placeholder: 'Введите сообщение ',
        events: {
          change: (e) => {
            this.setProps({
              formState: {
                ...this.props.formState,
                message: (e.target as HTMLTextAreaElement).value
              }
            })

            this.validator?.updateFormState({
              ...this.props.formState,
              message: (e.target as HTMLTextAreaElement).value
            })
            const isValid = this.validator?.validateForm()
            if (isValid) this.setProps({ errorMessage: '' })
          }
        }
      }),
      SendMessageButton: new IconButton({
        kind: 'arrowRight',
        onClick: (e) => {
          const isValid = this.handleSubmit(e)
          const chatId = store.getState().currentChat
          if (isValid && chatId) chatController.sendMessage(chatId, this.props.formState.message)
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
