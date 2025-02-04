import Block from '../../core/block.ts'
import { Avatar, ChatList, IconButton, MenuItem, MessageField, MessageList, SearchField } from '../../components'
import { ChatItemProps } from '../../components/chatItem/chatItem.ts'
import { MessageItemProps } from '../../components/messageItem/messageItem.ts'
import template from './template.hbs?raw'
import { router } from '../../core/Router.ts'

const messages = [
  {
    text: 'Привет, как дела?',
    time: '14:14',
    isRead: true,
    isOwnMessage: true
  },
  {
    text: 'Привет! Все хорошо, а увет! Все хорошо, а увет! Все хорошо, а увет! Все хорошо, а увет! Все хорошо, а увет! Все хорошо, а у тебя?',
    time: '14:15',
    isRead: true,
    isOwnMessage: false
  },
  {
    text: 'У меня тоже все нasdормально, спасибо, что спросилdормально, спасибо, что спросилdормально, спасибо, что спросилdормально, спасибо, что спросилdормально, спасибо, что спросилdормально, спасибо, что спросил.',
    time: '14:16',
    isRead: true,
    isOwnMessage: true
  },
  {
    text: 'Рад это слышать! Чем занимаешься?',
    time: '14:17',
    isRead: true,
    isOwnMessage: false
  },
  {
    text: 'Работаю немного, а ты?',
    time: '14:18',
    isRead: true,
    isOwnMessage: true
  },
  {
    text: 'Я тоже на работе, но немного отвлекаюсь на чат.',
    time: '14:19',
    isRead: true,
    isOwnMessage: false
  },
  {
    text: 'Знаю, как это бывает. Как продвигается работа?',
    time: '14:20',
    isRead: true,
    isOwnMessage: true
  },
  {
    text: 'Медленно, но все-таки двигаюсь. У тебя какие планы на вечер?',
    time: '14:21',
    isRead: true,
    isOwnMessage: false
  },
  {
    text: 'Планирую немного отдохнуть, может быть, посмотрю фильм.',
    time: '14:22',
    isRead: true,
    isOwnMessage: true
  },
  {
    text: 'Хорошая идея! Какой фильм хочешь посмотреть?',
    time: '14:23',
    isRead: true,
    isOwnMessage: false
  },
  {
    text: 'Не решил ещё, но что-то интересное, наверное.',
    time: '14:24',
    isRead: true,
    isOwnMessage: true
  },
  {
    text: 'Может, что-то комедийное, чтобы расслабиться?',
    time: '14:25',
    isRead: true,
    isOwnMessage: false
  },
  {
    text: 'Точно, хорошая идея! Нужно немного посмеяться.',
    time: '14:26',
    isRead: true,
    isOwnMessage: true
  },
  {
    text: 'Ну что, удачи тебе в фильме! Я тоже пойду работать.',
    time: '14:27',
    isRead: true,
    isOwnMessage: false
  },
  {
    text: 'Хорошо, спасибо! Удачи тебе в работе!',
    time: '14:28',
    isRead: false,
    isOwnMessage: true
  }
]

const chats = [
  {
    name: 'John Doe',
    text: 'Hello there',
    selected: false,
    count: 1,
    isOwnMessage: true,
    time: '14:25',
    imageUrl: '/public/icons/avatarImg.jpeg',
    active: false
  },
  {
    name: 'Alice Cooper',
    text: 'What’s up? Long time no see!',
    selected: false,
    count: 1,
    isOwnMessage: false,
    time: '14:30',
    active: false
  },
  {
    name: 'Carlos Rivera',
    text: 'Just finished a meeting, feeling good about it!',
    selected: false,
    count: 1,
    isOwnMessage: true,
    time: '14:35',
    active: false
  },
  {
    name: 'Emily Johnson',
    text: 'I started learning French recently. It’s tough but exciting!',
    selected: false,
    count: 1,
    isOwnMessage: false,
    time: '14:40',
    active: false
  }
  // {
  //   name: 'Tom Harris',
  //   text: 'Got a new job offer today. It’s a big opportunity!',
  //   selected: false,
  //   count: 1,
  //   isOwnMessage: true,
  //   time: '14:45',
  //   active: false
  // },
  // {
  //   name: 'Sarah Lee',
  //   text: 'I’m thinking about going on vacation next month. Any suggestions?',
  //   selected: false,
  //   count: 1,
  //   isOwnMessage: false,
  //   time: '14:50',
  //   active: false
  // },
  // {
  //   name: 'Jake Adams',
  //   text: 'Just watched a great movie last night. Highly recommend it!',
  //   selected: false,
  //   count: 1,
  //   isOwnMessage: true,
  //   time: '14:55',
  //   active: false
  // },
  // {
  //   name: 'Olivia Martinez',
  //   text: 'I’m planning to move to a new city soon. It’s exciting and stressful!',
  //   selected: false,
  //   count: 1,
  //   isOwnMessage: false,
  //   time: '15:00',
  //   active: false
  // },
  // {
  //   name: 'David White',
  //   text: 'My dog learned a new trick today. It’s so cute!',
  //   selected: false,
  //   count: 1,
  //   isOwnMessage: true,
  //   time: '15:05',
  //   active: false
  // },
  // {
  //   name: 'Rachel Green',
  //   text: 'Started a new fitness routine. Feeling good about it so far.',
  //   selected: false,
  //   count: 1,
  //   isOwnMessage: false,
  //   time: '15:10',
  //   active: false
  // },
  // {
  //   name: 'Maxwell Stone',
  //   text: 'Just started reading a new book. It’s amazing so far!',
  //   selected: false,
  //   count: 1,
  //   isOwnMessage: true,
  //   time: '15:15',
  //   active: false
  // },
  // {
  //   name: 'Sophie Turner',
  //   text: 'I’ve been experimenting with photography lately. Loving the results!',
  //   selected: false,
  //   count: 1,
  //   isOwnMessage: false,
  //   time: '15:20',
  //   active: false
  // },
  // {
  //   name: 'Liam Smith',
  //   text: 'I finally bought the latest gaming console. It’s a game-changer!',
  //   selected: false,
  //   count: 1,
  //   isOwnMessage: true,
  //   time: '15:25',
  //   active: false
  // },
  // {
  //   name: 'Mia Davis',
  //   text: 'I’m planning to start my own blog about travel and food.',
  //   selected: false,
  //   count: 1,
  //   isOwnMessage: false,
  //   time: '15:30',
  //   active: false
  // },
  // {
  //   name: 'Ethan Brown',
  //   text: 'Just got back from a hike in the mountains. The view was breathtaking!',
  //   selected: false,
  //   count: 1,
  //   isOwnMessage: true,
  //   time: '15:35',
  //   active: false
  // },
  // {
  //   name: 'Chloe Wilson',
  //   text: 'Started learning how to cook Asian cuisine. So much fun!',
  //   selected: false,
  //   count: 1,
  //   isOwnMessage: false,
  //   time: '15:40',
  //   active: false
  // },
  // {
  //   name: 'Jackson Clark',
  //   text: 'I’m working on a new art project. Can’t wait to see it finished!',
  //   selected: false,
  //   count: 1,
  //   isOwnMessage: true,
  //   time: '15:45',
  //   active: false
  // }
]

interface MainPageProps {
  chats: ChatItemProps[]
  messages: MessageItemProps[]
}

export default class MainPage extends Block {
  constructor(props: MainPageProps) {
    super('div', {
      ...props,
      className: 'main-page',
      ProfileButton: new MenuItem({
        src: '/public/icons/person.svg',
        label: 'Профиль',
        iconSize: 'small',
        onClick: () => router.go('/profile')
      }),
      ChatInfoButton: new IconButton({
        kind: 'info',
        onClick: () => {
          this.setProps({ ...this.props, chats: [] })
        }
      }),
      SearchField: new SearchField({ type: 'search', placeholder: 'Поиск' }),
      MessageField: new MessageField({ placeholder: 'Введите сообщение' }),
      ChatsList: new ChatList({
        chats: chats
      }),
      FriendsAvatar: new Avatar({ size: 'medium', clickable: false, imageUrl: '/public/icons/aXlZ17nbvD8.jpg' }),
      friendsName: 'Вася',

      messageList: new MessageList({
        messages: messages
      })
    })
  }
  render() {
    return this.compile(template as string, this.props)
  }
}
