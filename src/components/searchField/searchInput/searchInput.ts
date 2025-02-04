import Block from '../../../core/block.ts'

interface SearchInputProps {
  placeholder: string
}

export default class SearchInput extends Block {
  constructor(props: SearchInputProps) {
    super('input', {
      ...props,
      className: 'input__element',
      attrs: {
        placeholder: props.placeholder,
        name: 'search'
      }
    })
  }
}
