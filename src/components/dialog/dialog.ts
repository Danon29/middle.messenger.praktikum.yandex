import Block from '../../core/block.ts'
import template from './template.hbs?raw'
import { Button } from '../button'

export interface DialogProps {
  Content?: Block | Block[]
  ConfirmButton: Button
  onClose: () => void
}

export default class Dialog extends Block {
  constructor(props: DialogProps) {
    super('div', {
      ...props,
      className: 'dialog-container',
      open: true,
      CloseButton: new Button({
        label: 'Закрыть',
        type: 'link',
        onClick: props.onClose
      })
    })
  }

  render(): Node | string {
    return this.compile(template as string, this.props)
  }
}
