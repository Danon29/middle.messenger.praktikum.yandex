import Handlebars from 'handlebars'
import * as Components from './components'
import './style.scss'
import { pages } from './consts'
import renderDOM from './core/renderDOM.ts'

Handlebars.registerHelper('eq', function (a, b) {
  return a === b
})

Handlebars.registerHelper('contains', function (a, b) {
  return typeof a === 'string' && a.includes(b)
})

Object.entries(Components).forEach(([name, template]) => {
  if (typeof template === 'function') {
    return
  }
  Handlebars.registerPartial(name, template)
})

function navigate(page: string) {
  //@ts-expect-error: Будет исправлено с внедрением роутинга
  const [source, context] = pages[page]
  if (typeof source === 'function') {
    renderDOM(new source({ ...context }))
    return
  }

  const container = document.getElementById('app')!

  const temlpatingFunction = Handlebars.compile(source)
  container.innerHTML = temlpatingFunction(context)
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'))

document.addEventListener('click', (e) => {
  const page = (e.target as HTMLElement).getAttribute('page')
  if (page) {
    navigate(page)

    e.preventDefault()
    e.stopImmediatePropagation()
  }
})
