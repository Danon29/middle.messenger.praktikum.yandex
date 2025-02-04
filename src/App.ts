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
  }

  render(): string {
    return ''
  }
}
