import ClientError from './pages/error/clientError/client-error.ts'
import { connect } from './core/HOC.ts'
import { router } from './core/Router.ts'
import { ServerError } from './pages/error'
import { LoginPage, MainPage, ProfileEditPassword, ProfilePage, RegisterPage } from './pages'
import * as Components from './components'
import * as Templates from './components/templates.ts'
import Handlebars from 'handlebars'
import App from './App.ts'

Handlebars.registerHelper('eq', function (a, b) {
  return a === b
})

Handlebars.registerHelper('contains', function (a, b) {
  return typeof a === 'string' && a.includes(b)
})

window.addEventListener('DOMContentLoaded', () => {
  Object.entries(Templates).forEach(([name, template]) => {
    if (typeof template === 'function') {
      return
    }
    Handlebars.registerPartial(name, template)
  })

  //@ts-ignore
  router
    .use('/client-error', connect(ClientError))
    .use('/server-error', connect(ServerError))
    .use('/login', connect(LoginPage))
    .use('/register', connect(RegisterPage))
    .use('/', connect(MainPage))
    .use('/profile', connect(ProfilePage))
    .use('/profile-edit-password', connect(ProfileEditPassword))
    .start()
})
