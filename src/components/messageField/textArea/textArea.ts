import Block from '../../../core/block.ts'
import template from './template.hbs?raw'
interface TextAreaProps {
  placeholder: string
  events: { [key: string]: (e: InputEvent) => void }
}

export default class TextArea extends Block {
  constructor(props: TextAreaProps) {
    super('div', {
      ...props,
      className: 'wrapper',
      placeholder: props.placeholder,
      rows: 1,
      name: 'message',
      value: ''
    })
  }

  render(): Node | string {
    return this.compile(template as string, this.props)
  }
}
