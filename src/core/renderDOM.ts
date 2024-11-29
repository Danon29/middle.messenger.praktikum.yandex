import Block from './block'

export default function renderDOM(block: Block): void {
  const root = document.querySelector('#app')

  if (root) {
    root.innerHTML = ''
    const content = block.getContent()
    if (content) root.appendChild(content)
  } else {
    console.log('Ошибка при рендере')
  }
}

export function render(query: string, block: Block): HTMLElement {
  const root = document.querySelector(query) as HTMLElement

  if (!root) {
    console.log('Ошибка при рендере')
  }

  const content = block.getContent()
  if (content) root.appendChild(content)

  block.dispatchComponentDidMount()

  return root
}
