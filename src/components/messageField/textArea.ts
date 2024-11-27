import Block from '../../core/block.ts'

export default class TextArea extends Block {
  constructor(props) {
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
