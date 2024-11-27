import Block from '../../core/block.ts'

type ButtonTypes = 'link' | 'primary'

export interface ButtonProps {
  label: string
  type: ButtonTypes
  textColor?: string
  buttonSize?: string
  submit?: boolean
  onClick?: (e) => void
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', {
      ...props,
      className: `button button_${props.type}${props.textColor ? ` button_textColor_${props.textColor}` : ''}${props.buttonSize ? ` button_fontSize_${props.buttonSize}` : ''}`,
      attrs: {
        type: props.submit ? 'submit' : 'button'
      },
      events: {
        click: props.onClick
      }
    })
  }

  render(): string {
    return `
      <span>{{label}}</span>
    `
  }
}
