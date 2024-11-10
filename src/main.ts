import Handlebars from 'handlebars'
import * as Components from './components'
import './style.scss'
import { pages } from './consts'

Handlebars.registerHelper('eq', function (a, b) {
  return a === b
})

Handlebars.registerHelper('contains', function (a, b) {
  return typeof a === 'string' && a.includes(b)
})

Object.entries(Components).forEach(([name, template]) => {
  Handlebars.registerPartial(name, template)
})

function navigate(page: string) {
  //@ts-ignore
  const [source, context] = pages[page]
  const container = document.getElementById('app')!

  const temlpatingFunction = Handlebars.compile(source)
  container.innerHTML = temlpatingFunction(context)
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'))

document.addEventListener('click', (e) => {
  //@ts-ignore
  const page = e.target.getAttribute('page')
  if (page) {
    navigate(page)

    e.preventDefault()
    e.stopImmediatePropagation()
  }
})
