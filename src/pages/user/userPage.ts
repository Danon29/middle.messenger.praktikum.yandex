import Block from '../../core/block.ts'
import { Avatar, Button, IconButton, InputField, UserPageForm } from '../../components'
import FormValidator from '../../utils/validator/FormValidator.ts'
import { InputFieldProps } from '../../components/inputField/inputField.ts'
import { ButtonProps } from '../../components/button/button.ts'

export interface UserPageProps {
  inputs: InputFieldProps[]
  buttons: ButtonProps[]
  formState?: { [key: string]: string }
  errors?: { [key: string]: string }
}

export default class UserPage extends Block {
  constructor(props: UserPageProps) {
    super('div', {
      ...props,
      className: 'user-page',
      GoBackButton: new IconButton({
        kind: 'arrowLeft',
        onClick: () => console.log('avatar changed'),
        type: 'icon-filled'
      }),
      UserAvatar: new Avatar({
        size: 'big',
        clickable: true
      }),
      inputs: props.inputs.map(
        (input) =>
          new InputField({
            label: input.label,
            type: input.type,
            onChange: (e) => this.handleInputChange(e),
            name: input.name,
            version: 'userPage',
            value: input.value,
            disabled: input.disabled
          })
      ),
      buttons: props.buttons.map(
        (button) =>
          new Button({
            label: button.label,
            type: button.type,
            onClick: button.submit ? (e) => this.handleSubmit(e) : () => console.log('cliked'),
            textColor: button.textColor
          })
      )
    })
    if (props.formState) this.validator = new FormValidator(props.formState)
  }

  render(): string {
    return new UserPageForm({
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
