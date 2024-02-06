import type { InputHTMLAttributes } from 'react'
import type { FieldErrors } from 'react-hook-form'

export type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  inputName: string
  isPasswordInput?: boolean
  inputPasswordPlaceholder?: string
  errors: FieldErrors
}
