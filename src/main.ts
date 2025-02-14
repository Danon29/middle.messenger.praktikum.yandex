import ClientError from './pages/error/clientError/client-error.ts'
import { connect } from './core/HOC.ts'
import { router } from './core/Router.ts'
import { ServerError } from './pages/error'
import { LoginPage, MainPage, ProfileEditPassword, ProfilePage, RegisterPage } from './pages'
import * as Templates from './components/templates.ts'
import Handlebars from 'handlebars'
import { authController } from './controllers/authController.ts'
import Block from './core/block.ts'

Handlebars.registerHelper('eq', function (a, b) {
  return a === b
})

Handlebars.registerHelper('contains', function (a, b) {
  return typeof a === 'string' && a.includes(b)
})

window.addEventListener('DOMContentLoaded', async () => {
  Object.entries(Templates).forEach(([name, template]) => {
    if (typeof template === 'function') {
      return
    }
    Handlebars.registerPartial(name, template)
  })

  const isAuthed = await authController.getUserIsAuthed()

  router
    .use('/client-error', connect(ClientError as unknown as typeof Block))
    .use('/server-error', connect(ServerError as unknown as typeof Block))
    .use('/sign-in', connect(LoginPage as unknown as typeof Block))
    .use('/sign-up', connect(RegisterPage as unknown as typeof Block))
    .use('/messenger', connect(MainPage as unknown as typeof Block))
    .use('/settings', connect(ProfilePage as unknown as typeof Block))
    .use('/settings/edit-password', connect(ProfileEditPassword as unknown as typeof Block))
    .start()

  const currentPath = window.location.pathname

  if (!isAuthed)
    if (currentPath === '/messenger' || currentPath === '/settings' || currentPath === '/settings/edit-password')
      router.go('/sign-in')

  if (isAuthed) {
    if (currentPath === '/sign-in' || currentPath === '/sign-up') router.go('/messenger')
  }
})

window.addEventListener('popstate', async () => {
  const isAuthed = await authController.getUserIsAuthed()
  const currentPath = window.location.pathname

  if (!isAuthed) {
    if (currentPath === '/' || currentPath.startsWith('/settings')) {
      router.go('/sign-in')
    }
  }

  if (isAuthed) {
    if (currentPath === '/sign-in' || currentPath === '/sign-up') {
      router.go('/messenger')
    }
  }
})
