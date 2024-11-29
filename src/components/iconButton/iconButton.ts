import Block from '../../core/block'

import ArrowRightSVG from '../../../public/icons/arrow.svg?raw'
import ArrowLeftSVG from '../../../public/icons/arrowLeft.svg?raw'
import Clip from '../../../public/icons/clip.svg?raw'
import Search from '../../../public/icons/search.svg?raw'
import Info from '../../../public/icons/info.svg?raw'

const ICONS_SVG_SOURCE = {
  arrowRight: ArrowRightSVG,
  arrowLeft: ArrowLeftSVG,
  clip: Clip,
  search: Search,
  info: Info
} as const

interface IconButtonProps {
  kind: keyof typeof ICONS_SVG_SOURCE
  onClick: (e: Event) => void
  type?: string
}

export default class IconButton extends Block {
  constructor(props: IconButtonProps) {
    super('div', {
      ...props,
      className: `icon-button${props.type ? ` icon-button_${props.type}` : ''}`,
      events: {
        click: props.onClick
      }
    })
  }

  render(): string {
    const svgSource = ICONS_SVG_SOURCE[this.props.kind as keyof typeof ICONS_SVG_SOURCE]

    if (typeof svgSource !== 'string') {
      return ''
    }

    return svgSource
  }
}
