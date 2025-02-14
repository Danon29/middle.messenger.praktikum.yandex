import Block from '../../core/block.ts'
import template from './template.hbs?raw'

interface AvatarProps {
  size: 'big' | 'small' | 'medium'
  imageUrl?: string
  clickable?: boolean
  onClick?: (e: MouseEvent) => void
}

export default class Avatar extends Block {
  constructor(props: AvatarProps) {
    super('div', {
      ...props,
      className: `avatar avatar--${props.size}`,
      events: {
        click: (e: MouseEvent) => {
          if (props.onClick) props.onClick(e)
        }
      }
    })
  }

  render() {
    return this.compile(template as string, this.props)
  }
}
