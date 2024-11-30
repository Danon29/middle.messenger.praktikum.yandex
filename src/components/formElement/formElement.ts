import Block from '../../core/block.ts'
import { InputFieldProps } from '../input/inputField.ts'
import { ButtonProps } from '../button/button.ts'

interface FormProps {
  title: string
  inputs: InputFieldProps[] | string
  buttons: ButtonProps[] | string
  onSubmit: (e: Event) => void
}

export default class Form extends Block {
  constructor(props: FormProps) {
    super('div', {
      ...props,
      className: 'form'
    })
  }

  render(): string {
    return `
      <div class="${this.props.className}">
        <h1 class="form__title">${this.props.title}</h1>
        <form class="form__element" onsubmit="${this.props.onSubmit}">
          <div class="form__inputs">
              ${this.props.inputs}
          </div>
          <div class="form__buttons">
              ${this.props.buttons}
          </div>
        </form>
      </div>
    `
  }
}
