import Block from '../../core/block.ts'

import template from './template.hbs?raw'

interface FormProps {
  title: string
  inputs: (typeof Block)[] | string
  buttons: (typeof Block)[] | string
  onSubmit?: (e: Event) => void
}

export default class Form extends Block {
  constructor(props: FormProps) {
    super('div', {
      ...props,
      className: 'form'
    })
  }

  render() {
    return this.compile(template as string, this.props)
  }
}
