import * as Pages from '../pages'

export const pages: any = {
  errorPage404: [
    Pages.ErrorPage,
    {
      ErrorCode: '404',
      infoMessage: 'Не туда попали',
      buttonLabel: 'Назад к чатам'
    }
  ],
  errorPage: [
    Pages.ErrorPage,
    {
      ErrorCode: '500',
      infoMessage: 'Мы уже фиксим',
      buttonLabel: 'Назад к чатам'
    }
  ],
  userChangeAvatar: [
    Pages.UserPage,
    {
      showDialog: true,
      dialogTitle: 'Загрузите файл',
      buttonLabel: 'Выбрать файлы на компьютере',
      hasError: false,
      // actionErrorMessage: 'Нужно выбрать файл',
      // file: 'pic.png',
      hasPageName: true,
      userName: 'Вася',
      userInputs: [
        {
          label: 'Почта',
          type: 'email',
          value: 'pochta@yandex.ru',
          disabled: true
        },
        {
          label: 'Логин',
          value: 'Vasya',
          disabled: true
        },
        {
          label: 'Имя',
          value: 'Василий',
          disabled: true
        },
        {
          label: 'Фамилия',
          value: 'Иванов',
          disabled: true
        },
        {
          label: 'Имя в чате',
          value: 'Pupkin',
          disabled: true
        },
        {
          label: 'Телефон',
          type: 'tel',
          value: '+7(923)3123311',
          disabled: true
        }
      ],
      userProfileButtons: [
        {
          type: 'link',
          label: 'Изменить данные'
        },
        {
          type: 'link',
          label: 'Изменить пароль'
        },
        {
          type: 'link',
          label: 'Выйти',
          textColor: 'cancel'
        }
      ]
    }
  ],
  userEditPassword: [
    Pages.UserPage,
    {
      hasPageName: false,
      userName: 'Вася',
      userInputs: [
        {
          label: 'Старый пароль',
          type: 'password',
          value: 'someValueforPassword',
          disabled: false
        },
        {
          label: 'Новый пароль',
          type: 'password',
          value: 'someNewValue',
          disabled: false,
          inputName: 'password'
        },
        {
          label: 'Повторите новый пароль',
          type: 'password',
          value: 'someNewValue',
          disabled: false
        }
      ],
      userProfileButtons: [
        {
          type: 'primary',
          label: 'Сохранить',
          submit: true
        }
      ]
    }
  ],
  userProfile: [
    Pages.UserPage,
    {
      hasPageName: true,
      userName: 'Вася',
      userInputs: [
        {
          label: 'Почта',
          type: 'email',
          value: 'pochta@yandex.ru',
          disabled: true
        },
        {
          label: 'Логин',
          value: 'Vasya',
          disabled: true
        },
        {
          label: 'Имя',
          value: 'Василий',
          disabled: true
        },
        {
          label: 'Фамилия',
          value: 'Иванов',
          disabled: true
        },
        {
          label: 'Имя в чате',
          value: 'Pupkin',
          disabled: true
        },
        {
          label: 'Телефон',
          type: 'tel',
          value: '+7(923)3123311',
          disabled: true
        }
      ],
      userProfileButtons: [
        {
          type: 'link',
          label: 'Изменить данные'
        },
        {
          type: 'link',
          label: 'Изменить пароль'
        },
        {
          type: 'link',
          label: 'Выйти',
          textColor: 'cancel'
        }
      ]
    }
  ],
  userEdit: [
    Pages.UserPage,
    {
      hasPageName: false,
      userName: 'Вася',
      userInputs: [
        {
          label: 'Почта',
          type: 'email',
          value: 'pochta@yandex.ru',
          disabled: false,
          inputName: 'email'
        },
        {
          label: 'Логин',
          value: 'Vasya',
          disabled: false,
          inputName: 'login'
        },
        {
          label: 'Имя',
          value: 'Василий',
          disabled: false,
          inputName: 'first_name'
        },
        {
          label: 'Фамилия',
          value: 'Иванов',
          disabled: false,
          inputName: 'second_name'
        },
        {
          label: 'Имя в чате',
          value: 'Pupkin',
          disabled: false,
          inputName: 'display_name'
        },
        {
          label: 'Телефон',
          type: 'tel',
          value: '+7(923)3123311',
          disabled: false,
          inputName: 'phone'
        }
      ],
      userProfileButtons: [
        {
          type: 'primary',
          label: 'Сохранить',
          submit: true
        }
      ]
    }
  ],
  login: [
    Pages.LoginPage,
    {
      title: 'Вход',
      inputs: [
        {
          label: 'Логин',
          inputName: 'login'
        },
        {
          label: 'Пароль',
          type: 'password',
          inputName: 'password',
          errorMessage: 'Неверный пароль'
        }
      ],
      buttons: [
        {
          label: 'Авторизоваться',
          type: 'primary'
        },
        {
          label: 'Нет аккаунта?',
          type: 'link'
        }
      ]
    }
  ],
  main: [
    Pages.MainPage,
    {
      userMenuList: [
        {
          label: 'Добавить пользователя',
          src: '/public/icons/plus.svg'
        },
        {
          label: 'Удалить пользователя',
          src: '/public/icons/x.svg'
        }
      ],
      messageMenuList: [
        {
          label: 'Фото или видео',
          src: '/public/icons/Union.svg'
        },
        {
          label: 'Файл',
          src: '/public/icons/file.svg'
        },
        {
          label: 'Локация',
          src: '/public/icons/location.svg'
        }
      ],
      userName: 'Вася',
      labelConfirm: 'Удалить',
      dialogTitle: 'Добавить пользователя',
      showDialog: false,
      chats: [
        {
          name: 'John Doe',
          text: 'Hello there',
          selected: false,
          count: 1,
          isOwnMessage: true,
          time: '14:25',
          imageUrl: '/public/icons/avatarImg.jpeg'
        },
        {
          name: 'Alice Cooper',
          text: 'What’s up? Long time no see!',
          selected: false,
          count: 1,
          isOwnMessage: false,
          time: '14:30'
        },
        {
          name: 'Carlos Rivera',
          text: 'Just finished a meeting, feeling good about it!',
          selected: false,
          count: 1,
          isOwnMessage: true,
          time: '14:35'
        },
        {
          name: 'Emily Johnson',
          text: 'I started learning French recently. It’s tough but exciting!',
          selected: false,
          count: 1,
          isOwnMessage: false,
          time: '14:40'
        },
        {
          name: 'Tom Harris',
          text: 'Got a new job offer today. It’s a big opportunity!',
          selected: false,
          count: 1,
          isOwnMessage: true,
          time: '14:45'
        },
        {
          name: 'Sarah Lee',
          text: 'I’m thinking about going on vacation next month. Any suggestions?',
          selected: false,
          count: 1,
          isOwnMessage: false,
          time: '14:50'
        },
        {
          name: 'Jake Adams',
          text: 'Just watched a great movie last night. Highly recommend it!',
          selected: false,
          count: 1,
          isOwnMessage: true,
          time: '14:55'
        },
        {
          name: 'Olivia Martinez',
          text: 'I’m planning to move to a new city soon. It’s exciting and stressful!',
          selected: false,
          count: 1,
          isOwnMessage: false,
          time: '15:00'
        },
        {
          name: 'David White',
          text: 'My dog learned a new trick today. It’s so cute!',
          selected: false,
          count: 1,
          isOwnMessage: true,
          time: '15:05'
        },
        {
          name: 'Rachel Green',
          text: 'Started a new fitness routine. Feeling good about it so far.',
          selected: false,
          count: 1,
          isOwnMessage: false,
          time: '15:10'
        },
        {
          name: 'Maxwell Stone',
          text: 'Just started reading a new book. It’s amazing so far!',
          selected: false,
          count: 1,
          isOwnMessage: true,
          time: '15:15'
        },
        {
          name: 'Sophie Turner',
          text: 'I’ve been experimenting with photography lately. Loving the results!',
          selected: false,
          count: 1,
          isOwnMessage: false,
          time: '15:20'
        },
        {
          name: 'Liam Smith',
          text: 'I finally bought the latest gaming console. It’s a game-changer!',
          selected: false,
          count: 1,
          isOwnMessage: true,
          time: '15:25'
        },
        {
          name: 'Mia Davis',
          text: 'I’m planning to start my own blog about travel and food.',
          selected: false,
          count: 1,
          isOwnMessage: false,
          time: '15:30'
        },
        {
          name: 'Ethan Brown',
          text: 'Just got back from a hike in the mountains. The view was breathtaking!',
          selected: false,
          count: 1,
          isOwnMessage: true,
          time: '15:35'
        },
        {
          name: 'Chloe Wilson',
          text: 'Started learning how to cook Asian cuisine. So much fun!',
          selected: false,
          count: 1,
          isOwnMessage: false,
          time: '15:40'
        },
        {
          name: 'Jackson Clark',
          text: 'I’m working on a new art project. Can’t wait to see it finished!',
          selected: false,
          count: 1,
          isOwnMessage: true,
          time: '15:45'
        }
      ]
    }
  ],
  nav: [Pages.NavigatePage],
  register: [
    Pages.RegisterPage,
    {
      title: 'Регистрация',
      inputs: [
        {
          label: 'Почта',
          type: 'email',
          inputName: 'email'
        },
        {
          label: 'Логин',
          inputName: 'login'
        },
        {
          label: 'Имя',
          inputName: 'first_name'
        },
        {
          label: 'Фамилия',
          inputName: 'second_name'
        },
        {
          label: 'Телефон',
          type: 'tel',
          inputName: 'phone'
        },
        {
          label: 'Пароль',
          type: 'password',
          inputName: 'password'
        },
        {
          label: 'Пароль (еще раз)',
          type: 'password'
        }
      ],
      buttons: [
        {
          label: 'Зарегистрироваться',
          type: 'primary'
        },
        {
          label: 'Войти',
          type: 'link'
        }
      ]
    }
  ]
}
