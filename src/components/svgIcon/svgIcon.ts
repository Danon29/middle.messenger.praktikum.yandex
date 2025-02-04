import Block from '../../core/block.ts'
import template from './template.hbs?raw'

interface SvgIconProps {
  iconType: string
  iconSize: string
  src: string
}

export default class SvgIcon extends Block {
  constructor(props: SvgIconProps) {
    super('div', {
      ...props,
      className: `icon ${props.iconType} ${props.iconSize}`
    })
  }

  render() {
    return this.compile(template as string, this.props)
  }
}
