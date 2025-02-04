import ClientError from './pages/error/clientError/client-error.ts'
import { connect } from './core/HOC.ts'
import { router } from './core/Router.ts'
import { ServerError } from './pages/error'
import { LoginPage, MainPage, ProfileEditPassword, ProfilePage, RegisterPage } from './pages'
import * as Components from './components'
import Handlebars from 'handlebars'
import App from './App.ts'

Handlebars.registerHelper('eq', function (a, b) {
  return a === b
})

Handlebars.registerHelper('contains', function (a, b) {
  return typeof a === 'string' && a.includes(b)
})

document.addEventListener('DOMContentLoaded', () => {
  const app = new App()
  app.render()
})
