type FormState = {
  [key: string]: string
}

export default class FormValidator {
  private formState: { [key: string]: string }
  private errors: { [key: string]: string }
  private regularExpressions: {
    password: RegExp
    phone: RegExp
    name: RegExp
    login: RegExp
    message: RegExp
    email: RegExp
    secondName: RegExp
  }

  constructor(formState: FormState) {
    this.formState = formState
    this.errors = {}
    this.regularExpressions = {
      name: /^[A-Za-zА-Яа-яЁё]{1}[A-Za-zА-Яа-яЁё\-]+$/,
      secondName: /^[A-Za-zА-Яа-яЁё]{1}[A-Za-zА-Яа-яЁё\-]+$/,
      login: /^[A-Za-z][A-Za-z0-9_-]{2,19}$/,
      email: /^[A-Za-z0-9_-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      phone: /^\+?[0-9]{10,15}$/,
      message: /^(?!\s*$).+/
    }
  }

  private validateField(fieldName: string, value: string): boolean {
    let isValid = false
    let error = ''

    switch (fieldName) {
      case 'first_name':
      case 'second_name':
        isValid = this.regularExpressions.name.test(value)
        error = isValid ? '' : 'Имя должно начинаться с заглавной буквы, без пробелов и цифр'
        break
      case 'login':
        isValid = this.regularExpressions.login.test(value)
        error = isValid
          ? ''
          : 'Логин должен содержать от 3 до 20 символов, только латиницу, цифры, дефис или подчеркивание'
        break
      case 'email':
        isValid = this.regularExpressions.email.test(value)
        error = isValid ? '' : 'Некорректный email'
        break
      case 'password':
        isValid = this.regularExpressions.password.test(value)
        error = isValid ? '' : 'Пароль должен содержать от 8 до 40 символов, одну заглавную букву и цифру'
        break
      case 'password_again':
        const password = this.formState.password
        if (value === password && value !== '') {
          isValid = true
          error = ''
        } else {
          isValid = false
          error = 'Пароли не совпадают'
        }
        break
      case 'phone':
        isValid = this.regularExpressions.phone.test(value)
        error = isValid ? '' : 'Телефон должен содержать от 10 до 15 символов, только цифры, может начинаться с плюса'
        break
      case 'search':
      case 'message':
        isValid = this.regularExpressions.message.test(value)
        error = isValid ? '' : 'Сообщение не должно быть пустым'
        break
      default:
        isValid = true
        break
    }

    this.errors[fieldName] = error
    return isValid
  }

  public validateForm(): boolean {
    let isValid = true

    Object.entries(this.formState).forEach(([fieldName, value]: [string, string]) => {
      if (!this.validateField(fieldName, value)) isValid = false
    })

    return isValid
  }

  public handleBlur(event: Event): void {
    const { name, value } = event.target as HTMLInputElement
    this.validateField(name, value)
  }

  public updateFormState(formState: FormState): void {
    this.formState = formState
  }

  public getErrors(): { [key: string]: string } {
    return this.errors
  }
}
