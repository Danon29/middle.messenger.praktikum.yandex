import Block from '../../../core/block.ts'

interface TextAreaProps {
  placeholder: string
  events: { [key: string]: (e: InputEvent) => void }
}

export default class TextArea extends Block {
  constructor(props: TextAreaProps) {
    super('textarea', {
      ...props,
      attrs: {
        placeholder: props.placeholder,
        rows: 1,
        name: 'message'
      }
    })
  }
}
