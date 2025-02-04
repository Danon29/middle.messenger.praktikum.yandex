import Block from '../../core/block.ts'
import Input from './input/input.ts'
import template from './template.hbs?raw'

export interface InputFieldProps {
  label: string
  name?: string
  onChange?: (e: InputEvent) => void
  disabled?: boolean
  type?: string
  version?: string
  errorMessage?: string
  value?: string
}

export default class InputField extends Block {
  constructor(props: InputFieldProps) {
    super('div', {
      ...props,
      className: `input ${props.version ? `input_${props.version}` : 'input__default'}`,
      Input: new Input({
        className: 'input__element',
        events: {
          change: props.onChange || (() => {})
        },
        disabled: props.disabled,
        type: props.type,
        label: props.label,
        name: props.name,
        ...(props.value ? { value: props.value } : {})
      })
    })
  }

  render() {
    return this.compile(template as string, this.props)
  }
}
