import Block from '../../core/block.ts'

import template from './template.hbs?raw'
import { InputField } from '../inputField'
import { Button } from '../button'

interface FormProps {
  title: string
  inputs: InputField[]
  buttons: Button[]
  events?: Record<string, unknown>
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
