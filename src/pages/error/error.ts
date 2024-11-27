import Block from '../../core/block.ts'
import { Button } from '../../components'

interface ErrorPageProps {
  errorCode: string
  infoMessage: string
  buttonLabel: string
}

export default class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super('div', {
      ...props,
      className: 'error',
      LabelButton: new Button({
        type: 'primary',
        label: props.buttonLabel
      })
    })
    console.log(props)
  }

  render(): string {
    return `
      <div class="error-page">
          <div class="error-page__error-code">{{errorCode}}</div>
          <div class="error-page__info">{{infoMessage}}</div>
          <div class="error-page__goback-button">
              {{{ LabelButton }}}
           </div>
      </div>
    `
  }
}
