import Block from '../../core/block.ts'

export default class SearchInput extends Block {
  constructor(props) {
    super('input', {
      ...props,
      attrs: {
        placeholder: props.placeholder,
        name: 'search'
      }
    })
  }
}
