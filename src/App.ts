import Router, { router } from './core/Router.ts'
import { connect } from './core/HOC.ts'
import ClientError from './pages/error/clientError/client-error.ts'
import { LoginPage, MainPage, ProfileEditPassword, ProfilePage, RegisterPage, ServerError } from './pages'
import * as Components from './components'
import Handlebars from 'handlebars'

export default class App {
  private state: any

  constructor() {
    this.state = {
      user: {
        id: null,
        first_name: '',
        second_name: '',
        display_name: '',
        login: '',
        phone: '',
        email: ''
      },
      chats: [],
      messages: []
    }

    const router = new Router('#app')

    Object.entries(Components).forEach(([name, template]) => {
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
  }

  render(): string {
    return ''
  }
}
