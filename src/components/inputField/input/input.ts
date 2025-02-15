import Block from '../../../core/block.ts'

type InputProps = {
  className: string
  name?: string
  disabled?: boolean
  type?: string
  label: string
  events: { [key: string]: (e: InputEvent) => void }
  value?: string
  placeholder?: string
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super('input', {
      ...props,
      attrs: {
        placeholder: props.placeholder ?? '',
        ...(props.disabled ? { disabled: 'disabled' } : {}),
        type: props.type,
        id: props.label,
        name: props.name,
        ...(props.value ? { value: props.value } : {})
      }
    })
  }

  componentDidUpdate(oldProps: InputProps, newProps: InputProps): boolean {
    if (oldProps.value !== newProps.value) {
      ;(this.element as HTMLInputElement).value = newProps.value || ''
    }
    return true
  }
}
