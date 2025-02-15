import Block from '../../core/block'

import ArrowRightSVG from '@icons/arrow.svg?raw'
import ArrowLeftSVG from '@icons/arrowLeft.svg?raw'
import Clip from '@icons/clip.svg?raw'
import Search from '@icons/search.svg?raw'
import Info from '@icons/info.svg?raw'
import Add from '@icons/add.svg?raw'
import Remove from '@icons/remove.svg?raw'
import Delete from '@icons/delete.svg?raw'

const ICONS_SVG_SOURCE = {
  arrowRight: ArrowRightSVG,
  arrowLeft: ArrowLeftSVG,
  clip: Clip,
  search: Search,
  info: Info,
  add: Add,
  remove: Remove,
  delete: Delete
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

  render() {
    const svgSource = ICONS_SVG_SOURCE[this.props.kind as keyof typeof ICONS_SVG_SOURCE]

    return this.compile(svgSource as string, this.props)
  }
}
