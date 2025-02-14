import { InputFieldProps } from '../components/inputField/inputField.ts'
import { ButtonProps } from '../components/button/button.ts'
import { ChatItemProps } from '../components/chatItem/chatItem.ts'
import { MessageItemProps } from '../components/messageItem/messageItem.ts'

export type Indexed<T = unknown> = {
  [key in string]: T
}

export type TProps = Record<string, string | Function | unknown>

export type StoreType = {
  user: Omit<UserType, 'password'>
  chats: any[]
  messages: []
  isEditing: boolean
  currentChat: number | undefined
}

export type MessageType = {
  chat_id: number
  content: string
  file?: null
  id: number
  is_read: boolean
  time: string
  type: string
  user_id: number
}

export type UserType = {
  id?: number | null
  first_name: string
  second_name: string
  display_name?: string
  avatar?: string
  login: string
  email: string
  password?: string
  phone: string
}

export interface ErrorPageProps {
  errorCode: string
  infoMessage: string
  buttonLabel: string
}

export interface UserPageProps {
  inputs: InputFieldProps[]
  buttons: ButtonProps[]
  formState?: { [key: string]: string }
  errors?: { [key: string]: string }
}

export interface MainPageProps {
  chats: ChatItemProps[]
  messages: MessageItemProps[]
}

export interface LoginPageProps {
  inputs: InputFieldProps[]
  buttons: ButtonProps[]
}

export interface RegisterPageProps {
  inputs: InputFieldProps[]
  buttons: ButtonProps[]
}
