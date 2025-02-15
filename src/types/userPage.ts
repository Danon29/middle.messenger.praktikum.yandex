import { InputFieldProps } from '../components/inputField/inputField.ts'
import { ButtonProps } from '../components/button/button.ts'

export interface UserPageProps {
  inputs: InputFieldProps[]
  buttons: ButtonProps[]
  formState?: { [key: string]: string }
}
