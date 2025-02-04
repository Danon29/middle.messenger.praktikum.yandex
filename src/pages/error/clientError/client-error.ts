import Block from '../../../core/block.ts'
import { Button } from '../../../components'
import { TProps } from '../../../types'
import template from '../template.hbs?raw'
import '../error.scss'

export default class ClientError extends Block {
  constructor(props: TProps) {
    const button = new Button({ type: 'primary', label: 'Домой' })

    super('main', {
      ...props,
      className: 'error',
      infoMessage: 'Информация',
      errorCode: '404',
      LabelButton: button
    })
  }

  render() {
    return this.compile(template as string, this.props)
  }
}
