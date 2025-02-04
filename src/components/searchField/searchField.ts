import Block from '../../core/block.ts'
import { IconButton } from '../iconButton'
import { SearchInput } from './searchInput'
import template from './template.hbs?raw'

interface SearchFieldProps {
  placeholder: string
  type: string
}

export default class SearchField extends Block {
  constructor(props: SearchFieldProps) {
    super('form', {
      ...props,
      formState: { search: '' },
      errors: { search: '' },
      className: `searchField`,
      SearchButton: new IconButton({ kind: 'search', onClick: (e) => console.log(e) }),
      InputSearch: new SearchInput({
        placeholder: props.placeholder
      })
    })
  }

  render() {
    return this.compile(template as string, this.props)
  }
}
