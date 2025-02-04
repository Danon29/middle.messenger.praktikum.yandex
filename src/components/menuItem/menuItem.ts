import Block from '../../core/block.ts'
import { SvgIcon } from '../svgIcon'
import template from './template.hbs?raw'

interface MenuItemProps {
  iconSize: string
  src: string
  label: string
  onClick?: (e: Event) => void
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
      }),
      events: {
        click: props.onClick
      }
    })
  }

  render() {
    return this.compile(template as string, this.props)
  }
}
