import Block from '../../core/block.ts'
import { Button, InputField } from '../../components'
import FormValidator from '../../utils/validator/FormValidator.ts'
import Form from '../../components/formElement/formElement.ts'
import { InputFieldProps } from '../../components/input/inputField.ts'
import { ButtonProps } from '../../components/button/button.ts'

interface RegisterPageProps {
  inputs: InputFieldProps[]
  buttons: ButtonProps[]
}

export default class RegisterPage extends Block {
  constructor(props: RegisterPageProps) {
    super('div', {
      ...props,
      className: 'loginPage',
      formState: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        password: '',
        password_again: ''
      },
      errors: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        password: '',
        password_again: ''
      },
      inputs: props.inputs.map(
        (input) =>
          new InputField({
            label: input.label,
            type: input.type,
            onChange: (e) => this.handleInputChange(e),
            name: input.name
          })
      ),
      buttons: props.buttons.map(
        (button) =>
          new Button({
            label: button.label,
            type: button.type,
            onClick: button.submit ? (e) => this.handleSubmit(e) : () => console.log('cliked')
          })
      )
    })
    this.validator = new FormValidator(this.props.formState)
  }

  render(): string {
    return new Form({
      title: 'Регистрация',
      inputs: `
        {{#each inputs}}
          {{{this}}}
        {{/each}}
      `,
      buttons: `
        {{#each buttons}}
          {{{this}}}
        {{/each}}
      `,
      onSubmit: (e) => this.handleSubmit(e)
    }).render()
  }
}
