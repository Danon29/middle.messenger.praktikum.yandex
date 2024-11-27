import Block from '../../core/block.ts'
import { SvgIcon } from '../svgIcon'

interface MenuItemProps {
  iconSize: string
  src: string
  label: string
}

export default class MenuItem extends Block {
  constructor(props: MenuItemProps) {
    super('button', {
      ...props,
      className: 'menu-item',
      MenuIcon: new SvgIcon({
        iconType: 'icon',
        iconSize: props.iconSize,
        src: props.src
      })
    })
  }

  render(): string {
    return `
      {{{ MenuIcon }}}
      <span class="menu-item__label">{{label}}</span>
    `
  }
}
