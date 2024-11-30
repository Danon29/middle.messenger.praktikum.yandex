import Block from '../../core/block.ts'

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

  render(): string {
    return `
    <img src='{{src}}' alt='icon' />
    `
  }
}
