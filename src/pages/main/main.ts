import Block from '../../core/block.ts'
import {
  Avatar,
  Button,
  ChatItem,
  ChatList,
  Dialog,
  IconButton,
  InputField,
  MenuItem,
  MessageField,
  MessageList,
  SearchField
} from '../../components'
import { ChatItemProps } from '../../components/chatItem/chatItem.ts'
import { MessageItemProps } from '../../components/messageItem/messageItem.ts'
import template from './template.hbs?raw'
import { router } from '../../core/Router.ts'
import { store } from '../../core/store.ts'
import { chatAPI } from '../../api/chatApi.ts'
import { chatController } from '../../controllers/chatController.ts'
import formatDate from '../../utils/formatDate.ts'

const getChatTitle = () => {
  return store.getState().chats.find((chat) => chat.id === store.getState().currentChat)?.title ?? 'Без названия'
}

interface MainPageProps {
  chats: ChatItemProps[]
  messages: MessageItemProps[]
}

export default class MainPage extends Block {
  constructor(props: MainPageProps) {
    super('div', {
      ...props,
      className: 'main-page',
      isModalOpen: false,
      ProfileButton: new MenuItem({
        src: '/public/icons/person.svg',
        label: 'Профиль',
        iconSize: 'small',
        onClick: () => {
          router.go('/profile')
        }
      }),
      AddUserButton: new IconButton({
        kind: 'add',
        onClick: () => {
          this.children.modalWindow = new Dialog(this.getModalProps('addUserToChat'))
          this.setProps({ isModalOpen: true })
        }
      }),
      RemoveUserButton: new IconButton({
        kind: 'remove',
        onClick: () => {
          this.children.modalWindow = new Dialog(this.getModalProps('removeUserFromChat'))
          this.setProps({ isModalOpen: true })
        }
      }),
      DeleteChatButton: new IconButton({
        kind: 'delete',
        onClick: () => {
          this.children.modalWindow = new Dialog(this.getModalProps('deleteChat'))
          this.setProps({ isModalOpen: true })
        }
      }),
      CreateChatButton: new Button({
        label: 'Создать чат',
        type: 'link',
        onClick: () => {
          this.children.modalWindow = new Dialog(this.getModalProps('createChat'))
          this.setProps({ isModalOpen: true })
        }
      }),
      SearchField: new SearchField({ type: 'search', placeholder: 'Поиск' }),
      MessageField: new MessageField({ placeholder: 'Введите сообщение' }),
      ChatsList: new ChatList({
        chats: props.chats.map((chat) => new ChatItem({ ...chat }))
      }),
      FriendsAvatar: new Avatar({ size: 'medium', clickable: false, imageUrl: '/public/icons/aXlZ17nbvD8.jpg' }),
      chatTitle: getChatTitle(),
      messageList: new MessageList(),
      modalWindow: null
    })

    chatAPI.getChats().then((data) => {
      const newChats: ChatItemProps[] = JSON.parse(data.responseText).map((chat) => ({
        title: chat.title,
        time: chat.last_message ? formatDate(chat.last_message.time) : '',
        content: chat.last_message ? chat.last_message.content : 'новое сообщение',
        unread_count: chat.unread_count,
        isOwnMessage: true,
        active: false,
        id: chat.id,
        onClick: this.setCurrentChat.bind(this)
      }))
      store.setState('chats', newChats)

      this.children.ChatsList = new ChatList({
        chats: newChats.map((chat) => new ChatItem({ ...chat }))
      })
      this.eventBus().emit('flow:component-did-update')
    })
  }

  setCurrentChat(id: number) {
    const currentChat = store.getState().chats.find((chat) => chat.id === id)
    this.setProps({ currentChat: currentChat, chatTitle: currentChat.title })
    store.setState('currentChat', currentChat.id)
    chatController.connectToChat(id)
  }

  getModalProps(type: string) {
    debugger
    switch (type) {
      case 'createChat':
        return {
          Content: new InputField({
            label: 'Название чата',
            name: 'chatName',
            type: undefined
          }),
          ConfirmButton: new Button({
            label: 'Создать чат',
            type: 'primary',
            submit: false,
            onClick: async () => {
              const inputValue = (this.children.modalWindow as any).children?.Content?.children?.Input?._element?.value
              console.log('Название чата:', inputValue)
              if (!inputValue) return
              await chatAPI.createChat({ title: inputValue }).then(() => this.setProps({ isModalOpen: false }))
            }
          }),
          open: true,
          onClose: () => this.setProps({ isModalOpen: false })
        }
      case 'addUserToChat':
        return {
          Content: new InputField({
            label: 'Id пользователя',
            name: 'id',
            type: undefined
          }),
          ConfirmButton: new Button({
            label: 'Добавить пользователя',
            type: 'primary',
            submit: false,
            onClick: async () => {
              const chatId = this.props.currentChat.id
              const inputValue = (this.children.modalWindow as any).children?.Content?.children?.Input?._element?.value
              if (inputValue && chatId)
                await chatController
                  .addUserToChat(chatId, [inputValue])
                  .then(() => this.setProps({ isModalOpen: false }))
            }
          }),
          onClose: () => this.setProps({ isModalOpen: false })
        }
      case 'removeUserFromChat':
        return {
          Content: new InputField({
            label: 'Id пользователя',
            name: 'id',
            type: undefined
          }),
          ConfirmButton: new Button({
            label: 'Удалить пользователя',
            type: 'primary',
            submit: false,
            onClick: async () => {
              const chatId = this.props.currentChat.id
              const inputValue = (this.children.modalWindow as any).children?.Content?.children?.Input?._element?.value
              if (inputValue && chatId)
                await chatController
                  .removeUserFromChat(chatId, [inputValue])
                  .then(() => this.setProps({ isModalOpen: false }))
            }
          }),
          onClose: () => this.setProps({ isModalOpen: false })
        }
      case 'deleteChat':
        return {
          ConfirmButton: new Button({
            label: 'Удалить чат',
            type: 'primary',
            submit: false,
            onClick: async () => {
              const chatId = this.props.currentChat.id
              if (chatId) await chatController.deleteChat(chatId).then(() => this.setProps({ isModalOpen: false }))
            }
          }),
          onClose: () => this.setProps({ isModalOpen: false })
        }
    }
  }

  render() {
    return this.compile(template as string, { ...this.props, modalWindow: this.children.modalWindow })
  }
}
