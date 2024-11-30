import { InputFieldProps } from '../components/input/inputField.ts'
import { ButtonProps } from '../components/button/button.ts'

export interface UserPageProps {
  inputs: InputFieldProps[]
  buttons: ButtonProps[]
  formState?: { [key: string]: string }
}
