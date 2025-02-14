import Block from '../../../core/block.ts'
import { Button } from '../../../components'
import { TProps } from '../../../types'
import template from '../template.hbs?raw'
import '../error.scss'
import { router } from '../../../core/Router.ts'
import { authController } from '../../../controllers/authController.ts'

export default class ClientError extends Block {
  constructor(props: TProps) {
    const button = new Button({
      type: 'primary',
      label: 'Домой',
      onClick: async () => {
        const isAuthed = await authController.getUserIsAuthed()
        router.go(isAuthed ? '/messenger' : '/')
      }
    })

    super('main', {
      ...props,
      className: 'error',
      infoMessage: 'Страница не найдена',
      errorCode: '404',
      LabelButton: button
    })
  }

  render() {
    return this.compile(template as string, this.props)
  }
}
