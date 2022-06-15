import { InputHTMLAttributes } from "react"

export type InputValue = string | number | Date

export interface InputField extends Omit<InputHTMLAttributes<any>, "onChange"> {
  onChange: (name: string, value: InputValue) => void
  error: string
  label: string
  name: string
}
