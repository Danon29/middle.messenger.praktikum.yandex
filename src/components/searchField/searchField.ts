import Block from '../../core/block.ts'
import { IconButton } from '../iconButton'
import SearchInput from './searchInput.ts'

export default class SearchField extends Block {
  constructor(props) {
    super('form', {
      ...props,
      formState: { search: '' },
      errors: { search: '' },
      className: `searchField`,
      SearchButton: new IconButton({ kind: 'search', onClick: (e) => console.log(e) }),
      InputSearch: new SearchInput({
        className: 'input__element',
        placeholder: 'Поиск'
      })
    })
  }

  render(): string {
    return `
          {{{ SearchButton }}}
          {{{ InputSearch }}}
    `
  }
}
