import Block from '../../core/block.ts'
import {
  Avatar,
  ChatList,
  IconButton,
  MenuItem,
  MessageField,
  MessageItem,
  MessageList,
  SearchField
} from '../../components'
import { ChatItemProps } from '../../components/chatItem/chatItem.ts'
import { MessageItemProps } from '../../components/messageItem/messageItem.ts'

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
        iconSize: 'small'
      }),
      ChatInfoButton: new IconButton({ kind: 'info', onClick: () => console.log('clicked') }),
      SearchField: new SearchField({ type: 'search' }),
      MessageField: new MessageField({ placeholder: 'Введите сообщение' }),
      ChatsList: new ChatList({
        chats: props.chats
      }),
      FriendsAvatar: new Avatar({ size: 'medium', clickable: false, imageUrl: '/public/icons/aXlZ17nbvD8.jpg' }),
      friendsName: 'Вася',
      messageTest: new MessageItem({
        text: 'asdlfalkshfksdcnm;lzkglasdlasgalsdad',
        time: '14:14',
        isRead: true,
        isOwnMessage: true
      }),
      messageList: new MessageList({
        messages: props.messages
      })
    })
  }
  render(): string {
    return `
      <div class="left-side">
        <div class="left-side__header">
          <div class="left-side__header-button">
            {{{ ProfileButton }}}
            </div>
              <div class="left-side__search">
                {{{ SearchField }}}
              </div>
          </div>
          {{{ ChatsList }}}
      </div>
      <div class="right-side">
          <div class="right-side__header">
              <div class="right-side__user-info">
                  <div class="right-side__avatar">
                    {{{ FriendsAvatar }}}
                  </div>
                  <div class="right-side__user-name">{{friendsName}}</div>
              </div>
              <div class="right-side__user-button">
                {{{ ChatInfoButton }}}
            </div>
          </div>
          <div class="right-side__content">
          {{{ messageList }}}
          </div>
          <div class="right-side__footer">
              {{{ MessageField }}}
          </div>
      </div>
    `
  }
}
